import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();

router.post('/user/login', UserController.login);
router.post('/user/register', UserController.register);
router.put('/user/:userId/patient', UserController.updatePatient);
// router.put('/user/:userId', UserController.updateDoctor);
router.get('/user/:userId', UserController.getUser);
router.get('/user', UserController.search);

export default router;
