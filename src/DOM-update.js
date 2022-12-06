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

export { displayToDo };
