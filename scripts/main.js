window.onload = function() {
    init();
};

var numCards = 3;
var hardnumCards = 6;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var hardcards=document.querySelectorAll(".hardcard");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");

var night_button=document.getElementById("nightmare");
var hard_button=document.getElementById("hard");
var easy_button=document.getElementById("easy");
var mode=1;

function init() {
    mode=1;
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
    for (i=0; i<hardcards.length; i++)
    {
      hardcards[i].style.display="none";
    }
    body.style.backgroundColor = "#232323";
    footer.style.display="block"
}

function hardinitCards(){
  for (var i = 0; i < hardcards.length; i++) {
      //add click listeners to cards
      //hardcards[i].style.width=30%;
      hardcards[i].addEventListener("click", function() {
          if (gameOver)
              return;
          //grab color of clicked card
          var clickedColor = this.style.backgroundColor;
          // alert(this.style.backgroundColor);
          //compare color to pickedColor
          if (clickedColor === pickedColor) {
              messageDisplay.textContent = "Correct!";
              resetDisplay.textContent = "Play Again"
              hardchangeColors("#FFF");
              body.style.backgroundColor = clickedColor;
              gameOver = true;
          } else {
              this.style.opacity = 0;
              messageDisplay.textContent = "Try Again"
          }
      });
  }
}

function hardreset(){
  gameOver = false;
  colors = generateRandomColors(hardnumCards);
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match picked Color
  colorDisplay.textContent = pickedColor;
  resetDisplay.textContent = "New Color"
  messageDisplay.textContent = "What's the Color?";
  //change colors of cards
  for (var j=0; j<cards.length; j++)
  {
    cards[j].style.display="none";
  }
  for (var i = 0; i < hardcards.length; i++) {
      hardcards[i].style.opacity = 1;
      if (colors[i]) {
          hardcards[i].style.display = "block"
          hardcards[i].style.backgroundColor = colors[i];
      } else {
          hardcards[i].style.display = "none";
      }
  }
  body.style.backgroundColor = "#232323";
  footer.style.display="block"
}

var t=5;
var flag=0;
function countdown(){
  if (t>=0 && gameOver == false)
  {
    gameover=false;
    messageDisplay.textContent="What's the Color? "+t;
    t--;
    setTimeout(countdown,1000);
  }
  else if (gameOver == false){
    messageDisplay.textContent="TIMEOUT!";
    resetDisplay.textContent="Play Again";
    footer.style.display="block";
    hardchangeColors("#FFF");
    body.style.backgroundColor = pickedColor;
    gameOver = true;
  }
}

function nightinitCards(){
//  messageDisplay.textContent = "What's the Color? "+t ;

  for (var i = 0; i < hardcards.length; i++) {

        hardcards[i].addEventListener("click", function() {
          if (gameOver)
              return;
          //grab color of clicked card
          var clickedColor = this.style.backgroundColor;
          // alert(this.style.backgroundColor);
          //compare color to pickedColor
          if (clickedColor === pickedColor) {
              messageDisplay.textContent = "Correct!";
              resetDisplay.textContent = "Play Again";
              footer.style.display="block";
              hardchangeColors("#FFF");
              body.style.backgroundColor = clickedColor;
              gameOver = true;
          } else {
              this.style.opacity = 0;
              messageDisplay.textContent = "Try Again"+t;
          }
      });
  }
}

function nightreset(){
  gameOver = false;
  colors = generateRandomColors(hardnumCards);
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match picked Color
  //var t = 5;
  colorDisplay.textContent = pickedColor;
  resetDisplay.textContent = "New Color"
  messageDisplay.textContent = "What's the Color?  " +t;
  //change colors of cards
  for (var j=0; j<cards.length; j++)
  {
    cards[j].style.display="none";
  }
  for (var i = 0; i < hardcards.length; i++) {
      hardcards[i].style.opacity = 1;
      if (colors[i]) {
          hardcards[i].style.display = "block"
          hardcards[i].style.backgroundColor = colors[i];
      } else {
          hardcards[i].style.display = "none";
      }
  }
  body.style.backgroundColor = "#232323";
  footer.style.display="none";
}

resetButton.addEventListener("click", function() {
    if (mode == 1)
      reset();
    else if (mode == 2)
        hardreset();
    else if (mode == 3)
    {
      nightreset();
      t=5;
      countdown();
    }
})

night_button.addEventListener("click", function(){
  mode=3;
  nightinitCards();
  nightreset();
  t=5;
  countdown();
})

hard_button.addEventListener("click", function(){
    mode =2;
    hardinitCards();
    hardreset();
})

easy_button.addEventListener("click", function(){
    mode = 1;
    initCards();
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

function hardchangeColors(color){
  for (var i=0; i<hardcards.length; i++){
    hardcards[i].style.opacity = 1;
    hardcards[i].style.backgroundColor = color;
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
