import "./style.css";
import { formatDistance, subDays } from "date-fns";
import { createToDo } from "./todos";
import {
  displayToDo,
  displayToDoList,
  displayHeader,
  displayMain,
} from "./DOM-update";
import { createProject } from "./projects";

const content = document.querySelector("#content");

// store projects list

const projectsList = [];

// store todo list

const todoMainList = [];

// add new todos to todo list

function addToDoToList(newTodo) {
  todoMainList.push(newTodo);
}

// add new projects to project list

function addToProjectList(newProject) {
  projectsList.push(newProject);
}

//create test todo items

addToDoToList(createToDo("Task 1", "This is a test task", "1/1/2023", "High"));
addToDoToList(
  createToDo("Task 2", "Test task 2 is here", "2/2/2025", "Medium")
);
addToDoToList(createToDo("Task 3", "Test task 3 is here", "20/01/2024", "Low"));

//create test project items

addToProjectList(createProject("All tasks", "No priority"));
addToProjectList(createProject("Project 2", "High"));

//append content to page

const main = displayMain();

const toDoListDisplay = displayToDoList(todoMainList);

content.appendChild(displayHeader());
main.appendChild(toDoListDisplay);
content.appendChild(main);
