// Assigning all global variables

var checkHighScores = document.getElementById("scores");
var startQuizButton = document.getElementById("btn-start");
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
    timerCountdown = setInterval(timer, 1000);
    mainContainerEl.classList.add("hidden");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    quizQuestionsContainerEl.classList.remove("hidden");

    timer();
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    displayQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Displaying the quiz questions
function displayQuestion(question) {
    quizQuestionsEl.innerText = question.question
    question.answers.forEach(answer =>{
      var button = document.createElement("button")
      button.innerText = answer.text
      button.classList.add("btn")
      if (answer.correct) {
          button.dataset.right = answer.right
      }
      button.addEventListener("click", selectAnswer)
      selectionButtonEl.appendChild(button)
    })
};

//Defining Reset function
function resetState() {
    nextButton.classList.add("hidden")
    selectionCheckEl.classList.add("hidden")
    while (selectionButtonEl.firstChild) {
        selectionButtonEl.removeChild(selectionButtonEl.firstChild)
    }
};

//Defining selectAnswer function
function selectAnswer(x) {
    var selectedButton = x.target;
    var right = selectedButton.dataset.right;
    selectionCheckEl.classList.remove("hidden")

    if (right) {
        selectionCheckEl.innerHTML = "You got it Right!";
    }
    else{
        selectionCheckEl.innerHTML = "You got it Wrong!";
        if (remainingTime <= 10) {
            remainingTime = 0;
        }
        else {
            remainingTime -=10;
        }
    }

    Array.from(selectionButtonEl.children).forEach(button => {
        setStatusClass(button, button.dataset.right)
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hidden")
        selectionCheckEl.classList.remove("hidden")
    }
    else {
        startQuizButton.classList.remove("hidden")
        saveScore();
    }
};

function setStatusClass(element, right){
    clearStatusClass(element)
    if (right) {
        element.classList.add("right");
    } else {
        element.classList.add("wrong");
    }
};

function clearStatusClass(element) {
    element.classList.remove("right");
    element.classList.remove("wrong");
};


function saveScore() {
    clearInterval(timerCountdown);
    timerCountdownEl.textContent = "Time: " + remainingTime;
    setTimeout(() => {
        quizQuestionsContainerEl.classList.add("hidden");
        document.getElementById("scores-container").classList.remove("hidden");
        document.getElementById("your-score").textContent = "Final score: " + remainingTime;
        
    }, 1000)
};

var loadScores = function () {

    if(!savedScores) {
        return false;
    }


    savedScores = JSON.parse(savedScores);
    var initials = document.querySelector("#initials-field").value;

    var newScore = {
        score: remainingTime,
        initials: initials
    }
    savedScores.push(newScore);
    console.log(savedScores)

    savedScores.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.score
    })
};

//Displaying high scores
function displayHighScores(initials) {
    document.getElementById("high-scores").classList.remove("hidden")
    document.getElementById("scores-container").classList.add("hidden");
    mainContainerEl.classList.add("hidden");
    quizQuestionsContainerEl.classList.add("hidden");
    if (typeof initials == "string") {
        var score = {
            initials, remainingTime
        }
        scores.push(score);
    }

    var topScoreEl = document.getElementById("high-score");
    topScoreEl.innerHTML = "";

    for (i=0; i < scores.length; i++) {
        var sec1 = document.createElement("section");
        sec1.setAttribute("class", "name-sec");
        sec1.innerText = scores[i].initials;
        var sec2 = document.createElement("section");
        sec2.setAttribute("class", "score-sec");
        sec2.innerText = scores[i].remainingTime;

        topScoreEl.appendChild(sec1);
        topScoreEl.appendChild(sec2);
    }
    localStorage.setItem("high-scores", JSON.stringify(scores));
};

//Display High Scores link
checkHighScores.addEventListener("click", displayHighScores);

submitButton.addEventListener("click", function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initials-field").value;

    if (initials.length != 2) {
        alert("You must input only two characters!");
        return;
    }

    displayHighScores(initials);
});

// Reloading the page
tryAgainButton.addEventListener("click", function () {
    window.location.reload();
});

// Clearing Local storage
clearButton.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("high-score").innerHTML = "";
});


