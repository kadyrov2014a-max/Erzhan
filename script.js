

/* =================================
   ERZHAN™ — INTERACTIVE FEATURES
   ================================= */


/* MOBILE NAVIGATION */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


/* QUIZ QUESTIONS
   Change questions and answers whenever you want.
*/

const questions = [
    {
        question: "What makes Erzhan unforgettable?",
        answers: [
            "His personality",
            "His adventures",
            "His sense of humour",
            "All of the above"
        ],
        correct: 3
    },
    {
        question: "What is this website dedicated to?",
        answers: [
            "A random person",
            "Erzhan and his memories",
            "A travel company",
            "A school project"
        ],
        correct: 1
    },
    {
        question: "What can you find in the archive?",
        answers: [
            "Photographs",
            "Stories",
            "Memories",
            "All of the above"
        ],
        correct: 3
    },
    {
        question: "What is the unofficial motto?",
        answers: [
            "Stay ordinary",
            "A whole character",
            "No more adventures",
            "Forget everything"
        ],
        correct: 1
    },
    {
        question: "What should Erzhan always remember?",
        answers: [
            "Keep making memories",
            "Stop having adventures",
            "Be someone else",
            "Forget the good times"
        ],
        correct: 0
    }
];


let currentQuestion = 0;
let score = 0;
let answered = false;

const quizContainer = document.getElementById("quiz-container");
const questionCounter = document.getElementById("question-counter");
const scoreDisplay = document.getElementById("score-display");

const startButton = document.getElementById("start-quiz");


/* START QUIZ */

startButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;

    scoreDisplay.textContent = "SCORE: 0";

    showQuestion();
});


/* DISPLAY QUESTION */

function showQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    questionCounter.textContent =
        `QUESTION ${currentQuestion + 1} / ${questions.length}`;

    quizContainer.innerHTML = `
        <h3>${question.question}</h3>

        <div class="answer-list">
            ${question.answers.map((answer, index) => `
                <button class="answer-button" data-index="${index}">
                    ${String.fromCharCode(65 + index)}.
                    ${answer}
                </button>
            `).join("")}
        </div>

        <p class="answer-feedback" id="answer-feedback"
           aria-live="polite"></p>
    `;

    quizContainer.querySelectorAll(".answer-button").forEach(button => {
        button.addEventListener("click", () => {
            checkAnswer(Number(button.dataset.index));
        });
    });
}


/* CHECK ANSWER */

function checkAnswer(selected) {

    if (answered) return;

    answered = true;

    const question = questions[currentQuestion];
    const buttons = quizContainer.querySelectorAll(".answer-button");
    const feedback = document.getElementById("answer-feedback");

    const isCorrect = selected === question.correct;

    if (isCorrect) {
        score++;
        feedback.textContent = "CORRECT! Nice one.";
    } else {
        feedback.textContent =
            "Not quite! The correct answer is: " +
            question.answers[question.correct];
    }

    scoreDisplay.textContent = `SCORE: ${score}`;

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === question.correct) {
            button.style.borderColor = "#a5c99c";
        }
    });

    const nextButton = document.createElement("button");

    nextButton.className = "button";
    nextButton.style.marginTop = "20px";

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "SEE MY RESULT ↗"
            : "NEXT QUESTION ↗";

    nextButton.addEventListener("click", () => {

        currentQuestion++;

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }

    });

    quizContainer.appendChild(nextButton);
}


/* FINAL RESULT */

function showResult() {

    questionCounter.textContent = "TEST COMPLETED";

    let message = "";

    if (score === 5) {
        message = "LEGENDARY! You know the archive perfectly.";
    } else if (score >= 3) {
        message = "IMPRESSIVE! You know quite a lot.";
    } else {
        message = "THE ARCHIVE REMAINS A MYSTERY.";
    }

    quizContainer.innerHTML = `
        <h3>${score} / ${questions.length}</h3>

        <p>${message}</p>

        <button class="button" id="restart-quiz">
            TRY AGAIN ↗
        </button>
    `;

    document.getElementById("restart-quiz")
        .addEventListener("click", () => {
            currentQuestion = 0;
            score = 0;
            scoreDisplay.textContent = "SCORE: 0";
            showQuestion();
        });
}


/* SECRET MESSAGE */

const secretButton = document.getElementById("secret-button");
const secretMessage = document.getElementById("secret-message");

secretButton.addEventListener("click", () => {

    const isHidden = secretMessage.hidden;

    secretMessage.hidden = !isHidden;

    secretButton.textContent = isHidden
        ? "HIDE MESSAGE ↑"
        : "REVEAL MESSAGE ↗";

});
