window.onload = function() {
    init();
};

var t;
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

var md = document.querySelectorAll(".mode");
var mode;

function init() {
    initCards();
    initMd();
    reset();
    resetMd(0);
}

function initMd() {
    for(var i=0; i<md.length; i++){
        md[i].addEventListener("click", function(){
            resetMd(this.textContent);
            reset();
        });
    }
    resetMd("Easy");
}

function resetMd(n) {
    for(var i=0; i<md.length; i++){
        md[i].style.backgroundColor = "white";
    }
    switch(n){
        case "Easy":
            mode = 0;
            break;
        case "Hard":
            mode = 1;
            break;
        case "Nightmare":
            mode = 2;
            break;
        default:
            mode = 0;
            break;
    }
    md[mode].style.backgroundColor = "rgb(22, 240, 227)";
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
                resetDisplay.textContent = "Play Again";
                resetButton.style.opacity = 1;
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
    gameOver = false;
    numCards = mode==0?3:6;
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
    if(mode==2)
        nightmare();
}

resetButton.addEventListener("click", function() {
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

function nightmare() {
    t = 5;
    resetButton.style.opacity = 0;
    timeout();
}

function timeout(){
    setTimeout(function(){
        t = 0;
        if(!gameOver){
            messageDisplay.textContent = "Timeout !";
            resetDisplay.textContent = "Play Again"
            changeColors("#FFF");
            body.style.backgroundColor = pickedColor;
            gameOver = true;
            resetButton.style.opacity = 1;
        }
    }, 5000);
}
