'use client';

import { useRouter } from 'next/navigation';
import handleSubmit from './action';
import { useEffect } from 'react';

async function clientAction(formData: FormData) {
    // TODO: client-side validation here

    // remove once it's used
    localStorage.removeItem('selection'); 

    await handleSubmit(formData);
}

export default function MeetForm() {
  const hours = Array.from({ length: 24 }, (_, index) => index + 1);
  const mins = [0, 30];

  const router = useRouter();
  useEffect(() => {
    // extract data from localStorage
    const selection = localStorage.getItem('selection');
    if (!selection) {
      alert('No selection');
      router.push('/');
    } else {
      const { mode, selections } = JSON.parse(selection);

      // set mode and selections to form
      const modeInput = document.querySelector<HTMLInputElement>(
        'input[name="meetingMode"]'
      );
      if (modeInput) {
        modeInput.value = mode;
      }
      const selectionsInput = document.querySelector<HTMLInputElement>(
        'input[name="meetingSelections"]'
      );
      if (selectionsInput) {
        selectionsInput.value = selections;
      }
    }
  });
  return (
    <form action={clientAction} className="grid text-white place-items-center">
      <input type="hidden" readOnly name="meetingMode"></input>
      <input type="hidden" readOnly name="meetingSelections"></input>
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
              defaultValue={new Date().toISOString().split('T')[0]}
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
  );
}
