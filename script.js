"use strict";

//sections
function expandSections(width) {
  sections.forEach((section) => {
    section.style.display = "initial";
  });
  if (width >= 768) {
    wrap.style.gridTemplateColumns = "1fr 1fr 1fr";
    wrap.style.gridTemplateRows = "1fr";
  } else {
    wrap.style.gridTemplateColumns = "1fr";
    wrap.style.gridTemplateRows = "1fr 2fr 1fr";
  }
}

//text
function fadeDownTextEffect(parent, sentence) {
  sentence.split("").forEach((character, index) => {
    const element = document.createElement("span");

    if (specialCharRegex.test(character)) {
      element.classList.add("special-character");
    }

    element.textContent = character === " " ? "\u00A0" : character;
    element.style.animationDelay = `${index * 0.03}s`;
    element.classList.add("hero-name-character");
    parent.appendChild(element);
  });
}

function typeWriterTextEffect(parent, sentence) {
  if (sentence.length > 0) {
    const character = sentence.split("").shift();

    if (specialCharRegex.test(character)) {
      const element = document.createElement("span");
      element.textContent = character;
      element.classList.add("special-character");
      parent.insertAdjacentElement("beforeend", element);
    } else {
      parent.insertAdjacentText("beforeend", character);
    }

    parent.appendChild(caret);

    setTimeout(() => {
      typeWriterTextEffect(parent, sentence.slice(1));
    }, 80);
  }
}

//execution
const wrap = document.querySelector(".wrap");
const sections = document.querySelectorAll(".wrap div");
const heroName = document.querySelector(".hero-section p");
const heroTextGrid = document.querySelector(".hero-text-grid");
const heroText = document.querySelectorAll(".hero-text p");
const caret = document.querySelector(".caret");
const specialCharRegex = /[!@#$%^&*(),.?":{}|<>'-]/;

const heroInputs = [
  "Hey, I'm Matt.",
  "I'm developing my expertise in full-stack development.",
];

fadeDownTextEffect(heroName, heroInputs[0]);

setTimeout(() => {
  heroText[0].innerHTML = heroInputs[1] + "<span style='font-weight: bold;'>|</span>";
  heroTextGrid.style.gridTemplateRows = "1fr";
}, 2000);

setTimeout(() => {
  caret.style.display = "inline-block";
});

setTimeout(() => {
  typeWriterTextEffect(heroText[1], heroInputs[1]);
}, 3500);
