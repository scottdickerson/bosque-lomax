import type { Config } from "@react-router/dev/config";
import { SongId } from "./app/data/songData";

export default {
  ssr: false,
  prerender: [
    "/",
    ...Object.values(SongId).map((id) => `/detail/${id}`),
  ],
} satisfies Config;
