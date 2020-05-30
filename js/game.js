let score = 0;
const MAX_SCORE = 15;

function getSadInterval() {
    return Date.now() + 1000;
}

function getGoneInterval() {
    return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

function getHungryInterval () {
    return Date.now() + Math.floor(Math.random() * 3000) + 2000;
}

function getKingStatus () {
    return Math.random() > .9;
}
// returns a random # between 2,000 & 20,000 (2 & 20 seconds)

const moles = [
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-0')
        // OR node: document.getElementById('hole-0')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-1')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-2')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-3')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-4')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-5')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-6')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-7')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-8')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-9')
    },
];

function getNextStatus (mole) {
    switch (mole.status) {
        case "sad":
        case "fed":
            mole.next = getSadInterval();
            mole.status = "leaving";
            if (mole.king) {
            mole.node.children[0].src = './images/game-king-mole-leaving.png';
            } else {
            mole.node.children[0].src = './images/game-mole-leaving.png';
            }
            break;
        case "leaving":
            mole.next = getGoneInterval();
            mole.status = 'gone';
            mole.node.children[0].classList.add('gone');
            break;
        case "gone":
            mole.status = 'hungry';
            mole.king = getKingStatus();
            mole.next = getHungryInterval();
            mole.node.children[0].classList.add('hungry');
            mole.node.children[0].classList.remove('gone');
            if (mole.king) {
                mole.node.children[0].src = './images/game-king-mole-hungry.png';
            } else {
                mole.node.children[0].src = './images/game-mole-hungry.png';
            }
            break;
        case "hungry":
            mole.status = 'sad';
            mole.next = getSadInterval();
            mole.node.children[0].classList.remove('hungry');
            if (mole.king) {
            mole.node.children[0].src = './images/game-king-mole-sad.png';
            } else {
            mole.node.children[0].src = './images/game-mole-sad.png';
            }
            break;
    }
}

function feed (event) {
    if (!event.target.classList.contains("hungry")) {
        return;
    }

    const mole = moles[parseInt(event.target.dataset.index)]

    mole.status = 'fed';
    mole.next = getSadInterval();
    if (mole.king) {
        score += 2;
        mole.node.children[0].src = './images/game-king-mole-fed.png';
    } else {
        score++;
        mole.node.children[0].src = './images/game-mole-fed.png';
    }
    mole.node.children[0].classList.remove('hungry');

    if (score >= MAX_SCORE) {
        win();
    }

    document.querySelector('.worm-container').style.width = `${score / MAX_SCORE * 100}%`;
}

function win () {
    document.querySelector('.bg').classList.add('hide');
    document.querySelector('.win').classList.remove('hide');
}

let runAgainAt = Date.now() + 100;
function nextFrame () {
    const now = Date.now();
    
    if(runAgainAt <= now) {
        for(let i = 0; i < moles.length; i++) {
            if (moles[i].next <= now) {
                getNextStatus(moles[i]);
            }
        }
        runAgainAt = now + 100;
    }
    requestAnimationFrame(nextFrame);
}

document.querySelector('.bg').addEventListener('click', feed);

nextFrame();




// setInterval(function() {
//     console.log("hey there");
// }, 2000);

// let num = 1;
// const interval = setInterval(function() {
//     num++
//     console.log(num);
// }, 500);

// setTimeout(function() {
//     clearInterval(interval);
// }, 5000);
