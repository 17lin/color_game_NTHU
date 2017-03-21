window.onload = function() {
    init();
};

var numCards = 3;
var state = 1;
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
var easyButton = document.querySelector("#easy-mode");
var hardButton = document.querySelector("#hard-mode");
var nightmareButton = document.querySelector("#nightmare");
var timerDisplay = document.querySelector("#timer");
var time = 5;


function init() {
    initCards();
    reset();
    easyButton.style.backgroundColor = "steelblue";
    easyButton.style.color = "white";
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
    if (state == 3){
      resetButton.style.visibility = 'hidden';
    }
    time = 5;
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

hardButton.addEventListener("click", function() {
  if(state!=2){
    state = 2;
    numCards = 6;
    hardButton.style.backgroundColor = "steelblue";
    hardButton.style.color = "white";
    easyButton.style.backgroundColor = "white";
    easyButton.style.color = "black";
    nightmareButton.style.backgroundColor = "white";
    nightmareButton.style.color = "black";
    timerDisplay.textContent = "";
    resetButton.style.visibility = 'visible';
    initCards();
    reset();
  }
})
easyButton.addEventListener("click", function() {
    if(state != 1){
      state = 1;
      numCards = 3;
      easyButton.style.backgroundColor = "steelblue";
      easyButton.style.color = "white";
      hardButton.style.backgroundColor = "white";
      hardButton.style.color = "black";
      nightmareButton.style.backgroundColor = "white";
      nightmareButton.style.color = "black";
      timerDisplay.textContent = "";
      resetButton.style.visibility = 'visible';
      initCards();
      reset();
    }
})
nightmareButton.addEventListener("click", function() {
    if(state != 3){
      state = 3;
      numCards = 6;
      time = 5;
      nightmareButton.style.backgroundColor = "steelblue";
      nightmareButton.style.color = "white";
      easyButton.style.backgroundColor = "white";
      easyButton.style.color = "black";
      hardButton.style.backgroundColor = "white";
      hardButton.style.color = "black";
      initCards();
      reset();
      resetButton.style.visibility = 'hidden';
      var timeoutVar = setTimeout(myTimeout, 5000);
      var timerVar = setInterval(myTimer, 1000);
      timerDisplay.textContent = time;
    }
})
function timerStart(){
//  var timeoutVar = setTimeout(myTimeout, 5000);
  var timerVar = setInterval(myTimer, 1000);
}
function myTimeout(){
//  clearInterval(timeVar);
  messageDisplay.textContent = "Timeout!"
  timerDisplay.textContent = "";
  resetDisplay.textContent = "Play Again"
  changeColors("#FFF");
  body.style.backgroundColor = pickedColor;
  gameOver = true;
  resetButton.style.visibility = 'visible';
  time = 5;
}
function myTimer(){
  if(state == 3 && gameOver == false){
    timerDisplay.textContent = time;
    time--;
    if(time > 0){
      timerDisplay.textContent = time;
    }
    else{

//      cleatInterval(timerVar);
    }
  }
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
