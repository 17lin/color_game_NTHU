window.onload = function() {
    init();
};

var numCards = 3;
var mode; 
var time;
var id, idBlink; // id for setInterval
var blink = false;
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
var easyTag = document.getElementById("easy");
var hardTag = document.getElementById("hard");
var nightmareTag = document.getElementById("nightmare");
var timer = document.getElementById("timer");

function init() {
	stopTimer();
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
				stopTimer();
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
	
	if(mode=="nightmare") {
		time = 5;
		resetButton.style.display = "none";
		id = setInterval(function() {
			if(time>0) {
				timer.textContent = time;
				body.style.backgroundColor = "white";
				blink = true;
				time--;
			} else {
				stopTimer();
				messageDisplay.textContent = "timeout!";
				body.style.backgroundColor = pickedColor;
				changeColors("#FFF");
				gameOver = true;
			}
		}, 1000);
		idBlink = setInterval(function() {
			if(blink) {
				body.style.backgroundColor = "white";
				blink = false;
			} else {
				body.style.backgroundColor = "black";
			}
		}, 100)
	}
}

function stopTimer( ) {
	timer.textContent = "";
	resetButton.style.display = "block";
	clearInterval(id);
	clearInterval(idBlink);
} 

resetButton.addEventListener("click", function() {
    reset();
})


easyTag.addEventListener("mousedown", function(){
	mode = "easy";
	numCards = 3;
	init();
	this.classList.add("selected");
	hard.classList.remove("selected");
	nightmare.classList.remove("selected");
})

hardTag.addEventListener("mousedown", function(){
	mode = "hard";
	numCards = 6;
	stopTimer();
	init();
	this.classList.add("selected");
	easy.classList.remove("selected");
	nightmare.classList.remove("selected");
})

nightmareTag.addEventListener("mousedown", function(){
	mode = "nightmare";
	numCards = 6;
	init();
	this.classList.add("selected");
	easy.classList.remove("selected");
	hard.classList.remove("selected");
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
