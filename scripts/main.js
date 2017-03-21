window.onload = function() {
    init();
};

var difficult = 0;
var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var timerDisplay = document.querySelector("#timer");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var timerID;
var timer = 5;

function init() {
    initCards();
    reset();
}

function difficult0(){
    if(difficult !== 0){
      difficult = 0;
      numCards = 3;
      changefontcolor();
      init();
    }
}

function difficult1(){
    if(difficult !== 1){
      difficult = 1;
      numCards = 6;
      changefontcolor();
      init();
    }
}

function difficult2(){
    if(difficult !== 2){
      difficult = 2;
      numCards = 6;
      changefontcolor();
      init();
    }
}

function changefontcolor(){
    if(difficult == 0){
      document.getElementById("easy").style.color="blue";
      document.getElementById("hard").style.color="black";
      document.getElementById("nightmare").style.color="black";
    }
  else if(difficult == 1){
      document.getElementById("easy").style.color="black";
      document.getElementById("hard").style.color="blue";
      document.getElementById("nightmare").style.color="black";
  }
  else if(difficult == 2){
      document.getElementById("easy").style.color="black";
      document.getElementById("hard").style.color="black";
      document.getElementById("nightmare").style.color="blue";
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
                resetButton.style.display = "block";
                resetDisplay.textContent = "Play Again"
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
                if(difficult == 2){
                  clearInterval(timerID);
                  timerDisplay.style.display = "none";
                }
            } 
            else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset() {
    gameOver = false;
    timer = 5;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    if(difficult != 2){
      messageDisplay.textContent = "What's the Color?";
      resetButton.style.display = "block";
      timerDisplay.style.display = "none";
      clearInterval(timerID);
    }
    if(difficult == 2){
        messageDisplay.textContent = "What's the Color?";
        timerDisplay.style.display = "block";
        resetButton.style.display = "none";
        timerDisplay.textContent = timer.toString();
        timerID = setInterval(changeTimer, 1000);
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

function changeTimer(){
    if(timer !== 1){
      timer--;
      timerDisplay.textContent = timer.toString();

      console.log(timer.toString());
    }
    else{
      clearInterval(timerID);
      timerDisplay.style.display = "none";
      messageDisplay.textContent = "Time out!";
      resetButton.style.display = "block";
      resetDisplay.textContent = "Play Again";
      changeColors("#FFF");
      body.style.backgroundColor = pickedColor;
      gameOver = true;
      console.log(timer.toString());
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
