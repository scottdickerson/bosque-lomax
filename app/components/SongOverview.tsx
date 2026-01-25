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
      <h1 className="text-3xl md:text-4xl text-title-yellow mb-6 font-nexa-rust-sans font-black uppercase whitespace-pre-line">
        {title}
      </h1>
      <p className="text-xl leading-relaxed whitespace-pre-line font-medium tracking-wide">
        {description}
      </p>
    </div>
  );
}
