import express from "express";
import {
  createProductCtrl,
  deleteProductCtrl,
  getAllProductsCtrl,
  getProductCtrl,
  updateProductCtrl,
} from "../controllers/productCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/isAdmin.js";

const productRoutes = express.Router();

productRoutes.post(
  "/create",
  isLoggedIn,
  isAdmin,
  upload.array("files"),
  createProductCtrl
);

productRoutes.get("/", getAllProductsCtrl);
productRoutes.get("/:id", getProductCtrl);
productRoutes.put("/:id", isLoggedIn, isAdmin,updateProductCtrl);
productRoutes.delete("/:id", isLoggedIn,isAdmin, deleteProductCtrl);

export default productRoutes;
