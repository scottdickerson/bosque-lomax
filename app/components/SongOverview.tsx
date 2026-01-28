interface SongOverviewProps {
  title: string;
  description: string;
  className?: string;
}

export function SongOverview({
  title,
  description,
  className = "",
}: SongOverviewProps) {
  return (
    <div className={`${className} mb-32`}>
      <h1
        className="text-4xl text-title-yellow mb-6 font-nexa-rust-sans-black3 nexa-rust-wght-900 uppercase whitespace-pre-line"
        style={{ textShadow: "var(--title-shadow)" }}
      >
        {title}
      </h1>
      <p className="text-xl leading-relaxed whitespace-pre-line font-medium tracking-wide">
        {description}
      </p>
    </div>
  );
}
