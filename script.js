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

const sections = document.querySelectorAll("section")
const specialCharRegex = /[!@#$%^&*(),.?":{}|<>'-]/;
const heroInputs = [
  "Hey, I'm Matt.",
  "I'm developing my expertise in full-stack development.",
];

fadeDownTextEffect(sections[1].querySelector("h1"), heroInputs[0])
setTimeout(() => {expandSections()},5000)