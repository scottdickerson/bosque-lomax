import type { Route } from "./+types/detail";
import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { SONG_DATA, ALLOWED_SONG_IDS, SongId, type Recording } from "../data/songData";
import { RecordingList } from "../components/RecordingList";
import { CenterPanel } from "../components/CenterPanel";
import { PlayButton } from "../components/PlayButton";
import { ProgressBar } from "../components/ProgressBar";

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
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeRecording, setActiveRecording] = useState<Recording | null>(
    null
  );

  // Configure sensors with activation constraints to prevent accidental drags
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required before drag starts
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200, // 200ms delay before drag starts on touch
        tolerance: 8, // 8px movement tolerance
      },
    })
  );

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

  // Clear selected recording when page/song changes
  useEffect(() => {
    setSelectedRecording(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
  }, [id]);

  // Update audio source when selectedRecording changes
  useEffect(() => {
    if (selectedRecording && audioRef.current) {
      audioRef.current.src = selectedRecording.audio;
      audioRef.current.load();
      setCurrentTime(0);
      setIsEnded(false);
      
      // Auto-play when a recording is selected
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            // Auto-play was prevented (browser policy)
            console.log("Auto-play prevented:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [selectedRecording]);

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current) {
      setActiveRecording(active.data.current as Recording);
    }
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id === "drop-zone" && active.data.current) {
      const recording = active.data.current as Recording;
      // Set selected recording first, then clear active recording
      // This ensures the image stays hidden during the transition
      setSelectedRecording(recording);
      // Audio will auto-play via the useEffect hook
    }

    setActiveRecording(null);
  };

  // Handle play/pause toggle
  const handleTogglePlay = () => {
    if (!audioRef.current || !selectedRecording) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  // Audio event handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const newCurrentTime = audioRef.current.currentTime;
      setCurrentTime(newCurrentTime);
      // Check if we're very close to the end (within 0.1 seconds)
      if (duration > 0 && newCurrentTime >= duration - 0.1) {
        setIsEnded(false); // Reset ended state if playing again
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
    // Keep currentTime at duration to show full progress bar
    if (audioRef.current && duration > 0) {
      setCurrentTime(duration);
    }
    // Reset audio position for next play
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    console.error("Audio loading error:", e);
    setIsPlaying(false);
    // Check if it's a 404 or file not found error
    const audio = e.currentTarget;
    if (audio.error) {
      console.error(
        `Failed to load audio: ${selectedRecording?.audio}`,
        audio.error
      );
    }
  };

  // Calculate progress ratio - show full (1.0) when ended, otherwise calculate normally
  const progress = isEnded
    ? 1.0
    : duration > 0
      ? currentTime / duration
      : 0;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
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
              <CenterPanel selectedRecording={selectedRecording} />
              <div className="w-full max-w-2xl flex items-center gap-4">
                <PlayButton isPlaying={isPlaying} onToggle={handleTogglePlay} />
                <ProgressBar progress={progress} />
              </div>
              <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={handlePlay}
                onPause={handlePause}
                onEnded={handleEnded}
                onError={handleError}
              />
            </div>

            {/* Right Panel */}
            <RecordingList
              recordings={song.recordings}
              songId={id}
              selectedRecording={selectedRecording}
              activeRecording={activeRecording}
            />
          </div>
        </div>
      </div>
      <DragOverlay>
        {activeRecording ? (
          <div className="relative h-[176px] w-[176px] rotate-3 opacity-90">
            <img
              src={activeRecording.image}
              alt={activeRecording.artist}
              className="relative w-full h-full object-cover rounded-lg z-10 shadow-2xl"
            />
            <div className="absolute inset-0 bg-[#8B272D] border-2 border-[#F3E5CA] rounded-lg mix-blend-multiply"></div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
