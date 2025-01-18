// ---------- layout effects---------- //
function setSpacers() {
  const heroSpacerHeight = spacerHeightAdjust(heroSpacer, [
    heroNameDiv,
    heroTextDivs[0],
    heroTextDivs[1],
    heroIcons,
  ]);
  callSpacer.style.height = `${
    heroSpacerHeight + heroNameDiv.offsetHeight
  }px`;
}

function spacerHeightAdjust(spacer, elementsArray) {
  const sumHeight = elementsArray.reduce((total, element) => total + element.offsetHeight, 0);
  const spacerHeight = (wrapper.offsetHeight - sumHeight) / 2;

  spacer.style.height = `${spacerHeight}px`;
  return spacerHeight;
}

function expandSections() {
  wrapperSpacer.style.flexGrow = "0";

  setTimeout(() => {
    sections.forEach((section) => {
      section.classList.remove("collapsed");
      section.style.opacity = "1";
    });
  }, 1250);
}

function expandDivider(element) {
  window.innerWidth > 768
  ? element.style.width = "300%"
  : element.style.width = "100%";

  const shadows = {
    "--after-shadow-size": ["0", "6cqw"],
    "--after-shadow-spread": ["0", "2cqw"],
    "--before-shadow-size": ["0", "2cqw"],
    "--before-shadow-spread": ["0", "1cqw"]
  };

  for (const property in shadows) {
    element.style.setProperty(property, shadows[property][0]);
  }

  setTimeout(() => {
    for (const property in shadows) {
      element.style.setProperty(property, shadows[property][1]);
    }
  },100)

  setTimeout(() => {
    for (const property in shadows) {
      element.style.setProperty(property, shadows[property][0]);
    }
  }, 2000);

  setTimeout(() => {
    element.querySelector("div").style.opacity = "1"
  },2250)
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
      charSpan.textContent = character;
      charSpan.style.animationDelay = `${sentenceCharIndex * 0.04}s`;
      charSpan.classList.add("hero-name-character");
      if (specialCharRegex.test(character)) {
        charSpan.classList.add("special-character");
      }
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
    const character =  sentence[0];
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

const heroNameDiv = document.querySelector(".hero-name-div");
const heroDivider = document.querySelector(".divider")
const heroTextDivs = document.querySelectorAll(".hero-text-div");
const carets = document.querySelectorAll(".caret")
const heroIcons = document.querySelector(".hero .icons");
const heroSpacer = document.querySelector(".hero .spacer");
const heroInputs = [
  "Hey, I'm Matt.",
  "I'm developing my expertise in full-stack development.",
  "These are some of the technologies I use:"
];

const callH2s = document.querySelectorAll(".call h2");
const callIcons = document.querySelector(".call .icons");
const callSpacer = document.querySelector(".call .spacer");

fadeDownTextEffect(heroNameDiv.querySelector("h1"), heroInputs[0])

setSpacers();

window.addEventListener("resize", () => {
  setSpacers();
});

setTimeout(() => {
  carets[0].style.display = "inline-block";
  carets[1].style.display = "inline-block";
}, 2000);

setTimeout(() => {
  typeWriterTextEffect(heroTextDivs[0].querySelectorAll("h2")[1], heroInputs[1]);
  typeWriterTextEffect(heroTextDivs[1].querySelectorAll("h2")[1], heroInputs[2]);
}, 3000);

setTimeout(() => {
  expandSections();
  expandDivider(heroDivider)
}, 1000);
