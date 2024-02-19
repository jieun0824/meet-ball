import TimeComponent from './timeComponent';

type timeObjectOfDateType = {
  [name: string]: Array<number>;
};
type timeComponentLineProps = {
  timeObjectOfDate: timeObjectOfDateType;
  date: Date;
  startTimeNum: number;
  endTimeNum: number;
};

type timeOpacityType = {
  [name: string]: number;
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
    <div className="w-[29px]">
      <div className="grid h-[48px] place-items-center mb-2">
        <p className="text-sm">{componentDateNum}</p>
        <p className="text-sm">{dayString}</p>
      </div>
      {Object.keys(scheduleOpacityOfTimeObject).map(
        (timeIndex: string, index: number) => {
          let previousOpacity = 0;
          let nextOpacity = 0;
          const opacity = scheduleOpacityOfTimeObject[timeIndex];

          if (
            parseInt(timeIndex) !== startTimeNum &&
            parseInt(timeIndex) !== endTimeNum - 1
          ) {
            previousOpacity =
              scheduleOpacityOfTimeObject[String(parseInt(timeIndex) - 1)];
            nextOpacity =
              scheduleOpacityOfTimeObject[String(parseInt(timeIndex) + 1)];
          } else if (parseInt(timeIndex) === startTimeNum) {
            nextOpacity =
              scheduleOpacityOfTimeObject[String(parseInt(timeIndex) + 1)];
            previousOpacity = 0;
          } else if (parseInt(timeIndex) === endTimeNum - 1) {
            previousOpacity =
              scheduleOpacityOfTimeObject[String(parseInt(timeIndex) - 1)];
            nextOpacity = 0;
          }

          return (
            <div key={index} className="">
              <TimeComponent
                timeIndex={parseInt(timeIndex)}
                opacity={opacity}
                previousOpacity={previousOpacity}
                nextOpacity={nextOpacity}
                endTimeNum={endTimeNum}
              ></TimeComponent>
            </div>
          );
        }
      )}
    </div>
  );
}
