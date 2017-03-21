window.onload = function() {
    init();
};

var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;

var gameMode = 0;
var time = 5;
var intervalTimer;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var changeModeButton = document.querySelector("#changeMode");
var changeModeButtonSpan = document.querySelector("#changeMode > span");
var secondsDisplay = document.querySelector("#seconds");

function init() {
    initCards();
    reset();
}

function initCards() {
    for (var i = 0; i < cards.length; i++) {
        //add click listeners to cards
        cards[i].addEventListener("click", function() {
            if (gameOver)
                return;

            //grab color of clicked card
            var clickedColor = this.style.backgroundColor;
            // alert(this.style.backgroundColor);
            //compare color to pickedColor
            if (clickedColor === pickedColor) {

                clearInterval(intervalTimer);
                resetButton.style.display = "inline";

                messageDisplay.textContent = "Correct!";
                resetDisplay.textContent = "Play Again"
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset() {

    clearInterval(intervalTimer);
    resetButton.style.display = "inline";
    if (gameMode == 0) {
        numCards = 3;
        changeModeButtonSpan.textContent = "Easy Mode";
        secondsDisplay.textContent = "";
    } else if (gameMode == 1) {
        numCards = 6;
        changeModeButtonSpan.textContent = "Hard Mode";
        secondsDisplay.textContent = "";
    } else {
        numCards = 6;
        changeModeButtonSpan.textContent = "Nightmare Mode";
        time = 5;
        //resetButton.style.display = none;
        intervalTimer = setInterval(countdown, 1000);
    }

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
        cards[i].style.opacity = 1;
        if (colors[i]) {

            cards[i].style.display = "inline"

            cards[i].style.display = "block"

            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";
}


function blink2(){

}

function blink(){
  setTimeout(blink2, 100);
}

function countdown() {
  //resetButton.style.visibility = "hidden";
  resetButton.style.display = "none";
    secondsDisplay.textContent = time;
    time = time - 1;
    if (time < 0) {
        clearInterval(intervalTimer);
        resetButton.style.display = "inline";
        secondsDisplay.textContent = "Time out";
        changeColors("#FFF");
        body.style.backgroundColor = pickedColor;
        gameOver = true;
    }
}

function changeMode() {
    gameMode = (gameMode + 1) % 3;
    reset();
    initCards();
}

resetButton.addEventListener("click", function() {
    reset();
})
changeModeButton.addEventListener("click", function() {
    changeMode();
})


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
