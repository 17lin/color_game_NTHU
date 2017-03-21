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
var selectEasyButton = document.querySelector("#selectEasy");
var selectHardButton = document.querySelector("#selectHard");
var selectNightmareButton = document.querySelector("#selectNightmare");
var timeCountText = document.querySelector("#timeCounter");
var timerDisplay = document.querySelector("#timer");
var countdown;
var timeCount = 5;
var state=0;

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
                clearInterval(countdown);
                timeCountText.innerHTML= "";
                resetButton.style.display = "block";
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
    timeCount=6;
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
    clearInterval(countdown);
    if(state == 1){
        miner();
        countdown = setInterval(miner, 1000);
    }
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

selectEasyButton.addEventListener("mouseover", function(){
    if(selectEasy.style.background == "white"){
    selectEasy.style.background = "steelblue";
    selectEasy.style.color = "white";
    }
});
selectHardButton.addEventListener("mouseover", function(){
    if(selectHard.style.background == "white"){
    selectHard.style.background = "steelblue";
    selectHard.style.color = "white";
    }
});
selectNightmareButton.addEventListener("mouseover", function(){
    if(selectNightmare.style.background == "white"){
    selectNightmare.style.background = "steelblue";
    selectNightmare.style.color = "white";
    }
});

selectEasyButton.addEventListener("mouseout", function(){
    if(selectEasy.style.background == "steelblue"){
    selectEasy.style.background = "white";
    selectEasy.style.color = "#484848";
    }
});
selectHardButton.addEventListener("mouseout", function(){
    if(selectHard.style.background == "steelblue"){
    selectHard.style.background = "white";
    selectHard.style.color = "#484848";
    }
});
selectNightmareButton.addEventListener("mouseout", function(){
    if(selectNightmare.style.background == "steelblue"){
    selectNightmare.style.background = "white";
    selectNightmare.style.color = "#484848";
    }
});



selectEasyButton.addEventListener("click", function(){
    resetButton.style.display = "block";

    selectEasy.style.background = "#dd2222";
    selectEasy.style.color = "white";

    selectHard.style.background = "white";
    selectHard.style.color = "#484848";
    
    selectNightmare.style.background = "white";
    selectNightmare.style.color = "#484848";

    timeCountText.innerHTML= "";
    numCards = 3;
    timeCount = 5;
    state=0;
    clearInterval(countdown);
    reset();
});

selectHardButton.addEventListener("click", function(){
    resetButton.style.display = "block";

    selectEasy.style.background = "white";
    selectEasy.style.color = "#484848";

    selectHard.style.background = "#dd2222";
    selectHard.style.color = "white";

    selectNightmare.style.background = "white";
    selectNightmare.style.color = "#484848";

    timeCountText.innerHTML= "";
    timeCount = 5;
    numCards = 6;
    state=0;
    clearInterval(countdown);
    reset();
});

selectNightmareButton.addEventListener("click", function(){
    resetButton.style.display = "none";

    selectEasy.style.background = "white";
    selectEasy.style.color = "#484848";

    selectHard.style.background = "white";
    selectHard.style.color = "#484848";

    selectNightmare.style.background = "#dd2222";
    selectNightmare.style.color = "white";

    clearInterval(countdown);
    numCards = 6;
    timeCount = 5;
    state=1;
    countdown = setInterval(miner, 1000);
    setInterval(blink, 1000);
    setInterval(blnkBack, 99);
    reset();
});

function miner(){
    if(timeCount>0){
        resetButton.style.display = "none";
        timeCount--;    
        timeCountText.innerHTML = timeCount;
    }
    else {
        messageDisplay.textContent = "Time Out!";
        timeCountText.innerHTML= "";
        resetButton.style.display = "block";
        resetDisplay.textContent = "Try Again"
        body.style.backgroundColor = pickedColor;
        gameOver = true;
        changeColors("#FFF");
    }

    console.log(timeCount);
}

function blnkBack(){
    if( gameOver != true)
    body.style.backgroundColor = "#232323";
};

function blink(){
    if(state==1 && gameOver != true){
        body.style.backgroundColor = "#ffffff";
    }

}