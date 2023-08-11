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
        question: "Which is largest animal in the world?",
        answers: [
            {text:"shark", correct: false},
            {text:"Blue Whale", correct: false},
            {text:"Elephant", correct: false},
            {text:"Giraffe", correct: true}
        ]
    },
    {
        question: "Which is largest animal in the world?",
        answers: [
            {text:"shark", correct: false},
            {text:"Blue Whale", correct: false},
            {text:"Elephant", correct: true},
            {text:"Giraffe", correct: false}
        ]
    },
    {
        question: "Which is largest animal in the world?",
        answers: [
            {text:"shark", correct: true},
            {text:"Blue Whale", correct: false},
            {text:"Elephant", correct: false},
            {text:"Giraffe", correct: false}
        ]
    },
    {
        question: "Which is largest animal in the world?",
        answers: [
            {text:"shark", correct: false},
            {text:"Blue Whale", correct: true},
            {text:"Elephant", correct: false},
            {text:"Giraffe", correct: false}
        ]
    }
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
        button.innerHTML= ans.text;
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