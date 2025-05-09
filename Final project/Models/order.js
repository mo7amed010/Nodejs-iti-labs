const mongoose = require("mongoose");

const orderScheam = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Please provide a userId"],
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: [true, "Please provide a products"],
      },
    ],
    quantity: {
      type: Number,
      required: [true, "Please provide a quantity"],
    },
    total: {
      type: Number,
      required: [true, "Please provide a total"],
    },
    status: {
      type: String,
      enum: ["cart", "order"],
      default: "cart",
    },
  },
  { timestamps: true }
);
const orderModle = mongoose.model("order", orderScheam);
module.exports = orderModle;
