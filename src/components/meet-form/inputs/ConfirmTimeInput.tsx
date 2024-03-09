import TimeInput from './TimeInput';

export default function ConfirmTimeInput({
  defaultTime,
}: {
  defaultTime?: Date;
}) {
  if (!defaultTime) defaultTime = new Date();

  return (
    <div className="mt-[50px] w-[301px]">
      <p>일정 확정 시간</p>
      <div className="flex">
        <input
          type="date"
          name="confirmDate"
          defaultValue={defaultTime.toISOString().split('T')[0]}
          className="bg-[#3C3F45] rounded-md text-[#20ECC7]"
        />
        <TimeInput
          name="confirm"
          defaultValue={
            defaultTime.getMinutes() === 0
              ? defaultTime.getHours() * 2
              : defaultTime.getHours() * 2 + 1
          }
        ></TimeInput>
      </div>
    </div>
  );
}
