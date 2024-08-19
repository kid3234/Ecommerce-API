import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinaryPakege from "cloudinary";
import multer from "multer";

const cloudinary = cloudinaryPakege.v2;

// configering Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.envCLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SEKRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png", "jpeg"],
  params: {
    folder: "Ecommerce-api",
  },
});

console.log("storage", storage);

// init multer with storage engien
const upload = multer({
  storage,
});

console.log("upload", upload);
export default upload;
