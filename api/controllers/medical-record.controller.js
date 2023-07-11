import { database } from "../databases/firebase.database.js";
import Response from "../models/response.model.js";
// import fabricDoctor from "../fabric/doctor.fabric.js";
import crypto from 'crypto';
import MedicalRecordModel from "../models/medical-record.model.js";
import UserModel from "../models/user.model.js";

export default class MedicalRecordController {
  static async createRecord(req, res) {
    try {
      const medical = new MedicalRecordModel();
      const user = new UserModel();
      const {
        diagnoseDisease,
        symptom,
        treatment,
        emailDoctor,
        pill,
        quantity,
        timeperday,
        dayofsurgery,
        note,
        medicalExamDay
      } = req.body;

      const { userId, recordId } = req.params;

      const medicalRecord = {
        diagnoseDisease,
        symptom,
        treatment,
        emailDoctor,
        pill,
        quantity,
        timeperday,
        dayofsurgery,
        note,
        medicalExamDay
      };
      const isFirst = await user.hasExamined(userId);
      // if (!isFirst) {
        console.log("lần đầu");
        await database.ref(`users/${userId}/medical_record/exams`).push(medicalRecord);
        res.status(200).json(medicalRecord);
        const hash = medicalRecord?.diagnoseDisease.toString() + medicalRecord?.treatment.toString();
        let hashBC = crypto.createHash("sha256").update(hash.toString()).digest("hex");
        console.log("hashBC", hashBC);

        // await fabricDoctor.createRecord(recordId, hashBC, req.locals.userId);
      // } else {
      //   console.log("lần sau");
      //   let oldMedicalRecord = await medical.getRecordByUserId(userId);
      //   let hash = '';
      //   for (const record of oldMedicalRecord) {
      //     hash += record?.diagnoseDisease.toString() + record?.treatment.toString();
      //   }
      //   let hashBC = crypto.createHash("sha256").update(hash.toString()).digest("hex");
      //   console.log("hashBC", hashBC);
      // }
      // let hashFB = crypto.createHash("sha256").update(JSON.stringify(oldMedicalRecord)).digest("sha256");
      //  if (record?.HashCode === hashFB ) {
      // await database.ref(`users/${userId}/medical_record/exams`).push(medicalRecord);
      // res.status(200).json(medicalRecord);
      // get lại data từ firebase để hash
      // let newMedicalRecord = medical.getRecordByUserId(userId);
      // let hashBC = crypto.createHash("sha256").update(JSON.stringify(newMedicalRecord)).digest("sha256");
      // add blockchain
      // await fabricDoctor.updateRecord(recordId, hashtoBC, req.locals.userId);  
      // } else{
        //res.status(500).json(new Response(102, "error", isSuccessfull : false)));
      // }
      // }

    } catch (error) {
      res.status(500).json(new Response(102, "error", { isSuccessfull: false }));
    }
  }

  static async getRecord(req, res) {
    try {
      const medical = new MedicalRecordModel();
      const info = new UserModel();
      const { userId } = req.params;
      const records = await medical.getRecordByUserId(userId);
      const user = await info.findUser(userId);

      res
        .status(200)
        .json(new Response(102, "success", { isSuccessfull: true, records, user }));
    } catch (error) {
      res
        .status(500)
        .json(new Response(102, error?.message || "Internal server !", { isSuccessfull: false }));
    }

  }
}   