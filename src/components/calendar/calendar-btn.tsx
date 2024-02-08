export function WeekCalenderBtn({
  isSelected,
  day,
}: {
  isSelected: boolean;
  day: string;
}) {
  return (
    <div
      className={`cursor-pointer flex justify-center items-center rounded-2xl w-8 h-8 hover:bg-gray-400 ${
        isSelected && '!bg-pointColor text-black'
      }`}
    >
      {day}
    </div>
  );
}
