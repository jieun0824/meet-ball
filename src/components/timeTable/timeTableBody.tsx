import TimeComponentLine from './timeComponentLine';

type timeTableProps = {
  startDate: Date;
  endDate: Date;
  time: number;
  checkedList: number[];
};

type resolvedCheckedListType = {
  dateIndex: number;
  timeIndex: number;
};

type indexedCheckedListType = {
  dateIndex: number;
  timeIndexList: Array<number>;
};

export default function TimeTableBody({
  startDate,
  endDate,
  time,
  checkedList,
}: timeTableProps) {
  // const resolvedCheckedList: Array<number>[] = Array.from(
  //   { length: date },
  //   () => Array(0)
  // );
  // for (const item of checkedList) {
  //   const itemRow: number = item % time;
  //   const itemCol: number = Math.floor(item / time);
  //   resolvedCheckedList[itemCol].push(itemRow);
  // }
  const startDateNum = startDate.getDate();
  const endDateNum = endDate.getDate();
  const date = endDateNum - startDateNum + 1;
  const resolvedCheckedList: Array<resolvedCheckedListType> = checkedList.map(
    (item: number) => {
      const itemRow: number = item % time;
      const itemCol: number = Math.floor(item / time);
      return { dateIndex: itemCol, timeIndex: itemRow };
    }
  );

  const indexedCheckedList: Array<indexedCheckedListType> = [];

  for (let i: number = 0; i < date; i++) {
    const temp: Array<number> = resolvedCheckedList
      .filter((item: resolvedCheckedListType) => {
        return item.dateIndex === i;
      })
      .map((item: resolvedCheckedListType) => {
        return item.timeIndex;
      });

    indexedCheckedList.push({ dateIndex: i, timeIndexList: temp });
  }
  return (
    <div className="flex">
      {indexedCheckedList.map((item: indexedCheckedListType, index: number) => {
        return (
          <div key={index}>
            <TimeComponentLine
              Key={item.dateIndex}
              isCheckedList={item.timeIndexList}
              time={time}
              startDate={startDate}
            ></TimeComponentLine>
          </div>
        );
      })}
    </div>
  );
}
