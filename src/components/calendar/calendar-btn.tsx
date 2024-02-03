'use client';
export default function CalenderBtn({
  isSelected,
  date,
}: {
  isSelected: boolean;
  date: number;
}) {
  return (
    <div
      className={`flex justify-center items-center w-8 h-8 border-white border rounded ${
        isSelected && 'bg-white text-black'
      }`}
    >
      {date}
    </div>
  );
}
