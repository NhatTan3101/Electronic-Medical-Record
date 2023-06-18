import express from "express";
import userRouter from "./routes/user.route.js";
import medicalRecordRouter from "./routes/medical-record.route.js";
import messageRouter from "./routes/message.route.js";
import { configLibraries } from "./configs/lib.config.js";
import crypto from 'crypto';


const app = express();

/** Config libraries */
configLibraries(app);

app.use("/api", userRouter);
app.use("/api", medicalRecordRouter);
app.use("/api", messageRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Back to school");
});
//  // Importing the crypto library
// const crypto = require("crypto")

// // Defining the algorithm
let algorithm = "sha256"

// // Defining the key
let key = "abc"

let object = [{name:'Tan', age:25, address:"abcfsdj"},{name:'Tan', age:25, address:"abcfsdj"}]

// // Creating the digest in hex encoding
let digest1 = crypto.createHash(algorithm).update(JSON.stringify(object)).digest("sha256")

// // Creating the digest in base64 encoding
let digest2 = crypto.createHash(algorithm).update(key).digest("base64")

// // Printing the digests
console.log("In hex Encoding : \n " + digest1 + "\n")
console.log("In base64 encoding: \n " + digest2)
