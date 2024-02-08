import TimeComponent from './timeComponent';

type timeObjectOfDateType = {
  [name: string]: Array<number>;
};

type timeOpacityType = {
  [time: string]: number;
};
type timeComponentLineProps = {
  timeObjectOfDate: timeObjectOfDateType;
  date: Date;
  startTimeNum: number;
  endTimeNum: number;
};

export default function TimeComponentLine({
  timeObjectOfDate,
  date,
  startTimeNum,
  endTimeNum,
}: timeComponentLineProps) {
  const dayStringList: Array<String> = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ];

  const componentDateNum: number = date.getDate();
  const dayString: String = dayStringList[date.getDay()];

  const scheduleOpacityOfTimeObject: timeOpacityType = {};
  for (let i: number = startTimeNum; i < endTimeNum; i++) {
    let count = 0;
    for (const key in timeObjectOfDate) {
      if (timeObjectOfDate[key].includes(i)) {
        count++;
      }
    }
    scheduleOpacityOfTimeObject[String(i)] = count;
  }

  return (
    <div className="">
      <div className="grid text-white h-[48px] place-items-center mb-2">
        <p className="text-sm">{componentDateNum}</p>
        <p className="text-sm">{dayString}</p>
      </div>
      {Object.keys(scheduleOpacityOfTimeObject).map(
        (timeIndex: string, index: number) => {
          const opacity = scheduleOpacityOfTimeObject[timeIndex];
          return (
            <div key={index} className="">
              <TimeComponent
                timeIndex={parseInt(timeIndex)}
                opacity={opacity}
                endTimeNum={endTimeNum}
              ></TimeComponent>
            </div>
          );
        }
      )}
    </div>
  );
}
