// ---------- layout ---------- //

function deviceLayout(width) {
  const below = document.querySelector(".below")
  if (width > 768) {
    sections.forEach((section) => {
      section.classList.remove("mobile");
      section.classList.add("desktop");
      below.style.display = "none"
    });
  } else {
    sections.forEach((section) => {
      section.classList.remove("desktop");
      section.classList.add("mobile");
      below.style.display = "initial"
    });
  }
}

function moveSection(section) {
  const stylesheet = document.styleSheets[0];
  const margins = [0, 66.66];

  for (let index = 0; index < sections.length; index++) {
    const className = `.desktop:nth-of-type(${section + 1})`;
    const newStyle = `margin-left: ${margins[section]}%;`;

    sections[section].classList.toggle("section-transition");
    stylesheet.insertRule(`${className} { ${newStyle} }`);
    setTimeout(() => {
      sections[section].classList.toggle("section-transition");
    }, 1000);
  }
}

function scrollToNext(container) {
  const scrollTop = container.scrollTop;
  const containerHeight = container.clientHeight;
  const scrollHeight = container.scrollHeight;
  const nextPosition = Math.min(scrollTop + containerHeight, scrollHeight);

  container.scrollTo({
    top: nextPosition,
    behavior: "smooth",
  });
}

// ---------- visuals ---------- //

function drawLines() {
  const root = document.documentElement;
  const lineColor = getComputedStyle(root)
    .getPropertyValue("--paper-lines")
    .trim();
  const paperColor = getComputedStyle(root)
    .getPropertyValue("--paper-bg")
    .trim();
  const folds = document.querySelectorAll(".fold");
  const lineHeight = folds[0].offsetHeight / 12;

  folds.forEach((fold) => {
    fold.style.background = `
    linear-gradient(
      to bottom,
      ${paperColor},
      ${paperColor} ${lineHeight * 0.93}px,
      ${lineColor} ${lineHeight * 0.93}px,
      ${lineColor} ${lineHeight}px)`;
    fold.style.backgroundSize = `100% ${lineHeight}px`;
  });
}

// ---------- animation ---------- //

function moveFold(
  fold1,
  brightness1,
  angle1,
  fold2,
  brightness2,
  lastFold = false
) {
  const clickMe = fold1.querySelector(".click-me")
  const content1 = fold1.querySelector(".content");
  const content2 = fold2.querySelector(".content");
  if (lastFold) {
    content2.style.opacity = "1";
  }
  fold1.style.transform = `rotateX(${angle1}deg)`;
  fold1.style.filter = `brightness(${brightness1})`;
  fold2.style.filter = `brightness(${brightness2})`;
  setTimeout(() => {
    if(clickMe) {clickMe.style.opacity = "0"}
    content1.style.opacity = "1";
  }, 300);
  animateHoles(fold1);
}

function animateHoles(fold) {
  const hole = fold.querySelector(".hole");
  hole.style.boxShadow = "none";
  hole.style.animation = "hole-brightness 1s forwards";
  setTimeout(() => {
    hole.style.backgroundColor = "var(--bg)";
    hole.style.transform = "initial";
    hole.style.boxShadow = "inset 0.75cqi 0.75cqi 0.75cqi rgba(0, 0, 0, 0.25)";
  }, 350);
}

function pointElement(event, range, element) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let percentX, percentY;

  if (event.type === "mousemove") {
    percentX = (event.clientX / viewportWidth).toFixed(2);
    percentY = (event.clientY / viewportHeight).toFixed(2);
  } else if (event.type === "deviceorientation") {
    const { beta, gamma } = event;
    percentX = ((gamma + 90) / 180).toFixed(2);
    percentY = ((beta + 180) / 360).toFixed(2);
  } else if (event.type === "touchmove") {
    const touch = event.touches[0];
    percentX = (touch.clientX / viewportWidth).toFixed(2);
    percentY = (touch.clientY / viewportHeight).toFixed(2);
  }

  element.style.transform = `rotateX(${
    range * (2 * percentY - 1) * -1
  }deg) rotateY(${range * (2 * percentX - 1)}deg)`;
}

function drawHighlights(paper, includesBlacks = false) {
  const highlights = paper.querySelectorAll("p span")
  let increment = 0
  highlights.forEach((element, index) => {
    if(window.innerWidth > 768 && element.classList.contains("below")) {
      increment = 1
      return;
    }
    element.style.backgroundRepeat = "no-repeat"
    element.style.backgroundSize = "0% 100%"
    element.style.animation = "fillGradient 0.5s ease forwards";
    element.classList.remove("no-background")
    element.style.animationDelay = `${(index - increment) * 0.5}s`
    if(includesBlacks && (index === 11 || index === 12)) {
      setTimeout(() => {
        element.style.setProperty(`--width${index-10}`, "100%");
      }, (index - increment) * 500);
    }
  });
}

function unfoldPaper(paper, section) {
  moveFold(
    paper.querySelectorAll(".fold")[0],
    0.90,
    -10,
    paper.querySelectorAll(".fold")[2],
    0.95
  );

  setTimeout(() => {
    moveFold(
      paper.querySelectorAll(".fold")[2],
      1,
      10,
      paper.querySelectorAll(".fold")[1],
      0.95,
      true
    );
  }, 1000);

  setTimeout(() => {
    drawHighlights(paper, paperCount === 2)
  }, 2000);

  setTimeout(() => {
    moveSection(section);
    // scrollToNext(wrapper);
  }, section === 0 ? 5500 : 8500);
}

// ---------- declarations ---------- //

const wrapper = document.querySelector(".wrapper");
const sections = document.querySelectorAll("section");
const papers = document.querySelectorAll(".paper");
let paperCount = 0;

// ---------- content object ---------- //

const content = {
  about: {
    "information about me": {
      profile: {},
      interests: {},
      hobbies: {},
    },
    education: {
      coding: {},
      school: {},
      extra: {}
    },
    cv: {
      text: {},
      download: {}
    },
    contect: {
      socialMedia: {},
      contactForm: {}
    }
  },
  projects: {
    spotlight: {
      project1: {
        title: {},
        image: {},
        info: {},
        link: {}
      },
      project2: {
        title: {},
        image: {},
        info: {},
        link: {}
      },
      project3: {
        title: {},
        image: {},
        info: {},
        link: {}
      }
    },
  },
  activity: {},
};

// ---------- onload ---------- //

const test = document.querySelector("test")

deviceLayout(window.innerWidth);

drawLines();

document.addEventListener("mousemove", function (event) {
  pointElement(event, 10, papers[0]);
  pointElement(event, 10, papers[1]);
});

if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", (event) => {
    pointElement(event, 10, papers[0]);
  pointElement(event, 10, papers[1]);
  test.textContent = `working: X:${event.beta} Y:${event.gamma}`
  });
}

window.addEventListener("touchmove", (event) => {
  pointElement(event, 10, papers[0]);
pointElement(event, 10, papers[1]);
  test.textContent = `working: X:${event.clientX} Y:${event.clientY}`
});

window.addEventListener("resize", () => {
  drawLines();
  deviceLayout(window.innerWidth);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  window.location.reload();
});

// ---------- execution ---------- //

papers.forEach((paper, index) => {
  const fold = paper.querySelector(".fold");
  fold.addEventListener("click", () => {
    if (paperCount === index) {
      unfoldPaper(paper, index);
      fold.classList.toggle("hover");
      paperCount++;
    }
  });
});


function pointCabinet(event) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const percentX = (event.clientX / viewportWidth).toFixed(2);
  const percentY = (event.clientY / viewportHeight).toFixed(2);
  const cabinet = document.querySelector(".cabinet-body");
  cabinet.style.transform = `rotateX(${
    15 * (1.25 * percentY - 1) * -1 - 30
  }deg) rotateY(${22.5 * (2 * percentX - 1)}deg)`;
}

function openDrawer(drawer) {
  const shadow = drawer.querySelector(".shadow");
  const isOpen = drawer.classList.toggle("open");
  setTimeout(
    () => {
      drawer.classList.toggle("closed");
      shadow.style.backgroundColor = "black";
    },
    isOpen ? 0 : 600
  );
}

document.addEventListener("mousemove", function (event) {
  pointCabinet(event);
});

const drawers = document.querySelectorAll(".cabinet-drawer");

drawers.forEach((drawer) => {
  drawer.addEventListener("click", () => {
    openDrawer(drawer);
  });
});