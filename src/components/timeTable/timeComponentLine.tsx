import TimeComponent from './timeComponent';

type timeComponentLineProps = {
  Key: number;
  isCheckedList: number[];
  time: number;
  startDate: Date;
};

export default function TimeComponentLine({
  Key,
  isCheckedList,
  time,
  startDate,
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
  const times: Array<number> = Array.from(
    { length: time },
    (_, index) => index + 1
  );

  const componentDate = new Date();
  componentDate.setDate(startDate.getDate() + Key);
  const componentDateNum: number = componentDate.getDate();
  const dayString: String = dayStringList[componentDate.getDay()];

  return (
    <div className="">
      <div className="grid text-white w-[30px] place-items-center mb-2">
        <p>{componentDateNum}</p>
        <p>{dayString}</p>
      </div>
      {times.map(item => {
        return (
          <div key={item} className="">
            <TimeComponent
              Key={item}
              isChecked={isCheckedList.includes(item)}
              time={time}
            ></TimeComponent>
          </div>
        );
      })}
    </div>
  );
}
