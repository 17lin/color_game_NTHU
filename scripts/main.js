window.onload = function() {
    init();
};

var select = 0;
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
var timer = document.querySelector("#timer");//timer
var t=5;
var interval;
function init() {
    initCards();
    reset();
}

function select0(){
    if(select !== 0){
      select = 0;
      numCards = 3;
      changefontcolor();
      init();

    }
}

function select1(){
    if(select !== 1){
      select = 1;
      numCards = 6;
      changefontcolor();
      init();
    }
}

function select2(){
    if(select !== 2){
      select = 2;
      numCards = 6;
      changefontcolor();
      init();
    }
}
function changefontcolor(){
    if(select === 0){
      document.getElementById("easy").style.color="blue";
      document.getElementById("hard").style.color = "black";
      document.getElementById("nightmare").style.color = "black";
    }
  else if(select === 1){
      document.getElementById("easy").style.color = "black";
      document.getElementById("hard").style.color = "blue";
      document.getElementById("nightmare").style.color = "black";
  }
  else if(select === 2){//nightmare
    t = 5;
    document.getElementById("easy").style.color = "black";
    document.getElementById("hard").style.color = "black";
    document.getElementById("nightmare").style.color = "blue";
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
                resetDisplay.textContent = "Play Again"
                if(select === 2){
                  timer.textContent ="";
                  resetButton.style.visibility="visible";
                }
                clearInterval(interval);
                t=5;
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
                /*if(select !== 2){
                  timer.textContent ="";
                }*/
            }
        });
    }
}

function timeout(){
  if(t!==1 ){
    t = t-1;
    timer.textContent = t.toString();
    resetButton.style.visibility="hidden";
    body.style.backgroundColor = "#FFF";
    setTimeout(myFunction, 120);
  }
  else if(t === 1){
    gameOverNightmare();//close the game
  }
}

function myFunction(){
  body.style.backgroundColor = "#232323";
}

function gameOverNightmare(){
  timer.textContent ="";
  messageDisplay.textContent = "Timeout";
  resetDisplay.textContent = "Play Again"
  changeColors("#FFF");
  body.style.backgroundColor = pickedColor;
  resetButton.style.visibility="visible";
    clearInterval(interval);
  gameOver = true;
  t=5;
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
   if(select === 2){
    interval = setInterval(timeout,1000);
    resetButton.style.visibility="hidden";
    timer.textContent = "5";
    }
    else {
      clearInterval(interval);
      timer.textContent = "";
      resetButton.style.visibility="visible";
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
