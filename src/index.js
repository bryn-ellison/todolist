import "./style.css";

const content = document.querySelector("#content");

const testing = document.createElement("p");
testing.textContent = "HELLO";
testing.classList = "hello";

content.appendChild(testing);
