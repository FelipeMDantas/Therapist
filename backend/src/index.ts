import express from "express";
import { Request, Response } from "express";
import { inngest } from "./inngest/client";
import { functions as inngestFunctions } from "./inngest/functions";
import { logger } from "./utils/logger";
import { serve } from "inngest/express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(helmet()); // Security headers
app.use(cors());
app.use(morgan("dev")); // HTTP request logger

app.use(express.json());
app.use(
  "/api/inngest",
  serve({ client: inngest, functions: inngestFunctions })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const startServer = async () => {
  try {
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(
        `Inngest endpoint available at http://localhost:${PORT}/api/inngest`
      );
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
