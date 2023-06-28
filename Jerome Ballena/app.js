document.addEventListener("DOMContentLoaded", function () {
  animateBanner();
});

function animateBanner() {
  const femaleCharacter = document.getElementById("female-character");
  const headline1 = document.getElementById("headline1");
  const headline2 = document.getElementById("headline2");
  const subheadline = document.getElementById("subheadline");
  const learnMoreBtn = document.getElementById("learn-more-btn");
  const logo = document.getElementById("logo");
  const replayBtn = document.getElementById("replay-btn");

  setTimeout(function () {
    fadeIn(femaleCharacter, 1000);
  }, 1000);

  setTimeout(function () {
    fadeIn(headline1, 100);
    slideIn(headline1, 5, 0, 300);
  }, 2000);

  setTimeout(function () {
    fadeOut(femaleCharacter, 1000);
  }, 3000);

  setTimeout(function () {
    fadeIn(headline2, 100);
    slideIn(headline2, -45, 0, 500);
    slideOut(headline1, 20, -10, 300);
  }, 4000);

  setTimeout(function () {
    fadeOut(headline1, 100);
    fadeIn(subheadline, 500);
  }, 4500);

  setTimeout(function () {
    fadeIn(learnMoreBtn, 500);
  }, 5000);

  setTimeout(function () {
    fadeIn(logo, 100);
    slideIn(logo, 150, 0, 300);
  }, 6000);

  setTimeout(function () {
    fadeIn(replayBtn, 500);
    replayBtn.addEventListener("click", function () {
      resetBanner();
      animateBanner();
    });
  }, 6500);
}

function resetBanner() {
  const elements = document.querySelectorAll(
    "#female-character, #headline1, #headline2, #subheadline, #learn-more-btn, #logo, #replay-btn"
  );
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.transition = "none";
    elements[i].style.opacity = "0";
    elements[i].style.transform = "";
  }
}

function fadeIn(element, duration) {
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = "1";
}

function fadeOut(element, duration) {
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = "0";
}

function slideIn(element, offsetX, offsetY, duration) {
  element.style.transition = `transform ${duration}ms`;
  element.style.transform = `translate(${offsetX}%, ${offsetY}%)`;
}

function slideOut(element, offsetX, offsetY, duration) {
  element.style.transition = `transform ${duration}ms`;
  element.style.transform = `translate(${offsetX}%, ${offsetY}%) scale(0.5)`;

  setTimeout(() => {
    element.style.transform = `translate(${offsetX}%, ${offsetY}%) scale(0.01)`;
  }, 0);
}
