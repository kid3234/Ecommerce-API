import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import { createColor, deleteColor, getAllColors, getcolor, updateColor } from "../controllers/colorCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";


const colorRoutes = express.Router();

colorRoutes.post("/",isLoggedIn,isAdmin,createColor)
colorRoutes.get("/",getAllColors)
colorRoutes.get("/:id",getcolor)
colorRoutes.put("/:id",isLoggedIn,isAdmin,updateColor)
colorRoutes.delete("/:id",isLoggedIn,isAdmin,deleteColor)

export default colorRoutes