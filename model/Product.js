import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      ref: "Category",
      // required:true
    },
    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    totalQty: {
      type: Number,
      required: true,
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

ProductSchema.virtual("quantityLeft").get(function () {
  const product = this;
  return product.totalQty - product.totalSold;
});
ProductSchema.virtual("totlaReviews").get(function () {
  const product = this;
  return product.reviews.length;
});

ProductSchema.virtual("avarageRating").get(function () {
  const product = this;
  let sum = 0;
  product.reviews.find((review) => {
    sum = sum + review.rating;
  });

  return Number(sum / product.totlaReviews).toFixed(1);
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
