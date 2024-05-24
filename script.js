let questions = [
    {
        question: "What is the capital of France?",
        correctAnswer: "Paris"
    },
    {
        question: "What is the capital of Spain?",
        correctAnswer: "Madrid"
    },
    {
        question: "What is the capital of Germany?",
        correctAnswer: "Berlin"
    }
];

let options = ["Paris", "London", "Berlin", "Madrid"];
let currentQuestionIndex = 0;

function setup() {
    noCanvas();
    initializeDropdown();
    displayQuestion();

    let nextBtn = select('#next-btn');
    nextBtn.mousePressed(nextQuestion);

    let prevBtn = select('#prev-btn');
    prevBtn.mousePressed(prevQuestion);

    let submitBtn = select('#submit-btn');
    submitBtn.mousePressed(checkAnswer);
}

function initializeDropdown() {
    let dropdown = select('#answer-dropdown');
    dropdown.html('<option value="default">Select an answer</option>');

    for (let option of options) {
        dropdown.child(createElement('option', option).attribute('value', option));
    }
}

function displayQuestion() {
    let questionP = select('#question');
    let currentQuestion = questions[currentQuestionIndex];
    questionP.html(currentQuestion.question);

    let resultP = select('#result');
    resultP.html('');
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function checkAnswer() {
    let dropdown = select('#answer-dropdown');
    let selectedAnswer = dropdown.value();
    let currentQuestion = questions[currentQuestionIndex];

    let resultP = select('#result');

    if (selectedAnswer === "default") {
        resultP.html("Please select an answer.");
        resultP.style('color', 'orange');
    } else if (selectedAnswer === currentQuestion.correctAnswer) {
        resultP.html("Correct!");
        resultP.style('color', 'green');
    } else {
        resultP.html("Incorrect. The correct answer is " + currentQuestion.correctAnswer + ".");
        resultP.style('color', 'red');
    }
}
