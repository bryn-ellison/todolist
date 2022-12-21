import { sortToDoByProject, addProjectToToDo, addToDoToList } from "./index";
import { createToDo } from "./todos";

//build header

function displayHeader(priorities, projectsList, toDoList) {
  const header = document.createElement("div");
  header.id = "header";
  const logo = document.createElement("div");
  logo.id = "logo";
  logo.textContent = "ToDoodly";
  const addBtn = document.createElement("button");
  addBtn.id = "add-button";
  addBtn.textContent = "+ add todo";
  addBtn.addEventListener("click", () => {
    displayAddForm(priorities, projectsList, toDoList);
  });
  header.appendChild(logo);
  header.appendChild(addBtn);
  return header;
}

//build main

function displayMain() {
  const main = document.createElement("div");
  main.id = "main";
  return main;
}

//display add form

function displayAddForm(priorities, projectsList, toDoList) {
  const main = document.querySelector("#content");
  const form = document.createElement("div");
  const formTitle = document.createElement("h2");
  formTitle.textContent = "Add new ToDo";
  form.id = "add-todo-form";
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
  const submit = document.createElement("button");
  submit.textContent = "CREATE";
  submit.id = "submit-button";
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
    main.removeChild(form);
  });
  form.appendChild(formTitle);
  form.appendChild(titleInput);
  form.appendChild(descriptionInput);
  form.appendChild(dateInput);
  form.appendChild(priorityInput);
  form.appendChild(project);
  form.appendChild(submit);
  main.appendChild(form);
}

//build footer

//display todo item

function displayToDo(toDoObj, projectsList) {
  const toDoItem = document.createElement("div");
  toDoItem.classList = "todo-item-container";
  const title = document.createElement("h3");
  title.classList = "todo-item-title";
  title.textContent = toDoObj.title;
  const description = document.createElement("p");
  description.classList = "todo-item-description";
  description.textContent = toDoObj.description;
  const dueDate = document.createElement("p");
  dueDate.classList = "todo-item-duedate";
  dueDate.textContent = toDoObj.dueDate;
  const priority = document.createElement("p");
  priority.classList = "todo-item-priority";
  priority.textContent = toDoObj.priority;
  const project = document.createElement("select");
  projectsList.forEach((element) => {
    const projectListItem = document.createElement("option");
    projectListItem.textContent = element.title;
    if (element.title === toDoObj.project) {
      projectListItem.defaultSelected = true;
    }
    project.addEventListener("change", (event) => {
      const selection = event.target.value;
      addProjectToToDo(title.textContent, selection);
    });
    project.appendChild(projectListItem);
  });
  toDoItem.appendChild(title);
  toDoItem.appendChild(description);
  toDoItem.appendChild(dueDate);
  toDoItem.appendChild(priority);
  toDoItem.appendChild(project);
  return toDoItem;
}

//display project buttons

function displayProject(projectObj) {
  const projectItem = document.createElement("button");
  projectItem.classList = "project-item-button";
  projectItem.textContent = projectObj.title;
  const selectedProject = projectObj.title;
  projectItem.addEventListener("click", () => {
    sortToDoByProject(selectedProject);
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
};
