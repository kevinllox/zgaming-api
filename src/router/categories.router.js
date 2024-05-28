import { Router } from "express";

const router = Router();

router.get("/categories", (req, res) => {
  return res.status(200).json({
    categories: [
      { id: 1, name: "Zona Computo" },
      { id: 2, name: "Zona Red" },
    ],
  });
});

export default router;
