var card = document.querySelector("#question-card");
var cardTitle = document.querySelector("#card-title");
var cardSubtitle = document.querySelector("#card-subtitle");
var cardQuestion = document.querySelector("#card-question");
var cardAns1 = document.querySelector("#card-ans-1");
var cardAns2 = document.querySelector("#card-ans-2");
var cardAns3 = document.querySelector("#card-ans-3");
var cardAns4 = document.querySelector("#card-ans-4");

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

// Questions object to store all important data for the quiz.
var questions = {
  "intro": {
    "title": "Code Quiz",
    "subtitle": "Are you ready?",
    "question":
      "Are you ready to start the code quiz? For every answer just click one of the multiple choice answers to reply!",
    "answer1": "No, I'm all good :(",
    "answer2": "Yes, I'm going to destroy this!",
    "answer3": "disabled",
    "answer4": "disabled",
  },
  "one": {
    "title": "Code Quiz",
    "subtitle": "Question 1",
    "question":
      "What is the HTML tag under which once can write the javascript code?",
    "answer1": "<javascript>",
    "answer2": "<scripted>",
    "answer3": "<script>",
    "answer4": "<js>",
  },
  "two": {
    "title": "Code Quiz",
    "subtitle": "Question 2",
    "question": 
      "Which of the following is the correct syntax to display \"GeeksForGeeks\" in an alert box using javascript?",
    "answer1": "alertbox(\"GeeksForGeeks\");",
    "answer2": "msg(\"GeeksForGeeks\");",
    "answer3": "msgbox(\"GeeksForGeeks\");",
    "answer4": "alert(\"GeeksForGeeks\");"
  }
};

// Function that switches questions based on the state number provided, in almost all
// cases, this number will go up by 1 when this function in invoked.
function nextCard(num) {
  if (num < 0 || num > 6) return;

  state = num;

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
      break;
  }

  var curQuestion = questions[current];

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

  isSwitching = false;
  console.log("Correct Answers: " + correctAnswers);
}

// Functions that will determine whether user's response is correct using a js object for lookup
function answer1() {
  isSwitching = true;

  switch (state) {
    case 0:
      if (!isSwitching) {
        cardAns1.setAttribute("style", "background-color: red;");
        setTimeout(() => {
          nextCard(1);
        }, 2000);
      }
      break;
    case 1:
      if (!isSwitching) {
        cardAns1.setAttribute("style", "background-color: red;");
        setTimeout(() => {
          nextCard(2);
        }, 2000);
      }
      break;
    case 2:
      if (!isSwitching) {
        cardAns1.setAttribute("style", "background-color: red;");
        setTimeout(() => {
          nextCard(3);
        }, 2000);
      }
      break;
  }
}

function answer2() {
  if (!isSwitching) {
    switch (state) {
      // Not increasing correct answers for the intro
      case 0:
          cardAns2.setAttribute("style", "background-color: green;");
          setTimeout(() => {
            nextCard(1);
          }, 2000);
        break;
      case 1:
          cardAns2.setAttribute("style", "background-color: red;");
          setTimeout(() => {
            nextCard(2);
          }, 2000);
        break;
      case 2:
          cardAns2.setAttribute("style", "background-color: red;");
          setTimeout(() => {
            nextCard(3);
          }, 2000);
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
          }, 2000);
        break;
      case 1:
          cardAns3.setAttribute("style", "background-color: green;");
          correctAnswers++;
          setTimeout(() => {
            nextCard(2);
          }, 2000);
        break;
      case 2:
          cardAns3.setAttribute("style", "background-color: red;");
          setTimeout(() => {
            nextCard(3);
          }, 2000);
        break;
    }

    isSwitching = true;
  }
}

function answer4() {
  if(!isSwitching) {
    switch (state) {
      case 0:
        if (!isSwitching) {
          cardAns4.setAttribute("style", "background-color: red;");
          setTimeout(() => {
            nextCard(1);
          }, 2000);
        }
        break;
      case 1:
        if (!isSwitching) {
          cardAns4.setAttribute("style", "background-color: red;");
          setTimeout(() => {
            nextCard(2);
          }, 2000);
        }
        break;
      case 2:
        if (!isSwitching) {
          cardAns4.setAttribute("style", "background-color: green;");
          correctAnswers++;
          setTimeout(() => {
            nextCard(3);
          }, 2000);
        }
        break;
    }

    isSwitching = true;
  }
}

// Event listeners create the callback on the buttons so the quiz knows what the user is inputting
cardAns1.addEventListener("click", answer1);
cardAns2.addEventListener("click", answer2);
cardAns3.addEventListener("click", answer3);
cardAns4.addEventListener("click", answer4);
