import { database } from "../databases/firebase.database.js";
import ResponseError from "../models/response-error.model.js";
import Response from "../models/response.model.js";
import UserModel from "../models/user.model.js";

export default class MessageControler {
  static async getUser(req, res) {
    const name = req.query?.name;
    const userId = req.params?.userId;

    const data = await database.ref(`users`).once("value");
    const raw = data.val();
    const users = [];

    const messageData = await database
      .ref(`users/${userId}/messages`)
      .once("value");
    const messageRaw = messageData.val();

    if (!name) {
      for (const key in messageRaw) {
        if (Object.hasOwnProperty.call(messageRaw, key)) {
          const element = messageRaw[key];
          const isDuplicated = users.some(
            (message) => message?.sender === element?.sender
          );

          if (element && !isDuplicated)
            users.push({
              name: element?.name,
              userId: element?.sender,
              content: element?.content,
            });
        }
      }
    }

    for (const key in raw) {
      if (Object.hasOwnProperty.call(raw, key)) {
        const element = raw[key];
        if (element && element?.name?.includes(name) && key !== name)
          users.push({ name: element?.name, userId: key, content: "Send message now !" });
      }
    }

    res
      .status(200)
      .json(
        new Response(102, "error", { isSuccessfull: true, users })
      );
  }

  static async search(req, res) {
    const model = new UserModel();
    const { mabhyt } = req.query;

    const users = await model.findUsers(mabhyt);

    res
      .status(200)
      .json(new Response(102, "error", { isSuccessfull: true, users }));
  }
}
