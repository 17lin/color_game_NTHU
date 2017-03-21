window.onload = function() {
    init();
};
var nightornot = 0;
var gameovernumber = 0;
var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var easyNumber = 0;
var hardNumber = 0;
var nightNumber = 0;
var night = document.getElementById("night");
var easy = document.getElementById("easy");
var hard = document.getElementById("hard");
var timeout = document.getElementById("Timeout");
var time = document.getElementById("time");
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var t1;


function init() {
    reset();
    initCards();
}

night.addEventListener("click", function() {
    resetButton.style.visibility = "hidden";
    easy.textContent = "easy";
    hard.textContent = "hard";
    night.textContent = "here";
    night.style.backgroundColor = "blue";
    easy.style.backgroundColor = "white";
    hard.style.backgroundColor = "white";
    nightornot = 1;
    gameovernumber = 0;
    numCards = 6;
    reset();
    clearInterval(t1);
    Timeoutmachine(5);
});
easy.addEventListener("click", function() {
    easy.textContent = "here";
    hard.textContent = "hard";
    night.textContent = "nightmare";
    messageDisplay.textContent = "What's the color?";
    resetButton.style.visibility = "visible";
    night.style.backgroundColor = "white";
    easy.style.backgroundColor = "blue";
    hard.style.backgroundColor = "white";
    nightornot = 0;
    gameovernumber = 0;
    numCards = 3;
    reset();
});
hard.addEventListener("click", function() {
    easy.textContent = "easy";
    hard.textContent = "here";
    night.textContent = "nightmare";
    messageDisplay.textContent = "What's the color?";
    resetButton.style.visibility = "visible";
    night.style.backgroundColor = "white";
    easy.style.backgroundColor = "white";
    hard.style.backgroundColor = "blue";
    nightornot = 0;
    gameovernumber = 0;
    numCards = 6;
    reset();
});

function initCards() {
    time.style.opacity = 0;
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function() {
            if (gameOver)
                return;
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetDisplay.textContent = "Play Again";
                resetButton.style.visibility = "visible";
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                time.style.opacity = 0;
                gameOver = true;
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset() {
    gameOver = false;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    time.textContent = "5";
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?";
    //change colors of cards
    if (nightornot === 1) {
        clearInterval(t1);
        Timeoutmachine(5);
    } else {
        time.textContent = "";
    }
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.opacity = 1;
        if (colors[i]) {
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";

}

resetButton.addEventListener("click", function() {
    reset();
})

function Timeoutmachine(a) {
    time.style.opacity = 1;
    var i = 0;
    t1 = setInterval(function() {
        if (gameOver === false) {
            if (nightornot === 1 && (i % 10 === 0)) {
                time.textContent = a;
                body.style.backgroundColor = "black";
                resetButton.style.visibility = "hidden";
                if (a === 0) {
                    messageDisplay.textContent = "Time out!";
                    resetDisplay.textContent = "play again"
                    changeColors("#FFF");
                    body.style.backgroundColor = pickedColor;
                    resetButton.style.visibility = "visible";
                    time.textContent = '';
                    gameOver = true;

                }
                i++;
                a-- || clearInterval(t1);
            } else if (nightornot === 1 && (i % 10) === 9) {
                body.style.backgroundColor = "white";
                i++;
            } else {
                i++;
            }
        } else {
            clearInterval(t1);
        }
    }, 100);
}

function changeColors(color) {
    //loop through all cards
    for (var i = 0; i < cards.length; i++) {
        //change each color to match given color
        cards[i].style.opacity = 1;
        cards[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    var arr = []
    //repeat num times
    for (var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor())
    }
    //return that array
    return arr;
}

function randomColor() {
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from  0 -255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from  0 -255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
