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

var easyModeButton = document.querySelector("#easyMode");
var hardModeButton = document.querySelector("#hardMode");
var nightmareModeButton = document.querySelector("#nightmareMode");
var secondsDisplay = document.querySelector("#seconds");
var messageDisplay = document.querySelector("#message");

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
                resetButton.style.visibility = "visible";
                messageDisplay.textContent = "Correct!";
                secondsDisplay.textContent = "";
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
    resetButton.style.visibility = "visible";
    messageDisplay.textContent = "What's the color?";
    secondsDisplay.textContent = "";
    if (gameMode == 0) {
        numCards = 3;
        secondsDisplay.textContent = "";
    } else if (gameMode == 1) {
        numCards = 6;
        secondsDisplay.textContent = "";
    } else {
        numCards = 6;
        time = 5;
        resetButton.style.visibility = "hidden";
        secondsDisplay.textContent = time;
        time = time - 1;
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
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";
}


function blink2(){
  document.body.style.backgroundColor = "#232323";
  if(time < 0) body.style.backgroundColor = pickedColor;
}

// function blink(){
//   document.body.style.backgroundColor = "white";
//   setTimeout(blink2, 100);
// }

function countdown() {
    //resetButton.style.visibility = "hidden";
    document.body.style.backgroundColor = "white";
    secondsDisplay.textContent = time;
    time = time - 1;
    setTimeout(blink2, 80);
    if (time < 0) {
        clearInterval(intervalTimer);
        resetButton.style.visibility = "visible";
        messageDisplay.textContent = "Time out";
        secondsDisplay.textContent = "";
        changeColors("#FFF");
        body.style.backgroundColor = pickedColor;
        gameOver = true;
    }
}

function changeMode(num) {
    gameMode = num;
    reset();
    initCards();
}

resetButton.addEventListener("click", function() {
    reset();
})
easyModeButton.addEventListener("click", function() {
  easyModeButton.style.color = "blue";
  hardModeButton.style.color = "black";
  nightmareModeButton.style.color = "black";
    changeMode(0);
})
hardModeButton.addEventListener("click", function() {
  easyModeButton.style.color = "black";
  hardModeButton.style.color = "blue";
  nightmareModeButton.style.color = "black";
    changeMode(1);
})
nightmareModeButton.addEventListener("click", function() {
  easyModeButton.style.color = "black";
  hardModeButton.style.color = "black";
  nightmareModeButton.style.color = "blue";
    changeMode(2);
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
