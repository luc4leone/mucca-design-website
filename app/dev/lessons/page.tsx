import { notFound } from 'next/navigation';

import DevLessonsClient from './DevLessonsClient';

export default function DevLessonsPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return <DevLessonsClient />;
}
