'use client';

import Button from '@/components/button/button';
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
      <div className="flex flex-col gap-6">
        <input
          type="hidden"
          name="meetId"
          value={meetId}
          readOnly
          className="bg-none"
        />
        <input
          type={isProtected ? 'password' : 'hidden'}
          className="bg-transparent border border-white rounded-lg py-2 text-center"
          name="meetPassword"
          placeholder="****"
        />
        <Button type="submit" title="참가하기" />
      </div>
    </form>
  );
}
