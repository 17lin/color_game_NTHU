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
var bteasy = document.querySelector("#easy");
var bthard = document.querySelector("#hard");
var btnight = document.querySelector("#night");
var mode = "easy";
var countDown = 6;
var count;
var countMode = 0;
var ans = false;
var test = document.querySelector("#about");

function init() {
    initCards();
    reset();

    bteasy.addEventListener('click', function(e){
      mode = "easy";
      numCards = 3;
      for (var i = 3; i < 6; i++){
        cards[i].style.opacity = 0;
      }
      init();
    });

    bthard.addEventListener('click', function(e){
      mode = "hard";
      numCards = 6;
      for (var i = 3; i < 6; i++){
        cards[i].style.opacity = 1;
      }
      init();
    });

    btnight.addEventListener('click', function(e){
      resetButton.style.opacity = 0;
      mode = "nightmare";
      numCards = 6;
      countDown = 6;
      for (var i = 3; i < 6; i++){
        cards[i].style.opacity = 1;
      }

      if (countMode === 0){
        count = setInterval(tick, 1000);
        countMode = 1;
      }


      init();
    });
}

function initCards() {
    for (var i = 0; i < numCards; i++) {
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
                ans = true;
            } else {
              this.style.opacity = 0;
              if (mode !== "nightmare"){
                messageDisplay.textContent = "Try Again"
              }
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
        cards[i].style.opacity = 1;
        if (colors[i]) {
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";

    if (mode === "nightmare"){
      countDown = 6;
      resetButton.style.opacity = 0;
    }
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
    var random = Math.floor(Math.random() * numCards);
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

function tick() {
  if (mode === "nightmare"){
    countDown--;
    messageDisplay.textContent = "What's the color? " + countDown;

    if (countDown <= -1 || gameOver === true){
      if (ans === true){
        messageDisplay.textContent = "Correct!";
        resetDisplay.textContent = "Play Again"
      }else{
        messageDisplay.textContent = "TIME OUT";
        resetDisplay.textContent = "Play Again"
        changeColors("#FFF");
        body.style.backgroundColor = pickedColor;
      }
      gameOver = true;
      resetButton.style.opacity = 1;
    }else{
      resetButton.style.opacity = 0;
    }
  }
}
