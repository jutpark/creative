//the website has been iteratively designed using chatGPT to create a basic quiz system. From here I will be implementing the P5.js and data vis but the quiz functionally works. I'll need to add shuffling for questions once I have them. 
let questions = [
    { question: "Where is this tree?", correctAnswer: "College 9" },
    { question: "Where is this tree?", correctAnswer: "BSOE" },
    { question: "Where is this tree?", correctAnswer: "Crown" },
    { question: "Where is this tree?", correctAnswer: "Oakes/RCC" },
    { question: "Where is this tree?", correctAnswer: "Porter/Kresge" },
    { question: "Where is this tree?", correctAnswer: "Mchenry" },
    { question: "Where is this tree?", correctAnswer: "Cowell/Stevenson" },
    { question: "Where is this tree?", correctAnswer: "College 9/10" },
    { question: "Where is this tree?", correctAnswer: "Crown/Merrill" },
    { question: "Where is this tree?", correctAnswer: "BSOE" }
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
let correctAnswers = 0;
let dots = []; // Array to store positions of red dots

function setup() {
    createCanvas(400, 300);
    noLoop();
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

function draw() {
    background(255);

    // Draw the buttons manually (since p5's position doesn't actually affect the canvas)
    for (let i = 0; i < buttonPositions.length; i++) {
        fill(200);
        rect(buttonPositions[i].x, buttonPositions[i].y, 100, 30, 5);
        fill(0);
        textSize(12);
        textAlign(CENTER, CENTER);
        text(options[i], buttonPositions[i].x + 50, buttonPositions[i].y + 15);
    }

    // Draw all red dots
    for (let dot of dots) {
        fill(255, 0, 0);
        noStroke();
        ellipse(dot.x, dot.y, 10, 10);
    }
}

function mousePressed() {
    if (mouseY > 20 && mouseY < height) { // Ensure the click is within the canvas and not on the buttons or nav
        dots.push({ x: mouseX, y: mouseY });
        redraw();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        displayResult();
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
        correctAnswers++;
    } else {
        resultP.html("Incorrect. The correct answer is " + currentQuestion.correctAnswer + ".");
        resultP.style('color', 'red');
    }

    nextQuestion();
}

function displayResult() {
    let quizContainer = select('#quiz-container');
    quizContainer.html('');
    
    background(255);
    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Quiz Completed!", width / 2, height / 4);
    
    fill(0, 102, 153);
    rectMode(CENTER);
    let barWidth = 50;
    let barHeight = map(correctAnswers, 0, questions.length, 0, height / 2);
    rect(width / 2, height / 2, barWidth, -barHeight);
    
    textSize(16);
    text(correctAnswers + " out of " + questions.length + " correct", width / 2, (height / 2) + 20);
}
