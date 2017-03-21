var gameOver = false;
var state = 0; //0:easy 1:hard 2:nightmare
var time = 5;
var numCards = 3;
var colors = [];
var pickedColor;
var countDown;
var clickedColor;
var body = document.querySelector("body");
var mode = document.querySelectorAll(".mode");
var timeCount = document.querySelector("#timecount");
var colorDisplay = document.getElementById("color-picked");
var cards = document.querySelectorAll(".card");
var messageDisplay = document.querySelector("#message")
var buttonDisplay = document.querySelector("#reset span")
var buttonReset = document.querySelector("#reset")

window.onload = function(){
  timeCount.style.display="none";
  mode[0].style.backgroundColor="steelblue";
  mode[0].style.color="white";

  initCards();
  reset();
}
function resetModeButton(){
  for(var i=0;i<3;i++){
    mode[i].style.backgroundColor="white";
    mode[i].style.color="#484848";
  }
}
function initCards(){

  for(var i=0;i<cards.length;i++){
    cards[i].addEventListener("click",function(){
      if(gameOver)return;
      clickedColor = this.style.backgroundColor;
      if(clickedColor === pickedColor){
        messageDisplay.textContent = "Correct!";
        buttonDisplay.textContent = "Play Again";
        changeColors("#FFF");
        body.style.backgroundColor = clickedColor;
        gameOver = true;
        if(state==2){
          clearInterval(countDown);
          buttonReset.style.display="block";
        }
      }
      else {
        this.style.opacity = 0;
        messageDisplay.textContent = "Try again!";
      }
    });
  }
}
function reset(){
  gameOver = false;
  time = 5;
  colors = generateRandomColors(numCards);
  pickedColor = pickColor();
  body.style.backgroundColor = "#232323";
  colorDisplay.textContent = pickedColor;
  buttonDisplay.textContent = "New Color";
  messageDisplay.textContent = "WHAT'S THE COLOR?"
  for (var i = 0; i < cards.length; i++) {
      if(i<numCards)cards[i].style.opacity = 1;
      else cards[i].style.opacity = 0;
      if (colors[i]) {
          cards[i].style.display = "block";
          cards[i].style.backgroundColor = colors[i];
      } else {
          cards[i].style.display = "none";
      }
  }

}
buttonReset.addEventListener("click", function() {
  reset();
  if(state==2){
    timeCount.style.display="inline";
    buttonReset.style.display="none";
    resetModeButton();
    this.style.backgroundColor="steelblue";
    this.style.color="white";
    countDown = setInterval(count,1000);
  }
});

  mode[0].addEventListener("click", function() {
    timeCount.style.display="none";
    buttonReset.style.display="block";
    resetModeButton();
    this.style.backgroundColor="steelblue";
    this.style.color="white";
    state=0;
    numCards=3;
    reset();
    clearInterval(countDown);
  });
  mode[1].addEventListener("click", function() {
    timeCount.style.display="none";
    buttonReset.style.display="block";
    resetModeButton();
    this.style.backgroundColor="steelblue";
    this.style.color="white";
    state=1;
    numCards=6;
    reset();
    clearInterval(countDown);
  });
  mode[2].addEventListener("click", function() {
    timeCount.style.display="inline";
    buttonReset.style.display="none";
    resetModeButton();
    this.style.backgroundColor="steelblue";
    this.style.color="white";


    state=2;
    numCards=6;
    time=5;
    reset();
    countDown = setInterval(count,1000);
  });

function count(){

  if(time!=0){
    time--;
    timeCount.innerHTML=time;
    body.style.backgroundColor = "white";
    setTimeout(function(){
      body.style.backgroundColor = "#232323";
    },80);

  }
  else{
    clearInterval(countDown);
    messageDisplay.textContent = "Time out";
    changeColors("#FFF");
    body.style.backgroundColor = pickedColor;
    buttonReset.style.display="block";
    gameOver=true;
    timeCount.innerHTML="0";
  }

  console.log(time);
}

function changeColors(color){
  for(var i=0;i<cards.length;i++){
    cards[i].style.opacity = 1;
    cards[i].style.backgroundColor = color;

  }
}
function pickColor(){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num){
  var arr = [];
  for(var i=0;i<num;i++){
    arr.push(randomColor());
  }
  return arr;
}
function randomColor(){
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb("+r+", "+g+", "+b+")";
  //return "rgb(" + r + ", " + g + ", " + b + ")";
}
