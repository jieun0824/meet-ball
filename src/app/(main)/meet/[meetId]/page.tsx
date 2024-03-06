import Link from 'next/link';
import { Prisma } from '@prisma/client';
import type { ParticipantsOnMeets } from '@prisma/client';
import type CombinedTimeTable from '../../../../../types/CombinedTimeTable';
import TimeTableComponent from '@/components/timeTable/timetable';
import { getMeetWithParticipants } from '@/controllers/meet';
import { AddPersonIcon, GearIcon } from '@/components/icon';

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
  } = await getMeetWithParticipants(params.meetId);

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

  const combinedTimeTable = combineTimeTables(participants);

  return (
    <div className="pb-8 px-20">
      <div className="flex items-center w-full">
        <p className="text-xl mt-3 grow">{name}</p>
        <Link href={`/edit/${params.meetId}`}>
          <GearIcon />
        </Link>
        <Link href={`/meet/${params.meetId}/invite`}>
          <AddPersonIcon />
        </Link>
      </div>
      <p className="text-sm h-[40px] border rounded-lg p-2 mt-3 w-full">
        {description}
      </p>
      <TimeTableComponent
        startTime={startTime}
        endTime={endTime}
        datesOrDays={datesOrDays}
        type={meetType}
        timetable={combinedTimeTable}
        participantsNum={participants.length}
      />
    </div>
  );
}
