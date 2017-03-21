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
var Easy = document.querySelector("#Easy");
var Hard = document.querySelector("#Hard");
var Nightmare = document.querySelector("#Nightmare");
var mode = "Easy";
var Timer = document.querySelector("#Timer");

function init() {
    selectMode();
    initCards();
    reset();
}

function selectMode(){
  Easy.addEventListener("click",function(){
    if(mode!=="Easy"){
      mode = "Easy";
      resetButton.style.display = 'block';
      reset();
    }
  });
  Hard.addEventListener("click",function(){
    if(mode!=="Hard"){
      mode = "Hard";
      resetButton.style.display = 'block';
      reset();
    }
  });
  Nightmare.addEventListener("click",function(){
    if(mode!=="Nightmare"){
      mode = "Nightmare";
      reset();
    }
  })
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


function reset() {
    gameOver = false;

    if(mode==="Easy"){
      numCards = 3;
    }else if(mode==="Hard"){
      numCards = 6;
    }else if(mode==="Nightmare"){
      numCards = 6;
    }

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
    if (mode==="Nightmare") {
      resetButton.style.display = 'none';
      var i=5;
      Timer.innerText=" "+i;
      setInterval(function () {
        i--;
        if(gameOver!==true){
          if(i>0){
            Timer.innerText=" "+i;
          }else if (i===0) {
            Timer.innerText="";
            lose();
          }
        }else {
          resetButton.style.display='block';
        }
      }, 1000);
    }
}

function lose() {
  messageDisplay.textContent = "Timeout!";
  resetDisplay.textContent = "Play Again"
  changeColors("#FFF");
  resetButton.style.display='block';
  body.style.backgroundColor = pickedColor;
  gameOvefunctionNamer = true;
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
