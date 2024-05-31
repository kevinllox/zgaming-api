import { Router } from "express";
import { getCategories } from "../controllers/categories.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
const router = Router();

//solo para ver la lista de categorias
router.get("/categorias", authRequired, getCategories);

export default router;
