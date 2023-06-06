import express from "express";
import userRouter from "./routes/user.route.js";
import { configLibraries } from "./configs/lib.config.js";

const app = express();

/** Config libraries */
configLibraries(app);

app.use("/api", userRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Back to school");
});
