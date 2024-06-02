import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  addToFavorites,
  getFavoritesbyUser,
  removeFromFavorites,
} from "../controllers/favorites.controller.js";

const router = Router();

//get favorites by user

router.get("/favorites/:idUsuario", authRequired, getFavoritesbyUser);
//Add favorites by userId
router.post("/favorites", authRequired, addToFavorites);
router.delete("/favorite/:id", authRequired, removeFromFavorites);

export default router;
