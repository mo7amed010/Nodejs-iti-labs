const mongoose = require("mongoose");
const prodectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    photo: {
      type: String,
    },
    sellerId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: [true, "SellerId is required"],
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", prodectSchema);
module.exports = productModel;
