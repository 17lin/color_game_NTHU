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
var countdown =document.querySelector("#countdown");
var t=5;
var countdownid;
var hi=0;
var fin=0;

function init() {
  countdown.style.display="none";
    initCards();
    setupMode()
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
              fin=1;
              resetButton.style.display= "block";
              countdown.style.display="none";
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
        t=5;
        resetButton.style.display= "block";
        // h1.style.backgroundColor = "#2C8E12";
        countdown.style.display="none";
        hi=0;
			}
			else if(this.textContent==="Hard") {
				numCards = 6;
        t=5;
        resetButton.style.display= "block";
        countdown.style.display="none";
        hi=0;
			}
      else{
        numCards = 6;
        t=5;
        resetButton.style.display= "none";
        countdown.style.display="inline";
        hi=1;
        play();
      }
			reset();
		});
	}
}

function reset() {
    t=5;
    fin=0;
    if(hi===1)
    countdown.style.display="inline";
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
function showtime()
{

    countdown.innerHTML=t;
    t -= 1;
    if(hi===1&& t>-1 && fin===0){
      resetButton.style.display= "none";
    }
    if(t<-1 && hi===1){
      gameOver = true;
      messageDisplay.textContent = "TimeOut!"
      countdown.style.display="none";
      changeColors("#FFF");
      body.style.backgroundColor=pickedColor;
      clearTimeout(countdownid);
      resetButton.style.display= "block";
      resetDisplay.textContent = "Play Again"
    }
    //每秒執行一次,showTime()
    countdownid=setTimeout("showtime()",1000);
}




function play() {
  showtime();
}
