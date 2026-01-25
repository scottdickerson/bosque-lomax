import type { Route } from "./+types/home";
import { SongNavigation } from "../components/SongNavigation";

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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto px-6 py-12 pt-30">
        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              John Avery Lomax's recordings created a way for trail songs to be
              shared far and wide. Today, there are countless versions created
              by musicians across genres and generations.
            </p>
            <p className="text-lg leading-relaxed">
              Explore these three classic cowboy songs to hear how different
              musicians have reimagined them.
            </p>
          </div>

          {/* Right Column - Song Buttons */}
          <SongNavigation variant="large" />
        </div>
      </div>
    </div>
  );
}
