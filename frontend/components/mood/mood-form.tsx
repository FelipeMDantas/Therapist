"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface MoodFormProps {
  onSuccess?: () => void;
}

export function MoodForm({ onSuccess }: MoodFormProps) {
  const [moodScore, setMoodScore] = useState(50);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const emotions = [
    { value: 0, label: "😔", description: "Very Low" },
    { value: 25, label: "😕", description: "Low" },
    { value: 50, label: "😊", description: "Neutral" },
    { value: 75, label: "😃", description: "Good" },
    { value: 100, label: "🤗", description: "Great" },
  ];

  const currentEmotion =
    emotions.find((em) => Math.abs(moodScore - em.value) < 15) || emotions[2];

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      console.log(
        "MoodForm: Token from localStorage:",
        token ? "exists" : "not found"
      );

      const response = await fetch("/api/mood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ score: moodScore }),
      });

      console.log("MoodForm: Response status:", response.status);

      if (!response.ok) {
        const error = await response.json();
        console.error("MoodForm: Error response:", error);
        throw new Error(error.error || "Failed to track mood");
      }

      const data = await response.json();
      console.log("MoodForm: Success response:", data);

      onSuccess?.();
    } catch (error) {
      console.error("MoodForm: Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return <div></div>;
}
