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
router.get("/products/:idCategoria", authRequired, getProductByCategory);

//Add a product to DB
router.post("/add-product", authRequired, addProduct);

//Update a product by id
router.put("/product/:idProducto", authRequired, updateProductById);

//get all favorites products
router.get("/favorites", authRequired, getFavorites);

//metodo para eliminar un producto.
router.delete('/product/:idProducto',async(req,res)=>{
    const {idProducto}= req.params
  
    try{
      const findProduct=await prisma.producto.findUnique({
        where:{
          idProducto: parseInt(idProducto)
        }
    })
    if(!findProduct){
      return res.status(404).json({error:"product not found"})
    }
    const product=await prisma.producto.delete({
      where:{
        idProducto:parseInt(idProducto)
      }
    })
    res.status(200).json(product)
    }catch(error){
      res.status(500).json({error:"Error when deleting the product"})
    }
  })
  
export default router;
