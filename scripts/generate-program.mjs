import { createClient } from "@supabase/supabase-js";
import fs from "node:fs/promises";
import path from "node:path";

function parseDotEnv(contents) {
  const out = {};
  const lines = contents.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!key) continue;
    out[key] = value;
  }
  return out;
}

async function loadEnvFileIfPresent(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = parseDotEnv(raw);
    for (const [k, v] of Object.entries(parsed)) {
      if (process.env[k] == null) process.env[k] = v;
    }
  } catch {
    return;
  }
}

function escapeHtml(input) {
  return String(input)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function lessonTypeLabel(t) {
  if (t === "intermezzo") return "Intermezzo";
  if (t === "milestone") return "Milestone";
  return "Esercizio";
}

function findProgramModulesRange(html) {
  const marker = "data-program-modules";
  const markerIndex = html.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error(
      "Impossibile trovare data-program-modules in public/index.html",
    );
  }

  const startDivIndex = html.lastIndexOf("<div", markerIndex);
  if (startDivIndex === -1) {
    throw new Error(
      "Impossibile trovare il tag <div> per data-program-modules",
    );
  }

  const startTagEnd = html.indexOf(">", startDivIndex);
  if (startTagEnd === -1) {
    throw new Error("Tag <div data-program-modules> malformato");
  }

  let idx = startTagEnd + 1;
  let depth = 1;
  while (depth > 0) {
    const nextOpen = html.indexOf("<div", idx);
    const nextClose = html.indexOf("</div", idx);

    if (nextClose === -1) {
      throw new Error(
        "Impossibile trovare la chiusura </div> per data-program-modules",
      );
    }

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      idx = nextOpen + 4;
      continue;
    }

    depth -= 1;
    if (depth === 0) {
      const closeEnd = html.indexOf(">", nextClose);
      if (closeEnd === -1) {
        throw new Error("Tag </div> malformato per data-program-modules");
      }
      return {
        startTagEnd: startTagEnd + 1,
        closeStart: nextClose,
        closeEnd: closeEnd + 1,
        startDivIndex,
      };
    }

    idx = nextClose + 5;
  }

  throw new Error("Errore interno: range data-program-modules non determinato");
}

function indentBlock(block, indent) {
  return block
    .split("\n")
    .map((l) => (l.length ? indent + l : l))
    .join("\n");
}

function buildModuleSection(moduleRow, lessons) {
  const title = `${moduleRow.order_index}. ${moduleRow.title}`;

  const rows = lessons
    .map((l) => {
      const typeLabel = lessonTypeLabel(l.lesson_type);
      const titlePart = `<strong>${escapeHtml(l.title)}</strong>`;
      const descPart = l.description
        ? `<br />${escapeHtml(l.description)}`
        : "";
      const descCell = `${titlePart}${descPart}`;
      const skillsCell = l.skills ? escapeHtml(l.skills) : "";

      return [
        "<tr>",
        `  <td>${typeLabel}</td>`,
        `  <td>${descCell}</td>`,
        `  <td>${skillsCell}</td>`,
        "</tr>",
      ].join("\n");
    })
    .join("\n");

  return [
    `<section class="program__module" aria-label="Modulo ${moduleRow.order_index}">`,
    '  <h3 class="program__module-title title title--md">',
    `    ${escapeHtml(title)}`,
    "  </h3>",
    '  <div class="program__table-wrap">',
    '    <table class="program-table">',
    "      <thead>",
    "        <tr>",
    '          <th scope="col">Tipo di attività</th>',
    '          <th scope="col">Descrizione</th>',
    '          <th scope="col">Skill necessarie</th>',
    "        </tr>",
    "      </thead>",
    "      <tbody>",
    rows
      ? indentBlock(rows, "        ")
      : '        <tr>\n          <td colspan="3">In arrivo</td>\n        </tr>',
    "      </tbody>",
    "    </table>",
    "  </div>",
    "</section>",
  ].join("\n");
}

async function main() {
  const projectRoot = process.cwd();

  await loadEnvFileIfPresent(path.join(projectRoot, ".env.local"));
  await loadEnvFileIfPresent(path.join(projectRoot, ".env"));

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment",
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });

  const [
    { data: modules, error: modulesError },
    { data: lessons, error: lessonsError },
  ] = await Promise.all([
    supabase
      .from("modules")
      .select("id,title,order_index")
      .eq("is_published", true)
      .order("order_index", { ascending: true }),
    supabase
      .from("lessons")
      .select(
        "id,title,description,skills,lesson_type,module_id,lesson_index,order_index",
      )
      .eq("is_published", true)
      .order("order_index", { ascending: true }),
  ]);

  if (modulesError)
    throw new Error(`Supabase modules error: ${modulesError.message}`);
  if (lessonsError)
    throw new Error(`Supabase lessons error: ${lessonsError.message}`);

  const modulesList = (modules ?? []).filter((m) => typeof m?.id === "string");
  const lessonsList = (lessons ?? []).filter((l) => typeof l?.id === "string");

  const lessonsByModuleId = new Map();
  for (const l of lessonsList) {
    const moduleId = l.module_id;
    if (typeof moduleId !== "string" || !moduleId) continue;
    if (!lessonsByModuleId.has(moduleId)) lessonsByModuleId.set(moduleId, []);
    lessonsByModuleId.get(moduleId).push(l);
  }

  for (const [moduleId, list] of lessonsByModuleId.entries()) {
    list.sort((a, b) => {
      const aIdx =
        typeof a.lesson_index === "number"
          ? a.lesson_index
          : Number.MAX_SAFE_INTEGER;
      const bIdx =
        typeof b.lesson_index === "number"
          ? b.lesson_index
          : Number.MAX_SAFE_INTEGER;
      if (aIdx !== bIdx) return aIdx - bIdx;

      const aOrd =
        typeof a.order_index === "number"
          ? a.order_index
          : Number.MAX_SAFE_INTEGER;
      const bOrd =
        typeof b.order_index === "number"
          ? b.order_index
          : Number.MAX_SAFE_INTEGER;
      return aOrd - bOrd;
    });
    lessonsByModuleId.set(moduleId, list);
  }

  const moduleSections = [];
  for (const m of modulesList) {
    const list = lessonsByModuleId.get(m.id) ?? [];
    moduleSections.push(buildModuleSection(m, list));
  }

  const modulesHtmlInner = moduleSections.join("\n\n");

  const indexPath = path.join(projectRoot, "public", "index.html");
  const html = await fs.readFile(indexPath, "utf8");

  const range = findProgramModulesRange(html);
  const lineStart = html.lastIndexOf("\n", range.startDivIndex);
  const divIndent = html.slice(lineStart + 1, range.startDivIndex);
  const innerIndent = divIndent + "  ";

  const replacement = modulesHtmlInner
    ? `\n${indentBlock(modulesHtmlInner, innerIndent)}\n${divIndent}`
    : `\n${divIndent}`;

  const nextHtml =
    html.slice(0, range.startTagEnd) +
    replacement +
    html.slice(range.closeStart);

  await fs.writeFile(indexPath, nextHtml, "utf8");

  process.stdout.write(`OK: Program aggiornato in ${indexPath}\n`);
}

main().catch((err) => {
  process.stderr.write(
    String(err instanceof Error ? (err.stack ?? err.message) : err) + "\n",
  );
  process.exitCode = 1;
});
