window.onload = function() {
    init();
};

var numCards;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");


var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");
var nightmare = document.querySelector("#nightmare");
var mode = "easy";

function init() {

    initButton();
    initCards();
    reset();
}

function countDown() {
alert("hello");
}

function initButton() {
    easy.addEventListener("click", function() {
      mode = "easy";
      initCards();
      reset();
    });
    hard.addEventListener("click", function() {
      mode = "hard";
      initCards();
      reset();
    });
    nightmare.addEventListener("click", function() {
      mode = "nightmare";
      initCards();
      reset();
      setTimeout(countDown(), 2000);
    });
}


function initCards() {
    if (mode == "easy") {
        numCards = 3;
    }
    else if (mode == "hard") {
        numCards = 6;
        for (var i = 3; i < 6; i++) {
          cards[i].style.display = "block";
        }
    }
    else if (mode == "nightmare") {
        numCards = 6;
        for (var i = 3; i < 6; i++) {
          cards[i].style.display = "block";
        }
    } else numCards = 3;


    for (var i = 0; i < numCards; i++) {
        cards[i].addEventListener("click", function() {
            if (gameOver)
                return;
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetDisplay.textContent = "Play Again"
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
            } else {
                this.style.backgroundColor = "#232323";
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
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?";
    //change colors of cards
    for (var i = 0; i < cards.length; i++) {
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

function changeColors(color) {
    //loop through all cards
    for (var i = 0; i < cards.length; i++) {
        //change each color to match given color
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
