import Link from 'next/link';
import { GearIcon } from '../../../../components/icon';

export default function EditMeetButton({ meetId }: { meetId: string }) {
  return (
    <Link href={`/edit/${meetId}`}>
      <GearIcon size={18} />
    </Link>
  );
}
