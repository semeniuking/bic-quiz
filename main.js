let score = 1;
let socialScore = 3;
let scoreNumber = document.querySelector('.scoreNumber');


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
// Saves current scroll position so we can return to it after calculations

    smoothScrollTo(window.innerHeight + 300, 2500);

    // if (window.innerWidth < 768) {
    //     window.scrollTo({ left: 0, top: document.body.scrollHeight + 100, behavior: "smooth" });
    // } else{
    //     window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    // }
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
}


let startOverBtn = document.querySelector('.start-over-btn')

startOverBtn.addEventListener('click', (target) => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
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

    let container = target.closest('.questions');
    let check = container.querySelectorAll('.question');
    // let trueQ = check[i].getAttribute('data-question') === 'true';
    for (i = 0; i < check.length; i++) {
        if (target.getAttribute('data-question') === 'false' && check[0].getAttribute('data-question') === 'false') {
        } else if (target.getAttribute('data-question') === 'true' && check[1].getAttribute('data-question') === 'false') {
            check[1].classList.add('disable')
        } else if (target.getAttribute('data-question') === 'true' && check[0].getAttribute('data-question') === 'false') {
            check[0].classList.add('disable')
        }
    }
});

// if (target.getAttribute('data-question') === 'false') {
//
// } else if (target.getAttribute('data-question') === 'true') {
// }


// if (check[1].getAttribute('data-question') === 'true') {
// } else if(check[0].getAttribute('data-question') === 'false'){
//     check[0].classList.add('disable');
// } else{
//     check[1].classList.add('disable');
// }


