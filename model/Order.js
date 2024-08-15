import mongoose from "mongoose";

const Schema = mongoose.Schema;

const randomTxet = Math.random().toString(36).substring(7).toLocaleLowerCase();
const randomNumber = Math.floor(1000 + Math.random() * 90000);

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        type: Object,
        required: true,
      },
    ],
    shippingAddress: {
      type: Object,
      required: true,
    },
    orderNumber: {
      type: String,
      default: randomTxet + randomNumber,
    },
    paymentStatus: {
      type: String,
      default: "Not paid",
    },
    paymentMethod: {
      type: String,
      default: "Not specified",
    },
    totalPrice: {
        type: Number,
        default:0,
      },
    currency: {
      type: String,
      default: "Not specified",
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "processing", "shipped", "delivered"],
    },
    deliverdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
