window.onload = function() {
    init();
};

var mode = 1;
var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var modes = document.querySelectorAll(".mode");
var nightmareButton = document.getElementById("nightmare");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");

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

function easy() {
      mode = 1;
      numCards = 3;
      reset();

}

function hard(){
    mode = 2;
    numCards = 6;
    reset();

}

function nightmare(){
  mode = 3;
  numCards = 6;
  reset();
  countdown(6);
}

resetButton.addEventListener("click", function() {
    if(mode==3){
      clearInterval(count);
      nightmare();
    }
    else{
      reset();
    }
})
modes[0].addEventListener("click", function() {
    easy();
    this.style.color = white;
    this.style.background = steelblue;
})
modes[1].addEventListener("click", function() {
    hard();

})
modes[2].addEventListener("click", function() {
    nightmare();

})

function countdown(time){
  if(mode==3){
  count = setInterval(function(){
    time =time-1;
    messageDisplay.textContent = "What's the Color? " +time;
    if (gameOver == true || mode!=3){
        clearInterval(count);
    }
    else if(time == 0){
      messageDisplay.textContent = "Timeout!";
      changeColors("#FFF");
      body.style.backgroundColor = pickedColor;
      gameOver = true;
      clearInterval(count);
    }
  }, 1000);}
  else
    clearInterval(count);

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
