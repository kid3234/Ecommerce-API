import express from "express";
import { createProductCtrl,deleteProductCtrl, getAllProductsCtrl, getProductCtrl, updateProductCtrl } from "../controllers/productCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import upload from "../config/fileUpload.js";

const productRoutes = express.Router();
 
productRoutes.post("/create",isLoggedIn,upload.single('file'),createProductCtrl)
productRoutes.get("/",getAllProductsCtrl)
productRoutes.get("/:id",getProductCtrl)
productRoutes.put("/:id",isLoggedIn,updateProductCtrl)
productRoutes.delete("/:id",isLoggedIn,deleteProductCtrl)

export default productRoutes; 