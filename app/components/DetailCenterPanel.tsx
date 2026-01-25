import { usePlayer } from "../contexts/PlayerContext";
import { CenterPanel } from "./CenterPanel";
import { PlayButton } from "./PlayButton";
import { ProgressBar } from "./ProgressBar";

export function DetailCenterPanel() {
  const { selectedRecording, isPlaying, progress, togglePlay } = usePlayer();

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <CenterPanel selectedRecording={selectedRecording} />
      <div className="w-full max-w-2xl flex items-center gap-4">
        <PlayButton isPlaying={isPlaying} onToggle={togglePlay} />
        <ProgressBar progress={progress} />
      </div>
    </div>
  );
}
