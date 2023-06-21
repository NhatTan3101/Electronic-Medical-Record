import express from "express";
import userRouter from "./routes/user.route.js";
import medicalRecordRouter from "./routes/medical-record.route.js";
import messageRouter from "./routes/message.route.js";
import { configLibraries } from "./configs/lib.config.js";
import { authenticate } from "./middlewares/authentication.middleware.js";


const app = express();

/** Config libraries */
configLibraries(app);

app.use(authenticate);
app.use("/api", userRouter);
app.use("/api", medicalRecordRouter);
app.use("/api", messageRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Back to school");
});

// let req = {
//   headers: {
//     auth: 33
//   },
//   local: {

//   }
// }

// function auth(param) {
//   param.local.user = 1;
// }

// function createRecord(param) {
//   console.log('test', param.local.user)
// }

// // middleware 1
// auth(req);
// /// middleware 2
// createRecord(req);
