import express from "express";
import * as restaurant from "../controllers/restaurant.js";
const router = express.Router();
import * as auth from "../middleware/auth.js"

router.post("/add", restaurant.addRestaurant);
router.post("/login", restaurant.loginRestaurant);
router.post("/addMenu",auth.verifyRestaurant, restaurant.addMenu);
export default router;
