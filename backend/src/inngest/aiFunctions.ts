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
          const prompt = `Analyze this therapy message and provide insights. Return ONLY a valid JSON object with no markdown formatting or additional text.
          Message: ${message}
          Context: ${JSON.stringify({ memory, goals })}
          
          Required JSON structure:
          {
            "emotionalState": "string",
            "themes": ["string"],
            "riskLevel": number,
            "recommendedApproach": "string",
            "progressIndicators": ["string"]
          }`;

          const model = genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
          });

          const response = (await model).text?.trim();

          logger.info("Received analysis from Gemini:", { response });

          const cleanText = response?.replace(/```json\n|\n```/g, "").trim();
          const parsedAnalysis = JSON.parse(cleanText || "{}");

          logger.info("Successfully parsed analysis:", parsedAnalysis);
          return parsedAnalysis;
        } catch (error) {}
      });
    } catch (error) {}
  }
);
