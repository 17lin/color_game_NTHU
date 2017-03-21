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
var easyDisplay = document.getElementById("easymode");
var hardDisplay = document.getElementById("hardmode");

function change_div(id){
  if (id == 'easy' )
  {
     //hardDisplay.style.display = 'none' ;
     //easyDisplay.style.display = 'block' ;
     easyDisplay.style.backgroundColor = "#4482e5";
     easyDisplay.style.color = "white";
     easyDisplay.style.fontWeight = "bold";
     hardDisplay.style.backgroundColor = "white";
     hardDisplay.style.color = "black";
     hardDisplay.style.fontWeight = "normal";
     document.getElementById("hard").style.display= 'none';
     reset(3);
     numCards = 3;
  }
  else if (id == 'hard' )
  {
     //easyDisplay.style.display = 'none' ;
     //hardDisplay.style.display = 'block' ;
     document.getElementById("hard").style.display= 'block';
     hardDisplay.style.backgroundColor = "#4482e5";
     hardDisplay.style.color = "white";
     hardDisplay.style.fontWeight = "bold";
     easyDisplay.style.backgroundColor = "white";
     easyDisplay.style.color = "black";
     easyDisplay.style.fontWeight = "normal";
     reset(6);
     numCards = 6;
  }
}

function init() {
    initCards();
    reset(3);
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

function reset(numCards) {
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
    reset(numCards);
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
