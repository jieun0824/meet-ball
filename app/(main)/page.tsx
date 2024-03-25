import DatesSelector from './_component/dates-selector';
import MainCard from '../../components/card/main-card';
import {
  getMyManagingMeets,
  getMyParticipatingMeets,
} from '../../controllers/meet';
import { getCurrentUser } from '../../lib/authentication';

function CardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full max-w-[456px] gap-10">{children}</div>
  );
}

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
    <div className="w-full flex mobile:flex-col items-center gap-10 desktop:justify-center laptop:justify-center">
      <DatesSelector />
      {myManagingMeets || myManagingMeets ? (
        <CardWrapper>
          {myManagingMeets ? (
            <div>
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
            <div>
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
        </CardWrapper>
      ) : null}
    </div>
  );
}
