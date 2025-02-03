// ---------- layout ---------- //

function deviceLayout(width) {
  const below = document.querySelector(".below");
  if (width > 768) {
    sections.forEach((section) => {
      section.classList.remove("mobile");
      section.classList.add("desktop");
      below.style.display = "none";
    });
  } else {
    sections.forEach((section) => {
      section.classList.remove("desktop");
      section.classList.add("mobile");
      below.style.display = "initial";
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
  const clickMe = fold1.querySelector(".click-me");
  const content1 = fold1.querySelector(".content");
  const content2 = fold2.querySelector(".content");
  if (lastFold) {
    content2.style.opacity = "1";
  }
  fold1.style.transform = `rotateX(${angle1}deg)`;
  fold1.style.filter = `brightness(${brightness1})`;
  fold2.style.filter = `brightness(${brightness2})`;
  setTimeout(() => {
    if (clickMe) {
      clickMe.style.opacity = "0";
    }
    content1.style.opacity = "1";
  }, 300);
  animateHoles(fold1);
}

function unfoldPaper(paper, section) {
  moveFold(
    paper.querySelectorAll(".fold")[0],
    0.9,
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
    drawHighlights(paper, clickCount === 2);
  }, 2000);

  setTimeout(
    () => {
      moveSection(section);
      // scrollToNext(wrapper);
    },
    section === 0 ? 5500 : 8500
  );
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

function drawHighlights(paper, includesBlacks = false) {
  const highlights = paper.querySelectorAll("p span");
  let increment = 0;
  highlights.forEach((element, index) => {
    if (window.innerWidth > 768 && element.classList.contains("below")) {
      increment = 1;
      return;
    }
    element.style.backgroundRepeat = "no-repeat";
    element.style.backgroundSize = "0% 100%";
    element.style.animation = "fillGradient 0.5s ease forwards";
    element.classList.remove("no-background");
    element.style.animationDelay = `${(index - increment) * 0.5}s`;
    if (includesBlacks && (index === 11 || index === 12)) {
      setTimeout(() => {
        element.style.setProperty(`--width${index - 10}`, "100%");
      }, (index - increment) * 500);
    }
  });
}

function openDrawer(drawer, index) {
  const shadows = document.querySelectorAll(".shadow");
  const isOpen = drawer.classList.toggle("open");
  setTimeout(
    () => {
      drawer.classList.toggle("closed");
      shadows[index].style.backgroundColor = isOpen ? "black" : "gray";
    },
    isOpen ? 0 : 450
  );
}

// ---------- perspective ---------- //

// function pointElement(event, range, element) {
//   const viewportWidth = window.innerWidth;
//   const viewportHeight = window.innerHeight;

//   let rotateX = 0
//   let rotateY = 0;

//   if (event.type === "mousemove") {
//     rotateX = (event.clientX / viewportWidth).toFixed(2);
//     rotateY = (event.clientY / viewportHeight).toFixed(2);
//   } else if (event.type === "deviceorientation") {
//     const { beta } = event;
//     rotateY = ((beta + 90) / 180).toFixed(2); // Adjust beta (front-back tilt)
//   }

//   element.style.transform = `rotateX(${
//     range * (2 * rotateY - 1) * -1
//   }deg) rotateY(${range * (2 * rotateX - 1)}deg)`;
// }

function pointCabinet(event) {
  const test = document.querySelector(".test");
  const cabinet = document.querySelector(".cabinet-body");
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let rotateX = 0;
  let rotateY = 0;

  if (event.type === "mousemove") {
    rotateX = (event.clientY / viewportHeight).toFixed(2);
    rotateY = (event.clientX / viewportWidth).toFixed(2);

    cabinet.style.transform = `rotateX(${7.5 * rotateX * -1 - 20}deg) rotateY(${
      45 * rotateY - 22.5
    }deg)`;
  } else if (event.type === "deviceorientation") {
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const { gamma, beta } = event;
    rotateX = -beta + 45;
    rotateY = gamma;

    cabinet.style.transform = `rotateX(${clamp(
      rotateX,
      -45,
      10
    )}deg) rotateY(${clamp(rotateY, -45, 45)}deg)`;
  }
}

// ---------- content object ---------- //

const content = {
  about: {},
  projects: {},
  activity: {},
};

// ---------- declarations ---------- //

const wrapper = document.querySelector(".wrapper");
const sections = document.querySelectorAll("section");
const papers = document.querySelectorAll(".paper");
const drawers = document.querySelectorAll(".cabinet-drawer");
let clickCount = 0;

// ---------- onload ---------- //

deviceLayout(window.innerWidth);

drawLines();

permission();

window.onload = function () {
  drawer.scrollTop = drawer.scrollHeight
}

window.addEventListener("resize", () => {
  drawLines();
  deviceLayout(window.innerWidth);
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    window.location.reload();
  });

// document.addEventListener("mousemove", function (event) {
//   pointElement(event, 10, papers[0]);
//   pointElement(event, 10, papers[1]);
// });

// if (window.DeviceOrientationEvent !== undefined) {
//   // Listen for the deviceorientation event
//   window.addEventListener("deviceorientation", function(event) {
//     // Access alpha, beta, and gamma from the event
//     const alpha = event.alpha; // Rotation around the Z-axis (compass heading)
//     const beta = event.beta;   // Rotation around the X-axis (front-to-back tilt)
//     const gamma = event.gamma; // Rotation around the Y-axis (left-to-right tilt)

//     // You can apply transformations or other actions based on the device's orientation
//     pointElement(event, 10, papers[0]);
//     pointElement(event, 10, papers[1]);
//     test.textContent = `Z:${alpha} X:${beta} Y:${gamma}`
//     console.log(alpha, beta, gamma)
//   });
// } else {
//   test.textContent = "not working"
// }

function permission() {
  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          window.addEventListener("deviceorientation", (event) => {
            pointCabinet(event);
          });
        } else {
          alert("Permission denied. Unable to access device motion data.");
        }
      })
      .catch((error) => {
        console.error("Error requesting permission:", error);
      });
  } else if ("DeviceMotionEvent" in window) {
    window.addEventListener("deviceorientation", (event) => {
      pointCabinet(event);
    });
  } else {
    alert("DeviceMotionEvent is not supported on this device or browser.");
  }
}

// function handleOrientation(event) {
//   const alpha = event.alpha ? event.alpha.toFixed(2) : 0;
//   const beta = event.beta ? event.beta.toFixed(2) : 0;
//   const gamma = event.gamma ? event.gamma.toFixed(2) : 0;

//   console.log("alpha:", alpha, "beta:", beta, "gamma:", gamma);
//   test.textContent = `Z: ${alpha} X: ${beta} Y: ${gamma}`;
// }

// ---------- execution ---------- //

papers.forEach((paper, index) => {
  const fold = paper.querySelector(".fold");
  fold.addEventListener("click", () => {
    if (clickCount === 0) {
      permission();
    }
    if (clickCount === index) {
      unfoldPaper(paper, index);
    }
    if (clickCount < 3) clickCount++;
  });
});

document.addEventListener("mousemove", function (event) {
  pointCabinet(event);
});

drawers.forEach((drawer, index) => {
  drawer.addEventListener("click", () => {
    openDrawer(drawer, index);
  });
});

function moveDrawer(action) {
  if (action === "close") {
    drawer.style.bottom = "100%";
    setTimeout(() => {
      sections[0].style.opacity = "1";
    }, 500);
  } else if (action === "open") {
    // drawer.scrollTop = drawer.scrollHeight;
    drawer.style.bottom = "0";
    sections[0].style.opacity = "0";
  }
}

const drawer = document.querySelector(".drawerUI-wrapper");
// const drawerFront = document.querySelector(".drawer-hitbox")

drawers.forEach(drawer => {
  drawer.addEventListener("click", () => {
    moveDrawer("open")
    console.log("working")
  });
});
// drawerFront.addEventListener("click", () => {moveDrawer("close")})
