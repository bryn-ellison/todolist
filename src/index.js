import "./style.css";
import { formatDistance, subDays } from "date-fns";
import { createToDo } from "./todos";
import { displayToDo } from "./DOM-update";
import { createProject } from "./projects";
import { displayToDoList } from "./DOM-update";

const content = document.querySelector("#content");

// store projects list

const projectsList = [];

// store todo list

const todoMainList = [];

// add new todos to todo list

function addToDoToList(newTodo) {
  todoMainList.push(newTodo);
}

addToDoToList(createToDo("Task 1", "This is a test task", "1/1/2023", "High"));
addToDoToList(
  createToDo("Task 2", "Test task 2 is here", "2/2/2025", "Medium")
);

content.appendChild(displayToDoList(todoMainList));
