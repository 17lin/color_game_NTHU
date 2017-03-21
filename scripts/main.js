window.onload = function() {
    init();
};

var numCards = 6;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var is_easy = true;
var is_hard = false;
var is_nightmare = false;
var easyButton  = document.querySelector("#easy");
var hardButton  = document.querySelector("#hard");
var nightmareButton  = document.querySelector("#nightmare");
var resetDisplay = document.querySelector("#reset span");


function init() {
    initCards();
    reset();
}

function initCards() {
    if(is_easy==true){
      numCards=3;
      cards.length=3;
    }
    else{
      numCards=6;
      cards.length=6;
      cards[3].style.opacity=1;
      cards[4].style.opacity=1;
      cards[5].style.opacity=1;
    }
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
    if(!is_nightmare){
      messageDisplay.textContent = "What's the Color?";
    }
    else{
      messageDisplay.textContent = "What's the Color? 5";
      timedText();
      function timedText() {
        setTimeout(myTimeout1, 1000)
        setTimeout(myTimeout2, 2000)
        setTimeout(myTimeout3, 3000)
        setTimeout(myTimeout4, 4000)
        setTimeout(myTimeout5, 5000)
      }
      function myTimeout1() {messageDisplay.textContent = "What's the Color? 4";var result = background.blink();}
      function myTimeout2() {messageDisplay.textContent = "What's the Color? 3";var result = background.blink();}
      function myTimeout3() {messageDisplay.textContent = "What's the Color? 2";var result = background.blink();}
      function myTimeout4() {messageDisplay.textContent = "What's the Color? 1";var result = background.blink();}
      function myTimeout5() {
        messageDisplay.textContent = "TimeOut!";
        resetButton.style.opacity=1;
        resetDisplay.textContent = "Play Again"
        changeColors("#FFF");
        body.style.backgroundColor = pickedColor;
        gameOver = true;
        }
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
easyButton.addEventListener("click", function(){
    is_easy=true;
    is_hard=false;
    is_nightmare=false;
    numCards = 3;
    resetButton.style.opacity=1;
    init();
})
hardButton.addEventListener("click", function(){
    is_easy=false;
    is_hard=true;
    is_nightmare=false;
    numCards = 6;
    resetButton.style.opacity=1;
    init();
})
nightmareButton.addEventListener("click", function(){
    is_easy=false;
    is_hard=true;
    is_nightmare=true;
    numCards = 6;
    cards.length=6;
    cards[3].style.opacity=1;
    cards[4].style.opacity=1;
    cards[5].style.opacity=1;
    resetButton.style.opacity=0;
    init();
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
