import EditForm from './EditMeetForm';
import { getMeet } from '../../../../controllers/meet';

export default async function EditMeetPage({
  params,
}: {
  params: { meetId: string };
}) {
  const meet = await getMeet(params.meetId);
  return <EditForm meet={meet} />;
}
