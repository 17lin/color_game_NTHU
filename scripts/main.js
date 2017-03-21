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
var easy = document.getElementById('easy');
var hard = document.getElementById('hard');
var night = document.getElementById('night');
var flag=0;
function init() {
    initCards();
    reset();
}

    night.onclick = function(event){
    flag=1;
    easy.style.background = 'white';
    hard.style.background = 'white';
    this.style.background = 'blue';
    this.style.borderRadius= "999rem";
    numCards = 6;
    reset();
    initCards_night();
    resetButton.style.opacity = 0;
    t=6;
    check = setInterval("showTime()",1000);
}

hard.onclick = function(event){
    flag=0;
    night.style.background = 'white';
    easy.style.background = 'white';
    numCards = 6;
     resetButton.style.opacity = 1;
      init();
    this.style.background = 'blue';
    this.style.borderRadius= "999rem";
}

easy.onclick = function(event){
    flag=0;
    night.style.background = 'white';
    hard.style.background = 'white';
     numCards = 3;
      resetButton.style.opacity = 1;
     init();
    this.style.background = 'blue';
    this.style.borderRadius= "999rem";
}

easy.onmouseover = function(){
    this.style.color = 'red';
}

hard.onmouseover = function(){
    this.style.color = 'red';
}

night.onmouseover = function(){
    this.style.color = 'red';
}

easy.onmouseout = function(){
    this.style.color = 'black';
}

hard.onmouseout = function(){
    this.style.color = 'black';
}

night.onmouseout = function(){
    this.style.color = 'black';
}



function showTime(){
        resetButton.style.opacity = 0;
    if(!gameOver){
    t-=1;
    if(t>0){
        document.getElementById('timeup').innerHTML= t;
        body.style.backgroundColor = randomColor();
    }

    else if (t===0){
    body.style.backgroundColor = pickedColor;
    document.getElementById('message').innerHTML="Time Out";
    document.getElementById('timeup').innerHTML="";
    for (var i = 0; i < cards.length; i++){
        cards[i].style.backgroundColor = 'white';
    }

        resetButton.style.opacity = 1;
        resetDisplay.textContent = "Play Again"
        clearInterval(check);
    }
    }

    else if(gameOver&&t!=0){
            document.getElementById('timeup').innerHTML="";
            document.getElementById('message').innerHTML="Correct!";
            clearInterval(check);
            resetButton.style.opacity = 1;
            resetDisplay.textContent = "Play Again"
    }
}

function initCards_night() {
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
                messageDisplay.textContent = "Try Again";
                this.style.opacity = 0;
            }
        });
    }
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

function reset_night(){
    t=6;
    check = setInterval("showTime()",1000);
    gameOver = false;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetButton.style.opacity = 1;
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
    if(flag==0){
        reset();
    }

    else{
        reset_night();
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
