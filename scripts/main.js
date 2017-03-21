window.onload = function() {
    init();
};

var mode = 1; // 1 = easy, 2 = hard, 3 = nightmare
var numCards = 3;
var time = 5;
var interval;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var nightmareButton = document.querySelector("#nightmare");
var countdown = document.querySelector("#countdown");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");

easyButton.addEventListener("click", function() {
    mode = 1;
    easyButton.className = 'mode selected';
    hardButton.className = 'mode';
    nightmareButton.className = 'mode';
    init();
})

hardButton.addEventListener("click", function() {
    mode = 2;
    easyButton.className = 'mode';
    hardButton.className = 'mode selected';
    nightmareButton.className = 'mode';
    init();
})

nightmareButton.addEventListener("click", function() {
    mode = 3;
    easyButton.className = 'mode';
    hardButton.className = 'mode';
    nightmareButton.className = 'mode selected';
    init();
})

function init() {
    numCards = mode === 1 ? 3 : 6;
    clearInterval(interval);
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
                clearInterval(interval);
                countdown.style.display = 'none';
                messageDisplay.textContent = "Correct!";
                resetDisplay.textContent = "Play Again"
                resetButton.style.display = '';
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                body.className = '';
                gameOver = true;
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function initNightmare() {
    resetButton.style.display = 'none';
    time = 5;
    clearInterval(interval);
    countdown.textContent = '5';
    countdown.style.display = '';
    body.className = 'blink';
    interval = setInterval(function() {
        time -= 1;
        countdown.textContent = time;
        if (time === 0) {
            clearInterval(interval);
            countdown.style.display = 'none';
            messageDisplay.textContent = "TIMEOUT!";
            resetDisplay.textContent = "Play Again"
            resetButton.style.display = '';
            changeColors("#FFF");
            body.style.backgroundColor = pickedColor;
            body.className = '';
            gameOver = true;

        }
    }, 1000);
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
    if (mode === 3) {
        initNightmare();
    }
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
