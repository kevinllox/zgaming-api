import { Router } from "express";
import {
  login,
  register,
  profile,
  getAllProfiles,
  updateProfile,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/register", register);
router.get("/profiles", authRequired, getAllProfiles);
router.put("/profile/:userId", authRequired, updateProfile);
router.post("/login", login);
router.get("/profile/:id", authRequired, profile);
/* 
router.post("/logout", logout); */
/* router.get("/verify", verify); */

export default router;
