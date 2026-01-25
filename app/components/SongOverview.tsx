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
    <div className={className}>
      <h1 className="text-3xl md:text-4xl text-title-yellow mb-6 font-nexa-rust-sans font-black">
        {title}
      </h1>
      <p className="text-sm leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </div>
  );
}
