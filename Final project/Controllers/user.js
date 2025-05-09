const userModel = require("../Models/user");
const { CatchAsync } = require("../Utils/CatchAsync");
const AppError = require("../Utils/AppError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = CatchAsync(async (req, res, next) => {
  const newUser = req.body;
  let user = await userModel.create(newUser);
  if (user) {
    return res.status(201).json(user);
  } else {
    console.log(err);
    next(new AppError(500, "Error Adding User"));
  }
});

exports.login = CatchAsync(async (req, res, next) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ status: "You must provide username and password" });
  }
  let user = await userModel.findOne({ username });
  if (!user) {
    return res.status(404).json({ status: "User not found" });
  }
  let isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({ status: "Invalid username or password" });
  }
  let token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.SECRET_KEY
  );
  if (token) {
    return res.json({ status: "success", token });
  } else {
    console.log(err);
    next(new AppError(500, "Error logging in"));
  }
});

exports.deleteUser = CatchAsync(async (req, res, next) => {
  let id = req.userId;
  let user = await userModel.findByIdAndDelete(id);
  if (user) {
    return res.json({ status: "User deleted successfully" });
  } else {
    next(new AppError(404, "User not found"));
  }
});

exports.updateUser = CatchAsync(async (req, res, next) => {
  let newUser = req.body;
  let userId = req.userId;
  console.log(userId);

  let user = await userModel.findByIdAndUpdate(userId, newUser);
  if (user) {
    let updatedUser = await userModel.findById(userId);
    return res.json({
      status: "User updated successfully",
      data: updatedUser,
    });
  } else {
    next(new AppError(404, "User not found"));
  }
});
