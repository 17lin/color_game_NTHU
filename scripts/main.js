window.onload = function() {
    init();
};

var mode = 0;
var blink1;
var count;
var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var modes = document.querySelectorAll(".mode");
var nightmareButton = document.getElementById("nightmare");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");

function init() {
  modes[0].style.backgroundColor = "steelblue";
  modes[0].style.color = "white";
  modes[1].style.backgroundColor = "white";
  modes[1].style.color = "#484848";
  modes[2].style.backgroundColor = "white";
  modes[2].style.color = "#484848";
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
                gameOver = true;
            } else {
                this.style.opacity = 0;
                if (mode != 2)
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

function easy() {
    mode = 0;
    numCards = 3;
    modes[0].style.backgroundColor = "steelblue";
    modes[0].style.color = "white";
    modes[1].style.backgroundColor = "white";
    modes[1].style.color = "#484848";
    modes[2].style.backgroundColor = "white";
    modes[2].style.color = "#484848";
    reset();

}

function hard() {
    mode = 1;
    numCards = 6;
    modes[1].style.backgroundColor = "steelblue";
    modes[1].style.color = "white";
    modes[2].style.backgroundColor = "white";
    modes[2].style.color = "#484848";
    modes[0].style.backgroundColor = "white";
    modes[0].style.color = "#484848";
    reset();

}

function nightmare() {
    mode = 2;
    numCards = 6;
    modes[2].style.backgroundColor = "steelblue";
    modes[2].style.color = "white";
    modes[1].style.backgroundColor = "white";
    modes[1].style.color = "#484848";
    modes[0].style.backgroundColor = "white";
    modes[0].style.color = "#484848";
    reset();
    countdown(6);
}

resetButton.addEventListener("click", function() {
    if (mode == 2) {
        clearInterval(count);
        nightmare();
    } else {
        reset();
    }
})
modes[0].addEventListener("click", function() {

    easy();
    clearInterval(count);

})
modes[1].addEventListener("click", function() {

    hard();
    clearInterval(count);

})
modes[2].addEventListener("click", function() {

    nightmare();


})
function blink() {
    body.style.backgroundColor = "white"
    blink1=setTimeout(function() {
      body.style.backgroundColor = "#232323";
    }, 100);

}
function countdown(time) {
    if (mode == 2) {
        count = setInterval(function() {
          time = time - 1;
          blink();
          messageDisplay.textContent = "What's the Color? " + time;
            if (mode != 2){
                clearInterval(blink1);
                clearInterval(count);
            }
            else if (gameOver == true) {
                clearInterval(blink1);
                clearInterval(count);
                messageDisplay.textContent = "Correct!";
                body.style.backgroundColor = pickedColor;
            } else if (time == 0) {
                messageDisplay.textContent = "Timeout!";
                clearInterval(blink1);
                clearInterval(count);
                gameOver = true;
                changeColors("#FFF");
                body.style.backgroundColor = pickedColor;
            }


        }, 1000);
    }


}

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
