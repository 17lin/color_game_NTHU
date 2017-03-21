window.onload = function() {
    init();
};
var blink_count = 0;
var blink_duration ;
var duration = 48 ;
var mode = [0, 1, 2] ;
var curMode = 0 ;
var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var mode = document.querySelectorAll(".mode");
var easy = document.querySelector("#Easy");
var hard = document.querySelector("#Hard");
var nightmare = document.querySelector("#Nightmare");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var h2 = document.querySelector("h2");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var t = 6 ;
var go;
var blink_id;

function init() {
  /*SelectModes()*/
var show = showTime() ;

  if(curMode==0)
    numCards = 3;
  else
    numCards = 6;

    initCards();
    reset();

}

function Blink(){

  if(gameOver!=true){
    if(blink_duration > 0){
      blink_count++ ;
      blink_duration--;
      body.style.backgroundColor = "#232323";
    }
    else {
      blink_count++;
      if(blink_count > 60){
        blink_duration = duration;
        blink_count = 0;
        }
        body.style.backgroundColor = "white";
    }
  }
      blink_id = setTimeout("Blink()",16);
}
easy.onclick = function (easy) {
  if(curMode!==0){
    numCards = 3 ;
    initCards() ;
    reset() ;
    curMode=0 ;
    gameOver=false;
    messageDisplay.textContent = "what is the color?" ;
    resetDisplay.textContent = "New Color"
        resetButton.style.display = 'block' ;
  }
}

hard.onclick = function (hard) {
  if(curMode!==1){
    numCards = 6 ;
    initCards() ;
    reset() ;
    curMode=1 ;
    messageDisplay.textContent = 'what is the color?' ;
    resetDisplay.textContent = "New Color"
    gameOver=false;
        resetButton.style.display = 'block' ;
  }
}

nightmare.onclick = function (nightmare) {
  if(curMode!==2){
    gameOver=false;
    numCards = 6 ;
    initCards() ;
    reset() ;
    curMode=2 ;
     t = 6 ;
   showTime();
   Blink() ;


    resetButton.style.display = 'none' ;
  }

}

    function showTime()
    {
      if(gameOver == false ){

      if(t!=0  && curMode==2){
        t --;
      messageDisplay.textContent = 'what is the color?  ' + t;
      }
      if(t<=0 && curMode==2){
        messageDisplay.textContent = 'Time is Up!'  ;
        resetButton.style.display = 'block' ;
        resetDisplay.textContent = "Try Again"
      changeColors("#FFF");
      body.style.backgroundColor = pickedColor;
      gameOver=true ;
      clearTimeout(go) ;
            curMode = -99 ;
      }
    }
    go = setTimeout("showTime()",1000) ;
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
                resetButton.style.display = 'block' ;
                resetDisplay.textContent = "Try Again"
                gameOver = true;
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset() {

      numCards = 3 ;
      initCards() ;
      curMode=0 ;

      gameOver=false;
      messageDisplay.textContent = "what is the color?" ;

      resetDisplay.textContent = "New Color"
      clearTimeout(blink_id)
      clearTimeout(go)
      t = 6 ;
      gameOver = false;



    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;

    resetDisplay.textContent = "New Color"



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
