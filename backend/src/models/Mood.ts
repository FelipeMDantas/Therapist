import mongoose, { Document } from "mongoose";

export interface IMood extends Document {
  userId: mongoose.Types.ObjectId;
  score: number;
  note?: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}
