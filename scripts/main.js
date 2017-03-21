window.onload = function() {
    init();
};

var numCards;
var mode = "easy";
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var easyMode = document.querySelector("#easy");
var hardMode = document.querySelector("#hard");
var nightmareMode = document.querySelector("#nightmare");
var countDown = document.querySelector("#timer");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var count = 5;
var counter;
var timeout;

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
                clearInterval(counter);
                clearTimeout(timeout);
                countDown.style.display = "none";
                resetButton.style.display = "block";
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
    countDown.style.display = "none";
    clearTimeout(timeout);
    resetButton.style.display = "block";
    if (mode === "easy") numCards = 3;
    else numCards = 6;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?";
    //change colors of
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
    if (mode === "nightmare") {
        count = 5;
        countDown.textContent = count;
        countDown.style.display = "inline";
        timeout = setTimeout(timeOut, 5000);
        counter = setInterval(timer, 1000);
        resetButton.style.display = "none";
    }
}

function timeOut() {
    messageDisplay.textContent = "TIMEOUT!";
    resetDisplay.textContent = "Play Again"
    changeColors("#FFF");
    body.style.backgroundColor = pickedColor;
    countDown.style.display = "none";
    resetButton.style.display = "block";
    gameOver = true;
}

function timer() {
    count = count - 1;
    countDown.textContent = count;
    if (count <= 0) {
        clearInterval(counter);
        return;
    }
}

easyMode.addEventListener("click", function() {
    mode = "easy";
    //alert(mode);
    easyMode.style.backgroundColor = "rgb(70, 130, 180)";
    easyMode.style.color = "rgb(255, 255, 255)";
    hardMode.style.backgroundColor = "rgb(255, 255, 255)";
    hardMode.style.color = "rgb(72, 72, 72)";
    nightmareMode.style.backgroundColor = "rgb(255, 255, 255)";
    nightmareMode.style.color = "rgb(72, 72, 72)";
    reset();
})

hardMode.addEventListener("click", function() {
    mode = "hard";
    //alert(mode);
    hardMode.style.backgroundColor = "rgb(70, 130, 180)";
    hardMode.style.color = "rgb(255, 255, 255)";
    easyMode.style.backgroundColor = "rgb(255, 255, 255)";
    easyMode.style.color = "rgb(72, 72, 72)";
    nightmareMode.style.backgroundColor = "rgb(255, 255, 255)";
    nightmareMode.style.color = "rgb(72, 72, 72)";
    reset();
})

nightmareMode.addEventListener("click", function() {
    mode = "nightmare";
    //alert(mode);
    nightmareMode.style.backgroundColor = "rgb(70, 130, 180)";
    nightmareMode.style.color = "rgb(255, 255, 255)";
    hardMode.style.backgroundColor = "rgb(255, 255, 255)";
    hardMode.style.color = "rgb(72, 72, 72)";
    easyMode.style.backgroundColor = "rgb(255, 255, 255)";
    easyMode.style.color = "rgb(72, 72, 72)";
    reset();
})

easyMode.addEventListener("hover", function() {
    easyMode.style.color = "rgb(70, 130, 180)"
})

hardMode.addEventListener("hover", function() {
    hardMode.style.color = "rgb(70, 130, 180)"
})

nightmareMode.addEventListener("hover", function() {
    nightmareMode.style.color = "rgb(70, 130, 180)"
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