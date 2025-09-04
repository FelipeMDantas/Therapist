"use client";

import { useState, useEffect } from "react";

const MEDITATION_DURATION = 5 * 60; // 5 minutes in seconds

export function ForestGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(MEDITATION_DURATION);
  const [audioElements] = useState({
    birds: new Audio("/sounds/birds.mp3"),
    wind: new Audio("/sounds/wind.mp3"),
    leaves: new Audio("/sounds/leaves.mp3"),
  });

  useEffect(() => {
    Object.values(audioElements).forEach((audio) => {
      audio.loop = true;
      audio.volume = volume / 100;
    });

    return () => {
      Object.values(audioElements).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  useEffect(() => {
    Object.values(audioElements).forEach((audio) => {
      audio.volume = volume / 100;
    });
  }, [volume]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setProgress(
            ((MEDITATION_DURATION - newTime) / MEDITATION_DURATION) * 100
          );
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const togglePlay = () => {
    if (isPlaying) {
      Object.values(audioElements).forEach((audio) => audio.pause());
    } else {
      Object.values(audioElements).forEach((audio) => audio.play());
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <></>
  );
}