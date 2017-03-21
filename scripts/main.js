window.onload = function() {
    init();
};

var numCards = 3; //origional is 3
var hardNumCards = 6;
var count;
var gameMode = new Number(0);
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var timeDisplay = document.querySelector("time");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var nightmareButton = document.querySelector("#nightmare");


function init() {
  //init easyButton blue
  easyButton.style.backgroundColor = "steelblue";
  easyButton.style.color = "white";
  hardButton.style.backgroundColor = "white";
  hardButton.style.color = "#484848";
  nightmareButton.style.backgroundColor = "white";
  nightmareButton.style.color = "#484848";

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
                clearInterval(count);
                resetDisplay.textContent = "Play Again";
                resetButton.style.display = "inherit";
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function count4(){
  timer = 4;
  var delayMillis = 100;

  setTimeout(function() {
    body.style.backgroundColor= "#232323";
  }, delayMillis);
  body.style.backgroundColor = "#FFFFFF";
  messageDisplay.textContent = "4";
  count = setTimeout(count3, 1000);
}

function count3(){
  timer = 3;
  var delayMillis = 100;

  setTimeout(function() {
    body.style.backgroundColor= "#232323";
  }, delayMillis);
  body.style.backgroundColor = "#FFFFFF";
  messageDisplay.textContent = "3";
  count = setTimeout(count2, 1000);
}

function count2(){
  timer = 2;
  var delayMillis = 100;

  setTimeout(function() {
    body.style.backgroundColor= "#232323";
  }, delayMillis);
  body.style.backgroundColor = "#FFFFFF";
  messageDisplay.textContent = "2";
  count = setTimeout(count1, 1000);
}

function count1(){
  timer = 1;
  var delayMillis = 100;

  setTimeout(function() {
    body.style.backgroundColor= "#232323";
  }, delayMillis);
  body.style.backgroundColor = "#FFFFFF";
  messageDisplay.textContent = "1";
  count = setTimeout(count0, 1000);
}

function count0(){
  timer = 0;

  body.style.backgroundColor = pickedColor;
  changeColors("#FFF");
  messageDisplay.textContent = "TIMEOUT";
  gameOver = true;
  resetDisplay.textContent = "Play Again";
  resetButton.style.display = "inherit";
}

function reset() {

    gameOver = false;
    if (gameMode == 0) colors = generateRandomColors(numCards);
    else colors = generateRandomColors(hardNumCards);

    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?";

    if (gameMode == 2) {
      timer = 5;
      resetButton.style.display = "none";
      messageDisplay.textContent = "5";
      count = setTimeout(count4, 1000);
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
  reset();
})

easyButton.addEventListener("click", function() {
  easyButton.style.backgroundColor = "steelblue";
  easyButton.style.color = "white";
  hardButton.style.backgroundColor = "white";
  hardButton.style.color = "#484848";
  nightmareButton.style.backgroundColor = "white";
  nightmareButton.style.color = "#484848";
clearInterval(count);
  gameMode = 0;
  resetDisplay.textContent = "Play Again";
  resetButton.style.display = "inherit";
  reset();

})

hardButton.addEventListener("click", function() {
  easyButton.style.backgroundColor = "white";
  easyButton.style.color = "#484848";
  hardButton.style.backgroundColor = "steelblue";
  hardButton.style.color = "white";
  nightmareButton.style.backgroundColor = "white";
  nightmareButton.style.color = "#484848";
clearInterval(count);
  gameMode = 1;
  resetDisplay.textContent = "Play Again";
  resetButton.style.display = "inherit";
  reset();

})

nightmareButton.addEventListener("click", function() {
  easyButton.style.backgroundColor = "white";
  easyButton.style.color = "#484848";
  hardButton.style.backgroundColor = "white";
  hardButton.style.color = "#484848";
  nightmareButton.style.backgroundColor = "steelblue";
  nightmareButton.style.color = "white";
clearInterval(count);
  gameMode = 2;
  resetDisplay.textContent = "Play Again";
  resetButton.style.display = "inherit";
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
