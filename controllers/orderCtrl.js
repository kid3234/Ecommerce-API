import expressAsyncHandler from "express-async-handler";
import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";

export const createOrder = expressAsyncHandler(async (req, res) => {
  const { orderItems, totalPrice, shippingAddress } = req.body;

  const user = await User.findById(req?.userAuthId);

  if (orderItems.length < 0) {
    throw new Error("No order Items");
  }

  const order = await Order.create({
    user: user._id,
    shippingAddress,
    orderItems,
    totalPrice,
  });

  console.log("orders..", order);

  user.orders.push(order._id);

  await user.save();

  const products = await Product.find({ _id: { $in: orderItems } });

  orderItems.map(async (order) => {
    const product = products.find((product) => {
      return product?._id?.toString() === order?._id?.toString();
    });
    if (product) {
      product.totalSold += order?.quntity;
      product.totalQty -= order?.quntity;
    }
    product.save();
  });
});
