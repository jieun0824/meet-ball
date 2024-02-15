import TimeComponent from './time-component';

export default function TimeLine({
  date,
  startTime,
  endTime,
}: {
  date: string;
  startTime: number;
  endTime: number;
}) {
  const timeList = Array.from(
    { length: endTime - startTime },
    (_, index) => startTime + index
  );
  let newdate = new Date(date);
  console.log(timeList);
  return (
    <div>
      <p className="flex justify-center">
        {newdate.getMonth() + 1 + '/' + newdate.getDate() + ''}
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
