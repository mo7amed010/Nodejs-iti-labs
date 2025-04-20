const todoModel = require("../models/todo");

exports.getAll = async (req, res) => {
  try {
    if (req.query.limit) {
      let { limit, skip } = req.query;
      const todos = await todoModel.find().skip(skip).limit(limit);
      if (todos) {
        return res.json({ status: "success", data: todos });
      } else {
        return res.status(404).json({ message: "No todos found" });
      }
    } else {
      let todos = await todoModel.find();
      if (todos) {
        return res.json({ status: "success", data: todos });
      } else {
        return res.status(404).json({ message: "No todos found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Error gitting todos" });
  }
};

exports.addTodo = async (req, res) => {
  try {
    let newTodo = req.body;
    let todo = await todoModel.create(newTodo);
    res.status(201).json({ status: "success", data: todo });
  } catch (err) {
    return res.status(500).json({ message: "Error adding todo" });
  }
};

exports.editTodo = async (req, res) => {
  try {
    let id = req.params.id;
    let updatedTodo = req.body;
    let todo = await todoModel.findByIdAndUpdate(id, updatedTodo);
    if (todo) {
      let updatedTodo = await todoModel.findById(id);
      return res.json({ status: "success", data: updatedTodo });
    } else {
      return res.status(404).json({ message: "Todo not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error editing todo" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    let id = req.params.id;
    let todo = await todoModel.findByIdAndDelete(id);
    if (todo) {
      return res.json({
        status: "success",
        message: "todo Deleted successfully",
      });
    } else {
      return res.status(404).json({ status: "fail", message: "No todo found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error deleting todo" });
  }
};
