import { ReactHTMLElement } from 'react';

type timeComponentProps = {
  timeIndex: number;
  opacity: number;
  endTimeNum: number;
};
export default function TimeComponent({
  timeIndex,
  opacity,
  endTimeNum,
}: timeComponentProps) {
  const backgroundColorByOpcity: (opacity: number) => JSX.Element = (
    opacity: number
  ) => {
    switch (opacity) {
      case 0:
        return <div className="h-[18px]"></div>;
      case 1:
        return <div className="h-[18px] bg-zinc-200"></div>;
      case 2:
        return <div className="h-[18px] bg-zinc-400"></div>;
      case 3:
        return <div className="h-[18px] bg-zinc-600"></div>;
      case 4:
        return <div className="h-[18px] bg-zinc-800"></div>;
      case 5:
        return <div className="h-[18px] bg-zinc-900"></div>;
      default:
        return <div className="h-[18px] bg-zinc-950"></div>;
    }
  };

  return (
    <>
      {timeIndex % 2 === 1 &&
        (timeIndex === endTimeNum - 1 ? (
          <div className=" h-[20px] border-b-2 border-white">
            {backgroundColorByOpcity(opacity)}
          </div>
        ) : (
          <div className=" h-[20px] border-white">
            {backgroundColorByOpcity(opacity)}
          </div>
        ))}
      {timeIndex % 2 === 0 && (
        <div className=" h-[20px] border-t-2 border-white">
          {backgroundColorByOpcity(opacity)}
        </div>
      )}
    </>
  );
}
