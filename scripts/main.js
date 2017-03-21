window.onload = function() {
    init();
};

var numCards = 3;
var numCardsHard = 6;
var timer = new Number(0);
var count;
var gameMode = new Number(0);
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
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var nightmareButton = document.querySelector("#nightmare");

function init() {
    easyButton.style.color = "white";
    easyButton.style.background = "steelblue";
    hardButton.style.color = "#484848";
    hardButton.style.background = "white";
    nightmareButton.style.color = "#484848";
    nightmareButton.style.background = "white";
    initCards();
    reset();
}

function count4() {
    messageDisplay.textContent = "What's the Color? 4";
    count = setTimeout(count3, 1000);
}

function count3() {
    messageDisplay.textContent = "What's the Color? 3";
    count = setTimeout(count2, 1000);
}

function count2() {
    messageDisplay.textContent = "What's the Color? 2";
    count = setTimeout(count1, 1000);
}

function count1() {
    messageDisplay.textContent = "What's the Color? 1";
    count = setTimeout(count0, 1000);
}

function count0() {
    messageDisplay.textContent = "TIMEOUT!";
    changeColors("#FFF");
    body.style.backgroundColor = pickedColor;
    count = gameOver = true;
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
    if(gameMode == 0) colors = generateRandomColors(numCards);
    else colors = generateRandomColors(numCardsHard);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    if(gameMode == 2) {
      timer = 5;
      count = setTimeout(count4, 1000);
      messageDisplay.textContent = "What's the Color? 5";
    }else {
      messageDisplay.textContent = "What's the Color?";
    }
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
  clearTimeout(count);
  reset();
})

easyButton.addEventListener("click", function() {
  easyButton.style.color = "white";
  easyButton.style.background = "steelblue";
  hardButton.style.color = "#484848";
  hardButton.style.background = "white";
  nightmareButton.style.color = "#484848";
  nightmareButton.style.background = "white";
  clearTimeout(count);
  gameMode = 0;
  reset();
})

hardButton.addEventListener("click", function() {
  easyButton.style.color = "#484848";
  easyButton.style.background = "white";
  hardButton.style.color = "white";
  hardButton.style.background = "steelblue";
  nightmareButton.style.color = "#484848";
  nightmareButton.style.background = "white";
  clearTimeout(count);
  gameMode = 1;
  reset();
})

nightmareButton.addEventListener("click", function() {
  easyButton.style.color = "#484848";
  easyButton.style.background = "white";
  hardButton.style.color = "#484848";
  hardButton.style.background = "white";
  nightmareButton.style.color = "white";
  nightmareButton.style.background = "steelblue";
  clearTimeout(count);
  gameMode = 2;
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
