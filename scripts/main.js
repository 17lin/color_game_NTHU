window.onload = function() {
    easy_press();
};

var t;
var seconds;
var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var timer_text = document.querySelector(".timer_text");
var button = document.querySelector("button");
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var card1 = document.querySelector("#card1");
var card2 = document.querySelector("#card2");
var card3 = document.querySelector("#card3");
var card4 = document.querySelector("#card4");
var card5 = document.querySelector("#card5");
var card6 = document.querySelector("#card6");

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
                messageDisplay.textContent = "Try Again";
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
    timer_text.textContent = "";
    resetButton.display = "block";
}

function initCards_hightmare() {
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

function reset_nightmare() {
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

    resetButton.display = "none";
}

function main_timer() {
    timer_text.textContent = " " + seconds;
    seconds = seconds - 1;
    t = setInterval(function () {
        timer_text.textContent = " " + seconds;
        seconds = seconds - 1;
        if (seconds < 0) {
            seconds = 5;
            // ==========================================
            messageDisplay.textContent = "TIMEOUT!";
            resetButton.display = "block";
            timer_text.textContent = "";
            resetDisplay.textContent = "Play Again"
            changeColors("#FFF");
            body.style.backgroundColor = pickedColor;
            gameOver = true;
            // ==========================================
            clearInterval(t);
        }
    }, 1000);
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
// ================================================================================
// button
function easy_press() {
    var tmp = document.querySelector("#easy");
    tmp.style.backgroundColor = "rgb(68, 158, 215)";
    tmp.style.color = "#FFF";
    hard_unpress();
    nightmare_unpress();

    numCards = 3;
    card4.display = "none";
    card5.display = "none";
    card6.display = "none";
    initCards();
    reset();
}

function easy_unpress() {
    var tmp = document.querySelector("#easy");
    tmp.style.backgroundColor = "#FFF";
    tmp.style.color = "#000";
}

function hard_press() {
    var tmp = document.querySelector("#hard");
    tmp.style.backgroundColor = "rgb(68, 158, 215)";
    tmp.style.color = "#FFF";
    easy_unpress();
    nightmare_unpress();

    numCards = 6;
    card4.display = "inline";
    card5.display = "inline";
    card6.display = "inline";
    initCards();
    reset();
}

function hard_unpress() {
    var tmp = document.querySelector("#hard");
    tmp.style.backgroundColor = "#FFF";
    tmp.style.color = "#000";
}

function nightmare_press() {
    var tmp = document.querySelector("#nightmare");
    tmp.style.backgroundColor = "rgb(68, 158, 215)";
    tmp.style.color = "#FFF";
    easy_unpress();
    hard_unpress();

    numCards = 6;
    card4.display = "inline";
    card5.display = "inline";
    card6.display = "inline";
    initCards_hightmare();
    reset_nightmare();

    seconds = 5;
    resetButton.visibility = "hide";
    main_timer();
}

function nightmare_unpress() {
    var tmp = document.querySelector("#nightmare");
    tmp.style.backgroundColor = "#FFF";
    tmp.style.color = "#000";
}
