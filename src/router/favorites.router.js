import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  addToFavorites,
  getFavoritesbyUser,
} from "../controllers/favorites.controller.js";

const router = Router();

//get favorites by user

router.get("/favorites/:id", authRequired, getFavoritesbyUser);
//Add favorites by userId
router.post("/favorites", authRequired, addToFavorites);

export default router;
