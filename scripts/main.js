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

var mode; // "Easy" or "Hard"
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var nmButton = document.querySelector("#nm");

function init() {
    initCards();
    reset();

    easyButton.style.backgroundColor = "blue";
    easyButton.style.color = "red";
    hardButton.style.backgroundColor = "white";
    hardButton.style.color = "black";
    mode = "Easy";

}

function initCards() {
    for (var i = 0; i < cards.length; i++) {
        //add click listeners to cards
        cards[i].addEventListener("click", function() {
            if (gameOver)
                {
                  clearInterval(CDing);
                  return;
                }
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
    resetButton.style.display = "block";
    clearInterval(CDing);
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
    if(mode == "NM"){
      console.log("IN NM");
      nmset();
    }
}

resetButton.addEventListener("click", function() {
    reset();
})

easyButton.addEventListener("click", function() {
    easyButton.style.backgroundColor = "blue";
    easyButton.style.color = "red";
    hardButton.style.backgroundColor = "white";
    hardButton.style.color = "black";
    nmButton.style.backgroundColor = "white";
    nmButton.style.color = "black";
    rmb = easyButton.style.backgroundColor;
    rmc = easyButton.style.color;
    mode = "Easy";
    numCards = 3;
    reset();
})

hardButton.addEventListener("click", function() {
    hardButton.style.backgroundColor = "blue";
    hardButton.style.color = "red";
    easyButton.style.backgroundColor = "white";
    easyButton.style.color = "black";
    nmButton.style.backgroundColor = "white";
    nmButton.style.color = "black";
    rmb = hardButton.style.backgroundColor;
    rmc = hardButton.style.color;
    mode = "Hard";
    numCards = 6;
    reset();
})

nmButton.addEventListener("click", function() {
    nmButton.style.backgroundColor = "blue";
    nmButton.style.color = "red";
    easyButton.style.backgroundColor = "white";
    easyButton.style.color = "black";
    hardButton.style.backgroundColor = "white";
    hardButton.style.color = "black";
    rmb = nmButton.style.backgroundColor;
    rmc = nmButton.style.color;
    mode = "NM";

    numCards = 6;
    reset();
})

var rmb;
var rmc;

easyButton.addEventListener("mouseover", function() {
    rmb = easyButton.style.backgroundColor;
    rmc = easyButton.style.color;
    easyButton.style.backgroundColor = "white";
    easyButton.style.color = "green";
})

easyButton.addEventListener("mouseout", function() {
    easyButton.style.backgroundColor = rmb;
    easyButton.style.color = rmc;
})

hardButton.addEventListener("mouseover", function() {
    rmb = hardButton.style.backgroundColor;
    rmc = hardButton.style.color;
    hardButton.style.backgroundColor = "white";
    hardButton.style.color = "green";
})

hardButton.addEventListener("mouseout", function() {
    hardButton.style.backgroundColor = rmb;
    hardButton.style.color = rmc;
})

nmButton.addEventListener("mouseover", function() {
    rmb = nmButton.style.backgroundColor;
    rmc = nmButton.style.color;
    nmButton.style.backgroundColor = "white";
    nmButton.style.color = "green";
})

nmButton.addEventListener("mouseout", function() {
    nmButton.style.backgroundColor = rmb;
    nmButton.style.color = rmc;
})

var countdown;
var CDing;
var or = messageDisplay.textContent;

function nmset()
{
  countdown = 5;
  messageDisplay.textContent = or + countdown;
  CDing = setInterval(CD, 1000);
}

function CD()
{
  countdown -= 1;
  resetButton.style.display = "none";
  if(countdown < 0)
  {
    messageDisplay.textContent = "TIMEOUT!";
    resetDisplay.textContent = "Play Again"
    changeColors("#FFF");
    resetButton.style.display = "block";
    //body.style.backgroundColor = clickedColor;
    gameOver = true;
    clearInterval(CDing);
  }
  else messageDisplay.textContent = or + countdown;
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
