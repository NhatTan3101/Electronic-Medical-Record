import { database } from "../databases/firebase.database.js";

export default class UserController {
  static login(req, res) {
    database.ref("/users").once("value", (snapshot) => {
      const users = snapshot.val();
      const isValid = users.some(
        (user) =>
          user.username === req.body.username &&
          user.password === req.body.password
      );
      console.log(users, req.body);
      res.status(200).json({
        code: 10201,
        message: "Successfully",
        result: {
          isValid,
        },
      });
    });
  }
}
