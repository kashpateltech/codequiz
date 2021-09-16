// Assigning all global variables

var checkHighScores = document.getElementById("scores");
var startQuizButton = document.getElementById("btnStart");
var nextButton = document.getElementById("btn-next");
var timerCountdownEl = document.getElementById("countdown-timer");
var quizQuestionsContainerEl = document.getElementById("quiz-questions-container");
var mainContainerEl = document.getElementById("main-container");
var quizQuestionsEl = document.getElementById("quiz-questions");
var selectionButtonEl = document.getElementById("selection-btn");
var selectionCheckEl = document.getElementById("selection-check");
var submitButton = document.getElementById("btn-submit");
var clearButton = document.getElementById("btn-clear");
var tryAgainButton = document.getElementById("btn-try-again");
//var initials = document.getElementById("player-name");
//var scoreField = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("high-scores")) || [];
var timerCountdown;
var remainingTime = 120;

// stumbled across this during my research to shuffle questions. source: https://forum.freecodecamp.org/t/simple-javascript-quiz-problem/291032

var shuffledQuestions, currentQuestionIndex;

// Allows "start" button to initiate first question and allows "next" button to prompt
startQuizButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
});

// Countdown Timer
function timer() {
    timerCountdownEl.textContent = "Time: " + remainingTime + " seconds";
    if (remainingTime <=0) {
        saveScore();
    }
    else {
        remainingTime--;
    }
}

// Starting the Quiz

function startQuiz() {
    timerCountdown = setInterval(timeTick, 1000);
    mainContainerEl.classList.add("hidden");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    quizQuestionsContainerEl.classList.remove("hidden");

    timer();
    setNextQuestion();
}

// Displaying the quiz questions
function displayQuestion(question) {
    
}
