window.onload = function() {
    init();
};

var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var gameMode = 0;
var counter = 5;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var easyButton = document.querySelector("#Easy");
var hardButton = document.querySelector("#Hard");
var nightButton = document.querySelector("#Nightmare");
var countDisplay = document.querySelector("#count");
var timer;

function init() {
    easyButton.style.backgroundColor = "steelblue";
    easyButton.style.color = "#ffffff";
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
                countDisplay.style.display = "none";
                clearInterval(timer);
                messageDisplay.textContent = "Correct!";
                resetDisplay.textContent = "Play Again"
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                resetButton.style.display = "block";
                gameOver = true;
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset() {
    if(gameMode == 2){
      countDisplay.style.display = "initial";
      counter = 5;
      countDisplay.textContent = 5;
      counter--;
      timer = setInterval(myTimer, 1000);
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
    this.style.display = "none";
})
easyButton.addEventListener("mouseenter", function(){
  if(gameMode != 0){
    this.style.backgroundColor = "#ffffff";
    this.style.color = "steelblue";
  }
});
easyButton.addEventListener("mouseout", function(){
  if(gameMode != 0)
    this.style.color = "#484848";
});
easyButton.addEventListener("click", function(){
  numCards = 3;
  if(gameMode != 0){
    gameMode = 0;
    clearInterval(timer);
    countDisplay.style.display = "none";
    resetButton.style.display = "block";
    reset();
  }
  this.style.backgroundColor = "steelblue";
  this.style.color = "#ffffff";
  hardButton.style.backgroundColor = "#ffffff";
  hardButton.style.color = "#484848";
  nightButton.style.backgroundColor = "#ffffff";
  nightButton.style.color = "#484848";
})
hardButton.addEventListener("mouseenter", function(){
  if(gameMode != 1){
    this.style.backgroundColor = "#ffffff";
    this.style.color = "steelblue";
  }
});
hardButton.addEventListener("mouseout", function(){
  if(gameMode != 1)
    this.style.color = "#484848";
});
hardButton.addEventListener("click", function(){
  numCards = 6;
  if(gameMode != 1){
    gameMode = 1;
    clearInterval(timer);
    countDisplay.style.display = "none";
    resetButton.style.display = "block";
    reset();
  }

  this.style.backgroundColor = "steelblue";
  this.style.color = "#ffffff";
  easyButton.style.backgroundColor = "#ffffff";
  easyButton.style.color = "#484848";
  nightButton.style.backgroundColor = "#ffffff";
  nightButton.style.color = "#484848";
})
nightButton.addEventListener("mouseenter", function(){
  if(gameMode != 2){
    this.style.backgroundColor = "#ffffff";
    this.style.color = "steelblue";
  }
});
nightButton.addEventListener("mouseout", function(){
  if(gameMode != 2)
    this.style.color = "#484848";
});
nightButton.addEventListener("click", function(){
  numCards = 6;
  if(gameMode != 2){
    gameMode = 2;
    reset();
    resetButton.style.display = "none";
  }
  this.style.backgroundColor = "steelblue";
  this.style.color = "#ffffff";
  easyButton.style.backgroundColor = "#ffffff";
  easyButton.style.color = "#484848";
  hardButton.style.backgroundColor = "#ffffff";
  hardButton.style.color = "#484848";
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
function myTimer(){
  if(counter == 0){
    countDisplay.style.display = "none";
    clearInterval(timer);
    messageDisplay.textContent = "Timeout";
    changeColors("#FFF");
    body.style.backgroundColor = pickedColor;
    resetButton.style.display = "block";
    gameOver = true;
  }
  countDisplay.textContent = counter;
  counter--;
}
