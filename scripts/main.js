window.onload = function() {
    init();
};

var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card,.card2");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var easybutton = document.querySelector("#easybutton");
var hardbutton = document.querySelector("#hardbutton");
var nightmare = document.querySelector("#nightmare");
var isnightmare = false;

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
                resetDisplay.textContent = "Play Again"
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
            }

            else  {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
            if (gameOver===false&&isnightmare===true)
            setTimeout(GGWP, 500);
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
}

function GGWP() {
  messageDisplay.textContent = "TIMEOUT!";
  resetDisplay.textContent = "Play Again"
  changeColors("#FFF");
  var clickedColor = this.style.backgroundColor;
  body.style.backgroundColor = clickedColor;
  gameOver = true;
}

resetButton.addEventListener("click", function() {
    reset();
})

easybutton.addEventListener("click", function() {
  document.getElementById("easybutton").className="choosemode";
  document.getElementById("hardbutton").className="unchoosebutton";
  document.getElementById("nightmare").className="unchoosebutton";
  document.getElementById("hardcard").style.display="none";
  numCards=3;
  isnightmare=false;
    reset();
})
hardbutton.addEventListener("click", function() {
  document.getElementById("hardcard").style.display="block";
  document.getElementById("hardbutton").className="choosemode";
  document.getElementById("easybutton").className="unchoosebutton";
  document.getElementById("nightmare").className="unchoosebutton";
  numCards=6;
  isnightmare=false;
  reset();
})

nightmare.addEventListener("click", function() {
  document.getElementById("hardcard").style.display="block";
  document.getElementById("nightmare").className="choosemode";
  document.getElementById("easybutton").className="unchoosebutton";
  document.getElementById("hardbutton").className="unchoosebutton";
  numCards=6;
  isnightmare=true;
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
