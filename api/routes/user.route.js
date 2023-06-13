import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();

router.post('/user/login', UserController.login);
router.post('/user/register', UserController.register);
router.post('/user/update', UserController.update);

export default router;
