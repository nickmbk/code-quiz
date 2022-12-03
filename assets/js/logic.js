// use a variable to select the start button
var startButton = document.querySelector("#start");
// select the time span that will display the time
var timeSpan = document.querySelector("#time");
// selects the start div that shows the start of the game, including the instructions
var startDiv = document.querySelector(".start");
// selects the questions div
var questionsDiv = document.querySelector("#questions");
// selects the question title, where the question will be displayed
var questionTitle = document.querySelector("#question-title");
// selects the choices div where the multiple choice answers will be shown
var choicesDiv = document.querySelector("#choices");
// selects the end screen div for when the quiz is finished
var endScreenDiv = document.querySelector("#end-screen");
// selects the final score span to show the users final score
var finalScoreSpan = document.querySelector("#final-score");
// selects the inititals text box for the user to enter their initials to save their score
var initialsTextBox = document.querySelector("#initials");
// selects the submit button for the user submitting scores
var submitButton = document.querySelector("#submit");


// sets how long the timer will be
var timer = 30;
// determines if the end of the quiz was reached
var quizFinished = false;;
// stores the players score at the end of the quiz
var score = 0;
// keep track of amount of questions answered
var questionCount = 0;

// declare the variable now to be used in the setTime function, need to be global to clearInterval in the init function otherwise it won't clear
var timerInterval;

// function to set every back to the beginning if the player starts the quiz again
function init() {
    timer = 30;
    score = 0;
    quizFinished = false;
    timeSpan.textContent = 30;
    questionCount = 0;
    clearInterval(timerInterval);
}

// sets and starts the timer
function setTime() {
    timerInterval = setInterval(function() {
        // reduces the timer variable by 1 every second
        timer--;
        // displays the time remaining in the time span element in the html
        timeSpan.textContent = timer;
        // if the timer goes below zero, set it to zero and display it as zero on the page
        if (timer < 0) {
            timer = 0;
            timeSpan.textContent = timer;
        }
        // stops the timer if the timer reachers 0 or the quizFinished variable becomes true (will be set to true at the end of the quiz)
        if (timer <= 0 || quizFinished) {
            clearInterval(timerInterval);
        }
        // the 1000 below tells setInterval to run every 1000 milliseconds (1 second)
    }, 1000);
}
  
// hides the start div and displays the question div ready to start showing the questions
function showQuestions() {
    startDiv.classList.add("hide");
    questionsDiv.classList.remove("hide");
}

function setupQuestions() {
    // dynamically create an ordered list
    var answersOl = document.createElement("ol");
    // and append to the html
    choicesDiv.append(answersOl);
    // create list items
    for (var i = 0; i < 4; i++) {
        var answersLi = document.createElement("li");
        // set each list item with a data attribute so we can later select the answers
        answersLi.setAttribute("data-answer", i);
        // set the class of each list item as the same number of the answer
        answersLi.setAttribute("class", i);
        answersOl.append(answersLi);
    }
}

function displayQuestions() {
    questionTitle.textContent = questions[questionCount].question;
    for (var i = 0; i < 4; i++) {
        // select the the class numbered the same as the answers index number, found stack overflow article suggesting use CSS.escape
        //https://stackoverflow.com/questions/37081721/use-variables-in-document-queryselector
        var listItem = document.querySelector("." + CSS.escape(i));
        listItem.textContent = questions[questionCount].answers[i];
    }
    answerQuestions();
}

function answerQuestions() {
    // while (questionCount < questions.length) {
        choicesDiv.addEventListener("click", function(event) {
            var element = event.target;
            if (element.matches("li")) {
                var clickedAnswer = element.getAttribute("data-answer");
                if (parseInt(clickedAnswer) === questions[questionCount].correctAnswer) {
                    clearQA();
                    questionCount++;
                    if (questionCount <= questions.length - 1) {
                        displayQuestions();
                    } else {
                        finishQuiz();
                    }
                } else {
                    timer -= 10;
                }
            }
        })
    }
// }
    
function clearQA() {
    questionTitle.textContent = "";
        for (var i = 0; i < 4; i++) {
            var listItem = document.querySelector("." + CSS.escape(i));
            listItem.textContent = "";
        }
}

function finishQuiz() {
    quizFinished = true;
    score = timer;
    questionsDiv.classList.add("hide");
    endScreenDiv.classList.remove("hide");
    finalScoreSpan.textContent = score;
}

// start the game, begins when start button is clicked
function startGame() {
    init();
    setTime();
    showQuestions();
    setupQuestions();
    displayQuestions();
}

// listens out for when the start button is clicked to then run the startGame function
startButton.addEventListener("click", startGame);