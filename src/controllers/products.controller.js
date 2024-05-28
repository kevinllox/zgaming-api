const getProducts = (req, res) => {
  return res.status(200).json([
    { id: 1, name: "Keyboard Logitech" },
    { id: 2, name: "GTX 1660 SUPER" },
  ]);
};

const getProductById = (req, res) => {
  const { id } = req.params;
  return res.status(200).json([{ id: id, name: "Keyboard Logitech" }]);
};

export { getProducts, getProductById };
