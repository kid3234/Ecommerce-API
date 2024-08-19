import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import {
  createOrder,
  getAllOrders,
  getOrderStat,
  getSingleOrder,
  updateOrderStatus,
} from "../controllers/orderCtrl.js";

const orderRoutes = express.Router();

orderRoutes.post("/", isLoggedIn, createOrder);
orderRoutes.get("/", isLoggedIn, getAllOrders);
orderRoutes.get("/statistics", isLoggedIn, getOrderStat);
orderRoutes.get("/:id", isLoggedIn, getSingleOrder);
orderRoutes.put("/:id", isLoggedIn, updateOrderStatus);

export default orderRoutes;
