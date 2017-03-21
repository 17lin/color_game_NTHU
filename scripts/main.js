window.onload = function() {
    init();
};

var timer;
var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var Timer = document.querySelector("#Timer");
var resetButton = document.querySelector("#reset");
var modes= document.querySelectorAll(".modeButton");
var resetDisplay = document.querySelector("#reset span");

function init() {
    initMode();
    initCards();
    reset();
}

function initMode()
{
  for(var j=0;j<modes.length;j++)
  {
      modes[j].addEventListener("click",function(){
      for(var k=0;k<modes.length;k++)
      {
        modes[k].style.color="black";
        modes[k].style.backgroundColor="white";
      }
      gamemode=this.name;
      this.style.color="white";
      this.style.backgroundColor="steelblue";
      changeMode(this.name);
    });
  }

  gamemode="easy";
  modes[0].style.color="white";
  modes[0].style.backgroundColor="steelblue";
  setInterval(function(){
    if(timer===-1)
      {
        return;
      }
    if(gameOver)
    {
      messageDisplay.textContent =  "Correct!"
      Timer.style.display="none";
      resetButton.style.display="";
      return;
    }
    Timer.textContent=timer
    if(timer===0)
      {
        gameOver=true;
        messageDisplay.textContent = "TIMEOUT!"
        Timer.style.display="none";
        resetButton.style.display="";
        changeColors("#FFF");
        body.style.backgroundColor = pickedColor;
        timer--;
        return;
      }
    if(timer>0)
      {

        timer--;
      }
    },1000);
}

function changeMode(n){
  if(n==="easy")
  {
    timer=-1;
    Timer.style.display="none";
    resetButton.style.display="";
    numCards=3;
    reset();
  }
  else if (n==="hard") {
    timer=-1;
    Timer.style.display="none";
    resetButton.style.display="";
    numCards=6;
    reset();
  }
  else {
    timer=5;
    Timer.style.display="";
    resetButton.style.display="none";
    Timer.textContent=timer
    numCards=6;
    reset();
  }
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
    if(gamemode==="nightmare")
    {
      Timer.style.display="";
      resetButton.style.display="none";
      timer=5;
      Timer.textContent=timer
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
