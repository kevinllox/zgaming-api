import { Router } from "express";

const router = Router();

router.get("/purchase-details", (req, res) => {
  return res.status(200).json([
    { id: 1, name: "Order 1" },
    { id: 2, name: "Order 2" },
  ]);
});
router.get("/purchase-details/:id", (req, res) => {
  return res.status(200).json([{ id: 1, total: 1000 }]);
});
export default router;
