window.onload = function() {
    init();
};

var numCards = 3;
var gameMod = 0;
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
var easyButton = document.querySelector('#easy');
var hardButton = document.querySelector('#hard');
var nmButton = document.querySelector('#nightmare');
var timerDisplay = document.querySelector('#timer');
var time;
var myTimer;
var on;
var off;

function changeEasy(){
    if(gameMod !== 0){
    	easyButton.style.backgroundColor = "#FFFFFF";
    	hardButton.style.backgroundColor = "#FFFFFF";
    	nmButton.style.backgroundColor = "#FFFFFF";
    	this.style.backgroundColor = "#AAAAAA"; 

    	timerDisplay.style.display = "none";
    	resetButton.style.display = 'block';

    	clearInterval(myTimer);
        clearInterval(on);

    	numCards = 3;
		gameMod = 0;

    	reset();
    }
}

function changeHard(){
    if(gameMod !== 1){
	    easyButton.style.backgroundColor = "#FFFFFF";
	    hardButton.style.backgroundColor = "#FFFFFF";
	    nmButton.style.backgroundColor = "#FFFFFF";
	    this.style.backgroundColor = "#AAAAAA";

	    timerDisplay.style.display = "none";
	    resetButton.style.display = 'block';

	    numCards = 6;
	    gameMod = 1;

	    clearInterval(myTimer);
        clearInterval(on);

	    reset();
	}
}

function my_func(){
	if(time !== 0) time = time - 1;
	timerDisplay.textContent = time;
	if(time === 0){
		timeout();
	}
}

function changeNM(){
    if(gameMod !== 2){
	    easyButton.style.backgroundColor = "#FFFFFF";
	    hardButton.style.backgroundColor = "#FFFFFF";
	    nmButton.style.backgroundColor = "#FFFFFF";
	    this.style.backgroundColor = "#AAAAAA";
			
		timerDisplay.style.display = "inline";
		resetButton.style.display = 'none';

		time = 5;
		timerDisplay.textContent = time;
		myTimer = setInterval(my_func, 1000);
        blinking();

	    numCards = 6;
	    gameMod = 2;

	    reset();
	}
}

function init() {
	easyButton.style.backgroundColor = "#AAAAAA";
    easyButton.addEventListener("click", changeEasy);
    hardButton.addEventListener("click", changeHard);
    nmButton.addEventListener("click", changeNM);

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
                if(gameMod === 2){
					timerDisplay.style.display = "none";
					resetButton.style.display = 'block';
					resetDisplay.textContent = "Play Again";
                	clearInterval(myTimer);
                }
                resetDisplay.textContent = "Play Again";
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again";
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
    resetDisplay.textContent = "New Color";
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
    if(gameMod === 2){
		timerDisplay.style.display = "inline";
		resetButton.style.display = 'none';

		time = 5;
		timerDisplay.textContent = time;
		myTimer = setInterval(my_func, 1000);
        blinking();

    	reset();
    }
    else{
    	reset();
    }
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
        arr.push(randomColor());
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

function timeout(){
	timerDisplay.style.display = "none";
	resetButton.style.display = 'block';
	resetDisplay.textContent = "Play Again";
	changeColors("#FFF");
    body.style.backgroundColor = pickedColor;
	messageDisplay.textContent = "TIMEOUT!";
	clearInterval(myTimer);
	gameOver = true;
    clearInterval(on);
}

function blinking(){
    on = setInterval(turn_on, 1000);
}

function turn_on(){
    body.style.backgroundColor = '#FFFFFF';
    setTimeout(turn_off, 50);
}

function turn_off(){
    body.style.backgroundColor = '#232323';
}