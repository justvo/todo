const toDoList = document.querySelector(".item-of-to-do");
const doneList = document.querySelector(".item-of-done");
const taskInput = document.querySelector(".input-container input");
const addButton = document.querySelector(".input-container button");

const itemCountDisplay = document.querySelector('.count-item');

const itemsToDo = JSON.parse(localStorage.getItem('itemsToDo')) || [];;
const itemsDone = JSON.parse(localStorage.getItem('itemsDone')) || [];;
main();

function main(){
  updateToDoLists();
}

function updateItemCount(){
  const itemCount = itemsToDo.length;
  itemCountDisplay.textContent = `Count of tasks: ${itemCount}`;
}

toDoList.addEventListener("dragover", (e) => {
  e.preventDefault();
});


toDoList.addEventListener("drop", (e) => {
  e.preventDefault();
  const index = e.dataTransfer.getData("text/plain");
  const sourceList = e.dataTransfer.getData("sourceList");
  const taskText = itemsDone[index];

  if ("toDo" != sourceList){
    
    itemsDone.splice(index, 1);
    itemsToDo.push(taskText);
    updateToDoLists();
}

});



doneList.addEventListener("dragover", (e) => {
  e.preventDefault();
});


doneList.addEventListener("drop", (e) => {
  e.preventDefault();
  const index = e.dataTransfer.getData("text/plain");
  const sourceList = e.dataTransfer.getData("sourceList");
  const taskText = itemsToDo[index];
  // console.log(sourceList );
   if ("toDo" == sourceList){
    itemsToDo.splice(index, 1);
    itemsDone.push(taskText);
    updateToDoLists();
}
});

addButton.addEventListener("click", () => {
  const newTaskText = taskInput.value.trim();
  if (newTaskText !== "") {
    itemsToDo.push(newTaskText);
    updateToDoLists();
    taskInput.value = "";
  }
});

taskInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const newTaskText = taskInput.value.trim();
    if (newTaskText !== "") {
      itemsToDo.push(newTaskText);
      updateToDoLists();
      taskInput.value = "";
    }
  }
});

function updateToDoLists() {
  toDoList.innerHTML = "";
  itemsToDo.forEach((element, index) => {
    const li = createTaskElement(element, index, true);
    toDoList.appendChild(li);
  });
  
  doneList.innerHTML = "";
  itemsDone.forEach((element, index) => {
    const li = createTaskElement(element, index, false);
    doneList.appendChild(li);
  });

  localStorage.setItem('itemsToDo', JSON.stringify(itemsToDo));
  localStorage.setItem('itemsDone', JSON.stringify(itemsDone));
}

function createTaskElement(text, index, isToDo) {
  const li = document.createElement("li");
  li.className =isToDo? "to-do-list-item":"done-list-item";
  li.draggable = true;
//////svg//////
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("class", "bi bi-chevron-expand");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute("d", "M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z");
    path.setAttribute("fill", " #6dd8de");

    svg.appendChild(path);
  //////////////
    li.appendChild(svg);

  li.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", index);
    e.dataTransfer.setData("sourceList", isToDo ? "toDo" : "done");
  });
  
  const span = document.createElement("span");
  span.textContent = text;
  
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", () => {
    if (isToDo) {
      itemsToDo.splice(index, 1);
      
    } else {
      itemsDone.splice(index, 1);
      
    }
    updateToDoLists();
  });
  
  li.appendChild(span);
  li.appendChild(deleteButton);
  
  updateItemCount()
  return li;
}