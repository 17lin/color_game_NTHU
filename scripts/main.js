window.onload = function() {
    init();
};

var numCards = 6;
var gameOver = false;
var colors = [];
var pickedColor;
var easyNumber = 0;
var hardNumber = 0;
var nightNumber = 0;
var night = document.getElementById("night");
var easy = document.getElementById("easy");
var hard = document.getElementById("hard");
var timeout = document.getElementById("Timeout");
var time = document.getElementById("time");
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");

function init() {
    night.addEventListener("click", function() {
        easy.textContent = "easy";
        hard.textContent = "hard";
        night.textContent = "here";
        reset();
        var t1 = setTimeout("time.textContent = '4'", 1000);
        var t2 = setTimeout("time.textContent = '3'", 2000);
        var t3 = setTimeout("time.textContent = '2'", 3000);
        var t4 = setTimeout("time.textContent = '1'", 4000);
        var t5 = setTimeout("messageDisplay.textContent='Timeout'", 5000);
        var t6 = setTimeout("time.textContent=''", 5000);
        initCardsnight();
    });
    easy.addEventListener("click", function() {
        easy.textContent = "here";
        hard.textContent = "hard";
        night.textContent = "nightmare";
        messageDisplay.textContent = "What's the color?";
        time.textContent = "5";
        reset();
        initCards();
    });
    hard.addEventListener("click", function() {
        easy.textContent = "easy";
        hard.textContent = "here";
        night.textContent = "nightmare";
        messageDisplay.textContent = "What's the color?";
        time.textContent = "5";
        reset();
        initCards();
    });


    reset();
    initCards();
}




function initCardsnight() {
    time.style.opacity = 1;
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

function initCards() {
    time.style.opacity = 0;
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
