'use client';
import { deleteMeet } from '@/controllers/meet';
import { MdDelete as DeleteIcon } from 'react-icons/md';

export default function DeleteButton({
  meetId,
  pathName,
}: {
  meetId: string;
  pathName: string;
}) {
  return (
    <div
      onClick={async () => {
        await deleteMeet(meetId, pathName);
      }}
      className="cursor-pointer"
    >
      <DeleteIcon size={20} />
    </div>
  );
}
