interface ProgressBarProps {
  progress: number; // 0-1 ratio
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const totalBars = 40;
  const activeBars = Math.floor(progress * totalBars);

  return (
    <div className="flex-1 overflow-hidden h-14">
      <div className="h-full flex gap-2 px-1">
        {Array.from({ length: totalBars }).map((_, i) => {
          const isActive = i < activeBars;
          return (
            <div
              key={i}
              className="flex-1 bg-white rounded-sm transition-opacity duration-200"
              style={{
                height: "80%",
                marginTop: "auto",
                opacity: isActive ? 1 : 0.35,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
