import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import { createOrder } from "../controllers/orderCtrl.js";

const orderRoutes = express.Router();



orderRoutes.post('/',isLoggedIn,createOrder);

export default orderRoutes;