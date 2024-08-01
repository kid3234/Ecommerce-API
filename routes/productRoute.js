import express from "express";
import { createProductCtrl, getAllProductsCtrl } from "../controllers/productCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";

const productRoutes = express.Router();
 
productRoutes.post("/create",isLoggedIn,createProductCtrl)
productRoutes.get("/",getAllProductsCtrl)

export default productRoutes;