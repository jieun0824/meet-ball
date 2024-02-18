import TimeTable from '@/components/timetable/timetable';
import { getMeet } from '@/controllers/meet';
import { Meet } from '@prisma/client';

export default async function CreateTimetable({
  params,
}: {
  params: { meetId: string };
}) {
  const meetData: Meet = await getMeet(params.meetId);
  const datesOrDays = meetData.datesOrDays;
  const type = meetData.meetType;
  const startTime = meetData.startTime;
  const endTime = meetData.endTime;

  const timeList = Array.from(
    { length: endTime - startTime + 1 },
    (_, index) => startTime + index
  );

  type gridColumnsType = {
    [key: number]: string;
  };
  const gridSetList: gridColumnsType = {
    1: `grid grid-cols-table1 w-3/4`,
    2: `grid grid-cols-table2 w-3/4`,
    3: `grid grid-cols-table3 w-3/4`,
    4: `grid grid-cols-table4 w-3/4`,
    5: `grid grid-cols-table5 w-3/4`,
    6: `grid grid-cols-table6 w-3/4`,
    7: `grid grid-cols-table7 w-3/4`,
  };

  return (
    <div className="flex justify-center items-center text-xs mt-16">
      <div className={gridSetList[datesOrDays.length % 7]}>
        <div className="flex flex-col items-end">
          <div className="min-h-[30px] mr-2 -mt-2">
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
          daysOrDates={datesOrDays}
          type={type}
        />
      </div>
    </div>
  );
}
