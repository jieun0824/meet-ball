import ModeComponent from '@/components/calendar/mode-component';
import MainCarousel from '@/components/card/main-carousel';
import { auth } from '@/auth';

async function fetchData() {
  const res = await fetch('http://localhost:3000/api/meets', {
    next: { tags: ['schedules'] }, //for revalidating
  });
  const { schedules } = await res.json();
  return schedules;
}

export default async function MainPage() {
  const session = await auth();
  const schedules = await fetchData();
  return (
    <div className="flex justify-center items-center flex-col">
      <ModeComponent />
      {session && (
        <>
          <MainCarousel title={'생성한 이벤트'} data={schedules} />
          <MainCarousel title={'참여중인 이벤트'} data={schedules} />
        </>
      )}
    </div>
  );
}
