import type { Recording } from "../data/songData";
import { useDraggable } from "@dnd-kit/core";

interface RecordingThumbnailProps {
  recording: Recording;
  id: string;
  selectedRecording: Recording | null;
  activeRecording: Recording | null;
}

export function RecordingThumbnail({
  recording,
  id,
  selectedRecording,
  activeRecording,
}: RecordingThumbnailProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: recording,
  });

  const isSelected =
    selectedRecording &&
    selectedRecording.image === recording.image &&
    selectedRecording.artist === recording.artist;
  const isActive =
    activeRecording &&
    activeRecording.image === recording.image &&
    activeRecording.artist === recording.artist;
  const shouldHideImage = isSelected || isDragging || isActive;

  return (
    <div className="relative h-[176px] w-[176px]">
      <img
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        src={recording.image}
        alt={recording.artist}
        className={`relative w-full h-full object-cover rounded-lg z-10 transition-opacity cursor-grab active:cursor-grabbing touch-none ${
          shouldHideImage ? "opacity-0" : "opacity-100"
        }`}
        style={{ touchAction: "none" }}
      />
      <div className="absolute inset-0 bg-[#8B272D] border-2 border-[#F3E5CA] rounded-lg cursor-pointer mix-blend-multiply pointer-events-none"></div>
    </div>
  );
}
