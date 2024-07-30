import expressAsyncHandler from "express-async-handler";
import User from "../model/User.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
// import asyncHandler from "express-async-handler";

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
   throw(new Error("user already exists"))
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    fullName,
    password: hashedPassword,
    email,
  });

  res.status(201).json({
    status: "success",
    message: "user registerd successfully",
    data: user,
  });
});

// login controller

export const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      return res.status(200).json({
        status: "success",
        message: "user loged in successfuly",
        user: user,
      });
    }
    throw new Error("Incorect password");
  }
  throw new Error("User not found with this email");
});
