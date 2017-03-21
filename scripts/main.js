window.onload = function() {
    init();
    navbarReset()
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
var easybutt = document.querySelector("#Easy");
var hardbutt = document.querySelector("#Hard");
var nightbutt = document.querySelector("#Nightmare");

var cards2 = document.querySelectorAll(".card2");

var mode = 1; //easy

var remainingTime = 5;

var counterId;
function counter() {
    body.style.backgroundColor = 'white';
    remainingTime--;
    if(remainingTime === 0){
        clearInterval(counterId);
        changeColors("#FFF");
        body.style.backgroundColor = pickedColor;
        messageDisplay.textContent = "Time out";
        resetButton.style.display = "block";
        gameOver = true;
        return;
    }
    else
        messageDisplay.textContent = "What's the Color? " + remainingTime.toString();
    setTimeout(backStill, 100);
}

function backStill() {
    body.style.backgroundColor = '#232323';
}

function init() {
    initCards();
    clearInterval(counterId);
    resetButton.style.display = "block";
    if(mode === 1)
        reset();
    else if(mode === 2)
        reset_hard();
    else{
        reset_night();
        resetButton.style.display = "none";
    }
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
    for (var i = 0; i < cards2.length; i++) {
        //add click listeners to cards
        cards2[i].addEventListener("click", function() {
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
        cards2[i].style.display = "none";
    }
    body.style.backgroundColor = "#232323";
}

function reset_hard() {
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
    for ( i = i ; i < 6; i++) {
        cards2[i-3].style.opacity = 1;
        if (colors[i]) {
            cards2[i-3].style.display = "block"
            cards2[i-3].style.backgroundColor = colors[i];
        } else {
            cards2[i-3].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";
}

function reset_night() {
    gameOver = false;
    remainingTime =5;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?"  + remainingTime.toString();
    counterId = setInterval(counter ,1000);  //start timer
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
    for ( i = i ; i < 6; i++) {
        cards2[i-3].style.opacity = 1;
        if (colors[i]) {
            cards2[i-3].style.display = "block"
            cards2[i-3].style.backgroundColor = colors[i];
        } else {
            cards2[i-3].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";
}



resetButton.addEventListener("click", function() {
    if(mode === 1)
        reset();
    else if(mode === 2)
        reset_hard();
    else
        reset_night();
})

easybutt.addEventListener("mouseover", function() {
    easybutt.style.backgroundColor = 'steelblue';
    easybutt.style.color = 'white';
})

easybutt.addEventListener("mouseout", function() {
    navbarReset()
})

easybutt.addEventListener("click", function() {
    mode = 1;
    numCards = 3;
    navbarReset();
    init();
})

hardbutt.addEventListener("mouseover", function() {
    hardbutt.style.backgroundColor = 'steelblue';
    hardbutt.style.color = 'white';
})

hardbutt.addEventListener("mouseout", function() {
    navbarReset()
})

hardbutt.addEventListener("click", function() {
    mode = 2;
    numCards = 6;
    navbarReset();
    init();
})

nightbutt.addEventListener("mouseover", function() {
    nightbutt.style.backgroundColor = 'steelblue';
    nightbutt.style.color = 'white';
})

nightbutt.addEventListener("mouseout", function() {
    navbarReset()
})

nightbutt.addEventListener("click", function() {
    mode = 3;
    numCards = 6;
    navbarReset();
    init();
})

function navbarReset(){
    easybutt.style.color = '#484848';
    hardbutt.style.color = '#484848';
    nightbutt.style.color = '#484848';
    easybutt.style.backgroundColor = '#ffffff';
    hardbutt.style.backgroundColor = '#ffffff';
    nightbutt.style.backgroundColor = '#ffffff';
    if(mode === 1){
        easybutt.style.backgroundColor = '#aaaaff';
    }
    else if( mode === 2){
        hardbutt.style.backgroundColor = '#aaaaff';
    }
    else{
        nightbutt.style.backgroundColor = '#aaaaff';
    }

}

function changeColors(color) {
    //loop through all cards
    for (var i = 0; i < cards.length; i++) {
        //change each color to match given color
        cards[i].style.opacity = 1;
        cards[i].style.backgroundColor = color;
    }
    for (var i = 0; i < cards2.length; i++) {
        //change each color to match given color
        cards2[i].style.opacity = 1;
        cards2[i].style.backgroundColor = color;
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
