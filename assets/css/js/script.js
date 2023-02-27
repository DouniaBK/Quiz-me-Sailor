const restartBtn = document.getElementById('restart');
const previousBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const submitBtn = document.getElementById('submit');
const trueBtn = document.getElementById('true');
const falseBtn = document.getElementById('false');
const userScore = document.getElementById('user-score');
const questionText = document.getElementById('question-text');
const img = document.querySelector("img")

let currentQuestion = 0;
var score = 0;

let questions = [
    {
        question: "What is this person's job?",
        answers: [
            {option:"Baker", answer: true},
            {option:"Waiter", answer: false}
        ],
        img: "./assets/css/images/baker.jpg",
    },
   
    {
        question: "What is this person's job?",
        answers: [
            {option:"Farmer", answer: true},
            {option:"Nurse", answer: false}
        ],
        img: "/workspace/Quizz-My-English/assets/css/images/farmer.png",
    },
    {
        question: "What is this person's job?",
        answers: [
            {option:"Police Officer", answer: false},
            {option:"Firefighter", answer: true}
        ],
        img: "/workspace/Quizz-My-English/assets/css/images/firefighter.png",
    },
    {
        question: "What is this person's job?",
        answers: [
            {option:"Singer", answer: true},
            {option:"Captain", answer: false}
        ],
        img: "https://assets/css/images/singer.png",
    },
    {
        question: "What is this person's job?",
        answers: [
            {option:"Teacher", answer: true},
            {option:"Doctor", answer: false}
        ],
        img: "assets/css/images/teacher.jpg",
    },
    {
        question: "What is this person's job?",
        answers: [
            {option:"Plumber", answer: false},
            {option:"Veterinarian", answer: true}
        ],
        img: "assets/css/images/veterinarian.jpg",
    }
]

