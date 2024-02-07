import ModeComponent from '@/components/calendar/mode-component';
import EventButton from '@/components/button/event-button';
import MainCarousel from '@/components/card/main-carousel';

async function fetchData() {
  const res = await fetch('http://localhost:3001/api/meets', {
    next: { tags: ['schedules'] }, //for revalidating
  });
  const { schedules } = await res.json();
  return schedules;
}

export default async function MainPage() {
  const schedules = await fetchData();
  return (
    <div className="flex justify-center items-center flex-col">
      <ModeComponent />
      <EventButton title={'🧆 미트볼 굴리기'} />
      <MainCarousel title={'생성한 이벤트'} data={schedules} />
      <MainCarousel title={'참여중인 이벤트'} data={schedules} />
    </div>
  );
}
