function openFeatures() {
  var allElems = document.querySelectorAll(".elem");
  var fullElemPage = document.querySelectorAll(".fullElem");
  var fullElemPageBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
    });
  });
}

openFeatures();

let form = document.querySelector(".add-task form");
let taskInput = document.querySelector(".add-task form input");
let taskDetailsInput = document.querySelector(".add-task form textarea");
let taskCheckbox = document.querySelector(".add-task form #check");

let currentTask = [
  {
    task: "Mandir Jao",
    details: "Hanuman ji wale",
    imp: true,
  },
  {
    task: "Recording karo",
    details: "Cohort ke liye",
    imp: true,
  },
  {
    task: "Lunch",
    details: "Diet",
    imp: false,
  },
];

function renderTask() {
  var allTask = document.querySelector(".all-task");

  var sum = "";

  currentTask.forEach(function (elem) {
    sum += `<div class="task">
              <h5>${elem.task} <span class=${elem.imp}>imp</span> </h5>
              <button>Mark as completed</button>
            </div>`;
    allTask.innerHTML = sum;
  });
}

renderTask();

form.addEventListener("submit", function (e) {
  e.preventDefault();
  currentTask.push({
    task: taskInput.value,
    details: taskDetailsInput.value,
    imp: taskCheckbox.checked,
  });
  taskInput.value = "";
  taskDetailsInput.value = "";
  taskCheckbox.checked = false;
  renderTask();
});
