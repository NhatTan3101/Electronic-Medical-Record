import { database } from "../databases/firebase.database";

export default class UserModel {
  async find(username, password) {
    /** Get all users from firebase */
    const data = await database.ref("/users").once("value");

    const users = data.val();

    /** Check user from client is valid with database */
    return users.some((user) => user.username === username && user.password === password);
  }
}
