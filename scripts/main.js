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
var easyModeButton = document.querySelector("#easy");
var easyModeDisplay = document.querySelector("#easy span");
var hardModeButton = document.querySelector("#hard");
var hardModeDisplay = document.querySelector("#hard span");
var countdownnumber=5;
var countdownid;
var timeoutContext = document.getElementById("countdown");
var nightmare = false;
var nightmareButton = document.querySelector("#nightmare");
easyModeButton.style.backgroundColor = "steelblue";
easyModeButton.style.color = "white";
hardModeButton.style.backgroundColor = "white";
hardModeButton.style.color = "#484848";
nightmareButton.style.backgroundColor = "white";
nightmareButton.style.color = "#484848";

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
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
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
}

resetButton.addEventListener("click", function() {
    reset();
})

easyModeButton.addEventListener("click", function() {
  easyModeButton.style.backgroundColor = "steelblue";
  easyModeButton.style.color = "white";
  hardModeButton.style.backgroundColor = "white";
  hardModeButton.style.color = "#484848";
  nightmareButton.style.backgroundColor = "white";
  nightmareButton.style.color = "#484848";

  numCards = 3;
  init();
})

hardModeButton.addEventListener("click", function() {
  hardModeButton.style.backgroundColor = "steelblue";
  hardModeButton.style.color = "white";
  easyModeButton.style.backgroundColor = "white";
  easyModeButton.style.color = "#484848";
  nightmareButton.style.backgroundColor = "white";
  nightmareButton.style.color = "#484848";

  numCards = 6;
  init();
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

nightmareButton.addEventListener("click", function() {
  nightmareButton.style.backgroundColor = "steelblue";
  nightmareButton.style.color = "white";
  easyModeButton.style.backgroundColor = "white";
  easyModeButton.style.color = "#484848";
  hardModeButton.style.backgroundColor = "white";
  hardModeButton.style.color = "#484848";
  nightmare = true;
  countdownfunc();
  countdownnumber=5;
  timeoutContext = document.getElementById("countdown");
  timeoutContext.innerHTML = countdownnumber;
  countdownnumber--;
  countdownid=window.setInterval(countdownfunc,1000);
})

function countdownfunc(){
  timeoutContext.style.display = "block";
  timeoutContext.innerHTML = countdownnumber;
  if (countdownnumber == 0){
    clearInterval(countdownid);
    messageDisplay.textContent = "TimeOut!";
    timeoutContext.style.display = "none";
    resetDisplay.textContent = "Play Again";
    resetButton.style.display = "block";
    changeColors("#FFF"); //white
    body.style.backgroundColor = pickedColor;
    gameOver = true;
  }
  else {
    resetButton.style.display = "none";
  }
  countdownnumber--;
  nightmare = false;
}
