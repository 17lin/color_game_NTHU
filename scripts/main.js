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
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var nightmareButton = document.querySelector("#nightmare");
var time = document.querySelector("#time");
var nightmareTrigger = false;
function init() {
    initCards();
    
    reset();
    if(nightmareTrigger === true){
        time.textContent = 46;
    }
    else{
        time.textContent = 44444;
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
    //time.textContent = 5;
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




easyButton.addEventListener("click", function() {
    easyButton.style.backgroundColor = "gray";
    easyButton.style.borderRadius= "25px";
    hardButton.style.backgroundColor = "white";
    hardButton.style.borderRadius= "0px";
    nightmareButton.style.backgroundColor = "white";
    nightmareButton.style.borderRadius = "0px";
    numCards = 3;
    nightmareTrigger = false;
    reset();
})

hardButton.addEventListener("click", function() {
    easyButton.style.backgroundColor = "white";
    easyButton.style.borderRadius= "0px";
    hardButton.style.backgroundColor = "gray";
    hardButton.style.borderRadius= "25px";
    nightmareButton.style.backgroundColor = "white";
    nightmareButton.style.borderRadius = "0px";
    numCards = 6;
    nightmareTrigger = false;
    reset();
})

nightmareButton.addEventListener("click", function() {
    easyButton.style.backgroundColor = "white";
    easyButton.style.borderRadius= "0px";
    hardButton.style.backgroundColor = "white";
    hardButton.style.borderRadius= "0px";
    nightmareButton.style.backgroundColor = "gray";
    nightmareButton.style.borderRadius = "25px";
    numCards = 6;
    nightmareTrigger = true;
    
    reset();
})


