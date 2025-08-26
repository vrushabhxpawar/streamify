import express from "express";
import {signup, login , logout, updateUser, verifyEmail} from "../controllers/auth.controller.js";
import {protectRoute} from "../middlewares/auth.middleware.js";
import { onBoard } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify", verifyEmail);

router.post("/onboarding", protectRoute, onBoard);

router.put("/update", protectRoute, updateUser);

router.get("/me", protectRoute, (req, res) =>{
  res.status(200).json({ message : "User profile fetched successfully!", user: req.user });
})

export default router;