import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belongs to a user"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Review must belongs to a product"],
    },
    message: {
      type: String,
      required: [true, "Please add a comment"],
    },
    rating: {
      type: Number,
      required: [true, "Please add rating between 1 and 5"],
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
