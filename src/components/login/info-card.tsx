export default function InfoCard() {
  return (
    <>
      <div className="w-72 flex flex-col justify-center items-center bg-cardColor rounded-xl">
        <div className="mb-4">
          <img
            draggable={false}
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Exploding%20Head.png"
            alt="Exploding Head"
            width={256}
            height={256}
          />
        </div>
        <span>언제 만나지? 머리 아픈 고민은 끝!</span>
      </div>
      <div className="w-72 flex flex-col justify-center items-center bg-cardColor rounded-xl">
        <div className="mb-4">
          <img
            draggable={false}
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Eyes.png"
            alt="Eyes"
            width={256}
            height={256}
          />
        </div>
        <span>언제 만나지? 머리 아픈 고민은 끝!</span>
      </div>
      <div className="w-72 flex flex-col justify-center items-center bg-cardColor rounded-xl">
        <div className="mb-4">
          <img
            draggable={false}
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Backhand%20Index%20Pointing%20Down.png"
            alt="Backhand Index Pointing Down"
            width={256}
            height={256}
          />
        </div>
        <span>구글 로그인으로 쉽게 시작해보세요</span>
      </div>
    </>
  );
}
