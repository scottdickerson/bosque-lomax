import type { Recording } from "../data/songData";
import { useDroppable } from "@dnd-kit/core";

interface CenterPanelProps {
  selectedRecording: Recording | null;
}

export function CenterPanel({ selectedRecording }: CenterPanelProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "drop-zone",
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-full max-w-2xl aspect-square bg-[#5c3d2e] border-2 rounded-lg flex items-center justify-center mb-8 transition-colors overflow-hidden relative ${
        isOver
          ? "border-yellow-400/70"
          : "border-yellow-400/30 hover:border-yellow-400/50"
      }`}
    >
      {selectedRecording ? (
        <img
          src={selectedRecording.image}
          alt={selectedRecording.artist}
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />
      ) : (
        <p className="text-title-yellow text-xl text-center px-8 z-10 font-nexa-rust-sans font-black">
          DRAG A RECORDING HERE TO PLAY
        </p>
      )}
    </div>
  );
}
