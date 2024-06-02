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
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

//Get all products
router.get("/products", authRequired, getProducts);
//Get product by Id
router.get("/products/:id", authRequired, getProductById);
//Get products by category
router.get("/products/category/:idCategoria", authRequired, getProductByCategory);

//Add a product to DB
router.post("/add-product", authRequired, addProduct);

//Update a product by id
router.put("/product/:idProducto", authRequired, updateProductById);

//get all favorites products
/* router.get("/favorites", authRequired, getFavorites);
 */
//metodo para eliminar un producto.
router.delete('/product/:idProducto',deleteProduct)
  
export default router;
