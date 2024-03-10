export default function MeetDescription({
  description,
}: {
  description: string | null;
}) {
  return (
    <p className="text-sm h-[40px] border rounded-lg p-2 mt-3 w-full">
      {description}
    </p>
  );
}
