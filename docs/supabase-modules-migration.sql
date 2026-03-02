CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE modules (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  order_index integer NOT NULL,
  access_level text NOT NULL CHECK (access_level IN ('free', 'paid')),
  is_published boolean DEFAULT false,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  UNIQUE(order_index)
);

CREATE TABLE module_milestones (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id uuid REFERENCES modules(id) ON DELETE CASCADE NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE TABLE module_milestone_progress (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  module_id uuid REFERENCES modules(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL DEFAULT 'not_submitted' CHECK (status IN ('not_submitted', 'submitted', 'passed', 'failed')),
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  UNIQUE(user_id, module_id)
);

ALTER TABLE lessons
  ADD COLUMN module_id uuid REFERENCES modules(id) ON DELETE RESTRICT,
  ADD COLUMN lesson_index integer,
  ADD COLUMN public_id text,
  ADD COLUMN IF NOT EXISTS skills text,
  ADD COLUMN IF NOT EXISTS lesson_type text;

UPDATE lessons
SET lesson_type = 'esercizio'
WHERE lesson_type IS NULL;

ALTER TABLE lessons
  ALTER COLUMN lesson_type SET DEFAULT 'esercizio',
  ALTER COLUMN lesson_type SET NOT NULL;

ALTER TABLE lessons DROP CONSTRAINT IF EXISTS lessons_lesson_type_check;

ALTER TABLE lessons
  ADD CONSTRAINT lessons_lesson_type_check CHECK (lesson_type IN ('esercizio', 'intermezzo', 'milestone'));

CREATE UNIQUE INDEX lessons_public_id_unique ON lessons(public_id);
CREATE INDEX lessons_module_id_idx ON lessons(module_id);
CREATE INDEX lessons_module_lesson_index_idx ON lessons(module_id, lesson_index);

CREATE OR REPLACE FUNCTION generate_lesson_public_id()
RETURNS text AS $$
DECLARE
  v text;
BEGIN
  LOOP
    v := lower(encode(gen_random_bytes(6), 'hex'));
    EXIT WHEN NOT EXISTS (SELECT 1 FROM lessons WHERE public_id = v);
  END LOOP;
  RETURN v;
END;
$$ LANGUAGE plpgsql;

ALTER TABLE lessons ALTER COLUMN public_id SET DEFAULT generate_lesson_public_id();

DO $$
DECLARE
  module1_id uuid;
BEGIN
  INSERT INTO modules (title, order_index, access_level, is_published)
  VALUES ('Modulo 1', 1, 'free', true)
  RETURNING id INTO module1_id;

  UPDATE lessons
  SET
    module_id = module1_id,
    lesson_index = order_index,
    public_id = COALESCE(public_id, generate_lesson_public_id())
  WHERE module_id IS NULL;
END;
$$;

ALTER TABLE lessons
  ALTER COLUMN module_id SET NOT NULL,
  ALTER COLUMN lesson_index SET NOT NULL,
  ALTER COLUMN public_id SET NOT NULL;

ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_milestone_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can read published lessons" ON lessons;

CREATE OR REPLACE FUNCTION can_user_access_module(p_user_id uuid, p_module_id uuid)
RETURNS boolean AS $$
DECLARE
  m record;
  prev_module_id uuid;
  has_subscription boolean;
  prev_passed boolean;
BEGIN
  IF auth.role() <> 'authenticated' THEN
    RETURN false;
  END IF;

  IF auth.uid() <> p_user_id THEN
    RETURN false;
  END IF;

  SELECT id, order_index, access_level, is_published
  INTO m
  FROM modules
  WHERE id = p_module_id;

  IF m.id IS NULL OR m.is_published IS DISTINCT FROM true THEN
    RETURN false;
  END IF;

  IF m.access_level = 'paid' THEN
    SELECT EXISTS (
      SELECT 1
      FROM subscriptions s
      WHERE s.user_id = p_user_id
        AND s.status IN ('active', 'trialing')
    ) INTO has_subscription;

    IF NOT has_subscription THEN
      RETURN false;
    END IF;
  END IF;

  SELECT id
  INTO prev_module_id
  FROM modules
  WHERE is_published = true
    AND order_index < m.order_index
  ORDER BY order_index DESC
  LIMIT 1;

  IF prev_module_id IS NULL THEN
    RETURN true;
  END IF;

  SELECT EXISTS (
    SELECT 1
    FROM module_milestone_progress mp
    WHERE mp.user_id = p_user_id
      AND mp.module_id = prev_module_id
      AND mp.status = 'passed'
  ) INTO prev_passed;

  RETURN prev_passed;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION can_access_module(p_module_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN can_user_access_module(auth.uid(), p_module_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Authenticated users can read published lessons if can access module"
  ON lessons FOR SELECT
  USING (auth.role() = 'authenticated' AND is_published = true AND can_access_module(module_id));

CREATE POLICY "Authenticated users can read published modules"
  ON modules FOR SELECT
  USING (auth.role() = 'authenticated' AND is_published = true);

CREATE POLICY "Authenticated users can read milestones for published modules"
  ON module_milestones FOR SELECT
  USING (
    auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM modules m
      WHERE m.id = module_id AND m.is_published = true
    )
  );

CREATE POLICY "Users can read own milestone progress"
  ON module_milestone_progress FOR SELECT
  USING (auth.uid() = user_id);

DROP FUNCTION IF EXISTS get_user_progress_stats(p_user_id uuid);

CREATE OR REPLACE FUNCTION get_user_progress_stats(p_user_id uuid)
RETURNS TABLE(total_lessons integer, completed_lessons integer, percentage numeric) AS $$
BEGIN
  IF auth.uid() <> p_user_id THEN
    RAISE EXCEPTION 'not allowed';
  END IF;

  RETURN QUERY
  SELECT
    COUNT(l.id)::integer AS total_lessons,
    COUNT(CASE WHEN up.completed THEN 1 END)::integer AS completed_lessons,
    ROUND(
      (COUNT(CASE WHEN up.completed THEN 1 END)::numeric /
        NULLIF(COUNT(l.id), 0) * 100),
      1
    ) AS percentage
  FROM lessons l
  LEFT JOIN user_progress up
    ON l.id = up.lesson_id AND up.user_id = p_user_id
  WHERE l.is_published = true
    AND can_user_access_module(p_user_id, l.module_id) = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
