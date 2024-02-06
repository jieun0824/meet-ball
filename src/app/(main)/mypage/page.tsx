import {
  getMyInfo,
  getMyManagingMeets,
  getMyParticipatingMeets,
} from '@/lib/actions';

export default async function MyPage() {
  const myInfo = await getMyInfo();
  const myManagingMeets = await getMyManagingMeets();
  const myParticipatingMeets = await getMyParticipatingMeets();
  return (
    <>
      <h1>MyPage</h1>
      <h2>MyInfo</h2>
      <div>{JSON.stringify(myInfo)}</div>
      <h2>MyManagingMeets</h2>
      <div>{JSON.stringify(myManagingMeets)}</div>
      <h2>MyParticipatingMeets</h2>
      <div>{JSON.stringify(myParticipatingMeets)}</div>
    </>
  );
}
