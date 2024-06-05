import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  addToCart,
  getCartItems,
  removeItemFromCart,
} from "../controllers/purchaseDetails.controller.js";

const router = Router();

//get favorites by user

router.get("/cart-items/:idUsuario", authRequired, getCartItems);
//Add favorites by userId
router.post("/cart-item", authRequired, addToCart);
router.delete("/cart-item/:id", authRequired, removeItemFromCart);

export default router;
