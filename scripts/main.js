window.onload = function() {
    init();
};

var mode = 0;
var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var eas_button = document.querySelector("#easy_mode");
var har_button = document.querySelector("#hard_mode");
var ni_button = document.querySelector("#nightmare_mode");
var card_container = document.getElementById("card-container");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");

var card = document.querySelector("#card");
var timer = document.getElementById("timer");
var time = 5;
var blink = document.getElementById("blink");

eas_button.addEventListener("click", function (){mode = 0;select_mode();});
har_button.addEventListener("click", function (){mode = 1;select_mode();});
ni_button.addEventListener("click", function (){mode = 2;select_mode();});


eas_button.style.backgroundColor = "yellow";

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
                changeColors("#CCC");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
                time = 6;
                resetButton.style.visibility = 'visible';
                timer.style.visibility = 'hidden';
                blink.style.animation = '';
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
      resetDisplay.textContent = "RETRY"
    messageDisplay.textContent = "What is the Color?";
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




var counting = 0;

function select_mode(){
    if(mode == 0){
        counting = 0;
        ni_button.style.backgroundColor = "white";
        eas_button.style.backgroundColor = "yellow";
        timer.style.visibility = 'hidden';
        numCards = 3;
        resetButton.style.visibility = 'visible';
        har_button.style.backgroundColor = "white";
    }else{
    numCards = 6;
    if(mode == 1){
        timer.style.visibility = 'hidden';
        ni_button.style.backgroundColor = "white";        
        counting = 0;        
        eas_button.style.backgroundColor = "white";
        resetButton.style.visibility = 'visible';
        har_button.style.backgroundColor = "yellow";
    }
    else{
        counting = 1;
        ni_button.style.backgroundColor = "yellow";       
        har_button.style.backgroundColor = "white";
        timer.style.visibility = 'visible';
        eas_button.style.backgroundColor = "white";
        resetButton.style.visibility = 'hidden';        
    }

    }
    reset();
}

function tick() {
    if(mode == 2){
        if(time == 0){
            timer.textContent = 5;
            gameOver = true;
            timer.style.visibility = 'hidden';
            changeColors("#FFF");
            body.style.backgroundColor = pickedColor;
            time = 6;
            resetButton.style.visibility = 'visible';
            messageDisplay.textContent = 'TIMEOUT!';
        }else{
            timer.textContent = 5;
            time--;
            timer.textContent = time;
            if(counting != 1) time++;
            timer.style.visibility = 'visible';
        }
    }

}

var id = setInterval(tick, 1000);

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
    var arr = [];
    //repeat num times
    for (var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor());
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
