import express from "express";
import { createCategoryCtrl, deleteCategoryCtrl, getCategoriesCtrl, getCategoryCtrl, updateCategoryCtrl } from "../controllers/categoryCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import upload from "../config/fileUpload.js";


const categoryRoutes = express.Router();

categoryRoutes.post("/",isLoggedIn,upload.single('file'),createCategoryCtrl)
categoryRoutes.get("/",getCategoriesCtrl)
categoryRoutes.get("/:id",getCategoryCtrl)
categoryRoutes.put("/:id",isLoggedIn,updateCategoryCtrl)
categoryRoutes.delete("/:id",isLoggedIn,deleteCategoryCtrl)

export default categoryRoutes