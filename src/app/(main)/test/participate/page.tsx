'use client';

import { useState } from 'react';
import {
  getMyTimeTable,
  updateTimeTable,
} from '@/controllers/meet';

export default function TemporaryPage() {
  const [inputId, setInputId] = useState<string>('');
  const [result, setResult] = useState<string>('');
  return (
    <>
      <section>
        <h1>Buttons</h1>
        <div>
          <label>MeetId: </label>
          <input
            id="meetId"
            value={inputId}
            onChange={event => {
              setInputId(event.target.value);
            }}
            className="text-black"
          />
        </div>
        <button
          onClick={async () => {
            const meet = await getMyTimeTable(inputId);
            setResult(JSON.stringify(meet));
          }}
        >
          Get Timetable
        </button>
        <button
          onClick={async () => {
            const meet = await updateTimeTable(inputId, {
              '2022-10-10': [2, 3, 4],
            });
            setResult(JSON.stringify(meet));
          }}
        >
          Update Timetable
        </button>
      </section>

      <section>
        <h1>Result</h1>
        {result ? JSON.stringify(result) : null}
      </section>
    </>
  );
}
