export interface IChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  metadata?: {
    technique: string;
    goal: string;
    progress: any[];
  };
}
