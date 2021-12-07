// setting the array for questions,
let index = 0
const questions = [
  {
    title: "How do you subtract 1 from a number in Javascipt?",
    choices: [
      "(-1)", "--", ".subtract", "minus.(1)"
    ],
    answer: "--"
  },
  {
    title: "How do you write a conditional statement for executing some statements only if \"i\" is equal to 5?",
    choices: [
      "if i==5 then", "if i=5 then", "if i=5", "if (i==5)"
    ],
    answer: "if (i==5)"
  },
  {
    title: "What is it called when you change the HTML element using JavaScript?",
    choices: [
      "innerHTML", "changeHTML", "becomeHTML", "embraceHTML"
    ],
    answer: "innerHTML"
  }
]

// declaring variables //
// setting a timer function //
const startingTime = 1;
let time = startingTime * 59;
const timerEl = document.getElementById('timer');
let timer;


function updateTimer() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;
  
  timerEl.innerHTML = `${seconds}`;
  time--;
}

//variables for start quiz
let startBtn = document.getElementById("start");
startBtn.addEventListener("click", startQuiz)
let questionDiv = document.querySelector(".questions")

//remove display function
function removeDisplay() {
  const x = document.getElementById("welcome");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// Start quiz function
function startQuiz() {
  removeDisplay()
  renderQuestion()
  timer = setInterval(updateTimer, 1000);
}


//end quiz and score form
let scoreForm = document.querySelector(".scoreForm")
let finalScore = document.getElementById("finalScore")
function endQuiz() {
  timerEl.classList.add("hidden")
  clearInterval(timer);
  questionDiv.style.display = "none";
  scoreForm.classList.remove ("hidden");
  finalScore.innerHTML = `<h2>Final Score</h2> <hr> <h5>${score}/${questions.length}</h5>`
}
let saveBtn = document.getElementById("saveScore").addEventListener("click", scoreSaver)
let initials = document.getElementById("initials")

let ul = document.getElementById("scoreList")
//Save Score
function scoreSaver () {
  var scores = []
  if (localStorage.getItem("Highscores")) {
    scores = JSON.parse(localStorage.getItem("Highscores"))
  }
  var object = {
    initials: initials.value,
    score: score,
  }
  scores.push(object)
  localStorage.setItem("Highscores", JSON.stringify(scores));
  for (var i = 0; i < scores.length; i++) {
    var li = document.createElement("li");
    li.innerText = `${scores[i].initials} : ${scores[i].score}`
    ul.appendChild(li)
  }
  document.getElementById("info").classList.add("hidden")
}

//display questions and answers and check for answer 
function renderQuestion() {
  if (index == questions.length) {
    endQuiz ()
    return; 
  }
  console.log(questions[index])
  questionDiv.innerHTML = ""
  let h4 = document.createElement("h4");
  h4.innerText = questions[index].title;
  questionDiv.appendChild(h4)
  console.log(questions[index].choices)
  for (let i = 0; i < 4; i++) {
    let button = document.createElement("button");
    button.innerText = questions[index].choices[i];
    button.value = questions[index].choices[i];
    button.addEventListener("click", checkAnswer)
    questionDiv.appendChild(button)
  }
}

let score = 0;
//check answer function
function checkAnswer(event) {
  console.log(event.target.value)
  if (event.target.value == questions[index].answer){
    console.log("correct");
    score++;
    index++;
    renderQuestion();
  }
  else {
    console.log("incorrect");
    index++;
    renderQuestion();
    time -= 5;
  }
}

