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
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var easy_mode_button = document.querySelector("#easy_mode");
var hard_mode_button = document.querySelector("#hard_mode");
var nightmare_mode_button = document.querySelector("#nightmare_mode");
var card_container = document.getElementById("card-container");
var card = document.querySelector("#card");
var timer = document.getElementById("timer");
var time = 5;

easy_mode_button.style.backgroundColor = "green";

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
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
                time = 6;
                resetButton.style.visibility = 'visible';
                timer.style.visibility = 'hidden';
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
}

resetButton.addEventListener("click", function() {
    reset();
})


easy_mode_button.addEventListener("click", change_easy_mode)

function change_easy_mode(){
    mode = 0;
    select_mode();
}

hard_mode_button.addEventListener("click", change_hard_mode)

function change_hard_mode(){
    mode = 1;
    select_mode();   
}


nightmare_mode_button.addEventListener("click", change_nightmare_mode)

function change_nightmare_mode(){
    mode = 2;
    select_mode();
}

function select_mode(){
    if(mode == 0){
        numCards = 3;
        reset();
        resetButton.style.visibility = 'visible';
        easy_mode_button.style.backgroundColor = "green";
        hard_mode_button.style.backgroundColor = "white";
        nightmare_mode_button.style.backgroundColor = "white";
        timer.style.visibility = 'hidden';
    }
    else if(mode == 1){
        numCards = 6;
        reset();
        resetButton.style.visibility = 'visible';
        easy_mode_button.style.backgroundColor = "white";
        nightmare_mode_button.style.backgroundColor = "white";        
        hard_mode_button.style.backgroundColor = "green";
        timer.style.visibility = 'hidden';
    }
    else if(mode == 2){
        numCards = 6;
        reset();
        timer.style.visibility = 'visible';
        easy_mode_button.style.backgroundColor = "white";
        nightmare_mode_button.style.backgroundColor = "green";       
        hard_mode_button.style.backgroundColor = "white";         
    }
}

function tick() {
    if(time != 0 && gameOver == false && mode == 2){
        timer.textContent = 5;
        time--;
        timer.textContent = time;
        resetButton.style.visibility = 'hidden';
        timer.style.visibility = 'visible';
    }
    if(time == 0 && mode == 2){
        timer.textContent = 5;
        gameOver = true;
        timer.style.visibility = 'hidden';
        changeColors("#FFF");
        body.style.backgroundColor = pickedColor;
        time = 6;
        resetButton.style.visibility = 'visible';
        messageDisplay.textContent = 'timeover';
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
