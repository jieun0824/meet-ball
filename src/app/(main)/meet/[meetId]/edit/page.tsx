import TimeTableEditor from '@/components/timeTable-edit/timetable-editor';
import { getMeetWithParticipants, getMyTimeTable } from '@/controllers/meet';

export default async function EditTimetablePage({
  params,
}: {
  params: { meetId: string };
}) {
  const meet = await getMeetWithParticipants(params.meetId);
  const userTimeTable = (await getMyTimeTable(params.meetId)) ?? {};
  for (const key of meet.datesOrDays) {
    userTimeTable[key] = [];
  }

  return (
    <div className="pb-8 px-20">
      <p className="text-xl mt-3 w-full">{meet.name}</p>
      <p className="text-sm h-[40px] border rounded-lg p-2 mt-3 w-full">
        {meet.description}
      </p>
      <TimeTableEditor
        startTime={meet.startTime}
        endTime={meet.endTime}
        datesOrDays={meet.datesOrDays}
        type={meet.meetType}
        timeTable={userTimeTable}
      />
    </div>
  );
}
