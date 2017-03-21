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
var timer = document.getElementById("timer");
var tid;
var bg_tid;
var color_blink=0;

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
                clearInterval(bg_tid);
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

function mode_change(target){
    var other = document.getElementsByClassName('mode_on');
    if (other.length != 0) other[0].className = "mode";
    target.className = "mode_on";
    
    if(target.id === "easy") easy();
    if(target.id === "hard") hard();
    if(target.id === "nightmare") nightmare();
}

function easy(){
    resetButton.style.display = "block";
    timer.style.display = "none";
    numCards = 3;
    init();
}
function hard(){
    resetButton.style.display = "block";
    timer.style.display = "none";
    numCards = 6;
    init();
}

function nightmare(){
    numCards = 6;
    init();
    resetButton.style.display = "none";
    //show timer
    var timer = document.getElementById("timer");
    timer.style.display = "block";
    timer.innerHTML = 5;
    tid = setInterval(timer_value,1000);        
    bg_tid = setInterval(bg_blink,500);
}
function timer_value(){
    if (timer.innerHTML > 1) timer.innerHTML = timer.innerHTML - 1;
    else {
        clearInterval(tid);
        timeout();
    }
}
function timeout(){
    var timer = document.getElementById("timer");;
    timer.innerHTML = "TIMEOUT!"
    changeColors("#FFF");
    body.style.backgroundColor = pickedColor;
    gameOver = true; 
    clearInterval(bg_tid);
}
function bg_blink(){
    if (color_blink==0){
        body.style.backgroundColor="#aaaaaa";
        color_blink = !color_blink;
    }
    else {
        body.style.backgroundColor="#232323";
        color_blink = !color_blink;
    }
}

