import { Link } from "react-router";
import { ALLOWED_SONG_IDS, SONG_DATA, SongId } from "../data/songData";

type Variant = "compact" | "large";

interface SongNavigationProps {
  /** When set (e.g. on detail page), this song is excluded from the list */
  excludeId?: SongId;
  variant?: Variant;
  className?: string;
}

const variantClasses: Record<Variant, { wrapper: string; link: string }> = {
  compact: {
    wrapper: "mt-8 space-y-3",
    link: "block bg-[#6b7d47] hover:bg-[#7a8d55] px-6 py-3 rounded-lg text-center transition-colors",
  },
  large: {
    wrapper: "flex flex-col gap-4",
    link: "bg-[#6b7d47] hover:bg-[#7a8d55] px-8 py-4 rounded-lg text-center text-lg font-semibold transition-colors",
  },
};

export function SongNavigation({
  excludeId,
  variant = "large",
  className = "",
}: SongNavigationProps) {
  const classes = variantClasses[variant];
  const songIds = excludeId
    ? ALLOWED_SONG_IDS.filter((id) => id !== excludeId)
    : ALLOWED_SONG_IDS;

  return (
    <div className={`${classes.wrapper} ${className}`}>
      {songIds.map((songId) => (
        <Link
          key={songId}
          to={`/detail/${songId}`}
          className={classes.link}
        >
          {SONG_DATA[songId].title}
        </Link>
      ))}
    </div>
  );
}
