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
/*button mode*/
var modeButtons = document.querySelectorAll(".mode");
var easyButton = document.querySelector(".mode");
/*button mode*/
/*down-counter*/
var counter = 5;
var dc = document.querySelector("#counter");
var count = 0;
/*down-counter*/
var id;
var bl, bl2;


function init() {
    initCards();
    setupMode();
    reset();
}



/*setup mode */

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
			else  {
				numCards = 6;
			}
			reset();
		});
	}
}

/*setup mode */

/*setup counter*/

modeButtons[0].addEventListener("click", function() {
    dc.textContent = null;
    count = 6;
    clearInterval(id);
    clearInterval(bl);
    clearInterval(bl2);
});

modeButtons[1].addEventListener("click", function() {
    dc.textContent = null;
    count = 6;
    clearInterval(id);
    clearInterval(bl);
    clearInterval(bl2);
});


modeButtons[2].addEventListener("click", function() {
  count = 0 ;
  function tick() {
    dc.textContent = (counter - count)>=0 ? (counter - count) : 0;
    count = count + 1;
    if(count<6&&clickedColor !== pickedColor)
        resetButton.style.opacity = 0;
    else
    {
        resetButton.style.opacity = 1;
        resetDisplay.textContent = "Try again"
        changeColors("#FFF");
        body.style.backgroundColor = pickedColor;
        gameOver = true;
        messageDisplay.textContent = "Time out "
        dc.textContent="";
    }
  }
  id = setInterval(tick, 1000);


});



/*setup conter*/

/*bling*/
modeButtons[2].addEventListener("click", function() {


  function bling () {
    body.style.backgroundColor = "white";
  }

  function bling2() {
    body.style.backgroundColor = "#232323";
  }

  bl = setInterval(bling, 1000);
  bl2 = setInterval(bling2,1020);

});
/*bling*/


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
                resetDisplay.textContent = "Play Again"
                changeColors("cards[i]");
                body.style.backgroundColor = clickedColor;
                resetButton.style.opacity = 1;
                gameOver = true;
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again "
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
    resetDisplay.textContent = "New Color" ;
    messageDisplay.textContent = "What's the Color? ";
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
    count = 0;
}

resetButton.addEventListener("click", function() {
    reset();
})

resetButton.addEventListener("mouseover", function() {
    resetButton.style.backgroundColor = "steelblue";
    resetButton.style.color = "white";
});

resetButton.addEventListener("mouseout", function() {
    resetButton.style.backgroundColor = "white";
    resetButton.style.color = "grey";
});

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
