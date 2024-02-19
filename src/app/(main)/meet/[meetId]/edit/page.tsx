import Button from '@/components/button/button';
import TimeTable from '@/components/timetable/timetable';
import { getMeet, getTimeTable, updateTimeTable } from '@/controllers/meet';
import { getCurrentUser } from '@/lib/authentication';
import { Meet, ParticipantsOnMeets } from '@prisma/client';

export default async function CreateTimetable({
  params,
}: {
  params: { meetId: string };
}) {
  const { datesOrDays, meetType, startTime, endTime } = await getMeet(
    params.meetId
  );
  const userTimetable = (await getTimeTable(params.meetId)).timeTable;

  // if user create new timetable (userTimetable == null)
  const newTimetable: { [key: string]: [] } = {};
  if (userTimetable == null) {
    datesOrDays.forEach((date: string, i: number) => {
      newTimetable[date] = [];
    });
  }

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
    <div className="flex flex-col justify-center items-center text-xs mt-16">
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
          type={meetType}
          userTimetable={userTimetable == null ? newTimetable : userTimetable}
        />
      </div>
    </div>
  );
}
