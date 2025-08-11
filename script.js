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

function pomoTimer(){
var timer = document.querySelector(".pomo-timer h1");
var startBtn = document.querySelector(".pomo-timer .start-timer");
var pauseBtn = document.querySelector(".pomo-timer .pause-timer");
var resetBtn = document.querySelector(".pomo-timer .reset-timer");
var workSession = document.querySelector(".pomodoro-fullpage .session");

var isWorkSession = true;
let timerInterval = null;
let totalSeconds = 25*60;

function updateTime(){
  let minutes = Math.floor(totalSeconds/60);
  let seconds = totalSeconds%60;

  timer.innerHTML = `${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')}`;
}

function startTimer(){
  clearInterval(timerInterval);
  
  if(isWorkSession){
    
    if(totalSeconds<=0){
      totalSeconds = 25*60;
    }
    timerInterval = setInterval(()=>{
    if(totalSeconds>0){
      totalSeconds--;
    updateTime();
    }else{
      isWorkSession=false;
      clearInterval(timerInterval);
      timer.innerHTML = "05:00";
      workSession.innerHTML = "Take a Break";
      workSession.style.backgroundColor = "var(--tri5)";
    }
  },1);

  }
  else{
    
    if(totalSeconds<=0){
      totalSeconds = 5*60;
    }
    timerInterval = setInterval(()=>{
    if(totalSeconds>0){
      totalSeconds--;
    updateTime();
    }else{
      isWorkSession=true;
      clearInterval(timerInterval);
      timer.innerHTML = "25:00";
      workSession.innerHTML = "Work Session";
      workSession.style.backgroundColor = "var(--tri4)";
    }
  },10);
  }
}

function pauseTimer(){
  clearInterval(timerInterval);
}

function resetTimer(){
  if(workSession){
    totalSeconds = 25*60;
  }
  else{
    totalSeconds = 5*60;
  }
  updateTime();
  clearInterval(timerInterval);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
}

pomoTimer();

function weatherFunctionality() {
  let apiKey = "5974db989d42467188064023251108";
  let city = "hyderabad";

  var header1H1 = document.querySelector(".header1 h1");
  var header1H2 = document.querySelector(".header1 h2");
  var header1H4 = document.querySelector(".header1 h4");
  var header2 = document.querySelector(".header2");

  var date = new Date();

  async function fetchWeatherAPI() {
    var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
    var data = await response.json();

    header1H4.innerHTML = `<h4>${data.location.name}, (${data.location.region})</h4>`;
    header2.innerHTML = `
      <h2>${data.current.temp_c}°C</h2>
      <h4>${data.current.condition.text}</h4>
      <h3>Heat Index: ${data.current.heatindex_c}°C</h3>
      <h3>Humidity: ${data.current.humidity}%</h3>
      <h3>Wind: ${data.current.wind_kph} km/hr</h3>
    `;
  }

  fetchWeatherAPI();

  function getDateTime() {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date(); // Update date inside the function to get current time
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var day = date.getDate();
    var month = months[date.getMonth()];
    var year = date.getFullYear();
    var ampm = hours >= 12 ? "PM" : "AM";
    var displayHours = hours % 12 || 12;

    header1H2.innerHTML = `<h2>${day} ${month}, ${year}</h2>`;
    header1H1.innerHTML = `<h1>${days[date.getDay()]}, ${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}</h1>`;
  }

  setInterval(() => {
    getDateTime();
  }, 1000);
}

weatherFunctionality();

function changeTheme(){
var theme = document.querySelector(".theme");
var rootElement = document.documentElement;

var flag=0;
theme.addEventListener('click',()=>{
  if(flag ==0){
    rootElement.style.setProperty('--pri','#dfd0b8');
  rootElement.style.setProperty('--sec','#222831');
  rootElement.style.setProperty('--tri1','#948979');
  rootElement.style.setProperty('--tri2','#393e46');
  flag=1;
  }
  else{
    rootElement.style.setProperty('--pri','#f8f4e1');
  rootElement.style.setProperty('--sec','#381c0a');
  rootElement.style.setProperty('--tri1','#feba17');
  rootElement.style.setProperty('--tri2','#74512d');
  flag=0;
  }
})
}

changeTheme();