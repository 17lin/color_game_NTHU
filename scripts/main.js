window.onload = function() {
    init();
};

var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var timeOut = false;

var c = 5;
var t;
var timeOut = 0;

var currentMode;

var countDown = document.getElementById("countDown");
var modeButtons = document.querySelectorAll(".mode");
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");

function init() {
    initCards();
    setupMode();
    reset();
}

function initCards() {
    countDown.style.display = "none";
    if(currentMode==="Nightmare"){

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
                    // countDown.style.display = "none";
                    countDown.style.display = "none";
                    resetButton.style.display = "block";
                    messageDisplay.textContent = "Correct!";
                    resetDisplay.textContent = "Play Again"

                    clearTimeout(t);

                    changeColors("#FFF");
                    body.style.backgroundColor = clickedColor;
                    gameOver = true;
                } else {
                    this.style.opacity = 0;
                    messageDisplay.textContent = "Try Again"
                }
            });

      }
    }else{
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
                clearTimeout(t);
                  countDown.style.display = "none";
                  resetButton.style.display = "block";
                  messageDisplay.textContent = "Correct!";
                  resetDisplay.textContent = "Play Again";
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
}

function setupMode() {
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			for (var i = 0; i < modeButtons.length; i++) {
				modeButtons[i].classList.remove("selected");
			}
			this.classList.add("selected");
			if (this.textContent === "Easy") {
        currentMode = "Easy";
				numCards = 3;
        countDown.style.display = "none";
        resetButton.style.display = "block";
			}
			else if(this.textContent === "Hard") {
        currentMode = "Hard";
				numCards = 6;
        countDown.style.display = "none";
        resetButton.style.display = "block";
			}
      else if(this.textContent === "Nightmare") {
        currentMode = "Nightmare";
        numCards = 6;
        c = 5;
        timeOut = 0;
        countDown.textContent = "5";
        countDown.style.display = "inline";
        resetButton.style.display = "none";
        // count();
        //startCount();

      }
			reset();
		});
	}
}



function timedCount() {
    countDown.textContent = c.toString();
    body.classList.add("blink");
    if(c>0)c = c - 1;
    else {
      timeOut = 1;
      countDown.textContent = "";
      clearTimeout(t);
      resetButton.style.display = "block";
      body.style.backgroundColor = pickedColor;
      messageDisplay.textContent = "Time out!";
      changeColors("#FFF");
      body.classList.remove("blink");
      return;
    }
    t = setTimeout(function(){ timedCount() }, 1000);
}

function startCount() {
    if (!timeOut) {
      timedCount();
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
    //numCards = 6;
    c = 5;
    timeOut = 0;
    if(currentMode==="Nightmare"){
      startCount();
      countDown.style.display = "inline";
      numCards = 6;
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
    arr.length = 0;
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
