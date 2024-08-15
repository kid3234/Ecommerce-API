import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import { createBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "../controllers/brandCtrl.js";

const brandRoutes = express.Router()

brandRoutes.post('/',isLoggedIn,createBrand);
brandRoutes.get('/',isLoggedIn,getAllBrands);
brandRoutes.get('/:id',isLoggedIn,getBrand);
brandRoutes.put('/:id',isLoggedIn,updateBrand);
brandRoutes.delete('/:id',isLoggedIn,deleteBrand);

export default brandRoutes;