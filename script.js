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
    displayQuestion();

    let nextBtn = select('#next-btn');
    nextBtn.mousePressed(nextQuestion);

    let prevBtn = select('#prev-btn');
    prevBtn.mousePressed(prevQuestion);
}

function displayQuestion() {
    let questionP = select('#question');
    let currentQuestion = questions[currentQuestionIndex];
    questionP.html(currentQuestion.question);

    let answerButtonsDiv = select('#answer-buttons');
    answerButtonsDiv.html('');

    for (let option of options) {
        let button = createButton(option);
        button.mousePressed(() => checkAnswer(option));
        answerButtonsDiv.child(button);
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

function checkAnswer(selectedAnswer) {
    let currentQuestion = questions[currentQuestionIndex];
    let resultP = select('#result');

    if (selectedAnswer === currentQuestion.correctAnswer) {
        resultP.html("Correct!");
        resultP.style('color', 'green');
    } else {
        resultP.html("Incorrect. The correct answer is " + currentQuestion.correctAnswer + ".");
        resultP.style('color', 'red');
    }
}
