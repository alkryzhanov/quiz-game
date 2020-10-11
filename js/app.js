let currentQuestion = document.querySelector('.question-current');
let answers = Array.from(document.querySelectorAll('.answer-text'));

let messageText = document.querySelector('.message-text');

const startBtn = document.querySelector('.start-game-btn');
const skipBtn = document.querySelector('.skip-btn');
// const showedElements = Array.from(document.querySelectorAll('.showed'));

let totalPrize = document.querySelector('.total-prize > span');
let currentRoundPrize = document.querySelector('.current-round-prize > span');
let availableQuestions = [];
let question = {};
let rightAnswer;
let initialPrizeValue = 0;
let initialCurrentPrizeValue = 100;
const double = 2;

const checkSkipBtn = () => {
    if (skipBtn.disabled) {
        skipBtn.disabled = false;
    }
};

const firstStart = () => {
    gameShow();
    startGame();
    startBtn.removeEventListener('click', firstStart);
    hideMessage();
};

const gameShow = () => {
    let elements = document.querySelectorAll('.game-show');

    elements.forEach(element => {
        element.classList.remove('hidden');
    });
};

const showMessage = (param) => {
    messageText.classList.remove('hidden');
    let amount = parseInt(totalPrize.textContent);

    param ? messageText.textContent = `Congratulations! You won ${amount}`
        : messageText.textContent = `Game over your prize is ${amount}`;
};
const hideMessage = () => {
    messageText.classList.add('hidden');
};

const gameHide = () => {
    let elements = document.querySelectorAll('.game-show');

    elements.forEach(element => {
        element.classList.add('hidden');
    });
};


const increaseCounter = () => {
    let totalVal = document.querySelector('.total-prize > span').textContent;
    let currentVal = document.querySelector('.current-round-prize > span').textContent;

    console.log(+currentVal);
    console.log(+totalVal);

    if (parseInt(currentVal) < 200) {
        totalPrize.textContent = parseInt(totalVal) + parseInt(currentVal);
        currentRoundPrize.textContent = parseInt(currentVal) * 2;
    } else {
        gameHide();
        showMessage(true);
        startBtn.addEventListener('click', firstStart);
        checkSkipBtn();
    }
};

const getQuestions = () => {
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    question = availableQuestions[questionIndex];
    console.log(question);
    currentQuestion.textContent = question.question;
    rightAnswer = question.correct;

    answers.forEach(answer => {
        const number = answer.dataset['number'];
        answer.textContent = question.content[number];
    });

    availableQuestions.splice(questionIndex, 1);
};

answers.forEach(answer => {
    answer.addEventListener('click', evt => {

        const selectedAnswer = parseInt(evt.target.dataset['number']);

        if (selectedAnswer === rightAnswer) {
            getQuestions();
            increaseCounter();
        } else {
            gameHide();
            showMessage(false);
            startBtn.addEventListener('click', firstStart);
            checkSkipBtn();
        }
    });
});

const startGame = () => {
    totalPrize.textContent = initialPrizeValue;
    currentRoundPrize.textContent = initialCurrentPrizeValue;

    availableQuestions = [...questions];
    console.log(availableQuestions);
    getQuestions();
};

skipBtn.addEventListener('click', () => {
    getQuestions();
    skipBtn.disabled = true;
});

startBtn.addEventListener('click', firstStart);

