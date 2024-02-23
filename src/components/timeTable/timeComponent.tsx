import { ReactHTMLElement } from 'react';

type timeComponentProps = {
  timeIndex: number;
  opacity: number;
  previousOpacity: number;
  nextOpacity: number;
  endTimeNum: number;
};
export default function TimeComponent({
  timeIndex,
  opacity,
  previousOpacity,
  nextOpacity,
  endTimeNum,
}: timeComponentProps) {
  const backgroundColorByOpcity: (
    opacity: number,
    previousOpacity: number,
    nextOpacity: number
  ) => JSX.Element = (
    opacity: number,
    previousOpacity: number,
    nextOpacity: number
  ) => {
    const returnedDiv = [];
    for (let i = 1; i <= opacity; i++) {
      switch (i) {
        case 1:
          if (previousOpacity < i && nextOpacity < i) {
            returnedDiv.push(
              <div className="absolute w-[29px] h-[20px] rounded-md bg-teal-100 bg-opacity-10 z-1"></div>
            );
            break;
          }
          if (previousOpacity < i) {
            returnedDiv.push(
              <div className="absolute w-[29px] h-[20px] rounded-t-md bg-teal-100 bg-opacity-10 z-1"></div>
            );
            break;
          }
          if (nextOpacity < i) {
            returnedDiv.push(
              <div className="absolute w-[29px] h-[20px] rounded-b-md bg-teal-100 bg-opacity-10 z-1"></div>
            );
            break;
          }
          returnedDiv.push(
            <div className="absolute w-[29px] h-[20px] bg-teal-100 bg-opacity-10 z-1"></div>
          );
          break;
        case 2:
          if (previousOpacity < i && nextOpacity < i) {
            returnedDiv.push(
              <div className="absolute w-[29px] h-[20px] rounded-md bg-teal-300 bg-opacity-40 z-2"></div>
            );
            break;
          }
          if (previousOpacity < i) {
            returnedDiv.push(
              <div className="absolute w-[29px] h-[20px] rounded-t-md bg-teal-300 bg-opacity-40 z-2"></div>
            );
            break;
          }
          if (nextOpacity < i) {
            returnedDiv.push(
              <div className="absolute w-[29px] h-[20px] rounded-b-md bg-teal-300 bg-opacity-40 z-2"></div>
            );
            break;
          }
          returnedDiv.push(
            <div className="absolute w-[29px] h-[20px] bg-teal-300 bg-opacity-40 z-2"></div>
          );
          break;
        case 3:
          if (previousOpacity < i && nextOpacity < i) {
            returnedDiv.push(
              <div className="absolute w-[29px] h-[20px] rounded-md bg-teal-300 bg-opacity-60 z-3"></div>
            );
            break;
          }
          if (previousOpacity < i) {
            returnedDiv.push(
              <div className="absolute w-[29px] h-[20px] rounded-t-md bg-teal-300 bg-opacity-60 z-3"></div>
            );
            break;
          }
          if (nextOpacity < i) {
            returnedDiv.push(
              <div className="absolute w-[29px] h-[20px] rounded-b-md bg-teal-300 bg-opacity-60 z-3"></div>
            );
            break;
          }
          returnedDiv.push(
            <div className="absolute w-[29px] h-[20px] bg-teal-300 bg-opacity-60 z-3"></div>
          );
          break;
        case 4:
          if (previousOpacity < i && nextOpacity < i) {
            returnedDiv.push(
              <div className="absolute w-[29px] h-[20px] rounded-md bg-teal-400 bg-opacity-80 z-4"></div>
            );
            break;
          }
          if (previousOpacity < i) {
            returnedDiv.push(
              <div className="absolute w-[29px] h-[20px] rounded-t-md bg-teal-400 bg-opacity-80 z-4"></div>
            );
            break;
          }
          if (nextOpacity < i) {
            returnedDiv.push(
              <div className="absolute w-[29px] h-[20px] rounded-b-md bg-teal-400 bg-opacity-80 z-4"></div>
            );
            break;
          }
          returnedDiv.push(
            <div className="absolute w-[29px] h-[20px] bg-teal-400 bg-opacity-80 z-4"></div>
          );
          break;
        case 5:
          if (previousOpacity < i && nextOpacity < i) {
            returnedDiv.push(
              <div className="absolute w-[29px] h-[20px] rounded-md bg-teal-300 bg-opacity-100 z-5"></div>
            );
            break;
          }
          if (previousOpacity < i) {
            returnedDiv.push(
              <div className="absolute w-[29px] h-[20px] rounded-t-md bg-teal-300 bg-opacity-100 z-5"></div>
            );
            break;
          }
          if (nextOpacity < i) {
            returnedDiv.push(
              <div className="absolute w-[29px] h-[20px] rounded-b-md bg-teal-300 bg-opacity-100 z-5"></div>
            );
            break;
          }
          returnedDiv.push(
            <div className="absolute w-[29px] h-[20px] bg-teal-300 bg-opacity-100 z-5"></div>
          );
          break;
      }
    }
    return <>{returnedDiv}</>;
  };
  // const backgroundColorByOpcity: (opacity: number) => JSX.Element = (
  //   opacity: number
  // ) => {
  //   switch (opacity) {
  //     case 0:
  //       return <div className="h-[18px]"></div>;
  //     case 1:
  //       return <div className="h-[18px] bg-zinc-200"></div>;
  //     case 2:
  //       return <div className="h-[18px] bg-zinc-400"></div>;
  //     case 3:
  //       return <div className="h-[18px] bg-zinc-600"></div>;
  //     case 4:
  //       return <div className="h-[18px] bg-zinc-800"></div>;
  //     case 5:
  //       return <div className="h-[18px] bg-zinc-900"></div>;
  //     default:
  //       return <div className="h-[18px] bg-zinc-950"></div>;
  //   }
  // };

  return (
    <>
      {timeIndex % 2 === 1 &&
        (timeIndex === endTimeNum - 1 ? (
          <div className="relative h-[20px] border-b-2 border-[#B1B1B1]">
            {backgroundColorByOpcity(opacity, previousOpacity, nextOpacity)}
          </div>
        ) : (
          <div className="relative h-[20px] border-[#B1B1B1]">
            {backgroundColorByOpcity(opacity, previousOpacity, nextOpacity)}
          </div>
        ))}
      {timeIndex % 2 === 0 && (
        <div className="relative h-[20px] border-t-2 border-[#B1B1B1]">
          {backgroundColorByOpcity(opacity, previousOpacity, nextOpacity)}
        </div>
      )}
    </>
  );
}
