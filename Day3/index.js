const express = require("express");
const app = express();
const todoRouter = require("./routes/todo");
const usersRouter = require("./routes/users");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
app.listen(3001);
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/todoList")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/todo", todoRouter);
app.use("/users", usersRouter);
