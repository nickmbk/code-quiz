// QUERY SELECTORS FOR ELEMENTS ON THE PAGE
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
// select a sound that plays when a correct answer is clicked
var correctSound = document.querySelector("audio[data-sound='correct']");
// select a sound that plays when an incorrect answer is clicked
var incorrectSound = document.querySelector("audio[data-sound='incorrect']");
// select the feedback div to show the user if they got the answer right or not
var feedbackDiv = document.querySelector("#feedback");

// sets how long the timer will be
var timer = 75;
// determines if the end of the quiz was reached
var quizFinished = false;
// stores the players score at the end of the quiz
var score = 0;
// keep track of amount of questions answered
var questionCount = 0;
// holds whether the answer to the current question is correct or not
var correctAnswer = false;

// declare the variable now to be used in the setTime function, need to be global to clearInterval in the init function otherwise it won't clear
var timerInterval;

// function to set everything back to the beginning if the player starts the quiz again
function init() {
  timer = 75;
  score = 0;
  quizFinished = false;
  timeSpan.textContent = 75;
  questionCount = 0;
  // this needs to be done here otherwise the interval runs multiple times, leading to a faster time
  clearInterval(timerInterval);
}

// sets and starts the timer
function setTime() {
  timerInterval = setInterval(function () {
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
    // if the timer reaches zero finish the quiz
    if (timer === 0) {
      finishQuiz();
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
  // create an ordered list
  var answersOl = document.createElement("ol");
  // and append to the html
  choicesDiv.append(answersOl);
  // create list items
  for (var i = 0; i < 4; i++) {
    var answersButton = document.createElement("button");
    var answersLi = document.createElement("li");
    // set each list item with a data attribute so we can later select the answers
    answersLi.setAttribute("data-answer", i);
    // set the class of each list item as the same number of the answer
    answersLi.classList.add(i);
    answersOl.append(answersButton);
    answersButton.append(answersLi);
  }
}

function displayQuestions() {
  questionTitle.textContent = questions[questionCount].question;
  for (var i = 0; i < 4; i++) {
    // select the the class numbered the same as the answers index number, found stack overflow article suggesting use CSS.escape
    //https://stackoverflow.com/questions/37081721/use-variables-in-document-queryselector
    var listItemButton = document.querySelector("." + CSS.escape(i));
    listItemButton.textContent = questions[questionCount].answers[i];
  }
}

// function that checks the answer the user selects to the answer of the questions
function answerQuestions(event) {
  var element = event.target;
  // checks if the user has clicked on the correct part of the page, not just anywhere
  if (element.matches("li")) {
    // gets the number stored in the data-answer attribute, this allows the code to compare against the correct answer
    var clickedAnswer = element.getAttribute("data-answer");
    // check the users clicked answer against the stored correct answer
    if (parseInt(clickedAnswer) !== questions[questionCount].correctAnswer) {
      // if they are not the same (the answer the user gave is wrong) remove 10 seconds from the clock
      timer -= 10;
      // correct answer variable is set to false because the answer was incorrect
      correctAnswer = false;
      // runs the feedback function to give the player feedback on there answer
      feedback();
    } else if (
      // if the answer is correct
      parseInt(clickedAnswer) === questions[questionCount].correctAnswer
    ) {
      // set the variable correctAnswer to true
      correctAnswer = true;
      // run the feedback function;
      feedback();
    }
    // run the clearQA function to clear the question and answers from this question, ready for the next question to be populated
    clearQA();
    // add 1 to questionCount to keep track of how many questions have been answered
    questionCount++;
    // if the questionCount variable matches the amount of questions in the questions array...
    if (questionCount === questions.length) {
      // ... run the finishQuiz function...
      finishQuiz();
      // ... if it doesn't match...
    } else if (questionCount !== questions.length) {
      // ... run the displayQuestions function to display the next question
      displayQuestions();
    }
  }
}

// function to clear the questions and answers, ready for the next question and answers
function clearQA() {
  // set the text content of where the question is displayed to empty
  questionTitle.textContent = "";
  // clear the text content of the four answer li's
  for (var i = 0; i < 4; i++) {
    // select the the class numbered the same as the answers index number, found stack overflow article suggesting use CSS.escape
    //https://stackoverflow.com/questions/37081721/use-variables-in-document-queryselector
    var listItem = document.querySelector("." + CSS.escape(i));
    // clear the text content of the li
    listItem.textContent = "";
  }
}

// function to give feedback to the user
function feedback() {
  // if the user answered correctly
  if (correctAnswer) {
    // play the correct answer sound
    correctSound.play();
    // tell the useron screen that their answer was correct
    feedbackDiv.textContent = "Correct!";
    // otherwise if the answer was incorrect
  } else if (!correctAnswer) {
    // play the incorrect answer sound
    incorrectSound.play();
    // tell the user the answer was wrong
    feedbackDiv.textContent = "Wrong!";
  }
  // remove the hide class from the feedback div, so the user can see it
  feedbackDiv.classList.remove("hide");
  // use a timer to display the feedback for 2 seconds
  var feedbackTimer = 2;
  var feedbackInterval = setInterval(function () {
    feedbackTimer--;
    //when the timer reaches 0...
    if (feedbackTimer === 0) {
      // ... clear the timer...
      clearInterval(feedbackInterval);
      // ... and hise the feedback div again
      feedbackDiv.classList.add("hide");
    }
  }, 1000);
}

// this function finishes the quiz
function finishQuiz() {
  // quizFinished variable trigger the countdown timer for the quiz to stop
  quizFinished = true;
  // the number left from the time becomes the users score
  score = timer;
  // hide the questions div
  questionsDiv.classList.add("hide");
  // and show the end screen div
  endScreenDiv.classList.remove("hide");
  // display the users score on screen
  finalScoreSpan.textContent = score;
}

function saveScore() {
  // retrieve the users initials enterd in the text box and convert them to upper case
  var initials = initialsTextBox.value.toUpperCase();
  // if the users initials aren't two to three characters alert them, they will need to reenter their initials
  if (initials.length < 2 || initials.length > 3) {
    alert("Please enter your initials");
    // if the users initials are two or three characters, proceed to save the score to the high scorees
  } else {
    // retrieve any previously saved scores from localStorage
    var highScoresString = localStorage.getItem("highScores");
    // because localStorage saves in strings, we need to use JSON and parse to convert it to an array of objects
    var highScores = JSON.parse(highScoresString) ?? [];
    // create a variable newScore to store the users initials and score as an object
    var newScore = { initials, score };
    // add the newScore to the highScores array
    highScores.push(newScore);
    // sort the high scores array so the scores are stored from highest to lowest
    highScores.sort((a, b) => b.score - a.score);
    // save the array of objects (highScores) to local storage, but converting it to a string
    localStorage.setItem("highScores", JSON.stringify(highScores));
    // go to the highscores page
    window.location.href = "./highscores.html";
  }
}

// start the game, begins when start button is clicked
function startGame() {
  // runs the init function to make sure everything is set to default values
  init();
  // runs the function that sets and starts the timer
  setTime();
  // runs the function that hides the start screen and displays the questions and answers
  showQuestions();
  // this function creates the places for the questions and answers to go
  setupQuestions();
  // this populates the spaces created in the previous function, to show the questions and answers
  displayQuestions();
}

// listens out for when the start button is clicked to then run the startGame function
startButton.addEventListener("click", startGame);

// when the user clicks an answer the answerQuestions function runs
choicesDiv.addEventListener("click", answerQuestions);

// runs the saveScores function when the user clicks the submit button to save their score
submitButton.addEventListener("click", saveScore);
