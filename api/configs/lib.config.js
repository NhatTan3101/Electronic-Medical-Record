import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { configSocket } from "./socket.config.js";

export function configLibraries(app) {
  dotenv.config({ path: './.dev.env' });
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  configSocket(app);
}
