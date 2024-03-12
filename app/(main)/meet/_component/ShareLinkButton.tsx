'use client';

import { ShareIcon } from '../../../../components/icon';

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    alert(error);
  }
}

export default function ShareLinkButton({ meetId }: { meetId: string }) {
  return (
    <button
      onClick={() => {
        copyToClipboard(`${window.location.origin}/meet/${meetId}`);
        alert("링크가 복사되었습니다!");
      }}
    >
      <ShareIcon />
    </button>
  );
}
