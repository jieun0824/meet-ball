import { CarouselItem } from '@/components/ui/carousel';

export function InfoCardWrapper({
  title,
  source,
}: {
  title?: string;
  source: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl">
      <div className="my-4">
        <img
          draggable={false}
          src={source}
          alt="info-card"
          width={256}
          height={256}
        />
      </div>
      <span className="font-normal">{title}</span>
    </div>
  );
}

export default function InfoCard() {
  return (
    <>
      <CarouselItem>
        <InfoCardWrapper
          title="언제 만나지? 머리 아픈 고민은 끝!"
          source="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Exploding%20Head.png"
        />
      </CarouselItem>
      <CarouselItem>
        <InfoCardWrapper
          title="언제 만나지? 머리 아픈 고민은 끝!"
          source="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Eyes.png"
        />
      </CarouselItem>
      <CarouselItem>
        <InfoCardWrapper
          title="구글 로그인으로 쉽게 시작해보세요"
          source="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Backhand%20Index%20Pointing%20Down.png"
        />
      </CarouselItem>
    </>
  );
}
