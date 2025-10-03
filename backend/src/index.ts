const express = require("express");
import { Request, Response } from "express";
import { inngest } from "./inngest/client";
import { functions as inngestFunctions } from "./inngest/functions";

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
