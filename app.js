import { createFoundationReadyPromise } from "./asset-loader.js";
import { getPageProgress, getScrollConfig, localProgress } from "./progress.js";
import { storySections } from "./story.js";
import {
  curtainTransition,
  isTransitionLocked,
  setTransitionContext,
  staticTransition,
  transition,
  transitionEl,
  transitionReverse
} from "./transitions.js";
import {
  activateObjectSection,
  animateDrawingTextIn,
  animateDrawingTextOut,
  animateOpeningIn,
  collectSections,
  deactivateObjectSection,
  handleObjectPointer,
  handlePointerMove,
  handleStackPointer,
  hideSection,
  initDrawingSection,
  initEditorialSection,
  initHero,
  initObjectSection,
  initStackSection,
  prepareDrawingPaths,
  resetDrawingPaths,
  resetEditorialSection,
  resetObjectPointer,
  resetStackSection,
  resizeFoundation,
  setActiveSection,
  setCursorWord,
  showEditorialSection,
  showSection,
  startEndingAnimation,
  updateObjectVelocity,
  updateStackSection
} from "./sections.js";

const isMobile = window.innerWidth <= 768;
const { bodyHeight, ranges } = getScrollConfig(isMobile);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let lenis = null;
let lastScrollY = 0;
let drawingShown = false;
let editorialShown = false;
let objectShown = false;
let stackShown = false;
let endingShown = false;
let openingShown = true;

document.body.style.height = bodyHeight;
document.documentElement.style.scrollBehavior = "auto";
window.scrollTo(0, 0);

if (window.gsap && window.SplitText) {
  window.gsap.registerPlugin(window.SplitText);
}

if (window.Lenis && !prefersReducedMotion.matches) {
  lenis = new window.Lenis({
    lerp: 0.08,
    smoothWheel: true,
    touchMultiplier: 1.2
  });
  lenis.stop();
  window.lenis = lenis;
}

setTransitionContext({ lenis, isMobile });
collectSections();
setActiveSection("opening");
setCursorWord(storySections[0].cursor);
initHero({ isMobile });
initDrawingSection();
initEditorialSection();
initObjectSection({ isMobile });
initStackSection();

function raf(time) {
  if (lenis) lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

function setHeroVisibility(visible) {
  const canvas = document.getElementById("hero-canvas");
  const opening = document.getElementById("opening");
  if (canvas) canvas.style.visibility = visible ? "visible" : "hidden";
  if (opening) {
    opening.style.opacity = visible ? "1" : "0";
    opening.style.pointerEvents = visible ? "auto" : "none";
  }
}

function handleScroll() {
  const currentY = window.scrollY;
  updateObjectVelocity(currentY - lastScrollY);
  lastScrollY = currentY;

  const progress = getPageProgress();

  if (isTransitionLocked()) return;

  if (progress > ranges.openingToDrawing && !drawingShown) {
    drawingShown = true;
    openingShown = false;
    transition(() => {
      setHeroVisibility(false);
      showSection("section-2");
      prepareDrawingPaths();
      animateDrawingTextIn();
    });
  }

  if (progress > ranges.drawingToEditorial && drawingShown && !editorialShown && !objectShown) {
    editorialShown = true;
    const drawing = document.getElementById("section-2");
    const editorial = document.getElementById("section-3");
    transitionEl(drawing, editorial, () => {
      hideSection("section-2");
      showSection("section-3");
      animateDrawingTextOut();
      showEditorialSection();
    });
  }

  if (progress < ranges.drawingToEditorial - 0.05 && editorialShown && !objectShown) {
    editorialShown = false;
    const drawing = document.getElementById("section-2");
    const editorial = document.getElementById("section-3");
    transitionEl(editorial, drawing, () => {
      hideSection("section-3");
      showSection("section-2");
      resetEditorialSection();
      animateDrawingTextIn();
    });
  }

  if (progress > ranges.editorialToObject && editorialShown && !objectShown) {
    objectShown = true;
    staticTransition(() => {
      hideSection("section-3");
      showSection("section-6");
      activateObjectSection();
    });
  }

  if (progress < ranges.editorialToObject - 0.05 && objectShown && !stackShown) {
    objectShown = false;
    deactivateObjectSection();
    const objectSection = document.getElementById("section-6");
    const editorial = document.getElementById("section-3");
    transitionEl(objectSection, editorial, () => {
      hideSection("section-6");
      showSection("section-3");
      showEditorialSection();
    });
  }

  if (progress > ranges.objectToStack && objectShown && !stackShown) {
    stackShown = true;
    deactivateObjectSection();
    staticTransition(() => {
      hideSection("section-6");
      showSection("section-7");
      resetStackSection();
    });
  }

  if (progress < ranges.objectToStack - 0.05 && stackShown && !endingShown) {
    stackShown = false;
    const stack = document.getElementById("section-7");
    const objectSection = document.getElementById("section-6");
    transitionEl(stack, objectSection, () => {
      hideSection("section-7");
      showSection("section-6");
      resetStackSection();
      activateObjectSection();
    });
  }

  if (stackShown && !endingShown) {
    updateStackSection(localProgress(progress, ranges.objectToStack, ranges.stackToEnding));
  }

  if (progress > ranges.stackToEnding && !endingShown) {
    endingShown = true;
    curtainTransition(() => {
      document.querySelectorAll(".story-section").forEach((section) => {
        section.style.opacity = "0";
        section.style.pointerEvents = "none";
        section.setAttribute("aria-hidden", "true");
        section.classList.remove("is-active");
      });
      const cursor = document.getElementById("cursor-text");
      if (cursor) cursor.style.display = "none";
      const canvas = document.getElementById("hero-canvas");
      if (canvas) canvas.style.visibility = "hidden";
      showSection("section-8");
      startEndingAnimation();
    });
  }

  if (progress < ranges.stackToEnding - 0.05 && endingShown) {
    endingShown = false;
    curtainTransition(() => {
      hideSection("section-8");
      showSection("section-7");
      const cursor = document.getElementById("cursor-text");
      if (cursor) cursor.style.display = "";
    });
  }

  if (progress < ranges.openingToDrawing - 0.05 && !openingShown) {
    openingShown = true;
    drawingShown = false;
    transitionReverse(() => {
      hideSection("section-2");
      setHeroVisibility(true);
      setActiveSection("opening");
      resetDrawingPaths();
      animateDrawingTextOut();
    });
  }
}

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", resizeFoundation, { passive: true });
window.addEventListener("mousemove", handlePointerMove, { passive: true });

const objectSection = document.getElementById("section-6");
if (objectSection) {
  objectSection.addEventListener("mousemove", handleObjectPointer, { passive: true });
  objectSection.addEventListener("mouseleave", resetObjectPointer, { passive: true });
}

const stackSection = document.getElementById("section-7");
if (stackSection) {
  stackSection.addEventListener("mousemove", handleStackPointer, { passive: true });
  stackSection.addEventListener("touchmove", (event) => {
    if (!event.touches[0]) return;
    handleStackPointer(event.touches[0]);
  }, { passive: true });
}

window.__foundationState = {
  get activeSection() {
    return window.__foundationActiveSection || "opening";
  },
  get progress() {
    return getPageProgress();
  },
  ranges
};

if (window._loaderSetReadyPromise) {
  window._loaderSetReadyPromise(createFoundationReadyPromise());
}

window._onLoaderHidden = () => {
  document.body.style.overflow = "";
  if (lenis) lenis.start();
  animateOpeningIn();
};
