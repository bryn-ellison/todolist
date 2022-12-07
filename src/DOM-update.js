//build header

function displayHeader() {
  const header = document.createElement("div");
  header.id = "header";
  const logo = document.createElement("div");
  logo.id = "logo";
  logo.textContent = "ToDoodly";
  header.appendChild(logo);
  return header;
}

//build main

function displayMain() {
  const main = document.createElement("div");
  main.id = "main";
  return main;
}

//build footer

//display todo item

function displayToDo(toDoObj) {
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
  toDoItem.appendChild(title);
  toDoItem.appendChild(description);
  toDoItem.appendChild(dueDate);
  toDoItem.appendChild(priority);
  return toDoItem;
}

//display project

function displayProject(projectObj) {
  const projectItem = document.createElement("div");
  projectItem.classList = "project-item-container";
  const title = document.createElement("h3");
  title.classList = "project-item-title";
  title.textContent = projectObj.title;
  const description = document.createElement("p");
  description.classList = "project-item-description";
  description.textContent = projectObj.description;
  toDoItem.appendChild(title);
  toDoItem.appendChild(description);
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

function displayToDoList(list) {
  const toDoListDisplay = document.createElement("div");
  list.forEach((element) => {
    let displayedItem = displayToDo(element);
    toDoListDisplay.appendChild(displayedItem);
  });
  return toDoListDisplay;
}

export {
  displayHeader,
  displayMain,
  displayToDo,
  displayToDoList,
  displayProject,
  displayProjectList,
};
