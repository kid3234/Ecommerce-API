import expressAsyncHandler from "express-async-handler";
import dotenv  from "dotenv"
dotenv.config()
import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY)

export const createOrder = expressAsyncHandler(async (req, res) => {
  const { orderItems, totalPrice, shippingAddress } = req.body;

  const user = await User.findById(req?.userAuthId);

  if(!user?.hasShippingAdderes){
    throw new Error("please provide shipping address");
    
  }

  if (orderItems.length < 0) {
    throw new Error("No order Items");
  }

  const order = await Order.create({
    user: user._id,
    shippingAddress,
    orderItems,
    totalPrice,
  });

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

  console.log("stripe",stripe);
  // stripe.checkout.sessions.create

  // convert the order item like the structure on the stripe

  const convertedOrderItems = orderItems.map((item)=>{
    return {
      price_data:{
        currency:"ETB",
        product_data:{
          name:item?.name,
          description:item?.description,
        },
        unit_amount: item?.price * 100,
      },
      quantity: item?.quantity
    }
  })

  const session = await stripe?.checkout?.sessions.create({
    line_items:convertedOrderItems,
    mode: "payment",
    success_url:"http://localhost:3000/success",
    cancel_url:"http://localhost:3000/cancel",
  });

  console.log("session;;",session);
  

  res.send({url: session?.url})
  // res.status(200).json({
  //   status: true,
  //   message: "order created",
  //   user,
  //   order,
  // });
});
