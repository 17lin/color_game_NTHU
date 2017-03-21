window.onload = function() {
    init();
};

var mode = 'easy';
var time;
var timer;
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

function init() {
    setInterval(function(){
        if (!gameOver) {
            if (body.style.backgroundColor == "rgb(35, 35, 35)")
                body.style.backgroundColor = "rgb(150, 150, 150)";
            else body.style.backgroundColor = "rgb(35, 35, 35)";
        }
     }, 1000);
    initMode();
    initCards();
    reset();
}

function initMode() {
    easyButton.className = hardButton.className = nightmareButton.className = '';
    if (mode === 'easy') {
        numCards = 3;
        easyButton.className = 'selected';
    } else if (mode === 'hard') {
        numCards = 6;
        hardButton.className = 'selected';
    } else if (mode === 'nightmare') {
        numCards = 6;
        nightmareButton.className = 'selected';
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
    if (mode === 'nightmare') {
        messageDisplay.textContent = "What's the Color? 5";
        time = 4;
        resetButton.style.display = 'none';
        timer = setInterval(function(){
            if (mode != 'nightmare') {
                clearInterval(timer);
                return;
            }
            messageDisplay.textContent = "What's the color? " + time--;
            if (time == 0) {
                gameOver = true;
                resetButton.style.display = 'block';
                messageDisplay.textContent = "Timeout!";
                resetDisplay.textContent = "Play Again";
                changeColors("#FFF");
                body.style.backgroundColor = pickedColor;
                time = 4;
                clearInterval(timer);
            } else if (gameOver) {
                resetButton.style.display = 'block';
                messageDisplay.textContent = "Correct!";
                resetDisplay.textContent = "Play Again";
                time = 4;
                clearInterval(timer);
            }
        }, 1000);
    }
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

easyButton.addEventListener("click", function() {
    mode = 'easy';
    init();
})


hardButton.addEventListener("click", function() {
    mode = 'hard';
    init();
})

nightmareButton.addEventListener("click", function() {
    mode = 'nightmare';
    init();
})


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
