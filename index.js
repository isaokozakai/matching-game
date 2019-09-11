let cards = [];

let startTime;
let timer;
let backTimer;
let isFirstCard = true;
let firstCard;
let count = 0;
const NUMBER_OF_CARDS = 20
const CARD_TYPES = NUMBER_OF_CARDS / 2;

window.onload = () => {
  let arr = [];

  for (let i = 0; i < CARD_TYPES; i++) {
    arr.push(i, i);
  }

  shuffle(arr);

  let panel = document.getElementById('panel');

  // create div elements
  for (i = 0; i < NUMBER_OF_CARDS; i++) {
    let div = document.createElement('div');
    div.className = 'card back';
    div.index = i;
    div.number = arr[i];
    div.isBack = true;
    div.onclick = turn;
    panel.appendChild(div);
    cards.push(div);
  }

  // get the starting time
  startTime = new Date();

  // start the timer
  startTimer();

}

const shuffle = (arr) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

// when a card is clicked
const turn = (e) => {
  let div = e.target;

  if (backTimer) return;

  if (div.isBack) {
    let addClasName = '';
    switch (div.number) {
      case 0:
        addClasName = 'grizzly';
        break;
      case 1:
        addClasName = 'hippo';
        break;
      case 2:
        addClasName = 'rhino';
        break;
      case 3:
        addClasName = 'lynx';
        break;
      case 4:
        addClasName = 'beaver';
        break;
      case 5:
        addClasName = 'pangolin';
        break;
      case 6:
        addClasName = 'kangaroo';
        break;
      case 7:
        addClasName = 'koala';
        break;
      case 8:
        addClasName = 'gorilla';
        break;
      case 9:
        addClasName = 'polar-bear';
        break;
      default:
        break;
    }
    div.className = 'card ' + addClasName;
    div.isBack = false;
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
      backTimer = setTimeout(() => {
        div.className = 'card finish';
        firstCard.className = 'card finish';
        backTimer = NaN;
        if (count == CARD_TYPES) {
          clearInterval(timer);
        }
      }, 500)
    } else {
      backTimer = setTimeout(() => {
        div.className = 'card back';
        div.isBack = true;
        firstCard.className = 'card back';
        firstCard.isBack = true;
        firstCard = null;
        backTimer = NaN;
      }, 500);
    }

    isFirstCard = true;
  }
}

const startTimer = () => {
  timer = setInterval(showSecond, 1000);
}

const showSecond = () => {
  let nowTime = new Date();
  let elapsedTime = Math.floor((nowTime - startTime) / 1000);
  let str = elapsedTime + ' seconds have elapsed';

  let re = document.getElementById('result');
  re.innerHTML = str;
}
