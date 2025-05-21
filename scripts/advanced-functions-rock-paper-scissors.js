//getting the item from localStorage
//localStorage stores as string so to convert back to object we need to do JSON.parse

//now everytime we refresh page, the score does not reset
let score = JSON.parse(localStorage.getItem('score'));

//we did this because when we hit reset score button the item is deleted from localStorage, so score would have showed null, so we introduced this if statement
if (score === null) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    }
};

updateScoreElement();

let isAutoPlaying = false;

let intervalId;

function autoPlay(){
    if(!isAutoPlaying){ //if the player is not playing then after clicking the button, this function will run
        intervalId = setInterval(() => { //the setInterval function returns an intervalId which will be fed to the else part to stop the interval using the intervalId
        const playerMove = pickComputerMove();
        playGame(playerMove);
    }, 1000); //runs every second
    isAutoPlaying = true; //as soon as the user starts playing autoPlaying = true
    document.querySelector('.js-autoplay-button').innerHTML = 'Stop AutoPlay'
    }else {
        clearInterval(intervalId);
        isAutoPlaying = false; //after the game is stopped, the isAutoPlaying is turned to false
        document.querySelector('.js-autoplay-button').innerHTML = 'Auto Play'
    }
}

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';
    if (playerMove === 'Scissors') {
        if (computerMove === 'Rock') {
            result = 'Lose!';
        }
        else if (computerMove === 'Paper') {
            result = 'Win!';
        }
        else if (computerMove === 'Scissors') {
            result = 'Tie!';
        }
    }
    else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
            result = 'Win!';
        }
        else if (computerMove === 'Paper') {
            result = 'Tie!';
        }
        else if (computerMove === 'Scissors') {
            result = 'Lose!';
        }
    }
    else if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
            result = 'Tie!';
        }
        else if (computerMove === 'Paper') {
            result = 'Lose!';
        }
        else if (computerMove === 'Scissors') {
            result = 'Win!';
        }
    }

    if (result === 'Win!') {
        score.wins++;
    } else if (result === "Lose!") {
        score.losses++;
    } else if (result === 'Tie!') {
        score.ties++;
    }
    //storing score in localStorage so that everytime, page is refreshed the score is not reset

    //localStorage only supports string values, so we use JSON.stringify
    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-move').innerHTML = `You <img src="/images/${playerMove}-emoji.png" class="move-icon">
        <img src="/images/${computerMove}-emoji.png" class="move-icon">
        Computer`;

}

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}. Losses: ${score.losses}. Ties: ${score.ties}`;
}
function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';
    //Math.random() gives a random numberbetween 0 and 1

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    }
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'Scissors';
    }
    return computerMove;
}