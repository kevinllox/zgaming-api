import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  try {
    const products = await prisma.producto.findMany();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error when searching for product", error });
  }
};
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const productById = await prisma.producto.findUnique({
      where: {
        idProducto: parseInt(id),
      },
    });
    res.status(200).json(productById);
  } catch (error) {
    res
      .status(500)
      .json({ message: `We couldn't find this id: ${id} in products`, error });
  }
};
const getProductByCategory = async (req, res) => {
  const { idCategoria } = req.params;

  try {
    const products = await prisma.producto.findMany({
      where: {
        idCategoria: parseInt(idCategoria),
      },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error when searching for product" });
  }
};

const addProduct = async (req, res) => {
  const {
    nombreProducto,
    descripcion,
    precio,
    stock,
    imagenProducto,
    isFavorito,
    isAddedInCart,
    idCategoria,
  } = req.body;
  try {
    const category = await prisma.categoria.findUnique({
      where: {
        idCategoria: idCategoria,
      },
    });
    if (!category) {
      return res.status(400).json({ error: "Category not found" });
    }
    const product = await prisma.producto.create({
      data: {
        nombreProducto,
        descripcion,
        precio,
        stock,
        imagenProducto,
        isFavorito,
        isAddedInCart,
        idCategoria,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "The product cannot be created", error });
  }
};

const updateProductById = async (req, res) => {
  const { idProducto } = req.params;
  const {
    nombreProducto,
    descripcion,
    precio,
    stock,
    imagenProducto,
    isFavorito,
    isAddedInCart,
    idCategoria,
  } = req.body;
  try {
    const findProduct = await prisma.producto.findUnique({
      where: {
        idProducto: parseInt(idProducto),
      },
    });
    if (!findProduct) {
      return res.status(404).json({ error: "product not found" });
    }
    const updateProduct = await prisma.producto.update({
      where: { idProducto: parseInt(idProducto) },
      data: {
        nombreProducto,
        descripcion,
        precio,
        stock,
        imagenProducto,
        isFavorito,
        idCategoria,
        isAddedInCart
      },
    });
    res.status(201).json(updateProduct);
  } catch (error) {
    res.status(500).json({ error: "Error while updating the product" });
  }
};

const getFavorites = async (req, res) => {
  try {
    const favorites = await prisma.producto.findMany({
      where: {
        isFavorito: true,
      },
    });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Error while getting favorites products" });
  }
};

const deleteProduct = async (req, res) => {
  const { idProducto } = req.params;

  try {
    const findProduct = await prisma.producto.findUnique({
      where: {
        idProducto: parseInt(idProducto),
      },
    });
    if (!findProduct) {
      return res.status(404).json({ error: "product not found" });
    }
    const product = await prisma.producto.delete({
      where: {
        idProducto: parseInt(idProducto),
      },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error when deleting the product" });
  }
};

export {
  getProducts,
  getProductById,
  getProductByCategory,
  addProduct,
  updateProductById,
  getFavorites,
  deleteProduct,
};
