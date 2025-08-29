"use client";

import { useEffect, useState } from "react";

const TOTAL_ROUNDS = 5;

export function BreathingGame() {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [progress, setProgress] = useState(0);
  const [round, setRound] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isComplete || isPaused) return;

    let timer: NodeJS.Timeout;

    if (phase === "inhale") {
      timer = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setPhase("hold");
            return 0;
          }
          return p + 2;
        });
      }, 100);
    } else if (phase === "hold") {
      timer = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setPhase("exhale");
            return 0;
          }
          return p + 4;
        });
      }, 100);
    } else {
      timer = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            if (round >= TOTAL_ROUNDS) {
              setIsComplete(true);
              return p;
            }
            setPhase("inhale");
            setRound((r) => r + 1);
            return 0;
          }
          return p + 2;
        });
      }, 100);
    }

    return () => clearInterval(timer);
  }, [phase, round, isComplete, isPaused]);

  const handleReset = () => {
    setPhase("inhale");
    setProgress(0);
    setRound(1);
    setIsComplete(false);
    setIsPaused(false);
  };
}
