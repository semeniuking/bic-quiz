let startOverBtn = document.querySelector('.start-over-btn')


function getById(id) {
    return document.getElementById(id);
}

//Finds y value of given object
function findPos(obj) {
    let currentTop = 0;
    if (obj.offsetParent) {
        do {
            currentTop += obj.offsetTop;
        } while (obj === obj.offsetParent);
        return [currentTop];
    }
}

function showButtons(element) {
    let value = document.getElementById(element).getAttribute('id');
    let nextStep = getById('' + value.substr(0, value.length - 8) + '');
    let nextStepId = nextStep.getAttribute('id')
    if (window.innerWidth < 768) {
        smoothScroll({
            preventUserScroll: 'false',
            duration: '500',
            block: '20%',
            toElement: document.getElementById(element)
        });
    }
    setTimeout(() => {
        smoothScroll({
            preventUserScroll: 'false',
            duration: '500',
            block: 'end',
            toElement: document.getElementById(nextStepId)
        });
    }, 5000)
    startOverBlock.style.display = 'block';
    startOverFixed.style.display = 'flex';
    startOverBtn.style.display = 'flex';
}

function scrollToThe(elem) {
    elem.scrollIntoView({block: "center", behavior: "smooth"});
}

function showNextStep(element) {
    let value = document.getElementById(element).getAttribute('id');
    let nextStep = getById('' + value.substr(0, value.length - 8) + '');
    let nextStepId = nextStep.getAttribute('id')
    console.log(nextStepId)
    nextStep.style.display = 'block';
    if (window.innerWidth < 768) {
        smoothScroll({
            preventUserScroll: 'false',
            duration: '500',
            block: '20%',
            toElement: document.getElementById(element)
        });
    }
    setTimeout(() => {
        smoothScroll({
            preventUserScroll: 'false',
            duration: '500',
            block: 'end',
            toElement: document.getElementById(nextStepId)
        });
    }, 5000)
    startOverFixed.style.display = 'flex';
    startOverBtn.style.display = 'flex';
}

function scrollToBottom(element) {
    setTimeout(() => {
        smoothScroll({
            preventUserScroll: 'false',
            duration: '500',
            block: 'end',
            toElement: document.getElementById(element),
        });
    }, 200)
}

function removeBlocks() {
    const questions = [...document.querySelectorAll('.questions')];
    for (let i = 1; i < questions.length; i++) {
        questions[i].style.display = 'none';
    }
}

function removeStyles() {
    const allQues = [...document.querySelectorAll('.questions__item')];
    for (let i = 0; i < allQues.length; i++) {
        allQues[i].classList.remove('false', 'true', 'disable')
    }
    startOverFixed.style.display = 'none';
    startOverBlock.style.display = 'none';
}


let startOverBlock = document.querySelector('#final-q')
let startOverFixed = document.querySelector('.start-over-fixed')
let startOver = document.querySelector('.start-over-btn')

const popups = [...document.getElementsByClassName('share-btn')];

window.addEventListener('click', ({target}) => {
    const popup = target.closest('.share-btn');
    const clickedOnClosedPopup = popup && !popup.classList.contains('opened');
    const clickedOnOpenedPopup = popup && popup.classList.contains('opened');


    popups.forEach(p => {
            if (target.closest('.share-btn') && popup.classList.contains('opened')) {
            } else {
                p.classList.remove('opened')
            }
        }
    );
    if (clickedOnOpenedPopup) popup.classList.add('opened');
    if (clickedOnClosedPopup) popup.classList.add('opened');
});


startOverFixed.addEventListener('click', () => {
    let startBlock = document.querySelector('.challenge-block');
    scrollToThe(startBlock)

    setTimeout(() => {
        removeStyles();
        removeBlocks();
    }, 1000)

})

startOver.addEventListener('click', () => {
    let startBlock = document.querySelector('.challenge-block');
    scrollToThe(startBlock)
    setTimeout(() => {
        removeStyles();
        removeBlocks();
    }, 1000)
})

document.addEventListener('click', ({target}) => {
    // Определяю какой блок имеет data-question="true|false" и даю нужный класс

    if (!target.classList.contains('question')) return;

    const question = target.closest('.question').parentNode;

    if (question.getAttribute('data-question') === 'false') {
        question.classList.add('false')

        startOverFixed.style.display = 'flex';
    } else if (question.getAttribute('data-question') === 'true') {
        question.classList.add('true');
    }

    // Определяю какой блок имеет data-question="true" и даю противоположному блоку класс дизэйбл
    let container = target.closest('.questions__container');
    let check = container.querySelectorAll('.questions__item');
    let checkParent = target.parentNode;

    for (i = 0; i < check.length; i++) {
        if (checkParent.getAttribute('data-question') === 'false' && check[0].getAttribute('data-question') === 'false') {
        } else if (checkParent.getAttribute('data-question') === 'true' && check[1].getAttribute('data-question') === 'false') {
            check[1].classList.add('disable')
        } else if (checkParent.getAttribute('data-question') === 'true' && check[0].getAttribute('data-question') === 'false') {
            check[0].classList.add('disable')
        }
    }
});

function removeStartOver() {
    window.onscroll = function () {
        if ((window.innerHeight + window.scrollY + 400) >= document.body.scrollHeight) {
            startOverFixed.style.display = 'none'
        } else {
            startOverFixed.style.display = 'flex'
        }
    };
}

//
// function scrollToBottom() {
//     if (window.innerWidth < 768) {
//         window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
//         console.log('smh')
//
//     } else {
//         console.log('expected outcome')
//     }
// }