import expressAsyncHandler from "express-async-handler";
import User from "../model/User.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import { generateToken } from "../utils/genToken.js";
import { getToken } from "../utils/getToken.js";
import { verifyToken } from "../utils/verifyTolen.js";
// import asyncHandler from "express-async-handler";

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("user already exists");
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
        token: generateToken(user.id),
      });
    }
    throw new Error("Incorect password");
  }
  throw new Error("User not found with this email");
});

// user profile controller

export const getUserProfileCtrl = async (req, res) => {
  const token = getToken(req);

  const verified = verifyToken(token);
  console.log(verified);
  res.json({
    msg: "this is your profile",
  });
  console.log("this is token", token);
};

export const updateShipingAddress = expressAsyncHandler(async (req, res) => {
  const { province, postalCode, city, address, lastName, firstName } = req.body;

  const user = await User.findByIdAndUpdate(
    req.userAuthId,
    {
      shippingAddress: {
        province,
        postalCode,
        city,
        address,
        lastName,
        firstName,
      },
      hasShippingAdderes: true,
    },
    {
      new: true,
    }
  );
  if (!user) {
    throw new Error("Can't add shiping address");
  }
  res.json({
    message: "shiping Address added successfuly",
    user,
  });
});
