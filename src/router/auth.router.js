import { Router } from "express";
import {
  login,
  register,
  profile,
} from "../controllers/users.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);
/* 
router.post("/logout", logout); */

router.get("/profile/:id", authRequired, profile);
/* router.get("/verify", verify); */

export default router;
