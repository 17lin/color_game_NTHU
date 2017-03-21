window.onload = function() {
    init();
};
var mode = 1;//1 easy, 2 hard, 3 nightmare
var easy = document.getElementById("easy");
var hard = document.getElementById("hard");
var night = document.getElementById("night");
var hide = document.getElementById("hide");
var numCards = 3;
var num = 5;
var cdd = document.getElementById("cd");
var count;

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

    easy.addEventListener("click", function(){
        discount();
        messageDisplay.innerHTML = "What's the color?";
        mode = 1;
        numCards = 3;
        easy.style.backgroundColor = "red";
        hard.style.backgroundColor = "white";
        night.style.backgroundColor = "white";
        hide.style.visibility = "hidden";
        resetButton.disabled = false;
        reset();
    });
    hard.addEventListener("click", function(){
        discount();
        messageDisplay.innerHTML = "What's the color?";
        mode = 2;
        numCards = 6;
        easy.style.backgroundColor = "white";
        hard.style.backgroundColor = "red";
        night.style.backgroundColor = "white";
        hide.style.visibility = "visible";
        resetButton.disabled = false;
        reset();
    });
    night.addEventListener("click", function(){
        mode = 3;
        numCards = 6;
        easy.style.backgroundColor = "white";
        hard.style.backgroundColor = "white";
        night.style.backgroundColor = "red";
        hide.style.visibility = "visible";
        resetButton.disabled = true;
        initCards();
        reset();
        num = 5;
        count = setInterval(countdown, 1000);
    });

function countdown(){
    if(!gameOver){
        messageDisplay.innerHTML = "What's the color? " + num;
        num--;
    }
    if(num == -2){
        gameOver = true;
        messageDisplay.textContent = "Time out";
        discount();
        for (var i = 0; i < cards.length; i++) {
            cards[i].style.backgroundColor = "white";
        }
        body.style.backgroundColor = pickedColor;
    }
}

//var myVar = setInterval(function(){ setColor() }, 300);


function discount(){
    clearInterval(count);
}

function init() {
    initCards();
    reset();
    mode = 1;
    numCards = 3;
    num = 5;
    easy.style.backgroundColor = "red";
    hide.style.visibility = "hidden";
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
            } else {
                this.style.opacity = 0;
                console.log(this);
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
