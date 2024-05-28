import { Router } from "express";
import { getProductById, getProducts } from "../controllers/products.controller.js";
import { Prisma } from "@prisma/client";
import { PrismaClient } from '@prisma/client'
const router = Router();
const prisma = new PrismaClient()

//mostrar todos los productos
router.get('/products',async(req,res)=>{
    const products= await prisma.producto.findMany()
    res.status(200).json(products)
  })
  //Intento del metodo para filtrar por categoria
  router.get('/products/:idCategoria',async(req,res)=>{
    const{idCategoria}=req.params
  
    try{
      const products= await prisma.producto.findMany({
          where:{
            idCategoria:parseInt(idCategoria)
          }
        })
        res.status(200).json(products)
      }catch(error){
        res.status(500).json({error:"Error when searching for product"})
      }
  })

//METODO PARA AGREGAR PRODUCTO
router.post('/product',async(req,res)=>{
    const{
      nombreProducto,
      descripcion,
      precio,
      stock,
      imagenProducto,
      isFavorito,
      idCategoria
    }=req.body
    try{
      const category=await prisma.categoria.findUnique({
        where:{
          idCategoria:idCategoria
        }
      })
      if(!category){
        return res.status(400).json({error:"Category not found"})
      }
      const product=await prisma.producto.create({
        data:{
          nombreProducto,
          descripcion,
          precio,
          stock,
          imagenProducto,
          isFavorito,
          idCategoria
        }
      })
      res.status(200).json(product)
    }catch(error){
      res.status(500).json({error:"The product cannot be created"})
    }
  });

  //ACTUALIZAR producto
  router.put('/product/:idProducto',async(req,res)=>{
    const{idProducto}=req.params
    const{
      nombreProducto,
      descripcion,
      precio,
      stock,
      imagenProducto,
      isFavorito,
      idCategoria
    }=req.body
    try{
      const findProduct=await prisma.producto.findUnique({
        where:{
          idProducto: parseInt(idProducto)
        }
    })
    if(!findProduct){
      return res.status(404).json({error:"product not found"})
    }
    const updateProduct=await prisma.producto.update({
      where:{idProducto:parseInt(idProducto)}, 
        data:{
        nombreProducto,
        descripcion,
        precio,
        stock,
        imagenProducto,
        isFavorito,
        idCategoria}
    })
    res.status(200).json(updateProduct)
    }catch(error){
      res.status(500).json({error:"Error while updating the product"})
    }
  })

  //metodo para buscar los favoritos
router.get('/favorites', async(req,res)=>{
    const favorites= await prisma.producto.findMany({
      where:{
        isFavorito: true
      }
    })
    res.status(200).json(favorites)
  })

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
