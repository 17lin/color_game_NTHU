window.onload = function() {
    init();
};

var numCards=3;
var gameMod = 0
var gameOver = false;
var colors = [];
var pickedColor;
var timeOut = false;
var currentMode;
var countDown = document.getElementById("countDown");

var time;
var count = 5;
var timeOut = 0;

var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var easy = document.querySelector('#mode_easy');
var hard = document.querySelector('#mode_hard');
var nightmare = document.querySelector('#mode_nightmare')
var on;
var off;

function init() {
  easy.style.backgroundColor = "#AAAAAA";
  easy.addEventListener("click", changeEasy);
  hard.addEventListener("click", changeHard);
  nightmare.addEventListener("click", changeNightmare);
    initCards();
    reset();
}

function countDown(){
  time.textContent=count;
  count--;

}

function changeEasy(){
    if(gameMod !== 0){
    	easy.style.backgroundColor = "#FFFFFF";
    	hard.style.backgroundColor = "#FFFFFF";
      nightmare.style.backgroundColor = "#FFFFFF"
    	this.style.backgroundColor = "#AAAAAA";
      body.classList.remove("blink");
    	resetButton.style.display = 'block';

      clearInterval(on);
    	numCards = 3;
		  gameMod = 0;

    	reset();
    }
}

function changeHard(){
    if(gameMod !== 1){
	    easy.style.backgroundColor = "#FFFFFF";
	    hard.style.backgroundColor = "#FFFFFF";
      nightmare.style.backgroundColor = "#FFFFFF"
	    this.style.backgroundColor = "#AAAAAA";
body.classList.remove("blink");
	    resetButton.style.display = 'block';
      clearInterval(on);
	    numCards = 6;
	    gameMod = 1;


	    reset();
	}
}

function changeNightmare(){
    if(gameMod !== 2){
	    easy.style.backgroundColor = "#FFFFFF";
	    hard.style.backgroundColor = "#FFFFFF";
      nightmare.style.backgroundColor = "#FFFFFF"
	    this.style.backgroundColor = "#AAAAAA";
	    resetButton.style.display = 'none';
      count=5;
      timeout=0;
      countDown.style.display="inline";
      countDown.textContent = "5";
	    numCards = 6;
	    gameMod = 2;
	    reset();
	}
}




function timeCount(){
  countDown.textContent = count.toString();
  body.classList.add("blink");
  if(count>0) count=count-1;

  else{
    timeOut=1;
    countDown.textContent="";
    clearTimeout(time);
    resetButton.style.display = "block";
    body.style.backgroundColor=pickedColor;
    messageDisplay.textContent ="Time out!!";
    changeColors("#FFF");
    body.classList.remove("blink");
    return;
  }
  time = setTimeout(function(){timeCount()}, 1000);
}

function startCount(){
  if(!timeOut){
    timeCount();
  }
}

function initCards() {
    countDown.style.display = "none";
    body.classList.remove("blink");
    if(gameMod===2){
      for (var i = 0; i < cards.length; i++) {
          //add click listeners to cards
          countDown.style.display = "none";
          cards[i].addEventListener("click", function() {
              if (gameOver)
                  return;
              //grab color of clicked card
              var clickedColor = this.style.backgroundColor;
              // alert(this.style.backgroundColor);
              //compare color to pickedColor
              if (clickedColor === pickedColor) {

                  countDown.style.display = "none";
                  resetButton.style.display = "block";
                  messageDisplay.textContent = "Correct!";
                  resetDisplay.textContent = "Play Again"
                  clearTimeout(time);
                  body.classList.remove("blink");
                  changeColors("#FFF");
                  body.style.backgroundColor = clickedColor;
                  gameOver = true;
              } else {
                  this.style.opacity = 0;
                  messageDisplay.textContent = "Try Again"
              }
          });
      }
    }else{
      for (var i = 0; i < cards.length; i++) {
          cards[i].addEventListener("click", function() {
              if (gameOver)
                  return;
              //grab color of clicked card
              var clickedColor = this.style.backgroundColor;
              // alert(this.style.backgroundColor);
              //compare color to pickedColor
              if (clickedColor === pickedColor) {
                clearTimeout(time);
                countDown.style.display = "none";
                body.classList.remove("blink");
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

    count=5;
    timeOut =0;
    if(gameMod===2){
      startCount();
      countDown.style.display="inline";
      numCards = 6;
    }

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
