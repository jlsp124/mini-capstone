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
let navigationTargetIndex = null;
let navigationOriginIndex = null;
let readerActive = false;

function setBeatLabel(entry) {
  document.documentElement.dataset.currentBeat = entry?.key || "";
  document.documentElement.dataset.currentBeatIndex = Number.isInteger(entry?.index) ? String(entry.index) : "";
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

const storyStage = document.getElementById("story-stage");
const previousButton = document.getElementById("story-previous");
const nextButton = document.getElementById("story-next");
const readerToggle = document.getElementById("reader-toggle");
const readerModeElement = document.getElementById("reader-mode");
const readerClose = document.getElementById("reader-close");

function setReaderMode(active, { updateUrl = true } = {}) {
  if (!readerModeElement || readerActive === active) return;
  readerActive = active;

  if (active) {
    if (lenis) lenis.stop();
    document.body.classList.add("is-reader-mode");
    readerModeElement.hidden = false;
    readerModeElement.scrollTop = 0;
    storyStage?.setAttribute("inert", "");
    readerClose?.focus({ preventScroll: true });
  } else {
    document.body.classList.remove("is-reader-mode");
    readerModeElement.hidden = true;
    storyStage?.removeAttribute("inert");
    if (lenis) lenis.start();
    updateTimeline();
    readerToggle?.focus({ preventScroll: true });
  }

  if (updateUrl) {
    const url = new URL(window.location.href);
    if (active) url.searchParams.set("mode", "reader");
    else url.searchParams.delete("mode");
    window.history.pushState({ reader: active }, "", url);
  }
}

function getNavigationState() {
  const state = timeline.getState();
  return {
    ...state,
    busy: state.transitioning || !state.revealComplete
  };
}

function scrollToBeat(index) {
  const targetIndex = Math.max(0, Math.min(progressModel.entries.length - 1, index));
  const entry = progressModel.entries[targetIndex];
  if (!entry) return;
  const progress = targetIndex === 0 ? 0 : entry.start + (entry.end - entry.start) * 0.08;
  const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
  const targetY = progress * maxScroll;
  if (lenis) lenis.scrollTo(targetY, { immediate: true, force: true });
  else window.scrollTo({ top: targetY, behavior: "auto" });
  updateTimeline();
}

function requestStoryBeat(index) {
  const targetIndex = Math.max(0, Math.min(progressModel.entries.length - 1, index));
  const state = getNavigationState();
  if (navigationOriginIndex === null || !state.busy) navigationOriginIndex = state.currentIndex;
  navigationTargetIndex = targetIndex;
  scrollToBeat(targetIndex);
}

function requestRelativeBeat(delta) {
  const state = getNavigationState();
  const baseIndex = state.busy && navigationOriginIndex !== null
    ? navigationOriginIndex
    : state.currentIndex;
  requestStoryBeat(baseIndex + delta);
}

function syncNavigationControls() {
  const state = getNavigationState();
  if (!state.busy && navigationTargetIndex === state.currentIndex) {
    navigationTargetIndex = null;
    navigationOriginIndex = null;
  }
  const effectiveIndex = navigationTargetIndex ?? state.currentIndex;
  const atStart = effectiveIndex <= 0;
  const atEnd = effectiveIndex >= progressModel.entries.length - 1;
  if (previousButton) {
    previousButton.disabled = atStart;
    previousButton.setAttribute("aria-hidden", atStart ? "true" : "false");
  }
  if (nextButton) {
    nextButton.disabled = atEnd;
    nextButton.setAttribute("aria-hidden", atEnd ? "true" : "false");
  }
}

function isInteractiveTarget(target) {
  return Boolean(target?.closest?.("input, textarea, select, button, a, [contenteditable='true']"));
}

function storyHasKeyboardFocus() {
  if (readerActive) return false;
  const active = document.activeElement;
  if (isInteractiveTarget(active)) return false;
  return active === document.body
    || active === document.documentElement
    || active === storyStage
    || Boolean(storyStage?.contains(active));
}

function handleStoryKeydown(event) {
  if (event.repeat || !storyHasKeyboardFocus()) return;
  let handled = true;
  switch (event.key) {
    case "ArrowRight":
    case "ArrowDown":
    case "PageDown":
      requestRelativeBeat(1);
      break;
    case "ArrowLeft":
    case "ArrowUp":
    case "PageUp":
      requestRelativeBeat(-1);
      break;
    case " ":
      requestRelativeBeat(event.shiftKey ? -1 : 1);
      break;
    case "Home":
      requestStoryBeat(0);
      break;
    case "End":
      requestStoryBeat(progressModel.entries.length - 1);
      break;
    default:
      handled = false;
  }
  if (handled) event.preventDefault();
}

previousButton?.addEventListener("click", () => requestRelativeBeat(-1));
nextButton?.addEventListener("click", () => requestRelativeBeat(1));
readerToggle?.addEventListener("click", () => setReaderMode(true));
readerClose?.addEventListener("click", () => setReaderMode(false));
window.addEventListener("popstate", () => {
  setReaderMode(new URLSearchParams(window.location.search).get("mode") === "reader", { updateUrl: false });
});
window.addEventListener("keydown", handleStoryKeydown);

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
  if (readerActive) return;
  const currentY = window.scrollY;
  updateObjectVelocity(currentY - lastScrollY);
  lastScrollY = currentY;
  timeline.update(getPageProgress());
}

function raf(time) {
  if (lenis) lenis.raf(time);
  updateTimeline();
  syncNavigationControls();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

function rebuildProgressTimeline() {
  const nextIsMobile = mobileQuery.matches;
  isMobile = nextIsMobile;
  progressModel = buildProgressTimeline(storyBeats, { isMobile, unitVh: scrollUnitVh });
  if (!readerActive) document.body.style.height = progressModel.bodyHeight;
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

if (new URLSearchParams(window.location.search).get("mode") === "reader") {
  setReaderMode(true, { updateUrl: false });
}

window._onLoaderHidden = () => {
  document.body.style.overflow = "";
  if (lenis) lenis.start();
  timeline.revealInitial();
  updateTimeline();
};
