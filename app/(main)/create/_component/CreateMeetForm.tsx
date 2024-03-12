'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { validateMeetMode } from '../../../../lib/validation';
import createMeetFromInput from './createMeetFromInput';
import {
  MeetNameInput,
  MeetDescriptionInput,
  MeetTimeInput,
  ConfirmTimeInput,
  MeetPasswordInput,
} from '../../../../components/meet-form/inputs';
import { SubmitButton } from '../../../../components/meet-form/SubmitButton';
import type FormState from '../../../../types/FormState';
import { initialFormState } from '../../../../types/FormState';
import LoadingOverlay from '../../../../components/LoadingOverlay';

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
    const createdMeet = await createMeetFromInput(formData);
    return {
      state: 'success',
      meetId: createdMeet.id,
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

export default function MeetForm() {
  const router = useRouter();
  const [formState, formAction] = useFormState<ExtendedFormState, FormData>(
    clientAction,
    extendedInitialFormState
  );
  const [isLoading, setIsLoading] = useState(false);
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
  }, []);
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
        <input type="hidden" readOnly name="meetMode"></input>
        <input type="hidden" readOnly name="meetSelections"></input>
        <MeetNameInput />
        <MeetDescriptionInput />
        <MeetTimeInput />
        <ConfirmTimeInput />
        <MeetPasswordInput />
        <SubmitButton text="미트볼 굴리기!" />
      </form>
    </>
  );
}
