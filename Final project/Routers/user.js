const express = require("express");
const router = express.Router();
const {
  login,
  register,
  deleteUser,
  updateUser,
} = require("../Controllers/user");
const { auth } = require("../Middlewares/auth");

router.post("/login", login);
router.post("/register", register);
router.delete("/delete", auth, deleteUser);
router.patch("/update", auth, updateUser);

module.exports = router;
