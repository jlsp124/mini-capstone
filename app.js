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
const motionParams = new URLSearchParams(window.location.search);
const forceNoGsap = motionParams.get("forceNoGsap") === "1";
const forceReducedMotion = motionParams.get("forceReducedMotion") === "1";
const forceMotion = motionParams.get("forceMotion") === "1";
const reducedMotion = !forceMotion && (forceReducedMotion || reducedMotionQuery.matches);
document.documentElement.classList.toggle("force-motion", forceMotion);
const gsapAvailable = !forceNoGsap && Boolean(window.gsap?.timeline);
const splitTextAvailable = gsapAvailable && typeof window.SplitText === "function";

let isMobile = mobileQuery.matches;
let progressModel = buildProgressTimeline(storyBeats, { isMobile, unitVh: scrollUnitVh });
let lenis = null;
let lastScrollY = 0;
let beatLabelTimer = null;

function setBeatLabel(entry) {
  const label = document.getElementById("beat-label");
  if (!label) return;
  window.clearTimeout(beatLabelTimer);
  label.classList.remove("is-visible");
  if (!entry || entry.index === 0) {
    label.textContent = "";
    return;
  }
  const cue = (entry.phase && entry.phase !== "default" ? entry.phase : entry.sectionId)
    .replace(/-/g, " ")
    .toUpperCase();
  label.textContent = `${entry.act} / ${cue}`;
  void label.offsetWidth;
  label.classList.add("is-visible");
  beatLabelTimer = window.setTimeout(() => label.classList.remove("is-visible"), 2200);
}

function getTransitionMode() {
  if (reducedMotion) return "reduced-motion";
  if (isMobile) return "mobile";
  return gsapAvailable ? "gsap-desktop" : "waapi-desktop-fallback";
}

const motionDiagnostics = {};
let getTimelineDiagnostics = () => ({
  currentBeat: null,
  revealProgress: reducedMotion ? 1 : 0,
  revealComplete: reducedMotion,
  queuedBeat: null,
  transitioning: false
});
Object.defineProperties(motionDiagnostics, {
  isMobile: { enumerable: true, get: () => isMobile },
  reducedMotion: { enumerable: true, get: () => reducedMotion },
  gsapAvailable: { enumerable: true, get: () => gsapAvailable },
  splitTextAvailable: { enumerable: true, get: () => splitTextAvailable },
  transitionMode: { enumerable: true, get: getTransitionMode },
  currentBeat: { enumerable: true, get: () => getTimelineDiagnostics().currentBeat },
  revealProgress: { enumerable: true, get: () => getTimelineDiagnostics().revealProgress },
  revealComplete: { enumerable: true, get: () => getTimelineDiagnostics().revealComplete },
  queuedBeat: { enumerable: true, get: () => getTimelineDiagnostics().queuedBeat },
  transitioning: { enumerable: true, get: () => getTimelineDiagnostics().transitioning }
});
Object.freeze(motionDiagnostics);
Object.defineProperty(window, "__motionDiagnostics", {
  configurable: false,
  enumerable: false,
  writable: false,
  value: motionDiagnostics
});
console.info(`Motion mode: ${getTransitionMode()}`);

document.documentElement.style.scrollBehavior = "auto";
document.body.style.height = progressModel.bodyHeight;
window.scrollTo(0, 0);

if (gsapAvailable && splitTextAvailable) {
  window.gsap.registerPlugin(window.SplitText);
}

if (window.Lenis && !reducedMotion) {
  lenis = new window.Lenis({
    lerp: 0.08,
    smoothWheel: true,
    touchMultiplier: 1.2
  });
  lenis.stop();
  window.lenis = lenis;
}

setTransitionContext({ lenis, isMobile, gsapAvailable, reducedMotion });

const controllers = createSectionControllers({
  isMobile,
  prefersReducedMotion: reducedMotion,
  gsapAvailable,
  splitTextAvailable
});

const timeline = createTimelineController({
  entries: progressModel.entries,
  controllers,
  transitionRunner: runRegisteredTransition,
  setCursorWord,
  showOnlySection,
  getSectionElement,
  setBeatLabel,
  prefersReducedMotion: reducedMotion,
  getIsMobile: () => isMobile
});

getTimelineDiagnostics = () => {
  const state = timeline.getState();
  return {
    currentBeat: state.currentBeat?.key || null,
    revealProgress: state.revealProgress,
    revealComplete: state.revealComplete,
    queuedBeat: state.queuedBeat?.key || null,
    transitioning: state.transitioning
  };
};

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
  setTransitionContext({ lenis, isMobile, gsapAvailable, reducedMotion });
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
  get currentBeat() {
    return getTimelineDiagnostics().currentBeat;
  },
  get revealProgress() {
    return getTimelineDiagnostics().revealProgress;
  },
  get revealComplete() {
    return getTimelineDiagnostics().revealComplete;
  },
  get queuedBeat() {
    return getTimelineDiagnostics().queuedBeat;
  },
  get transitioning() {
    return getTimelineDiagnostics().transitioning;
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
