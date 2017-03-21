window.onload = function() {
    init();
};

var mode = []
var numCards = 3;
var gameOver = false;
var isNightmare = false;
var colors = [];
var pickedColor;
var counter = 5;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var easy = document.getElementById("easy");
var hard = document.getElementById("hard");
var nightmare = document.getElementById("nightmare");
var timer;

function init() {
    isNightmare = false;
    initCards();
    reset();
    setDifficulty();
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
            if (counter < 0 && isNightmare == true)
            {
                clearInterval(timer);
                messageDisplay.textContent = "TIMEOUT!";
                resetDisplay.textContent = "Play Again"
                changeColors("#FFF");
                body.style.backgroundColor = pickedColor;
                gameOver = true;
            }
            else if (clickedColor === pickedColor) {
                clearInterval(timer);
                messageDisplay.textContent = "Correct!";
                resetDisplay.textContent = "Play Again"
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
            }
            else if (isNightmare == true)
            {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again " + counter.toString();
            }
            else {
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

function tick() {
    if(counter < 0) {
        clearInterval(timer);
    }
    else {
        messageDisplay.textContent = "What's the Color? " + counter.toString();
    }
    counter--;
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


function setDifficulty() {
    if (isNightmare == true)
    {
        timer = setInterval(tick, 1000);
        totheNightmare();
    }
    easy.addEventListener("mouseover", mouseover);
    easy.addEventListener("click", click);
    easy.addEventListener("mouseout", mouseout);
    hard.addEventListener("mouseover", mouseover);
    hard.addEventListener("click", click);
    hard.addEventListener("mouseout", mouseout);
    nightmare.addEventListener("mouseover", mouseover);
    nightmare.addEventListener("click", click);
    nightmare.addEventListener("mouseout", mouseout);
    toHard();
    toEasy();
    toNightmare();
}

function click() {
    this.style.color = 'white';
    this.style.backgroundColor = '#9999EE';
}

function mouseover() {
    this.style.color = '#EEEEAA';
    this.style.backgroundColor = 'transparent';
}

function mouseout() {
    this.style.color = 'gray';
    this.style.backgroundColor = 'transparent';
}

function toHard() {
    hard.addEventListener("click", function() {
        clearInterval(timer);
        isNightmare = false;
        numCards = 6;
        initCards();
        reset();
        resetButton.style.color = '#484848';
        resetButton.style.backgroundColor = 'white';
        resetButton.addEventListener("mouseover", function() {
            resetButton.style.color = 'white';
            resetButton.style.backgroundColor = 'steelblue';
        });
        resetButton.addEventListener("mouseout", function() {
            resetButton.style.color = '#484848';
            resetButton.style.backgroundColor = 'white';
        });
    });
}

function toEasy() {
    easy.addEventListener("click", function() {
        clearInterval(timer);
        isNightmare = false;
        numCards = 3;
        initCards();
        reset();
        resetButton.style.color = '#484848';
        resetButton.style.backgroundColor = 'white';
        resetButton.addEventListener("mouseover", function() {
            resetButton.style.color = 'white';
            resetButton.style.backgroundColor = 'steelblue';
        });
        resetButton.addEventListener("mouseout", function() {
            resetButton.style.color = '#484848';
            resetButton.style.backgroundColor = 'white';
        });
    });
}

function toNightmare() {
    nightmare.addEventListener("click", function() {
        isNightmare = true;
        numCards = 6;
        initCards();
        reset();
        counter = 5;
        timer = setInterval(tick, 1000);
        resetButton.style.color = 'transparent';
        resetButton.style.backgroundColor = 'transparent';
        resetButton.addEventListener("mouseover", function() {
            resetButton.style.color = 'transparent';
            resetButton.style.backgroundColor = 'transparent';
        });
        resetButton.addEventListener("mouseout", function() {
            resetButton.style.color = 'transparent';
            resetButton.style.backgroundColor = 'transparent';
        });
    });
}

function totheNightmare() {
    isNightmare = true;
    numCards = 6;
    initCards();
    reset();
    counter = 5;
    timer = setInterval(tick, 1000);
}