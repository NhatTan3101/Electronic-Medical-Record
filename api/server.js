import express from "express";
import userRouter from "./routes/user.route.js";
import medicalRecordRouter from "./routes/medical-record.route.js";
import { configLibraries } from "./configs/lib.config.js";

const app = express();

/** Config libraries */
configLibraries(app);

app.use("/api", userRouter);
app.use("/api", medicalRecordRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Back to school");
});
