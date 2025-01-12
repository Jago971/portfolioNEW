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
    const span = document.createElement("span");
    span.textContent = character === " " ? "\u00A0" : character;
    span.style.animationDelay = `${index * 0.03}s`;
    parent.appendChild(span);
  });
}

function typeWriterTextEffect(parent, sentence) {
  if(sentence.length > 0) {
    const character = sentence.split("").shift();
    caret.insertAdjacentText("beforebegin", character);
    setTimeout(() => {
      typeWriterTextEffect(parent, sentence.slice(1))
    }, 100)
  }
}

//execution
const wrap = document.querySelector(".wrap");
const sections = document.querySelectorAll(".wrap div");
const heroName = document.querySelector(".hero p");
const heroTextGrid = document.querySelector(".hero-text-grid");
const heroText = document.querySelectorAll(".hero div p")
const caret = document.querySelector(".caret");

const heroInputs = [
  "Hey, I'm Matt.",
  "I'm focused on mastering full-stack development.",
];

fadeDownTextEffect(heroName, heroInputs[0]);

setTimeout(() => {
  heroText[0].textContent = heroInputs[1];
  heroTextGrid.style.gridTemplateRows = "1fr";
}, 1000);

setTimeout(() => {
  caret.style.display = "inline-block";
})

setTimeout(() => {
  typeWriterTextEffect(heroText[1], heroInputs[1])
}, 3000)
