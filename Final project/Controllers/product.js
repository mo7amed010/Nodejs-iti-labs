const producModle = require("../Models/product");
const { CatchAsync } = require("../Utils/CatchAsync");
const AppError = require("../Utils/AppError");

exports.addProduct = CatchAsync(async (req, res, next) => {
  req.body.sellerId = req.userId;
  const newProduct = await producModle.create(req.body);
  if (newProduct) {
    return res.status(201).json({ status: "success", data: newProduct });
  } else {
    return next(new AppError(400, "Failed to add product"));
  }
});

exports.getAllProducts = CatchAsync(async (req, res, next) => {
  let sellerId = req.userId;
  const products = await producModle.find({ sellerId }).populate("sellerId");
  if (products) {
    res.json({ status: "success", data: products });
  } else {
    next(new AppError(400, "Failed to get products"));
  }
});

exports.updateProduct = CatchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const sellerId = req.userId;
  req.body.sellerId = sellerId;
  const updatedProduct = await producModle.findByIdAndUpdate(
    { sellerId, _id: productId },
    req.body
  );
  if (updatedProduct) {
    let product = await producModle.findById(productId).populate("sellerId");
    return res.status(200).json({ status: "success", data: product });
  } else {
    return next(new AppError(400, "Failed to update product"));
  }
});

exports.deleteProduct = CatchAsync(async (req, res, next) => {
  let sellerId = req.userId;
  const product = await producModle.findOne({ sellerId, _id: req.params.id });
  if (product) {
    let deletedProduct = await producModle.deleteOne({ _id: req.params.id });
    if (deletedProduct) {
      return res
        .status(200)
        .json({ status: "success", message: "Product deleted successfully" });
    } else {
      return next(new AppError(400, "Failed to delete product"));
    }
  } else {
    return next(new AppError(404, "Product not found"));
  }
});
