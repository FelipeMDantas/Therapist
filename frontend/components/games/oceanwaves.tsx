"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const BREATH_DURATION = 8; // seconds for one breath cycle
const SESSION_DURATION = 5 * 60; // 5 minutes in seconds

export function OceanWaves() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SESSION_DURATION);
  const waveControls = useAnimation();
  const [audio] = useState(new Audio("/sounds/waves.mp3"));

  useEffect(() => {
    audio.loop = true;
    audio.volume = volume / 100;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setProgress(((SESSION_DURATION - newTime) / SESSION_DURATION) * 100);
          return newTime;
        });
      }, 1000);

      waveControls.start({
        y: [0, -20, 0],
        transition: {
          duration: BREATH_DURATION,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    } else {
      waveControls.stop();
    }

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div></div>
  );
}