import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import { createCoupon, deleteCoupon, getAllCoupons, getSingleCoupon, updateCoupon } from "../controllers/couponCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";

const couponRoutes = express.Router();

couponRoutes.post("/", isLoggedIn, isAdmin,createCoupon);
couponRoutes.get("/", getAllCoupons);
couponRoutes.get("/:id", getSingleCoupon);
couponRoutes.put("/:id", isLoggedIn,isAdmin, updateCoupon);
couponRoutes.delete("/:id", isLoggedIn,isAdmin,deleteCoupon);

export default couponRoutes;
