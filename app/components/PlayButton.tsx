import PausedIcon from "~/images/Paused.svg?url";
import PlayingIcon from "~/images/Playing.svg?url";

interface PlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function PlayButton({ isPlaying, onToggle }: PlayButtonProps) {
  return (
    <button
      className="w-[72px] h-[72px] flex items-center justify-center  hover:bg-white/20 rounded-full transition-colors"
      onClick={onToggle}
    >
      <img src={isPlaying ? PlayingIcon : PausedIcon} alt="Play" />
    </button>
  );
}
