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
  const { name, description, datesOrDays, meetType, startTime, endTime } =
    await getMeet(params.meetId);
  const userTimetable = (await getTimeTable(params.meetId)).timeTable;

  // if user create new timetable (userTimetable == null)
  const newTimetable: { [key: string]: [] } = {};
  if (userTimetable == null) {
    datesOrDays.forEach((date: string, i: number) => {
      newTimetable[date] = [];
    });
  }

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
          userTimetable={userTimetable == null ? newTimetable : userTimetable}
        />
      </div>
    </div>
  );
}
