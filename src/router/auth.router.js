import { Router } from "express";
import { register } from "../controllers/users.controller.js";


const router = Router();

router.post("/register", register);

router.post("/login",  (req, res) => {
    return res.status(200).json({ message: "Change the response for login" });
  });

router.post("/logout",  (req, res) => {
    return res.status(200).json({ message: "Change the response for logout" });
  });

/* router.get("/profile", authRequired, profile);
router.get("/verify", verify);
 */

export default router;