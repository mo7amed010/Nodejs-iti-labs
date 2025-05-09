const express = require("express");
const router = express.Router();
const { auth, checkRole } = require("../Middlewares/auth");
const {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} = require("../Controllers/product");

router.get("/", getAllProducts);
router.use(auth);
router.use(checkRole("seller"));
router.post("/add", addProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
