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
            delta  = target - window.pageYOffset; // Y-offset difference
        duration = duration || 1000;              // default 1 sec animation
        start = Date.now();                       // get start time
        factor = 0;

        if( timer ) {
            clearInterval(timer); // stop any running animations
        }

        function step() {
            var y;
            factor = (Date.now() - start) / duration; // get interpolation factor
            if( factor >= 1 ) {
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


function showNextStep(element) {
    let value = document.getElementById(element).getAttribute('id');
    let nextStep = getById('' + value.substr(0, value.length - 8) + '');
    nextStep.style.display = 'flex';
    smoothScrollTo(window.innerHeight + 300, 2500);
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
    startOverBtn.style.display = 'none';
}


let startOver = document.querySelector('.start-over-btn')

startOver.addEventListener('click', (target) => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    removeStyles();
    removeBlocks();
})

document.addEventListener('click', ({target}) => {
    // Определяю какой блок имеет data-question="true|false" и даю нужный класс
    if (!event.target.classList.contains('question')) return;

    const question = target.closest('.question');

    if (question.getAttribute('data-question') === 'false') {
        question.classList.add('false')
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

let copyTextareaBtn = document.querySelector('.share-btn');
let copyTextarea = document.querySelector('.share-input');
copyTextarea.innerHTML = window.location.href;

copyTextareaBtn.addEventListener('click', function(event) {

    copyTextarea.focus();
    copyTextarea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }
});