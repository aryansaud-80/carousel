const carousel = document.querySelector('.carousel');
const boxes = document.querySelectorAll('.content--box');

const positions = ['prev', 'current', 'next'];
let touchstart = null;
let touchend = null;
let rotating = false;
const swipeThreshold = 60;

const rotatePositions = (direction = 1) => {
  if (rotating) return;

  rotating = true;

  if (direction > 0) {
    positions.unshift(positions.pop());
  } else {
    positions.push(positions.shift());
  }

  boxes.forEach((box, index) => {
    box.className = `content--box ${positions[index]}`;
  });

  setTimeout(() => {
    rotating = false;
  }, 300);
};

const touchEnd = (e) => {
  e.preventDefault();

  console.log(e);
  if (touchstart && touchend) {
    const diff = touchstart - touchend;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        rotatePositions(1);
      } else if (diff < 0) {
        rotatePositions(-1);
      }
    }
  }

  touchstart = null;
  touchend = null;
};
const touchMove = (e) => {
  e.preventDefault();
  console.log(e);
  touchend = e.touches[0].clientY;
};
const touchStart = (e) => {
  e.preventDefault();
  console.log(e);
  touchstart = e.touches[0].clientY;
  touchend = null;
};
const Wheel = (e) => {
  e.preventDefault();
  console.log(e);
  rotatePositions(e.deltaY > 0 ? 1 : -1);
};

carousel.addEventListener('wheel', Wheel);
carousel.addEventListener('touchstart', touchStart);
carousel.addEventListener('touchmove', touchMove);
carousel.addEventListener('touchend', touchEnd);
