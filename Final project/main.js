const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./Routers/user");
const productRouter = require("./Routers/product");
const orderRouter = require("./Routers/order");
const AppError = require("./Utils/AppError");

const app = express();

dotenv.config();

app.listen(3003, () => {
  console.log("server is working...");
});

app.use(cors());
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/FinalProject")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/cart", orderRouter);

app.use(function (req, res, next) {
  next(new AppError(404, "Route not found"));
});

app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ status: "fail", message: err.message || "ops, something wrong" });
});
