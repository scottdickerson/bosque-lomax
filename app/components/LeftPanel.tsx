import { usePlayer } from "../contexts/PlayerContext";
import { SongOverview } from "./SongOverview";
import { SongNavigation } from "./SongNavigation";

export function LeftPanel() {
  const { song, songId } = usePlayer();

  return (
    <div className="relative flex flex-col basis-1/4 flex-1 max-w-[475px] h-full">
      <div className="flex-1 flex items-center justify-center min-h-0">
        <SongOverview title={song.title} description={song.description} />
      </div>
      <div className="absolute bottom-20 left-0 right-0">
        <SongNavigation excludeId={songId} variant="compact" />
      </div>
    </div>
  );
}
