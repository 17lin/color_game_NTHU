window.onload = function() {
    buttoncontrol();
    init();
    setInterval(timecount, 1000);
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
var resetDisplay = document.querySelector("#reset span");
var issel = 100;
var b1 = document.querySelector("#easy");
var b2 = document.querySelector("#hard");
var b3 = document.querySelector("#nightmare");
var count = document.querySelector("#count");
var time = 5;
var to=1;
var id;
function buttoncontrol() {


  b1.addEventListener('mouseover',function(e){
      if(issel===100) b1.style.color = 'white';
      else b1.style.color = 'steelblue';
  });
  b1.addEventListener('mouseout',function(e){
      if(issel===100) b1.style.color = 'white';
      else b1.style.color = 'black';
  });
  b1.addEventListener('click',function(e){
      issel = 100;
      b1.style.background = 'steelblue';
      b2.style.color = 'black';
      b2.style.background = 'white';
      b3.style.color = 'black';
      b3.style.background = 'white';
      count.style.opacity = 0;
      resetButton.style.opacity = 1;
      reset();
  });



  b2.addEventListener('mouseover',function(e){
      if(issel===110) b2.style.color = 'white';
      else b2.style.color = 'steelblue';
  });
  b2.addEventListener('mouseout',function(e){
      if(issel===110) b2.style.color = 'white';
      else b2.style.color = 'black';
  });
  b2.addEventListener('click',function(e){
      issel = 110;
      b2.style.background = 'steelblue';
      b1.style.background = 'white';
      b1.style.color = 'black';
      b3.style.background = 'white';
      b3.style.color = 'black';
      count.style.opacity = 0;
      resetButton.style.opacity = 1;
      reset();
  });


  b3.addEventListener('mouseover',function(e){
      if(issel===111) b3.style.color = 'white';
      else b3.style.color = 'steelblue';
  });
  b3.addEventListener('mouseout',function(e){
      if(issel===111) b3.style.color = 'white';
      else b3.style.color = 'black';
  });
  b3.addEventListener('click',function(e){
      issel = 111;
        time=5;
      b3.style.background = 'steelblue';
      b1.style.background = 'white';
      b1.style.color = 'black';
      b2.style.background = 'white';
      b2.style.color = 'black';
      count.style.opacity = 1;
      resetButton.style.opacity = 0;
      reset();
  });



}
function init() {
    b1.style.background = 'steelblue';
    b1.style.color = 'white';
    if(issel===100){
      numCards = 3;
      reset();
    }
    else{
      numCards = 6;
      reset();
    }
    if(to===0) messageDisplay.textContent = "TIMEOUT";
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
                resetButton.style.opacity = 1;
                count.style.opacity = 0;
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

function timecount(){
  count.textContent = time;
  if(time===0){
    to=0;
    time = 5;
    messageDisplay.textContent = "TIMEOUT";
    count.style.opacity = 0;
    changeColors("#FFF");
    body.style.backgroundColor = pickedColor;
    gameOver = true;
    resetDisplay.textContent = "Play Again"
    resetButton.style.opacity = 1;
    clearInterval(id);
  }
  else time--;
}


function reset() {
    time=5;
    if(issel===111){
      count.style.opacity = 1;
      resetButton.style.opacity = 0;
    }
    else{
      count.style.opacity = 0;
      resetButton.style.opacity = 1;
    }
    gameOver = false;
    if(issel===100) numCards = 3;
    else numCards = 6;

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
