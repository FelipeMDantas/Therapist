"use client";

import { useState } from "react";

import { useSession } from "@/lib/contexts/session-context";

const activityTypes = [
  { id: "meditation", name: "Meditation" },
  { id: "exercise", name: "Exercise" },
  { id: "walking", name: "Walking" },
  { id: "reading", name: "Reading" },
  { id: "journaling", name: "Journaling" },
  { id: "therapy", name: "Therapy Session" },
];

interface ActivityLoggerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActivityLogged: () => void;
}

export function ActivityLogger({
  open,
  onOpenChange,
  onActivityLogged,
}: ActivityLoggerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const { user, isAuthenticated, loading } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      return;
    }

    if (!type || !name) {
      return;
    }

    setIsLoading(true);
    try {
      setType("");
      setName("");
      setDuration("");
      setDescription("");

      onActivityLogged();
      onOpenChange(false);
    } catch (error) {
      console.error("Error logging activity:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return <div></div>;
}
