export enum SongId {
  HomeOnTheRange = "home-on-the-range",
  TheOldChisholmTrail = "the-old-chisholm-trail",
  WhereDidYouSleepLastNight = "where-did-you-sleep-last-night",
}

export interface Recording {
  year: string;
  artist: string;
  image: string;
}

export interface SongData {
  title: string;
  description: string;
  recordings: Recording[];
}

export const SONG_DATA: Record<SongId, SongData> = {
  [SongId.TheOldChisholmTrail]: {
    title: "THE OLD CHISHOLM TRAIL",
    description:
      "This song is nearly as old as the Chisholm Trail itself, dating back to the 1870s. In the early 1900s, Lomax met old cowhands in a saloon in Fort Worth who shared the verses. While Lomax's original recording has not survived, a voice actor has reproduced the song using Lomax's 1910 publication and sheet music adaptation. Listen closely to hear how musical production and style changes as each generation has adapted this American classic.",
    recordings: [
      {
        year: "1910",
        artist: "Original Recording",
        image: "/images/the-old-chisholm-trail/original-recording-1910.png",
      },
      {
        year: "1928",
        artist: "Harry McClintock",
        image: "/images/the-old-chisholm-trail/harry-mcclintock-1928.png",
      },
      {
        year: "1944",
        artist: "Woody Guthrie",
        image: "/images/the-old-chisholm-trail/woody-guthrie-1944.png",
      },
      {
        year: "1952",
        artist: "Gene Autry",
        image: "/images/the-old-chisholm-trail/gene-autry-1952.png",
      },
      {
        year: "1993",
        artist: "Randy Travis",
        image: "/images/the-old-chisholm-trail/randy-travis-1993.png",
      },
    ],
  },
  [SongId.HomeOnTheRange]: {
    title: "HOME ON THE RANGE",
    description:
      'First published in the 1870s as a poem by Brewster Higley, "Home on the Range" was originally called "My Western Home." Ranchers, cowboys, and settlers adapted the lyrics to their experiences, and the home-spun versions of the "unofficial anthem of the West" spread through America.\n\nIn 1909, Lomax recorded a version of the song sung by a Black saloonkeeper - and a former trail cook - in San Antonio. This version includes verses that don\'t appear in the original poem, highlighting how much the song could change depending on the singer. The original recording has not survived, but Lomax\'s notes and sheet music were used to recreate the recording.',
    recordings: [
      {
        year: "1910",
        artist: "Original Recording",
        image: "/images/home-on-the-range/original-recording-1910.png",
      },
      {
        year: "1927",
        artist: "Vernon Dalhart",
        image: "/images/home-on-the-range/vernon-dalhart-1927.png",
      },
      {
        year: "1939",
        artist: "James Richardson",
        image: "/images/home-on-the-range/james-richardson-1939.png",
      },
      {
        year: "1947",
        artist: "Roy Rogers",
        image: "/images/home-on-the-range/roy-rogers-1947.png",
      },
      {
        year: "2006",
        artist: "Tori Amos",
        image: "/images/home-on-the-range/tori-amos-2006.png",
      },
    ],
  },
  [SongId.WhereDidYouSleepLastNight]: {
    title: "WHERE DID YOU SLEEP LAST NIGHT",
    description:
      "Originally an Appalachian folk tune (adapted from an even earlier Scots-Irish song), this eerie song of love and loss has been interpreted through many different musical genres. Each musician adds their own changes to the verses and the emotional style. Kurt Cobain of Nirvana mistakenly attributed this song to Lead Belly after hearing Lomax’s recordings and reawakened public interest in Lead Belly’s work and his musical partnership with Lomax.",
    recordings: [
      {
        year: "1926",
        artist: "Dock Walsh",
        image: "/images/where-did-you-sleep-last-night/dock-walsh-1926.png",
      },
      {
        year: "1939",
        artist: "Lead Belly",
        image: "/images/where-did-you-sleep-last-night/lead-belly-1939.png",
      },
      {
        year: "1993",
        artist: "Nirvana",
        image: "/images/where-did-you-sleep-last-night/nirvana-1993.png",
      },
      {
        year: "1994",
        artist: "Dolly Parton",
        image: "/images/where-did-you-sleep-last-night/dolly-parton-1994.png",
      },
      {
        year: "2016",
        artist: "Fantastic Negrito",
        image: "/images/where-did-you-sleep-last-night/fantastic-negrito-2016.png",
      },
    ],
  },
};

export const ALLOWED_SONG_IDS: SongId[] = Object.values(SongId);
