import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

export function configLibraries(app) {
  dotenv.config({ path: './.dev.env' });
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  // app.use((req, res) => {
  //   req.body = '"username": "tan"';
  //   req.body = JSON.parse(req.body);
  //   req.body = { username: 'tan' };

  //   next(req, res);
  // });
  app.use(bodyParser.json());
}
