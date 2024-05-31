import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getCategories = async (req, res) => {
  try {
    const categories = await prisma.categoria.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Could not get any category", error });
  }
};

export { getCategories };
