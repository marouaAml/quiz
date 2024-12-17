
const home = document.getElementById('home');
const info = document.getElementById('info');
const quiz = document.getElementById('quiz');
const resultat = document.getElementById('resultat');
const startQuiz = document.getElementById('startQuiz');
const startBtn = document.getElementById('startBtn');
const quitBtn = document.getElementById('quitBtn');
const nextBtn = document.getElementById('nextBtn');
const retryBtn = document.getElementById('retryBtn');
const exitBtn = document.getElementById('exitBtn');
const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector('.question-text');
const options = document.querySelector('.options');
const timerCount = document.getElementById('timerCount');
const scoreDisplay = document.getElementById('score');


const questions = [
  {
    question: "var a; typeof a;",
    options: ["undefined","NaN","true"],
    correct: 0,
  },
  {
    question: "var s = '1s'; s++;",
    options: ["true", "NaN","false",],
    correct: 1,
  },
  {
    question: "undefined == null",
    options: ["undefined","NaN","true"],
    correct: 2,
  },
  {
    question: "!!undefined",
    options: ["false","NaN","true"],
    correct: 0,
  },
  {
    question: "a = 3e+3; a++",
    options: ["3000","NaN","true"],
    correct: 0,
  },
];

let currentQuestion = 0;
let score = 0;
let timer;

// Fonction pour afficher une question
function loadQuestion() {
  const current = questions[currentQuestion];
  questionNumber.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
  questionText.textContent = current.question;
  options.innerHTML = '';
  current.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => selectAnswer(index);
    options.appendChild(button);
  });
  resetTimer();
}

// Gérer le minuteur
function resetTimer() {
  clearInterval(timer);
  let timeLeft = 15;
  timerCount.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerCount.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      showCorrectAnswer();
    }
  }, 1000);
}

// Gérer la sélection d'une réponse
function selectAnswer(index) {
  clearInterval(timer);
  const isCorrect = index === questions[currentQuestion].correct;
  if (isCorrect) score++;
  showCorrectAnswer();
}

// Afficher la réponse correcte
function showCorrectAnswer() {
  const buttons = options.querySelectorAll('button');
  buttons.forEach((button, index) => {
    if (index === questions[currentQuestion].correct) {
      button.style.backgroundColor = 'green';
    } else {
      button.style.backgroundColor = 'red';
    }
    button.disabled = true;
  });
  nextBtn.style.display = 'block';
}

// Navigation entre les questions
nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
    nextBtn.style.display = 'none';
  } else {
    showResults();
  }
};

// Afficher les résultats
function showResults() {
  quiz.style.display = 'none';
  resultat.style.display = 'block';
  scoreDisplay.textContent = score;
}

// Navigation depuis l'accueil
startQuiz.onclick = () => {
  home.style.display = 'none';
  info.style.display = 'block';
};

startBtn.onclick = () => {
  info.style.display = 'none';
  quiz.style.display = 'block';
  loadQuestion();
};

quitBtn.onclick = () => location.reload();
retryBtn.onclick = () => location.reload();
exitBtn.onclick = () => location.reload();

