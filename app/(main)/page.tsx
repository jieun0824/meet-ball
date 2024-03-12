import DatesSelector from '../../components/calendar/dates-selector';
import MainCard from '../../components/card/main-card';
import {
  getMyManagingMeets,
  getMyParticipatingMeets,
} from '../../controllers/meet';
import { getCurrentUser } from '../../lib/authentication';

export default async function MainPage() {
  let myManagingMeets, myParticipatingMeets;
  try {
    myManagingMeets = await getMyManagingMeets();
    myParticipatingMeets = await getMyParticipatingMeets();
  } catch (error) {
    console.log(error);
  }
  let currentUser = null;
  try {
    currentUser = await getCurrentUser();
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
            <MainCard
              meet={myManagingMeets[myManagingMeets.length - 1]}
              isMyMeet={
                myManagingMeets[myManagingMeets.length - 1].managerId ===
                currentUser?.id
              }
            />
          </div>
        ) : null}
        {myParticipatingMeets ? (
          <div className="my-10">
            <div className="mb-[20px]">최근 참여 이벤트</div>
            <MainCard
              meet={myParticipatingMeets[myParticipatingMeets.length - 1]}
              isMyMeet={
                myParticipatingMeets[myParticipatingMeets.length - 1]
                  .managerId === currentUser?.id
              }
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
