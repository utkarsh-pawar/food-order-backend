import express from "express";
import * as restaurant from "../controllers/restaurant.js";
const router = express.Router();
import * as auth from "../middleware/auth.js";

router.post("/add", restaurant.addRestaurant);
router.post("/login", restaurant.loginRestaurant);
router.delete("/item/:id", auth.verifyRestaurant, restaurant.deleteItem);
router.post("/additem", auth.verifyRestaurant, restaurant.addItem);
router.put("/updateitem/:id", auth.verifyRestaurant, restaurant.updateItem);
export default router;
