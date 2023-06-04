import bodyParser from "body-parser";

export function configLibraries(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
}
