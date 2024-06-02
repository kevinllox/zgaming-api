import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addToFavorites = async (req, res) => {
  const { idUsuario, idProducto } = req.body;
  try {
    const updateFavoriteField = await prisma.producto.update({
      data: {
        isFavorito: true,
      },
      where: {
        idProducto: idProducto,
      },
    });
    const usuarioProducto = await prisma.usuarioProducto.create({
      data: {
        idUsuario,
        idProducto,
      },
    });
    console.log(updateFavoriteField);
    res
      .status(201)
      .json({ usuarioProducto, message: "This item was added to favorites" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not add favorites", error: error.message });
  }
};

const getFavoritesbyUser = async (req, res) => {
  const { idUsuario } = req.body;
  try {
    const favoritesProducts = await prisma.usuarioProducto.findMany({
      include: {
        Producto: true,
      },
      where: {
        idUsuario: idUsuario,
      },
    });
    res.status(200).json(favoritesProducts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not get favorites", error: error.message });
  }
};

const removeFromFavorites = async (req, res) => {
  const { idUsuarioProducto } = req.body;

  try {
    const deletedItemFromFavorites = await prisma.usuarioProducto.delete({
      where: {
        idUsuarioProducto: idUsuarioProducto,
      },
    });

    res.status(200).json(deletedItemFromFavorites);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not delete this item", error: error.message });
  }
};
export { addToFavorites, getFavoritesbyUser, removeFromFavorites };
