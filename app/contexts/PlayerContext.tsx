import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  SONG_DATA,
  SongId,
  type Recording,
  type SongData,
} from "../data/songData";

interface PlayerContextValue {
  songId: SongId;
  song: SongData;
  selectedRecording: Recording | null;
  setSelectedRecording: (r: Recording | null) => void;
  activeRecording: Recording | null;
  setActiveRecording: (r: Recording | null) => void;
  isPlaying: boolean;
  progress: number;
  loadAndPlayAudio: (recording: Recording) => void;
  togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return ctx;
}

interface PlayerProviderProps {
  songId: SongId;
  children: ReactNode;
}

export function PlayerProvider({ songId, children }: PlayerProviderProps) {
  const song = SONG_DATA[songId];

  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(
    null,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeRecording, setActiveRecording] = useState<Recording | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const isEnded = useMemo(
    () => duration > 0 && currentTime >= duration - 0.05,
    [currentTime, duration],
  );

  const progress = useMemo(
    () => (isEnded ? 1.0 : duration > 0 ? currentTime / duration : 0),
    [currentTime, duration, isEnded],
  );

  useEffect(() => {
    setSelectedRecording(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
  }, [songId]);

  const loadAndPlayAudio = useCallback((recording: Recording) => {
    if (!audioRef.current) return;
    audioRef.current.src = recording.audio;
    audioRef.current.load();
    setCurrentTime(0);
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !selectedRecording) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }, [selectedRecording, isPlaying]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    if (audioRef.current) {
      setCurrentTime(audioRef.current.duration);
      audioRef.current.currentTime = 0;
    }
  }, []);

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
      console.error("Audio error:", e);
      setIsPlaying(false);
    },
    [],
  );

  const value: PlayerContextValue = {
    songId,
    song,
    selectedRecording,
    setSelectedRecording,
    activeRecording,
    setActiveRecording,
    isPlaying,
    progress,
    loadAndPlayAudio,
    togglePlay,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
        onError={handleError}
      />
    </PlayerContext.Provider>
  );
}
