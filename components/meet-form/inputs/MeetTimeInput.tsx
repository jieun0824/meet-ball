import TimeInput from "./TimeInput";

export default function MeetingTimeInput({
  startTime,
  endTime,
}: {
  startTime?: number;
  endTime?: number;
}) {
  return (
    <div className="w-[301px] mt-[50px]">
      <p className="mt-3 mb-5">회의 시간대</p>
      <div>
        <TimeInput inputName="meetStart" defaultValue={startTime} />
        <span> - </span>
        <TimeInput inputName="meetEnd" defaultValue={endTime} />
      </div>
    </div>
  );
}
