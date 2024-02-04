export function DateCalenderBtn({
  isSelected,
  isToday,
  date,
}: {
  isSelected: boolean;
  isToday: boolean | undefined;
  date: number | string;
}) {
  return (
    <div
      className={`cursor-pointer flex justify-center items-center w-8 h-8 rounded-2xl  hover:bg-gray-400 ${
        (isSelected && '!bg-pointColor') || (isToday && 'bg-gray-500')
      }`}
    >
      {date}
    </div>
  );
}

export function WeekCalenderBtn({
  isSelected,
  day,
}: {
  isSelected: boolean;
  day: string;
}) {
  return (
    <div
      className={`cursor-pointer flex justify-center items-center w-8 h-8 rounded-2xl p-1 ${
        isSelected && 'bg-pointColor text-black'
      }`}
    >
      {day}
    </div>
  );
}
