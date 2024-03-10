import DatesSelector from '@/components/calendar/dates-selector';
import { auth } from '@/auth';
import MainCard from '@/components/card/main-card';
import {
  getMyManagingMeets,
  getMyParticipatingMeets,
} from '@/controllers/meet';
import Link from 'next/link';

async function fetchData() {
  const myManagingMeets = await getMyManagingMeets();
  const myParticipatingMeets = await getMyParticipatingMeets();
  return [myManagingMeets, myParticipatingMeets];
}

export default async function MainPage() {
  const session = await auth();
  const [myManagingMeets, myParticipatingMeets] = await fetchData();

  const managingMeetsContent = session && myManagingMeets.length !== 0 && (
    <div className="flex flex-col mb-10">
      <div className="my-10">
        <div className="mb-[20px]">최근 생성 이벤트</div>
        <Link href={`/meet/${myManagingMeets[myManagingMeets.length - 1].id}`}>
          <MainCard
            meetName={myManagingMeets[myManagingMeets.length - 1].name}
            description={
              myManagingMeets[myManagingMeets.length - 1].description
            }
            startTime={myManagingMeets[myManagingMeets.length - 1].startTime}
            endTime={myManagingMeets[myManagingMeets.length - 1].endTime}
          />
        </Link>
      </div>
    </div>
  );

  const participatingMeetsContent = session &&
    myParticipatingMeets.length !== 0 && (
      <div>
        <div className="mb-[20px]">최근 참여 이벤트</div>
        <Link
          href={`/meet/${myParticipatingMeets[myParticipatingMeets.length - 1].id}`}
        >
          <MainCard
            meetName={
              myParticipatingMeets[myParticipatingMeets.length - 1].name
            }
            description={
              myParticipatingMeets[myParticipatingMeets.length - 1].description
            }
            startTime={
              myParticipatingMeets[myParticipatingMeets.length - 1].startTime
            }
            endTime={
              myParticipatingMeets[myParticipatingMeets.length - 1].endTime
            }
          />
        </Link>
      </div>
    );
  return (
    <div className="flex mobile:flex-col items-center mobile:px-4 laptop:px-10 laptop:justify-evenly laptop:gap-10 desktop:justify-evenly">
      <DatesSelector />
      {managingMeetsContent}
      {participatingMeetsContent}
    </div>
  );
}
