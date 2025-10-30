import { GoogleGenAI } from "@google/genai";
import { inngest } from "./client";
import { logger } from "../utils/logger";

const genAI = new GoogleGenAI({});

export const processChatMessage = inngest.createFunction(
  {
    id: "process-chat-message",
  },
  { event: "therapy/session.message" },
  async ({ event, step }) => {
    try {
      const {
        message,
        history,
        memory = {
          userProfile: {
            emotionalState: [],
            riskLevel: 0,
            preferences: {},
          },
          sessionContext: {
            conversationThemes: [],
            currentTechnique: null,
          },
        },
        goals = [],
        systemPrompt,
      } = event.data;

      logger.info("Processing chat message:", {
        message,
        historyLength: history?.length,
      });

      const analysis = await step.run("analyze-message", async () => {
        try {
          const prompt = "";
          const model = genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: "Explain how AI works in a few words",
          });
        } catch (error) {}
      });
    } catch (error) {}
  }
);
