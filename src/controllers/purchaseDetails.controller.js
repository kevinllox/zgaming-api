import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addToCart = async (req, res) => {
  const { idUsuario, idProducto } = req.body;
  try {
    const updatedCartState = await prisma.producto.update({
      data: {
        isAddedInCart: true,
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
    console.log(updatedCartState);
    res.status(201).json({
      usuarioProducto,
      message: "This item was added to the shopping cart",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not add to cart", error: error.message });
  }
};

const getCartItems = async (req, res) => {
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

    const shoppingCartProducts = await prisma.usuarioProducto.findMany({
      include: {
        Producto: {
          where: {
            isAddedInCart: true,
          },
        },
      },
      where: {
        idUsuario: parseInt(idUsuario),
      },
    });

    const formattedShoppingCartProducts = shoppingCartProducts
      .map((cartProduct) => ({
        ...cartProduct,
        producto: cartProduct.Producto,
        Producto: undefined,
      }))
      .filter((cartProduct) => cartProduct.producto !== null);

    res.status(200).json(formattedShoppingCartProducts);
  } catch (error) {
    res.status(500).json({
      message: "Could not get shopping cart items",
      error: error.message,
    });
  }
};

const removeItemFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItemFromCart = await prisma.usuarioProducto.delete({
      where: {
        idUsuarioProducto: parseInt(id),
      },
    });

    res.status(200).json(deletedItemFromCart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not delete this item", error: error.message });
  }
};
export { addToCart, getCartItems, removeItemFromCart };
