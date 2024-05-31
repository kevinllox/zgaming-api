import { Router } from "express";
import { getCategories } from "../controllers/categories.controller";
const router = Router();

//solo para ver la lista de categorias
router.get("/categorias", getCategories);

export default router;
