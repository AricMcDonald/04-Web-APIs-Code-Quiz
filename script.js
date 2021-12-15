var questions = [
    {
        title: "JavaScript is one of __ languages programmers must learn?",
        choices: ["One", "Two", 'Three', 'Four'],
        correct: 'choice 3'
    },
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<script>", "<js>", '<scripting>', '<javascript>'],
        correct: 'choice 1'
    },
    {
        title: "Where is the correct place to insert a JavaScript?",
        choices: ["<head>", "<body>", 'either/both', 'in the style.css'],
        correct: 'choice 3'
    },
]

var time = questions.length * 20;
var timerId;
var questionIndex = 0;

var questionEl = document.querySelector('.question');
var choicesEl = document.querySelector('.choices');
var timerEl = document.querySelector('#timer');
var startBtn = document.querySelector('#startBtn');
var quizEl = document.querySelector('#quiz');
var submitBtn = document.querySelector('#submitBtn')

// Start Quiz function

function startQuiz() {
    var startScreen = document.querySelector('#startScreen');
    startScreen.setAttribute('class', 'hide');
    quizEl.removeAttribute('class', 'hide');
    timerId = setInterval(timerFunction, 1000)
    timerEl.textContent = time;
    // next question
    nextQuestion();
}

// Timer Function
function timerFunction() {
    time--;
    timerEl.textContent = time;
    if(time <= 0) {
        console.log('quizOver')
    }
}

//next question function
function nextQuestion() {
    var currentQuestion = questions[questionIndex];
    questionEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";

    for(let i=0; i<currentQuestion.choices.length; i++) {
        var choiceBtn = document.createElement('button');
        choiceBtn.setAttribute('class', 'choiceBtn');
        choiceBtn.setAttribute('value',  currentQuestion.choices[i]);

        choiceBtn.textContent = i + 1 + '. ' + currentQuestion.choices[i];

        choiceBtn.onclick = questionBtnClick;
        choicesEl.appendChild(choiceBtn)
    }

}

//Function to listen for when a button is clicked on
function questionBtnClick() {
    console.log(this.value)
    if(this.value !== questions[questionIndex].correct) {
        time -= 15;
        if(time < 0) {
            time = 0
        }

        timerEl.textContent = time;
    }

    questionIndex++;
    if(questionIndex === questions.length) {
        quizOver();
    } else {
        nextQuestion();
    }
}

function quizOver() {
    clearInterval(timerId);
    var endScreen = document.querySelector('#endScreen');
    endScreen.removeAttribute('class');

    var highscoreEl = document.querySelector('#highscore');
    highscoreEl.textContent = time;

    quizEl.setAttribute('class', 'hide');
}

function addHighscore() {
    var initialsInput = document.querySelector('#initials');
    var initials = initialsInput.value.trim();

    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScore = {
        score: time,
        initials: initials
    }

    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    console.log(highscores)
}

startBtn.onclick = startQuiz;
submitBtn.onclick = addHighscore;


