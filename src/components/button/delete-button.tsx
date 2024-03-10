import { deleteMeet } from '@/controllers/meet';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { MdDelete as DeleteIcon } from 'react-icons/md';

export default function DeleteButton({ meetId }: { meetId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      onClick={async () => {
        await deleteMeet(meetId);
        startTransition(() => router.refresh());
      }}
    >
      <DeleteIcon size={20} />
    </div>
  );
}
