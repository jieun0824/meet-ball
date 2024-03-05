export default function TimeInput({
  name,
  defaultValue = 0,
}: {
  name: string;
  defaultValue?: number;
}) {
  const hour = Math.floor(defaultValue / 2);
  const minute = (defaultValue % 2) * 30;
  return (
    <>
      <select name={`${name}Hour`} defaultValue={hour} className="bg-cardColor w-[60px] rounded-md text-pointColor">
        {Array.from(Array(24).keys()).map(hour => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>
      <span> : </span>
      <select name={`${name}Minute`} defaultValue={minute} className="bg-cardColor w-[60px] rounded-md text-pointColor">
        <option value={0}>00</option>
        <option value={30}>30</option>
      </select>
    </>
  );
}
