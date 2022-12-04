// select the clear button to add an event listener to
var clearButton = document.querySelector("#clear");
// select the high scores ordered list to add the high scores to
var scoresOl = document.querySelector("#highscores");

// get the high scores that are saved in localStorage
var highScoresString = localStorage.getItem("highScores");
// convert the high scores string retreived from localStoarge and convert it to an array, if there are no scores return an empty array
var highScores = JSON.parse(highScoresString) ?? [];

// perform a for loop to populate the li entries in the ordered list of all the scores that were stored in local storage
for (var i = 0; i < highScores.length; i++) {
  var scoresLi = document.createElement("li");
  scoresLi.textContent = highScores[i].initials + " - " + highScores[i].score;
  scoresOl.append(scoresLi);
}

function clearStorage() {
  var checkClear = confirm(
    "Are you sure you want to delete all the high scores?"
  );
  if (checkClear) {
    for (var i = 0; i < highScores.length; i++) {
      var scoresLiRemove = document.querySelector("li");
      scoresOl.removeChild(scoresLiRemove);
    }
    localStorage.clear();
  }
}

clearButton.addEventListener("click", clearStorage);
