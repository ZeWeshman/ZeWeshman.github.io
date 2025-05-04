const dynamicFields = document.getElementById('dynamicFields');
        const questionType = document.getElementById('questionType');
        const questionText = document.getElementById('questionText');
        const output = document.getElementById('output');
        const feedbackCorrect = document.getElementById('feedbackCorrect');
        const feedbackIncorrect = document.getElementById('feedbackIncorrect');
        const generateButton = document.getElementById('generateQuestion');
        const removeLastButton = document.getElementById('removeLastQuestion');
        const copyButton = document.getElementById('copyQuestion');
        const clearInputsButton = document.getElementById('clearInputs');

        let questions = []; // List of generated questions

        function updateFields() {
            const type = questionType.value;
            let fields = '';

            if (type === 'texte') {
                fields = `
          <div class="form-group">
            <label for="correctAnswers">Réponses justes (séparés par virgules) :</label>
            <input type="text" id="correctAnswers">
          </div>
          <div class="form-group">
            <label for="caseSensitive">Sensible à la casse ?</label>
            <input type="checkbox" id="caseSensitive">
          </div>
        `;
            } else if (type === 'choixMultiple') {
                fields = `
          <div class="form-group">
            <label for="options">Réponses proposées (séparées par virgules) :</label>
            <input type="text" id="options">
          </div>
          <div class="form-group">
            <label for="correctIndexes">Indexes des réponses justes (séparés par virgules) :</label>
            <input type="text" id="correctIndexes">
          </div>
        `;
            }

            dynamicFields.innerHTML = fields;
        }

        function generateQuestion() {
            const type = questionType.value;
            const feedback = {};
            const correctFeedback = feedbackCorrect.value.trim();
            const incorrectFeedback = feedbackIncorrect.value.trim();

            if (correctFeedback) feedback.correct = correctFeedback;
            if (incorrectFeedback) feedback.incorrect = incorrectFeedback;

            let question = { question: questionText.value.trim() };

            if (type === 'texte') {
                const correctAnswers = document.getElementById('correctAnswers').value.split(',').map(ans => ans.trim());
                const caseSensitive = document.getElementById('caseSensitive').checked;

                question.type = "text";
                question.correctAnswers = correctAnswers;

                if (caseSensitive) {
                    question.caseSensitive = true;
                }
            } else if (type === 'choixMultiple') {
                const options = document.getElementById('options').value.split(',').map(opt => opt.trim());
                const correctIndexes = document.getElementById('correctIndexes').value.split(',').map(idx => parseInt(idx.trim()));

                question.answers = options;
                question.correctAnswerIndex = correctIndexes.length === 1 ? correctIndexes[0] : correctIndexes;
            }

            if (Object.keys(feedback).length) question.feedback = feedback;

            questions.push(question);
            updateOutput();
        }

        function updateOutput() {
            output.textContent = JSON.stringify(questions, null, 4);
        }

        function removeLastQuestion() {
            if (questions.length > 0) {
                questions.pop();
                updateOutput();
            }
        }

        function clearInputs() {
            document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
            document.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);
            updateFields(); // Reset dynamic fields
        }

        function copyToClipboard() {
            navigator.clipboard.writeText(output.textContent).then(() => {
                alert("Questions copiées dans le presse-papiers !");
            });
        }

        function setMode(mode) {
            const body = document.body;
            const container = document.querySelector('.container');
            if (mode === 'dark') {
                body.style.backgroundColor = '#121212';
                body.style.color = '#ffffff';
                container.style.backgroundColor = '#121212';
            } else if (mode === 'grey') {
                body.style.backgroundColor = '#9f9f9f';
                body.style.color = '#FFFFFF';
                container.style.backgroundColor = '#9f9f9f';
            } else if (mode === 'light') {
                body.style.backgroundColor = '#ffffff';
                body.style.color = '#000000';
                container.style.backgroundColor = '#ffffff';
            }
        }

        questionType.addEventListener('change', updateFields);
        generateButton.addEventListener('click', generateQuestion);
        removeLastButton.addEventListener('click', removeLastQuestion);
        copyButton.addEventListener('click', copyToClipboard);
        clearInputsButton.addEventListener('click', clearInputs);
        updateFields(); // Initialize fields on load