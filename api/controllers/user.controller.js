import { database } from "../databases/firebase.database.js";

export default class UserController {
  static login(req, res) {
    database.ref("/users").once("value", (snapshot) => {
      /** Get all users from firebase */
      const users = snapshot.val();

      /** Check user from client is valid with database */
      const index = users.findIndex(
        (user) =>
          user.username === req.body.username &&
          user.password === req.body.password
      );
      const { password, ...user } = index >= 0 ? users[index] : null;

      /** Response data */
      res.status(200).json({
        code: 10201,
        message: "Successfully",
        result: {
          isValid: index >= 0,
          user
        },
      });
    });
  }
}
