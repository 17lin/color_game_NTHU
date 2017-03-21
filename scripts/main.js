window.onload = function() {
    init();
};

var timelimit = 5;
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
var hard = document.querySelector("#hard");
var easy = document.querySelector("#easy");
var nightmare = document.querySelector("#night");
var nightmaretime = document.getElementById("demo");
var nightclick = false;
var gamemode = 1;



function init() {
    reset();
    initCards();

}

function initCards() {
    for (var i = 0; i < cards.length; i++) {
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
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
            }

             else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset() {
    if (gamemode==1)numCards=3;
    else if (gamemode==2) numCards = 6;
    else {
      numCards = 6;
      timelimit=5;
      resetButton.style.visibility = 'hidden';
      var x = setInterval(function(){
      nightmaretime.textContent=timelimit;
      timelimit--;
      if (timelimit < 0 ) {
      resetButton.style.visibility = 'visible';
      clearInterval(x);
      messageDisplay.textContent = "TimeOut!";
      resetDisplay.textContent = "Play Again";
      changeColors("#FFF");
      body.style.backgroundColor = pickedColor;
      nightmaretime.textContent="";
      gameOver = true;
      return;
    }
    else if(gameOver == true || gamemode!=3)
    {
      clearInterval(x);
      resetButton.style.visibility = 'visible';
      nightmaretime.textContent="";
      return;
    }
  }, 1000);
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
easy.addEventListener("click", function(){
   gamemode = 1;
   reset();
})
hard.addEventListener("click", function(){
  gamemode = 2;
   reset();
})
nightmare.addEventListener("click", function(){
   gamemode = 3;
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
