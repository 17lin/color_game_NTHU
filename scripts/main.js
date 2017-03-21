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
var resetDisplay = document.querySelector("#reset span");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var nightmareButton = document.querySelector("#nightmare");
var mode = "easy";
var count = 5;

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
                resetButton.style.display = "block";
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

    if(mode === "easy"){
    easyButton.style.backgroundColor  = "steelblue";
    hardButton.style.backgroundColor = "white";
    nightmareButton.style.backgroundColor = "white";
  }
    else if(mode === "hard"){
      easyButton.style.backgroundColor = "white";
      hardButton.style.backgroundColor = "steelblue";
      nightmareButton.style.backgroundColor = "white";
    }
    else if(mode == "nightmare"){
      easyButton.style.backgroundColor = "white";
      hardButton.style.backgroundColor = "white";
      nightmareButton.style.backgroundColor = "steelblue";
    }
    else{
      easyButton.style.backgroundColor = "white";
    }

    count = 5;
    gameOver = false;
    if(mode === "nightmare"){
      messageDisplay.textContent = "What's the Color? "+ count;
      resetButton.style.display = "none";
    }else{
      messageDisplay.textContent = "What's the Color?";
      resetDisplay.textContent = "New Color"
      resetButton.style.display = "block";
    }
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
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

easyButton.addEventListener("click", function(){
  mode = "easy";
  numCards = 3;
  initCards();
  reset();
})

hardButton.addEventListener("click", function(){
  mode = "hard";
  numCards = 6;
  initCards();
  reset();
})

nightmareButton.addEventListener("click", function(){
  mode = "nightmare";
  numCards = 6;
  initCards();
  reset();
  countdown(count);
})

function countdown(t) {
    t -= 1;
    setTimeout("countdown()",1000);
}
