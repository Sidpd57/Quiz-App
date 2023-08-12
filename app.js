const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            {text:"shark", correct: false},
            {text:"Blue Whale", correct: true},
            {text:"Elephant", correct: false},
            {text:"Giraffe", correct: false}
        ]
    },
    {
        question: "Who was the first to observe Saturn with a telescope?",
        answers: [
            {text:"Galileo Galilei", correct: true},
            {text:"Issac Newton", correct: false},
            {text:"Jacques Cassini", correct: false},
            {text:"David H. Levy", correct: false}
        ]
    },
    {
        question: "Which among the following is not a local wind?",
        answers: [
            {text:"Sirocco", correct: false},
            {text:"Punas", correct: false},
            {text:"Mistral", correct: false},
            {text:"Kikuyu", correct: true}
        ]
    },
    {
        question: "Which is the earliest stage of the Big Bang epoch ?",
        answers: [
            {text:"Planck epoch", correct: true},
            {text:"Unification epoch", correct: false},
            {text:"Inflationary epoch", correct: false},
            {text:"Electroweak epoch", correct: false}
        ]
    },
    {
        question: "The Isthmus of Potidea is located in which continent?",
        answers: [
            {text:"Asia", correct: false},
            {text:"Africa", correct: false},
            {text:"Europe", correct: true},
            {text:"North America", correct: false}
        ]
    },
];

const questionElement = document.querySelector('.question')
const answerBtn = document.querySelector('.answers')
const nextBtn = document.querySelector('.next-btn')

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex=0
    score=0
    nextBtn.textContent='next'
    showQuestion()
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex+1
    questionElement.textContent = questionNo+'. '+currentQuestion.question
    
    currentQuestion.answers.forEach(ans => {
        const button = document.createElement('button')
        button.textContent= ans.text;
        button.classList.add('btn')
        answerBtn.appendChild(button)
        if(ans.correct){
            button.dataset.correct=ans.correct
        }
        button.addEventListener('click', selectAnswer)
    })
}

function resetState(){
    nextBtn.style.display = 'none'
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct ==='true'
    if(isCorrect) {
        score++;
        selectedBtn.classList.add('correct')
    }else {
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerBtn.children).forEach(button=>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled =true;
    })
    nextBtn.style.display = 'block'
}



function showScore(){
    resetState()
    questionElement.textContent = `you scored ${score} out of ${questions.length}!`
    nextBtn.textContent= 'play again'
    nextBtn.style.display = 'block'
}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex< questions.length){
        showQuestion()
    }else {
        showScore()
    }
}
 
nextBtn.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else {
        startQuiz()
    }
})

startQuiz()