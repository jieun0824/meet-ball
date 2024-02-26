import TimeTable from '@/components/timetable/timetable';
import { getMeet, getTimeTable } from '@/controllers/meet';
import { Prisma } from '@prisma/client';

export default async function CreateTimetable({
  params,
}: {
  params: { meetId: string };
}) {
  const { name, description, startTime, endTime, datesOrDays, meetType } =
    await getMeet(params.meetId);
  const userTimetable = (await getTimeTable(params.meetId)).timeTable;
  console.log(userTimetable);

  // if user create new timetable (userTimetable == null)
  const newTimetable: { [key: string]: [] } = {};
  if (userTimetable == null) {
    datesOrDays.forEach((date: string, i: number) => {
      newTimetable[date] = [];
    });
  }

  // function createSelectedCollection(timeTable: Prisma.JsonValue): number[][] {
  //   let result = [];
  //   let index = 0;
  //   if (timeTable != null) {
  //     for (const [date, values] of Object.entries(timeTable)) {
  //       for (const value of values) {
  //         result.push([value - startTime]);
  //       }
  //       index++;
  //     }
  //   }
  //   return result;
  // }

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-xl mt-3 w-3/4">{name}</p>
        <p className="text-sm h-[40px] border rounded-lg p-2 mt-3 w-3/4">
          {description}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center text-xs mt-16">
        <TimeTable
          startTime={startTime}
          endTime={endTime}
          datesOrDays={datesOrDays}
          type={meetType}
          userTimetable={userTimetable !== null ? userTimetable : newTimetable}
        />
      </div>
    </div>
  );
}
