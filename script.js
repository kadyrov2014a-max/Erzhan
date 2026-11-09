
document.documentElement.classList.add("js-enabled");

// MOBILE MENU
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// MUSIC
const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.textContent = "♫";
      musicButton.title = "Выключить музыку";
    } catch {
      musicButton.title = "Добавьте аудиофайл background.mp3";
      alert("Добавьте свой аудиофайл в assets/audio/background.mp3");
    }
  } else {
    music.pause();
    musicButton.textContent = "♪";
    musicButton.title = "Включить музыку";
  }
});

// PHOTO LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".gallery-item img, .hero-photo img, .about-photo img")
  .forEach(img => {
    img.style.cursor = "zoom-in";

    img.addEventListener("click", () => {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;

      const caption = img.closest("figure")?.querySelector("figcaption");
      lightboxCaption.textContent = caption
        ? caption.textContent
        : img.alt;

      lightbox.showModal();
    });
  });

closeLightbox.addEventListener("click", () => lightbox.close());

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

// QUIZ
const questions = [
  {
    question: "What makes a good memory?",
    answers: ["Good people", "Expensive things", "Nothing"],
    correct: 0
  },
  {
    question: "What is the best adventure?",
    answers: ["Staying bored", "Discovering new places", "Doing nothing"],
    correct: 1
  },
  {
    question: "What belongs in this archive?",
    answers: ["Only serious things", "Memories and funny moments", "Homework"],
    correct: 1
  },
  {
    question: "What is the main character's energy?",
    answers: ["Main character energy", "Background NPC", "Unknown"],
    correct: 0
  },
  {
    question: "What comes next in the story?",
    answers: ["More adventures", "The end", "Nothing"],
    correct: 0
  }
];

const questionText = document.getElementById("questionText");
const answersBox = document.getElementById("answers");
const questionCounter = document.getElementById("questionCounter");
const progressFill = document.getElementById("progressFill");
const quizFeedback = document.getElementById("quizFeedback");
const nextButton = document.getElementById("nextQuestion");

let currentQuestion = -1;
let score = 0;
let answered = false;

function showQuestion() {
  currentQuestion++;
  answered = false;
  quizFeedback.textContent = "";
  answersBox.innerHTML = "";

  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  const question = questions[currentQuestion];

  questionCounter.textContent =
    `QUESTION ${currentQuestion + 1} / ${questions.length}`;

  progressFill.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  questionText.textContent = question.question;

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.textContent = answer;

    button.addEventListener("click", () => {
      if (answered) return;

      answered = true;
      const isCorrect = index === question.correct;

      if (isCorrect) {
        score++;
        button.classList.add("correct");
        quizFeedback.textContent = "Correct! ✨";
      } else {
        button.classList.add("wrong");
        quizFeedback.textContent =
          `Not quite! Correct answer: ${question.answers[question.correct]}`;
        answersBox.children[question.correct].classList.add("correct");
      }

      Array.from(answersBox.children).forEach(item => {
        item.disabled = true;
      });

      nextButton.hidden = false;
      nextButton.textContent =
        currentQuestion === questions.length - 1
          ? "See my result →"
          : "Next question →";
    });

    answersBox.appendChild(button);
  });

  nextButton.hidden = true;
}

function showResult() {
  questionCounter.textContent = "QUIZ COMPLETE";
  progressFill.style.width = "100%";
  answersBox.innerHTML = "";
  quizFeedback.textContent = "";

  questionText.textContent =
    `Your score: ${score} / ${questions.length} ⭐`;

  const result = document.createElement("p");
  result.textContent =
    score === 5
      ? "Perfect! You know this archive inside out!"
      : score >= 3
        ? "Pretty good! You know a thing or two!"
        : "Time to explore the archive again!";

  result.style.marginTop = "15px";
  result.style.fontWeight = "800";
  answersBox.appendChild(result);

  nextButton.hidden = false;
  nextButton.textContent = "Try again ↻";
  nextButton.onclick = () => {
    currentQuestion = -1;
    score = 0;
    nextButton.onclick = null;
    showQuestion();
  };
}

nextButton.addEventListener("click", () => {
  if (currentQuestion === -1) {
    showQuestion();
  } else if (currentQuestion < questions.length - 1) {
    showQuestion();
  } else if (currentQuestion === questions.length - 1 && answered) {
    showQuestion();
  }
});

// SECRET MESSAGE
const secretButton = document.getElementById("secretButton");
const secretMessage = document.getElementById("secretMessage");

secretButton.addEventListener("click", () => {
  const isHidden = secretMessage.hidden;
  secretMessage.hidden = !isHidden;
  secretButton.textContent = isHidden
    ? "Close the note ✉"
    : "Open the note ✉";
});

// SCROLL REVEAL
const revealElements = document.querySelectorAll(".section, .stats");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08
  });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}
