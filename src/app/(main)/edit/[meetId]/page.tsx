import { redirect } from 'next/navigation';
import EditForm from '@/components/meet-form/EditMeetForm';
import { getMeet } from '@/controllers/meet';

export default async function EditMeetPage({
  params,
}: {
  params: { meetId: string };
}) {
  const meet = await getMeet(params.meetId);
  if (!meet) {
    alert('존재하지 않는 미팅입니다!');
    redirect('/');
  } else return <EditForm meet={meet} />;
}
