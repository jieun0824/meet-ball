'use client';

import { useFormStatus } from 'react-dom';
import FadeLoader from 'react-spinners/FadeLoader';

export function SubmitButton({ text }: { text: string }) {
  const formStatus = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-pointColor px-3 py-2 rounded-2xl items-center m-4"
      aria-disabled={formStatus.pending}
    >
      {formStatus.pending ? <FadeLoader color="white" /> : <div>{text}</div>}
    </button>
  );
}
