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
var easyModeBtn = document.querySelector("#easy");
var hardModeBtn = document.querySelector("#hard");
var nightMareModeBtn = document.querySelector("#nightMare");
var count = 5;
var state = false;
var nightState = false;

function init() {
    easyModeBtn.style.backgroundColor = "steelblue";
    initCards();
    resetEasy();
}

hardModeBtn.addEventListener("click", function(){
    hardModeBtn.style.backgroundColor = "steelblue";
    easyModeBtn.style.backgroundColor = "white";
    nightMareModeBtn.style.backgroundColor = "white";
    nightState = false;
    initCards();
    resetEasy();
    body.style.backgroundColor = "#A0A";
})


easyModeBtn.addEventListener("click", function(){
    hardModeBtn.style.backgroundColor = "white";
    easyModeBtn.style.backgroundColor = "steelblue";
    nightMareModeBtn.style.backgroundColor = "white";
    nightState = false;
    initCards();
    resetEasy();
})

nightMareModeBtn.addEventListener("click", function(){
    hardModeBtn.style.backgroundColor = "white";
    easyModeBtn.style.backgroundColor = "white";
    nightMareModeBtn.style.backgroundColor = "steelblue";
    count = 5;
    state = false;
    nightState = true;
    nightInitCards();
    nightResetEasy();
    var id = setInterval(function(){
        var i= 0
        var iid = setInterval(function(){
            if(i == 0) {
                if(gameOver == true)
                    body.style.backgroundColor = "pickedColor";
                else
                    body.style.backgroundColor = "#white";
                clearInterval(iid);
            } else {
                if(gameOver == true)
                    body.style.backgroundColor = "pickedColor";
                else
                    body.style.backgroundColor = "#232323";
                clearInterval(iid);
            }
            i = i + 1;
        }, 100);
        count = count - 1;
        if(state === false){
            messageDisplay.innerHTML = "What's the Color?  " + count;
        } else if(state === true && gameOver != true){
            messageDisplay.innerHTML = "Try Again!  " + count;
        }
        if(count < 0){
            gameOver = true;
            messageDisplay.innerHTML = "Game Over!";
            resetDisplay.innerHTML = "Time Out!";
            changeColors("#FFF");
            clearInterval(id);
            body.style.backgroundColor = pickedColor;
        } else if (gameOver == true) {
            clearInterval(id);
            body.style.backgroundColor = pickedColor;
        }
        easyModeBtn.addEventListener("click", function(){
            clearInterval(id);
        })
        hardModeBtn.addEventListener("click", function(){
            clearInterval(id);
        })
    }, 1000);
})

function nightInitCards(){
  for (var i = 0; i < cards.length; i++) {
      //add click listeners to cards
      cards[i].addEventListener("click", function() {
          state = true;
          if (gameOver)
              return;
          //grab color of clicked card
          var clickedColor = this.style.backgroundColor;
          // alert(this.style.backgroundColor);
          //compare color to pickedColor
          if (clickedColor === pickedColor) {
              messageDisplay.innerHTML = "Correct!";
              resetDisplay.innerHTML = "Play Again";
              changeColors("#FFF");
              body.style.backgroundColor = clickedColor;
              gameOver = true;
          } else {
              this.style.opacity = 0;
              messageDisplay.innerHTML = "Try Again!  " + count;
          }
      });
  }
}


function nightResetEasy() {
    gameOver = false;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.innerHTML = "What's the Color?  " + count;
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


function initCards() {
    for (var i = 0; i < cards.length; i++) {
        //add click listeners to cards
        cards[i].addEventListener("click", function() {
            state = true;
            if (gameOver)
                return;
            //grab color of clicked card
            var clickedColor = this.style.backgroundColor;
            // alert(this.style.backgroundColor);
            //compare color to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.innerHTML = "Correct!";
                resetDisplay.innerHTML = "Play Again";
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
            } else {
                this.style.opacity = 0;
                messageDisplay.innerHTML = "Try Again!";
            }
        });
    }
}

function resetEasy() {
    gameOver = false;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.innerHTML = "What's the Color?";
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
    if(nightState == false) {
        resetEasy();
    } else if(count >= 0) {
        nightResetEasy();
    } else if(gameOver == true) {
        init();
        nightMareModeBtn.style.backgroundColor = "white";
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
