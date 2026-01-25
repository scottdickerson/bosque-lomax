import type { Route } from "./+types/detail";
import { Link } from "react-router";
import { SONG_DATA, ALLOWED_SONG_IDS, SongId } from "../data/songData";

const SONG_BUTTON_LABELS: Record<SongId, string> = {
  [SongId.HomeOnTheRange]: "Home on the Range",
  [SongId.TheOldChisholmTrail]: "The Old Chisholm Trail",
  [SongId.WhereDidYouSleepLastNight]: "Where Did You Sleep Last Night?",
};

export function meta({ params }: Route.MetaArgs) {
  const song = ALLOWED_SONG_IDS.includes(params.id as SongId)
    ? SONG_DATA[params.id as SongId]
    : null;
  return [
    { title: song ? `${song.title} - Bosque Lomax` : "Detail" },
    {
      name: "description",
      content: song?.description || `Detail page for ${params.id}`,
    },
  ];
}

export default function Detail({ params }: Route.ComponentProps) {
  const { id } = params;

  if (!ALLOWED_SONG_IDS.includes(id as SongId)) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Invalid Route</h1>
        <p className="text-gray-600">
          The route parameter "{id}" is not valid. Allowed values are:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2">
          {ALLOWED_SONG_IDS.map((allowedId) => (
            <li key={allowedId}>
              <a
                href={`/detail/${allowedId}`}
                className="text-blue-600 hover:underline"
              >
                {allowedId}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const song = SONG_DATA[id as SongId];

  return (
    <div className="min-h-screen bg-woodgrain">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-row gap-6 h-[calc(100vh-4rem)]">
          {/* Left Panel */}
          <div className="flex flex-col w-1/4">
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6">
              {song.title}
            </h1>
            <p className="text-white text-sm leading-relaxed whitespace-pre-line mb-auto">
              {song.description}
            </p>
            <div className="mt-8 space-y-3">
              {ALLOWED_SONG_IDS.filter((songId) => songId !== id).map(
                (otherSongId) => (
                  <Link
                    key={otherSongId}
                    to={`/detail/${otherSongId}`}
                    className="block bg-[#6b7d47] hover:bg-[#7a8d55] text-white px-6 py-3 rounded-lg text-center transition-colors"
                  >
                    {SONG_BUTTON_LABELS[otherSongId]}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Center Panel */}
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="w-full max-w-2xl aspect-square bg-[#5c3d2e] border-2 border-yellow-400/30 rounded-lg flex items-center justify-center mb-8 cursor-pointer hover:border-yellow-400/50 transition-colors">
              <p className="text-yellow-400 text-xl font-semibold text-center px-8">
                DRAG A RECORDING HERE TO PLAY
              </p>
            </div>
            <div className="w-full max-w-2xl flex items-center gap-4">
              <button className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <svg
                  className="w-6 h-6 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full flex gap-1 px-1">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-white rounded-sm"
                      style={{
                        height: `${Math.random() * 60 + 20}%`,
                        marginTop: "auto",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col gap-4 overflow-y-auto pr-2 ">
            {song.recordings.map((recording, index) => (
              <div key={index} className="relative h-[176px] w-[176px]">
                <img
                  src={recording.image}
                  alt={recording.artist}
                  className="relative w-full h-full object-cover rounded-lg z-10"
                />
                <div className="absolute inset-0 bg-[#8B272D] border-2 border-[#F3E5CA] rounded-lg cursor-pointer mix-blend-multiply "></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
