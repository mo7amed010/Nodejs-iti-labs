const usersModel = require("../models/users");
const todoModel = require("../models/todo");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAll = async (req, res) => {
  try {
    let users = await usersModel.find();
    if (users) {
      res.json({ status: "success", data: users });
    } else {
      res.json({ status: "error", message: "No users found" });
    }
  } catch (err) {
    res.status(500).json({ status: "fail", message: "Error getting Users" });
  }
};

exports.addUser = async (req, res) => {
  try {
    const newUser = req.body;
    let user = await usersModel.create(newUser);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Error Adding User" });
  }
};

exports.editUser = async (req, res) => {
  try {
    let newUser = req.body;
    let id = req.params.id;
    let user = await usersModel.findByIdAndUpdate(id, newUser);
    if (user) {
      let updatedUser = await usersModel.findById(id);
      return res.json({
        status: "User edited successfully",
        data: updatedUser,
      });
    } else {
      return res.status(404).json({ status: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ status: "fail", message: "Error Editing User" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await usersModel.findByIdAndDelete(id);
    if (user) {
      res.json({ status: "User deleted successfully" });
    } else {
      res.status(404).json({ status: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ status: "fail", message: "Error Deleting User" });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    let id = req.params.id;
    let todos = await todoModel.find({ userId: id });
    if (todos.length > 0) {
      res.json({ status: "success", data: todos });
    } else {
      res.status(404).json({ status: "No todos found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ status: "fail", message: "Error getting Todos", error: err });
  }
};

exports.login = async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ status: "You must provide username and password" });
    }
    let user = await usersModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }
    let isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ status: "Invalid username or password" });
    }
    let token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_KEY
    );
    res.json({ status: "success", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Error logging in" });
  }
};
