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
    <div className="min-h-screen flex flex-col items-center justify-end">
      <div className="px-48 py-12 flex flex-row align-center gap-20 pb-20">
        {/* Content Grid */}

        {/* Left Column - Text */}
        <div className="font-medium font-gentium-basic text-3xl leading-wide">
          <p className="mb-6">
            John Avery Lomax's recordings created a way for trail songs to be
            shared far and wide. Today, there are countless versions created by
            musicians across genres and generations.
          </p>
          <p>
            Explore these three classic cowboy songs to hear how different
            musicians have reimagined them.
          </p>
        </div>

        {/* Right Column - Song Buttons */}
        <SongNavigation variant="large" />
      </div>
    </div>
  );
}
