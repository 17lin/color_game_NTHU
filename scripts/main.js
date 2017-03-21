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

var f1=0, f2=1, f3=1;

var countdownid;
var t = document.getElementById("countdown");
var countdownnumber=5;

var flag = 0;

function init() {
    initCards();
    reset();

}

function a1(x) {
  if(f1){
    x.style.color = "red";
  }
}

function b1(x) {
  if(f1){
    x.style.color = "#484848";
  }
}

function a2(x) {
  if(f2){
    x.style.color = "red";
  }
}

function b2(x) {
  if(f2){
    x.style.color = "#484848";
  }
}

function a3(x) {
  if(f3){
    x.style.color = "red";
  }
}

function b3(x) {
  if(f3){
    x.style.color = "#484848";
  }
}

function easyMode() {
  var x = document.getElementById("easy");
  var y = document.getElementById("hard");
  var z = document.getElementById("nightmare");
  numCards = 3;
  f1=0;
  f2=1;
  f3=1;
  x.style.color = "white";
  x.style.background = "steelblue";
  y.style.color = "#484848";
  y.style.background = "white";
  z.style.color = "#484848";
  z.style.background = "white";
  t.style.display="none";
  resetButton.style.display="";

  flag = 0;
  clearInterval(countdownid);

  initCards();
  reset();

}

function hardMode() {
  var x = document.getElementById("easy");
  var y = document.getElementById("hard");
  var z = document.getElementById("nightmare");
  numCards = 6;
  f1=1;
  f2=0;
  f3=1;
  x.style.color = "#484848";
  x.style.background = "white";
  y.style.color = "white";
  y.style.background = "steelblue";
  z.style.color = "#484848";
  z.style.background = "white";
  t.style.display="none";
  resetButton.style.display="";

  flag = 0;
  clearInterval(countdownid);

  initCards();
  reset();

}

function nightMode() {
  flag = 1;
  var x = document.getElementById("easy");
  var y = document.getElementById("hard");
  var z = document.getElementById("nightmare");
  numCards = 6;
  f1=1;
  f2=1;
  f3=0;
  x.style.color = "#484848";
  x.style.background = "white";
  y.style.color = "#484848";
  y.style.background = "white";
  z.style.color = "white";
  z.style.background = "steelblue";

  clearInterval(countdownid);
  t.style.display="";
  resetButton.style.display="none";
  countdownnumber = 5;
  t.innerHTML=countdownnumber;
  countdownnumber--;
  countdownid=window.setInterval(countdownfunc, 1000);

  initCards();
  reset();
}

function countdownfunc(){
  t.innerHTML=countdownnumber;
  if (countdownnumber==0){
    clearInterval(countdownid);
    timeOut();
  }
  countdownnumber--;
}

function timeOut() {
  t.innerHTML="TIME OUT!"

  messageDisplay.textContent = "";
  resetButton.style.display="";
  resetDisplay.textContent = "Play Again"
  changeColors("#FFF");
  body.style.backgroundColor = pickedColor;
  gameOver = true;
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
                resetDisplay.textContent = "Play Again";
                resetButton.style.display="";
                clearInterval(countdownid);
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
    resetDisplay.textContent = "New Color";
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
  if(flag){
    nightMode();
  }
  else{
    reset();
  }
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
