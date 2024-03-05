import TimeTableComponent from '@/components/timeTable/timetable';
import { getMeet } from '@/controllers/meet';
import { Prisma } from '@prisma/client';
import type { ParticipantsOnMeets } from '@prisma/client';
import type CombinedTimeTable from '../../../../../types/CombinedTimeTable';

export default async function MeetPage({
  params,
}: {
  params: { meetId: string };
}) {
  const {
    name,
    description,
    datesOrDays,
    meetType,
    startTime,
    endTime,
    participants,
  } = await getMeet(params.meetId);

  function combineTimeTables(participants: ParticipantsOnMeets[]) {
    const combinedTimeTable: CombinedTimeTable = {};
    for (const key of datesOrDays) {
      combinedTimeTable[key] = {};
    }

    for (const participant of participants) {
      const userId = participant.userId;
      const currentTimeTable = participant.timeTable as Prisma.JsonObject;
      for (const key in currentTimeTable) {
        combinedTimeTable[key][userId] = currentTimeTable[key] as number[];
      }
    }

    return combinedTimeTable;
  }

  const transformedParticipants = combineTimeTables(participants);

  return (
    <div className="pb-8 px-20">
      <div className="flex flex-col items-center justify-center">
        <p className="text-xl mt-3 w-full">{name}</p>
        <p className="text-sm h-[40px] border rounded-lg p-2 mt-3 w-full">
          {description}
        </p>
      </div>

      <TimeTableComponent
        startTime={startTime}
        endTime={endTime}
        datesOrDays={datesOrDays}
        type={meetType}
        timetable={transformedParticipants}
        participantsNum={participants.length}
      />
    </div>
  );
}
