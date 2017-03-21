window.onload = function() {
    init();
};

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
var timer = document.querySelector("#timer");
var timerIntervalID;
var modeButton = document.querySelectorAll("button.set-mode");
var selectedMode;

function init() {
	initMode();
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
                stopTimer("Correct!");
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

	if (selectedMode === "Nightmare") {
		initTimer();
	} else {
		stopTimer("What's the Color?");
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

function initTimer() {
	timer.textContent = 5;
	resetButton.style.display = "none";
	timerIntervalID = setInterval(function() {
		timer.textContent = String(Number(timer.textContent)-1);
		if (timer.textContent === "0") {
			changeColors("white");
			body.style.backgroundColor = pickedColor;
			stopTimer("Timeout!")
			gameOver = true;
		}
	}, 1000);
}

function initMode() {
	selectedMode = "Easy";
	setMode();
	modeButton[0].addEventListener("click", function() {
		selectedMode = "Easy";
		setMode();
		reset();
	});
	modeButton[1].addEventListener("click", function() {
		selectedMode = "Hard";
		setMode();
		reset();
	});
	modeButton[2].addEventListener("click", function() {
		selectedMode = "Nightmare";
		setMode();
		reset();
	});
}

function setMode() {
	if (selectedMode === "Easy") {
		modeButton[0].style.backgroundColor = "steelBlue";
		modeButton[1].style.backgroundColor = "white";
		modeButton[2].style.backgroundColor = "white";
	} else if (selectedMode === "Hard") {
		modeButton[0].style.backgroundColor = "white";
		modeButton[1].style.backgroundColor = "steelBlue";
		modeButton[2].style.backgroundColor = "white";
	} else if (selectedMode === "Nightmare") {
		modeButton[0].style.backgroundColor = "white";
		modeButton[1].style.backgroundColor = "white";
		modeButton[2].style.backgroundColor = "steelBlue";
	}
}

function stopTimer(result) {
	clearInterval(timerIntervalID);
	timer.textContent = "";
	messageDisplay.textContent = result;
	resetButton.style.display = "block";
}
