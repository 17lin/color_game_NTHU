window.onload = function() {
    init();
};

var numCards;
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
var easyBtn = document.querySelector("#easy");
var hardBtn = document.querySelector("#hard");
var nightmareBtn = document.querySelector("#nightmare");
var state = 1;


function init() {
  if(state === 1){initCardsEasy();}
  else if(state === 2){initCardsHard();}
  else if(state === 3){initCardsNightmare();}
  reset();
}



hardBtn.addEventListener('click', function(){
  this.style.background = "blue";
  this.style.color = "white";
  easyBtn.style.background = "white";
  easyBtn.style.color = "black";
  nightmareBtn.style.background = "white";
  nightmareBtn.style.color = "black";
});


easyBtn.addEventListener('click', function(){
  this.style.background = "blue";
  this.style.color = "white";
  hardBtn.style.background = "white";
  hardBtn.style.color = "black";
  nightmareBtn.style.background = "white";
  nightmareBtn.style.color = "black";
});


nightmareBtn.addEventListener('click', function(){
  this.style.background = "blue";
  this.style.color = "white";
  easyBtn.style.background = "white";
  easyBtn.style.color = "black";
  hardBtn.style.background = "white";
  hardBtn.style.color = "black";
});



function initCardsEasy() {


  var count = document.querySelector('#count');
  count.style.fontSize = "0px";

  hardBtn.addEventListener('click', function(){
    state = 2;
    init();
  });

  nightmareBtn.addEventListener('click', function(){
    state = 3;
    init();
  });

  var count = document.querySelector('#count');

    numCards = 3;
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

function initCardsHard() {



  var count = document.querySelector('#count');
  count.style.fontSize = "0px";
  easyBtn.addEventListener('click', function(){
    state = 1;
    init();
  });

  nightmareBtn.addEventListener('click', function(){
    state = 3;
    init();
  });

    numCards = 6;
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

function initCardsNightmare() {

  var footer = document.querySelector("button");
  footer.className = "hide";
  easyBtn.addEventListener('click', function(){
    state = 1;
    init();
  });

  hardBtn.addEventListener('click', function(){
    state = 2;
    init();
  });

    var count = document.querySelector('#count');
    count.style.fontSize = "30px";
    clearInterval(myvar);
    count.textContent = 5;
    var myvar = setInterval(myfunc, 1000);
    var countNum = 5;
    function myfunc(){

      countNum--;
      count.textContent = countNum;
      if(countNum === 0){
        clearInterval(myvar);
        clearInterval(countNum);
        messageDisplay.textContent = "TimeOut!";
        changeColors("#FFF");
        body.style.backgroundColor = pickedColor;
        return;
      }
    }

    numCards = 6;
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
                clearInterval(myvar);
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
