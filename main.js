let score = 1;
let socialScore = 3;
let scoreNumber = document.querySelector('.scoreNumber');
let startOverBtn = document.querySelector('.start-over-btn')


function getById(id) {
    return document.getElementById(id);
}


window.smoothScrollTo = (function () {
    var timer, start, factor;

    return function (target, duration) {
        var offset = window.pageYOffset,
            delta = target - window.pageYOffset; // Y-offset difference
        duration = duration || 1000;              // default 1 sec animation
        start = Date.now();                       // get start time
        factor = 0;

        if (timer) {
            clearInterval(timer); // stop any running animations
        }

        function step() {
            var y;
            factor = (Date.now() - start) / duration; // get interpolation factor
            if (factor >= 1) {
                clearInterval(timer); // stop animation
                factor = 1;           // clip to max 1.0
            }
            y = factor * delta + offset;
            window.scrollBy(0, y - window.pageYOffset);
        }

        timer = setInterval(step, 10);
        return timer;
    };
}());

function showBtns(element) {
    let value = document.getElementById(element).getAttribute('id');
    let nextStep = getById('' + value.substr(0, value.length - 8) + '');
    nextStep.classList.add('active')
    setTimeout(() => {
        scroll(nextStep);
    }, 500)
    startOverFixed.style.display = 'flex';
    startOverBtn.style.display = 'flex';
}

function scroll(elem) {
    elem.scrollIntoView({block: "center", behavior: "smooth"});
}

function showNextStep(element) {
    let value = document.getElementById(element).getAttribute('id');
    let nextStep = getById('' + value.substr(0, value.length - 8) + '');
    nextStep.style.display = 'flex';
    setTimeout(() => {
        scroll(nextStep);
    }, 500)
    // if (window.innerWidth < 768) {
    //     smoothScrollTo(window.innerHeight + 500, 1500);
    //     console.log(innerWidth)
    // } else{
    //     smoothScrollTo(window.innerHeight, 2000);
    //     console.log(innerWidth + ' mob')
    // }
    startOverFixed.style.display = 'flex';
    startOverBtn.style.display = 'flex';
}


function removeBlocks() {
    const questions = [...document.querySelectorAll('.questions')];
    for (let i = 1; i < questions.length; i++) {
        questions[i].style.display = 'none';
    }
}

function removeStyles() {
    const allques = [...document.querySelectorAll('.question')];
    for (let i = 0; i < allques.length; i++) {
        allques[i].classList.remove('false', 'true', 'disable')
    }
    startOverFixed.style.display = 'none';
    startOverBlock.style.display = 'none';
}


let startOverBlock = document.querySelector('.btn-block')
let startOverFixed = document.querySelector('.start-over-fixed')
let startOver = document.querySelector('.start-over-btn')

let popup = document.querySelector('.popup');
let share = document.querySelector('.share-btn');


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


startOverFixed.addEventListener('click', (target) => {
    scroll(document.querySelector('.hero__container'))
    setTimeout(() => {
        removeStyles();
        removeBlocks();
    }, 1000)

})

startOver.addEventListener('click', (target) => {
    scroll(document.querySelector('.hero__container'))
    setTimeout(() => {
        removeStyles();
        removeBlocks();
    }, 1000)
})

document.addEventListener('click', ({target}) => {
    // Определяю какой блок имеет data-question="true|false" и даю нужный класс
    if (!event.target.classList.contains('question')) return;

    const question = target.closest('.question');

    if (question.getAttribute('data-question') === 'false') {
        question.classList.add('false')

        startOverFixed.style.display = 'flex';
    } else if (question.getAttribute('data-question') === 'true') {
        question.classList.add('true');
        score++;
    }

    // Определяю какой блок имеет data-question="true" и даю противоположному блоку класс дизэйбл
    let container = target.closest('.questions');
    let check = container.querySelectorAll('.question');
    for (i = 0; i < check.length; i++) {
        if (target.getAttribute('data-question') === 'false' && check[0].getAttribute('data-question') === 'false') {
        } else if (target.getAttribute('data-question') === 'true' && check[1].getAttribute('data-question') === 'false') {
            check[1].classList.add('disable')
        } else if (target.getAttribute('data-question') === 'true' && check[0].getAttribute('data-question') === 'false') {
            check[0].classList.add('disable')
        }
    }
});

function removeStartOver() {
    window.onscroll = function (ev) {
        if ((window.innerHeight + window.scrollY + 100) >= document.body.scrollHeight) {
            startOverFixed.style.display = 'none'
        }
    };
}