window.onload = function() {
    mode = 0;
    numCards = 3;
    init();
};

var mode;
var numCards;
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

var easyButton = document.querySelector("#easyButton");
var hardButton = document.querySelector("#hardButton");
var nightmareButton = document.querySelector("#nightmareButton");
var countDown;
var countDownText = document.getElementById("countDown");
var blinker;
var secondTimer;

easyButton.addEventListener("click", function() {
  mode = 0;
  numCards = 3;
  init();
})

hardButton.addEventListener("click", function() {
  mode = 1;
  numCards = 6;
  init();
})

nightmareButton.addEventListener("click", function() {
  mode = 2;
  numCards = 6;
  init();
})

function tick() {
  if(countDown > 0) {
    countDown--;
    countDownText.textContent = String(countDown);

    // Blink
    body.style.backgroundColor = "#FFF";

    blinker = setInterval(function() {
      body.style.backgroundColor = "#232323";
      clearInterval(blinker);
    }, 100);

  } else {
    messageDisplay.textContent = "Timeout!";
    countDownText.style.display = "none";
    resetDisplay.textContent = "Play Again"
    changeColors("#FFF");
    body.style.backgroundColor = pickedColor;
    resetButton.style.display = "block";
    gameOver = true;
  }
}

function init() {
    easyButton.classList.remove('selected');
    hardButton.classList.remove('selected');
    nightmareButton.classList.remove('selected');

    if(mode === 0) {
      easyButton.classList.add('selected');
    } else if (mode === 1) {
      hardButton.classList.add('selected');
    } else {
      nightmareButton.classList.add('selected');
    }

    initCards();
    reset();

    if(mode === 2) { // nightmare mode
      countDownText.style.display = "inline";
      countDownText.textContent = String(countDown);
      resetButton.style.display = "none";
      secondTimer = setInterval(tick, 1000);
    } else {
      countDownText.style.display = "none";
      resetButton.style.display = "block";
      clearInterval(secondTimer);
    }
}

function initCards() {
    for (var i = 0; i < numCards; i++) {
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
    // initialize timer here
    countDown = 5;
    if(mode === 2) { // nightmare mode
      countDownText.style.display = "inline";
      countDownText.textContent = String(countDown);
      resetButton.style.display = "none";
    } else {
      countDownText.style.display = "none";
      resetButton.style.display = "block";
    }

    gameOver = false;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?";
    //change colors of cards
    for (var i = 0; i < 6; i++) {
      if(i < numCards) {
        cards[i].style.opacity = 1;
        if (colors[i]) {
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
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
