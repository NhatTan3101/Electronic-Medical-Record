import express from "express";
import MessageController from "../controllers/message.controller.js";

const router = express.Router();

router.get('/message/:userId', MessageController.getUser);

export default router;
