import DatesSelector from '@/components/calendar/dates-selector';
import MainCard from '@/components/card/main-card';
import {
  getMyManagingMeets,
  getMyParticipatingMeets,
} from '@/controllers/meet';
import Link from 'next/link';

export default async function MainPage() {
  let myManagingMeets, myParticipatingMeets;
  try {
    myManagingMeets = await getMyManagingMeets();
    myParticipatingMeets = await getMyParticipatingMeets();
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex mobile:flex-col items-center mobile:px-4 laptop:px-10 laptop:justify-evenly laptop:gap-10 desktop:justify-evenly">
      <DatesSelector />
      <div className="flex flex-col">
        {myManagingMeets ? (
          <div className="my-10">
            <div className="mb-[20px]">최근 생성 이벤트</div>
            <Link
              href={`/meet/${myManagingMeets[myManagingMeets.length - 1].id}`}
            >
              <MainCard
                meetName={myManagingMeets[myManagingMeets.length - 1].name}
                description={
                  myManagingMeets[myManagingMeets.length - 1].description
                }
                startTime={
                  myManagingMeets[myManagingMeets.length - 1].startTime
                }
                endTime={myManagingMeets[myManagingMeets.length - 1].endTime}
              />
            </Link>
          </div>
        ) : null}
        {myParticipatingMeets ? (
          <div className="my-10">
            <div className="mb-[20px]">최근 참여 이벤트</div>
            <Link
              href={`/meet/${myParticipatingMeets[myParticipatingMeets.length - 1].id}`}
            >
              <MainCard
                meetName={
                  myParticipatingMeets[myParticipatingMeets.length - 1].name
                }
                description={
                  myParticipatingMeets[myParticipatingMeets.length - 1]
                    .description
                }
                startTime={
                  myParticipatingMeets[myParticipatingMeets.length - 1]
                    .startTime
                }
                endTime={
                  myParticipatingMeets[myParticipatingMeets.length - 1].endTime
                }
              />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
