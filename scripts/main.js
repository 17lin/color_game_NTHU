window.onload = function() {
    init();
};

var numCards = 3;
var gameOver = false;
var night = false;
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
var countdownnumber=5;
var countdownid;

function blink() {
  body.style.backgroundColor = '#FFFFFF';
  setTimeout(function () {
    body.style.backgroundColor = '#232323';
  }, 100);
  body.style.backgroundColor = '#FFFFFF';
  if(gameOver)
  {
  body.style.backgroundColor = pickedColor;
}
}

function initialclock(){
  messageDisplay.innerHTML="What's the color? " + countdownnumber;
  resetButton.style.visibility="hidden";
  countdownnumber--;
  countdownid=window.setInterval(countdownfunc,1000);
}
function countdownfunc(){
  messageDisplay.innerHTML="What's the color? " + countdownnumber;
  if (countdownnumber==0){
    changeColors("#FFF");
      resetDisplay.textContent = "Play Again";
    body.style.backgroundColor = pickedColor;
    resetButton.style.visibility="visible";
    gameOver = true;
    messageDisplay.innerHTML="TIMEOUT!";
    clearInterval(countdownid);
  }
  blink();
  countdownnumber--;
  if(night==false)
  {
      messageDisplay.innerHTML="What's the color?";
      resetButton.style.visibility="visible";
    clearInterval(countdownid);
  }
}

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
                resetDisplay.textContent = "Play Again";
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
                clearInterval(countdownid);
                resetButton.style.visibility="visible";
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again";
                if(night==true)
                {
                  messageDisplay.textContent = "Try Again " + countdownnumber;
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
    resetDisplay.textContent = "New Color";
    resetButton.style.visibility="visible";
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
    if(night==true)
    {
    countdownnumber=5;
    initialclock();
  }
})

Easy.addEventListener("click", function() {
  numCards = 3;
  night = false;
  for(var i=1;i<4;i++)
   {
   if(i==1)
       document.getElementById("CSS"+i).disabled= false;
   else
       document.getElementById("CSS"+i).disabled= true;
   }
   reset();
})

Hard.addEventListener("click", function() {
  numCards = 6;
  night = false;
  for(var i=1;i<4;i++)
   {
   if(i==2)
       document.getElementById("CSS"+i).disabled= false;
   else
       document.getElementById("CSS"+i).disabled= true;
   }
   reset();
})

Nightmare.addEventListener("click", function() {
  numCards = 6;
  night = true;
  for(var i=1;i<4;i++)
   {
   if(i==3)
       document.getElementById("CSS"+i).disabled= false;
   else
       document.getElementById("CSS"+i).disabled= true;
   }
   reset();
   countdownnumber=5;
   initialclock();
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
