let cards = [];

let startTime;
let timer;
let backTimer;
let isFirstCard = true;
let firstCard;
let count = 0;
const NUMBER_OF_CARDS = 20
const CARD_TYPES = NUMBER_OF_CARDS / 2;

window.onload = function () {
  let arr = [];

  for (let i = 0; i < CARD_TYPES; i++) {
    arr.push(i);
    arr.push(i);
  }

  shuffle(arr);

  let panel = document.getElementById('panel');

  // create div elements
  for (i = 0; i < NUMBER_OF_CARDS; i++) {
    let div = document.createElement('div');
    div.className = 'card back';
    div.index = i;
    div.number = arr[i];
    div.innerHTML = '';
    div.onclick = turn;
    panel.appendChild(div);
    cards.push(div);
  }

  // get the starting time
  startTime = new Date();

  // start the timer
  startTimer();

}

function shuffle(arr) {
  let n = arr.length;
  let i;
  while (n) {
    i = Math.floor(Math.random() * n--);
    [arr[n], arr[i]] = [arr[i], arr[n]];
  }
  return arr;
}

// when a card is clicked
function turn(e) {

  let div = e.target;

  if (backTimer) return;

  if (div.innerHTML == '') {
    div.className = 'card';
    div.innerHTML = div.number;
  } else {
    return;
  }

  // the case for the first casd
  if (isFirstCard) {
    firstCard = div;
    isFirstCard = false;

    // the case for the second card
  } else {
    if (firstCard.number == div.number) {
      count++;
      backTimer = setTimeout(function () {
        div.className = 'card finish';
        firstCard.className = 'card finish';
        backTimer = NaN;
        if (count == CARD_TYPES) {
          clearInterval(timer);
        }
      }, 500)
    } else {
      backTimer = setTimeout(function () {
        div.className = 'card back';
        div.innerHTML = '';
        firstCard.className = 'card back';
        firstCard.innerHTML = '';
        firstCard = null;
        backTimer = NaN;
      }, 500);
    }

    isFirstCard = true;
  }
}

function startTimer() {
  timer = setInterval(showSecond, 1000);
}

function showSecond() {
  let nowTime = new Date();
  let elapsedTime = Math.floor((nowTime - startTime) / 1000);
  let str = elapsedTime + ' seconds have elapsed';

  let re = document.getElementById('result');
  re.innerHTML = str;
}
