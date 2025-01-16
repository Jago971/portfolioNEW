function spacerHeightAdjust(spacer, elementsArray) {
  let sumHeight = 0;

  elementsArray.forEach((element) => {
    const rect = element.getBoundingClientRect();
    sumHeight += rect.height;
  });

  spacer.style.height = `${
    (wrapper.getBoundingClientRect().height - sumHeight) / 2}px`;
  return (wrapper.getBoundingClientRect().height - sumHeight) / 2
}

const wrapper = document.querySelector(".wrapper");

const heroH1 = document.querySelector(".hero h1");
const heroH2 = document.querySelector(".hero h2");
const heroIcons = document.querySelector(".hero .icons");
const heroSpacer = document.querySelector(".hero .spacer");

const callH2s = document.querySelectorAll(".call h2");
const callIcons = document.querySelector(".call .icons");
const callSpacer = document.querySelector(".call .spacer");


const heroSpacerHeight = spacerHeightAdjust(heroSpacer, [heroH1, heroH2, heroIcons]);
console.log(heroSpacerHeight)
callSpacer.style.height = `${heroSpacerHeight + heroH1.getBoundingClientRect().height}px`
