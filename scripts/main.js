window.onload = function() {
    easy_press();
};

var t;
var seconds;
var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var nightmare = false;
var timer_text = document.querySelector(".timer_text");
var button = document.querySelector("button");
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetbutton = document.querySelector(".reset_button");
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
    if (nightmare) {
        resetButton.style.display = "none";
    }
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
                clearInterval(t);
                timer_text.style.display = "none";
                resetButton.style.display = "block";
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

    if (nightmare) {
        seconds = 5;
        timer_text.style.display = "inline";
        main_timer();
    } else {
        timer_text.style.display = "none";
        clearInterval(t);
    }
}

function main_timer() {
    timer_text.textContent = " " + seconds;
    seconds = seconds - 1;
    t = setInterval(function () {
        timer_text.textContent = " " + seconds;
        seconds = seconds - 1;
        // blink
        if (!gameOver && seconds >= 0) {
            setTimeout(function() {
                body.style.backgroundColor = "#FFFFFF";
            }, 0);
            setTimeout(function() {
                body.style.backgroundColor = "#232323";
            }, 50);
        }

        // stop time interval
        if (seconds < 0) {
            seconds = 5;
            // ==========================================
            messageDisplay.textContent = "TIMEOUT!";
            resetButton.display = "block";
            timer_text.textContent = "";
            resetDisplay.textContent = "Play Again"
            changeColors("#FFF");
            body.style.backgroundColor = pickedColor;
            resetButton.style.display = "block";
            gameOver = true;
            // ==========================================
            clearInterval(t);
        }
    }, 1000);
}

resetButton.addEventListener("click", function() {
    initCards();
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
    nightmare = false;
    var tmp = document.querySelector("#easy");
    tmp.style.backgroundColor = "rgb(68, 158, 215)";
    tmp.style.color = "#FFF";
    hard_unpress();
    nightmare_unpress();

    numCards = 3;
    card4.style.display = "none";
    card5.style.display = "none";
    card6.style.display = "none";
    resetButton.style.display = "block";
    initCards();
    reset();
}

function easy_unpress() {
    var tmp = document.querySelector("#easy");
    tmp.style.backgroundColor = "#FFF";
    tmp.style.color = "#000";
}

function hard_press() {
    nightmare = false;
    var tmp = document.querySelector("#hard");
    tmp.style.backgroundColor = "rgb(68, 158, 215)";
    tmp.style.color = "#FFF";
    easy_unpress();
    nightmare_unpress();

    numCards = 6;
    card4.style.display = "inline";
    card5.style.display = "inline";
    card6.style.display = "inline";
    resetButton.style.display = "block";
    initCards();
    reset();
}

function hard_unpress() {
    var tmp = document.querySelector("#hard");
    tmp.style.backgroundColor = "#FFF";
    tmp.style.color = "#000";
}

function nightmare_press() {
    nightmare = true;
    var tmp = document.querySelector("#nightmare");
    tmp.style.backgroundColor = "rgb(68, 158, 215)";
    tmp.style.color = "#FFF";
    easy_unpress();
    hard_unpress();

    numCards = 6;
    card4.style.display = "inline";
    card5.style.display = "inline";
    card6.style.display = "inline";
    initCards();
    reset();
}

function nightmare_unpress() {
    var tmp = document.querySelector("#nightmare");
    tmp.style.backgroundColor = "#FFF";
    tmp.style.color = "#000";
}
