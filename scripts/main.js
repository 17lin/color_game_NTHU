window.onload = function() {
    init();
};

var select = 0;
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

function init() {
    initCards();
    reset();
}

function select0(){
    if(select !== 0){
      select = 0;
      numCards = 3;
      changefontcolor();
      init();
    }
}

function select1(){
    if(select !== 1){
      select = 1;
      numCards = 6;
      changefontcolor();
      init();
    }
}

function select2(){
    if(select !== 2){
      select = 2;
      numCards = 6;
      changefontcolor();
      init();
    }
}
function changefontcolor(){
    if(select === 0){
      var OriginalFont=document.getElementById("easy").innerHTML;
      document.getElementById("easy").innerHTML='<font color="blue">'+OriginalFont+'</font>';
      var OriginalFont=document.getElementById("hard").innerHTML;
      document.getElementById("hard").innerHTML='<font color="black">'+OriginalFont+'</font>';
      var OriginalFont=document.getElementById("nightmare").innerHTML;
      document.getElementById("nightmare").innerHTML='<font color="black">'+OriginalFont+'</font>';
    }
  else if(select === 1){
      var OriginalFont=document.getElementById("easy").innerHTML;
      document.getElementById("easy").innerHTML='<font color="black">'+OriginalFont+'</font>';
      var OriginalFont=document.getElementById("hard").innerHTML;
      document.getElementById("hard").innerHTML='<font color="blue">'+OriginalFont+'</font>';
      var OriginalFont2=document.getElementById("nightmare").innerHTML;
      document.getElementById("nightmare").innerHTML='<font color="black">'+OriginalFont+'</font>';
  }
  else if(select === 2){
      var OriginalFont=document.getElementById("easy").innerHTML;
      document.getElementById("easy").innerHTML='<font color="black">'+OriginalFont+'</font>';
      var OriginalFont=document.getElementById("hard").innerHTML;
      document.getElementById("hard").innerHTML='<font color="black">'+OriginalFont+'</font>';
      var OriginalFont=document.getElementById("nightmare").innerHTML;
      document.getElementById("nightmare").innerHTML='<font color="blue">'+OriginalFont+'</font>';
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
