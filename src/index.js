import "./style.css";
import {
  displayToDoList,
  displayHeader,
  displayMain,
  displayProjectList,
  displayProjectInfo,
  updateProjectInfo,
} from "./DOM-update";

const content = document.querySelector("#content");

// store projects list

//localStorage.clear();

let projectsList = [
  {
    description: "All tasks in any project are displayed here",
    priority: "No priority",
    title: "All tasks",
  },
];

if (localStorage.getItem("projectStorage")) {
  projectsList = JSON.parse(localStorage.getItem("projectStorage"));
}

// store todo list

let todoMainList = [];

if (localStorage.getItem("toDoStorage")) {
  todoMainList = JSON.parse(localStorage.getItem("toDoStorage"));
}

// serve main todo list

function getMainToDoList() {
  return todoMainList;
}

// priorities array

const priorities = ["High", "Medium", "Low"];

// add new todos to todo list

function addToDoToList(newTodo) {
  todoMainList.push(newTodo);
  localStorage.setItem("toDoStorage", JSON.stringify(todoMainList));
}

// delete todo from list

function deleteToDo(todoTitle, todoProject) {
  todoMainList = todoMainList.filter((todo) => todo.title != todoTitle);
  sortToDoByProject(todoProject);
  const projectInfo = projectsList.find(
    (element) => element.title === todoProject
  );
  localStorage.setItem("toDoStorage", JSON.stringify(todoMainList));
  updateProjectInfo(projectInfo);
}

// add new projects to project list

function addToProjectList(newProject) {
  projectsList.push(newProject);
  localStorage.setItem("projectStorage", JSON.stringify(projectsList));
}

// add project to todo item

function addProjectToToDo(toDoTitle, selection) {
  const found = todoMainList.find((todo) => todo.title === toDoTitle);
  found.project = selection;
}

// edit todo item

function editToDo(
  originalTitle,
  title,
  description,
  dueDate,
  priority,
  project
) {
  for (let i = 0; i < todoMainList.length; i++) {
    if (todoMainList[i].title === originalTitle) {
      todoMainList[i].title = title;
      todoMainList[i].description = description;
      todoMainList[i].dueDate = dueDate;
      todoMainList[i].priority = priority;
      todoMainList[i].project = project;
    }
  }
  localStorage.setItem("toDoStorage", JSON.stringify(todoMainList));
}

//sort todos by project

function sortToDoByProject(project) {
  if (project === "All tasks") {
    main.replaceChild(
      displayToDoList(todoMainList, projectsList),
      main.childNodes[2]
    );
  } else {
    const filteredList = todoMainList.filter(
      (todo) => todo.project === project
    );
    main.replaceChild(
      displayToDoList(filteredList, projectsList),
      main.childNodes[2]
    );
  }
}

//append content to page

const main = displayMain();
const projectListDisplay = displayProjectList(projectsList);
const loadProjectInfo = displayProjectInfo(projectsList[0]);
const toDoListDisplay = displayToDoList(todoMainList, projectsList);

content.appendChild(displayHeader(priorities, projectsList, todoMainList));
main.appendChild(projectListDisplay);
main.appendChild(loadProjectInfo);
main.appendChild(toDoListDisplay);
content.appendChild(main);

export {
  sortToDoByProject,
  addProjectToToDo,
  addToDoToList,
  deleteToDo,
  addToProjectList,
  editToDo,
  getMainToDoList,
};
