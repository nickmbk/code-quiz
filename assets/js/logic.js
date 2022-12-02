// use a variable to select the start button
var startButton = document.getElementById("start");
// select the time span that will display the time
var timeSpan = document.getElementById("time");

// sets how long the timer will be
var timer = 30;
// determines if the end of the quiz was reached
var quizFinished = false;;

// sets and starts the timer
function setTime() {
    var timerInterval = setInterval(function() {
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

// start the game, begins when start button is clicked
function startGame() {
    setTime();
}

// listens out for when the start button is clicked to then run the startGame function
startButton.addEventListener("click", startGame);