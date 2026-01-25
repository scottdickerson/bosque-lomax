import type { Route } from "./+types/detail";
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
import {
  SONG_DATA,
  ALLOWED_SONG_IDS,
  SongId,
  type Recording,
} from "../data/songData";
import { PlayerProvider, usePlayer } from "../contexts/PlayerContext";
import { LeftPanel } from "../components/LeftPanel";
import { DetailCenterPanel } from "../components/DetailCenterPanel";
import { RightPanel } from "../components/RightPanel";
import { RecordingThumbnail } from "~/components/RecordingThumbnail";
import { InactivityTimer } from "~/components/InactivityTimer";

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

function DetailView() {
  const {
    setActiveRecording,
    loadAndPlayAudio,
    setSelectedRecording,
    activeRecording,
  } = usePlayer();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 8 },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current) {
      setActiveRecording(active.data.current as Recording);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveRecording(null);
    if (over && over.id === "drop-zone" && active.data.current) {
      const recording = active.data.current as Recording;
      setSelectedRecording(recording);
      loadAndPlayAudio(recording);
    }
  };

  return (
    <>
      <InactivityTimer />
      <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen select-none">
        <div className="pl-[185px] pr-[100px] py-8">
          <div className="flex flex-row gap-6 h-[calc(100vh-4rem)] items-center justify-between">
            <LeftPanel />
            <DetailCenterPanel />
            <RightPanel />
          </div>
        </div>
      </div>
      {activeRecording ? (
        <DragOverlay>
          <RecordingThumbnail
            recording={activeRecording}
            id={`overlay-${activeRecording.image}`}
            selectedRecording={null}
            isOverlay={true}
          />
        </DragOverlay>
      ) : null}
    </DndContext>
    </>
  );
}

export default function Detail({ params }: Route.ComponentProps) {
  const { id } = params;

  if (!ALLOWED_SONG_IDS.includes(id as SongId)) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Invalid Route</h1>
        <p className="text-gray-600">
          The route parameter &quot;{id}&quot; is not valid. Allowed values are:
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

  return (
    <PlayerProvider songId={id as SongId}>
      <DetailView />
    </PlayerProvider>
  );
}
