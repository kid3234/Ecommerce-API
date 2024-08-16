import express from "express";
import dotenv from "dotenv";
dotenv.config();

import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/usersRoute.js";
import { globalErrorHandler, notFound } from "../middlewares/globalErrorHandler.js";
import productRoutes from "../routes/productRoute.js";
import categoryRoutes from "../routes/categoryRoute.js";
import brandRoutes from "../routes/brandRoutes.js";
import colorRoutes from "../routes/colorRoutes.js";
import reviewRoutes from "../routes/reviewRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";
import Stripe from "stripe";



dbConnect();
const app = express();


const stripe = new Stripe(process.env.STRIPE_KEY)
const endpointSecret = "whsec_6606e000b821ba2de773bf49b9eeb1c7d688d84728f1fe4f4604debcb463e9b0";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log("event",event);
    
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

// to pass incoming data 
app.use(express.json())
app.use("/api/V1/users", userRoutes);
app.use("/api/V1/products",productRoutes)
app.use("/api/V1/category",categoryRoutes)
app.use("/api/V1/brands",brandRoutes)
app.use("/api/V1/colors",colorRoutes)
app.use("/api/V1/reviews",reviewRoutes)
app.use("/api/V1/orders",orderRoutes)


app.use(notFound)
app.use(globalErrorHandler)
 
export default app;  
