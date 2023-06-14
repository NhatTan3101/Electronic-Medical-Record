import express from "express";
import MedicalRecordController from "../controllers/medical-record.controller";

const router = express.Router();

router.post('/medical-records/:userId', MedicalRecordController.createRecord);

export default router;
