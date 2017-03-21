window.onload = function() {
    init();
};

var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var mode= 1;
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
var arr = [];
var arr1 = [];

function init() {
    initCards();
    reset();
}
/*function blink1()
{
  body.style.backgroundColor＝"white";
}
function blink2()
{
  body.style.backgroundColor＝"black";
}*/
/*function blinkOn(){
  body.style.bgcolor = "000000"
  nTimes++
  JSCTimeOutID = window.setTimeout("blinkOff()",500);
}
function blinkOff(){
body.style.bgcolor = "FFFFFF"
if (nTimes < 5)
JSCTimeOutID = window.setTimeout("blinkOn()",500);
else theWin.history.go(0)
}
function blinkit(aWin)
{
  nTimes = 0
  theWin = aWin
  JSCTimeOutID = window.setTimeout("blinkOn()",500);
}*/
function initCards() {
    if(mode!==3)
    {
      resetButton.style.display="block";
    }
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
                if(mode===3)
                {
                  resetButton.style.display="block";
                  for(var i=0;i<arr.length;i++)
                  {
                    clearInterval(arr[i]);
                  }
                  for(var i=0;i<arr1.length;i++)
                  {
                    clearInterval(arr1[i]);
                  }
                }
                gameOver = true;
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset() {
    if(mode===3)
    {
      resetButton.style.display="none";
      for(var i=1;i<arr.length;i++)
      {
        clearInterval(arr[i]);
      }
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
      var countdownnumber=5;
      arr.push(setTimeout(countdownfunc,5000));
      arr1.push(setTimeout(myblink1, 0));
      function myblink1(){
        body.style.backgroundColor="#232323";
      }
      arr1.push(setTimeout(myblink2, 500));
      function myblink2(){
        body.style.backgroundColor="#DDDDDD";
      }
      arr1.push(setTimeout(myblink3, 1000));
      function myblink3(){
        body.style.backgroundColor="#232323";
      }
      arr1.push(setTimeout(myblink4, 1500));
      function myblink4(){
        body.style.backgroundColor="#DDDDDD";
      }
      arr1.push(setTimeout(myblink5, 2000));
      function myblink5(){
        body.style.backgroundColor="#232323";
      }
      arr1.push(setTimeout(myblink6, 2500));
      function myblink6(){
        body.style.backgroundColor="#DDDDDD";
      }
      arr1.push(setTimeout(myblink7, 3000));
      function myblink7(){
        body.style.backgroundColor="#232323";
      }
      arr1.push(setTimeout(myblink8, 3500));
      function myblink8(){
        body.style.backgroundColor="#DDDDDD";
      }
      arr1.push(setTimeout(myblink9, 4000));
      function myblink9(){
        body.style.backgroundColor="#232323";
      }
      arr1.push(setTimeout(myblink10, 4500));
      function myblink10(){
        body.style.backgroundColor="#DDDDDD";
      }
      /*arr1.push(setTimeout(myblink11, 5000));
      function myblink11(){
        body.style.backgroundColor="#232323";
      }*/
      arr.push(setTimeout(myTimeout1, 0));
      function myTimeout1() {
      messageDisplay.textContent = "What's the Color? 5";
      //setTimeout(blink1, 500);
      //setTimeout(blinkOn, 500);
      //blinkit(self);
      }
      arr.push(setTimeout(myTimeout2, 1000));
      function myTimeout2() {
      messageDisplay.textContent = "What's the Color? 4";
      }
      arr.push(setTimeout(myTimeout3, 2000));
      function myTimeout3() {
      messageDisplay.textContent = "What's the Color? 3";
      }
      arr.push(setTimeout(myTimeout4, 3000));
      function myTimeout4() {
      messageDisplay.textContent = "What's the Color? 2";
      }
      arr.push(setTimeout(myTimeout5, 4000));
      function myTimeout5() {
      messageDisplay.textContent = "What's the Color? 1";
      }
      /*var int_id = setInterval(count,1000);
      function count()
      {

        if(countdownnumber>0)
        {
          messageDisplay.textContent = "What's the Color?"+countdownnumber;
        }
        else {

        }
      }*/
      function countdownfunc(){
        /*clearInterval(int_id)*/
        resetButton.style.display="block";
        gameOver=true;
        changeColors("#FFF");
        body.style.backgroundColor = pickedColor;
        messageDisplay.textContent = "TIME OUT!";
        resetDisplay.textContent = "Play Again"
        for (var i = 0; i < cards.length; i++) {
          cards[i].stylestyle.opacity = 0;
        }
      }
    }
    else{
      resetButton.style.display="block";
      for(var i=1;i<arr.length;i++)
      {
        clearInterval(arr[i]);
      }
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
}

hardButton.addEventListener("click", function() {
  nightmareButton.style.backgroundColor="white";
  hardButton.style.backgroundColor="blue";
  easyButton.style.backgroundColor="white";
    mode=2;
    numCards=6;
    reset();
})
easyButton.addEventListener("click", function() {
  nightmareButton.style.backgroundColor="white";
  hardButton.style.backgroundColor="white";
  easyButton.style.backgroundColor="blue";
    mode=1;
    numCards=3;
    reset();
})
nightmareButton.addEventListener("click", function() {
    nightmareButton.style.backgroundColor="blue";
    hardButton.style.backgroundColor="white";
    easyButton.style.backgroundColor="white";
    mode=3;
    //setInterval(blinkOn,500);
    //setInterval(blink,500);
    resetButton.style.display="none";
    if(mode===3)
    {
      for(var i=1;i<arr.length;i++)
      {
        clearInterval(arr[i]);
      }
    }
    numCards=6;
    reset();

    /*var countdownid;
    function initial(){ countdownfunc(); }
    function countdownfunc(){
      var x=document.getElementById("countdown");
      x.innerHTML=countdownnumber;
      if (countdownnumber==0){
        alert("倒數結束");
        clearTimeout(countdownid);
      }else{
        countdownnumber--;
        if(countdownid){
          clearTimeout(countdownid);
        }
        countdownid=setTimeout(countdownfunc,1000);
      }
    }*/
    var countdownnumber=5;
    arr.push(setTimeout(countdownfunc,5000));
    arr.push(setTimeout(myTimeout1, 0));
    function myTimeout1() {
    messageDisplay.textContent = "What's the Color? 5";
    }
    arr.push(setTimeout(myTimeout2, 1000));
    function myTimeout2() {
    messageDisplay.textContent = "What's the Color? 4";
    }
    arr.push(setTimeout(myTimeout3, 2000));
    function myTimeout3() {
    messageDisplay.textContent = "What's the Color? 3";
    }
    arr.push(setTimeout(myTimeout4, 3000));
    function myTimeout4() {
    messageDisplay.textContent = "What's the Color? 2";
    }
    arr.push(setTimeout(myTimeout5, 4000));
    function myTimeout5() {
    messageDisplay.textContent = "What's the Color? 1";
    }
    /*var int_id = setInterval(count,1000);
    function count()
    {

      if(countdownnumber>0)
      {
        messageDisplay.textContent = "What's the Color?"+countdownnumber;
      }
      else {

      }
    }*/
    function countdownfunc(){
      /*clearInterval(int_id)*/
      resetButton.style.display="block";
      gameOver=true;
      body.style.backgroundColor = pickedColor;
      messageDisplay.textContent = "TIME OUT!";
      resetDisplay.textContent = "Play Again"
      for (var i = 0; i < cards.length; i++) {
        cards[i].stylestyle.opacity = 0;
      }
    }

})
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
