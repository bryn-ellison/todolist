import "./style.css";
import { formatDistance, subDays } from "date-fns";
import { createToDo } from "./todos";
import {
  displayToDo,
  displayToDoList,
  displayHeader,
  displayMain,
  displayProject,
  displayProjectList,
  removeAllChildNodes,
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

// add project to todo item

function addProjectToToDo(toDoTitle, selection) {
  const found = todoMainList.find((todo) => todo.title === toDoTitle);
  found.project = selection;
}

//sort todos by project

function sortToDoByProject(project) {
  //removeAllChildNodes(toDoListDisplay);
  if (project === "All tasks") {
    main.replaceChild(
      displayToDoList(todoMainList, projectsList),
      main.childNodes[1]
    );
  } else {
    const filteredList = todoMainList.filter(
      (todo) => todo.project === project
    );
    main.replaceChild(
      displayToDoList(filteredList, projectsList),
      main.childNodes[1]
    );
  }
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
const projectListDisplay = displayProjectList(projectsList);
const toDoListDisplay = displayToDoList(todoMainList, projectsList);

content.appendChild(displayHeader());
main.appendChild(projectListDisplay);
main.appendChild(toDoListDisplay);
content.appendChild(main);

export { sortToDoByProject, addProjectToToDo };
