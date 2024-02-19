import TimeTableBody from '@/components/timeTable/timeTableBody';

export default function MeetPage({ params }: { params: { meetId: string } }) {
  // dummy time
  const dummyTimeTableDate = {
    '2023-11-12': {
      Taegon: [0, 1, 2, 3, 5, 7, 8],
      Kim: [2, 3, 4, 5, 6, 8],
      John: [1, 2, 3, 4],
      Tae: [2, 3],
      Gon: [3],
    },
    '2023-11-13': {
      Taegon: [1, 2, 3],
      Kim: [2, 3, 4],
    },
  };

  const startTime: number = 0;
  const endTime: number = 10;
  return (
    <div className="grid place-items-center">
      <div className="w-[301px] text-white mt-5 ">
        <p className="text-2xl">회의 이름</p>
        <div className="w-[301px] h-[48px] mt-4 items-center border-2 rounded-lg border-white">
          <p className="">회의 설명 </p>
        </div>
      </div>
      <div className="">
        <TimeTableBody
          scheduledObject={dummyTimeTableDate}
          startTime={startTime}
          endTime={endTime}
        ></TimeTableBody>
      </div>
    </div>
  );
}
