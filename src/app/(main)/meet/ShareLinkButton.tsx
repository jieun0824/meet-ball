'use client';

import { ShareIcon } from '@/components/icon';

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
      }}
    >
      <ShareIcon />
    </button>
  );
}
