window.onload = function() {
    init();
};

var numCards = 6;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
// var card_h = document.querySelectorAll(".card_h");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var mode;
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");
var night = document.querySelector("#night");
var footer = document.querySelector("#footer");
var blink;
var countdown;
function init() {
    initbtn();
    initCards();
    reset();
}
function initbtn(){
    easy.addEventListener("click",function(){
      mode = "easy";
      numCards =3;
      easy.style.backgroundColor = "steelblue";
      hard.style.backgroundColor = "white";
      night.style.backgroundColor = "white";
      reset();
    });
    hard.addEventListener("click",function(){
      mode = "hard";
      numCards =6;
      hard.style.backgroundColor = "steelblue";
      easy.style.backgroundColor = "white";
      night.style.backgroundColor = "white";
      reset();
    });
    easy.addEventListener("mouseenter",function(){
      easy.style.color = "black";
    });
    hard.addEventListener("mouseenter",function(){
      hard.style.color = "black";
    });
    easy.addEventListener("mouseleave",function(){
      easy.style.color = "#CCC";
    });
    hard.addEventListener("mouseleave",function(){
      hard.style.color = "#CCC";
    });
    night.addEventListener("click",function(){
      mode = "night";
      numCards =6;
      night.style.backgroundColor = "steelblue";
      hard.style.backgroundColor = "white";
      easy.style.backgroundColor = "white";
      reset();
    });
    night.addEventListener("mouseenter",function(){
      night.style.color = "black";
    });
    night.addEventListener("mouseleave",function(){
      night.style.color = "#CCC";
    });
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
    clearInterval(countdown);
    clearInterval(blink);
    messageDisplay.textContent = "What's the Color?";
    resetDisplay.textContent = "New Color";
    footer.style.display = "block";
    body.style.backgroundColor = "#232323";
    
    gameOver = false;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?";
    //change colors of cards
    for (var i = 0; i < numCards; i++) {
        cards[i].style.opacity = 1;
        if (colors[i]) {
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    if(mode === "easy"){
      for(var i =3;i<6;i++){
        cards[i].style.display = "none";
      }
    }
    if(mode !== "night"){
      clearInterval(countdown);
      clearInterval(blink);
      messageDisplay.textContent = "What's the Color?";
      resetDisplay.textContent = "New Color";
      footer.style.display = "block";
      body.style.backgroundColor = "#232323";
    }
    if(mode ==="night"){
      footer.style.display = "none";

      blink = setInterval(function(){
        if(gameOver) body.style.backgroundColor="#232323";
        var toggle = 1;
        if(toggle == 1){
          body.style.backgroundColor="555";
          toggle = 0;
        }
        else {
          body.style.backgroundColor="#232323"
          toggle = 1;
        }
      },500);
      countdown = setInterval(function(){
        var count = 5;
        if(count>=0){
          body.style.backgroundColor = "#AAA";
          body.style.backgroundColor = "#232323";
          messageDisplay.textContent = "What's the Color? " +count;
          count--;
        }
        else{
          gameOver = true;
          messageDisplay.textContent = "Time Out!";
          footer.style.display = "block";
          body.style.backgroundColor = "#232323";
          clearInterval(countdown);
          clearInterval(blink);
        }
      },1000);
    }
    body.style.backgroundColor = "#232323";
}

resetButton.addEventListener("click", function() {
    reset();
})

function changeColors(color) {
    //loop through all cards
    for (var i = 0; i < numCards; i++) {
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
