document.addEventListener('DOMContentLoaded', () => {
    // Array of question objects
    const questions = [
        {
            source: 'GATE CSE 2023',
            type: 'MCQ',
            question: 'What is the time complexity of the best-case scenario for Bubble Sort?',
            options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(1)'],
            correctAnswer: 'C',
            explanation: 'The best-case scenario for Bubble Sort occurs when the array is already sorted. In this case, the algorithm makes only one pass through the array (n-1 comparisons) to check if it is sorted, resulting in a time complexity of O(n).'
        },
        {
            source: 'ISRO Scientist 2022',
            type: 'MCQ',
            question: 'Which of the following is not a layer in the TCP/IP model?',
            options: ['Application Layer', 'Transport Layer', 'Session Layer', 'Internet Layer'],
            correctAnswer: 'C',
            explanation: 'The TCP/IP model consists of four layers: Application, Transport, Internet, and Network Access (or Link) Layer. The Session Layer is part of the OSI model, not the TCP/IP model.'
        },
        {
            source: 'BPSC TRE 2.0',
            type: 'MSQ',
            question: 'Which of the following are valid IP addresses? (Select all that apply)',
            options: ['192.168.1.256', '127.0.0.1', '255.255.255.0', '1.2.3'],
            correctAnswer: 'B, C',
            explanation: 'An IP address consists of four octets, with each octet ranging from 0 to 255. A) is invalid because 256 is out of range. B) is the loopback address. C) is a valid subnet mask. D) is invalid as it only has three octets.'
        },
        {
            source: 'TCS NQT 2024',
            type: 'MCQ',
            question: 'In object-oriented programming, what is encapsulation?',
            options: ['The ability of an object to take on many forms.', 'The bundling of data with the methods that operate on that data.', 'The process of defining one class from another class.', 'The process of hiding complexity behind a simple interface.'],
            correctAnswer: 'B',
            explanation: 'Encapsulation is one of the fundamental principles of OOP. It refers to the bundling of data (attributes) and methods (functions) that operate on the data into a single unit or class. It is often used to hide the internal state of an object from the outside.'
        },
        {
            source: 'Infosys Certification',
            type: 'MCQ',
            question: 'Which SQL statement is used to extract data from a database?',
            options: ['GET', 'OPEN', 'SELECT', 'EXTRACT'],
            correctAnswer: 'C',
            explanation: 'The `SELECT` statement is the standard SQL command used to query a database and retrieve data that matches criteria that you specify.'
        }
    ];

    const questionsContainer = document.getElementById('questions-container');

    // Function to load questions into the DOM
    function loadQuestions() {
        if (!questionsContainer) return;

        questions.forEach((q, index) => {
            const card = document.createElement('div');
            card.className = 'question-card';

            const optionsHTML = q.options.map((option, i) =>
                `<li>${String.fromCharCode(65 + i)}) ${option}</li>`
            ).join('');

            card.innerHTML = `
                <div class="source">[${q.source}] - ${q.type}</div>
                <p class="question-text">${index + 1}. ${q.question}</p>
                <ul class="options-list">${optionsHTML}</ul>
                <button class="toggle-answer-btn" data-question-id="${index}">Show Answer</button>
                <div class="answer-explanation" id="answer-${index}">
                    <p class="correct-answer">Correct Answer: ${q.correctAnswer}</p>
                    <p><strong>Explanation:</strong> ${q.explanation}</p>
                </div>
            `;

            questionsContainer.appendChild(card);
        });
    }

    // Event listener for toggling answers
    questionsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('toggle-answer-btn')) {
            const questionId = event.target.dataset.questionId;
            const answerDiv = document.getElementById(`answer-${questionId}`);
            const button = event.target;

            if (answerDiv.style.display === 'block') {
                answerDiv.style.display = 'none';
                button.textContent = 'Show Answer';
            } else {
                answerDiv.style.display = 'block';
                button.textContent = 'Hide Answer';
            }
        }
    });

    // Initial load of questions
    loadQuestions();
});