const orderModle = require("../Models/order");
const productModel = require("../Models/product");
const { CatchAsync } = require("../Utils/CatchAsync");
const AppError = require("../Utils/AppError");

exports.addToCart = CatchAsync(async (req, res, next) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;

  const product = await productModel.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  let cart = await orderModle.findOne({ userId, status: "cart" });

  if (!cart) {
    cart = await orderModle.create({
      userId,
      products: [productId],
      quantity,
      total: product.price * quantity,
      status: "cart",
    });
  } else {
    const existingProductIndex = cart.products.indexOf(productId);

    if (existingProductIndex > -1) {
      cart.quantity += quantity;
      cart.total += product.price * quantity;
    } else {
      cart.products.push(productId);
      cart.quantity += quantity;
      cart.total += product.price * quantity;
    }

    await cart.save();
  }

  res.status(200).json({
    status: "success",
    data: cart,
  });
});

// Edit cart
exports.editCart = CatchAsync(async (req, res, next) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;

  const cart = await orderModle.findOne({ userId, status: "cart" });
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  const product = await productModel.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  const productIndex = cart.products.indexOf(productId);
  if (productIndex === -1) {
    return next(new AppError("Product not in cart", 404));
  }

  const oldQuantity = cart.quantity;
  cart.quantity = quantity;
  cart.total = product.price * quantity;

  await cart.save();

  res.status(200).json({
    status: "success",
    data: cart,
  });
});

exports.getProductInCart = CatchAsync(async (req, res, next) => {
  const userId = req.userId;

  const cart = await orderModle
    .findOne({ userId, status: "cart" })
    .populate("products");

  if (!cart) {
    return res.status(200).json({
      status: "success",
      data: null,
    });
  }

  res.status(200).json({
    status: "success",
    data: cart,
  });
});

exports.getOrder = CatchAsync(async (req, res, next) => {
  const userId = req.userId;

  const orders = await orderModle
    .find({ userId, status: "order" })
    .populate("products");

  res.status(200).json({
    status: "success",
    data: orders,
  });
});

exports.makeOrder = CatchAsync(async (req, res, next) => {
  const userId = req.userId;

  const cart = await orderModle.findOne({ userId, status: "cart" });
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  cart.status = "order";
  await cart.save();

  res.status(200).json({
    status: "success",
    data: cart,
  });
});
