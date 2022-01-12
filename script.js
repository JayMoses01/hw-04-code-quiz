//Create variables for all necessary HTML elements
var timerDiv = document.getElementById("time"); //Timer div
var container = document.getElementById("container"); //DIV encompassing the div that contains Coding Quiz Challenge and start page contents (D0)
var questionBox = document.getElementById("question-box"); //Div containing Coding Quiz Challenge and start page contents (D1)
var optionsUl = document.getElementById("optionsUl"); //Unordered list HTML element
var startBtn = document.getElementById("start-btn"); //Start Quiz button


//Create other variables
var score = 0; //User's starting score
var currentQuestion = 0; //User's current question in the quiz
var secondsRemaining = 75 + 1; //User's remaining time (in seconds)
var holdInterval = 0;
var penalty = 10; //10-second penalty for an incorrect answer
var buildUl = document.createElement("ul"); //Create unordered list element


//Variable for storing the quiz questions, answers, and the correct answer
var questions = [
    {
        question: "The condition in an if/else statement is enclosed within ________ .",
        options: ["1. Quotes", "2. Curly brackets", "3. Parentheses", "4. Square brackets"],
        correctAnswer: "3. Parentheses",
    },
    {
        question: "Commonly used data types DO NOT include:",
        options: ["1. Strings", "2. Alerts", "3. Booleans", "4. Numbers"],
        correctAnswer: "2. Alerts",
    },
    {
        question: "Arrays in JavaScript can be used to store ________ .",
        options: ["1. Numbers and strings", "2. Other arrays", "3. Booleans", "4. All of the above"],
        correctAnswer: "4. All of the above",
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        options: ["1. Quotes","2. Commas", "3. Curly brackets", "4. Parentheses"],
        correctAnswer: "1. Quotes",
    },
]


//Upon clicking the "Start Quiz" button, functions execute to start/buid the timer and wrap-up the quiz if no time remaining.
startBtn.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsRemaining--;
            timerDiv.textContent = "Time: " + secondsRemaining;

            if (secondsRemaining <= 0) {
                clearInterval(holdInterval);
                wrapUp();
                timerDiv.textContent = "Time = " + secondsRemaining;
            }
        }, 1000);
    }
    createQuiz(currentQuestion);
});

//Functions to erase current questions/options from the page and then add each question and respective options set--starting from the beginning
function createQuiz(currentQuestion) {
    questionBox.innerHTML = "";
    buildUl.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[currentQuestion].question;
        var userOptions = questions[currentQuestion].options;
        questionBox.textContent = userQuestion;
    }
    
    userOptions.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionBox.appendChild(buildUl);
        buildUl.appendChild(listItem);
        listItem.addEventListener("click", (evaluateAnswer));
    })
}
//Function to evaluate user's answer with the correct answer. If the selection option matches, score increases. If incorrect answer, time remaining decreases (score stays the same).
function evaluateAnswer(event) {
    var element = event.target;

    if (element.matches("li")) {
        var buildDiv = document.createElement("div");
        buildDiv.setAttribute("id", "buildDiv");

        if (element.textContent == questions[currentQuestion].correctAnswer) {
            score++;
            buildDiv.textContent = "Correct! The answer is:  " + questions[currentQuestion].correctAnswer;
            
        } else {
            secondsRemaining = secondsRemaining - penalty;
            buildDiv.textContent = "Incorrect! The correct answer is:  " + questions[currentQuestion].correctAnswer;
        }

    }
    //User is moved to the next question. Wraps-up quiz if all questions have been responded to.
    currentQuestion++;

    if (currentQuestion >= questions.length) {
        wrapUp();
        buildDiv.textContent = "End of the quiz!" + " " + "You answered  " + score + "/" + questions.length + " correctly.";
    } else {
        createQuiz(currentQuestion);
    }
    questionBox.appendChild(buildDiv);

}
//Functions to wrap-up the quiz: remove questions/options and add final page details.
function wrapUp() {
    questionBox.innerHTML = "";
    timerDiv.innerHTML = "";

    var buildH1 = document.createElement("h1");
    buildH1.setAttribute("id", "buildH1");
    buildH1.textContent = "All Done!"
    questionBox.appendChild(buildH1);

    var buildP1 = document.createElement("p");
    buildP1.setAttribute("id", "buildP1");
    questionBox.appendChild(buildP1);

    //Creates final score message
    if (secondsRemaining >= 0) {
        var buildP2 = document.createElement("p");
        clearInterval(holdInterval);
        buildP1.textContent = "Your final score is: " + score + "/" + questions.length + " " + "(" + ((score/questions.length) * 100) + "%" + ")";
        questionBox.appendChild(buildP2);
    }

    //Builds the label for the user to enter their initials
    var buildLabel = document.createElement("label");
    buildLabel.setAttribute("id", "buildLabel");
    buildLabel.textContent = "Enter your initials: ";
    questionBox.appendChild(buildLabel);

    //Builds the textbox so the user can input their initials
    var buildInput = document.createElement("input");
    buildInput.setAttribute("type", "text");
    buildInput.setAttribute("id", "userInitials");
    buildInput.textContent = "";
    questionBox.appendChild(buildInput);

    //Builds the "Submit" button
    var buildSubmit = document.createElement("button");
    buildSubmit.setAttribute("type", "submit");
    buildSubmit.setAttribute("id", "Submit");
    buildSubmit.textContent = "Submit";
    questionBox.appendChild(buildSubmit);

    //Upon clicking submit, user's initials and score are recorded to local storage. The user is taken to the "High Scores" page.
    buildSubmit.addEventListener("click", function () {
        var userInitials = buildInput.value;

        if (userInitials === null) {
            alert("Please enter your initials");
        } else {
            var userScore = {
                userInitials: userInitials,
                score: score
            }
            console.log(userScore);
            var highScores = localStorage.getItem("highScores");
            if (highScores === null) {
                highScores = [];
            } else {
                highScores = JSON.parse(highScores);
            }
            highScores.push(userScore);
            var addScore = JSON.stringify(highScores);
            localStorage.setItem("highScores", addScore);
            window.location.replace("./highscores.html");
        }
    });

}