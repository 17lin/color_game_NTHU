window.onload = function() {
    init();
};

var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var footer = document.querySelector("#footer");
var resetDisplay = document.querySelector("#reset span");
var gamemode = 0;
var easymode = document.getElementById("easymode")
var hardmode = document.getElementById("hardmode")
var nightmare = document.getElementById("nightmare")
var currentDate;
var eventDate;
var time;
var interval;

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

function nightmareReset(){
    time--;
    messageDisplay.textContent = "What's the Color?   " + time;
    if(time <= 0){
        messageDisplay.textContent = "Time Out!!!";
        changeColors("#FFF");
        document.body.style.backgroundColor = pickedColor;
        clearInterval(interval);
        footer.style.display="block";
        resetDisplay.textContent = "Play Again"
    }
}

function reset() {
    if(gamemode==2){
        time = 7;
        footer.style.display="none";
        nightmareReset();
        interval = setInterval(nightmareReset, 1000);
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

resetButton.addEventListener("click", function() {
    reset();
})

easymode.addEventListener("click", function() {
        clearInterval(interval);
        footer.style.display="block";
    time = 1000000;
    numCards = 3;
    gamemode = 0;
    reset();
})

hardmode.addEventListener("click", function() {
        clearInterval(interval);
        footer.style.display="block";
    time = 1000000;
    numCards = 6;
    gamemode = 1;
    reset();
})

nightmare.addEventListener("click", function() {
    numCards = 6;
    gamemode = 2;
    reset();
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
