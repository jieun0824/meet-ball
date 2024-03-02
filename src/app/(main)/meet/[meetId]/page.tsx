import TimeTable from '@/components/timeTable/timetable';
import { MeetWithParticipants, getMeet } from '@/controllers/meet';
import { ParticipantsOnMeets } from '@prisma/client';

export type participantsType = {
  userId: string;
  timeTable: {
    [key: string]: number[];
  };
}[];

export type transformedParticipantsType = {
  [key: string]: { [key: string]: number[] };
};

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
    //participants,
  } = await getMeet(params.meetId);

  // dummy time
  const participants: participantsType = [
    {
      userId: 'Taegon',
      timeTable: {
        '2024-02-12': [28, 29, 30],
        '2024-02-13': [],
        '2024-02-15': [],
        '2024-02-16': [],
        '2024-02-17': [],
      },
    },
    {
      userId: 'Jieun',
      timeTable: {
        '2024-02-12': [28, 29, 30, 31, 32, 33],
        '2024-02-13': [],
        '2024-02-15': [28, 29, 30, 31, 32],
        '2024-02-16': [],
        '2024-02-17': [],
      },
    },
    {
      userId: 'Gwon',
      timeTable: {
        '2024-02-12': [28, 29, 30],
        '2024-02-13': [],
        '2024-02-15': [27, 28, 29],
        '2024-02-16': [],
        '2024-02-17': [],
      },
    },
  ];

  function transformData(participants: participantsType) {
    const transformedData: transformedParticipantsType = {};

    participants.forEach(participant => {
      const userId = participant.userId;

      Object.keys(participant.timeTable).forEach(date => {
        if (!transformedData[date]) {
          transformedData[date] = {};
        }

        transformedData[date][userId] = participant.timeTable[date];
      });
    });

    return transformedData;
  }

  const transformedParticipants = transformData(participants);

  return (
    <div className="pb-8 px-20">
      <div className="flex flex-col items-center justify-center">
        <p className="text-xl mt-3 w-full">{name}</p>
        <p className="text-sm h-[40px] border rounded-lg p-2 mt-3 w-full">
          {description}
        </p>
      </div>

      <TimeTable
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
