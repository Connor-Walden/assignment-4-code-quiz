var card = document.querySelector("#question-card");
var cardAns1 = document.querySelector("#card-ans-1");
var cardAns2 = document.querySelector("#card-ans-2");
var cardAns3 = document.querySelector("#card-ans-3");
var cardAns4 = document.querySelector("#card-ans-4");

// 0 - Intro, 1 - Q1, 2 - Q2, 3 - Q3, 4 - Q4, 5 - Q5, 6 - RESULTS
var state = 0;

// Questions object to store all important data for the quiz.
var questions = {
  "intro": {
    "title": "Code Quiz",
    "subtitle": "Are you ready?",
    "question": "Are you ready to start the code quiz? For every answer just click one of the multiple choice answers to reply!",
    "answer1": "No, I'm all good :(",
    "answer2": "Yes, I'm going to destroy this!",
    "answer3": "disabled",
    "answer4": "disabled",
    "correctAns": "2"
  }
}

// Functions that will determine whether user's response is correct using a js object for lookup

function answer1() {

}

function answer2() {

}

function answer3() {

}

function answer4() {

}

// Event listeners create the callback on the buttons so the quiz knows what the user is inputting
cardAns1.addEventListener("click", answer1);
cardAns2.addEventListener("click", answer2);
cardAns3.addEventListener("click", answer3);
cardAns4.addEventListener("click", answer4);