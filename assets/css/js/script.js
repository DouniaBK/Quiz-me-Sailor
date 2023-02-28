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

restartBtn.addEventListener('click', restart);
previousBtn.addEventListener('click', previous);
nextBtn.addEventListener('click', next);
submitBtn.addEventListener('click', submit);


/** 
 * The page loads and the script gets executed
 *  with a feature that will allow the page to jump to
 * the next question once an option is selected from the list of answer options.
*/

function beginQuiz () {
    currentQuestion = 0;
    questionText.innerHTML = questions[currentQuestion].question;
    trueBtn.innerHTML = questions[currentQuestion].answers{0}.option;
    trueBtn.onclick = () => {
        let ano=0;
        if(questions[currentQuestion].answers[ano].answer){
            if(score<6){
                score++;
            }
        }
        userScore.innerHTML = score;
        if(currentQuestion<2){
            next();
        }
    }
    falseBtn.innerHTML = questions[currentQuestion].answers[1].option;
    falseBtn.onclick = () => {
        let ano=1;
        if(questions[currentQuestion].answers[ano].answer){
            if(score<6){
                score++;
            }
        }
        userScore.innerHTML = score;
        if(currentQuestion<2) {
            next();
        }
    }
    previousBtn.classList.add('hide');
}

beginQuiz();

/**
 * reset the score
 * remove the hide class from elements
 * class beginQuiz()
 */

function restart() {
    currentQuestion = 0;
    previousBtn.classList.remove('hide');
    nextBtn.classList.remove('hide');
    submitBtn.classList.remove('hide');
    trueBtn.classList.remove('hide');
    falseBtn.classList.remove('hide');
    score= 0;
    userScore.innerHTML = score;
    beginQuiz();
}

/**
 * allow to jump to the next question
 * increment current question and score based on the answer of the user
 * remove the hidden class from previous button
 */

function next () {
    currentQuestion++;
    if(currentQuestion >= 2) {
        nextBtn.classList.add('hide');
        previousBtn.classList.remove('hide');
    }

questionText.innerHTML = questions[currentQuestion].question;
trueBtn.innerHTML = questions[currentQuestion].answers[0].option;
trueBtn.onclick = () => {
    let ano=0;
    if(questions[currentQuestion].answers[0].answer){
        if(score<6){
            score++;
        }
    }
    userScore.innerHTML = score;
    if(currentQuestion <2) {
        next();
    }
}
falseBtn.innerHTML = questions[currentQuestion].answers[1].option;
falseBtn.onclick = () => {
    let ano=1;
    if(questions[currentQuestion].answers[0].answer){
        if(score<6){
            score++;
        }
    }
    userScore.innerHTML = score;
    if(currentQuestion <2) {
        next();
    }

}
previousBtn.classList.remove('hide');
}


function previous () {
    currentQuestion++;
    if(currentQuestion >= 0) {
        previousBtn.classList.add('hide');
        nextBtn.classList.remove('hide');
    }

questionText.innerHTML = questions[currentQuestion].question;
trueBtn.innerHTML = questions[currentQuestion].answers[0].option;
trueBtn.onclick = () => {
    let ano=0;
    if(questions[currentQuestion].answers[ano].answer){
        if(score<6){
            score++;
        }
    }
    userScore.innerHTML = score;
    if(currentQuestion<2) {
        next();
    }
}
falseBtn.innerHTML = questions[currentQuestion].answers[1].option;
falseBtn.onclick = () => {
    let ano=1;
    if(questions[currentQuestion].answers[0].answer){
        if(score<6){
            score++;
        }
    }
    userScore.innerHTML = score;
    if(currentQuestion <2) {
        next();
    }

}
previousBtn.classList.remove('hide');
}