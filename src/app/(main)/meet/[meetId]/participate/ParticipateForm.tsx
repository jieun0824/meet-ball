'use client';

import participateFormAction from './participateFormAction';

export default function ParticipateForm({
  meetId,
  isProtected,
}: {
  meetId: string;
  isProtected: boolean;
}) {
  return (
    <form action={participateFormAction}>
      <input type="hidden" name="meetId" value={meetId} readOnly />
      <input
        type={isProtected ? 'password' : 'hidden'}
        className="text-black"
        name="meetPassword"
      />
      <button type="submit">참가하기</button>
    </form>
  );
}
