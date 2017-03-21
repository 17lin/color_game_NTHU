window.onload = function() {
    init();
};

var difficult = 0;
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
var timer;
var sec;
var secp;
startday = new Date();
clockStart = startday.getTime();

function init() {
    initCards();
    reset();
}

function difficult0(){
    if(difficult !== 0){
      difficult = 0;
      numCards = 3;
      changefontcolor();
      init();
    }
}

function difficult1(){
    if(difficult !== 1){
      difficult = 1;
      numCards = 6;
      changefontcolor();
      init();
    }
}

function difficult2(){
    if(difficult !== 2){
      difficult = 2;
      numCards = 6;
      sec = setInterval(tick, 1000);
      secp = sec;
      timer = secp + 5 - sec;
      changefontcolor();
      init();
    }
}

function changefontcolor(){
    if(difficult == 0){
      document.getElementById("easy").style.color="blue";
      document.getElementById("hard").style.color="black";
      document.getElementById("nightmare").style.color="black";
    }
  else if(difficult == 1){
      document.getElementById("easy").style.color="black";
      document.getElementById("hard").style.color="blue";
      document.getElementById("nightmare").style.color="black";
  }
  else if(difficult == 2){
      document.getElementById("easy").style.color="black";
      document.getElementById("hard").style.color="black";
      document.getElementById("nightmare").style.color="blue";
  }
}

function tick() {
console.log(new Date().getSeconds());
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
    //if(difficult != 2)
    messageDisplay.textContent = "What's the Color?";
    /*if(difficult == 2){
      getSecs()
      messageDisplay.textContent = "What's the Color?"+mySecs1; //將倒數時間顯示在頁面空隔中
      window.setTimeout('getSecs()',1000); //每1秒重新執行一次
    }*/
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

/*function initStopwatch()
{
var myTime = new Date();
var timeNow = myTime.getTime();
var timeDiff = timeNow - clockStart; //現在的時間和起始的時間相減得到已經過的時間
this.diffSecs = timeDiff/1000; //除以1000就是秒
return(this.diffSecs); //將差異秒數回傳給getSecs函數
}
function getSecs()
{
var mySecs = initStopwatch();
var mySecs1 = ""+mySecs; //將數字變成文字
mySecs1= 5 - eval(mySecs1.substring(0,mySecs1.indexOf("."))) + "秒"; //算出倒數的時間
//messageDisplay.textContent = "What's the Color?"+mySecs1; //將倒數時間顯示在頁面空隔中
//window.setTimeout('getSecs()',1000); //每1秒重新執行一次
}*/

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
