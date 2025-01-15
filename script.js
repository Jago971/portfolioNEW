//sections
function expandSections() {
  wrapper.style.width = "100%"
  changeGridOrientation(window.innerWidth)
  sections.forEach((section) => {
    section.style.display = "flex";
  });
}

function changeGridOrientation(width) {
  if (width > 768) {
    wrapper.style.gridTemplateColumns = "2fr 1fr 2fr";
    wrapper.style.gridTemplateRows = "1fr";
  } else {
    wrapper.style.gridTemplateColumns = "1fr";
    wrapper.style.gridTemplateRows = "1fr 2fr 1fr";
  }
}

const wrapper = document.querySelector(".wrapper")
const sections = document.querySelectorAll("section")
const heroSection = document.querySelector(".hero-section")

setTimeout(() => {expandSections()},2000)

window.addEventListener("resize", function() {
  changeGridOrientation(window.innerWidth);
});