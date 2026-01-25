import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { usePlayer } from "~/contexts/PlayerContext";

const ACTIVITY_EVENTS = [
  "mousemove",
  "mousedown",
  "mouseup",
  "keydown",
  "keyup",
  "touchstart",
  "touchmove",
  "scroll",
  "click",
] as const;

interface InactivityTimerProps {
  timeToWaitMs?: number;
}

export function InactivityTimer({
  timeToWaitMs = 60_000,
}: InactivityTimerProps) {
  const navigate = useNavigate();
  const { isPlaying } = usePlayer();
  const lastActivityRef = useRef(Date.now());

  useEffect(() => {
    const onActivity = () => {
      lastActivityRef.current = Date.now();
    };

    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, onActivity);
    }

    const interval = setInterval(() => {
      if (isPlaying) return;
      if (Date.now() - lastActivityRef.current >= timeToWaitMs) {
        navigate("/");
      }
    }, 1000);

    return () => {
      for (const event of ACTIVITY_EVENTS) {
        window.removeEventListener(event, onActivity);
      }
      clearInterval(interval);
    };
  }, [isPlaying, timeToWaitMs, navigate]);

  return null;
}
