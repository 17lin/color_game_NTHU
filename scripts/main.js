window.onload = function() {
    init();
};

var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;

var mode_flag = false;
var time_flag = true;
var timecount = 5;
var easyButton = document.getElementById('easy');
var hardButton = document.getElementById('hard');
var timeDisplay = document.getElementById('timer');


var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var card_container = document.querySelector('#card-container');

setInterval(timer,1000);
function init() {
    
    timecount = 5;
    time_flag = true;
    timeDisplay.textContent = " "+timecount;
    initCards();
    reset();
}

function timer(){
    var d = new Date();
    if(time_flag == false){
        timecount = 5;
    }else{
        if(gameOver != true){
    
            timecount--;
            timeDisplay.textContent = "  "+timecount;
            if(timecount == 0){
                gameOver = true;
                time_flag = false;
                messageDisplay.textContent = "TimeOut!";
                resetDisplay.textContent = "Play Again"
                timeDisplay.textContent = " ";
                changeColors("#FFF");
                body.style.backgroundColor = pickedColor;
            }
        }
    }
}

function addCards(num){
    
    for(var i=0; i<num; i++){
        var node = document.createElement('div');
        node.setAttribute('class','card');
        card_container.appendChild(node);
    }
    cards = document.querySelectorAll('.card');
}

function removeCards(){
    while(card_container.firstChild){card_container.removeChild(card_container.firstChild);}
    cards = document.querySelectorAll('.card');
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
                timeDisplay.textContent = " ";
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
    timecount = 5;
    timeDisplay.textContent = " "+timecount;
    time_flag = true;
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

/*    Button   */


easyButton.addEventListener('click',function(){
    if(mode_flag == true){
        removeCards();
        addCards(3);
        numCards = 3;
        init();
        mode_flag = false;
    }
    this.style.backgroundColor = "steelblue";
    this.style.color = "white";
    hardButton.style.backgroundColor = "white";
    hardButton.style.color = "black";
});





hardButton.addEventListener('click',function(){
    if(mode_flag == false){
        removeCards();
        addCards(6);
        numCards = 6;
        init();
        mode_flag = true;

    }
    this.style.backgroundColor = "steelblue";
    this.style.color = "white";
    easyButton.style.backgroundColor = "white";
    easyButton.style.color = "black";
});
