let quizData;
let currentQuestionIndex = 0;
let score = 0;

fetch('question.json')
    .then(response => response.json())
    .then(data => {
        quizData = data;
        loadQuestion();
    })
    .catch(error => console.error('Error loading the JSON file:', error));

function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    const answersContainer = document.getElementById('answers-container');

    const currentQuestion = quizData.questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;

    answersContainer.innerHTML = '';
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer.answer;
        button.onclick = () => selectAnswer(answer.score);
        answersContainer.appendChild(button);
    });
}

function selectAnswer(selectedScore) {
    score += selectedScore;
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const scoreDisplay = document.getElementById('score-display');

    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    scoreDisplay.textContent = `あなたのスコアは ${score} です。`;
}