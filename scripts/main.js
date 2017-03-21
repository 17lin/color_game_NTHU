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
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");
var nightmare = document.querySelector("#nightmare");
var timerText = document.querySelector("#timer");
var timerID;

function init() {
    showCard3();
    initButtons();
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
                if(nightmare.classList.contains("active")){
                  resetButton.style.display = "block";
                  timerStop();
                }
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function initButtons(){
  easy.addEventListener("click", function(){
    resetEasy();
  });
  hard.addEventListener("click", function(){
    resetHard();
  });
  nightmare.addEventListener("click", function(){
    resetNightmare();
  });
}
function resetEasy(){
  timerStop();
  easy.classList.add("active");
  hard.classList.remove("active");
  nightmare.classList.remove("active");
  numCards = 3;
  resetButton.style.display = "block";
  reset();
}
function resetHard(){
  timerStop();
  easy.classList.remove("active");
  hard.classList.add("active");
  nightmare.classList.remove("active");
  numCards = 6;
  resetButton.style.display = "block";
  reset();
}
function resetNightmare(){
  timerStop();
  easy.classList.remove("active");
  hard.classList.remove("active");
  nightmare.classList.add("active");
  numCards = 6;
  reset();
  resetButton.style.display = "none";
  initTimer(5);
  timerStart();
}

function showCard6(){
  cards[3].style.display = "block";
  cards[4].style.display = "block";
  cards[5].style.display = "block";
}
function showCard3(){
  cards[3].style.display = "none";
  cards[4].style.display = "none";
  cards[5].style.display = "none";
}

function initTimer(num){
  timerStop();
  timerText.textContent = num;
}
function timerStart(){
  this.timerID = setInterval(function(){
    var time = parseInt(timerText.textContent, 10);
    time--;
    if(time!=0)timerText.textContent = time;
    else{
      timerStop();
      timeOut();
    }
  }, 1000);
}
function timerStop(){
  clearInterval(timerID);
  timerText.textContent = "";
}
function timeOut(){
  messageDisplay.textContent = "Timeout!";
  resetDisplay.textContent = "Play Again"
  resetButton.style.display = "block";
  changeColors("#FFF");
  body.style.backgroundColor = pickedColor;
  gameOver = true;
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

resetButton.addEventListener("click", function() {
  if(nightmare.classList.contains("active")){
    resetNightmare();
  }
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
