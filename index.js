let cards = [];

let startTime;
let timer;
let backTimer;
let isFirstCard = true;
let firstCard;
let count = 0;
const NUMBER_OF_CARDS = 24
const CARD_TYPES = NUMBER_OF_CARDS / 2;
const images = [
  '../images/back.jpg',
  '../images/grizzly.jpg',
  '../images/hippo.jpg',
  '../images/rhino.jpg',
  '../images/lynx.jpg',
  '../images/beaver.jpg',
  '../images/pangolin.jpg',
  '../images/kangaroo.jpg',
  '../images/koala.jpg',
  '../images/gorilla.jpg',
  '../images/polar-bear.jpg',
  '../images/moose.jpg',
  '../images/japanese-macaque.jpg'
];

const leftPanel = document.getElementById('left-panel');
const rightPanel = document.getElementById('right-panel');
const button = document.getElementById('reset');

window.onload = () => {
  let loadedcount = 0;
  let loadingImg = document.getElementById('loading');
  button.style.visibility = 'hidden';
  // preload the images
  for (i = 0; i < images.length; i++) {
    let img = document.createElement('img');
    img.src = images[i];
    img.onload = () => {
      loadedcount++;

      if (loadedcount == images.length) {
        loadingImg.remove();
        button.style.visibility = 'visible';
        initialize();
      }
    }
  };

  const setResetButton = () => {
    button.onclick = () => {
      while (leftPanel.lastChild) {
        leftPanel.removeChild(leftPanel.lastChild);
      }
      while (rightPanel.lastChild) {
        rightPanel.removeChild(rightPanel.lastChild);
      }
      count = 0;
      initialize();
    };
  };

  const initialize = () => {
    let arr = [];

    for (let i = 0; i < CARD_TYPES; i++) {
      arr.push(i, i);
    }

    shuffle(arr);

    setResetButton();

    // create div elements
    for (i = 0; i < NUMBER_OF_CARDS; i++) {
      let div = document.createElement('div');
      div.className = 'card back';
      div.index = i;
      div.number = arr[i];
      div.isBack = true;
      div.onclick = turn;
      leftPanel.appendChild(div);
      cards.push(div);
    }

    // get the starting time
    startTime = new Date();

    // start the timer
    startTimer();
  }
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

  let addClasName = '';
  if (div.isBack) {
    switch (div.number) {
      case 0:
        addClasName = 'front1';
        break;
      case 1:
        addClasName = 'front2';
        break;
      case 2:
        addClasName = 'front3';
        break;
      case 3:
        addClasName = 'front4';
        break;
      case 4:
        addClasName = 'front5';
        break;
      case 5:
        addClasName = 'front6';
        break;
      case 6:
        addClasName = 'front7';
        break;
      case 7:
        addClasName = 'front8';
        break;
      case 8:
        addClasName = 'front9';
        break;
      case 9:
        addClasName = 'front10';
        break;
      case 10:
        addClasName = 'front11';
        break;
      case 11:
        addClasName = 'front12';
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

        for (let i = 0; i < 2; i++) {
          let matchedCardDiv = document.createElement('div');
          matchedCardDiv.index = i;
          matchedCardDiv.className = 'card ' + addClasName;
          rightPanel.appendChild(matchedCardDiv);
        }
        if (count == CARD_TYPES) {
          clearInterval(timer);
        }
      }, 500);
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
};

const startTimer = () => {
  timer = setInterval(showSecond, 1000);
};

const showSecond = () => {
  let nowTime = new Date();
  let elapsedTime = Math.floor((nowTime - startTime) / 1000);
  let str = elapsedTime + ' seconds have elapsed';

  let re = document.getElementById('result');
  re.innerHTML = str;
};
