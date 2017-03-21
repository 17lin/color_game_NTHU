window.onload = function() {
    init();
};

var numCards = 3;
var mode=1;
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

var mode1Button = document.querySelector("#mode1");
var mode2Button = document.querySelector("#mode2");
var mode3Button = document.querySelector("#mode3");
var timer = document.querySelector("#Timer");
var num=5;
var id;
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
                resetDisplay.style.opacity=1;
                resetButton.style.opacity=1;
                timer.textContent='';
                clearInterval(id);
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
  num=5;
  clearInterval(id);
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
    if(mode==3){
    time();
   }
})




if(mode==1){
  mode1Button.style.backgroundColor= 'blue';
  mode2Button.style.backgroundColor= 'white';
  mode3Button.style.backgroundColor= 'white';
}
function mode1(){
  numCards=3;
  mode=1;
  reset();
  mode1Button.style.backgroundColor= 'blue';
  mode2Button.style.backgroundColor= 'white';
  mode3Button.style.backgroundColor= 'white';
}
function mode2(){
  mode=2;
  numCards=6;
  reset();
  mode1Button.style.backgroundColor= 'white';
  mode2Button.style.backgroundColor= 'blue';
  mode3Button.style.backgroundColor= 'white';
}
function mode3(){
  mode=3;
  numCards=6;
  reset();
  mode1Button.style.backgroundColor= 'white';
  mode2Button.style.backgroundColor= 'white';
  mode3Button.style.backgroundColor= 'blue';
}

function time(){
  timer.textContent=num;
  if(num>0){
  num--;
  if(mode==3){
  resetDisplay.style.opacity=0;
  resetButton.style.opacity=0;
}
  id = window.setInterval(countdownfunc,1000);
  }
  else {
    clearInterval(id);
  }
}
function countdownfunc(){
  timer.textContent=num;
  if (num==0){
    gameover();
    clearInterval(id);
    timer.textContent='';
  }
  if(num>0)
  num--;
}
function gameover(){
  resetDisplay.style.opacity=1;
  resetButton.style.opacity=1;
  messageDisplay.textContent = "Time out!!";
  resetDisplay.textContent = "Play Again"
  changeColors("#FFF");
  body.style.backgroundColor = pickedColor;
  gameOver = true;
}

mode1Button.addEventListener("click", function() {
  mode1();
  timer.textContent='';
  resetDisplay.style.opacity=1;
  resetButton.style.opacity=1;
})
mode2Button.addEventListener("click", function() {
   mode2();
   timer.textContent='';
   resetDisplay.style.opacity=1;
   resetButton.style.opacity=1;
})
mode3Button.addEventListener("click", function() {
  mode3();
   time();
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
