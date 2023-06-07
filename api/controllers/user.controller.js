import { database } from "../databases/firebase.database.js";
import ResponseError from "../models/response-error.model.js";
import Response from "../models/response.model.js";
import UserModel from "../models/user.model.js";

export default class UserController {
  static async login(req, res) {
    const model = new UserModel();

    const result = await model.findUser(req.body.mabhyt, req.body.password);

    /** Response data */
    res.status(200).json({
      code: 10201,
      message: "Successfully",
      result
    });
  }

  static async register(req, res) {
    var {
      mabhyt,
      idcardno,
      name,
      address,
      birthday,
      hometown,
      nation,
      password,
    } = req.body;
    
    console.log("res", req.body);

    var user = {
      mabhyt,
      idcardno,
      name,
      address,
      birthday,
      hometown,
      nation,
      password,
    };

    await database.ref("users/").push(user);

    res.status(200).json(new Response(102, "error", { isSuccessfull: true }));
  }
}
