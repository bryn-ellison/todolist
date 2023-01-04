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
  displayProjectInfo,
  updateProjectInfo,
} from "./DOM-update";
import { createProject } from "./projects";

const content = document.querySelector("#content");

// store projects list

const projectsList = [];

// store todo list

let todoMainList = [];

// priorities array

const priorities = ["High", "Medium", "Low"];

// add new todos to todo list

function addToDoToList(newTodo) {
  todoMainList.push(newTodo);
}

// delete todo from list

function deleteToDo(todoTitle, todoProject) {
  todoMainList = todoMainList.filter((todo) => todo.title != todoTitle);
  sortToDoByProject(todoProject);
  const projectInfo = projectsList.find(
    (element) => element.title === todoProject
  );
  updateProjectInfo(projectInfo);
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

//create test todo items

addToDoToList(
  createToDo(
    "Task 1",
    "This is a test task",
    new Date(2023, 1, 11),
    "High",
    "All tasks"
  )
);
addToDoToList(
  createToDo(
    "Task 2",
    "Test task 2 is here",
    new Date(2023, 2, 22),
    "Medium",
    "All tasks"
  )
);
addToDoToList(
  createToDo(
    "Task 3",
    "Test task 3 is here",
    new Date(2023, 6, 1),
    "Low",
    "Project 2"
  )
);

//create test project items

const allTasks = createProject(
  "All tasks",
  "All tasks in any project are displayed here",
  "No priority"
);

addToProjectList(allTasks);

addToProjectList(createProject("Project 2", "Pro 2 desc", "High"));

//append content to page

const main = displayMain();
const projectListDisplay = displayProjectList(projectsList);
const loadProjectInfo = displayProjectInfo(allTasks);
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
};
