window.onload = function() {
    init();
};

var mode = 'hard'; // 'easy', 'hard', or 'nightmare'
var numCards = 6;
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
var modeButtons = document.querySelectorAll(".mode");
var countdownDisplay = document.querySelector("#countdown");
var countdownId;
var blinkId;

function init() {
    initModeButtons();
    initCards();
    reset();
}

function initModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            for (var j = 0; j < modeButtons.length; j++) {
                modeButtons[j].classList.remove("selected");
            }
            this.classList.add("selected");
            mode = this.textContent.toLowerCase();
            switch (mode) {
                case 'easy':
                    numCards = 3;
                    break;
                default: // 'hard' or 'nighmare'
                    numCards = 6;
            }
            reset();
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
                clearInterval(countdownId);
                messageDisplay.textContent = "Correct!";
                end();
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function end() {
    countdownDisplay.textContent = '';
    resetButton.style.opacity = 1;
    resetDisplay.textContent = "Play Again"
    changeColors("#FFF");
    body.style.backgroundColor = pickedColor;
    gameOver = true;
}

function reset() {
    clearInterval(countdownId);
    gameOver = false;
    if (mode === 'nightmare') {
        resetButton.style.opacity = 0;
        countdownDisplay.innerHTML = '&nbsp;&nbsp;' + '5';
        countdownId = setInterval(countdown, 1000);
    } else {
        countdownDisplay.textContent = '';
    }
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
            cards[i].style.display = "block";
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

function countdown() {
    var c = Number(countdownDisplay.textContent);
    countdownDisplay.innerHTML = '&nbsp;&nbsp;' + (--c);
    if (c === 0) {
        clearInterval(countdownId);
        messageDisplay.textContent = "Timeout!";
        end();
    } else {
        body.style.backgroundColor = '#FFF';
        blinkId = setInterval(blink, 50);
    }
}

function blink() {
    body.style.backgroundColor = '#232323';
    clearInterval(blinkId);
}
