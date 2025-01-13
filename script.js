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

//text effects
function fadeDownTextEffect(parent, sentence) {
  let sentenceCharIndex = 0;
  sentence.split(" ").forEach((word, wordIndex) => {
    const wordDiv = document.createElement("div");
    wordDiv.style.display = "inline-block";
    wordDiv.style.whiteSpace = "nowrap";

    word.split("").forEach((character) => {
      const charSpan = document.createElement("span");

      if (specialCharRegex.test(character)) {
        charSpan.classList.add("special-character");
      }

      charSpan.textContent = character;
      charSpan.style.animationDelay = `${sentenceCharIndex * 0.04}s`;
      charSpan.classList.add("hero-name-character");
      wordDiv.appendChild(charSpan);
      sentenceCharIndex++;
    });

    parent.appendChild(wordDiv);

    if (wordIndex < sentence.split(" ").length - 1) {
      const space = document.createElement("span");
      space.textContent = "\u00A0";
      parent.appendChild(space);
      sentenceCharIndex++;
    }
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

//icons
function fadeIconsIn() {
  icons.forEach((icon, index) => {
    icon.style.animation = "fadeDownAnim 0.5s ease-in-out forwards"
    icon.style.animationDelay = `${index * 0.1}s`;
  });
}

//execution
const wrap = document.querySelector(".wrap");
const sections = document.querySelectorAll(".wrap div");
const heroName = document.querySelector(".hero-section p");
const heroTextGrid = document.querySelector(".hero-text-grid");
const heroText = document.querySelectorAll(".hero-text p");
const caret = document.querySelector(".caret");
const specialCharRegex = /[!@#$%^&*(),.?":{}|<>'-]/;
const iconGrid = document.querySelector(".icon-grid");
const icons = document.querySelectorAll(".icons img");

const heroInputs = [
  "Hey, I'm Matt.",
  "I'm developing my expertise in full-stack development.",
];

fadeDownTextEffect(heroName, heroInputs[0]);

setTimeout(() => {
  heroText[0].innerHTML =
    heroInputs[1] + "<span style='font-weight: bold;'>|</span>";
  heroTextGrid.style.gridTemplateRows = "1fr";
  iconGrid.style.gridTemplateRows = "1fr";
}, 1250);

setTimeout(() => {
  caret.style.display = "inline-block";
}, 2000);

setTimeout(() => {
  typeWriterTextEffect(heroText[1], heroInputs[1]);
}, 3000);

setTimeout(() => {
  fadeIconsIn()
}, 7500)