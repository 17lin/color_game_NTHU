window.onload = function() {
    init();
};
var t;
var count = 5;
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
var hardMode = document.querySelector("#hard");
var easyMode = document.querySelector("#easy");
var nightMode = document.querySelector("#night");
var restart = document.querySelector("#restart");
var counter;
var Mode;

function init() {
    initCards();
    reset();
}

function initCards() {
    count = 5;
    clearInterval(counter);
    counter = setInterval(timer, 1000);
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
                document.getElementById("timer").innerHTML = "";
                resetButton.style.display = "block";
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
    if(Mode==="Night" && gameOver===true){
      count = 5;
      clearInterval(counter);
      counter = setInterval(timer, 1000);
    }
    gameOver = false;
    colors = generateRandomColors(cards.length);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    document.getElementById("timer").innerHTML = "";
    resetButton.style.display = "block";
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

hardMode.addEventListener("click", function() {
    document.querySelector("#card-container").innerHTML = '<div class="card"></div><div class="card"></div><div class="card"></div><div class="card"></div><div class="card"></div><div class="card"></div>'
    cards = document.querySelectorAll(".card");
    Mode = "Hard";
    init();

})

easyMode.addEventListener("click", function() {
    document.querySelector("#card-container").innerHTML = '<div class="card"></div><div class="card"></div><div class="card"></div>';
    cards = document.querySelectorAll(".card");
    init();
    Mode = "Easy";
})
nightMode.addEventListener("click", function() {
    document.querySelector("#card-container").innerHTML = '<div class="card"></div><div class="card"></div><div class="card"></div><div class="card"></div><div class="card"></div><div class="card"></div>'
    cards = document.querySelectorAll(".card");
    Mode = "Night";
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

function timer() {
    if (Mode === "Night" && gameOver === false) {
      document.getElementById("timer").innerHTML = count;
      resetButton.style.display = "none";
      if(gameOver)return;
        if (count == 0) {
          gameOver = true;
            document.getElementById("timer").innerHTML = "";
            messageDisplay.textContent = "TIMEOUT!";
            for (var i = 0; i < cards.length; i++) {
                cards[i].style.opacity = 1;
                if (colors[i]) {
                    cards[i].style.display = "block"
                    cards[i].style.backgroundColor = "white";
                } else {
                    cards[i].style.display = "none";
                }
            }
            body.style.backgroundColor = pickedColor;
            resetDisplay.textContent = "Play Again";
            resetButton.style.display = "block";
            window.clearInterval(counter);
            return;
        }
        count = count - 1;
        blink(1);
    }
}

function blink(num) {
    body.style.backgroundColor = "white";
    if(num)
      t=setTimeout("blink(0)", 100);
    else {
      body.style.backgroundColor = "#232323";
    }
}
