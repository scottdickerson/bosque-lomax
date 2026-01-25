import { useState } from "react";
import type { Recording } from "../data/songData";
import { useDraggable } from "@dnd-kit/core";

interface RecordingThumbnailProps {
  recording: Recording;
  id: string;
  selectedRecording: Recording | null;
  isOverlay?: boolean;
}

export function RecordingThumbnail({
  recording,
  id,
  selectedRecording,
  isOverlay = false,
}: RecordingThumbnailProps) {
  const [isHiddenImage, setIsHiddenImage] = useState(false);
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: recording,
    disabled: isOverlay, // Disable drag when used in overlay
  });

  const isSelected =
    selectedRecording &&
    selectedRecording.image === recording.image &&
    selectedRecording.artist === recording.artist;
  const shouldHideImage = isSelected || isDragging || isHiddenImage;

  return (
    <div
      className={`relative h-[176px] w-[176px] ${
        isOverlay ? "rotate-3 opacity-90" : ""
      }`}
    >
      <img
        ref={isOverlay ? undefined : setNodeRef}
        {...(isOverlay ? {} : { ...listeners, ...attributes })}
        src={recording.image}
        alt={recording.artist}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        onDragEnd={(e) => {
          e.preventDefault();
          setIsHiddenImage(true);
        }}
        className={`relative w-full h-full object-cover rounded-lg z-10 transition-opacity ${
          isOverlay
            ? "shadow-2xl"
            : "cursor-grab active:cursor-grabbing touch-none"
        } ${shouldHideImage ? "opacity-0" : "opacity-100"}`}
        style={isOverlay ? {} : { touchAction: "none" }}
      />
      <div className="absolute inset-0 bg-[#8B272D] border-2 border-[#F3E5CA] rounded-lg cursor-pointer mix-blend-multiply pointer-events-none"></div>
    </div>
  );
}
