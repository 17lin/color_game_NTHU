window.onload = function() {
    init();
};

var numCards = 6;
var gameOver = false;
var timeout = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var resetDisplayme = document.querySelector("#reset");

var clockDisplay = document.querySelector("#clock");

var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");

var countdownnumber = 6;


function init() {
    initCards();
    reset();
}
function showTime()
{
	if(gameOver)
		return;
	if(countdownnumber===0)
	{
		countdownnumber=0;
		timeout = true;
		document.getElementById('reset').style.display = "block";
        messageDisplay.textContent = "timeout!";
        resetDisplay.textContent = "Play Again"
        changeColors("#FFF");
        body.style.backgroundColor = pickColor();
	}
	else
	{
		countdownnumber -= 1; 
		document.getElementById('div1').innerHTML= countdownnumber;
		resetDisplayme.display = "none";
		body.style.backgroundColor = "#ffffff";
		setTimeout("load()",100);
		setTimeout("showTime()",900);
		document.getElementById('reset').style.display= "none";
	}
}
function load()
{
	body.style.backgroundColor = "#000000";
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
				document.getElementById('reset').style.display = "block";
                messageDisplay.textContent = "Correct!";
                resetDisplay.textContent = "Play Again"
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
            }else if(timeout === true){
                gameOver = true;
			}else {
                this.style.opacity = 0;
                messageDisplay.textContent = "What's the color? ";
            }
        });
    }
}

function reset() {
    gameOver = false;
	timeout = false;
	countdownnumber = 6;
	showTime();
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
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












