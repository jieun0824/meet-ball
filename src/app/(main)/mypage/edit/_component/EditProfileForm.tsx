'use client';

import Link from 'next/link';
import editProfileFormAction from './editProfileFormAction';

export default function EditProfileForm({
  currentName,
  currentImage,
}: {
  currentName?: string | null;
  currentImage?: string | null;
}) {
  return (
    <form action={editProfileFormAction}>
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
      <button type="submit">업데이트</button>
      <Link href="/mypage">돌아가기</Link>
    </form>
  );
}
