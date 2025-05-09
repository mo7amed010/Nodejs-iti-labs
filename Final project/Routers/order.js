const express = require("express");
const router = express.Router();
const {
  addToCart,
  editCart,
  getProductInCart,
  getOrder,
  makeOrder,
} = require("../Controllers/order");
const { auth } = require("../Middlewares/auth");

router.use(auth);
router.get("/", getProductInCart);
router.post("/add", addToCart);
router.patch("/edit", editCart);
router.get("/order", getOrder);
router.post("/order", makeOrder);

module.exports = router;
