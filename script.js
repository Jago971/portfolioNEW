function setSpacers() {
  const heroSpacerHeight = spacerHeightAdjust(heroSpacer, [heroH1, heroH2, heroIcons]);
  callSpacer.style.height = `${heroSpacerHeight + heroH1.getBoundingClientRect().height}px`
}

function spacerHeightAdjust(spacer, elementsArray) {
  let sumHeight = 0;

  elementsArray.forEach((element) => {
    sumHeight += element.getBoundingClientRect().height;
  });

  spacer.style.height = `${
    (wrapper.getBoundingClientRect().height - sumHeight) / 2}px`;
  return (wrapper.getBoundingClientRect().height - sumHeight) / 2
}

function expandSections() {
  wrapperSpacer.style.flexGrow = "0"
  sections.forEach(section => {
    setTimeout(() => {
      section.classList.remove("collapsed")
      section.style.opacity = "1"
    }, 1250);
  });
}

const wrapper = document.querySelector(".wrapper");
const wrapperSpacer = document.querySelector(".wrapper > .spacer")
const sections = document.querySelectorAll("section")

const heroH1 = document.querySelector(".hero h1");
const heroH2 = document.querySelector(".hero h2");
const heroIcons = document.querySelector(".hero .icons");
const heroSpacer = document.querySelector(".hero .spacer");

const callH2s = document.querySelectorAll(".call h2");
const callIcons = document.querySelector(".call .icons");
const callSpacer = document.querySelector(".call .spacer");

setSpacers()

window.addEventListener("resize", () => {
  setSpacers()
})

setTimeout(() => {
  expandSections()
}, 1000)

