const todo = document.getElementById("todo");
const progress = document.getElementById("progress");
const done = document.getElementById("done");
const task = document.querySelectorAll(".taskes");
const addTaskBtn = document.getElementById("addTaskBtn");
const modalBg = document.querySelector(".bg");
const modal = document.querySelector(".modal");
const addTodoBtn = document.getElementById("addTodoBtn");

let count = document.querySelectorAll("#count");
let dragEle = null;
let colhover = [todo, progress, done];

function countItem() {
  colhover.forEach((e) => {
    const item = e.querySelectorAll(".taskes");
    let count = e.querySelector("#count");

    count.innerText = item.length;

    return item;
  });
}
countItem();

colhover.forEach((col) => {
  col.addEventListener("dragenter", (e) => {
    e.preventDefault();
    col.classList.add("hoverover");
  });
  col.addEventListener("dragleave", (e) => {
    e.preventDefault();
    col.classList.remove("hoverover");
  });
  col.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  col.addEventListener("drop", (e) => {
    col.appendChild(dragEle);
    col.classList.remove("hoverover");
    countItem();
  });
});

task.forEach((task) => {
  task.addEventListener("drag", (e) => {
    dragEle = task;
  });
});

addTaskBtn.addEventListener("click", (e) => {
  modal.classList.add("active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

addTodoBtn.addEventListener("click", () => {
  const input = document.getElementById("input").value;
  const textarea = document.getElementById("textarea").value;

  document.getElementById("input").value = "";
  document.getElementById("textarea").value = "";

  let div = document.createElement("div");
  div.classList.add("taskes");
  div.setAttribute("draggable", "true");
  div.innerHTML = `
   <div>
                        <h2>${input}</h2>
                        <p>
                            ${textarea}
                        </p>
                        <button class="btn taskbtn">Delete</button>
                    </div>`;
  todo.appendChild(div);
  modal.classList.remove("active");

  div.addEventListener("drag", (e) => {
    dragEle = div;
  });

  const delBtn = document.querySelectorAll(".taskbtn");
  delBtn.forEach((delBtn) => {
    delBtn.addEventListener("click", () => {
      let parent = delBtn.parentElement.parentElement;
      parent.remove();
      countItem();
    });
  });
  countItem();
});
