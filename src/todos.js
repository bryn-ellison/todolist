//create todo item - factory

const createToDo = (title, description, dueDate, priority, project) => {
  return { title, description, dueDate, priority, project };
};

export { createToDo };
