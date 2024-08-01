import express from "express";
import { createProductCtrl,deleteProductCtrl, getAllProductsCtrl, getProductCtrl, updateProductCtrl } from "../controllers/productCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";

const productRoutes = express.Router();
 
productRoutes.post("/create",isLoggedIn,createProductCtrl)
productRoutes.get("/",getAllProductsCtrl)
productRoutes.get("/:id",getProductCtrl)
productRoutes.put("/:id",isLoggedIn,updateProductCtrl)
productRoutes.delete("/:id",isLoggedIn,deleteProductCtrl)

export default productRoutes;