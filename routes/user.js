import express from "express";
import * as userController from "../controllers/user.js";
const router = express.Router();

router.post("/signup", userController.signUp);
router

export default router;
