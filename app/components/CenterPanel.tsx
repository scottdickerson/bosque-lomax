import type { Recording } from "../data/songData";
import { useDroppable } from "@dnd-kit/core";

interface CenterPanelProps {
  selectedRecording: Recording | null;
}

export function CenterPanel({ selectedRecording }: CenterPanelProps) {
  const { setNodeRef } = useDroppable({
    id: "drop-zone",
  });

  return (
    <div
      ref={setNodeRef}
      className="w-full flex-1 max-w-2xl aspect-square rounded-lg flex items-center justify-center mb-8 overflow-hidden relative"
    >
      <div
        className="absolute inset-4 rounded-lg bg-panel-overlay mix-blend-multiply pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-4 rounded-lg border-2 border-[#F3E5CA] pointer-events-none"
        aria-hidden
      />
      {selectedRecording ? (
        <img
          src={selectedRecording.image}
          alt={selectedRecording.artist}
          className="relative z-10 w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />
      ) : (
        <p className="relative z-10 text-title-yellow text-xl text-center px-8 font-nexa-rust-sans-black3 nexa-rust-wght-900">
          DRAG A RECORDING
          <br /> HERE TO PLAY
        </p>
      )}
    </div>
  );
}
