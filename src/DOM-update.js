import {
  sortToDoByProject,
  addProjectToToDo,
  addToDoToList,
  deleteToDo,
  addToProjectList,
} from "./index";
import { createProject } from "./projects";
import { createToDo } from "./todos";

//build header

function displayHeader(priorities, projectsList, toDoList) {
  const header = document.createElement("div");
  header.id = "header";
  const logo = document.createElement("div");
  logo.id = "logo";
  logo.textContent = "ToDoodly";
  const btnContainer = document.createElement("div");
  const addToDoBtn = document.createElement("button");
  addToDoBtn.classList = "menu-button";
  addToDoBtn.textContent = "+ todo";
  addToDoBtn.addEventListener("click", () => {
    displayAddForm(priorities, projectsList, toDoList);
  });
  const addProjectBtn = document.createElement("button");
  addProjectBtn.classList = "menu-button";
  addProjectBtn.textContent = "+ project";
  addProjectBtn.addEventListener("click", () => {
    displayProjectForm(priorities, projectsList);
  });
  header.appendChild(logo);
  btnContainer.appendChild(addToDoBtn);
  btnContainer.appendChild(addProjectBtn);
  header.appendChild(btnContainer);
  return header;
}

//build main

function displayMain() {
  const main = document.createElement("div");
  main.id = "main";
  return main;
}

//display add todo form

function displayAddForm(priorities, projectsList, toDoList) {
  const main = document.querySelector("#content");
  const disableClick = document.createElement("div");
  disableClick.classList = "disable-outside-clicks";
  const form = document.createElement("div");
  const formTitle = document.createElement("h2");
  formTitle.textContent = "Add new ToDo";
  form.classList = "add-form";
  const titleInput = document.createElement("input");
  titleInput.classList = "form-inputs";
  titleInput.placeholder = "Task title";
  const descriptionInput = document.createElement("textarea");
  descriptionInput.classList = "form-inputs";
  descriptionInput.placeholder = "Description";
  descriptionInput.rows = 10;
  descriptionInput.wrap = "hard";
  const dateInput = document.createElement("input");
  dateInput.classList = "form-inputs";
  dateInput.type = "date";
  const priorityInput = document.createElement("select");
  priorityInput.classList = "form-inputs";
  priorities.forEach((element) => {
    const prioritiesListItem = document.createElement("option");
    prioritiesListItem.textContent = element;
    priorityInput.appendChild(prioritiesListItem);
  });
  const project = document.createElement("select");
  project.classList = "form-inputs";
  projectsList.forEach((element) => {
    const projectListItem = document.createElement("option");
    projectListItem.textContent = element.title;
    project.appendChild(projectListItem);
  });
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "CANCEL";
  cancelBtn.classList = "form-button";
  cancelBtn.addEventListener("click", () => {
    main.removeChild(disableClick);
  });
  const submit = document.createElement("button");
  submit.textContent = "CREATE";
  submit.classList = "form-button";
  submit.addEventListener("click", () => {
    addToDoToList(
      createToDo(
        titleInput.value,
        descriptionInput.value,
        dateInput.value,
        priorityInput.value,
        project.value
      )
    );
    sortToDoByProject(project.value);
    main.removeChild(disableClick);
  });
  form.appendChild(formTitle);
  form.appendChild(titleInput);
  form.appendChild(descriptionInput);
  form.appendChild(dateInput);
  form.appendChild(priorityInput);
  form.appendChild(project);
  form.appendChild(cancelBtn);
  form.appendChild(submit);
  disableClick.appendChild(form);
  main.appendChild(disableClick);
}

// display add project form

function displayProjectForm(priorities, projectsList) {
  const main = document.querySelector("#content");
  const disableClick = document.createElement("div");
  disableClick.classList = "disable-outside-clicks";
  const form = document.createElement("div");
  const formTitle = document.createElement("h2");
  formTitle.textContent = "Add new project";
  form.classList = "add-form";
  const titleInput = document.createElement("input");
  titleInput.classList = "form-inputs";
  titleInput.placeholder = "Project title";
  const descriptionInput = document.createElement("textarea");
  descriptionInput.classList = "form-inputs";
  descriptionInput.placeholder = "Description";
  descriptionInput.rows = 10;
  descriptionInput.wrap = "hard";
  const priorityInput = document.createElement("select");
  priorityInput.classList = "form-inputs";
  priorities.forEach((element) => {
    const prioritiesListItem = document.createElement("option");
    prioritiesListItem.textContent = element;
    priorityInput.appendChild(prioritiesListItem);
  });
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "CANCEL";
  cancelBtn.classList = "form-button";
  cancelBtn.addEventListener("click", () => {
    main.removeChild(disableClick);
  });
  const submit = document.createElement("button");
  submit.textContent = "CREATE";
  submit.classList = "form-button";
  submit.addEventListener("click", () => {
    addToProjectList(
      createProject(
        titleInput.value,
        descriptionInput.value,
        priorityInput.value
      )
    );
    updateProjectListDisplay(projectsList);
    main.removeChild(disableClick);
  });
  form.appendChild(formTitle);
  form.appendChild(titleInput);
  form.appendChild(descriptionInput);
  form.appendChild(priorityInput);
  form.appendChild(cancelBtn);
  form.appendChild(submit);
  disableClick.appendChild(form);
  main.appendChild(disableClick);
}

// update project list display

function updateProjectListDisplay(projectsList) {
  const main = document.getElementById("main");
  main.replaceChild(displayProjectList(projectsList), main.childNodes[0]);
}

//build footer

//display todo item

function displayToDo(toDoObj, projectsList) {
  const toDoItem = document.createElement("div");
  toDoItem.classList = "todo-item-container";
  toDoItem.id = toDoObj.title + Math.ceil(Math.random() * 10000);
  const title = document.createElement("h3");
  title.classList = "todo-item-title";
  title.textContent = toDoObj.title;
  const deleteBtn = document.createElement("button");
  deleteBtn.id = "delete-todo-btn";
  deleteBtn.textContent = "X";
  deleteBtn.addEventListener("click", () => {
    deleteToDo(toDoObj.title, toDoObj.project);
  });
  const dueDate = document.createElement("p");
  dueDate.classList = "todo-item-duedate";
  dueDate.textContent = toDoObj.dueDate;
  const expandBtn = document.createElement("button");
  expandBtn.textContent = "⌄";
  expandBtn.addEventListener("click", () => {
    expandToDoItem(toDoObj, projectsList, toDoItem.id);
    toDoItem.removeChild(expandBtn);
  });
  toDoItem.appendChild(title);
  toDoItem.appendChild(deleteBtn);
  toDoItem.appendChild(dueDate);
  toDoItem.appendChild(expandBtn);
  return toDoItem;
}

//expand todo item

function expandToDoItem(toDoObj, projectsList, id) {
  const toDoItem = document.getElementById(id);
  const description = document.createElement("p");
  description.classList = "todo-item-description";
  description.textContent = toDoObj.description;
  const priority = document.createElement("p");
  priority.classList = "todo-item-priority";
  priority.textContent = toDoObj.priority;
  const project = document.createElement("select");
  const title = toDoObj.title;

  projectsList.forEach((element) => {
    const projectListItem = document.createElement("option");
    projectListItem.textContent = element.title;
    if (element.title === toDoObj.project) {
      projectListItem.defaultSelected = true;
    }
    project.addEventListener("change", (event) => {
      const selection = event.target.value;
      addProjectToToDo(title, selection);
    });
    project.appendChild(projectListItem);
  });
  const expandBtn = document.createElement("button");
  expandBtn.textContent = "⌄";
  expandBtn.addEventListener("click", () => {
    expandToDoItem(toDoObj, projectsList, toDoItem.id);
    toDoItem.removeChild(expandBtn);
  });
  const minimiseBtn = document.createElement("button");
  minimiseBtn.textContent = "^";
  minimiseBtn.addEventListener("click", () => {
    const main = document.getElementById("todo-list-container");
    main.replaceChild(displayToDo(toDoObj, projectsList), toDoItem);
  });
  toDoItem.appendChild(description);
  toDoItem.appendChild(priority);
  toDoItem.appendChild(project);
  toDoItem.appendChild(minimiseBtn);
}

//minimise todo item

function minimiseToDoItem() {}

//display project buttons

function displayProject(projectObj) {
  const projectItem = document.createElement("button");
  projectItem.classList = "project-item-button";
  projectItem.textContent = projectObj.title;
  const selectedProject = projectObj.title;
  projectItem.addEventListener("click", () => {
    sortToDoByProject(selectedProject);
    updateProjectInfo(projectObj);
  });
  return projectItem;
}

//display project info

function displayProjectInfo(projectObj) {
  const projectItem = document.createElement("div");
  projectItem.classList = "project-item-info-container";
  const title = document.createElement("h3");
  title.classList = "project-item-title";
  title.textContent = projectObj.title;
  const description = document.createElement("p");
  description.classList = "project-item-description";
  description.textContent = projectObj.description;
  projectItem.appendChild(title);
  projectItem.appendChild(description);
  return projectItem;
}

//update project info

function updateProjectInfo(projectObj) {
  const main = document.getElementById("main");
  const newInfo = displayProjectInfo(projectObj);
  main.replaceChild(newInfo, main.childNodes[1]);
}

//display projects list (array of projects)

function displayProjectList(list) {
  const projectsDisplay = document.createElement("div");
  list.forEach((element) => {
    let displayedItem = displayProject(element);
    projectsDisplay.appendChild(displayedItem);
  });
  return projectsDisplay;
}

//display todo list (array of lists)

function displayToDoList(toDoList, projectList) {
  const toDoListDisplay = document.createElement("div");
  toDoListDisplay.id = "todo-list-container";
  toDoList.forEach((element) => {
    let displayedItem = displayToDo(element, projectList);
    toDoListDisplay.appendChild(displayedItem);
  });
  return toDoListDisplay;
}

//remove all DOM children

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export {
  displayHeader,
  displayMain,
  displayToDo,
  displayToDoList,
  displayProject,
  displayProjectList,
  removeAllChildNodes,
  displayProjectInfo,
};
