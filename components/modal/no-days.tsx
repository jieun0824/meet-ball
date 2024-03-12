'use client';
import { useRouter } from 'next/navigation';

export default function NoDaysModal() {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white relative top-5 rounded-lg flex flex-col">
        <div className="px-8 py-6 text-2xl font-bold">
          <button
            className="w-9 h-9 rounded-full border-none cursor-pointer absolute left-1 top-1 flex items-center justify-center"
            onClick={onClickClose}
          >
            <svg
              width="24"
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div>날짜를 선택하세요.</div>
        </div>
      </div>
    </div>
  );
}
