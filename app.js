import express from "express";
import logger from "morgan";
import cors from "cors";
import {
  authRouter,
  boardsRouter,
  columnsRouter,
  cardsRouter,
  helpRouter,
  imagesRouter
} from "./routes/api/index.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/boards", boardsRouter);
app.use("/api/columns", columnsRouter);
app.use("/api/cards", cardsRouter);
app.use("/api/help", helpRouter);
app.use("/api/img", imagesRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
