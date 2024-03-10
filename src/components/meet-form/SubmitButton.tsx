'use client';

import { useFormStatus } from 'react-dom';
import FadeLoader from 'react-spinners/FadeLoader';

export function SubmitButton() {
  const formStatus = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-pointColor px-3 py-2 rounded-2xl items-center m-4"
      aria-disabled={formStatus.pending}
    >
      {formStatus.pending ? (
        <FadeLoader color="white" />
      ) : (
        '미트볼 굴리기!'
      )}
    </button>
  );
}
