import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import { createCoupon, deleteCoupon, getAllCoupons, getSingleCoupon, updateCoupon } from "../controllers/couponCtrl.js";

const couponRoutes = express.Router();

couponRoutes.post("/", isLoggedIn, createCoupon);
couponRoutes.get("/", isLoggedIn, getAllCoupons);
couponRoutes.get("/:id", isLoggedIn, getSingleCoupon);
couponRoutes.put("/:id", isLoggedIn, updateCoupon);
couponRoutes.delete("/:id", isLoggedIn, deleteCoupon);

export default couponRoutes;
