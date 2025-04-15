const { error, log } = require("console");
const fs = require("fs");
const { json } = require("stream/consumers");

let [, , command] = process.argv;

if (command == "add") {
  let [, , , title] = process.argv;
  fs.readFile("todolist.json", "utf-8", (error, data) => {
    let todo = JSON.parse(data);
    todo.push({ id: todo.length + 1, title, status: "to-do" });
    fs.writeFile("todolist.json", JSON.stringify(todo), () => {
      console.log("Task added successfully");
    });
  });
}

if (command == "list") {
  let [, , , option] = process.argv;
  if (option == "-s") {
    let [, , , , status] = process.argv;
    fs.readFile("todolist.json", "utf-8", (error, data) => {
      if (data) {
        let todo = JSON.parse(data);
        let newTodo = todo.filter((item) => item.status == status);
        console.log(newTodo);
      }
    });
  } else {
    fs.readFile("todolist.json", "utf-8", (error, data) => {
      if (data) {
        let todo = JSON.parse(data);
        console.log(todo);
      } else {
        console.log(error);
      }
    });
  }
}

if (command == "delete") {
  let [, , , id] = process.argv;
  fs.readFile("todolist.json", "utf-8", (error, data) => {
    let todo = JSON.parse(data);
    let index = todo.findIndex((item) => item.id == id);
    todo.splice(index, 1);
    fs.writeFile("todolist.json", JSON.stringify(todo), () => {
      console.log("Task deleted");
    });
  });
}

if (command == "edit") {
  let [, , , id, title] = process.argv;
  fs.readFile("todolist.json", "utf-8", (error, data) => {
    let todo = JSON.parse(data);
    let index = todo.findIndex((item) => item.id == id);
    let status = todo[index].status;
    todo.splice(index, 1, { id, title, status });
    fs.writeFile("todolist.json", JSON.stringify(todo), () => {
      console.log("Task updated");
    });
  });
}
