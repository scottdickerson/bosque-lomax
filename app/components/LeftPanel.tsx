import { usePlayer } from "../contexts/PlayerContext";
import { SongOverview } from "./SongOverview";
import { SongNavigation } from "./SongNavigation";

export function LeftPanel() {
  const { song, songId } = usePlayer();

  return (
    <div className="flex flex-col w-1/4 justify-end">
      <SongOverview title={song.title} description={song.description} />
      <SongNavigation excludeId={songId} variant="compact" />
    </div>
  );
}
