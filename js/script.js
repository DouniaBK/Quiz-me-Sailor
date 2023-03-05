const restartBtn = document.getElementById('restart');
const previousBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const submitBtn = document.getElementById('submit');
const optionBtn = document.getElementsByClassName('btn-option');
const userScore = document.getElementById('user-score');
const questionText = document.getElementById('question-text');
const messageElement = document.getElementById('message')


let currentQuestion = 0;
var score = 0;


let questions = [
    {
        question: "1. The responsibility of the master (driver) of a vessel is to:",
        answers: [
            {option:"Maintain a proper lookout and avoid collision", answer: false},
            {option:"Ensure that all safety equipement is accessible and stored correctly", answer: false},
            {option:"Ensure the safety of those on board the vessel", answer: false},
            {option:"All of the above", answer: true},
        ],
     
    },
   
    {
        question: "2. Where should you drive a vessel when in a channel?",
        answers: [
            {option:"On the port(left-hand) side", answer: false},
            {option:"In the middle of the channel", answer: false},
            {option:"On the starboard (right-hand) side", answer: true},
            {option:"On any side - it does not matter as long as a collision does not occur", answer: false},
        ],
      
    },
    {
        question: "3. What is the MAXIMUM permissible blood alcohol level for a person 18 years of age or more when driving a vessel in NSW?",
        answers: [
            {option:"Under 0.08", answer: false},
            {option:"Under 0.02", answer: false},
            {option:"Under 0.05", answer: true},
            {option:"Nill", answer: false},
        ],
 
    },
    {
        question: "4. What best describes a skipper's (driver's) responsibility regarding speed on the water?",
        answers: [
            {option:"Travelling at a speed the hull is designed to reach", answer: false},
            {option:"Travelling at a speed at which sudden danger can be avoided", answer:true },
            {option:"Travelling at a speed for the best comfort of passengers and fuel efficiency", answer: false},
            {option:"Travelling at any speed unless signposted otherwise", answer: false},
        ],
    },  
    {
        question: "5. When driving a vessel at 6 knots or more, or towing a person, what is the MINIMUM distance both the vessel and any towed person MUST keep from power-driven vessels, land or structures?",
        answers: [
            {option:"30 metres or, if not possible, a safe distance", answer: true},
            {option:"60 metres or, if not possible, a safe distance", answer: false},
            {option:"100 metres or, if not possible, a safe distance", answer: false},
            {option:"It doesn't matter as long as you navigate with care", answer: false},
        ],
    },
    {
        question: "6. What type of lifejacket MUST be worn when boating alone in a power vessel under 4.8 metres on enclosed waters?",
        answers: [
            {option:"No lifejacket is required when boating alone in this situation", answer: false},
            {option:"Only a Level 100+ (formerly Type 1) lifejacket is suitable in this situation", answer: false},
            {option:"Not necessary to wear the lifejacket as long as there is one in good condition and accessible if the need arises", answer: false},
            {option:"Any approved lifejacket of Level 50S (formerly Type 3) or higher", answer: true},
        ],
        
    },
    {
        question: "7. When travelling DOWNSTREAM (toward the sea) on which side should you keep this type of navigation mark to stay in the channel?",
        answers: [
            {option:"Your port (left-hand) side", answer: true},
            {option:"Your starboard (right-hand) side", answer: false},
            {option:"Either side (it does not matter)", answer: false},
            {option:"Stay in the middle of the channel regardless of the mark", answer: false},
        ],
        
    },
    {
        question: "8. In what circumstances MUST a child under 12 years of age wear a lifejacket?",
        answers: [
            {option:"At all times on a vessel under 4.8 metres", answer: false},
            {option:"When being towed on any apparatus", answer: false},
            {option:"When in an open area of a vessel less than 8 metres underway", answer: false},
            {option:"All of the above", answer: true},
        ],
        
    },
    {
        question: "9. In what circumstances MUST a person on a vessel under 4.8 metres wear a lifejacket?",
        answers: [
            {option:"After sunset and before sunrise", answer: false},
            {option:"On open and alpine waters", answer: false},
            {option:"When boating alone", answer: false},
            {option:"All of the above", answer: true},
        ],
        
    },
    {
        question: "10. When traveling DOWNSTREAM (toward the sea), on which side of your vessel should you keep this red marker?",
        answers: [
            {option:"On the port (left-hand) side", answer: false},
            {option:"On the starboard (right-hand) side", answer: true},
            {option:"On either side - it doesn't matter", answer: false},
            {option:"Stay in the middle of the channel regardless of the mark", answer:false },
        ],
        
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
    // Set question counter to zero to start at the first question
    currentQuestion = 0;
    // set the index 0 question as the first question in the Html text amongs all questions
    displayQandA()
}

beginQuiz();

function displayQandA() {

    questionText.innerHTML = questions[currentQuestion].question;
    // set all buttons' text and call back functions
    //
    for (let i = 0; i < optionBtn.length; i++) {
        const btn = optionBtn[i]
        btn.style.backgroundColor = '#bce0e1'
        btn.lastElementChild.innerHTML = questions[currentQuestion].answers[i].option;

        // The user is allowed to click on one anwser per question the rest of the answers will then be disabled.
        btn.onclick = () => {
            disableBtns()
            console.log("i am a button ", btn.children[0].innerHTML);
            const is_correct_answer = questions[currentQuestion].answers[i].answer;
             if (is_correct_answer ) { // If the answer is correct
                // Increment the score
                 score++
                 
                 messageElement.innerHTML = "That is correct, sailor!"
             } else { // If the answer is incorrect display comesiration message
                messageElement.innerHTML = "That is incorrect, mate!"
             }
             resolveQuestion() 
            userScore.innerHTML = score;
        } 

        console.log(optionBtn[i],"i am a button");
    }

    previousBtn.classList.add('hide');
}


function resolveQuestion() {

    for (let i = 0; i < optionBtn.length; i++) {
        const btn = optionBtn[i]
        const isCorrect = questions[currentQuestion].answers[i].answer;
        if (isCorrect) {
            btn.style.backgroundColor = '#4ac54a'
        } else {
            btn.style.backgroundColor = '#eba1a1'
        }

        console.log(optionBtn[i],"i am a button");
    }

}

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
    
    enableBtns()
    currentQuestion++;
    if(currentQuestion >= 11) {
        nextBtn.classList.add('hide');
        previousBtn.classList.remove('hide');
    }

    displayQandA()

}


function previous () {
    currentQuestion++;
    if(currentQuestion >= 0) {
        previousBtn.classList.add('hide');
        nextBtn.classList.remove('hide');
    }

    questionText.innerHTML = questions[currentQuestion].question;

    previousBtn.classList.remove('hide');
}

function submit () {
    if(currentQuestion >= 12) {
        previousBtn.classList.add('hide');
        nextBtn.classList.remove('hide');
    
    }
    previousBtn.classList.add('hide');
    nextBtn.classList.add('hide');
    submitBtn.classList.add('hide');
    questionText.innerHTML = "Keep on going, Sailor!"
}

function disableBtns () {

    for (let i = 0; i < optionBtn.length; i++) {
        console.log('disableBtns optionBtn[i]', optionBtn[i])
        optionBtn[i].disabled = true
        
    }
}

function enableBtns () {

    for (let i = 0; i < optionBtn.length; i++) {
        console.log('enableBtns optionBtn[i]', optionBtn[i])
        optionBtn[i].disabled = false
        //optionBtn[i].prop('disabled', false);
        
    }
}

