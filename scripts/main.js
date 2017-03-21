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
var counterDisplay = document.getElementById("count");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var easy =   document.getElementById("easy");
var hard =   document.getElementById("hard");
var night =  document.getElementById("night");
var nightmode;
var counter;
var countdownnumber = 5;
var check = 0;
var blink;

function init() {
    initCards();
    reset();
}

// function nightinit() {
//   //  initCards();
//    nightreset();
// }

function initCards() {
    for (var i = 0; i < cards.length; i++) {
        //add click listeners to cards
        cards[i].addEventListener("click", function() {
            if (gameOver)
                return;
            //grab color of clicked card
            counterDisplay.textContent = " ";
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
    counterDisplay.textContent = " ";
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

// function nightreset() {
//     gameOver = false;
//     colors = generateRandomColors(numCards);
//     //pick a new random color from array
//     pickedColor = pickColor();
//     //change colorDisplay to match picked Color
//     counterDisplay.textContent = counter;
//     colorDisplay.textContent = pickedColor;
//     resetDisplay.textContent = "New Color"
//     messageDisplay.textContent = "What's the Color?";
//     //change colors of cards
//     counter = setInterval(function(){
//     if(counter>=1){
//       counterDisplay.textContent = counter;
//       counter--;
//     }else{
//       messageDisplay.textContent = "TIMEOUT!"
//       changeColors("#FFF");
//       counterDisplay.textContent = " ";
//       clearInterval(counter);
//     }
//     },1000);
//
//     for (var i = 0; i < cards.length; i++) {
//         cards[i].style.opacity = 1;
//         if (colors[i]) {
//             cards[i].style.display = "block"
//             cards[i].style.backgroundColor = colors[i];
//         } else {
//             cards[i].style.display = "none";
//         }
//     }
//     body.style.backgroundColor = "#232323";
// }




resetButton.addEventListener("click", function() {
    init();
    if(check == 0){
    clearInterval(counter);
    counterDisplay.textContent="";
    }
    // counter = 2000;
    else{
      nightfunction();
    }
})

function easyfunction(){
  numCards = 3;
  check = 0;
  clearInterval(counter);
  // counter = 2000;
  counterDisplay.textContent= "none";
  // clearInterval(counter);
  init();
  easy.style.backgroundColor = "green";
  hard.style.backgroundColor = "white";
  night.style.backgroundColor = "white";

}

function hardfunction(){
  numCards = 6;
  check = 0;
  // counter = 2000;
  counterDisplay.textContent= "none";
  clearInterval(counter);
  init();
  easy.style.backgroundColor = "white";
  hard.style.backgroundColor = "red";
  night.style.backgroundColor = "white";
}

function nightfunction(){
  numCards = 6;
  countdownnumber = 5;
  check = 1;
  clearInterval(counter);
  // counter = 10;
  init();
  easy.style.backgroundColor = "white";
  hard.style.backgroundColor = "white";
  night.style.backgroundColor = "gray";
  // function initial(){
  //   counterDisplay.innerHTML=x;
  //   x--;
  //   countdownid=window.setInterval(countdownfunc,1000);
  // }
  // function countdownfunc(){
  //   counterDisplay.innerHTML= x;
  //   if (x==0){
  //     clearInterval(countdownid);
  //   }
  //   x--;
  // }
 counterDisplay.textContent = countdownnumber ;
 resetButton.style.display = "none";

counter=setInterval(function(){
 if(countdownnumber>1&&gameOver==false){
   body.style.backgroundColor = "gray";
   if(countdownnumber%2){
    body.style.backgroundColor = "#232323";
  }else{
    body.style.backgroundColor = "gray";
  }
   countdownnumber--;
   counterDisplay.textContent = countdownnumber;
 }else if(countdownnumber<=1){
   messageDisplay.textContent = "TIMEOUT!"
   changeColors("#FFF");
   counterDisplay.textContent =" ";
   resetButton.style.display="block";
   body.style.backgroundColor = pickedColor;
 }else{
   resetButton.style.display="block";
 }
 },1000);

 // clearInterval(counter);
}

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
