'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { validateMeetMode, validateString } from '@/lib/validation';
import createMeetFromInput from './actions/createMeetFormAction';
import {
  MeetNameInput,
  MeetDescriptionInput,
  MeetTimeInput,
  ConfirmTimeInput,
  MeetPasswordInput,
} from './inputs';

async function clientAction(formData: FormData) {
  const meetName = formData.get('meetName')?.toString();
  if (!validateString(meetName)) alert('이름을 입력하세요.');

  // remove once it's used
  localStorage.removeItem('selection');

  await createMeetFromInput(formData);
}

export default function MeetForm() {
  const router = useRouter();
  useEffect(() => {
    // extract data from localStorage
    const selection = localStorage.getItem('selection');
    try {
      if (!selection) {
        throw new Error('선택한 날짜가 없습니다.');
      } else {
        const { mode, selections } = JSON.parse(selection);
        if (!validateMeetMode(mode))
          throw new Error('선택 날짜에 이상이 있습니다.');
        if (!selections || selections.length === 0)
          throw new Error('선택한 날짜가 없습니다.');

        // set mode and selections to form
        const modeInput = document.querySelector<HTMLInputElement>(
          'input[name="meetMode"]'
        );
        if (modeInput) {
          modeInput.value = mode;
        }
        const selectionsInput = document.querySelector<HTMLInputElement>(
          'input[name="meetSelections"]'
        );
        if (selectionsInput) {
          selectionsInput.value = selections;
        }
      }
    } catch (error) {
      alert(error);
      router.push('/');
    }
  });
  return (
    <form action={clientAction} className="grid text-white place-items-center">
      <input type="hidden" readOnly name="meetMode"></input>
      <input type="hidden" readOnly name="meetSelections"></input>
      <MeetNameInput />
      <MeetDescriptionInput />
      <MeetTimeInput />
      <ConfirmTimeInput />
      <MeetPasswordInput />
      <div className="grid w-[301px] h-[40px] mt-[20px] place-items-center">
        <div className="grid pacle-items-center bg-textColor w-[100px] h-[40px] rounded-2xl">
          <button type="submit" className="items-center">
            미트볼 굴리기!
          </button>
        </div>
      </div>
    </form>
  );
}
