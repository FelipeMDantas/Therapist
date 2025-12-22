interface MoodEntry {
  score: number;
  note?: string;
}

export async function trackMood(
  data: MoodEntry
): Promise<{ success: boolean; data: any }> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await fetch("/api/mood", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to track mood");
  }

  return response.json();
}

export async function getMoodHistory(params?: {
  startDate?: string;
  endDate?: string;
  limit?: number;
}): Promise<{ success: boolean; data: any[] }> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const queryParams = new URLSearchParams();
  if (params?.startDate) queryParams.append("startDate", params.startDate);
  if (params?.endDate) queryParams.append("endDate", params.endDate);
  if (params?.limit) queryParams.append("limit", params.limit.toString());

  const response = await fetch(`/api/mood/history?${queryParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch mood history");
  }

  return response.json();
}