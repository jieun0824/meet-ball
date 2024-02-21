export function InfoCardWrapper({
  title,
  source,
}: {
  title: string;
  source: string;
}) {
  return (
    <div className="w-72 flex flex-col justify-end items-center rounded-xl">
      <div className="mb-4">
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
      <InfoCardWrapper
        title="언제 만나지? 머리 아픈 고민은 끝!"
        source="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Exploding%20Head.png"
      />
      <InfoCardWrapper
        title="언제 만나지? 머리 아픈 고민은 끝!"
        source="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Eyes.png"
      />
      <InfoCardWrapper
        title="구글 로그인으로 쉽게 시작해보세요"
        source="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Backhand%20Index%20Pointing%20Down.png"
      />
    </>
  );
}
