import type { Route } from "./+types/home";
import { Link } from "react-router";
import { SONG_DATA, ALLOWED_SONG_IDS, SongId } from "../data/songData";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Lomax Legacy - Bosque Lomax" },
    {
      name: "description",
      content:
        "Explore classic cowboy songs and hear how different musicians have reimagined them across generations.",
    },
  ];
}

const SONG_BUTTON_LABELS: Record<SongId, string> = {
  [SongId.HomeOnTheRange]: "Home on the Range",
  [SongId.TheOldChisholmTrail]: "The Old Chisholm Trail",
  [SongId.WhereDidYouSleepLastNight]: "Where Did You Sleep Last Night (In the Pines)",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#3a2f1f] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0id29vZCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjM2EyZjFmIi8+PHBhdGggZD0iTTAgNTBIMTAwTTUwIDBWMTAwIiBzdHJva2U9IiMzMDI1MTUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ1cmwoI3dvb2QpIi8+PC9zdmc+')]">
      <div className="container mx-auto px-6 py-12">
        {/* Title Banner - Scroll Style */}
        <div className="flex justify-center mb-12">
          <div className="relative bg-[#f4e8d0] border-4 border-[#8b7355] rounded-lg px-12 py-6 shadow-lg">
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#f4e8d0] border-4 border-[#8b7355] rounded-full transform rotate-45"></div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#f4e8d0] border-4 border-[#8b7355] rounded-full transform rotate-45"></div>
            <div className="text-center">
              <div className="text-sm text-[#5c3d2e] mb-1">The</div>
              <div className="text-5xl md:text-6xl font-bold text-red-600 [text-shadow:2px_2px_0px_#fbbf24,-2px_-2px_0px_#fbbf24,2px_-2px_0px_#fbbf24,-2px_2px_0px_#fbbf24]">
                LOMAX
              </div>
              <div className="text-5xl md:text-6xl font-bold text-red-600 [text-shadow:2px_2px_0px_#fbbf24,-2px_-2px_0px_#fbbf24,2px_-2px_0px_#fbbf24,-2px_2px_0px_#fbbf24]">
                LEGACY
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <p className="text-white text-lg leading-relaxed">
              John Avery Lomax's recordings created a way for trail songs to be
              shared far and wide. Today, there are countless versions created
              by musicians across genres and generations.
            </p>
            <p className="text-white text-lg leading-relaxed">
              Explore these three classic cowboy songs to hear how different
              musicians have reimagined them.
            </p>
          </div>

          {/* Right Column - Song Buttons */}
          <div className="flex flex-col gap-4">
            {ALLOWED_SONG_IDS.map((songId) => (
              <Link
                key={songId}
                to={`/detail/${songId}`}
                className="bg-[#6b7d47] hover:bg-[#7a8d55] text-white px-8 py-4 rounded-lg text-center text-lg font-semibold transition-colors"
              >
                {SONG_BUTTON_LABELS[songId]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
