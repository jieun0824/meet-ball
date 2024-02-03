export default function CalenderBtn({
  isSelected,
  date,
}: {
  isSelected: boolean;
  date: number;
}) {
  return (
    <div
      className={`cursor-pointer flex justify-center items-center w-8 h-8 rounded-2xl ${
        isSelected && 'bg-pointColor'
      }`}
    >
      {date}
    </div>
  );
}
