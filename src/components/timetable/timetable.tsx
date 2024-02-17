import TimeLine from './time-line';

export default function TimeTable({
  startTime,
  endTime,
  daysOrDates,
  type,
}: any) {
  return (
    <>
      {daysOrDates.map((date: string, i: number) => (
        <TimeLine
          key={date}
          date={date}
          startTime={startTime}
          endTime={endTime}
          type={type}
        />
      ))}
    </>
  );
}
