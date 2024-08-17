import mongoose from "mongoose";

const Schema = mongoose.Schema;

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);
couponSchema.virtual("isExpired").get(function () {
  const coupon = this;
  console.log(coupon.endDate < Date.now());
  return coupon.endDate < Date.now();
});

couponSchema.virtual("daysLeft").get(function () {
  const coupon = this;
  const dayesLeft =
    Math.ceil((coupon.endDate - Date.now())/ (1000 * 60 * 60 * 24))  +
    " " +
    "Days Left";

  console.log("dayesLeft", dayesLeft, coupon);
  return dayesLeft;
});

couponSchema.pre("validate", function (next) {
  if (this.endDate < this.startDate) {
    next(new Error("End date cann't be less than start date"));
  }
  next();
});
couponSchema.pre("validate", function (next) {
  if (this.startDate < Date.now()) {
    next(new Error("Start date cann't be less than current date"));
  }
  next();
});
couponSchema.pre("validate", function (next) {
  if (this.endDate < Date.now()) {
    next(new Error("End date cann't be less than current date"));
  }
  next();
});

couponSchema.pre("validate", function (next) {
  if (this.discount <= 0 || this.discount > 100) {
    next(new Error("discount cann't be less that 0 and greater than 100"));
  }
  next();
});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
