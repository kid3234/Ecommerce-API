import express from "express";
import {  getUserProfileCtrl, loginUserCtrl, registerUser } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";

const userRoutes = express.Router()

userRoutes.post('/register',registerUser)
userRoutes.post('/login',loginUserCtrl);
userRoutes.get('/profile',isLoggedIn,getUserProfileCtrl)


export default userRoutes 
