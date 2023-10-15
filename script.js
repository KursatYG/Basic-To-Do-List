const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");
const remainingTasks = document.getElementById("remaining-tasks");
const completedTasks = document.getElementById("completed-tasks");
const totalTasks = document.getElementById("total-tasks");

const getTodosFromStorage = () => {
  const storage = JSON.parse(localStorage.getItem("todos"));
  return storage ? storage : [];
};

const getDonesFromStorage = () => {
  const storage = JSON.parse(localStorage.getItem("dones"));
  return storage ? storage : [];
};

const todos = getTodosFromStorage();
const dones = getDonesFromStorage();

const getTodosToPage = () => {
  todos.forEach((todo) => {
    createTodoItem(todo);
  });
};

const getDonesToPage=()=>{
  dones.forEach((done)=>{
    createDoneItem(done);
  })
}

const saveTodoStorage = (todo) => {
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  createTodoItem(todo);
};

todoInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) todoButton.click();
});

window.addEventListener("load", () => {
  getTodosToPage();
  getDonesToPage();
});

todoButton.addEventListener("click", () => {
  const input = todoInput.value;
  if (input) saveTodoStorage(input);
  todoInput.value = "";
});

const removeTodoFromStorage = (todo) => {
  const index = todos.indexOf(todo);
  if (index > -1) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

const removeDoneFromStorage = (done) => {
  const index = todos.indexOf(done);
  if (index > -1) {
    dones.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(dones));
  }
};

const removeTodo = (target) => {
  const todo = target.parentNode.childNodes[0].innerHTML;
  removeTodoFromStorage(todo);
  target.parentNode.classList.add('animate__animated','animate__rotateOutDownLeft','animate__faster')
  target.parentNode.addEventListener('animationend',()=>{
    target.parentNode.remove();
  })
};

const removeDone = (target) =>{
  const done = target.parentNode.childNodes[0].innerHTML;
  removeDoneFromStorage(done);
  target.parentNode.classList.add('animate__animated','animate__rotateOutDownLeft','animate__faster')
  target.parentNode.addEventListener('animationend',()=>{
    target.parentNode.remove();
  })
}

const checkTodo = (target) => {
  const todo = target.parentNode.childNodes[0].innerHTML;
  moveTodoToDone(todo, target);
};

const moveTodoToDone = (todo, target) => {
  removeTodoFromStorage(todo);
  dones.push(todo);
  localStorage.setItem("dones", JSON.stringify(dones));
  makeItDone(target);
};

const moveDonesToTodos = (done, target) => {
  removeDoneFromStorage();
  todos.push(done);
  localStorage.setItem("todos", JSON.stringify(todos));
  makeItTodo(target);
};

const makeItDone = (target) => {
  const done = target.parentNode.classList.add("done");
  target.parentNode.childNodes[2].setAttribute("onclick", "removeDone(this)");
  target.className = "";
  target.classList.add("fas", "fa-check-square");
  target.setAttribute("onclick", "uncheckDone(this)");
};

const makeItTodo = (target) => {
  const todo = target.parentNode.classList.remove("done");
  target.parentNode.childNodes[2].setAttribute("onclick", "removeTodo(this)");
  target.className = "";
  target.classList.add("fa-regular", "fa-square");
  target.setAttribute("onclick", "checkTodo(this)");
};

const uncheckDone = (target) => {
  const done = target.parentNode.childNodes[0].innerHTML;
  moveDonesToTodos(done, target);
};

const createTodoItem = (text) => {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");
  const todoItemLi = document.createElement("li");
  todoItemLi.innerHTML = text;
  const todoItemCheck = document.createElement("i");
  todoItemCheck.classList.add("fa-regular", "fa-square");
  todoItemCheck.setAttribute("onclick", "checkTodo(this)");
  const todoItemRemove = document.createElement("i");
  todoItemRemove.classList.add("fas", "fa-trash-alt");
  todoItemRemove.setAttribute("onclick", "removeTodo(this)");
  todoItem.appendChild(todoItemLi);
  todoItem.appendChild(todoItemCheck);
  todoItem.appendChild(todoItemRemove);
  todoList.appendChild(todoItem);
};

const createDoneItem = (text) => {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item",'done');
  const todoItemLi = document.createElement("li");
  todoItemLi.innerHTML = text;
  const todoItemCheck = document.createElement("i");
  todoItemCheck.classList.add("fas", "fa-check-square");
  todoItemCheck.setAttribute("onclick", "uncheckDone(this)");
  const todoItemRemove = document.createElement("i");
  todoItemRemove.classList.add("fas", "fa-trash-alt");
  todoItemRemove.setAttribute("onclick", "removeDone(this)");
  todoItem.appendChild(todoItemLi);
  todoItem.appendChild(todoItemCheck);
  todoItem.appendChild(todoItemRemove);
  todoList.appendChild(todoItem);
};
