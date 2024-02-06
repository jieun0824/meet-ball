type timeComponentProps = {
  Key: number;
  isChecked: boolean;
  time: number;
};
export default function TimeComponent({
  Key,
  isChecked,
  time,
}: timeComponentProps) {
  return (
    <>
      {Key % 2 === 1 && (
        <>
          {Key != time && (
            <div className=" w-[50px] h-[20px] border-t-2 border-white">
              {isChecked && (
                <div className="w-[50px] h-[18px] bg-zinc-700"></div>
              )}
            </div>
          )}
          {Key === time && (
            <div className=" w-[50px] h-[20px] border-y-2 border-white">
              {isChecked && (
                <div className="w-[50px] h-[18px] bg-zinc-700"></div>
              )}
            </div>
          )}
        </>
      )}
      {Key % 2 === 0 && (
        <>
          {Key != time && (
            <div className=" w-[50px] h-[20px] border-white">
              {isChecked && (
                <div className="w-[50px] h-[18px] bg-zinc-700"></div>
              )}
            </div>
          )}
          {Key === time && (
            <div className=" w-[50px] h-[20px] border-b-2 border-white">
              {isChecked && (
                <div className="w-[50px] h-[18px] bg-zinc-700"></div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
