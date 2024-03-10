import TimeTableEditor from '@/components/timeTable-edit/timetable-editor';
import { getMeetWithParticipants, getMyTimeTable } from '@/controllers/meet';
import MeetDescription from '../../_component/MeetDescription';

export default async function EditTimetablePage({
  params,
}: {
  params: { meetId: string };
}) {
  const meet = await getMeetWithParticipants(params.meetId);
  const userTimeTable = (await getMyTimeTable(params.meetId)) ?? {};
  for (const key of meet.datesOrDays)
    if (!(key in userTimeTable)) userTimeTable[key] = [];

  return (
    <div className="pb-8 px-20">
      <p className="text-xl mt-3 w-full">{meet.name}</p>
      <MeetDescription description={meet.description} />
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
