'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import createMeetFromInput from './actions/createMeetFormAction';
import {
  MeetNameInput,
  MeetDescriptionInput,
  MeetTimeInput,
  ConfirmTimeInput,
  MeetPasswordInput,
} from './inputs';

async function clientAction(formData: FormData) {
  // TODO: client-side validation here

  // remove once it's used
  localStorage.removeItem('selection');

  await createMeetFromInput(formData);
}

export default function MeetForm() {
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
