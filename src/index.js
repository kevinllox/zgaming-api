import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./router/auth.router.js";
import categoriesRoutes from "./router/categories.router.js";
import productsRoutes from "./router/products.router.js";
import purchaseDetailsRoutes from "./router/purchaseDetails.router.js";

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/api", authRoutes);
app.use("/api", productsRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", purchaseDetailsRoutes);

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`)
);
