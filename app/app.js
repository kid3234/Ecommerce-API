import express from "express";
import dotenv from "dotenv";

dotenv.config();

import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/usersRoute.js";
import { globalErrorHandler, notFound } from "../middlewares/globalErrorHandler.js";



dbConnect();
const app = express();

// to pass incoming data 
app.use(express.json())
app.use("/", userRoutes);
app.use(notFound)
app.use(globalErrorHandler)

export default app; 
