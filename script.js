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

function todoList() {
  let form = document.querySelector(".add-task form");
  let taskInput = document.querySelector(".add-task form input");
  let taskDetailsInput = document.querySelector(".add-task form textarea");
  let taskCheckbox = document.querySelector(".add-task form #check");

  let currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log(currentTask);
  }

  function renderTask() {
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    var allTask = document.querySelector(".all-task");

    var sum = "";

    currentTask.forEach(function (elem, idx) {
      sum += `<div class="task">
              <h5>${elem.task} <span class=${elem.imp}>imp</span> </h5>
              <button id=${idx}>Mark as completed</button>
            </div>`;
    });
    allTask.innerHTML = sum;

    var markCompletedBtn = document.querySelectorAll(".task button");

    markCompletedBtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
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
    renderTask();

    taskInput.value = "";
    taskDetailsInput.value = "";
    taskCheckbox.checked = false;
  });
}

todoList();

function dailyPlanner() {
  var hours = Array.from({ length: 18 }, function (elem, idx) {
    return `${6 + idx}:00 - ${7 + idx}:00`;
  });

  var wholeDaySum = ``;

  var dayPlanner = document.querySelector(".day-planner");

  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  hours.forEach(function (elem, idx) {
    var savedData = dayPlanData[idx] || "";
    wholeDaySum += `<div class="day-planner-time">
                <p>${elem}</p>
                <input id=${idx} type="text" placeholder="..." value="${savedData}">
            </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

dailyPlanner();

function motivationalQuotes() {
  var motivationQuoteContent = document.querySelector(".motivation-2 h1");
  var motivationAuthor = document.querySelector(".motivation-3 h2");

  async function getQuote() {
    let response = await fetch("https://dummyjson.com/quotes/random");
    let data = await response.json();

    motivationQuoteContent.innerHTML = data.quote;
    motivationAuthor.innerHTML = `- ${data.author}`;
  }

  getQuote();
}

motivationalQuotes();
