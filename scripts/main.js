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
var invisible = document.querySelectorAll(".downRow");
var easy = document.getElementById("easy");
var hard = document.getElementById("hard");
var nightmare = document.getElementById("nightmare");
var timeDisplay = document.getElementById("time");
var countdownnumber = 5;
var cdId;
var nightMode = false;
var blinkId;


function init() {
    initCardsEasy();
    reset();
}

function initCardsHard(){
    numCards = 6;
    reset();
    nightMode = false;
    hard.style.backgroundColor = "#007FFF";
    hard.style.color = "#F7F7F7";
    easy.style.backgroundColor = "#F7F7F7";
    easy.style.color = "#000";
    nightmare.style.backgroundColor = "#F7F7F7";
    nightmare.style.color = "#000";
    resetButton.style.display = "block";
    time.style.display = "none";
    clearInterval(cdId);
     for(var j = 0;j < 3; j++){
        invisible[j].style.display = "block";
    }
     for (var i = 0; i < 6; i++) {
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

function initCardsEasy() {
    numCards = 3;
    reset();
    nightMode = false;
    easy.style.backgroundColor = "#007FFF";
    easy.style.color = "#F7F7F7";
    hard.style.backgroundColor = "#F7F7F7";
    hard.style.color = "#000";
    nightmare.style.backgroundColor = "#F7F7F7";
    nightmare.style.color = "#000";
    resetButton.style.display = "block";
    time.style.display = "none";
    clearInterval(cdId);
    for(var j = 0;j < 3; j++){
        invisible[j].style.display = "none";
    }
    for (var i = 0; i < 3; i++) {
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
function initCardsNight(){
    numCards = 6;
    reset();
    clearInterval(cdId);
    nightMode = true;
    resetButton.style.display = "none";
    nightmare.style.backgroundColor = "#007FFF";
    nightmare.style.color = "#F7F7F7";
    easy.style.backgroundColor = "#F7F7F7";
    easy.style.color = "#000";
    hard.style.backgroundColor = "#F7F7F7";
    hard.style.color = "#000";
    time.style.display = "inline";
    for(var j = 0;j < 3; j++){
        invisible[j].style.display = "block";
    }

    initcountdown();

     for (var i = 0; i < 6; i++) {
        //add click listeners to cards
        cards[i].addEventListener("click", function() {
        if (gameOver)
            return;
            //grab color of clicked card
        var clickedColor = this.style.backgroundColor;
            // alert(this.style.backgroundColor);
            //compare color to pickedColor
        if (clickedColor === pickedColor) {
            clearInterval(cdId);
            messageDisplay.textContent = "Correct!";
            resetButton.style.display = "block";
            resetDisplay.textContent = "Play Again";
            time.style.display = "none";
            changeColors("#FFF");
            body.style.backgroundColor = clickedColor;
            gameOver = true;
        } else {
            this.style.opacity = 0;
            messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function initcountdown(){
    countdownnumber = 5;
    time.textContent = countdownnumber;
    countdownnumber--;
    cdId = setInterval(cdfunc, 1000);
}

function cdfunc(){
    time.textContent = countdownnumber;
    body.style.backgroundColor = "#aaaaaa";
    if(countdownnumber === 0){
        if(!gameOver){
            time.style.display = "none";
            messageDisplay.textContent = "Timeout!";
            resetButton.style.display = "block";
            resetDisplay.textContent = "Play Again";
            changeColors("#FFF");
            body.style.backgroundColor = pickedColor;
        }
            clearInterval(cdId);
            clearInterval(blinkId);
            return;
    } else {
       blinkId = setInterval(function(){
           body.style.backgroundColor ="#232323";
           clearInterval(blinkId);
       }, 300);    
   
    }
    countdownnumber--;
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
    if(nightMode) initCardsNight();
    else reset();
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
