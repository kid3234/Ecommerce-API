import expressAsyncHandler from "express-async-handler";
import Review from "../model/Review.js";
import Product from "../model/Product.js";

export const createReview = expressAsyncHandler(async (req, res) => {
  const { productID } = req.params;
  const { rating, message } = req.body;

  const productFound = await Product.findById(productID).populate("reviews");

  if (!productFound) {
    throw new Error("Product not found");
  }

  // check if the user alredy reviewd this product
  const checkUser = productFound?.reviews?.find((review) => {
    return review?.user?.toString() === req?.userAuthId?.toString();
  });


  if (checkUser) {
    throw new Error("You already reviewd this product");
  }

  const review = await Review.create({
    message,
    rating,
    user: req.userAuthId,
    product: productID,
  });

  productFound.reviews.push(review._id);

  await productFound.save();

  res.status(200).json({
    message: "Product reviewd successfuly",
  });
});
