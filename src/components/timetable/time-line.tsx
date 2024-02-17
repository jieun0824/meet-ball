import TimeComponent from './time-component';

export default function TimeLine({
  date,
  startTime,
  endTime,
  type,
}: {
  date: string;
  startTime: number;
  endTime: number;
  type: 'DAYS' | 'DATES';
}) {
  const timeList = Array.from(
    { length: endTime - startTime },
    (_, index) => startTime + index
  );
  let label;
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  if (type == 'DATES') {
    const newdate = new Date(date);
    label =
      newdate.getMonth() +
      1 +
      '/' +
      newdate.getDate() +
      ' ' +
      days[newdate.getDay()];
  } else {
    label = date;
  }

  return (
    <div>
      <p className="flex justify-center whitespace-pre-wrap h-[30px]">
        {label}
      </p>
      {timeList.map((time: number, index: number) => (
        <TimeComponent
          key={index}
          time={time}
          length={endTime - startTime + 1}
        />
      ))}
    </div>
  );
}
