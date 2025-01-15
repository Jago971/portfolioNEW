//layout
function expandSections() {
  sections[0].style.flex = "0 0 0"
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
    const caret = parent.querySelector(".caret");
    if (specialCharRegex.test(character)) {
      const element = document.createElement("span");
      element.textContent = character;
      element.classList.add("special-character");
      parent.insertBefore(element, caret);
    } else {
      caret.insertAdjacentText("beforebegin", character)
    }

    setTimeout(() => {
      typeWriterTextEffect(parent, sentence.slice(1));
    }, 60);
  }
}

function expandHeroSection() {
  const grids = sections[1].querySelectorAll(".grid-container")
  grids.forEach(grid => {
    grid.style.gridTemplateRows = "1fr"
  });
}

const sections = document.querySelectorAll("section")
const specialCharRegex = /[!@#$%^&*(),.?":{}|<>'-]/;
const heroName = document.querySelector(".hero-name")
const heroText = document.querySelector(".hero-text")
const heroInputs = [
  "Hey, I'm Matt.",
  "I'm developing my expertise in full-stack development.",
];
const caret = document.querySelector(".caret");

fadeDownTextEffect(heroName, heroInputs[0])

setTimeout(() => {
  expandHeroSection()
  const text = document.createElement("h2")
  text.innerHTML =
    heroInputs[1] + "<span style='font-weight: bold;'>|</span>";
  heroText.appendChild(text)
}, 1250);

setTimeout(() => {
  caret.style.display = "inline-block";
}, 2000);

setTimeout(() => {
  typeWriterTextEffect(heroText.querySelector("h2"), heroInputs[1]);
}, 3000);

setTimeout(() => {expandSections()},6750)