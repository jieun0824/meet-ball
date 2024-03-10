'use server';

import { updateMyInfo } from '@/controllers/user';
import { redirect } from 'next/navigation';

export default async function editProfileFormAction(formData: FormData) {
  const name = formData.get('name')?.toString();
  const image = formData.get('image')?.toString();
  await updateMyInfo({ name, image });
  redirect('/mypage');
}
