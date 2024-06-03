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
  const { idUsuario } = req.params;
  try {
    const isUserValid = await prisma.usuario.findFirst({
      where: {
        idUsuario: parseInt(idUsuario),
      },
    });

    if (!isUserValid) {
      return res
        .status(404)
        .json({ error: `This user id: ${idUsuario} doesn't exist` });
    }
    
    const favoritesProducts = await prisma.usuarioProducto.findMany({
      include: {
        Producto: true,
      },
      where: {
        idUsuario: parseInt(idUsuario),
      },
    });

    const formattedFavorites = favoritesProducts.map(favorite => ({
      ...favorite,
      producto: favorite.Producto,
      Producto: undefined,
    }));

    res.status(200).json(formattedFavorites);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not get favorites", error: error.message });
  }
};


const removeFromFavorites = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItemFromFavorites = await prisma.usuarioProducto.delete({
      where: {
        idUsuarioProducto: parseInt(id),
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
