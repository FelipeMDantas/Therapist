const express = require("express");
import { Request, Response } from "express";
import { inngest } from "./inngest/client";
import { functions as inngestFunctions } from "./inngest/functions";
import { logger } from "./utils/logger";
import { serve } from "inngest/express";

const app = express();

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
    const PORT = process.env.PORT || 3001;
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
