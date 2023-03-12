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

// Extract username from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let name = urlParams.get('name')

// Capitalize username
if (name !== null) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
}


// Define the questions
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
        question: "7. When travelling DOWNSTREAM (toward the sea) on which side should you keep the proper navigation mark to stay in the channel?",
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
        question: "10. When traveling DOWNSTREAM (toward the sea), on which side of your vessel should you keep the red marker?",
        answers: [
            {option:"On the port (left-hand) side", answer: false},
            {option:"On the starboard (right-hand) side", answer: true},
            {option:"On either side - it doesn't matter", answer: false},
            {option:"Stay in the middle of the channel regardless of the mark", answer:false },
        ],
        
    }
]


/**  
 * Initialize empty answers array
 */
let answers = []
for (let i = 0; i < questions.length; i++) {
    // Push a new entry to the answers array for each question
    answers.push({answered: false, correct: null, answer: null})
}

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

// Add event listeners with error handling
if (previousBtn !== null ){
    previousBtn.addEventListener('click', previous);
    nextBtn.addEventListener('click', next);
    submitBtn.addEventListener('click', submit);

    beginQuiz();
}


/**
 * displays the questions and answers
 * logs and saves the answers
 * increment score
 * display the answer of the user
 */

function displayQandA() {
    console.log('displayQandA', currentQuestion, score)

    // Reset user message
    messageElement.innerHTML = "";

    // Set question text
    questionText.innerHTML = questions[currentQuestion].question;

    // set all buttons' text and call back functions
    for (let i = 0; i < optionBtn.length; i++) {
        const btn = optionBtn[i]
        btn.style.backgroundColor = '#bce0e1'
        btn.style.border = '2px solid white'
        btn.lastElementChild.innerHTML = questions[currentQuestion].answers[i].option;

        if (answers[currentQuestion].answered === false ) {
            // The user is allowed to click on one anwser per question the rest of the answers will then be disabled.
            btn.onclick = () => {
                disableBtns()
                const is_correct_answer = questions[currentQuestion].answers[i].answer;

                // Save answer
                answers[currentQuestion].answered = true;
                answers[currentQuestion].correct = is_correct_answer;
                answers[currentQuestion].answer = i;

                if (is_correct_answer ) { // If the answer is correct
                    // Increment the score
                    score++
                }
                // Resolve the question
                resolveQuestion()
                // Set the score
                userScore.innerHTML = score;
            }
        } else {
            btn.onclick = undefined
        }
    }
    
    // If the questions is already answered, show the solution to the user
    // else, enable the buttons, so he can submit his answer
    if (answers[currentQuestion].answered === true ) {
        resolveQuestion()
    } else {
        enableBtns()
    }

    // Hide and show previous button depending on question number
    if (currentQuestion > 0) {
        previousBtn.classList.remove('hide');
    } else {
        previousBtn.classList.add('hide');
    }
    
    if (currentQuestion === 9) {
        nextBtn.classList.add('hide');
    } 
}
/**
 * shows the correct answer in green and incorrect in red
 * Tells the user if he answered the question correctly or not
 * by displaying the answer option letter (a, b, c or d) that the 
 * user selected
 */

function resolveQuestion() {

    // Show the actually correct answer for each button/option
    let correct_answer = 0;
    for (let btnNr = 0; btnNr < optionBtn.length; btnNr++) {
        const btn = optionBtn[btnNr]
        const isCorrect = questions[currentQuestion].answers[btnNr].answer;
        if (isCorrect) {
            btn.style.backgroundColor = '#4ac54a'
            correct_answer = btnNr;
        } else {
            btn.style.backgroundColor = '#eba1a1'
            // If the answer was wrong, give it a dotted border
            if (answers[currentQuestion].answer === btnNr) {
                btn.style.border = '2px dashed #A40000'
            }
        }
    }
    
    // Show if the user actually answered correctly
    const is_correct_answer = answers[currentQuestion].correct;
    if (is_correct_answer ) { // If the answer is correct
        messageElement.innerHTML = `You answered ${answeredNumberToLetter(answers[currentQuestion].answer)}. That is correct, sailor ${name}!`
    } else { // If the answer is incorrect display message
        messageElement.innerHTML = `You answered ${answeredNumberToLetter(answers[currentQuestion].answer)} and you just sunk, sailor ${name}! The correct answer is ${answeredNumberToLetter(correct_answer)}.`
    }
}

/**
 *  Return the letter for the given answer number 
 */
function answeredNumberToLetter(number) {
    
    switch(number) {
        case 0:
            return 'A';
        case 1:
            return 'B';
        case 2:
            return 'C';
        case 3:
            return 'D';
        default:
            return '';
      }
}



/**
 * reset the score
 * remove the hide class from elements
 */

function restart() {
    currentQuestion = 0;
    previousBtn.classList.remove('hide');
    nextBtn.classList.remove('hide');
    submitBtn.classList.remove('hide');
    questionText.classList.add('hide');
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
    if (currentQuestion<9) {
        currentQuestion++;
        displayQandA()
    }
}


function previous () {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQandA();
    }
}

/**
 * Once the user clicks submit all the buttons 
 * and the questions disapear and a congradulatory message appears.
 * */ 
function submit () {
    
    // Hide all buttons and elements
   for (let i = 0; i < optionBtn.length; i++){
    optionBtn[i].classList.add('hide');
    }
    submitBtn.classList.add('hide');
    previousBtn.classList.add('hide');
    nextBtn.classList.add('hide');
    questionText.classList.remove('hide');
    messageElement.classList.add('hide');
    previousBtn.classList.add('hide');

    let message = ''
    if(score <8) {
        message = `Ohh, looks like you sank the ship, ${name}. Just keep calm and practice sailor.`;
    }
    if(score >= 7) {
        message = `Alrighty ${name}. Passed, but scraped the reef just a little bit :)`;
    }
    if(score === 10) {
        message = `Ahoi, sailor ${name} and welcome aboard. Go collect your vessel and lets go for some treasure huntn.`;
    }
    questionText.innerHTML = message;
}

/** Once the user has clicked on an answer the rest of
 * the options are disabled to avoid changing the score/cheating
 */
function disableBtns () {

    for (let i = 0; i < optionBtn.length; i++) {
        optionBtn[i].disabled = true;
    }
}

/** Enables the use of the buttons */
function enableBtns () {

    for (let i = 0; i < optionBtn.length; i++) {
        optionBtn[i].disabled = false;
        
    }
}

/**
 * Save the name of the user 
 * Make sure the user enters a name
 * Remind the user to enter a name to start the quiz
 */

function saveName () {
    // Reset message
    messageElement.innerHTML = ""

    // Get the name of the user
    const username = document.getElementById('fname').value;

    // Check if name is entered
    if (username.length > 0 && validateUsername(username)) {
        // Create new url
        const url_new = `quiz.html?name=${username}`;

        // Go to URL
        window.location.href = url_new;
    } else {
        // Show message if name was not entered
        messageElement.innerHTML = "Please enter a valid username";
    }
}

/**
 * Validation function for the username using regular expressions
 */
const validateUsername = (username) => {
    // Create a regex rule 
    const rule = /^[a-zA-Z\-]+$/;

    // Evaluate and return 
    return rule.test(username);
}