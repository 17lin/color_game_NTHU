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
var cntdSecs=5;
var easyButton = document.querySelector("#easymode");
var hardButton = document.querySelector("#hardmode");
var nightmaremodeButton = document.querySelector("#nightmaremode");

function init() {
    numCards = 3;
    initCards();
    reset();
    stop_Timer();
    //initial();
    easyButton.className = 'selected';
    hardButton.className -= 'selected';
    nightmaremodeButton.className -= 'selected';
}

function init2() {
    numCards = 6;
    initCards();
    reset();
    stop_Timer();
    //initial();
    easyButton.className -= 'selected';
    hardButton.className = 'selected';
    nightmaremodeButton.className -= 'selected';
}

function init3() {
    numCards = 6;
    initCards();
    reset();
    initial();
    resetButton.className = 'hidden';
    easyButton.className -= 'selected';
    hardButton.className -= 'selected';
    nightmaremodeButton.className = 'selected';
}

easyButton.addEventListener("click", function() {
  init();
})

hardButton.addEventListener("click", function() {
  init2();
})

nightmaremodeButton.addEventListener("click", function() {
  init3();
})


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
                stop_Timer();
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
    messageDisplay.className -= 'hidden';
}

resetButton.addEventListener("click", function() {
    reset();
    if(nightmaremode.className === 'selected'){
      //initial();
      init3();
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

modeButton.addEventListener("click", function() {
    var el = document.querySelector('button');
})

var countdownid,x;
function initial(){
  clearInterval(countdownid);
  cntdSecs=5;
  x=document.getElementById("timer");
  x.innerHTML=" "+cntdSecs;
  cntdSecs--;
  countdownid=window.setInterval(countdownfunc,1000);
}
function stop_Timer(){
  clearInterval(countdownid);
  x=document.getElementById("timer");
  x.innerHTML="";
  resetButton.className -= 'hidden';
}
function countdownfunc(){
  x.innerHTML=" "+cntdSecs;
  if (cntdSecs==0){
    x.innerHTML="TIMEOUT!";
    body.style.backgroundColor = pickedColor;
    changeColors("#FFF");
    clearInterval(countdownid);
    resetButton.className -= 'hidden';
    gameOver = true;
    messageDisplay.className = 'hidden';
    resetDisplay.textContent = "Play Again"
  }
  cntdSecs--;
}

Button.addEventListener("click", function() {
  this.addClass('selected');
})
