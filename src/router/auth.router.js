import { Router } from "express";
import { login, logout, register } from "../controllers/users.controller.js";


const router = Router();

router.post("/register", register);

router.post("/login",  login);

router.post("/logout", logout);

/* router.get("/profile", authRequired, profile);
router.get("/verify", verify);
 */

export default router;