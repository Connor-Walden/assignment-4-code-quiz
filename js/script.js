
// References to all important elements in the document.
var card = document.querySelector("#question-card");
var cardTitle = document.querySelector("#card-title");
var cardSubtitle = document.querySelector("#card-subtitle");
var cardQuestion = document.querySelector("#card-question");
var cardAns1 = document.querySelector("#card-ans-1");
var cardAns2 = document.querySelector("#card-ans-2");
var cardAns3 = document.querySelector("#card-ans-3");
var cardAns4 = document.querySelector("#card-ans-4");
var buttons = document.querySelector("#buttons");
var modalText = document.querySelector("#usrInitialsField");
var modalSub = document.querySelector("#usrInitialsSubmit");
var timerEl = document.querySelector("#timerEl");
var vlbButton = document.querySelector("#vlbButton");

// 0 - Intro, 1 - Q1, 2 - Q2, 3 - Q3, 4 - Q4, 5 - Q5, 6 - RESULTS
var state = 0;

// Boolean to track if the program is currently switching cards
var isSwitching = false;

// Trackers for how many the user got right
var correctAnswers = 0;
var numQuestions = 5;
var log = [];

// Current keeps track of what question we are up to
var current = "intro";

// Timer for quiz, interval for ticking the timer down
var timer = 60;
var interval;

// Time in milliseconds to wait after answer
var waitTime = 1000;

// Use this to track if the user finished the quiz within the time allowed
var DNF = false;

// This is used to track whether user skipped directly to leaderboards, or if they completed quiz
var STL = false;

// Questions object to store all important data for the quiz.
var questions = {
  "intro": {
    "title": "Code Quiz",
    "subtitle": "Are you ready?",
    "question":
      "Are you ready to start the code quiz? For every answer just click one of the multiple choice answers to reply!",
    "answer1": "No, I'm all good :(",
    "answer2": "Yes, bring it on!",
    "answer3": "disabled",
    "answer4": "disabled",
  },
  "one": {
    "title": "Code Quiz",
    "subtitle": "Question 1",
    "question":
      "What is the HTML tag under which one can write the javascript code?",
    "answer1": "<javascript>",
    "answer2": "<scripted>",
    "answer3": "<script>",
    "answer4": "<js>",
  },
  "two": {
    "title": "Code Quiz",
    "subtitle": "Question 2",
    "question": 
      "Which of the following is the correct syntax to display \"Assignment 4\" in an alert box using javascript?",
    "answer1": "alertbox(\"Assignment 4\");",
    "answer2": "msg(\"Assignment 4\");",
    "answer3": "msgbox(\"Assignment 4\");",
    "answer4": "alert(\"Assignment 4\");"
  },
  "three": {
    "title": "Code Quiz",
    "subtitle": "Question 3",
    "question": "The external javascript file must contain the <script> tag. True or False?",
    "answer1": "True",
    "answer2": "False",
    "answer3": "disabled",
    "answer4": "disabled"
  },
  "four": {
    "title": "Code Quiz",
    "subtitle": "Question 4",
    "question": "Predict the output of the following line of javascript code:\n8 + \"8\" = ?",
    "answer1": "88",
    "answer2": "Compilation error",
    "answer3": "16",
    "answer4": "Runtime error"
  },
  "five": {
    "title": "Code Quiz",
    "subtitle": "Question 5",
    "question": "Which of the following is not a reserved word in javascript?",
    "answer1": "interface",
    "answer2": "throws",
    "answer3": "program",
    "answer4": "short"
  },
  "results": {
    "title": "Code Quiz",
    "subtitle": "Results",
    "question": "Your score: " + correctAnswers + " / " + numQuestions,
    "log": []
  }
};

// Check if log exists in localStorage and if so, set our data to equal the localStorage data
if(localStorage.getItem("log"))
  questions.results.log = JSON.parse(localStorage.getItem("log"));

// Sets up all the elements to display the user's results at the end of the quiz
function setupResults() {
  // Make sure to clear interval so the timer doesn't continue to tick
  clearInterval(interval);

  cardAns1.textContent = "Submit";

  cardAns2.parentElement.style.display = "none";
  cardAns3.parentElement.style.display = "none";
  cardAns4.parentElement.style.display = "none";

  cardAns1.setAttribute("data-bs-toggle", "modal"); 
  cardAns1.setAttribute("data-bs-target", "#modal1");

  cardTitle.textContent = "Code Quiz";
  cardSubtitle.textContent = "Results";
  cardQuestion.textContent = "Score: " + correctAnswers;
}

// Function that switches questions based on the state number provided, in almost all
// cases, this number will go up by 1 when this function in invoked.
function nextCard(num) {
  // Maks sure that the function isnt trying to jump into something that doesn't exist
  if (num < 0 || num > 6) return;

  state = num;

  // switch through states to assign the current variable with the correct selector for the 
  // javascript object
  switch (state) {
    case 0:
      current = "intro";
      break;
    case 1:
      current = "one";
      break;
    case 2:
      current = "two";
      break;
    case 3:
      current = "three";
      break;
    case 4:
      current = "four";
      break;
    case 5:
      current = "five";
      break;
    case 6:
      current = "results";

      // If the user ran out of time this is true, so setup score for results
      if(DNF)
        correctAnswers = "DNF";

      // This means everytime the user reaches the results, this is true and the button
      // will correctly display 'take the quiz' instead of 'view leaderboards'
      STL = true;
      vlbButton.textContent = "Take the quiz!";

      // Remove any styles that may have persisted from the questions
      cardAns1.removeAttribute("style");

      // Because we know the user is headed towards the results page at this point, we 
      // must call setupResults to make sure all of the elements are displaying the right
      // thing
      setupResults();
      return;
  }

  // Set variable curQuestion in order to minimise repeated code
  var curQuestion = questions[current];

  // Update text fields to say the right thing
  cardTitle.textContent = curQuestion.title;
  cardSubtitle.textContent = curQuestion.subtitle;
  cardQuestion.textContent = curQuestion.question;

  // Check if any of the options for answers are diabled for this question, then disable them
  if (curQuestion.answer1 !== "disabled")
    cardAns1.setAttribute(
      "class",
      "btn btn-secondary button-fullwidth card-link"
    );
  else
    cardAns1.setAttribute(
      "class",
      "btn btn-secondary button-fullwidth card-link disabled"
    );

  if (curQuestion.answer2 !== "disabled")
    cardAns2.setAttribute(
      "class",
      "btn btn-secondary button-fullwidth card-link"
    );
  else
    cardAns2.setAttribute(
      "class",
      "btn btn-secondary button-fullwidth card-link disabled"
    );

  if (curQuestion.answer3 !== "disabled")
    cardAns3.setAttribute(
      "class",
      "btn btn-secondary button-fullwidth card-link"
    );
  else
    cardAns3.setAttribute(
      "class",
      "btn btn-secondary button-fullwidth card-link disabled"
    );

  if (curQuestion.answer4 !== "disabled")
    cardAns4.setAttribute(
      "class",
      "btn btn-secondary button-fullwidth card-link"
    );
  else
    cardAns4.setAttribute(
      "class",
      "btn btn-secondary button-fullwidth card-link disabled"
    );

  // Set text content of each answer so the user know what to click
  cardAns1.textContent = curQuestion.answer1;
  cardAns2.textContent = curQuestion.answer2;
  cardAns3.textContent = curQuestion.answer3;
  cardAns4.textContent = curQuestion.answer4;

  // Reset any styling used for the previous question
  cardAns1.removeAttribute("style");
  cardAns2.removeAttribute("style");
  cardAns3.removeAttribute("style");
  cardAns4.removeAttribute("style");

  // At this point, the switching is complete, so turn isSwitching to false so everything is unlocked
  isSwitching = false;
}

// This function ticks the timer every second, takes one from the timer and updates the element text
function tick() {
  timer --;
  timerEl.textContent = "Time left: " + timer;

  // if user is out of time and has not completed the quiz restart
  if(timer === 0 && state < 6) {
    DNF = true;
    nextCard(6);
  }
}

// Functions that will determine whether user's response is correct using a js object for lookup

// If the user is currently switching (clicked an option), don't run any logic as this could lead
// to exploits where the user can rapidly click the button to get more score than they should

// At this point, we know the user clicked an option, so switch through the state, adjust variables
// and invoke nextCard to bring the next question up once the user has answered
function answer1() {
  if(!isSwitching) {
    switch (state) {
      case 0:
        cardAns1.setAttribute("style", "background-color: red;");
        setTimeout(() => {
          alert("That's too bad :(");
          nextCard(0);
        }, waitTime);
        break;
      case 1:
        cardAns1.setAttribute("style", "background-color: red;");
        timer -= 10;
        setTimeout(() => {
          nextCard(2);
        }, waitTime);
        break;
      case 2:
        cardAns1.setAttribute("style", "background-color: red;");
        timer -= 10;
        setTimeout(() => {
          nextCard(3);
        }, waitTime);
        break;
      case 3:
        cardAns1.setAttribute("style", "background-color: red;");
        timer -= 10;
        setTimeout(() => {
          nextCard(4);
        }, waitTime);
        break;
      case 4:
        cardAns1.setAttribute("style", "background-color: green;");
        timer += 5;
        correctAnswers++;
        setTimeout(() => {
          nextCard(5);
        }, waitTime);
        break;
      case 5:
        cardAns1.setAttribute("style", "background-color: red;");
        timer -= 10;
        setTimeout(() => {
          nextCard(6);
        }, waitTime);
        break;
    }

    isSwitching = true;
  }
}

function answer2() {
  if (!isSwitching) {
    switch (state) {
      // Not increasing correct answers for the intro
      case 0:
        cardAns2.setAttribute("style", "background-color: green;");
        setTimeout(() => {
          interval = setInterval(tick, 1000);
          nextCard(1);
        }, waitTime);
        break;
      case 1:
        cardAns2.setAttribute("style", "background-color: red;");
        timer -= 10;
        setTimeout(() => {
          nextCard(2);
        }, waitTime);
        break;
      case 2:
        cardAns2.setAttribute("style", "background-color: red;");
        timer -= 10;
        setTimeout(() => {
          nextCard(3);
        }, waitTime);
        break;
      case 3:
        cardAns2.setAttribute("style", "background-color: green;");
        correctAnswers++;
        timer += 5;
        setTimeout(() => {
          nextCard(4);
        }, waitTime);
        break;
      case 4:
        cardAns2.setAttribute("style", "background-color: red;");
        timer -= 10;
        setTimeout(() => {
          nextCard(5);
        }, waitTime);
        break;
      case 5:
        timer -= 10;
        cardAns2.setAttribute("style", "background-color: red;");
        setTimeout(() => {
          nextCard(6);
        }, waitTime);
        break;
    }

    isSwitching = true;
  }
}

function answer3() {
  if(!isSwitching) {
    switch (state) {
      case 0:
        cardAns3.setAttribute("style", "background-color: red;");
        setTimeout(() => {
          nextCard(1);
        }, waitTime);
        break;
      case 1:
        cardAns3.setAttribute("style", "background-color: green;");
        timer += 5;
        correctAnswers++;
        setTimeout(() => {
          nextCard(2);
        }, waitTime);
        break;
      case 2:
        cardAns3.setAttribute("style", "background-color: red;");
        timer -= 10;
        setTimeout(() => {
          nextCard(3);
        }, waitTime);
        break;
      case 3:
        cardAns3.setAttribute("style", "background-color: red;");
        timer -= 10;
        setTimeout(() => {
          nextCard(4);
        }, waitTime);
        break;
      case 4:
        cardAns3.setAttribute("style", "background-color: red;");
        timer -= 10;
        setTimeout(() => {
          nextCard(5);
        }, waitTime);
        break;
      case 5:
        cardAns3.setAttribute("style", "background-color: green;");
        timer += 5;
        correctAnswers++;
        setTimeout(() => {
          nextCard(6);
        }, waitTime);
        break;
    }

    isSwitching = true;
  }
}

function answer4() {
  if(!isSwitching) {
    switch (state) {
      case 0:
        cardAns4.setAttribute("style", "background-color: red;");
        setTimeout(() => {
          nextCard(1);
        }, waitTime);
        break;
      case 1:
        cardAns4.setAttribute("style", "background-color: red;");
        timer -= 10;
        setTimeout(() => {
          nextCard(2);
        }, waitTime);
        break;
      case 2:
        cardAns4.setAttribute("style", "background-color: green;");
        timer += 5;
        correctAnswers++;
        setTimeout(() => {
          nextCard(3);
        }, waitTime);
        break;
      case 3:
        cardAns4.setAttribute("style", "background-color: red;");
        timer -= 10;
        setTimeout(() => {
          nextCard(4);
        }, waitTime);
        break;
      case 4:
        cardAns4.setAttribute("style", "background-color: red;");
        timer -= 10;
        setTimeout(() => {
          nextCard(5);
        }, waitTime);
        break;
      case 5:
        cardAns4.setAttribute("style", "background-color: red;");
        timer -= 10;
        setTimeout(() => {
          nextCard(6);
        }, waitTime);
        break;
    }

    isSwitching = true;
  }
}

// Triggered once the user click the submit button in the modal on the results screen, create a
// new entry in the array of scores (log) and update localStorage
function submitResult() {
  questions.results.log.push({
    "name": modalText.value,
    "score": correctAnswers,
    "time": timer
  });

  localStorage.setItem("log", JSON.stringify(questions.results.log));

  // This moves the user over to the leaderboards view
  displayResults();
}

// Creates the leaderboard for the user to see all previous attempts, then updates all elements to
// correctly display the leaderboard
function displayResults() {
  cardAns1.style.display = "none";
  cardQuestion.textContent = "Leaderboards";

  var list1 = document.createElement("ul");
  list1.setAttribute("class", "list-group");

  for(var i = 0; i < questions.results.log.length; i++) {
    var listItem = document.createElement("li");
    listItem.setAttribute("class", "list-group-item");
    if(questions.results.log[i].score == "DNF") {
      listItem.textContent = 
        questions.results.log[i].name + " did not finish :(";
    }
    else {
      listItem.textContent = 
        questions.results.log[i].name + ": " + 
        questions.results.log[i].score + " with " +
        questions.results.log[i].time + " seconds left!";
    }
    list1.appendChild(listItem);
  }

  buttons.appendChild(list1);
}

// This is called when the button is clicked at the bottom of the page
function viewLeaderboards() {
  // Check if user skipped quiz to view leaderboards, if this is true, we can just reload
  // as we know that the user is already on the leaderboards and wants to do the quiz
  if(!STL) {
    // make sure that the interval doesn't keep running when we skip to the leaderboards
    clearInterval(interval);

    // change to true so the button uses the correct behaviour next time
    STL = true;

    // Hide the buttons as the quiz if finished so they don't need to be shown
    cardAns1.parentElement.style.display = "none";
    cardAns2.parentElement.style.display = "none";
    cardAns3.parentElement.style.display = "none";
    cardAns4.parentElement.style.display = "none";

    // update the button so it no longer says 'view leaderboards'
    vlbButton.textContent = "Try the quiz!";

    // show he leaderboard as all the settings are now ready
    displayResults();
  }
  else {
    // reload the page
    location.reload();
  }
}

// Event listeners create the callback on the buttons so the quiz knows what the user is inputting
cardAns1.addEventListener("click", answer1);
cardAns2.addEventListener("click", answer2);
cardAns3.addEventListener("click", answer3);
cardAns4.addEventListener("click", answer4);

// Modal
modalSub.addEventListener("click", submitResult);

// View Leaderboard button
vlbButton.addEventListener("click", viewLeaderboards);