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
var ezButton = document.querySelector("#ez");
var hardButton = document.querySelector("#hard");
var nightmareButton = document.querySelector("#nightmare");
var ezDisplay = document.querySelector("#ez");
var hardDisplay = document.querySelector("#hard");
var nightmareDisplay = document.querySelector("#nightmare");
var resetDisplay = document.querySelector("#reset span");
var countdownnumber=5;
var countdownid,x;
function init() {
    numCards = 3;
    reset();
    initCards();
    x.style.display="none";
    ezDisplay.textContent="Selected";
    hardDisplay.textContent="hard";
    nightmareDisplay.textContent="nightmare";
}
function init2() {
    numCards = 6;
    reset();
    initCards();
    clearInterval(countdownid);
    x.style.display="none";
    ezDisplay.textContent="easy";
    hardDisplay.textContent="Selected";
    nightmareDisplay.textContent="nightmare";
}
function init3() {
    numCards = 6;
    resetButton.style.visibility="hidden";
    reset();
    initCards();
    initial();
    x.style.display="inline";
    ezDisplay.textContent="easy";
    hardDisplay.textContent="hard";
    nightmareDisplay.textContent="Selected";
}
resetButton.addEventListener("click", function() {
    reset();
})
ezButton.addEventListener("click", function() {
    init();
})
hardButton.addEventListener("click", function() {
    init2();
})
nightmareButton.addEventListener("click", function() {
    init3();
})

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
                resetButton.style.visibility="visible";
                resetDisplay.textContent = "Play Again"
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
            } else{
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset() {
    clearInterval(countdownid);
    countdownnumber=5;
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
  while (countdownnumber==0){
    x.innerHTML="Time's up";
    body.style.backgroundColor = pickedColor;
    changeColors("#FFF");
    clearInterval(countdownid);
    countdownnumber+=6;
    resetButton.style.visibility="visible";
  }
  countdownnumber--;
}