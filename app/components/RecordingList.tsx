import type { Recording } from "../data/songData";
import { RecordingThumbnail } from "./RecordingThumbnail";

interface RecordingListProps {
  recordings: Recording[];
  songId: string;
  selectedRecording: Recording | null;
  activeRecording: Recording | null;
}

export function RecordingList({
  recordings,
  songId,
  selectedRecording,
  activeRecording,
}: RecordingListProps) {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto pr-2" style={{ touchAction: "pan-y" }}>
      {recordings.map((recording, index) => (
        <RecordingThumbnail
          key={`${songId}-${index}`}
          id={`${songId}-${index}`}
          recording={recording}
          selectedRecording={selectedRecording}
          activeRecording={activeRecording}
        />
      ))}
    </div>
  );
}
