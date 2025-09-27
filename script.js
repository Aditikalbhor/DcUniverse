var myCards = document.getElementById("container");
var resultsArray = [];
var counter = 0;
var text = document.getElementById("text");
var seconds = 0;
var tens = 0;
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var Interval;

// Superhero cards
var images = ["cat-woman","bat-man","beast-boy","raven","ww","cyborg","robin","super-man","aqua-man","flash"];

var cards = images.concat(images); // Duplicate array

// Shuffle
function shuffle(o) {
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

shuffle(cards);

// Create cards
function createBoard() {
  myCards.innerHTML = "";
  for (var i = 0; i < cards.length; i++) {
    let card = document.createElement("div");
    card.dataset.item = cards[i];
    card.dataset.view = "card";
    myCards.appendChild(card);

    card.onclick = function () {
      if (this.className != "flipped" && this.className != "correct") {
        this.className = "flipped";
        var result = this.dataset.item;
        resultsArray.push(result);
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
      }
      if (resultsArray.length > 1) {
        if (resultsArray[0] === resultsArray[1]) {
          check("correct");
          counter++;
          win();
          resultsArray = [];
        } else {
          check("reverse");
          resultsArray = [];
        }
      }
    };
  }
}

createBoard();

var check = function (className) {
  var x = document.getElementsByClassName("flipped");
  setTimeout(function () {
    for (var i = x.length - 1; i >= 0; i--) {
      x[i].className = className;
    }
  }, 500);
};

var win = function () {
  if (counter === images.length) {
    clearInterval(Interval);
    text.innerHTML = "🎉 You won! Your time was " + seconds + ":" + (tens < 10 ? "0" + tens : tens);
  }
};

function startTimer() {
  tens++;
  if (tens < 10) {
    appendTens.innerHTML = "0" + tens;
  } else {
    appendTens.innerHTML = tens;
  }
  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = seconds < 10 ? "0" + seconds : seconds;
    tens = 0;
    appendTens.innerHTML = "00";
  }
}

// Restart button
document.getElementById("restart").onclick = function () {
  clearInterval(Interval);
  seconds = 0;
  tens = 0;
  appendSeconds.innerHTML = "00";
  appendTens.innerHTML = "00";
  text.innerHTML = "";
  counter = 0;
  resultsArray = [];
  shuffle(cards);
  createBoard();
};
