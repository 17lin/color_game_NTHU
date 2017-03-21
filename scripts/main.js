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
var modeButtons = document.querySelectorAll(".mode");
var easyButton = document.querySelector(".mode");
var count = document.querySelector("#counter");
var nightmare = document.querySelector("#night");

var countdown = 6;

function init() {
    initCards();
    setupMode();
    //nightmareMode();
    reset();
}
/*
function nightmareMode(){
  nightmare.addEventListener("click", function{
    var interval = setInterval(function() {
        if(countdown > 0)countdown--;
        count.textContent = countdown;
        // Display 'counter' wherever you want to display it.
        if (countdown === 0) {
            count.textContent = "";
            messageDisplay.textContent = "TIMEOUT!"
            resetDisplay.textContent = "Play Again"
            changeColors("#FFF");
            body.style.backgroundColor = pickedColor;
            gameOver = true;
            clearInterval(interval);
        }
    }, 1000);
  });
}*/

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
function setupMode() {
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			for (var i = 0; i < modeButtons.length; i++) {
				modeButtons[i].classList.remove("selected");
			}
			this.classList.add("selected");
			if (this.textContent === "Easy") {
				numCards = 3;
			}
			else if(this.textContent == "Hard"){
				numCards = 6;
			}else{
        numCards = 6;
        var interval = setInterval(function() {
            if(countdown > 0)countdown--;
            count.textContent = countdown;
            if (countdown === 0) {
                count.textContent = "";
                messageDisplay.textContent = "TIMEOUT!"
                resetDisplay.textContent = "Play Again"
                changeColors("#FFF");
                body.style.backgroundColor = pickedColor;
                gameOver = true;
                clearInterval(interval);
            }
        }, 1000);
      }
			reset();
		});
	}
}
function reset() {
    gameOver = false;
    countdown = 6;
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
