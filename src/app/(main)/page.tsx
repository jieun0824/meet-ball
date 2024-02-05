import ModeComponent from '@/components/calendar/mode-component';
import EventButton from '@/components/button/button';
import MainCarousel from '@/components/card/main-carousel';

export default function MainPage() {
  return (
    <div className="flex justify-center items-center flex-col">
      <ModeComponent />
      <EventButton title={'🧆 미트볼 굴리기'} />
      <MainCarousel title={'생성한 이벤트'} />
      <MainCarousel title={'참여중인 이벤트'} />
    </div>
  );
}
