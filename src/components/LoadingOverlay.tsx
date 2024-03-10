'use client';

import FadeLoader from 'react-spinners/FadeLoader';

export default function LoadingOverlay() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-999 flex justify-center items-center">
      <FadeLoader color="white" />
    </div>
  );
}
