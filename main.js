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

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true;
        }
    }));
} catch (e) {
}
var wheelOpt = supportsPassive ? {passive: false} : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

function showButtons(element) {
    let value = document.getElementById(element).getAttribute('id');
    let nextStep = getById('' + value.substr(0, value.length - 8) + '');
    let nextStepId = nextStep.getAttribute('id')
    disableScroll()
    if (window.innerWidth < 768) {
        smoothScroll({
            preventUserScroll: 'false',
            scrollEvents: ['scroll', 'mousedown', 'wheel', 'DOMMouseScroll', 'mousewheel', 'touchmove'],
            duration: '400',
            block: '20%',
            toElement: document.getElementById(element)
        });
    }
    if (window.innerWidth < 768) {
        setTimeout(() => {
            smoothScroll({
                preventUserScroll: 'false',
                scrollEvents: ['scroll', 'mousedown', 'wheel', 'DOMMouseScroll', 'mousewheel', 'touchmove'],
                duration: '400',
                block: '-5%',
                toElement: document.getElementById(nextStepId)
            });
        }, 4000)
        setTimeout(() => {
            enableScroll()
        }, 5000)
    } else {
        setTimeout(() => {
            smoothScroll({
                preventUserScroll: 'false',
                scrollEvents: ['scroll', 'mousedown', 'wheel', 'DOMMouseScroll', 'mousewheel', 'touchmove'],
                duration: '400',
                block: '-10%',
                toElement: document.getElementById(nextStepId)
            });
        }, 2500)
        setTimeout(() => {
            enableScroll()
        }, 3200)
    }
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
    nextStep.style.display = 'block';
    disableScroll()
    if (window.innerWidth < 768) {
        smoothScroll({
            preventUserScroll: 'false',
            scrollEvents: ['scroll', 'mousedown', 'wheel', 'DOMMouseScroll', 'mousewheel', 'touchmove'],
            duration: '400',
            block: '20%',
            toElement: document.getElementById(element)
        });
    }
    if (window.innerWidth < 768) {
        setTimeout(() => {
            smoothScroll({
                preventUserScroll: 'false',
                duration: '400',
                scrollEvents: ['scroll', 'mousedown', 'wheel', 'DOMMouseScroll', 'mousewheel', 'touchmove'],
                block: 'end',
                toElement: document.getElementById(nextStepId)
            });
        }, 4000)
        setTimeout(() => {
            enableScroll()
        }, 5000)
    } else {
        setTimeout(() => {
            smoothScroll({
                preventUserScroll: 'false',
                scrollEvents: ['scroll', 'mousedown', 'wheel', 'DOMMouseScroll', 'mousewheel', 'touchmove'],
                duration: '400',
                block: 'end',
                toElement: document.getElementById(nextStepId)
            });
        }, 2500)
        setTimeout(() => {
            enableScroll()
        }, 3200)
    }
    startOverFixed.style.display = 'flex';
    startOverBtn.style.display = 'flex';
}

function scrollToBottom(element) {
    if (window.innerWidth < 768) {
        setTimeout(() => {
            smoothScroll({
                preventUserScroll: 'false',
                scrollEvents: ['scroll', 'mousedown', 'wheel', 'DOMMouseScroll', 'mousewheel', 'touchmove'],
                duration: '400',
                block: 'end',
                toElement: document.getElementById(element),
            });
        }, 50)
    }
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
    smoothScroll({
        preventUserScroll: 'true',
        duration: '500',
        block: 'end',
        toElement: startBlock,
    });

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
        if ((window.innerHeight + window.scrollY + 350) >= document.body.scrollHeight) {
            startOverFixed.style.display = 'none'
        } else {
            startOverFixed.style.display = 'flex'
        }
    };
}
//animation code
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 0;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("fade");
        } else {
            reveals[i].classList.remove("fade");
        }
    }
}

function questions() {
    let questions = document.querySelectorAll(".question");
    for (let m = 0; m < questions.length; m++) {
        let windowHeight = window.innerHeight;
        let elementTop = questions[m].getBoundingClientRect().top;
        let elementVisible = 0;

        questions[m].addEventListener('click', function () {
            questions[m].classList.remove("wiggle");
        });

        if (elementTop < windowHeight - elementVisible) {
            questions[m].classList.add("wiggle");
        } else {
            questions[m].classList.remove("wiggle");
        }
    }
}

function underline() {
    let underline = document.querySelectorAll(".underline");
    for (let m = 0; m < underline.length; m++) {
        let windowHeight = window.innerHeight;
        let elementTop = underline[m].getBoundingClientRect().top;
        let elementVisible = 200;
        if (elementTop < windowHeight - elementVisible) {
            underline[m].classList.add("fade");
        } else {
            underline[m].classList.remove("fade");
        }
    }
}

window.addEventListener("scroll", reveal);
window.addEventListener("scroll", questions);
window.addEventListener("scroll", underline);
