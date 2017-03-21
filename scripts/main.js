window.onload = function() {
	
    init();
};
var countdownnumber=5;
var countdownid,x;
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

resetButton.style.visibility="hidden";
var mobtn = document.querySelector("#mode");
mobtn.addEventListener("mouseover",function(){
	var OriginalFont=document.querySelector("#mode").innerHTML;
    document.querySelector("#mode").innerHTML='<font background-color="green">'+OriginalFont+'</font>';
})
mobtn.addEventListener("mouseout",function(){
	mobtn.style.color = gray;
})
var modeValue=1;
var el = document.getElementById("bw");
el.addEventListener("mouseover", f1);
el.addEventListener("mouseout", f2);


function f1() {
   el.innerHTML = "Click me";
}
function f2() {
    el.innerHTML = "New Color";
}

function init() {
	
    initCards();
    reset();
	initial();
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
				clearInterval(countdownid);
                resetDisplay.textContent = "Play Again"
				resetButton.style.visibility="visible";
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
	countdownnumber=5;
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
    init();
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
function initial(){
	clearInterval(countdownid);
	countdownnumber=5;
	x=document.getElementById("countdown");
	x.innerHTML=countdownnumber;
	countdownnumber--;
	countdownid=window.setInterval(countdownfunc,1000);
}

function countdownfunc(){ 
	x.innerHTML=countdownnumber;
	//var cc = this.style.backgroundColor;
	if(countdownnumber==0){
		messageDisplay.textContent = "Time out!";
		resetButton.style.visibility="visible";
		body.style.backgroundColor = pickedColor;
		changeColors("#FFF");
		clearInterval(countdownid);
		countdownnumber+=6;
  }
  countdownnumber--;
}