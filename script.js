//the website has been iteratively designed using chatGPT to create a basic quiz system. From here I will be implementing the P5.js and data vis but the quiz functionally works. I'll need to add shuffling for questions once I have them. 
let questions = [
    { question: "Where is this tree?", correctAnswer: 3, img: 'tree1.jpg' }, // College 9/10 button index
    { question: "Where is this tree?", correctAnswer: 2, img: 'tree2.jpeg' }, // BSOE button index
    { question: "Where is this tree?", correctAnswer: 4, img: 'tree1.jpg' }, // Crown/Merrill button index
    { question: "Where is this tree?", correctAnswer: 0, img: 'tree1.jpg' }, // Oakes/RCC button index
    { question: "Where is this tree?", correctAnswer: 1, img: 'tree1.jpg' }, // Porter/Kresge button index
    { question: "Where is this tree?", correctAnswer: 5, img: 'tree1.jpg' }, // Mchenry button index
    { question: "Where is this tree?", correctAnswer: 6, img: 'tree1.jpg' }, // Cowell/Stevenson button index
    { question: "Where is this tree?", correctAnswer: 3, img: 'tree1.jpg' }, // College 9/10 button index
    { question: "Where is this tree?", correctAnswer: 4, img: 'tree1.jpg' }, // Crown/Merrill button index
    { question: "Where is this tree?", correctAnswer: 2, img: 'tree1.jpg' } // BSOE button index
];

let options = ["Oakes/RCC", "Porter/Kresge", "BSOE", "College 9/10", "Crown/Merrill", "Mchenry", "Cowell/Stevenson"];
let buttonPositions = [
    { x: 30, y: 200 },
    { x: 150, y: 200 },
    { x: 270, y: 200 },
    { x: 30, y: 250 },
    { x: 150, y: 250 },
    { x: 270, y: 250 },
    { x: 150, y: 300 }
];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let dots = []; // Array to store positions of red dots

const distanceThreshold = 50; // Maximum distance to consider the answer correct

let resultMessage = '';
let resultColor = '';
let resultOpacity = 255;
let fadeOutTimer;
let currentImage;

function preload() {
    // Preload all images
    questions.forEach(q => {
        q.img = loadImage(q.img);
    });
}

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('canvas-container');
    displayQuestion();
}

function displayQuestion() {
    resultOpacity = 255; // Reset opacity
    currentImage = questions[currentQuestionIndex].img;
    redraw();
}

function draw() {
    background(255);

    // Draw the question image
    if (currentImage) {
        image(currentImage, 0, 0, width, height / 2); // Display the image at the top half of the canvas
    }

    // Draw the buttons
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

    // Display result message
    if (resultMessage) {
        fill(resultColor.levels[0], resultColor.levels[1], resultColor.levels[2], resultOpacity);
        textSize(16);
        textAlign(CENTER, CENTER);
        text(resultMessage, width / 2, height - 20);

        if (resultOpacity > 0) {
            resultOpacity -= 5; // Fade out effect
        }
    }

    // Display score
    fill(0);
    textSize(12);
    textAlign(RIGHT, TOP);
    text(`Score: ${correctAnswers}`, width - 10, 10);
}

function mousePressed() {
    if (mouseY > height / 2 && mouseY < height) { // Ensure the click is within the bottom half of the canvas
        let dot = { x: mouseX, y: mouseY };
        dots.push(dot);
        checkAnswer(dot);
        redraw();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        dots = []; // Clear dots for the next question
        displayQuestion();
    } else {
        displayResult();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        dots = []; // Clear dots for the previous question
        displayQuestion();
    }
}

function checkAnswer(dot) {
    let currentQuestion = questions[currentQuestionIndex];
    let correctButton = buttonPositions[currentQuestion.correctAnswer];
    let distance = dist(dot.x, dot.y, correctButton.x + 50, correctButton.y + 15); // Center of the button

    if (distance <= distanceThreshold) {
        resultMessage = "Correct!";
        resultColor = color('green');
        correctAnswers++;
    } else {
        resultMessage = "Incorrect. The correct answer is " + options[currentQuestion.correctAnswer] + ".";
        resultColor = color('red');
    }

    resultOpacity = 255;
    clearTimeout(fadeOutTimer);
    fadeOutTimer = setTimeout(() => {
        resultMessage = '';
        nextQuestion();
    }, 1000); // Clear result and move to next question after 1 second
}

function displayResult() {
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
