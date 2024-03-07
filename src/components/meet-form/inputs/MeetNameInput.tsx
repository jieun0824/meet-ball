export default function MeetingNameInput({
  defaultName,
}: {
  defaultName?: string;
}) {
  return (
    <div className="grid-1 w-[301px] h-[40px] border-b-2 mt-3">
      <input
        name="meetName"
        type="text"
        placeholder="회의 이름"
        defaultValue={defaultName}
        className="bg-bgColor w-[301px] text-xl h-[40px]"
      />
    </div>
  );
}
