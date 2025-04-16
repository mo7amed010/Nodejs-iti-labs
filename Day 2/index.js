const fs = require("fs");
const express = require("express");

const app = express();

app.listen(3000);

app.use(express.json());

app.get("/todo", (req, res) => {
  // bonus
  if (req.query) {
    let { limit, skip } = req.query;
    fs.readFile("todolist.json", "utf-8", (err, data) => {
      let todos = JSON.parse(data);
      let showTodos = todos.slice(skip, skip + limit);
      res.send(JSON.stringify(showTodos));
    });
  } else {
    fs.readFile("todolist.json", "utf-8", (err, data) => {
      console.log(data);
      res.send(data);
    });
  }
});

app.get("/todo/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("todolist.json", "utf-8", (err, data) => {
    const todoList = JSON.parse(data);
    let todo = todoList.find((item) => item.id == id);
    if (todo) {
      return res.send(todo);
    }
  });
});

app.post("/todo", (req, res) => {
  const { title } = req.body;
  fs.readFile("todolist.json", "utf-8", (err, data) => {
    let todos = [];

    if (!err && data) {
      todos = JSON.parse(data);
    }
    let newTodo = {
      id: todos.length + 1,
      title,
      status: "new",
    };
    todos.push(newTodo);
    fs.writeFile("todolist.json", JSON.stringify(todos), () => {
      console.log("Recod added");
      res.json({ message: "Record added" });
    });
  });
});

app.delete("/todo/:id", (req, res) => {
  let id = req.params.id;
  fs.readFile("todolist.json", "utf-8", (err, data) => {
    let todos = JSON.parse(data);
    let newTodos = todos.filter((item) => item.id != id);
    fs.writeFile("todolist.json", JSON.stringify(newTodos), () => {
      res.send("Record deleted succefuly");
    });
  });
});

app.patch("/todo/:id", (req, res) => {
  let id = req.params.id;
  let { title, status } = req.body;
  fs.readFile("todolist.json", "utf-8", (err, data) => {
    let todos = JSON.parse(data);
    let todoIndex = todos.findIndex((item) => item.id == id);
    if (todoIndex != -1) {
      todos[todoIndex].title = title;
      todos[todoIndex].status = status;
      fs.writeFile("todolist.json", JSON.stringify(todos), () => {
        res.send("Record updated succefuly");
      });
    }
  });
});
