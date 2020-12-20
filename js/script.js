var card = document.querySelector("#question-card");
var cardTitle = document.querySelector("#card-title");
var cardSubtitle = document.querySelector("#card-subtitle");
var cardQuestion = document.querySelector("#card-question");
var cardAns1 = document.querySelector("#card-ans-1");
var cardAns2 = document.querySelector("#card-ans-2");
var cardAns3 = document.querySelector("#card-ans-3");
var cardAns4 = document.querySelector("#card-ans-4");
var buttons = document.querySelector("#buttons");

// Modal
var modalText = document.querySelector("#usrInitialsField");
var modalSub = document.querySelector("#usrInitialsSubmit");

// Timer
var timerEl = document.querySelector("#timerEl");

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

if(localStorage.getItem("log"))
  questions.results.log = JSON.parse(localStorage.getItem("log"));

function setupResults() {
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
      if(DNF)
        correctAnswers = "DNF";
      setupResults();
      return;
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

function submitResult() {
  questions.results.log.push({
    "name": modalText.value,
    "score": correctAnswers
  });

  localStorage.setItem("log", JSON.stringify(questions.results.log));

  displayResults();
}

function displayResults() {
  cardAns1.style.display = "none";
  cardQuestion.textContent = "Leaderboards";

  var list1 = document.createElement("ul");
  list1.setAttribute("class", "list-group");

  for(var i = 0; i < questions.results.log.length; i++) {
    var listItem = document.createElement("li");
    listItem.setAttribute("class", "list-group-item");
    listItem.textContent = questions.results.log[i].name + ": " + questions.results.log[i].score;
    list1.appendChild(listItem);
  }

  buttons.appendChild(list1);
}

// Event listeners create the callback on the buttons so the quiz knows what the user is inputting
cardAns1.addEventListener("click", answer1);
cardAns2.addEventListener("click", answer2);
cardAns3.addEventListener("click", answer3);
cardAns4.addEventListener("click", answer4);

// Modal
modalSub.addEventListener("click", submitResult);