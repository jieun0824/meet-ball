'use client';

import { useState } from 'react';
import { createMeet } from '@/controllers/meet';
import { Meet, MeetType } from '@prisma/client';

export default function TemporaryPage() {
  const [result, setResult] = useState<Meet | null>(null);
  return (
    <>
      <button
        onClick={async () => {
          const meet = await createMeet({
            name: 'test',
            description: 'test',
            meetType: MeetType.DATES,
            datesOrDays: ['2022-10-10'],
          });
          setResult(meet);
        }}
      >
        createTestMeet
      </button>
      <section>
        <h1>Created Meet</h1>
        {result ? JSON.stringify(result) : null}
      </section>
    </>
  );
}
