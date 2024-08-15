import express from "express";
import { createCategoryCtrl, deleteCategoryCtrl, getCategoriesCtrl, getCategoryCtrl, updateCategoryCtrl } from "../controllers/categoryCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";


const categoryRoutes = express.Router();

categoryRoutes.post("/",isLoggedIn,createCategoryCtrl)
categoryRoutes.get("/",isLoggedIn,getCategoriesCtrl)
categoryRoutes.get("/:id",isLoggedIn,getCategoryCtrl)
categoryRoutes.put("/:id",isLoggedIn,updateCategoryCtrl)
categoryRoutes.delete("/:id",isLoggedIn,deleteCategoryCtrl)

export default categoryRoutes