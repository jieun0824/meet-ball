'use server';

import { updateMyInfo } from '@/controllers/user';

export default async function editProfileFormAction(formData: FormData) {
  const name = formData.get('name')?.toString();
  const image = formData.get('image')?.toString();
  await updateMyInfo({ name, image });
}
