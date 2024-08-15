import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import { createColor, deleteColor, getAllColors, getcolor, updateColor } from "../controllers/colorCtrl.js";


const colorRoutes = express.Router();

colorRoutes.post("/",isLoggedIn,createColor)
colorRoutes.get("/",isLoggedIn,getAllColors)
colorRoutes.get("/:id",isLoggedIn,getcolor)
colorRoutes.put("/:id",isLoggedIn,updateColor)
colorRoutes.delete("/:id",isLoggedIn,deleteColor)

export default colorRoutes