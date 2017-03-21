window.onload = function() {
    init();
};

var numCards = 3;
var nummoreCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var morecards = document.querySelectorAll(".more_card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var easybutton = document.querySelector("#easy");
var hardbutton = document.querySelector("#hard");
var nmbutton = document.querySelector("#nm");
var mode;
var seconds;
var strsec;
var countdown = document.querySelector("#countdown");
var interval;
var blink4start;
var blink4end;
var blink3start;
var blink3end;
var blink2start;
var blink2end;
var blink1start;
var blink1end;

function init() {
    selecteasy();
    mode = "easy";
    initCards();
    reset();
}

function selecteasy() {
    mode = "easy";
    easybutton.style.backgroundColor = "#0072E3";
    easybutton.style.color = "#FFFFFF"
    hardbutton.style.backgroundColor = "#FFFFFF";
    hardbutton.style.color = "#484848"
    nmbutton.style.backgroundColor = "#FFFFFF";
    nmbutton.style.color = "#484848"
}

function selecthard() {
    mode = "hard";
    easybutton.style.backgroundColor = "#FFFFFF";
    easybutton.style.color = "#484848"
    hardbutton.style.backgroundColor = "#0072E3";
    hardbutton.style.color = "#FFFFFF"
    nmbutton.style.backgroundColor = "#FFFFFF";
    nmbutton.style.color = "#484848"
}

function selectnm() {
    mode = "nm";
    easybutton.style.backgroundColor = "#FFFFFF";
    easybutton.style.color = "#484848"
    hardbutton.style.backgroundColor = "#FFFFFF";
    hardbutton.style.color = "#484848"
    nmbutton.style.backgroundColor = "#0072E3";
    nmbutton.style.color = "#FFFFFF"
}

easybutton.addEventListener("click", function() {
    selecteasy();
    reset();
})

hardbutton.addEventListener("click", function() {
    selecthard();
    reset();
})

nmbutton.addEventListener("click", function() {
    selectnm();
    reset();
})

easybutton.addEventListener("mouseover", function() {
    if(mode !== "easy") {
        easybutton.style.color = "#0072E3";
    }
})

easybutton.addEventListener("mouseout", function() {
    if(mode !== "easy") {
        easybutton.style.color = "#484848";
    }
})

hardbutton.addEventListener("mouseover", function() {
    if(mode !== "hard") {
        hardbutton.style.color = "#0072E3";
    }
})

hardbutton.addEventListener("mouseout", function() {
    if(mode !== "hard") {
        hardbutton.style.color = "#484848";
    }
})

nmbutton.addEventListener("mouseover", function() {
    if(mode !== "nm") {
        nmbutton.style.color = "#0072E3";
    }
})

nmbutton.addEventListener("mouseout", function() {
    if(mode !== "nm") {
        nmbutton.style.color = "#484848";
    }
})

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
    for (var i = 0; i < morecards.length; i++) {
        //add click listeners to cards
        morecards[i].addEventListener("click", function() {
            if (gameOver)
                return;
            var clickedColor = this.style.backgroundColor;
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
    //colors = generateRandomColors(numCards);
    if(mode === "easy") colors = generateRandomColors(numCards);
    else colors = generateRandomColors(numCards+nummoreCards);
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
    // for different level
    if(mode === "easy") {
        for (let j = 0; j < morecards.length; j++) {
            morecards[j].style.display = "none";
        }
    }
    else {
        for (let j = 0; j < morecards.length; j++) {
            morecards[j].style.opacity = 1;
            if (colors[j+3]) {
                morecards[j].style.display = "block"
                morecards[j].style.backgroundColor = colors[j+3];
            } else {
                morecards[j].style.display = "none";
            }
        }
    }
    // for nightmare
    if(mode == "nm") {
        clearInterval(interval);
        clearInterval(blink4start);
        clearInterval(blink3start);
        clearInterval(blink2start);
        clearInterval(blink1start);
        clearInterval(blink4end);
        clearInterval(blink3end);
        clearInterval(blink2end);
        clearInterval(blink1end);
        seconds = 5;
        strsec = ' '+seconds;
        countdown.textContent = strsec;
        resetButton.style.display = "none";
        interval = setInterval(function () {
            if (seconds > 1 && !gameOver) {
                seconds--;
                strsec = ' '+seconds;
                countdown.textContent = strsec;
            }
            else if (seconds > 1 && gameOver) {
                countdown.textContent = '';
                resetButton.style.display = "block";
                changeColors("#FFF");
                body.style.backgroundColor = pickedColor;
            }
            else {
                countdown.textContent = '';
                messageDisplay.textContent = "TIMEOUT!";
                resetButton.style.display = "block";
                changeColors("#FFF");
                body.style.backgroundColor = pickedColor;
                gameOver = true;
            }
        }, 1000);
        blink4start = setInterval(function() {
            if (mode == "nm" && seconds > 4 && !gameOver) body.style.backgroundColor = "#FFFFFF";
        },900);

        blink4end = setInterval(function() {
            if (mode == "nm" && seconds > 3 && !gameOver) body.style.backgroundColor = "#232323";
        },1100);

        blink3start = setInterval(function() {
            if (mode == "nm" && seconds > 3 && !gameOver) body.style.backgroundColor = "#FFFFFF";
        },1900);

        blink3end = setInterval(function() {
            if (mode == "nm" && seconds > 2 && !gameOver) body.style.backgroundColor = "#232323";
        },2100);

        blink2start = setInterval(function() {
            if (mode == "nm" && seconds > 2 && !gameOver) body.style.backgroundColor = "#FFFFFF";
        },2900);

        blink2end = setInterval(function() {
            if (mode == "nm" && seconds > 1 && !gameOver) body.style.backgroundColor = "#232323";
        },3100);

        blink1start = setInterval(function() {
            if (mode == "nm" && !gameOver) body.style.backgroundColor = "#FFFFFF";
        },3900);

        blink1end = setInterval(function() {
            if (mode == "nm" && !gameOver) body.style.backgroundColor = "#232323";
        },4100);
        /*var gg = setInterval(function () {
            if (seconds < 1) {
                countdown.textContent = '';
                messageDisplay.textContent = "TIMEOUT!";
                resetButton.style.display = "block";
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
            }
        }, 10);*/
    }
    else {
        countdown.textContent = '';
        clearInterval(interval);
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
    for (var i = 0; i < morecards.length; i++) {
        //change each color to match given color
        morecards[i].style.opacity = 1;
        morecards[i].style.backgroundColor = color;
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
