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



dbConnect();
const app = express();

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
