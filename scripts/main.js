window.onload = function () {
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
var easyGame = true;
var hardGame = false;
var nightmareGame = false;



function init() {
    
    barColor();
    /*numOfCards();*/
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

function barColor() {

    var barAction = document.getElementById('brand');
    var barAction2 = document.getElementById('brand2');
    var barAction3 = document.getElementById('brand3');

    barAction.addEventListener('mouseover', function (e) {
        if (!easyGame)
            barAction.style.color = "blue";
    }, false);
    barAction.addEventListener('mouseout', function (e) {
        if (!easyGame)
            barAction.style.color = "#484848";
    }, false);
    barAction.addEventListener('click', function (e) {
        barAction.style.backgroundColor = "blue";
        barAction.style.borderRadius = '1rem';
        barAction2.style.backgroundColor = "white";
        barAction3.style.backgroundColor = "white";
        barAction.style.color = "white";
        barAction3.style.color = "#484848";
        barAction2.style.color = "#484848";

        easyGame = true;
        hardGame = false;
        nightmareGame = false;
        numCards = 3;
        reset();
    }, false);


    barAction2.addEventListener('mouseover', function (e) {
        if (!hardGame)
            barAction2.style.color = "blue";
    }, false);
    barAction2.addEventListener('mouseout', function (e) {
        if (!hardGame)
            barAction2.style.color = "#484848";
    }, false);
    barAction2.addEventListener('click', function (e) {
        barAction2.style.backgroundColor = "blue";
        barAction2.style.borderRadius = '1rem';
        barAction.style.backgroundColor = "white";
        barAction3.style.backgroundColor = "white";
        barAction2.style.color = "white";
        barAction.style.color = "#484848";
        barAction3.style.color = "#484848";
        nightmareGame = false;
        easyGame = false;
        hardGame = true;
        numCards = 6;
        reset();
    }, false);

    barAction3.addEventListener('mouseover', function (e) {
        if (!nightmareGame)
           barAction3.style.color = "blue";
    }, false);
    barAction3.addEventListener('mouseout', function (e) {
        if (!nightmareGame)
            barAction3.style.color = "#484848";
    }, false);
    barAction3.addEventListener('click', function (e) {
        barAction3.style.backgroundColor = "blue";
        barAction3.style.borderRadius = '1rem';
        barAction.style.backgroundColor = "white";
        barAction2.style.backgroundColor = "white";
        barAction3.style.color = "white";
        barAction.style.color = "#484848";
        barAction2.style.color = "#484848";

        nightmareGame = true;
        easyGame = false;
        hardGame = false;
    }, false);

    if (easyGame) {
        barAction.style.backgroundColor = "blue";
        barAction.style.borderRadius = '1rem';
        barAction2.style.backgroundColor = "white";
        barAction3.style.backgroundColor = "white";
        barAction.style.color = "white";
        barAction3.style.color = "#484848";
        barAction2.style.color = "#484848";
    }
    else if (hardGame) {
        barAction2.style.backgroundColor = "blue";
        barAction2.style.borderRadius = '1rem';
        barAction.style.backgroundColor = "white";
        barAction3.style.backgroundColor = "white";
        barAction2.style.color = "white";
        barAction.style.color = "#484848";
        barAction3.style.color = "#484848";
    }
    else if (nightmareGame) {
        barAction3.style.backgroundColor = "blue";
        barAction3.style.borderRadius = '1rem';
        barAction.style.backgroundColor = "white";
        barAction2.style.backgroundColor = "white";
        barAction3.style.color = "white";
        barAction.style.color = "#484848";
        barAction2.style.color = "#484848";
    }
}
/*
function numOfCards() {

    var el = document.getElementById("card-container");

    if (numCards == 6) {
        for (var i = 0; i < 3; i++)
            el.innerHTML = '<div class="card"></div>';

        init();
    }
    

}*/