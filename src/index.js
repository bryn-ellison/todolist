import "./style.css";
import { formatDistance, subDays } from "date-fns";
import { createToDo } from "./create-todo";
import { displayToDo } from "./DOM-update";

const content = document.querySelector("#content");

content.appendChild(
  displayToDo(createToDo("Task 1", "This is a test task", "1/1/2023", "High"))
);
