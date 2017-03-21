window.onload = function() {
    init();
};

var timer, tmpTimer, remain, timeBoard;
var mode = 1;
var btns = [];
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

function init() {
    initCards();
    initBtns();
    timeBoard=document.querySelector("#time");
    reset();
}

function initBtns() {
  var btn=document.querySelector("#easy");
  btn.addEventListener("click", function(event) {
    btns[0].classList.remove("selected");
    btns[1].classList.remove("selected");
    btns[2].classList.remove("selected");
    if (mode===3) {
      clearInterval(timer);
    }
    mode=1;
    event.target.classList.add("selected");
    numCards=3;
    reset();
  });
  btns.push(btn);

  btn=document.querySelector("#hard");
  btn.addEventListener("click", function(event) {
    btns[0].classList.remove("selected");
    btns[1].classList.remove("selected");
    btns[2].classList.remove("selected");
    if (mode===3) {
      clearInterval(timer);
    }
    mode=2;
    event.target.classList.add("selected");
    numCards=6;
    reset();
  });
  btns.push(btn);

  var btn=document.querySelector("#nightmare");
  btn.addEventListener("click", function(event) {
    btns[0].classList.remove("selected");
    btns[1].classList.remove("selected");
    btns[2].classList.remove("selected");
    if (mode===3) {
      clearInterval(timer);
    }
    mode=3;
    event.target.classList.add("selected");
    numCards=6;
    reset();
  });
  btns.push(btn);
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
                if (mode===3) {
                  clearInterval(timer);
                }
                messageDisplay.textContent = "Correct!";
                timeBoard.style.visibility="hidden";
                resetDisplay.textContent = "Play Again"
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                resetButton.style.visibility="visible";
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

    if (mode==3) {
      timer=setInterval(countdown,1000);
      resetButton.style.visibility="hidden";
      timeBoard.style.visibility="visible";
      remain=5;
      timeBoard.textContent="5";
    } else {
      resetButton.style.visibility="visible";
      timeBoard.style.visibility="hidden";
    }
}

function countdown() {
  remain--;
  timeBoard.textContent=remain.toString();
  if (remain===0) {
    gameOver = true;
    changeColors("#FFF");
    body.style.backgroundColor = pickedColor;
    timeBoard.style.visibility="hidden";
    clearInterval(timer);
    messageDisplay.textContent = "TIMEOUT!!";
    resetButton.style.visibility="visible";
  } else {
    body.style.backgroundColor = "#FFF";
    tmpTimer=setInterval(blink,90);
  }
}

function blink() {
  body.style.backgroundColor = "#232323";
  clearInterval(tmpTimer);
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
