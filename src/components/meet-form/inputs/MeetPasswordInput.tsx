export default function MeetPasswordInput() {
  return (
    <div className="mt-[50px] w-[301px]">
      <p className="text-white">비밀번호 (선택)</p>
      <div className="h-[40px] border-2 rounded-md">
        <input
          type="text"
          placeholder="****"
          name="meetPassword"
          className="bg-bgColor items-center w-[290px] h-[35px]"
        />
      </div>
    </div>
  );
}
