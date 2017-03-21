window.onload = function() {
    init();
};

var numCards = 3;       // how many card
var gameOver = false;
var colors = [];
var pickedColor;
var easy = true;  //easy mood
var hard = false; // hard mode
var nightmare =false; //nightmare
var timers;
var timer2;
var timers_word = 6;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked"); //question
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1"); // word to show in screen
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var easyBottom = document.querySelector("#easy");
var hardBottom = document.querySelector("#hard");
var nightmareBottom =document.querySelector("#nightmare");

//blink
var rr=0; var gg=0; var bb=0;
var blink=false;
function init() {   // initial condition
    initCards();
    reset();  // first time give color
}

function initCards() {
    for (var i = 0; i < cards.length; i++) {
        //add click listeners to cards
        cards[i].addEventListener("click", function() {
            if (gameOver)
                return;  // no use if click one more time
            //grab color of clicked card
            var clickedColor = this.style.backgroundColor; // cards[i]
            // alert(this.style.backgroundColor);
            //compare color to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetDisplay.textContent = "Play Again" // change the word in the button
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                clearInterval(timers);
                resetButton.style.opacity=1;
                gameOver = true;
            } else {
                this.style.opacity = 0;  // card[i] become invisible
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset() {
    if(nightmare){// Nighmare reset timer{
      timers_word=6;
      timers= setInterval(call,1000);
      timer2= setInterval(blinker,100);
      blink=true;
      resetButton.style.opacity=0;
    }
    gameOver = false;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor(); // pick one for correct answer
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
    // nightmare
}


resetButton.addEventListener("click", function() {
    clearInterval(timer2);
    clearInterval(timers);
    reset("aaa");
})

easyBottom.addEventListener("click", function() {
  resetButton.style.opacity=1;
  clearInterval(timers);
  clearInterval(timer2);
  easyBottom.style.backgroundColor= "blue";
  easyBottom.style.color= "white";
  hardBottom.style.backgroundColor= "white";
  hardBottom.style.color= "black";
  nightmareBottom.style.backgroundColor= "white";
  nightmareBottom.style.color= "black";
  easy=true;
  hard=false;
  nightmare =false;
  numCards=3;
  reset();
})
hardBottom.addEventListener("click",function() {
  resetButton.style.opacity=1;
  clearInterval(timers);
  clearInterval(timer2);
  hardBottom.style.backgroundColor= "blue";
  hardBottom.style.color= "white";
  easyBottom.style.backgroundColor= "white";
  easyBottom.style.color= "black";
  nightmareBottom.style.backgroundColor= "white";
  nightmareBottom.style.color= "black";
  easy=false;
  hard=true;
  nightmare =false;
  numCards=6;
  reset();
})
function call(){
  if(nightmare){
    timers_word=timers_word-1;
    blink=true;
    if(timers_word){
      messageDisplay.textContent = "What's the Color?" + timers_word;
    }
    else{
      clearInterval(timers);
      timeout();

    }
}
}
function blinker(){
  if(blink){ //blink
    //alert("111");
    if(rr===255){
      rr=0;gg=0;bb=0;
      //clearInterval(timer2);
      blink=false;
    }
    else{
      rr=255;gg=255;bb=255;
    }
    body.style.backgroundColor ="rgb(" + rr + ", " + gg + ", " + bb + ")";
  }
}

function timeout(){
  blink=false;
  messageDisplay.textContent = "Timeout!";
  body.style.backgroundColor = pickedColor;
  resetButton.style.opacity=1;
  resetDisplay.textContent = "Play Again";
  changeColors("white");
  gameOver = true;
}

nightmareBottom.addEventListener("click",function() {
  clearInterval(timers);
  clearInterval(timer2);
  hardBottom.style.backgroundColor= "white";
  hardBottom.style.color= "black";
  easyBottom.style.backgroundColor= "white";
  easyBottom.style.color= "black";
  nightmareBottom.style.backgroundColor= "blue";
  nightmareBottom.style.color= "white";
  resetButton.style.opacity=0;  // cut bottom
  //timers_word=5;
  easy=false;
  hard=false;
  nightmare =true;
  numCards=6;
  //timers= setInterval(call,1000);
  reset();
})

easyBottom.addEventListener("mouseover",function(){
  this.style.color ="red";
})
easyBottom.addEventListener("mouseout",function(){
  this.style.color ="black";
})
hardBottom.addEventListener("mouseover",function(){
  this.style.color ="red";
})
hardBottom.addEventListener("mouseout",function(){
  this.style.color ="black";
})
nightmareBottom.addEventListener("mouseover",function(){
  this.style.color ="red";
})
nightmareBottom.addEventListener("mouseout",function(){
  this.style.color ="black";
})


function changeColors(color) {
    //loop through all cards
    for (var i = 0; i < cards.length; i++) {
        //change each color to match given color
        cards[i].style.opacity = 1;  // transparency
        cards[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length); // get rid of floating point
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
