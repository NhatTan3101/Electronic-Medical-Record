import { database } from "../databases/firebase.database.js";
import Response from "../models/response.model.js";

export default class MedicalRecordController {
  static async createRecord(req, res) {
    var {
      diagnoseDisease,
      symptom,
      treatment,
      doctor,
      emailDoctor,
      createAt,
      pill,
      quantity,
      timeperday,
      dayofsurgery,
    } = req.body;

    var medicalRecord = {
      diagnoseDisease,
      symptom,
      treatment,
      doctor,
      emailDoctor,
      createAt,
      pill,
      quantity,
      timeperday,
      dayofsurgery,
    };

    await database.ref(`medical-records/${userId}`).push(medicalRecord);

    res.status(200).json(new Response(102, "error", { isSuccessfull: true }));
  }
}
