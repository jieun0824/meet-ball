'use client';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const formStatus = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-pointColor px-3 py-2 rounded-2xl items-center m-4"
      aria-disabled={formStatus.pending}
    >
      {formStatus.pending ? '생성중...' : '미트볼 굴리기!'}
    </button>
  );
}
