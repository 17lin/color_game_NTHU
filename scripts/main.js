window.onload = function() {
    init();
};

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
var seconds_left = 10;
var Nightmare = 0;
var interval;

var x;
var y;

var Time = document.querySelector("#Timer");

function changecolors_bk() {
    x = 1;
    y = setInterval(change, 50);
}

function change() {
    if (x === 1) {
        color = "#232323";

        x =  2;



    } else if(x === 2){
        color = "white";


          x = 1;

    }
    else {
        color = pickedColor;
        clearInterval(y);
    }

    document.body.style.background = color;
}


function init() {
    initCards();
    reset();
}

function initCards() {
    Easy_G();
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
                resetButton.style.opacity = 1;
                clearInterval(interval);
                clearInterval(y);
                gameOver = true;
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset() {
    clearInterval(interval);
    clearInterval(y);
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

function Easy_G(){
  gameOver = false;
    document.getElementById('Easy').setAttribute("class", "clicked");
    document.getElementById('Hard').setAttribute("class", "unclicked");
    document.getElementById('Nightmare').setAttribute("class", "unclicked");
    numCards = 3;
    Nightmare = 0;
    Time.style.opacity = 0;
    reset();
    clearInterval(interval);
    clearInterval(y);
}

function Hard_G(){
  gameOver = false;
    document.getElementById('Hard').setAttribute("class", "clicked");
    document.getElementById('Easy').setAttribute("class", "unclicked");
    document.getElementById('Nightmare').setAttribute("class", "unclicked");
    numCards = 6;
    Nightmare = 0;
    Time.style.opacity = 0;
    reset();
    clearInterval(interval);
    clearInterval(y);
}

function Nightmare_G(){
  gameOver = false;
    document.getElementById('Nightmare').setAttribute("class", "clicked");
    document.getElementById('Hard').setAttribute("class", "unclicked");
    document.getElementById('Easy').setAttribute("class", "unclicked");
    numCards = 6;
    Nightmare = 1;
    seconds_left = 10;
    reset();
    resetButton.style.opacity = 0;
    Time.style.opacity = 1;
    interval = setInterval(function() {
      Time.textContent = --seconds_left;
      if(gameOver === false)
      {
        changecolors_bk();
      }

      if (seconds_left <= 0)
      {
          messageDisplay.textContent = 'Timeout!!';
          x = 3;
          clearInterval(interval);
          clearInterval(y);
          Time.style.opacity = 0;
          changeColors("#FFF");
          body.style.backgroundColor = pickedColor;
          resetButton.style.opacity = 1;
      }
    }, 1000);
}
