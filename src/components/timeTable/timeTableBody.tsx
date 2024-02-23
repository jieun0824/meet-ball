import TimeComponentLine from './timeComponentLine';

type timeObjectOfDateType = {
  [name: string]: Array<number>;
};
type scheduledObjectType = {
  [date: string]: timeObjectOfDateType;
};

type timeTableProps = {
  scheduledObject: scheduledObjectType;
  startTime: number;
  endTime: number;
};
export default function TimeTableBody({
  scheduledObject,
  startTime,
  endTime,
}: timeTableProps) {
  const timeList = Array.from(
    { length: endTime - startTime + 1 },
    (_, index) => startTime + index
  );

  const dateKeys: Array<string> = scheduledObject
    ? Object.keys(scheduledObject)
    : [];

  return (
    <div className="text-[#B1B1B1] font-montserrat text-xs flex">
      <div className="w-[49px]">
        <div className="h-[40px] mb-2 flex items-center">
          <p>Week</p>
        </div>
        {timeList.map((time: number, index: number) => {
          const tempHour = Math.floor(time / 2);
          return (
            <div key={index} className="h-[20px]">
              {time % 2 === 0 && <p className="text-xs">{`${tempHour}:00`}</p>}
            </div>
          );
        })}
      </div>
      <div className="flex">
        {dateKeys.map((dateString: string, index: number) => {
          const parts: Array<string> = dateString.split('-');
          const tempDate: Date = new Date(
            parseInt(parts[0]),
            parseInt(parts[1]) - 1,
            parseInt(parts[2])
          );
          const timeObjectOfDate: timeObjectOfDateType =
            scheduledObject[dateString];
          return (
            <div key={index}>
              <TimeComponentLine
                timeObjectOfDate={timeObjectOfDate}
                date={tempDate}
                startTimeNum={startTime}
                endTimeNum={endTime}
              ></TimeComponentLine>
            </div>
          );
        })}
      </div>
    </div>
  );
}
