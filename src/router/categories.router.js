import { Router } from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const router = Router();


//solo para ver la lista de categorias
router.get('/categorias',async(req,res)=>{
  const categories= await prisma.categoria.findMany()
  res.json(categories)
})

export default router;
