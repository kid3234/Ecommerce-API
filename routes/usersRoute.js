import express from "express";
import {  getUserProfileCtrl, loginUserCtrl, registerUser, updateShipingAddress } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";

const userRoutes = express.Router()

userRoutes.post('/register',registerUser)
userRoutes.post('/login',loginUserCtrl);
userRoutes.get('/profile',isLoggedIn,getUserProfileCtrl)
userRoutes.put('/update/shipping',isLoggedIn,updateShipingAddress)


export default userRoutes 
