export default function MeetingDescriptionInput({
  defaultDescription,
}: {
  defaultDescription?: string;
}) {
  return (
    <div className="grid-1 border-2 rounded-sm mt-3">
      <input
        name="meetDescription"
        type="text"
        placeholder="회의 설명"
        defaultValue={defaultDescription}
        className="bg-bgColor w-[301px] text-sm h-[40px]"
      />
    </div>
  );
}
