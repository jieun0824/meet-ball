type ModeButtonProps = {
  title: string;
  mode: string;
  modeChange: () => void;
};

export default function ModeButton({
  title,
  mode,
  modeChange,
}: ModeButtonProps) {
  return (
    <button
      onClick={modeChange}
      className={`rounded-xl pr-4 pl-4 pt-1 pb-1 opacity-45 ${mode == title && 'bg-[#353945] opacity-100'}`}
    >
      {title}
    </button>
  );
}
