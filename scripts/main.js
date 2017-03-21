window.onload = function() {
    init();
};

var numCards = 6;
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
var Mode_button=document.querySelectorAll(".mode_select");
var count=5;
var counterDisplay = document.querySelector("#counter");
var counter;
var mode=1;//simple:1 hard:2 nightmare:3
var timeout=false;
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
                messageDisplay.textContent = "Correct!";
                resetDisplay.textContent = "Play Again"
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                counterDisplay.textContent=" ";
                resetButton.style.display="block";
                gameOver = true;
            } else if(timeout===true){

            }else{
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
    for(var i=0; i<Mode_button.length; i++){
       Mode_button[i].addEventListener("click", function(){
          if(this===Mode_button[0]){
            mode=1;
            this.style.backgroundColor= "rgb(252,73,124)";
            this.style.color="white";
            Mode_button[1].style.backgroundColor="white";
            Mode_button[2].style.backgroundColor="white";
            Mode_button[1].style.color= "rgb(252,73,124)";
            Mode_button[2].style.color= "rgb(252,73,124)";
            reset();
          }else if(this==Mode_button[1]){
            mode=2;
            this.style.backgroundColor= "rgb(252,73,124)";
            this.style.color="white";
            Mode_button[0].style.backgroundColor="white";
            Mode_button[2].style.backgroundColor="white";
            Mode_button[0].style.color= "rgb(252,73,124)";
            Mode_button[2].style.color= "rgb(252,73,124)";
            reset();
          }else if(this==Mode_button[2]){
            mode=3;
            this.style.backgroundColor= "rgb(252,73,124)";
            this.style.color="white";
            Mode_button[0].style.backgroundColor="white";
            Mode_button[1].style.backgroundColor="white";
            Mode_button[0].style.color= "rgb(252,73,124)";
            Mode_button[1].style.color= "rgb(252,73,124)";
            reset();
          }
          modeDisplay();
       });
    }
}

function reset() {
    gameOver = false;
    timeout=false;
    count=5;
    if(mode===1)
      colors = generateRandomColors(3);
    else
      colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    for (var i = 0; i < Mode_button.length; i++) {
      if(i==mode-1){
        Mode_button[i].style.backgroundColor= "rgb(252,73,124)";
        Mode_button[i].style.color="white";
      }else{
        Mode_button[i].style.color= "rgb(252,73,124)";
        Mode_button[i].style.backgroundColor="white";
      }

    }
    //change colorDisplay to match picked Color

    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?";
    if(mode===3){
      counterDisplay.textContent=count;
      resetButton.style.display="none";
      counter=setInterval(function(){

                  if(count>1 && gameOver==false){
                    setTimeout(function(){
                      body.style.display = (body.style.display == 'none' ? '' : 'none');
                    },10);
                    body.style.display = (body.style.display == 'none' ? '' : 'none');
                    count--;
                    counterDisplay.textContent=count;
                  }else if(count<=1){
                    timeout=true;
                    messageDisplay.textContent="TIMEOUT!";
                    body.style.backgroundColor=pickedColor;
                    changeColors("#FFF");
                    counterDisplay.textContent=" ";
                    resetButton.style.display="block";
                  }
                }, 1000);
    }else {
      counterDisplay.textContent=" ";
      clearInterval(counter);
    }

    //change colors of cards
    for (var i = 0; i < cards.length; i++) {

        if (colors[i]) {
            cards[i].style.display = "block";
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }

    body.style.backgroundColor = "#232323";
}

resetButton.addEventListener("click", function() {

    clearInterval(counter);
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
