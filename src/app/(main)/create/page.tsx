import { createMeet } from '@/controllers/meet';
import { redirect } from 'next/dist/server/api-utils';

export default function CreatePage() {
  async function handleSubmit(formData: FormData) {
    'use server';

    const meetingName = formData.get('meetingName') as string;
    const meetingDescription = formData.get('meetingDescription') as string;

    const scheduleEndDate = new Date(formData.get('scheduleEndDate') as string);
    // const scheduleEndHour = Number(formData.get('scheduleEndHour'));
    // const scheduleEndMin = formData.get('scheduleEndMin') == '0' ? 0 : 0.5;

    const meetingStartHour = Number(formData.get('meetingStartHour'));
    const meetingStartMin = formData.get('meetingStartMin') == '0' ? 0 : 0.5;
    const meetingEndHour = Number(formData.get('meetingEndHour'));
    const meetingEndMin = formData.get('meetingEndMin') == '0' ? 0 : 0.5;
    const password = formData.get('password') as string;
    await createMeet({
      name: meetingName,
      description: meetingDescription,
      startTime: 2 * (meetingStartHour + meetingStartMin), // 0-47
      endTime: 2 * (meetingEndHour + meetingEndMin), // 0-47
      confirmTime: scheduleEndDate,
      password: password,
    }).then(() => {
      redirect;
    });
  }

  const hours = Array.from({ length: 24 }, (_, index) => index + 1);
  const mins = [0, 30];

  return (
    <>
      <form
        action={handleSubmit}
        className="grid text-white place-items-center"
      >
        <div className="grid-1 w-[301px] h-[40px] border-b-2 mt-3 ">
          <input
            id="meetingName"
            name="meetingName"
            type="text"
            placeholder="회의 이름"
            className="bg-bgColor w-[301px] text-xl h-[40px]"
          ></input>
        </div>
        <div className="grid-1 border-2 rounded-sm  mt-3">
          <input
            id="meetingDescription"
            name="meetingDescription"
            type="text"
            placeholder="회의 설명"
            className="bg-bgColor w-[301px] text-sm h-[40px]"
          ></input>
        </div>
        <div className="w-[301px] mt-[50px]">
          <p className="mt-3 mb-5">회의 시간대</p>
          <div className="flex">
            <select
              name="meetingStartHour"
              className="w-[60px] bg-[#3C3F45] rounded-md text-[#20ECC7] "
            >
              {hours.map(hour => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <p>:</p>
            <select
              name="meetingStartMin"
              className="bg-[#3C3F45] w-[60px] rounded-md text-[#20ECC7] "
            >
              {mins.map(mins => (
                <option key={mins} value={mins}>
                  {mins}
                </option>
              ))}
            </select>
            <p>-</p>
            <select
              name="meetingEndHour"
              className="bg-[#3C3F45] w-[60px] rounded-md text-[#20ECC7]"
            >
              {hours.map(hour => (
                <option key={hour} value={hour} className="rounded-md">
                  {hour}
                </option>
              ))}
            </select>
            <p>:</p>
            <select
              name="meetingEndMin"
              className="bg-[#3C3F45] w-[60px] rounded-md text-[#20ECC7] "
            >
              {mins.map(mins => (
                <option key={mins} value={mins}>
                  {mins}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-[50px] w-[301px]">
          <p>일정 조율 종료 시간</p>
          <div className="flex">
            <div className="flex-1 mt-2">
              <p>날짜</p>
              <input
                type="date"
                id="scheduleEndDate"
                name="scheduleEndDate"
                value={new Date().toISOString().split('T')[0]}
                className="bg-[#3C3F45] rounded-md text-[#20ECC7]"
              />
            </div>
            <div className="flex-1 mt-3">
              <p>시간</p>
              <div className="text-textColor flex">
                <select
                  name="scheduleEndHour"
                  className="bg-selectColor rounded-md w-[60px]"
                >
                  {hours.map(hour => {
                    return (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    );
                  })}
                </select>
                <p className="text-white">:</p>
                <select
                  name="scheduleEndMin"
                  className="bg-selectColor rounded-md w-[60px]"
                >
                  {mins.map(min => {
                    return (
                      <option key={min} value={min}>
                        {min}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[50px] w-[301px]">
          <p className="text-white">비밀번호 (선택)</p>
          <div className="h-[40px] border-2 rounded-md">
            <input
              type="text"
              placeholder="****"
              name="password"
              className="bg-bgColor items-center w-[290px] h-[35px]"
            />
          </div>
        </div>
        <div className="grid w-[301px] h-[40px] mt-[20px] place-items-center">
          <div className="grid pacle-items-center bg-textColor w-[100px] h-[40px] rounded-2xl">
            <button type="submit" className="items-center">
              방 만들기
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
