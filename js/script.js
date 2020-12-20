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
var log = [];

// Questions object to store all important data for the quiz.
var questions = {
  "intro": {
    "title": "Code Quiz",
    "subtitle": "Are you ready?",
    "question": "Are you ready to start the code quiz? For every answer just click one of the multiple choice answers to reply!",
    "answer1": "No, I'm all good :(",
    "answer2": "Yes, I'm going to destroy this!",
    "answer3": "disabled",
    "answer4": "disabled"
  },
  "one": {
    "title": "Code Quiz",
    "subtitle": "",
  }
}

// Function that switches questions based on the state number provided, in almost all
// cases, this number will go up by 1 when this function in invoked.
function nextCard(num) {
  if(num < 0 || num > 6)
    return;
  
  state = num;

  switch(state) {
    case 0: 
      cardTitle.textContent = questions.intro.title;
      cardSubtitle.textContent = questions.intro.subtitle;
      cardQuestion.textContent = questions.intro.question;

      // Check if any of the options for answers are diabled for this question, then disable them
      if(questions.intro.answer1 == "disabled") 
        cardAns1.setAttribute("class", "btn btn-secondary button-fullwidth card-link disabled");
      else 
        cardAns1.setAttribute("class", "btn btn-secondary button-fullwidth card-link");

      if(questions.intro.answer2 == "disabled") 
        cardAns1.setAttribute("class", "btn btn-secondary button-fullwidth card-link disabled");
      else 
        cardAns1.setAttribute("class", "btn btn-secondary button-fullwidth card-link");

      if(questions.intro.answer3 == "disabled") 
        cardAns1.setAttribute("class", "btn btn-secondary button-fullwidth card-link disabled");
      else 
        cardAns1.setAttribute("class", "btn btn-secondary button-fullwidth card-link");

      if(questions.intro.answer4 == "disabled") 
        cardAns1.setAttribute("class", "btn btn-secondary button-fullwidth card-link disabled");
      else 
        cardAns1.setAttribute("class", "btn btn-secondary button-fullwidth card-link");

      cardAns1.textContent = questions.intro.answer1;
      cardAns2.textContent = questions.intro.answer2;
      cardAns3.textContent = questions.intro.answer3;
      cardAns4.textContent = questions.intro.answer4;

      isSwitching = false;
      break;
  }
}

// Functions that will determine whether user's response is correct using a js object for lookup
function answer1() {
  switch(state) {
    case 0:
      if(!isSwitching) {
        cardAns1.style.backgroundColor = "red";
        isSwitching = true;
        setTimeout(() => { nextCard(1) }, 2000);
      }
      break;
  }
}

function answer2() {
  switch(state) {
    case 0:
      if(!isSwitching) {
        cardAns2.style.backgroundColor = "green";
        correctAnswers++;
        isSwitching = true;
        setTimeout(() => { nextCard(1); }, 2000);
      }
      break;
  }
}

function answer3() {
  switch(state) {
    case 0:
      if(!isSwitching) {
        cardAns3.style.backgroundColor = "red";
        isSwitching = true;
        setTimeout(() => { nextCard(1) }, 2000);
      }
      break;
  }
}

function answer4() {
  switch(state) {
    case 0:
      if(!isSwitching) {
        cardAns4.style.backgroundColor = "red";
        isSwitching = true;
        setTimeout(() => { nextCard(1) }, 2000);
      }
      break;
  }
}

// Event listeners create the callback on the buttons so the quiz knows what the user is inputting
cardAns1.addEventListener("click", answer1);
cardAns2.addEventListener("click", answer2);
cardAns3.addEventListener("click", answer3);
cardAns4.addEventListener("click", answer4);