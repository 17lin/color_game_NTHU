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
      setTimeout(countdownfunc,5000);
      setTimeout(myTimeout1, 0);
      function myTimeout1() {
      messageDisplay.textContent = "What's the Color? 5";
      }
      setTimeout(myTimeout2, 1000);
      function myTimeout2() {
      messageDisplay.textContent = "What's the Color? 4";
      }
      setTimeout(myTimeout3, 2000);
      function myTimeout3() {
      messageDisplay.textContent = "What's the Color? 3";
      }
      setTimeout(myTimeout4, 3000);
      function myTimeout4() {
      messageDisplay.textContent = "What's the Color? 2";
      }
      setTimeout(myTimeout5, 4000);
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
        gameOver=true;
        body.style.backgroundColor = pickedColor;
        messageDisplay.textContent = "TIME OUT!";
        resetDisplay.textContent = "Play Again"
        for (var i = 0; i < cards.length; i++) {
          cards[i].stylestyle.opacity = 0;
        }
      }
    }
    else{
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
    mode=2;
    numCards=6;
    reset();
})
easyButton.addEventListener("click", function() {
    mode=1;
    numCards=3;
    reset();
})
nightmareButton.addEventListener("click", function() {
    mode=3;
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
    setTimeout(countdownfunc,5000);
    setTimeout(myTimeout1, 0);
    function myTimeout1() {
    messageDisplay.textContent = "What's the Color? 5";
    }
    setTimeout(myTimeout2, 1000);
    function myTimeout2() {
    messageDisplay.textContent = "What's the Color? 4";
    }
    setTimeout(myTimeout3, 2000);
    function myTimeout3() {
    messageDisplay.textContent = "What's the Color? 3";
    }
    setTimeout(myTimeout4, 3000);
    function myTimeout4() {
    messageDisplay.textContent = "What's the Color? 2";
    }
    setTimeout(myTimeout5, 4000);
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
