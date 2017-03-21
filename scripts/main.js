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

var modeButtons = document.querySelectorAll(".mode");
var easyButton = document.querySelector(".mode");
var hardButton = document.querySelector(".mode");


function init() {
    initCards();
    Mode();
    reset();
}

function night()
{
    callme5();
    
    callme4();
    

    callme3();
    
    callme2();
    

    callme1();
    
    timeout();
    
}

function callme5()
{
    messageDisplay.textContent = "What's the color? 5"
    document.getElementById('reset').style.visibility = 'hidden'
}
function callme4()
{
    messageDisplay.textContent = "What's the color? 4"
    document.getElementById('reset').style.visibility = 'hidden'
}

function callme3()
{
    messageDisplay.textContent = "What's the color? 3"
    document.getElementById('reset').style.visibility = 'hidden'
}

function callme2()
{
    messageDisplay.textContent = "What's the color? 2"
   document.getElementById('reset').style.visibility = 'hidden'
}

function callme1()
{
    messageDisplay.textContent = "What's the color? 1"
    document.getElementById('reset').style.visibility = 'hidden'
}
function timeout()
{
    messageDisplay.textContent = "TIME OUT !"
    changeColors("#FFF");
    body.style.backgroundColor = pickedColor;
    gameOver = true;
    document.getElementById('reset').style.visibility = 'visible'

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









function Mode()
{
    for(var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            for (var i = 0; i < modeButtons.length; i++) {
                modeButtons[i].classList.remove("selected");
            }
            this.classList.add("selected");
            if (this.textContent === "Easy") {
                numCards = 3;
               
            }
            else {
                if(this.textContent === "Nightmare")
                {    
                    timeoutId5 = setTimeout("callme5()",0);
                    timeoutId4 = setTimeout("callme4()",1000);
                    timeoutId3 = setTimeout("callme3()",2000);
                    timeoutId2 = setTimeout("callme2()",3000);
                    timeoutId1 = setTimeout("callme1()",4000);
                    timeoutId0 = setTimeout("timeout()",5000);
                        
                }
                
                numCards = 6;
            }
            reset();
        });
    }
}







function reset() {
    gameOver = false;

    for(var i = 0; i < modeButtons.length; i++)
    {
        if(modeButtons[i].textContent==="Nightmare" && modeButtons[i] === 1)
        {
            timeoutId5 = setTimeout("callme5()",0);
                    timeoutId4 = setTimeout("callme4()",1000);
                    timeoutId3 = setTimeout("callme3()",2000);
                    timeoutId2 = setTimeout("callme2()",3000);
                    timeoutId1 = setTimeout("callme1()",4000);
                    timeoutId0 = setTimeout("timeout()",5000);

        }
    }
    

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
