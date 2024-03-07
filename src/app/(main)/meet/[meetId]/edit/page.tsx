import TimeTableEditor from '@/components/timeTable-edit/timetable-editor';
import { getMeetWithParticipants, getMyTimeTable } from '@/controllers/meet';

export default async function EditTimetable({
  params,
}: {
  params: { meetId: string };
}) {
  const { name, description, datesOrDays, meetType, startTime, endTime } =
    await getMeetWithParticipants(params.meetId);
  const userTimeTable = (await getMyTimeTable(params.meetId)) ?? {};
  for (const key of datesOrDays) {
    userTimeTable[key] = [];
  }

  return (
    <div className="pb-8 px-20">
      <div className="flex flex-col items-center justify-center">
        <p className="text-xl mt-3 w-full">{name}</p>
        <p className="text-sm h-[40px] border rounded-lg p-2 mt-3 w-full">
          {description}
        </p>
      </div>
      <TimeTableEditor
        startTime={startTime}
        endTime={endTime}
        datesOrDays={datesOrDays}
        type={meetType}
        timeTable={userTimeTable}
      />
    </div>
  );
}
