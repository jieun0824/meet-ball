import Link from 'next/link';
import { Prisma } from '@prisma/client';
import type { ParticipantsOnMeets } from '@prisma/client';
import type CombinedTimeTable from '@/types/CombinedTimeTable';
import TimeTableComponent from '@/components/timeTable/timetable';
import { getMeetWithParticipants } from '@/controllers/meet';
import { AddPersonIcon, GearIcon } from '@/components/icon';

export default async function MeetPage({
  params,
}: {
  params: { meetId: string };
}) {
  // 1. check meet exist on my participating meets
  // 
  const meet = await getMeetWithParticipants(params.meetId);

  function combineTimeTables(participants: ParticipantsOnMeets[]) {
    const combinedTimeTable: CombinedTimeTable = {};
    for (const key of meet.datesOrDays) {
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

  const combinedTimeTable = combineTimeTables(meet.participants);

  return (
    <div className="pb-8 px-20">
      <div className="flex items-center w-full">
        <p className="text-xl mt-3 grow">{meet.name}</p>
        <Link href={`/edit/${params.meetId}`}>
          <GearIcon />
        </Link>
        <Link href={`/meet/${params.meetId}/participants`}>
          <AddPersonIcon />
        </Link>
      </div>
      <p className="text-sm h-[40px] border rounded-lg p-2 mt-3 w-full">
        {meet.description}
      </p>
      <TimeTableComponent
        startTime={meet.startTime}
        endTime={meet.endTime}
        datesOrDays={meet.datesOrDays}
        type={meet.meetType}
        timetable={combinedTimeTable}
        participantsNum={meet.participants.length}
      />
    </div>
  );
}
