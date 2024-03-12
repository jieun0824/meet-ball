'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import type { Meet } from '@prisma/client';
import editMeetFromInput from './editMeetFromInput';
import {
  MeetNameInput,
  MeetDescriptionInput,
  MeetTimeInput,
  ConfirmTimeInput,
  MeetPasswordInput,
} from '../../../../../components/meet-form/inputs';
import { SubmitButton } from '../../../../../components/meet-form/SubmitButton';
import type FormState from '../../../../../types/FormState';
import { initialFormState } from '../../../../../types/FormState';
import LoadingOverlay from '../../../../../components/LoadingOverlay';

type ExtendedFormState = FormState & {
  meetId: string | null;
};
const extendedInitialFormState: ExtendedFormState = {
  ...initialFormState,
  meetId: null,
};

async function clientAction(
  prevState: ExtendedFormState,
  formData: FormData
): Promise<ExtendedFormState> {
  try {
    const editedMeet = await editMeetFromInput(formData);
    return {
      state: 'success',
      meetId: editedMeet.id,
      error: null,
    };
  } catch (error) {
    return {
      state: 'error',
      meetId: null,
      error: error instanceof Error ? error.message : 'unexpected error',
    };
  }
}

export default function EditForm({ meet }: { meet: Meet }) {
  const router = useRouter();
  const [formState, formAction] = useFormState<ExtendedFormState, FormData>(
    clientAction,
    extendedInitialFormState
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (formState.state === 'success') {
      setIsLoading(true);
      localStorage.removeItem('selection'); // remove selection after successful creation
      router.push(`/meet/${formState.meetId}`);
    } else if (formState.state === 'error') {
      alert(formState.error);
    }
  }, [formState]);

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <form action={formAction} className="grid text-white place-items-center">
        <input type="hidden" readOnly name="meetId" value={meet.id}></input>
        <MeetNameInput defaultName={meet.name} />
        <MeetDescriptionInput defaultDescription={meet.description} />
        <MeetTimeInput startTime={meet.startTime} endTime={meet.endTime} />
        <ConfirmTimeInput defaultTime={meet.confirmTime} />
        <MeetPasswordInput />
        <p>공란으로 비우면 비밀번호가 제거됩니다.</p>
        <SubmitButton text="업데이트" />
      </form>
    </>
  );
}
