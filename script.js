let questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "What is the capital of Spain?",
        options: ["Lisbon", "Madrid", "Rome", "Athens"],
        correctAnswer: "Madrid"
    },
    {
        question: "What is the capital of Germany?",
        options: ["Berlin", "Vienna", "Amsterdam", "Prague"],
        correctAnswer: "Berlin"
    }
];

let currentQuestionIndex = 0;

function setup() {
    noCanvas();
    displayQuestion();

    let nextBtn = select('#next-btn');
    nextBtn.mousePressed(nextQuestion);

    let prevBtn = select('#prev-btn');
    prevBtn.mousePressed(prevQuestion);

    let submitBtn = select('#submit-btn');
    submitBtn.mousePressed(checkAnswer);
}

function displayQuestion() {
    let questionP = select('#question');
    let dropdown = select('#answer-dropdown');
    dropdown.html('<option value="default">Select an answer</option>');

    let currentQuestion = questions[currentQuestionIndex];
    questionP.html(currentQuestion.question);

    for (let option of currentQuestion.options) {
        dropdown.child(createElement('option', option).attribute('value', option));
    }

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
