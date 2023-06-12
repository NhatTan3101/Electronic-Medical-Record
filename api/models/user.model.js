import { database } from "../databases/firebase.database.js";

export default class UserModel {
  constructor() {
    this.ref = database.ref("/users");
  }

  async findUser(email, password) {
    /** Get all users from firebase */
    const data = await this.ref.once("value");

    const users = data.val();

    for (const key in users) {
      const user = users[key];
      if (user.email === email && user.password === password) {
        return { isValid: true, user };
      }
    }

    /** Check user from client is valid with database */
    return { isValid: false };
  }
}
