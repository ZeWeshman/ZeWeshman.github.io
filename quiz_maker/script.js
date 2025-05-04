
let timer;
let seconds = 0;
let questions = []; // Start with an empty array

function startQuiz() {
    if (questions.length === 0) {
        showInputField();
    } else {
        renderQuestions();
        let timeLimit = 0; // Mettre la limite de temps en secondes (0 pour désactiver)
        if (timeLimit > 0) {
            seconds = timeLimit;
            timer = setInterval(updateTimer, 1000);
        }
    }
}

function showInputField() {
    const quizContainer = document.getElementById('quiz-container');
    const inputDiv = document.createElement('div');
    inputDiv.innerHTML = `
        <h2>Entrez les questions en format JSON :</h2>
        <textarea id="questions-input" placeholder='[
{"question": "Question 1", "answers": ["Réponse 1", "Réponse 2"], "correctAnswerIndex": 0},
{"question": "Question 2", "type": "text", "correctAnswers": ["Réponse correcte"]}
]'></textarea>
        <button class="btn" onclick="loadQuestions()">Charger les questions</button>
    `;
    quizContainer.appendChild(inputDiv);
}

function loadQuestions() {
    const input = document.getElementById('questions-input').value;
    try {
        questions = JSON.parse(input);
        document.getElementById('quiz-container').innerHTML = ''; // Clear the input field
        startQuiz();
    } catch (e) {
        alert('Format JSON invalide. Veuillez réessayer.');
    }
}

function updateTimer() {
    seconds--;
    document.getElementById('timer').innerText = 'Temps restant: ' + seconds;
    if (seconds <= 0) {
        clearInterval(timer);
        validateQuiz();
    }
}

function renderQuestions() {
    const quizContainer = document.getElementById('quiz-container');
    questions.forEach((questionObj, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<p>${questionObj.question}</p>`;

        const questionType = questionObj.type || "multiple-choice";

        if (questionType === "multiple-choice") {
            const answersDiv = document.createElement('div');
            answersDiv.className = 'answers';
            questionObj.answers.forEach((answer, i) => {
                const label = document.createElement('label');
                label.innerHTML = `<input type="radio" name="q${index}" value="${i}"> ${answer}<br>`;
                answersDiv.appendChild(label);
            });
            questionDiv.appendChild(answersDiv);
        } else if (questionType === "text") {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = `q${index}`;
            input.style.resize = 'both'; // Allow resizing in both directions
            questionDiv.appendChild(input);
        }

        quizContainer.appendChild(questionDiv);
    });
}

function validateQuiz() {
    let score = 0;
    const questionsDivs = document.querySelectorAll('.question');
    questionsDivs.forEach((questionDiv, index) => {
        const questionObj = questions[index];
        const questionType = questionObj.type || "multiple-choice";
        let feedbackText = '';

        if (questionType === "multiple-choice") {
            const selectedAnswer = questionDiv.querySelector('input[type="radio"]:checked');
            const correctAnswerIndices = Array.isArray(questionObj.correctAnswerIndex) ? questionObj.correctAnswerIndex : [questionObj.correctAnswerIndex];
            if (selectedAnswer) {
                if (correctAnswerIndices.includes(parseInt(selectedAnswer.value))) {
                    score++;
                    questionDiv.querySelector(`input[value="${selectedAnswer.value}"]`).closest('label').classList.add('correct');
                    feedbackText = questionObj.feedback?.correct || '';
                } else {
                    selectedAnswer.closest('label').classList.add('wrong');
                    correctAnswerIndices.forEach(correctIndex => {
                        questionDiv.querySelector(`input[value="${correctIndex}"]`).closest('label').classList.add('correct');
                    });
                    feedbackText = questionObj.feedback?.incorrect || '';
                }
            } else {
                correctAnswerIndices.forEach(correctIndex => {
                    questionDiv.querySelector(`input[value="${correctIndex}"]`).closest('label').classList.add('correct');
                });
                feedbackText = questionObj.feedback?.incorrect || '';
            }
        } else if (questionType === "text") {
            const input = questionDiv.querySelector('input[type="text"]');
            if (questionObj.correctAnswers.map(ans => ans.toLowerCase().trim()).includes(input.value.toLowerCase().trim())) {
                score++;
                input.classList.add('correct');
                feedbackText = questionObj.feedback?.correct || '';
            } else {
                input.classList.add('wrong');
                questionObj.correctAnswers.forEach(correctAnswer => {
                    const correctAnswerElement = document.createElement('p');
                    correctAnswerElement.className = 'correct';
                    correctAnswerElement.innerText = `Réponse correcte: ${correctAnswer}`;
                    questionDiv.appendChild(correctAnswerElement);
                });
                feedbackText = questionObj.feedback?.incorrect || '';
            }
            input.disabled = true;
        }

        if (feedbackText) {
            const feedbackElement = document.createElement('p');
            feedbackElement.className = feedbackText.includes('Bien joué') || feedbackText.includes('Bonne réponse') ? 'correct' : 'wrong';
            feedbackElement.innerText = feedbackText;
            questionDiv.appendChild(feedbackElement);
        }

        questionDiv.querySelectorAll('input').forEach(input => input.disabled = true);
    });

    alert('Votre score: ' + score + '/' + questionsDivs.length);
}

function setMode(mode) {
    const body = document.body;
    const question = document.querySelector('.question')
    if (mode === 'dark') {
        body.style.backgroundColor = '#121212';
        body.style.color = '#ffffff';
        question.style.backgroundColor = '#1E1E1E';
        question.style.Color = '#BEBEBE';
    } else if (mode === 'grey') {
        body.style.backgroundColor = '#9f9f9f';
        body.style.color = '#FFFFFF';
        question.style.backgroundColor = '#1E1E1E';
        question.style.Color = '#BEBEBE';
    } else if (mode === 'light') {
        body.style.backgroundColor = '#ffffff';
        body.style.color = '#000000';
        question.style.backgroundColor = '#BEBEBE';
        question.style.Color = '#1E1E1E';
    }
}
