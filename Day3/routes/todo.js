const express = require("express");
const router = express.Router();
const {
  getAll,
  addTodo,
  editTodo,
  deleteTodo,
} = require("../controllers/todo");
const { auth } = require("../middlewares/auth");

router.use(auth);

router.get("/", getAll);
router.post("/", addTodo);
router.patch("/:id", editTodo);
router.delete("/:id", deleteTodo);
module.exports = router;
