import Link from 'next/link';
import { AddPersonIcon } from '@/components/icon';

export default async function ParticipantsButton({
  meetId,
}: {
  meetId: string;
}) {
  return (
    <Link href={`/meet/${meetId}/participants`}>
      <AddPersonIcon />
    </Link>
  );
}
