import { Link } from "react-router";
import { ALLOWED_SONG_IDS, SONG_DATA, SongId } from "../data/songData";

type Variant = "compact" | "large";

interface SongNavigationProps {
  /** When set (e.g. on detail page), this song is excluded from the list */
  excludeId?: SongId;
  variant?: Variant;
  className?: string;
}

const commonClasses: Record<"wrapper" | "link", string> = {
  wrapper: "flex flex-col",
  link: "rounded-4xl text-center font-medium tracking-wide bg-button whitespace-nowrap py-3  ",
};

const variantClasses: Record<Variant, { wrapper: string; link: string }> = {
  compact: {
    wrapper: `${commonClasses.wrapper} gap-8 `,
    link: ` ${commonClasses.link} hover:brightness-110 px-6 text-2xl  `,
  },
  large: {
    wrapper: `${commonClasses.wrapper} gap-6 text-3xl`,
    link: ` ${commonClasses.link} hover:brightness-110 px-12  `,
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
    <div className={`${classes.wrapper} ${className} `}>
      {songIds.map((songId) => (
        <Link key={songId} to={`/detail/${songId}`} className={classes.link}>
          {variant === "large"
            ? SONG_DATA[songId].title
            : SONG_DATA[songId].buttonLabel}
        </Link>
      ))}
    </div>
  );
}
