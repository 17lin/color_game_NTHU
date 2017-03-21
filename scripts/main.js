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
var modeButtons = document.querySelectorAll(".mode");
var countdown = document.querySelector("#countdown");

function init() {
    initCards();
    selectMode();
    reset();
}
var n = 5;
/*
function selectMode(){
    for(var i = 0;i < modeButtons.length;i ++){
        modeButtons[i].addEventListener("click", function(){
            for(var i = 0;i < modeButtons.length;i ++){
                modeButtons[i].classList.remove("selected");
            }
            this.classList.add("selected");
            //numCards = 6;
            if(this.textContent ==="Easy") numCards = 3;
            else if(this.textContent ==="Hard")numCards = 6;
            else if(this.textContent ==="Noghtmare"){
                resetButton.style.display="none";
                numCards = 6;
                n = 5;
                countdown.textContent = " 5";
                var x = setInterval(timing, 1000);
                function timing(){
                    countdown.textContent = " " + --n;
                    if(n <= 0){
                        resetButton.style.display="block";
                        body.style.backgroundColor = pickedColor;
                            messageDisplay.textContent = "TIMEOUT!";
                            countdown.textContent = "";
                            clearInterval(x);
                            n = 5;    
                        }
                    }
            }
            reset();
        })
    }
}*/

function selectMode() {
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			for (var i = 0; i < modeButtons.length; i++) {
				modeButtons[i].classList.remove("selected");
			}
			this.classList.add("selected");
			if (this.textContent === "Easy") {
				numCards = 3;
			}
			else if(this.textContent==="Hard"){
				numCards = 6;
			}else{
                resetButton.style.display="none";
                n = 5;
                countdown.textContent = " 5";
                mode = 3;
                numCards = 6;
                resetButton.style.display="none";
                setInterval(timing, 1000);
            }
			reset();
		});
	}
}/*
var mode = 1;
function selectMode(){
    for(var i = 0;i < modeButtons.length;i ++){
        modeButtons[i].addEventListener("click", function(){
            for(var i = 0;i < modeButtons.length;i ++){
                modeButtons[i].classList.remove("selected");
            }
            this.classList.add("selected");
            if(this.textContent==="Easy"){ numCards = 3; mode = 1;}
            if(this.textContent==="Hard"){numCards = 6; mode = 2;}
            else{
                resetButton.style.display="none";
                n = 5;
                countdown.textContent = " 5";
                mode = 3;
                numCards = 6;
                resetButton.style.display="none";
                setInterval(timing, 1000);
            }
            reset();
        })
    }
}
*/
function timing(){
                    countdown.textContent = " " + --n;
                    if(n <= 0 || gameOver){
                        resetButton.style.display="block";
                        body.style.backgroundColor = pickedColor;
                            if(gameOver){
                                countdown.textContent = "";
                                messageDisplay.textContent = "Correct!";
                            }
                            else{
                                countdown.textContent = "";
                                messageDisplay.textContent = "TIMEOUT!";
                                gameOver = true;
                            }
                            
                            clearInterval(x);
                            n = 5;    
                        }
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
