export default function CalendarDay() {
  const day = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <tr>
      {day.map((a, i) => (
        <th className="text-pointColor">{a}</th>
      ))}
    </tr>
  );
}
