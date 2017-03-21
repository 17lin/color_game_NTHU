window.onload = function() {
    init();
};
var counter ;
var nightmare = false;
var numCards = 6;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var tt = document.querySelector("#tt");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var modeButtons = document.querySelectorAll(".mode");
var easyButton = document.querySelector(".mode");
var footer = document.querySelector("#footer");
function init() {
    initCards();
    setupMode();
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
                tt.textContent = "";
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
  /*if(nightmare){
    counter = 6;
    numCards = 6;
    var cc = setInterval(function() {
        if(!gameOver)tt.textContent = counter-1;
        counter--;

        // Display 'counter' wherever you want to display it.
        if (counter <= 0) {
            // Display a login box
            if(!gameOver){
            messageDisplay.textContent = "";
            tt.textContent = "Timeout";
          }
            body.style.backgroundColor = pickedColor;
            gameOver = true;
            changeColors("#FFF");
            clearInterval(cc);

        }
    }, 1000);
  }*/
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

function setupMode() {
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			for (var i = 0; i < modeButtons.length; i++) {
				modeButtons[i].classList.remove("selected");
			}
			this.classList.add("selected");
			if (this.textContent === "Easy") {
        clearInterval(cc);
        resetButton.style.display = "block";
        nightmare = false;
				numCards = 3;
        tt.textContent = "";
			}
			else if (this.textContent === "Hard") {
        clearInterval(cc);
        resetButton.style.display = "block";
        nightmare = false;
				numCards = 6;
        tt.textContent = "";
			}
      else{
        nightmare = true;
        counter = 6;
        numCards = 6;
        resetButton.style.display = "none";
        var cc = setInterval(function() {
            if(!gameOver)tt.textContent = counter-1;
            counter--;

            // Display 'counter' wherever you want to display it.
            if (counter <= 0) {
                // Display a login box
                if(!gameOver){
                messageDisplay.textContent = "";
                tt.textContent = "Timeout";
              }
                body.style.backgroundColor = pickedColor;
                gameOver = true;
                changeColors("#FFF");
                clearInterval(cc);

            }
        }, 1000);

      }
			reset();
		});
	}
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
