// select the clear button to add an event listener to
var clearButton = document.querySelector("#clear");
// select the high scores ordered list to add the high scores to
var scoresOl = document.querySelector("#highscores");

// found a medium post to help me with saving and retrieving high scores to localStorage
// https://michael-karen.medium.com/how-to-save-high-scores-in-local-storage-7860baca9d68

// get the high scores that are saved in localStorage
var highScoresString = localStorage.getItem("highScores");
// convert the high scores string retreived from localStoarge and convert it to an array, if there are no scores return an empty array
var highScores = JSON.parse(highScoresString) ?? [];

// perform a for loop to populate the li entries in the ordered list of all the scores that were stored in local storage
for (var i = 0; i < highScores.length; i++) {
  // create the current li element to display each score
  var scoresLi = document.createElement("li");
  // add content from the high scores array to the li
  scoresLi.textContent = highScores[i].initials + " - " + highScores[i].score;
  // append the li so it will show in the html
  scoresOl.append(scoresLi);
}

// function to clear the local storage
function clearStorage() {
  // double check the user wants to clear storage
  var checkClear = confirm(
    "Are you sure you want to delete all the high scores?"
  );
  // if the user confirms to clear storage
  if (checkClear) {
    // go through each li and remove it
    for (var i = 0; i < highScores.length; i++) {
      var scoresLiRemove = document.querySelector("li");
      scoresOl.removeChild(scoresLiRemove);
    }
    // clear the saved high scores from localStorage
    localStorage.clear();
  }
}

// add event listener on the clear button, and run the clear storage function if the user clicks it
clearButton.addEventListener("click", clearStorage);
