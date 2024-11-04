// Questions and possible answer options
const questions = [
    { target: 5, options: [1, 2, 3, 4, 5] },
    { target: 7, options: [2, 3, 4, 5, 6] },
    { target: 10, options: [3, 5, 7, 8, 2] },
    { target: 8, options: [1, 4, 5, 3, 6] },
    { target: 6, options: [2, 3, 4, 5, 1] },
    { target: 9, options: [3, 6, 2, 5, 4] },
    { target: 11, options: [4, 6, 7, 5, 1] },
    { target: 12, options: [3, 9, 6, 4, 8] },
    { target: 13, options: [5, 8, 4, 7, 6] },
    { target: 15, options: [7, 8, 9, 6, 5] }
];

let currentQuestion = 0;
let selectedNumbers = [];
let correctAnswers = 0;

function startGame() {
    showQuestion();
    updateScore();
}

function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question').innerText = `Pick 2 numbers that add up to ${question.target}`;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    question.options.forEach(number => {
        const div = document.createElement('div');
        div.classList.add('option');
        div.innerText = number;
        div.onclick = () => selectNumber(div, number);
        optionsContainer.appendChild(div);
    });

    document.getElementById('result').innerText = '';
    document.getElementById('next-btn').style.display = 'none';
    selectedNumbers = [];
}

function selectNumber(div, number) {
    if (selectedNumbers.length < 2) {
        selectedNumbers.push({ div, number });
        div.classList.add('selected');
        if (selectedNumbers.length === 2) {
            checkAnswer();
        }
    }
}

function checkAnswer() {
    const question = questions[currentQuestion];
    const resultDiv = document.getElementById('result');

    if (selectedNumbers[0].number + selectedNumbers[1].number === question.target) {
        resultDiv.innerText = "Correct! 🎉";
        resultDiv.style.color = "green";
        correctAnswers++;
        selectedNumbers.forEach(({ div }) => div.classList.add('correct'));
        document.getElementById('next-btn').style.display = 'inline';
        updateScore();
    } else {
        resultDiv.innerText = "Wrong! Try Again.";
        resultDiv.style.color = "red";
        selectedNumbers.forEach(({ div }) => div.classList.add('wrong'));
        selectedNumbers = [];
        setTimeout(() => {
            document.querySelectorAll('.option').forEach(option => option.classList.remove('selected', 'wrong'));
        }, 500);
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        document.getElementById('question').innerText = "Great job! You completed all questions.";
        document.getElementById('options').innerHTML = '';
        document.getElementById('next-btn').style.display = 'none';
    }
}

function updateScore() {
    document.getElementById('score').innerText = `Correct Answers: ${correctAnswers}`;
}

startGame();
