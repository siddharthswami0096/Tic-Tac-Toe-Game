console.log("Welcome to Tic Tac Toe");

let music = new Audio("ting.wav");
let gameovermusic = new Audio("gameover.wav");
let turn = "X";
let gameOver = false;
let turninfo = document.getElementById("turninfo");
let info = document.getElementById("info");
let reset = document.getElementById("reset");

//////////changeturn///////////
const changeturn = () => {
    return turn === "X" ? "O" : "X";
}

////////check win/////////
function checkwin() {
    const winpatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], ////rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], ///columns
        [0, 4, 8], [2, 4, 6],  ////diagonals
    ];

    let boxtexts = document.getElementsByClassName('boxtext');

    winpatterns.forEach(pattern => {
        if ((boxtexts[pattern[0]].innerText === boxtexts[pattern[1]].innerText) &&
            (boxtexts[pattern[1]].innerText === boxtexts[pattern[2]].innerText) &&
            (boxtexts[pattern[0]].innerText !== "")) {
            info.innerText = boxtexts[pattern[0]].innerText + " Won";
            gameOver = true;
            gameovermusic.play();
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
        }
    });
}

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !gameOver) {
            boxtext.innerText = turn;
            music.play();
            turn = changeturn();
            checkwin();
            if (!gameOver) {
                turninfo.innerText = turn;
            }
        }
    });
});

// Add onclick listener to reset button
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    gameOver = false;
    turninfo.innerText = turn;
    info.innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
});
