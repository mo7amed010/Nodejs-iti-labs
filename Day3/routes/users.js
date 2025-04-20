const express = require("express");
const router = express.Router();
const {
  getAll,
  addUser,
  editUser,
  deleteUser,
  getAllTodos,
  login,
} = require("../controllers/users");

router.get("/", getAll);
router.post("/", addUser);
router.post("/login", login);
router.patch("/:id", editUser);
router.delete("/:id", deleteUser);
router.get("/:id/todos", getAllTodos);

module.exports = router;
