window.onload = function() {
    init();
    cntdn();
};

var right=0;
var numCards = 6;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var time = document.querySelector("#time");
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
            click=1;
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
                resetButton.style.display="block";
                right=1;
                if(gameOver==true){
                  clearTimeout(t5);
                  clearTimeout(t4);
                  clearTimeout(t3);
                  clearTimeout(t2);
                  clearTimeout(t1);
                  clearTimeout(t0);
                }

                time.textContent ="";
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset() {
    right=0;
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
var t5,t4,t3,t2,t1,t0;

function cntdn(){
  gameOver=false;
  right=0;
  resetButton.style.display="none";
  t5= setTimeout(T5, 0);
  t4= setTimeout(T4, 1000);
  t3= setTimeout(T3, 2000);
  t2= setTimeout(T2, 3000);
  t1= setTimeout(T1, 4000);
  t0= setTimeout(T0, 5000);
}

function T5(){
  if(gameOver==false){
    time.textContent =" 5";
  }
}
function T4(){
  if(gameOver==false){
    time.textContent =" 4";
    blinkit();
  }
}
function T3(){
  if(gameOver==false){
    time.textContent =" 3";
    blinkit();
  }
}
function T2(){
  if(gameOver==false){
    time.textContent =" 2";
    blinkit();
  }
}
function T1(){
  if(gameOver==false){
    time.textContent =" 1";
    blinkit();
  }
}
function T0(){
  gameOver=true;
  if(right==0){
    messageDisplay.textContent = "TIMEOUT!";
    time.textContent ="";
    resetDisplay.textContent = "Play Again"
    changeColors("#FFF");
    body.style.backgroundColor = pickedColor;
    resetButton.style.display="block";
  }
}
function blinkit(){
intrvl=0;
for(nTimes=0;nTimes<1;nTimes++){
intrvl += 200;
setTimeout("body.style.backgroundColor='white';",intrvl);
intrvl += 200;
setTimeout("body.style.backgroundColor='black';",intrvl);
   }
}
