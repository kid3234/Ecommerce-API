import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv"

dotenv.config()
import cloudinaryPakege from "cloudinary";
import multer from "multer";

const cloudinary = cloudinaryPakege.v2;

// configering Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SEKRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png", "jpeg"],
  params: {
    folder: "Ecommerce-api",
  },
});

// init multer with storage engien
const upload = multer({
  storage,
});

export default upload;
