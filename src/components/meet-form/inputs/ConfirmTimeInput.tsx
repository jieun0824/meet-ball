import TimeInput from './TimeInput';

export default function ConfirmTimeInput({ defaultDate }: { defaultDate?: Date }) {
    if (!defaultDate) defaultDate = new Date();
  
    return (
      <div className="mt-[50px] w-[301px]">
        <p>일정 확정 시간</p>
        <div className="flex">
          <input
            type="date"
            name="confirmDate"
            defaultValue={defaultDate.toISOString().split('T')[0]}
            className="bg-[#3C3F45] rounded-md text-[#20ECC7]"
          />
          <TimeInput name="confirm"></TimeInput>
        </div>
      </div>
    );
  }