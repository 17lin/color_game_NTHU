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
var resetDisplay = document.querySelector("#reset span");
var Ez_Button= document.querySelector("#Ez_btn");
var Hrd_Button= document.querySelector("#hrd_btn");
var NM_Button= document.querySelector("#NM_btn");
var second=6;
var bool=false;
var bool_1=false;
var id;
var mode=1;

function init() {
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
              if(mode==3)
               bool=true;
                messageDisplay.textContent = "Correct!";
                resetDisplay.textContent = "Play Again"
                document.getElementById("reset").style.display="block";
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
                if(mode==3)
                messageDisplay.textContent = "Try Again "+second;
            }
        });
    }
}

  Ez_Button.addEventListener("click", function mode_1() {
    Ez_Button.style.backgroundColor="#9999FF";
    Hrd_Button.style.backgroundColor="white";
    NM_Button.style.backgroundColor="white";

    numCards = 3;
    reset();
    mode=1;

  });

  Hrd_Button.addEventListener("click", function mode_2() {
    Ez_Button.style.backgroundColor="white";
    Hrd_Button.style.backgroundColor="#9955FF";
    NM_Button.style.backgroundColor="white";
    if(bool_1==true)
   {
       document.getElementById("reset").style.display="block";
     clearInterval(id);
     }
    numCards = 6;
    reset();
    mode=2;
  });

  NM_Button.addEventListener("click", function mode_3() {
    Ez_Button.style.backgroundColor="white";
    Hrd_Button.style.backgroundColor="white";
    NM_Button.style.backgroundColor="#FFFF77";
    mode=3;
   if(bool_1==true)
  {
    clearInterval(id);
    }
    second=6;
    numCards = 6;
    reset();
    id=setInterval(count,1000);
    bool_1=true;
  //id=setInterval(count,1000);
    document.getElementById("reset").style.display="none";
  });

function count(){
    second--;
    if(bool===false){
    if(second>0)
    messageDisplay.textContent = "What's the Color? "+second;
    else if(second<=0){
        messageDisplay.textContent = "Time Out";
       document.getElementById("reset").style.display="block";
        clearInterval(id);
        changeColors("#FFF");
        body.style.backgroundColor=pickedColor;
    }

  }
  else {
      clearInterval(id);
      bool=false;
  }
}
function reset() {
    gameOver = false;
    colors = generateRandomColors(numCards);
    //pick a new random color from arra
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
  if(mode===3)
    {
      if(bool_1==true)
     {
       clearInterval(id);
       }
       second=6;
       numCards = 6;
       reset();
       id=setInterval(count,1000);
       bool_1=true;
     //id=setInterval(count,1000);
       document.getElementById("reset").style.display="none";
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
