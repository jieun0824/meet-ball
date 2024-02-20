import ModeComponent from '@/components/calendar/mode-component';
import MainCarousel from '@/components/card/main-carousel';
import mockupSchedules from '@/scheduleData.json';
import { auth } from '@/auth';

async function fetchData() {
  return mockupSchedules;
}

export default async function MainPage() {
  const session = await auth();
  const schedules = await fetchData();
  return (
    <div className="flex mobile:flex-col items-center mobile:px-4 laptop:px-10 laptop:justify-evenly laptop:gap-10 desktop:justify-evenly">
      <ModeComponent />
      {session && (
        <div className="laptop:flex laptop:flex-col">
          <MainCarousel title={'생성한 이벤트'} data={schedules} />
          <MainCarousel title={'참여중인 이벤트'} data={schedules} />
        </div>
      )}
    </div>
  );
}
