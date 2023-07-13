var timer = document.querySelector(".time");
var startButton = document.querySelector("#start-button");
var highScoresButton = document.getElementById("high-scores-button");
var goBackButton = document.getElementById("go-back-button");
var clearScoresButton = document.getElementById("clear-scores-button");
var questionContainer = document.querySelector("#question-container");
var highScoresContainer = document.querySelector("section.high-scores-container");
var highScoresList = document.querySelector("#high-scores-list");
let secondsLeft = 60;
let score = 0;
var question = document.querySelector(".question");
var answer1 = document.querySelector(".a");
var answer2 = document.querySelector(".b");
var answer3 = document.querySelector(".c");
var answer4 = document.querySelector(".d");
let quizQuestions = [
    {
        prompt: "What is not a CSS selector?",
        a: ".class",
        b: "#Id",
        c: "head",
        d: "010101",
        correct: "d",
    },
    {
        prompt: "Which of these is not a data type",
        a: "weight",
        b: "boolean",
        c: "number",
        d: "string",
        correct: "a",
    },
    {
        prompt: "If var x = '143,545' what would console.log(typeOf(x)) print in the console?",
        a: "wtf",
        b: "string",
        c: "null",
        d: "143,545",
        correct: "b",
    },
    {
        prompt: "Is jQuery outdated?",
        a: "Totally",
        b: "nope",
        c: "Whats jQuery?",
        d: "jQuery is still important to comprehend because it is implemented in a large proportion of webpages",
        correct: "d",
    },
    {
        prompt: "Are you impressed by this beginner's quiz?",
        a: "The code is ugly, but it works I guess",
        b: "This quiz makes my eyes bleed",
        c: "It's the best quiz I have ever seen",
        d: "meh",
        correct: "a",
    },
];

let currentIndex = 0;
let scoreSaved = false;

function startQuiz() {
    startQuizTimer();
    displayQuestion();
    startButton.style = "display: none";
    console.log('Quiz has begun');
}

function startQuizTimer() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function displayQuestion() {
    let currentQuestion = quizQuestions[currentIndex];
    question.textContent = currentQuestion.prompt;
    answer1.textContent = "A) " + currentQuestion.a;
    answer2.textContent = "B) " + currentQuestion.b;
    answer3.textContent = "C) " + currentQuestion.c;
    answer4.textContent = "D) " + currentQuestion.d;
}

function checkAnswer(answer) {
    let currentQuestion = quizQuestions[currentIndex];
    if (answer === currentQuestion.correct) {
        score++;
        console.log("correct");
    } else {
        console.log("incorrect")
    }
    nextQuestion();
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}


function endQuiz() {
  timer.textContent = "";
  secondsLeft = 1;
  console.log("Quiz ended");
  if (!scoreSaved) { 
    saveScore();
    scoreSaved = true; 
  showHighScores();
  goBackButton.style.display = "block"
}
}

function saveScore() {
  let name = prompt("Enter your full name:");

  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push({ name: name, score: score });
  localStorage.setItem("scores", JSON.stringify(scores));
}

function showHighScores() {
    highScoresList.innerHTML = ""; 
  
    var scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.sort(function(a, b) {
      return b.score - a.score; 
    });
  
    scores.forEach(function(scoreObj) {
      var li = document.createElement("li");
      li.textContent = scoreObj.name + " - " + scoreObj.score;
      highScoresList.appendChild(li);
    });
  
    if (questionContainer) {
      questionContainer.style.display = "none"; 
    }
    highScoresContainer.style.display = "block"; 
  }
  
function goBack() {
  highScoresContainer.style.display = "none"; 
  questionContainer.style.display = "block"; 
  goBackButton.style.display = "none";
  resetQuiz(); 
}

function clearScores() {
  localStorage.removeItem("scores");
  highScoresList.innerHTML = ""; 
}

function resetQuiz() {
  currentIndex = 0;
  score = 0;
  scoreSaved = false;
}

startButton.addEventListener("click", startQuiz);
highScoresButton.addEventListener("click", showHighScores);
goBackButton.addEventListener("click", goBack);
clearScoresButton.addEventListener("click", clearScores);

answer1.addEventListener("click", function () {
  checkAnswer("a");
});

answer2.addEventListener("click", function () {
  checkAnswer("b");
});

answer3.addEventListener("click", function () {
  checkAnswer("c");
});

answer4.addEventListener("click", function () {
  checkAnswer("d");
});