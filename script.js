let correctAnswer = "Paris";

function setup() {
    noCanvas();

    let submitBtn = select('#submit-btn');
    submitBtn.mousePressed(checkAnswer);
}

function checkAnswer() {
    let dropdown = select('#answer-dropdown');
    let selectedAnswer = dropdown.value();

    let resultP = select('#result');

    if (selectedAnswer === "default") {
        resultP.html("Please select an answer.");
        resultP.style('color', 'orange');
    } else if (selectedAnswer === correctAnswer) {
        resultP.html("Correct!");
        resultP.style('color', 'green');
    } else {
        resultP.html("Incorrect. The correct answer is " + correctAnswer + ".");
        resultP.style('color', 'red');
    }
}