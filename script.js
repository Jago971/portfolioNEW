// ---------- layout effects---------- //
function setSpacers() {
  const heroSpacerHeight = spacerHeightAdjust(heroSpacer, [
    heroName,
    heroTextDiv,
    heroIcons,
  ]);
  callSpacer.style.height = `${
    heroSpacerHeight + heroName.getBoundingClientRect().height
  }px`;
}

function spacerHeightAdjust(spacer, elementsArray) {
  let sumHeight = 0;

  elementsArray.forEach((element) => {
    sumHeight += element.getBoundingClientRect().height;
  });

  spacer.style.height = `${
    (wrapper.getBoundingClientRect().height - sumHeight) / 2
  }px`;

  return (wrapper.getBoundingClientRect().height - sumHeight) / 2;
}

function expandSections() {
  wrapperSpacer.style.flexGrow = "0";

  sections.forEach((section) => {
    setTimeout(() => {
      section.classList.remove("collapsed");
      section.style.opacity = "1";
    }, 1250);
  });
}

// ---------- text effects ---------- //
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
      caret.insertAdjacentText("beforebegin", character);
    }

    setTimeout(() => {
      typeWriterTextEffect(parent, sentence.slice(1));
    }, 60);
  }
}

const wrapper = document.querySelector(".wrapper");
const wrapperSpacer = document.querySelector(".wrapper > .spacer");
const sections = document.querySelectorAll("section");
const specialCharRegex = /[!@#$%^&*(),.?":{}|<>'-]/;

const heroName = document.querySelector(".hero-name");
const heroTextDiv = document.querySelector(".hero-text-div");
const caret = document.querySelector(".caret")
const heroIcons = document.querySelector(".hero .icons");
const heroSpacer = document.querySelector(".hero .spacer");
const heroInputs = [
  "Hey, I'm Matt.",
  "I'm developing my expertise in full-stack development.",
];

const callH2s = document.querySelectorAll(".call h2");
const callIcons = document.querySelector(".call .icons");
const callSpacer = document.querySelector(".call .spacer");

setSpacers();

window.addEventListener("resize", () => {
  setSpacers();
});

fadeDownTextEffect(heroName, heroInputs[0])

setTimeout(() => {
  caret.style.display = "inline-block";
}, 2000);

setTimeout(() => {
  typeWriterTextEffect(heroTextDiv.querySelectorAll("h2")[1], heroInputs[1]);
}, 3000);

// setTimeout(() => {
//   expandSections();
// }, 1000);
