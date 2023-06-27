// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
  // Start the animation on page load
  animateBanner();
});

function animateBanner() {
  const femaleCharacter = document.getElementById('female-character');
  const headline1 = document.getElementById('headline1');
  const headline2 = document.getElementById('headline2');
  const subheadline = document.getElementById('subheadline');
  const learnMoreBtn = document.getElementById('learn-more-btn');
  const logo = document.getElementById('logo');
  const replayBtn = document.getElementById('replay-btn');


  setTimeout(function () {

    fadeIn(femaleCharacter, 1000);
  }, 1000);

  setTimeout(function () {
    fadeIn(headline1, 100);
    slideIn(headline1, -20, 0, 2000);
  }, 2000);

  setTimeout(function () {
    fadeOut(femaleCharacter, 1000);
    fadeOut(headline1, 1000);
    fadeIn(headline2, 1000);
  }, 4000);

  setTimeout(function () {
    fadeIn(logo, 1000);
  }, 6000);

  setTimeout(function () {
    fadeIn(subheadline, 1000);
    fadeIn(learnMoreBtn, 1000);
  }, 7000);

  setTimeout(function () {
    fadeIn(replayBtn, 1000);
    replayBtn.addEventListener('click', function () {
      resetBanner();
      animateBanner();
    });
  }, 9000);
}

function resetBanner() {
  const elements = document.querySelectorAll('#female-character, #headline1, #headline2, #subheadline, #learn-more-btn, #logo');
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.transition = 'none';
    elements[i].style.opacity = '0';
    elements[i].style.transform = '';
  }
  const replayBtn = document.getElementById('replay-btn');
  replayBtn.style.display = 'none';
}

function fadeIn(element, duration) {
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = '1';
}

function fadeOut(element, duration) {
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = '0';
}

function slideIn(element, offsetX, offsetY, duration) {
  // Calculate the initial position of the element
  const initialX = offsetX + element.getBoundingClientRect().width;
  const initialY = offsetY;

  // Set the initial position
  element.style.transform = `translate(${initialX}px, ${initialY}px)`;

  // Trigger the transition to slide the element to its final position
  setTimeout(() => {
    element.style.transition = `transform ${duration}ms`;
    element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }, 0);
}

function slideLeft(element, offsetX, duration) {
  const initialX = element.getBoundingClientRect().right;
  element.style.transform = `translateX(${initialX}px)`;

  requestAnimationFrame(() => {
    element.style.transition = `transform ${duration}ms`;
    element.style.transform = `translateX(-${offsetX}px)`;
  });
}
