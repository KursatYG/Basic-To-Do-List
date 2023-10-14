let addButton = document.getElementById("todoButton");
let todoList = document.getElementById("todoList");
let addInput = document.getElementById("todoInput");
let clearButton= document.getElementById("todoClear");

addButton.addEventListener("click", function () {
  let li = document.createElement("li");
  li.classList.add("todo-list");
  if (addInput.value != "") {
    todoList.appendChild(li);
    li.innerHTML= addInput.value;
  }
  addInput.value = "";

  li.addEventListener("click", function(){
    li.style.textDecoration='line-through'
  });

  li.addEventListener("dblclick", function(){
    todoList.removeChild(li)
  })
});

