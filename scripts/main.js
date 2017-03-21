window.onload = function() {
    init();
};

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
var modeform = document.querySelector("#Sel1");
var easymode_tg = document.querySelector("#easybtn");
var hardmode_tg = document.querySelector("#hardbtn");
var nightmode_tg = document.querySelector("#nightbtn");
var a = 1;
var gamemode = 0;
var timer_obj = document.getElementById("timer");
var timer_interval;

easymode_tg.style.backgroundColor = "steelblue";
easymode_tg.style.color = "white";

function changeGameMode(md) {
    event.preventDefault();
    if (md === 0) {
        gamemode = 0;
        easymode_tg.style.backgroundColor = "steelblue";
        easymode_tg.style.color = "white";
        hardmode_tg.style.backgroundColor = "initial";
        hardmode_tg.style.color = "initial";
        nightmode_tg.style.backgroundColor = "initial";
        nightmode_tg.style.color = "initial";
    } else if (md === 1) {
        easymode_tg.style.backgroundColor = "initial";
        easymode_tg.style.color = "initial";
        hardmode_tg.style.backgroundColor = "steelblue";
        hardmode_tg.style.color = "white";
        nightmode_tg.style.backgroundColor = "initial";
        nightmode_tg.style.color = "initial";
        gamemode = 1;
    } else {
        easymode_tg.style.backgroundColor = "initial";
        easymode_tg.style.color = "initial";
        hardmode_tg.style.backgroundColor = "initial";
        hardmode_tg.style.color = "initial";
        nightmode_tg.style.backgroundColor = "steelblue";
        nightmode_tg.style.color = "white";
        gamemode = 2;
    }

    nowGameMode();
}

function nowGameMode() {
    if (gamemode === 1) {
        numCards = 6;
        cards[3].style.display = "inline";
        cards[4].style.display = "inline";
        cards[5].style.display = "inline";
        clearInterval(timer_interval);
        reset();
        initCards();
    } else if (gamemode === 2) {
        numCards = 6;
        cards[3].style.display = "inline";
        cards[4].style.display = "inline";
        cards[5].style.display = "inline";
        reset();
        initCards();
        startTimer(5, timer_obj);
    } else {
        numCards = 3;
        cards[3].style.display = "none";
        cards[4].style.display = "none";
        cards[5].style.display = "none";
        clearInterval(timer_interval);
        reset();
        initCards();
    }
}
var index = 1;

function startTimer(duration, display) {
    var timer = duration,
        seconds;

    timer_interval = setInterval(function() {
        seconds = parseInt(timer % 60, 10);
        index = index*(-1);
        display.textContent = seconds + "  sec";

        if (gamemode === 2 && index === 1) {

            document.body.style.background = "#232323";
        } else if (gamemode === 2 && index === -1) {
            document.body.style.background = "white";
        }
        if (--timer < 0 && gamemode === 2)
            endgame();

    }, 1000);
}






function endgame() {

body.style.backgroundColor = pickedColor;
messageDisplay.textContent = "Time out";
resetButton.style.display = "inline";
timer_obj.style.display = "none";
resetDisplay.textContent = "Play Again";
clearInterval(timer_interval);

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
            if (gamemode === 2) {
                endgame();
                messageDisplay.textContent = "Correct";
            }
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

if (gamemode === 2) {
    resetButton.style.display = "none";
    timer_obj.style.display = "block";
    timer_obj.style.textAlign = "center";
} else {
    resetButton.style.display = "inline";
    timer_obj.style.display = "none";
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

resetButton.addEventListener("click", function() {
if (gamemode === 2)
    startTimer(5, timer_obj);
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
