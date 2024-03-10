'use client';

import type FormState from '../../../../../../types/FormState';
import { useFormState } from 'react-dom';
import participateMeetAction from './participateMeetAction';
import { useEffect, useState } from 'react';
import LoadingOverlay from '../../../../../../components/LoadingOverlay';
import { useRouter } from 'next/navigation';
import { SubmitButton } from '../../../../../../components/meet-form/SubmitButton';

async function clientAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    await participateMeetAction(formData);
    return {
      state: 'success',
      error: null,
    };
  } catch (error) {
    return {
      state: 'error',
      error: error instanceof Error ? error.message : 'unexpected error',
    };
  }
}

export default function ParticipateForm({
  meetId,
  isProtected,
}: {
  meetId: string;
  isProtected: boolean;
}) {
  const router = useRouter();
  const [formState, formAction] = useFormState<FormState, FormData>(
    clientAction,
    {
      state: 'idle',
      error: null,
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (formState.state === 'success') {
      setIsLoading(true);
      router.push(`/meet/${meetId}`);
    } else if (formState.state === 'error') {
      alert(formState.error);
    }
  }, [formState]);
  return (
    <>
      {isLoading && <LoadingOverlay />}
      <form action={formAction}>
        <input type="hidden" name="meetId" value={meetId} readOnly />
        <input
          type={isProtected ? 'password' : 'hidden'}
          className="text-black"
          name="meetPassword"
        />
        <SubmitButton text="참가하기" />
      </form>
    </>
  );
}
