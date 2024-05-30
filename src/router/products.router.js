import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getFavorites,
  getProductByCategory,
  getProducts,
  updateProductById,
} from "../controllers/products.controller.js";

const router = Router();

//Get all products
router.get("/products", getProducts);
//Get product by Id
router.get("/products/:id", getProductById)
//Get products by category
router.get("/products/:idCategoria", getProductByCategory);

//Add a product to DB
router.post("/add-product", addProduct);

//Update a product by id
router.put("/product/:idProducto", updateProductById);

//get all favorites products
router.get("/favorites", getFavorites);

//Delete a product by Id
router.delete("/product/:idProducto", deleteProduct);

export default router;
