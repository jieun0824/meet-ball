import { getMyInfo } from '@/controllers/user';
import {
  getMyManagingMeets,
  getMyParticipatingMeets,
} from '@/controllers/meet';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import PanelLayout from './PanelLayout';
import type { Meet } from '@prisma/client';

function ProfileIcon({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt="profile icon"
      width={100}
      height={100}
      className="rounded-full"
    />
  );
}

function UserName({ name }: { name: string }) {
  return <div className="text-3xl">{name}</div>;
}

function EditProfileButton() {
  return (
    <Link href="/mypage/edit" prefetch={false}>
      <button className="cursor-pointer pr-10 pl-10 pt-2 pb-2 m-4 rounded-lg bg-pointColor text-black flex justify-center active:bg-[#05957B] active:text-white">
        프로필 편집
      </button>
    </Link>
  );
}

function LogoutButton() {
  return (
    <a href="/api/auth/signout">
      <button className="cursor-pointer pr-10 pl-10 pt-2 pb-2 m-4 rounded-lg bg-red-600 text-white flex justify-center">
        로그아웃
      </button>
    </a>
  );
}

function ManagingMeetCard({ meet }: { meet: Meet }) {
  return <div>Managing{meet.name}</div>;
}

function ManagingMeetsPanel({ managingMeets }: { managingMeets: Meet[] }) {
  return (
    <>
      {managingMeets.map(meet => (
        <ManagingMeetCard key={meet.id} meet={meet} />
      ))}
    </>
  );
}

function ParticipatingMeetCard({ meet }: { meet: Meet }) {
  return <div>Participating {meet.name}</div>;
}

function ParticipatingMeetsPanel({
  participatingMeets,
}: {
  participatingMeets: Meet[];
}) {
  return (
    <>
      {participatingMeets.map(meet => (
        <ParticipatingMeetCard key={meet.id} meet={meet} />
      ))}
    </>
  );
}

export default async function MyPage() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  const myInfo = await getMyInfo();
  const myManagingMeets = await getMyManagingMeets();
  const myParticipatingMeets = await getMyParticipatingMeets();
  return (
    <div className="flex flex-col items-center justify-center">
      <ProfileIcon src={myInfo.image ?? ''} />
      <UserName name={myInfo.name ?? ''} />
      <EditProfileButton />
      <PanelLayout
        titles={['생성한 미트볼', '참여중인 미트볼']}
        panels={[
          <ManagingMeetsPanel key={0} managingMeets={myManagingMeets} />,
          <ParticipatingMeetsPanel
            key={1}
            participatingMeets={myParticipatingMeets}
          />,
        ]}
      />
      <LogoutButton />
    </div>
  );
}
