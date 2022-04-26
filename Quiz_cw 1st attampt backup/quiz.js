const question = document.querySelector('#question');
const answers = Array.from(document.querySelectorAll('.choice-text'));
const stage = document.querySelector('#Stage');
const mark = document.querySelector('#score');
const MaxStage = document.querySelector('#MaxStage');
const SCORE = 20
const MAX_Q = 5

let currentQuestion = {};
let currentAnswer = true;
let score = 0;
let questionNum = 0;
let remainQuestion = [];
let questions = [
    {
        question: "In which year was the \"18-hole\" game created?",
        choice1: "1648",
        choice2: "1874",
        choice3: "1764",
        choice4: "2022",
        answer: 3,
    },
    {
        question: 'Which golf club is normally the longest?',
        choice1: "The 1-wood",
        choice2: "The 5-iron",
        choice3: "The 9-iron",
        choice4: "The Putter",
        answer: 1,
    },
    {
        question: "In golf, par is the predetermined number of strokes that a proficient golfer should require to complete a hole, you now finished a hole two strokes under the par, what term should you use for your score?",
        choice1: "Birdie",
        choice2: "Eagle",
        choice3: "Bogey",
        choice4: "Albatross",
        answer: 2,
    },
    {
        question: "How many golf clubs can you take with you in a normal match?",
        choice1: "99",
        choice2: "5",
        choice3: "12",
        choice4: "14",
        answer: 4,
    },
    {
        question: "Under what circumstances will a golfer be disqualified",
        answer1: "None of these",
        answer2: "A lost ball or a ball hit out of bounds",
        answer3: "Making a stroke at the wrong ball",
        answer4: "hitting a fellow player\'s ball if both balls lay on the green prior to the stroke",
        answer: 1,
    }
]

startQuiz = () => {
    questionNum = 0;
    score = 0;
    remainQuestion = [...questions];
    getNextQ();
}

getNextQ = () => {
    if(remainQuestion.length === 0 || questionNum > MAX_Q) {
        localStorage.setItem('recentScore', score);
        return window.location.assign('/end.html');
    }

    questionNum++

    const questionsIndex = Math.floor(Math.random() * remainQuestion.length);
    currentQuestion = remainQuestion[questionsIndex];
    questions.innerText = currentQuestion.question;

    answers.forEach(answer => {
      const number = answer.dataset['number'];
      answer.innerText = currentQuestion['answer' + number]
    })

    remainQuestion.splice(questionsIndex, 1)

    currentAnswer = true;
}

answers.forEach(answer => {
    answer.addEventListener('click', e => {
        if(!currentAnswer) return;

        currentAnswer = false;
        const userChoice = e.target;
        let verifyAnswer = userChoice.dataset['number'];

        if(verifyAnswer === 'correct') {
            scorePlus(SCORE);
        }

        userChoice.parentElement.classList.add(verifyAnswer);

        getNextQ();
    })
})

scorePlus = num => {
    score += num
    mark.innerText = SCORE
}