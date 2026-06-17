import { createFoundationReadyPromise } from "./asset-loader.js";
import { buildProgressTimeline, getPageProgress } from "./progress.js";
import { storyBeats, scrollUnitVh } from "./story.js";
import { createTimelineController } from "./timeline.js";
import { runRegisteredTransition, setTransitionContext } from "./transitions.js";
import {
  createSectionControllers,
  getSectionElement,
  handlePointerMove,
  resizeFoundation,
  setCursorWord,
  showOnlySection,
  updateObjectVelocity
} from "./sections.js";

const mobileQuery = window.matchMedia("(max-width: 768px)");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

let isMobile = mobileQuery.matches;
let progressModel = buildProgressTimeline(storyBeats, { isMobile, unitVh: scrollUnitVh });
let lenis = null;
let lastScrollY = 0;

document.documentElement.style.scrollBehavior = "auto";
document.body.style.height = progressModel.bodyHeight;
window.scrollTo(0, 0);

if (window.gsap && window.SplitText) {
  window.gsap.registerPlugin(window.SplitText);
}

if (window.Lenis && !reducedMotionQuery.matches) {
  lenis = new window.Lenis({
    lerp: 0.08,
    smoothWheel: true,
    touchMultiplier: 1.2
  });
  lenis.stop();
  window.lenis = lenis;
}

setTransitionContext({ lenis, isMobile });

const controllers = createSectionControllers({
  isMobile,
  prefersReducedMotion: reducedMotionQuery.matches
});

const timeline = createTimelineController({
  entries: progressModel.entries,
  controllers,
  transitionRunner: runRegisteredTransition,
  setCursorWord,
  showOnlySection,
  getSectionElement,
  prefersReducedMotion: reducedMotionQuery.matches
});

timeline.update(getPageProgress());

function updateTimeline() {
  const currentY = window.scrollY;
  updateObjectVelocity(currentY - lastScrollY);
  lastScrollY = currentY;
  timeline.update(getPageProgress());
}

function raf(time) {
  if (lenis) lenis.raf(time);
  updateTimeline();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

function rebuildProgressTimeline() {
  const nextIsMobile = mobileQuery.matches;
  isMobile = nextIsMobile;
  progressModel = buildProgressTimeline(storyBeats, { isMobile, unitVh: scrollUnitVh });
  document.body.style.height = progressModel.bodyHeight;
  setTransitionContext({ lenis, isMobile });
  timeline.setEntries(progressModel.entries);
}

window.addEventListener("scroll", updateTimeline, { passive: true });
window.addEventListener("resize", () => {
  rebuildProgressTimeline();
  resizeFoundation();
  timeline.resize();
}, { passive: true });
window.addEventListener("mousemove", (event) => {
  handlePointerMove(event);
  timeline.pointerMove(event);
}, { passive: true });
window.addEventListener("touchmove", (event) => {
  const touch = event.touches[0];
  if (!touch) return;
  handlePointerMove(touch);
  timeline.pointerMove(touch);
}, { passive: true });

window.__foundationState = {
  get activeSection() {
    return window.__foundationActiveSection || "opening";
  },
  get progress() {
    return getPageProgress();
  },
  get timeline() {
    return timeline.getState();
  },
  get scrollLength() {
    return {
      desktopVh: buildProgressTimeline(storyBeats, { isMobile: false, unitVh: scrollUnitVh }).totalVh,
      mobileVh: buildProgressTimeline(storyBeats, { isMobile: true, unitVh: scrollUnitVh }).totalVh
    };
  }
};

if (window._loaderSetReadyPromise) {
  window._loaderSetReadyPromise(createFoundationReadyPromise());
}

window._onLoaderHidden = () => {
  document.body.style.overflow = "";
  if (lenis) lenis.start();
  timeline.revealInitial();
  updateTimeline();
};
