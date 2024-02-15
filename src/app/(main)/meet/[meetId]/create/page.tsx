import TimeTable from '@/components/timetable/timetable';

export default function CreateTimetable() {
  const daysOrDates = ['2023-11-12', '2023-11-13', '2023-11-17'];

  const startTime: number = 17;
  const endTime: number = 37;

  const timeList = Array.from(
    { length: endTime - startTime + 1 },
    (_, index) => startTime + index
  );

  return (
    <div className="flex justify-center items-center text-sm">
      <div className={`grid grid-cols-${daysOrDates.length + 1} w-3/4`}>
        <div className="flex flex-col items-end">
          <div className="min-h-[20px] mr-2">
            <p>week</p>
          </div>
          {timeList.map((time: number, index: number) => {
            const tempHour = Math.floor(time / 2);
            return (
              <div key={index} className="min-h-[20px] mr-2">
                {time % 2 === 0 ? (
                  <p className="text-xs">{`${tempHour}:00`}</p>
                ) : (
                  (index == endTime - startTime || index == 0) && (
                    <p className="text-xs">{`${tempHour}:30`}</p>
                  )
                )}
              </div>
            );
          })}
        </div>
        <TimeTable
          startTime={startTime}
          endTime={endTime}
          daysOrDates={daysOrDates}
        />
      </div>
    </div>
  );
}
