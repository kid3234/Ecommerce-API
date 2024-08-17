import expressAsyncHandler from "express-async-handler";
import Coupon from "../model/Coupon.js";

export const createCoupon = expressAsyncHandler(async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;
  const couponExist = await Coupon.findOne({ code });

  console.log("couponExist", couponExist);
  if (couponExist) {
    throw new Error("coupon alredy exists");
  }
  if (isNaN(discount)) {
    throw new Error("Discount value must be a number");
  }

  const coupon = await Coupon.create({
    code: code.toUpperCase(),
    startDate,
    endDate,
    discount,
    user: req.userAuthId,
  });

  res.json({
    success: true,
    message: "Coupon created successfuly",
    coupon,
  });
});

export const getAllCoupons = expressAsyncHandler(async (req, res) => {
  const coupons = await Coupon.find();

  res.json({
    message: "coupons featched successfuly",
    coupons,
  });
});

export const getSingleCoupon = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const coupon = await Coupon.findById(id);
  if (!coupon) {
    throw new Error("Coupons not found");
  }

  res.json({
    message: "coupon featch successfuly",
    coupon,
  });
});

export const updateCoupon = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { code, startDate, endDate, discount } = req.body;
  const coupon = await Coupon.findByIdAndUpdate(id, {
    code: code?.toUpperCase(),
    startDate,
    endDate,
    discount,
  },{
    new:true
  });
  if (!coupon) {
    throw new Error("cann't update the coupon");
  }

  res.json({
    message: "coupon updated successfuly",
    coupon,
  });
});

export const deleteCoupon = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const coupon = await Coupon.findByIdAndDelete(id);
  if (!coupon) {
    throw new Error("cann't delete the coupon");
  }
  res.json({
    success: true,
    message: "Coupon deleted successfuly",
  });
});
