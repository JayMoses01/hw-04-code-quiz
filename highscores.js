//High score list variables
var scoreList = document.querySelector("#scoreList");
var clear = document.querySelector("#clearScores");
var goBack = document.querySelector("#goBack");

//Function to clear high score list when "Clear Highscores" button is clicked
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

//Gets high scores from local storage
var highScores = localStorage.getItem("highScores");
highScores = JSON.parse(highScores);

//If statement loops through high score list and creates a list item for each one
if (highScores !== null) {
    for (var i = 0; i < highScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = highScores[i].userInitials + ": " + highScores[i].score + " Correct";
        scoreList.appendChild(createLi);

    }
}

//When "Go Back" button is clicked, function takes user back to the start of the quiz
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});