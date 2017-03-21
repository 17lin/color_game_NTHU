window.onload = function() {
    init(0);
};

var Mode = 0;
var t, tb;
var Count;
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
var easyMode = document.querySelector("#easy");
var hardMode = document.querySelector("#hard");
var nightmareMode = document.querySelector("#nightmare");
var counterControl = document.querySelector("#counter");

function init(mode) {
    Mode = mode;
    initCards();
    reset(mode);
    countdownfuc(1);
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
                counterControl.textContent = "";
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

function reset(mode) {
    gameOver = false;
    colors = generateRandomColors(cards.length);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetButton.style.display = "block";
    if(mode == 0)
      resetDisplay.textContent = "New Color"
    else{
      resetButton.style.display = "none";
    }

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
    if(Mode == 0 || (Mode == 1 && gameOver)){
      reset(Mode);
      if(Mode)
        countdownfuc(1);
    }
})

easyMode.addEventListener("click", function(){
    document.querySelector("#card-container").innerHTML = '<div class="card"></div><div class="card"></div><div class="card"></div>';
    cards = document.querySelectorAll(".card");
    init(0);
})

hardMode.addEventListener("click", function(){
    document.querySelector("#card-container").innerHTML = '<div class="card"></div><div class="card"></div><div class="card"></div><div class="card"></div><div class="card"></div><div class="card"></div>';
    cards = document.querySelectorAll(".card");
    init(0);
})

nightmareMode.addEventListener("click", function(){
    document.querySelector("#card-container").innerHTML = '<div class="card"></div><div class="card"></div><div class="card"></div><div class="card"></div><div class="card"></div><div class="card"></div>';
    cards = document.querySelectorAll(".card");
    init(1);
})

function countdownfuc(reset){
  if(reset){
      Count = 5;
      clearTimeout(t);
  }

  if(Mode == 1)
    counterControl.textContent = " "+Count;
  else
    counterControl.textContent = "";

  Count = Count - 1;

  if(Mode == 1 && Count != -1 && !gameOver){
      t=setTimeout("countdownfuc(0)",1000);
  }

  if(Mode)
    blink(1);

  if(Count == -1){
    clearTimeout(tb);
    messageDisplay.textContent = "Time Out!";
    counterControl.textContent = "";
    changeColors("#FFF");
    body.style.backgroundColor = pickedColor;
    gameOver = true;
  }
  if(gameOver){
      counterControl.textContent = "";
      resetButton.style.display = "block";
      resetDisplay.textContent = "Play again!"
  }
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

function blink(num) {
  body.style.backgroundColor = "white";
  if(num)
    tb=setTimeout("blink(0)", 50);
  else {
    body.style.backgroundColor = "#232323";
  }
}
