//sections
function expandSections() {
  changeGridOrientation(window.innerWidth)
  setTimeout (() => {
    sections.forEach((section) => {
      section.style.display = "flex";
    });
  }, 2000)
}

function changeGridOrientation(width) {
  if (width > 768) {
    body.style.gridTemplateColumns = "2fr 1fr 2fr";
    body.style.gridTemplateRows = "1fr";
  } else {
    body.style.gridTemplateColumns = "1fr";
    body.style.gridTemplateRows = "1fr 2fr 1fr";
  }
}

const body = document.querySelector("body")
const sections = document.querySelectorAll("section")

expandSections()

window.addEventListener("resize", function() {
  changeGridOrientation(window.innerWidth);
});