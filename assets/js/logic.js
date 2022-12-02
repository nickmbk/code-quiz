// use a variable to select the start button
var startButton = document.querySelector("start");
// select the time span that will display the time
var timeSpan = document.querySelector("time");
// selects the start div that shows the start of the game, including the instructions
var startDiv = document.querySelector(".start");
// selects the questions div
var questionsDiv = document.querySelector("#questions");
// selects the question title, where the question will be displayed
var questionTitle = document.querySelector("#question-title");
// selects the choices div where the multiple choice answers will be shown
var choicesDiv = document.querySelector("#choices");

// sets how long the timer will be
var timer = 30;
// determines if the end of the quiz was reached
var quizFinished = false;;
// stores the players score at the end of the quiz
var score = 0;

// declare the variable now to be used in the setTime function, need to be global to clearInterval in the init function otherwise it won't clear
var timerInterval;

// function to set every back to the beginning if the player starts the quiz again
function init() {
    timer = 30;
    score = 0;
    quizFinished = false;
    timeSpan.textContent = 30;
    clearInterval(timerInterval);
}

// sets and starts the timer
function setTime() {
    timerInterval = setInterval(function() {
        console.log(timerInterval);
        // reduces the timer variable by 1 every second
        timer--;
        // displays the time remaining in the time span element in the html
        timeSpan.textContent = timer;
    
        // stops the timer if the timer reachers 0 or the quizFinished variable becomes true (will be set to true at the end of the quiz)
        if (timer === 0 || quizFinished) {
            clearInterval(timerInterval);
        }
        // the 1000 below tells setInterval to run every 1000 milliseconds (1 second)
    }, 1000);
}
  
// hides the start div and displays the question div ready to start showing the questions and then moves on to the displayQuestions function
function showQuestions() {
    startDiv.classList.add("hide");
    questionsDiv.classList.remove("hide");
    displayQuestions();
}

// start the game, begins when start button is clicked
function startGame() {
    init();
    setTime();
    showQuestions();
}

// listens out for when the start button is clicked to then run the startGame function
startButton.addEventListener("click", startGame);