import { usePlayer } from "../contexts/PlayerContext";
import { RecordingList } from "./RecordingList";

export function RightPanel() {
  const { song, songId, selectedRecording } = usePlayer();

  return (
    <RecordingList
      recordings={song.recordings}
      songId={songId}
      selectedRecording={selectedRecording}
    />
  );
}
