window.onload = function() {
    init();
};

var numCards = 6;
var gameOver = false;
var colors = [];
var pickedColor;
var mode_var = 1;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var easy = document.getElementById("easy");
var hard = document.getElementById("hard");
var nightmare = document.getElementById("nightmare");
var mode = document.getElementById("mode");
var timer = document.getElementById("timer");

function init()
{
    initCards();
    reset();
}

function modeclicked()
{
    if(mode_var === 1)
    {
        easy.style.backgroundColor = "#ff8080";
        hard.style.backgroundColor = "#0066ff";
        nightmare.style.backgroundColor = "#0066ff";
    }
    else if (mode_var === 2)
    {
      easy.style.backgroundColor = "#0066ff";
      hard.style.backgroundColor = "#ff8080";
      nightmare.style.backgroundColor = "#0066ff";
    }
    else if (mode_var === 3)
    {
      easy.style.backgroundColor = "#0066ff";
      hard.style.backgroundColor = "#0066ff";
      nightmare.style.backgroundColor = "#ff8080";
    }
}

function Easy()
{
  easy.style.backgroundColor = "#ff8080";
  hard.style.backgroundColor = "#0066ff";
  nightmare.style.backgroundColor = "#0066ff";
  timer.style.opacity = 0;
    mode_var = 1;
    numCards = 3;
    reset();
}
function Hard()
{
  easy.style.backgroundColor = "#0066ff";
  hard.style.backgroundColor = "#ff8080";
  nightmare.style.backgroundColor = "#0066ff";
  timer.style.opacity = 0;
    mode_var = 2;
    numCards = 6;
    reset();
}

function NightMare()
{
  easy.style.backgroundColor = "#0066ff";
  hard.style.backgroundColor = "#0066ff";
  nightmare.style.backgroundColor = "#ff8080";
  timer.style.opacity = 1;
  timer.text = Countdown()
    mode_var =3;
    numCards = 6;
    reset();
}
function  Countdown()
{
  window.setTimeout(function()
  {
    
  }
,1000);

}
function whichMode()
{
  if(mode_var === 1)
  {
    if(numCards !== 3)
      Easy();
  }
  else if (mode_var === 2)
  {
    if(numCards !== 6)
    Hard();
  }
  else if (mode_var === 3)
  {
    if(numCards !== 6)
    NightMare();
  }
}

function initCards()
{
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

function reset()
{

    whichMode();
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

easy.addEventListener("click",function()
{
    modeclicked();
    mode_var = 1;
    Easy();
});
hard.addEventListener("click",function()
{
    modeclicked();
    mode_var = 2;
    Hard();
});
nightmare.addEventListener("click",function()
{
    modeclicked();
    mode_var = 3;
    NightMare();
});

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
