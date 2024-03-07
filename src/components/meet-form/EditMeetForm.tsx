'use client';

import type { Meet } from '@prisma/client';
import { validateString } from '@/lib/validation';
import handleSubmit from './editMeetFormAction';
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
  // TODO: more validation for update

  await handleSubmit(formData);
}

export default function EditForm({ meet }: { meet: Meet }) {
  return (
    <form action={clientAction} className="grid text-white place-items-center">
      <input type="hidden" readOnly name="meetId" value={meet.id}></input>
      <MeetNameInput defaultName={meet.name}/>
      <MeetDescriptionInput defaultDescription={meet.description}/>
      <MeetTimeInput startTime={meet.startTime} endTime={meet.endTime}/>
      <ConfirmTimeInput defaultTime={meet.confirmTime} />
      <MeetPasswordInput />
      <p>공란으로 비우면 비밀번호가 제거됩니다.</p>
      <div className="grid w-[301px] h-[40px] mt-[20px] place-items-center">
        <div className="grid pacle-items-center bg-textColor w-[100px] h-[40px] rounded-2xl">
          <button type="submit" className="items-center">
            업데이트
          </button>
        </div>
      </div>
    </form>
  );
}
