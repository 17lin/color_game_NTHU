window.onload = function() {
    init();
};

var numCards = 3;
var mode = 0;
var count = 5;
var played = false;
var counter1,counter2;
var blinker = false;
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
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var nightmareButton = document.querySelector("#nightmare");

function init() {
    initCards();
    reset();
}

function initCards() {
    for (var i = 0; i < cards.length; i++) {
        //add click listeners to cards
        cards[i].addEventListener("click", function() {
            played =true ;
            if (gameOver)
            return;
            //grab color of clicked card
            var clickedColor = this.style.backgroundColor;
            // alert(this.style.backgroundColor);
            //compare color to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetButton.style.display ="block";
                resetDisplay.textContent = "Play Again"
                changeColors("#FFF");
                clearInterval(counter1);
                clearInterval(counter2);
                body.style.backgroundColor = clickedColor;
                gameOver = true;
            } else {
                this.style.opacity = 0;
                if(mode==2)
                messageDisplay.textContent = "Try Again " + count;
                else
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function reset() {
    clearInterval(counter1); 
    clearInterval(counter2);  
    resetButton.style.display ="block";
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

function hardReset() {
    clearInterval(counter1); 
    clearInterval(counter2); 
    resetButton.style.display ="block";
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

function nightReset() {
    clearInterval(counter1); 
    clearInterval(counter2); 
    gameOver = false;
    count = 5 ;
    played = false ;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetButton.style.display ="none";
    messageDisplay.textContent = "What's the Color? " + count;
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
    counter1=setInterval(timer, 1000);
}

resetButton.addEventListener("click", function() { 
    count = 5;
    if(mode==2)
    nightReset();
    else
    reset();
})

easyButton.addEventListener("click", function() {
     if(mode!=0)
     {
        mode = 0;
        easyButton.className ="selected";
        hardButton.className ="normal"; 
        nightmareButton.className ="normal";
        numCards = 3;
        reset();         
     }   
})

hardButton.addEventListener("click", function() {
     if(mode!=1)
     {
        mode = 1;
        easyButton.className ="normal";
        hardButton.className ="selected";
        nightmareButton.className ="normal"; 
        numCards = 6;
        hardReset();         
     } 
})

nightmareButton.addEventListener("click", function() {
     if(mode!=2)
     {
        mode = 2;
        easyButton.className ="normal";
        hardButton.className ="normal";
        nightmareButton.className ="selected"; 
        numCards = 6;
        nightReset();         
     } 
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
  if(gameOver)
  {
      clearInterval(counter1); 
      return;
  }
  blinker = true;
  counter2=setInterval(blink, 100);
  count=count-1;
  if (count <= 0)
  {  
     clearInterval(counter1); 
     clearInterval(counter2);  
     changeColors("#FFF");
     messageDisplay.textContent = "TIMEOUT! ";
     resetDisplay.textContent = "Play Again"
     gameOver=true;
     resetButton.style.display ="block";
     body.style.backgroundColor = pickedColor;
     return;
  }

  if(!played)
  { 
    messageDisplay.textContent = "What's the Color? " + count;

  }
  else{  
  messageDisplay.textContent = "Try Again " + count;
  }
}

function blink() {
  if(blinker){  
  body.style.backgroundColor ="#FFF";
  blinker = false;
  }
  else{
  body.style.backgroundColor = "#232323";
  clearInterval(counter2);
  }
}
