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

var h2 = document.querySelector("h2");
var count=5;
var btnhard = document.getElementById("mh");
var btnnight = document.getElementById("mn");
var btneasy = document.getElementById("me");
var countnum;
function init() {
    initCards();
    reset();
    choosemode();
}
function choosemode(){

  btnhard.addEventListener("click", function() {
      btnhard.style.background = 'red';
      btnnight.style.background = 'white';
      btneasy.style.background = 'white';
      numCards = 6;
      reset();
      clearInterval(countnum);
      h2.textContent= "";

  });
  btnnight.addEventListener("click", function() {
      btnnight.style.background = 'red';
      btnhard.style.background = 'white';
      btneasy.style.background = 'white';
      numCards = 6;
      reset();
  });
  btneasy.addEventListener("click", function() {
      btneasy.style.background = 'red';
      btnhard.style.background = 'white';
      btnnight.style.background = 'white';
      numCards = 3;
      reset();
      clearInterval(countnum);
      h2.textContent= "";
  });
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
                clearInterval(countnum);
                count=5;
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
var blink;
function reset() {
  count=6;
  if(btnnight.style.background == 'red'){
    countnum=setInterval(countdown,1000);
  }
  blink=setInterval(blin,1000);
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
function blin(){
  var origincolor=body.style.backgroundColor;
  body.style.backgroundColor = 'white';
  body.style.backgroundColor = origincolor;
}
function countdown(){
  if(count>1){
    count=count-1;
    if(btnnight.style.background == 'red')messageDisplay.textContent= "What's the color? "+count;
    else h2.textContent= "";
  }else{
    messageDisplay.textContent= "TIMEOUT!";
    count=5;
    resetDisplay.textContent = "Play Again"
    changeColors("#FFF");
    body.style.backgroundColor = pickedColor;
    gameOver = true;
    clearInterval(countnum);
  }
}
