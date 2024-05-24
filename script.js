//the website has been iteratively designed using chatGPT to create a basic quiz system. From here I will be implementing the P5.js and data vis but the quiz functionally works. I'll need to add shuffling for questions once I have them. 
let questions = [
    {
        question: "Where is this tree?",
        correctAnswer: "College 9"
    },
    {
        question: "Where is this tree?",
        correctAnswer: "BSOE"
    },
    {
        question: "Where is this tree?",
        correctAnswer: "Crown"
    }
];

let options = ["Oakes/RCC", "Porter/Kresge", "BSOE", "College 9/10", "Crown/Merrill", "Mchenry", "Cowell/Stevenson"];
let buttonPositions = [
    { x: -20, y: 30 },
    { x: 200, y: 30 },
    { x: 270, y: 30 },
    { x: 20, y: 80 },
    { x: 200, y: 80 },
    { x: 270, y: 80 },
    { x: 20, y: 130 }
];
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

    for (let i = 0; i < options.length; i++) {
        let button = createButton(options[i]);
        button.position(buttonPositions[i].x, buttonPositions[i].y);
        button.addClass('answer-button');
        button.mousePressed(() => checkAnswer(options[i]));
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
