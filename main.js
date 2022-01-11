let score = 1;
let socialScore = 3;
let scoreNumber = document.querySelector('.scoreNumber');

function getById(id) {
    return document.getElementById(id);
}

function showNextStep(element) {
    var value = document.getElementById(element).getAttribute('id');
    var nextStep = getById('' + value.substr(0, value.length - 8) + '');
    nextStep.style.display = 'flex';
}


function removeBlocks() {
    const questions = [...document.querySelectorAll('.questions')];
    for(let i = 1; i < questions.length; i++){
        questions[i].style.display = 'none';
    }
}

function removeStyles() {
    const allques = [...document.querySelectorAll('.question')];
    for(let i = 0; i < allques.length; i++){
        allques[i].classList.remove('false','true')
    }
}


let startOverBtn = document.querySelector('.start-over-btn')

startOverBtn.addEventListener('click', (target) => {
    removeStyles();
    removeBlocks();
})


document.addEventListener('click', ({target}) => {
    if (!event.target.classList.contains('question')) return;

    const question = target.closest('.question');

    if (question.getAttribute('data-question') === 'false') {
        question.classList.add('false')
    } else if (question.getAttribute('data-question') === 'true') {
        question.classList.add('true');
        score++;
    }
});


