window.onload = function() {
    init();
};

var numCards = 6;
var mode=0;
var count=5;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var hardcards = document.querySelectorAll(".hardcard");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyMode = document.querySelector("#easy");
var hardMode = document.querySelector("#hard");
var nightMode = document.querySelector("#night");
var resetDisplay = document.querySelector("#reset span");

var countDown=function(){
    if(!gameOver){
        if(count>1){
            count--;
        messageDisplay.textContent = "What's the Color?"+count;
        }else if(count===1){
            messageDisplay.textContent = "TIME OUT, more train train.";
            changeColors("#FFF");
                    body.style.backgroundColor = clickedColor;
            gameOver=true;
        }
    }
    //console.log(count);
}


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
            } else {
                this.style.opacity = 0;
                if(mode!==2)messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset() {
    count=5;
    gameOver = false;
    numCards = (mode===0) ? 3 : 6;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    if(mode===2){
        var ok=setInterval(countDown, 1000);
        messageDisplay.textContent = "What's the Color?"+count;
    }else{
        messageDisplay.textContent = "What's the Color?";
    }
    //change colors of cards
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.opacity = 1;
        if (i<numCards) {
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    
    body.style.backgroundColor = "#232323";
}

resetButton.addEventListener("click", function() {
    if(mode===2) clearInterval(ok);
    mode=0;
    count=5;
    reset();
})

easyMode.addEventListener("click", function() {
        if(mode===2) clearInterval(ok);

    //clearInterval(ok);
    count=5;
    mode=0;
    reset();
})


hardMode.addEventListener("click", function() {
        if(mode===2) clearInterval(ok);

    //clearInterval(ok);
    count=5;
    mode=1;
    reset();
})


nightMode.addEventListener("click", function() {
       //clearInterval(ok);
       count=5;
    mode=2;
    reset();
})


function changeColors(color) {
    //loop through all cards
    for (var i = 0; i < numCards; i++) {
        //change each color to match given color
        cards[i].style.opacity = 1;
        cards[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * numCards);
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
