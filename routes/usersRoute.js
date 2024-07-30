import express from "express";
import { loginUserCtrl, registerUser } from "../controllers/userController.js";

const userRoutes = express.Router()

userRoutes.post('/api/V1/users/register',registerUser)
userRoutes.post('/api/V1/user/login',loginUserCtrl);

export default userRoutes 