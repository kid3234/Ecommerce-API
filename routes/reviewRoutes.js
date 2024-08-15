import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import { createReview } from "../controllers/reviewCtrl.js";

const reviewRoutes = express.Router();

reviewRoutes.post('/:productID',isLoggedIn,createReview)

export default reviewRoutes