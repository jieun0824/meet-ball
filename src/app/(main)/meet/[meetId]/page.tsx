import TimeTableBody from '@/components/timeTable/timeTableBody';

export default function MeetPage({ params }: { params: { meetId: string } }) {
  // dummy date
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 2);

  // dummy time
  const startTime: number = 14;
  const endTime: number = 20;
  const time: number = (endTime - startTime) / 0.5;

  const timeList: Array<number> = Array.from(
    { length: time },
    (_, index) => index
  );
  return (
    <div className="flex text-white">
      <div className="w-[50px]">
        <div className="h-[48px] mb-2">
          <p>Week</p>
        </div>
        {timeList.map((item: number, index: number) => {
          const tempTime: number = startTime + 0.5 * item;
          const tempHour: String = String(Math.floor(tempTime));
          const tempMin: String = tempTime % 1 === 0.5 ? '30' : '00';
          return (
            <p className=" text-sm" key={index}>
              {tempHour + ':' + tempMin}
            </p>
          );
        })}
      </div>
      <TimeTableBody
        startDate={startDate}
        endDate={endDate}
        time={time}
        checkedList={[1, 2, 10, 15]}
      ></TimeTableBody>
    </div>
  );
}
