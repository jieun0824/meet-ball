'use client';

import Link from 'next/link';
import editProfileFormAction from './editProfileFormAction';
import type FormState from '../../../../../types/FormState';
import { initialFormState } from '../../../../../types/FormState';
import { SubmitButton } from '../../../../../components/meet-form/SubmitButton';
import LoadingOverlay from '../../../../../components/LoadingOverlay';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

async function clientAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    await editProfileFormAction(formData);
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

export default function EditProfileForm({
  currentName,
  currentImage,
}: {
  currentName?: string | null;
  currentImage?: string | null;
}) {
  const router = useRouter();
  const [formState, formAction] = useFormState<FormState, FormData>(
    clientAction,
    initialFormState
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (formState.state === 'success') {
      setIsLoading(true);
      router.push('/mypage');
    } else if (formState.state === 'error') {
      alert(formState.error);
    }
  }, [formState]);
  return (
    <>
      {isLoading && <LoadingOverlay />}
      <form action={formAction}>
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            name="name"
            defaultValue={currentName === null ? '' : currentName}
            className="text-black"
          />
        </div>
        <div>
          <label htmlFor="image">이미지 링크</label>
          <input
            type="text"
            name="image"
            defaultValue={currentImage === null ? '' : currentImage}
            className="text-black"
          />
        </div>
        <SubmitButton text="업데이트" />
        <Link href="/mypage">돌아가기</Link>
      </form>
    </>
  );
}
