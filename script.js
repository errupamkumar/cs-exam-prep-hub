document.addEventListener('DOMContentLoaded', () => {
    const questionsContainer = document.getElementById('questions-container');
    const filterContainer = document.getElementById('filter-container');
    let allQuestions = [];

    // Fetch questions from the JSON file
    async function fetchQuestions() {
        try {
            const response = await fetch('questions.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allQuestions = await response.json();
            displayQuestions(allQuestions);
        } catch (error) {
            console.error("Could not fetch questions:", error);
            questionsContainer.innerHTML = "<p>Failed to load questions. Please try again later.</p>";
        }
    }

    // Display questions on the page
    function displayQuestions(questionsToDisplay) {
        questionsContainer.innerHTML = '';
        if (questionsToDisplay.length === 0) {
            questionsContainer.innerHTML = "<p>No questions found for this filter.</p>";
            return;
        }

        questionsToDisplay.forEach(q => {
            const card = document.createElement('div');
            card.className = 'question-card';
            card.setAttribute('data-id', q.id);

            const inputType = q.type === 'MSQ' ? 'checkbox' : 'radio';
            const optionsHTML = q.options.map((option, index) => {
                const optionLetter = String.fromCharCode(65 + index);
                return `
                    <div class="option">
                        <label for="q${q.id}_option${optionLetter}">
                            <input type="${inputType}" name="q${q.id}_options" id="q${q.id}_option${optionLetter}" value="${optionLetter}">
                            ${optionLetter}) ${option}
                        </label>
                    </div>
                `;
            }).join('');

            card.innerHTML = `
                <div class="source">[${q.exam}] - ${q.type}</div>
                <p class="question-text">${q.question}</p>
                <form class="options-form">${optionsHTML}</form>
                <button class="submit-btn">Submit</button>
                <div class="result-feedback"></div>
            `;
            questionsContainer.appendChild(card);
        });
    }

    // Handle filter button clicks
    filterContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            const filterValue = event.target.getAttribute('data-filter');
            if (filterValue === 'All') {
                displayQuestions(allQuestions);
            } else {
                const filteredQuestions = allQuestions.filter(q => q.exam === filterValue);
                displayQuestions(filteredQuestions);
            }
        }
    });

    // Handle answer submission
    questionsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('submit-btn')) {
            const card = event.target.closest('.question-card');
            const questionId = parseInt(card.getAttribute('data-id'));
            const questionData = allQuestions.find(q => q.id === questionId);
            const form = card.querySelector('.options-form');
            const resultDiv = card.querySelector('.result-feedback');
            
            const selectedOptions = Array.from(form.querySelectorAll('input:checked')).map(input => input.value);
            
            let isCorrect = false;
            if (questionData.type === 'MCQ') {
                isCorrect = selectedOptions.length === 1 && selectedOptions[0] === questionData.answer;
            } else { // MSQ
                isCorrect = selectedOptions.length === questionData.answer.length &&
                            selectedOptions.sort().every((value, index) => value === questionData.answer.sort()[index]);
            }
            
            // Provide feedback
            resultDiv.style.display = 'block';
            if (isCorrect) {
                resultDiv.classList.add('correct');
                resultDiv.innerHTML = `<p class="feedback-text">Correct!</p><p><strong>Explanation:</strong> ${questionData.explanation}</p>`;
            } else {
                resultDiv.classList.add('incorrect');
                const correctAnswerText = Array.isArray(questionData.answer) ? questionData.answer.join(', ') : questionData.answer;
                resultDiv.innerHTML = `<p class="feedback-text">Incorrect.</p><p><strong>Correct Answer:</strong> ${correctAnswerText}</p><p><strong>Explanation:</strong> ${questionData.explanation}</p>`;
            }

            // Highlight correct and incorrect choices
            const labels = form.querySelectorAll('label');
            labels.forEach(label => {
                const input = label.querySelector('input');
                const isSelected = selectedOptions.includes(input.value);
                const isAnswer = Array.isArray(questionData.answer) ? questionData.answer.includes(input.value) : questionData.answer === input.value;

                if (isAnswer) {
                    label.classList.add('correct-answer');
                }
                if (isSelected && !isAnswer) {
                    label.classList.add('incorrect');
                }
            });

            // Disable form
            form.querySelectorAll('input').forEach(input => input.disabled = true);
            event.target.disabled = true;
        }
    });

    // Initial load of questions
    fetchQuestions();
});
