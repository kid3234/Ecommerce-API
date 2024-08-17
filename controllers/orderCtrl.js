import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();
import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Stripe from "stripe";
import Coupon from "../model/Coupon.js";

const stripe = new Stripe(process.env.STRIPE_KEY);

export const createOrder = expressAsyncHandler(async (req, res) => {
  const { coupon } = req?.query;

  const couponFound = await Coupon.findOne({ code: coupon?.toUpperCase() });
  if (couponFound?.isExpired) {
    throw new Error("Coupon is expired");
  }
  if (!couponFound) {
    throw new Error("Coupon not found");
  }

  const discount = couponFound?.discount / 100;

  const { orderItems, totalPrice, shippingAddress } = req.body;

  const user = await User.findById(req?.userAuthId);

  if (!user?.hasShippingAdderes) {
    throw new Error("please provide shipping address");
  }

  if (orderItems.length < 0) {
    throw new Error("No order Items");
  }

  const order = await Order.create({
    user: user._id,
    shippingAddress,
    orderItems,
    totalPrice: couponFound ? totalPrice - totalPrice * discount : totalPrice,
  });

  console.log("order with coupon ",order);
  user.orders.push(order._id);

  await user.save();

  const products = await Product.find({ _id: { $in: orderItems } });

  orderItems.map(async (order) => {
    const product = products.find((product) => {
      return product?._id?.toString() === order?._id?.toString();
    });
    if (product) {
      product.totalSold += order?.quantity;
    }
    product.save();
  });

  user.orders.push(order?._id);
  await user.save();

  // stripe.checkout.sessions.create

  // convert the order item like the structure on the stripe

  const convertedOrderItems = orderItems.map((item) => {
    return {
      price_data: {
        currency: "ETB",
        product_data: {
          name: item?.name,
          description: item?.description,
        },
        unit_amount: item?.price * 100,
      },
      quantity: item?.quantity,
    };
  });

  const session = await stripe?.checkout?.sessions.create({
    line_items: convertedOrderItems,
    metadata: {
      orderId: JSON.stringify(order?._id),
    },
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send({ url: session?.url });
  // res.status(200).json({
  //   status: true,
  //   message: "order created",
  //   user,
  //   order,
  // });
});

export const getAllOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find();
  res.json({
    message: "orders featched successfuly",
    orders,
  });
});

export const getSingleOrder = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);
  if (!order) {
    throw new Error("order not found");
  }

  res.json({
    message: "order featched successfuly",
    order,
  });
});

export const updateOrderStatus = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      status,
    },
    {
      new: true,
    }
  );
  if (!updatedOrder) {
    throw new Error("Error updating order status");
  }

  res.json({
    message: "order status updated successfuly",
    updatedOrder,
  });
});
