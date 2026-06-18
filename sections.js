import * as THREE from "three";
import { activateLazyVideo, loadLazyImage, loadLazyImages, pauseLazyVideo } from "./asset-loader.js";

const sectionEls = new Map();
const pointer = { x: 0, y: 0, nx: 0, ny: 0 };

let activeSectionId = "opening";
let currentCursorWord = "";
let heroRenderer = null;
let heroScene = null;
let heroCamera = null;
let heroAnimationStarted = false;
let heroAvailable = false;
let isMobileMode = false;
let reducedMotionMode = false;
let gsapMode = false;
let splitTextMode = false;

let objectRenderer = null;
let objectScene = null;
let objectCamera = null;
let objectModel = null;
let objectActive = false;
let objectVelocity = 0;
let objectLeftY = 0;
let objectRightY = 0;
let objectLeftLoopH = 0;
let objectRightLoopH = 0;
let objectTextInitialized = false;
let objectTiltX = 0;
let objectTiltZ = 0;

let dentalRenderer = null;
let dentalScene = null;
let dentalCamera = null;
let dentalModel = null;
let dentalActive = false;
let dentalLoading = false;
let dentalLoaded = false;
let dentalFailed = false;
let dentalAnimationStarted = false;
let dentalVelocity = 0;
let dentalTiltX = 0;
let dentalTiltZ = 0;

const stackCount = 9;
const stackRotations = [-6, 5, -8, 4, -3, 7, -5, 3, 0];
const stackOffsets = [
  { x: 8, y: -12 },
  { x: -10, y: 8 },
  { x: 6, y: -8 },
  { x: -8, y: 12 },
  { x: 12, y: -6 },
  { x: -6, y: 8 },
  { x: 4, y: -4 },
  { x: -4, y: 4 },
  { x: 0, y: 0 }
];
let stackStarts = [];
let stackTriggered = new Array(stackCount).fill(false);
let stackReady = false;
let stackClimaxDone = false;

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const easeOut = (value) => 1 - Math.pow(1 - clamp01(value), 3);
const easeIn = (value) => Math.pow(clamp01(value), 3);
const getGsap = () => (gsapMode ? window.gsap : null);

function rangeProgress(value, start, end) {
  return clamp01((value - start) / Math.max(0.0001, end - start));
}

function stageValue(progress, enterStart, enterEnd, exitStart, exitEnd) {
  if (progress < enterStart) return 0;
  if (progress < enterEnd) return easeOut(rangeProgress(progress, enterStart, enterEnd));
  if (progress > exitStart) return 1 - easeIn(rangeProgress(progress, exitStart, exitEnd));
  return 1;
}

function setElementVisible(element, value, enterY = 44, exitY = -34) {
  if (!element) return;
  const opacity = clamp01(value);
  const y = value <= 0 ? enterY : value >= 1 ? 0 : enterY * (1 - value);
  element.style.opacity = String(opacity);
  element.style.transform = `translate3d(0, ${y}px, 0)`;
  if (opacity === 0 && exitY) {
    element.style.transform = `translate3d(0, ${enterY}px, 0)`;
  }
}

function splitLine(element) {
  if (!element || element.dataset.split === "true") return;
  const text = element.textContent;
  element.dataset.originalText = text;
  element.setAttribute("aria-label", text);
  element.innerHTML = text.split(" ").map((word) => (
    `<span class="word-mask" aria-hidden="true"><span class="sparse-word">${word}</span></span>`
  )).join(" ");
  element.dataset.split = "true";
}

function setSplitProgress(element, progress) {
  if (!element) return;
  splitLine(element);
  const words = element.querySelectorAll(".sparse-word");
  const eased = easeOut(progress);
  words.forEach((word, index) => {
    const offset = clamp01((eased * (words.length + 2) - index) / 2);
    word.style.transform = `translate3d(0, ${(1 - offset) * 110}%, 0)`;
    word.style.opacity = String(offset);
  });
}

function setSplitExit(element, progress, minimumOpacity = 0.8) {
  if (!element) return;
  const exit = easeIn(progress);
  element.style.opacity = String(1 - (1 - minimumOpacity) * exit);
  element.style.transform = `translate3d(0, ${-18 * exit}px, 0)`;
}

export function collectSections() {
  sectionEls.clear();
  document.querySelectorAll(".story-section").forEach((section) => {
    sectionEls.set(section.id, section);
  });
}

export function getSectionElement(id) {
  return sectionEls.get(id) || document.getElementById(id);
}

export function showOnlySection(id) {
  activeSectionId = id;
  const corners = [...document.querySelectorAll(".opening-corner")];
  if (id !== "opening") {
    if (getGsap()) getGsap().killTweensOf(corners);
    corners.forEach((corner) => {
      corner.style.opacity = "0";
      corner.style.transform = "";
      corner.setAttribute("aria-hidden", "true");
    });
  }
  sectionEls.forEach((section, sectionId) => {
    const active = sectionId === id;
    if (active) section.hidden = false;
    if (!active && section.dataset.templateReserve === "true") section.hidden = true;
    section.classList.toggle("is-active", active);
    section.setAttribute("aria-hidden", active ? "false" : "true");
    section.style.opacity = active ? "1" : "0";
    section.style.pointerEvents = active ? "auto" : "none";
  });
  window.__foundationActiveSection = id;
}

export function showSection(id) {
  const section = getSectionElement(id);
  if (!section) return;
  section.hidden = false;
  section.style.opacity = "1";
  section.style.pointerEvents = "auto";
  section.setAttribute("aria-hidden", "false");
  section.classList.add("is-active");
}

export function hideSection(id) {
  const section = getSectionElement(id);
  if (!section) return;
  section.style.opacity = "0";
  section.style.pointerEvents = "none";
  section.setAttribute("aria-hidden", "true");
  section.classList.remove("is-active");
  if (section.dataset.templateReserve === "true") section.hidden = true;
}

export function setCursorWord(word) {
  if (!word || word === currentCursorWord) return;
  currentCursorWord = word;
  const cursorText = document.getElementById("cursor-text");
  if (!cursorText) return;
  cursorText.textContent = word;
}

export function setCursorHidden(hidden) {
  const cursorText = document.getElementById("cursor-text");
  if (!cursorText) return;
  cursorText.dataset.hidden = hidden ? "true" : "false";
  if (hidden) cursorText.style.opacity = "0";
}

export function handlePointerMove(event) {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  pointer.nx = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.ny = (event.clientY / window.innerHeight) * 2 - 1;
  document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);

  const cursorText = document.getElementById("cursor-text");
  if (cursorText) {
    cursorText.style.left = `${event.clientX}px`;
    cursorText.style.top = `${event.clientY}px`;
    cursorText.style.opacity = currentCursorWord && cursorText.dataset.hidden !== "true" ? "1" : "0";
  }
}

export function updateObjectVelocity(deltaY) {
  if (objectActive) objectVelocity = Math.min(Math.abs(deltaY) / 20, 3);
  if (dentalActive) dentalVelocity = Math.min(Math.abs(deltaY) / 20, 3);
}

function initHero({ isMobile }) {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  try {
    heroScene = new THREE.Scene();
    heroScene.background = new THREE.Color(0xcc0000);
    heroCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    heroCamera.position.set(0, 0, isMobile ? 11 : 7);
    heroRenderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      canvas,
      powerPreference: "high-performance"
    });
    heroRenderer.setSize(window.innerWidth, window.innerHeight);
    heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2));
    heroRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    heroRenderer.toneMappingExposure = 1.5;
    heroAvailable = true;
  } catch (error) {
    heroAvailable = false;
    canvas.classList.add("canvas-fallback");
  }

  if (!heroAnimationStarted) {
    heroAnimationStarted = true;
    animateHero();
  }
}

function animateHero() {
  requestAnimationFrame(animateHero);
  if (!heroAvailable || !heroRenderer || !heroScene || !heroCamera) return;
  heroCamera.rotation.x += (-pointer.ny * 0.015 - heroCamera.rotation.x) * 0.04;
  heroCamera.rotation.y += (pointer.nx * 0.02 - heroCamera.rotation.y) * 0.04;
  heroRenderer.render(heroScene, heroCamera);
}

function setHeroVisible(visible) {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  canvas.style.visibility = visible ? "visible" : "hidden";
  canvas.style.opacity = visible ? "1" : "0";
}

function setOpeningPointerVars() {
  document.documentElement.style.setProperty("--opening-title-x", `${pointer.nx * 16}px`);
  document.documentElement.style.setProperty("--opening-title-y", `${pointer.ny * 12}px`);
}

function createOpeningController() {
  const title = document.getElementById("opening-title");
  const corners = [...document.querySelectorAll(".opening-corner")];
  let revealed = false;

  function setOpeningOpacity(value) {
    const opacity = clamp01(value);
    if (title) title.style.opacity = String(opacity);
    corners.forEach((corner) => { corner.style.opacity = String(opacity); });
  }

  return {
    init() {
      setHeroVisible(true);
      if (!title) return;
      if (getGsap() && !reducedMotionMode) {
        getGsap().set([title, ...corners], { opacity: 0, y: 80 });
      } else {
        setOpeningOpacity(1);
      }
      setOpeningPointerVars();
    },
    enter() {
      setHeroVisible(true);
      showOnlySection("opening");
      corners.forEach((corner) => corner.setAttribute("aria-hidden", "false"));
      if (reducedMotionMode) {
        revealed = true;
        setOpeningOpacity(1);
      }
    },
    reveal() {
      if (revealed || !title) return;
      revealed = true;
      if (getGsap() && !reducedMotionMode) {
        getGsap().to(corners, { opacity: 1, y: 0, duration: 1.2, stagger: 0.08, ease: "power4.out" });
        getGsap().fromTo(title, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.8, ease: "power4.out" });
      } else {
        setOpeningOpacity(1);
      }
    },
    update({ localProgress, revealProgress = localProgress }) {
      const exit = easeIn(rangeProgress(localProgress, 0.74, 0.96));
      if (exit > 0 && getGsap()) getGsap().killTweensOf([title, ...corners]);
      const visible = 1 - exit * 0.2;
      if (revealed || reducedMotionMode) setOpeningOpacity(visible);
      document.documentElement.style.setProperty("--opening-title-exit-y", `${-24 * exit}px`);
      if (title) title.style.filter = exit > 0 ? `blur(${exit * 1.2}px)` : "";
      corners.forEach((corner, index) => {
        const sign = index < 2 ? -1 : 1;
        corner.style.transform = `translate3d(0, ${sign * 14 * exit}px, 0)`;
      });
    },
    prepareExit() {
      if (getGsap()) getGsap().killTweensOf([title, ...corners]);
    },
    exit() {
      if (getGsap()) getGsap().killTweensOf([title, ...corners]);
      setOpeningOpacity(0);
      if (title) title.style.filter = "";
      document.documentElement.style.setProperty("--opening-title-exit-y", "0px");
      corners.forEach((corner) => { corner.style.transform = ""; });
    },
    pointerMove() {
      setOpeningPointerVars();
    },
    resize() {
      resizeHeroRenderer();
    }
  };
}

function createOpeningInterludeController() {
  const sentence = document.getElementById("opening-interlude-text");

  return {
    init() {
      splitLine(sentence);
      setSplitProgress(sentence, 0);
    },
    enter() {
      setHeroVisible(false);
      showOnlySection("opening-interlude");
      if (sentence) {
        sentence.style.opacity = "1";
        sentence.style.transform = "translate3d(0, 0, 0)";
      }
    },
    update({ localProgress, revealProgress = localProgress }) {
      if (reducedMotionMode) {
        setSplitProgress(sentence, 1);
        if (sentence) sentence.style.opacity = "1";
        return;
      }
      setSplitProgress(sentence, rangeProgress(revealProgress, 0, 0.2));
      setSplitExit(sentence, rangeProgress(localProgress, 0.72, 1));
    },
    exit() {
      if (!sentence) return;
      sentence.style.opacity = "0";
      sentence.style.transform = "translate3d(0, -18px, 0)";
    }
  };
}

function createProjectLogController() {
  const section = document.getElementById("project-log");
  const inner = document.getElementById("project-log-inner");
  const headline = document.getElementById("project-log-headline");
  const body = document.getElementById("project-log-body");
  const imageWrap = document.getElementById("project-log-image-wrap");
  const image = document.getElementById("project-log-image");
  const caption = document.getElementById("project-log-caption");
  const masthead = section?.querySelector(".paper-masthead");
  const headlineText = headline?.dataset.typeText || "";

  return {
    init() {
      if (headline) headline.textContent = "";
      if (image) {
        image.dataset.fallbackSrc = "assets/personal/github-contributions.png";
      }
      [body, caption, imageWrap, masthead].forEach((element) => {
        if (!element) return;
        element.style.opacity = "0";
      });
      if (inner) {
        inner.style.opacity = "0";
        inner.style.transform = "scale(0.2) rotate(18deg)";
      }
    },
    enter() {
      setHeroVisible(false);
      showOnlySection("project-log");
      if (headline) headline.textContent = "";
      loadLazyImage(image);
    },
    update({ localProgress, revealProgress = localProgress }) {
      const entrance = reducedMotionMode ? 1 : easeOut(rangeProgress(revealProgress, 0, 0.15));
      if (inner) {
        inner.style.opacity = String(entrance);
        inner.style.transform = `scale(${0.2 + 0.8 * entrance}) rotate(${18 * (1 - entrance)}deg)`;
      }
      if (masthead) masthead.style.opacity = String(entrance);

      const reveal = reducedMotionMode ? 1 : rangeProgress(revealProgress, 0.1, 0.38);
      if (headline) {
        const count = Math.ceil(headlineText.length * reveal);
        headline.textContent = headlineText.slice(0, count);
      }

      setElementVisible(body, reducedMotionMode ? 1 : rangeProgress(revealProgress, 0.25, 0.5), 24);
      const imageProgress = reducedMotionMode ? 1 : rangeProgress(revealProgress, 0.0, 0.62);
      if (imageWrap) {
        imageWrap.style.opacity = String(easeOut(imageProgress));
        imageWrap.style.transform = `translate3d(${(1 - easeOut(imageProgress)) * 42}px, 0, 0) scale(${1.06 - 0.06 * easeOut(imageProgress)})`;
      }
      setElementVisible(caption, reducedMotionMode ? 1 : rangeProgress(revealProgress, 0.42, 0.62), 20);

      const exit = reducedMotionMode ? 0 : easeIn(rangeProgress(localProgress, 0.88, 1));
      if (inner) {
        inner.style.filter = exit > 0 ? `blur(${exit * 2}px)` : "";
        inner.style.opacity = String(Math.max(0, entrance * (1 - exit * 0.18)));
        if (exit > 0) inner.style.transform = `scale(${1 - exit * 0.015}) rotate(0deg)`;
      }
    },
    exit() {
      if (headline) headline.textContent = headlineText;
    },
    pointerMove(event) {
      if (!imageWrap || reducedMotionMode) return;
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;
      imageWrap.style.setProperty("--image-shift-x", `${nx * 12}px`);
      imageWrap.style.setProperty("--image-shift-y", `${ny * 9}px`);
    }
  };
}

function createProjectsInterludeController() {
  const line1 = document.getElementById("projects-interlude-line-1");
  const line2 = document.getElementById("projects-interlude-line-2");

  return {
    init() {
      splitLine(line1);
      splitLine(line2);
      setSplitProgress(line1, 0);
      setSplitProgress(line2, 0);
    },
    enter() {
      setHeroVisible(false);
      showOnlySection("projects-interlude");
      [line1, line2].forEach((line) => {
        if (!line) return;
        line.style.opacity = "1";
        line.style.transform = "translate3d(0, 0, 0)";
      });
    },
    update({ localProgress, revealProgress = localProgress }) {
      if (reducedMotionMode) {
        setSplitProgress(line1, 1);
        setSplitProgress(line2, 1);
        return;
      }
      setSplitProgress(line1, rangeProgress(revealProgress, 0, 0.2));
      setSplitProgress(line2, rangeProgress(revealProgress, 0.44, 0.62));
    },
    exit() {
      setSplitProgress(line1, 1);
      setSplitProgress(line2, 1);
    }
  };
}

function createSparseQuoteController(sectionId, textId) {
  const sentence = document.getElementById(textId);

  return {
    init() {
      splitLine(sentence);
      setSplitProgress(sentence, 0);
    },
    enter() {
      setHeroVisible(false);
      showOnlySection(sectionId);
      if (sentence) {
        sentence.style.opacity = "1";
        sentence.style.transform = "translate3d(0, 0, 0)";
      }
    },
    update({ localProgress, revealProgress = localProgress }) {
      if (reducedMotionMode) {
        setSplitProgress(sentence, 1);
        if (sentence) sentence.style.opacity = "1";
        return;
      }
      setSplitProgress(sentence, rangeProgress(revealProgress, 0.04, 0.28));
      setSplitExit(sentence, rangeProgress(localProgress, 0.78, 1), 0.7);
    },
    exit() {
      if (!sentence) return;
      sentence.style.opacity = "0";
      sentence.style.transform = "translate3d(0, -18px, 0)";
    }
  };
}

function createMusicProductionController() {
  const section = document.getElementById("music-production");
  const media = document.getElementById("music-production-media");
  const poster = document.getElementById("music-production-poster");
  const video = document.getElementById("music-production-video");
  const paragraphs = [1, 2, 3].map((index) => document.getElementById(`music-production-paragraph-${index}`));
  let active = false;

  return {
    init() {
      [media, ...paragraphs].forEach((element) => setElementVisible(element, 0, 34));
    },
    enter() {
      active = true;
      setHeroVisible(false);
      showOnlySection("music-production");
      loadLazyImages(section).then(() => {
        if (active && !reducedMotionMode) activateLazyVideo(video, poster);
      });
    },
    update({ localProgress, revealProgress = localProgress }) {
      const progress = reducedMotionMode ? 1 : revealProgress;
      setElementVisible(media, rangeProgress(progress, 0, 0.18), 26);
      setElementVisible(paragraphs[0], rangeProgress(progress, 0.12, 0.32), 34);
      setElementVisible(paragraphs[1], rangeProgress(progress, 0.36, 0.56), 34);
      setElementVisible(paragraphs[2], rangeProgress(progress, 0.62, 0.82), 34);
      if (media) {
        const drift = reducedMotionMode ? 0 : (progress - 0.5) * -16;
        media.style.setProperty("--media-drift", `${drift}px`);
      }
    },
    exit() {
      active = false;
      pauseLazyVideo(video);
    }
  };
}

function createMusicOpportunityController() {
  const section = document.getElementById("music-opportunity");
  const visual = document.getElementById("music-opportunity-visual");
  const paragraphs = [1, 2, 3].map((index) => document.getElementById(`music-opportunity-paragraph-${index}`));

  return {
    init() {
      [visual, ...paragraphs].forEach((element) => setElementVisible(element, 0, 38));
    },
    enter() {
      setHeroVisible(false);
      showOnlySection("music-opportunity");
      loadLazyImages(section);
    },
    update({ localProgress, revealProgress = localProgress }) {
      const progress = reducedMotionMode ? 1 : revealProgress;
      setElementVisible(visual, rangeProgress(progress, 0, 0.22), 28);
      setElementVisible(paragraphs[0], rangeProgress(progress, 0.1, 0.3), 34);
      setElementVisible(paragraphs[1], rangeProgress(progress, 0.34, 0.54), 34);
      setElementVisible(paragraphs[2], rangeProgress(progress, 0.58, 0.8), 34);
      if (visual && !reducedMotionMode) {
        visual.style.transform = `translate3d(0, ${(0.5 - progress) * 18}px, 0) rotate(${(progress - 0.5) * 1.4}deg)`;
      }
    }
  };
}

function createPhotographySequenceController() {
  const section = document.getElementById("photography-sequence");
  const phases = section ? [...section.querySelectorAll(".photography-phase")] : [];
  let activePhase = "sunglasses";

  function setPhase(phase, localProgress = 0) {
    activePhase = phase;
    if (section) section.dataset.phase = phase;
    const activeIndex = phases.findIndex((item) => item.dataset.photoPhase === phase);
    phases.forEach((item, index) => {
      const active = index === activeIndex;
      item.classList.toggle("is-current", active);
      item.setAttribute("aria-hidden", active ? "false" : "true");
      item.style.pointerEvents = active ? "auto" : "none";
      const image = item.querySelector("img[data-src]");
      if (active || index === activeIndex + 1) loadLazyImage(image);
      if (!active) {
        const offset = index < activeIndex ? -105 : 105;
        item.style.opacity = "0";
        item.style.transform = `translate3d(${offset}%, 0, 0) rotate(${offset < 0 ? -2 : 2}deg)`;
      }
    });
    updatePhase(localProgress);
  }

  function updatePhase(localProgress) {
    const current = phases.find((item) => item.dataset.photoPhase === activePhase);
    if (!current) return;
    const progress = reducedMotionMode ? 1 : localProgress;
    const entrance = easeOut(rangeProgress(progress, 0, 0.2));
    const copy = current.querySelector(".photography-copy");
    const imageFrame = current.querySelector(".photography-image-frame");
    current.style.opacity = String(entrance);
    current.style.transform = `translate3d(${(1 - entrance) * 12}%, 0, 0) rotate(${(1 - entrance) * 1.2}deg)`;
    if (imageFrame) {
      const scale = 1.055 - progress * 0.035;
      imageFrame.style.transform = `scale(${scale}) translate3d(0, ${(0.5 - progress) * 10}px, 0)`;
    }
    setElementVisible(copy, rangeProgress(progress, 0.18, 0.42), 34);
  }

  return {
    init() {
      setPhase("sunglasses", 0);
    },
    enter({ beat, localProgress }) {
      setHeroVisible(false);
      showOnlySection("photography-sequence");
      setPhase(beat.phase, localProgress);
    },
    changePhase({ phase, localProgress }) {
      setPhase(phase, localProgress);
    },
    update({ beat, localProgress, revealProgress = localProgress }) {
      if (beat.phase !== activePhase) setPhase(beat.phase, localProgress);
      updatePhase(revealProgress);
    },
    pointerMove(event) {
      if (reducedMotionMode) return;
      const current = phases.find((item) => item.dataset.photoPhase === activePhase);
      const image = current?.querySelector("img");
      if (!image) return;
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;
      image.style.transform = `translate3d(${nx * 8}px, ${ny * 6}px, 0) scale(1.03)`;
    }
  };
}

function createOriginInterludeController() {
  const line1 = document.getElementById("origin-interlude-line-1");
  const line2 = document.getElementById("origin-interlude-line-2");

  return {
    init() {
      [line1, line2].forEach((line) => {
        splitLine(line);
        setSplitProgress(line, 0);
      });
    },
    enter() {
      setHeroVisible(false);
      showOnlySection("origin-interlude");
      [line1, line2].forEach((line) => {
        if (!line) return;
        line.style.opacity = "1";
        line.style.transform = "translate3d(0, 0, 0)";
      });
    },
    update({ localProgress, revealProgress = localProgress }) {
      const progress = reducedMotionMode ? 1 : revealProgress;
      setSplitProgress(line1, rangeProgress(progress, 0, 0.24));
      setSplitProgress(line2, rangeProgress(progress, 0.4, 0.68));
    }
  };
}

function createKindergartenArchiveController() {
  const section = document.getElementById("kindergarten-archive");
  const frame = section?.querySelector(".archive-media-frame");
  const headline = document.getElementById("kindergarten-headline");
  const context = document.getElementById("kindergarten-context");
  const poster = document.getElementById("kindergarten-poster");
  const video = document.getElementById("kindergarten-video");
  let active = false;

  return {
    init() {
      [frame, headline, context].forEach((element) => setElementVisible(element, 0, 38));
    },
    enter() {
      active = true;
      setHeroVisible(false);
      showOnlySection("kindergarten-archive");
      loadLazyImages(section).then(() => {
        if (active && !reducedMotionMode) activateLazyVideo(video, poster);
      });
    },
    update({ localProgress, revealProgress = localProgress }) {
      const progress = reducedMotionMode ? 1 : revealProgress;
      setElementVisible(frame, rangeProgress(progress, 0, 0.22), 26);
      setElementVisible(headline, rangeProgress(progress, 0.18, 0.46), 42);
      setElementVisible(context, rangeProgress(progress, 0.5, 0.72), 28);
    },
    exit() {
      active = false;
      pauseLazyVideo(video);
    }
  };
}

function createOralSurgeryRevealController() {
  const title = document.getElementById("oral-surgery-title");
  const main = document.getElementById("oral-surgery-main");
  const context = document.getElementById("oral-surgery-context");

  return {
    init() {
      [title, main, context].forEach((element) => setElementVisible(element, 0, 54));
    },
    enter() {
      setHeroVisible(false);
      showOnlySection("oral-surgery-reveal");
    },
    update({ localProgress, revealProgress = localProgress }) {
      const progress = reducedMotionMode ? 1 : revealProgress;
      const titleProgress = easeOut(rangeProgress(progress, 0.02, 0.32));
      if (title) {
        title.style.opacity = String(titleProgress);
        title.style.clipPath = `inset(${(1 - titleProgress) * 100}% 0 0 0)`;
        title.style.transform = `translate3d(0, ${(1 - titleProgress) * 56}px, 0)`;
      }
      setElementVisible(main, rangeProgress(progress, 0.36, 0.58), 34);
      setElementVisible(context, rangeProgress(progress, 0.62, 0.82), 28);
    }
  };
}

function createWhyItFitsController() {
  const main = document.getElementById("why-it-fits-main");
  const phrases = [...document.querySelectorAll("#why-it-fits .why-it-fits-phrases span")];

  return {
    init() {
      setElementVisible(main, 0, 44);
      phrases.forEach((phrase) => setElementVisible(phrase, 0, 26));
    },
    enter() {
      setHeroVisible(false);
      showOnlySection("why-it-fits");
    },
    update({ localProgress, revealProgress = localProgress }) {
      const progress = reducedMotionMode ? 1 : revealProgress;
      setElementVisible(main, rangeProgress(progress, 0, 0.25), 42);
      phrases.forEach((phrase, index) => {
        const start = 0.2 + index * 0.085;
        setElementVisible(phrase, rangeProgress(progress, start, start + 0.16), index % 2 ? -24 : 24);
      });
    }
  };
}

function renderDentalFrame() {
  if (!dentalRenderer || !dentalScene || !dentalCamera) return;
  dentalRenderer.render(dentalScene, dentalCamera);
}

function animateDentalModel() {
  requestAnimationFrame(animateDentalModel);
  if (!dentalActive || reducedMotionMode) return;
  dentalVelocity *= 0.9;
  if (dentalModel) {
    dentalModel.rotation.y += 0.004 + dentalVelocity * 0.055;
    dentalModel.rotation.x += (dentalTiltX - dentalModel.rotation.x) * 0.045;
    dentalModel.rotation.z += (dentalTiltZ - dentalModel.rotation.z) * 0.045;
  }
  renderDentalFrame();
}

async function prepareDentalModel() {
  if (dentalLoading || dentalLoaded || dentalFailed) return;
  const canvas = document.getElementById("dental-model-canvas");
  if (!canvas) return;
  dentalLoading = true;

  try {
    dentalScene = new THREE.Scene();
    dentalCamera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
    dentalCamera.position.set(0, 0.15, isMobileMode ? 5.2 : 4.2);
    dentalRenderer = new THREE.WebGLRenderer({
      antialias: !isMobileMode,
      alpha: true,
      canvas,
      powerPreference: "high-performance"
    });
    dentalRenderer.setSize(window.innerWidth, window.innerHeight);
    dentalRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobileMode ? 1 : 2));
    dentalRenderer.setClearColor(0x000000, 0);
    dentalRenderer.outputColorSpace = THREE.SRGBColorSpace;
    dentalRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    dentalRenderer.toneMappingExposure = 1.25;

    const key = new THREE.DirectionalLight(0xffffff, 5.2);
    key.position.set(4, 6, 5);
    const fill = new THREE.DirectionalLight(0xb9d9ff, 2.4);
    fill.position.set(-5, 1, 4);
    const rim = new THREE.DirectionalLight(0xffffff, 3.2);
    rim.position.set(0, -3, -4);
    dentalScene.add(key, fill, rim, new THREE.AmbientLight(0xffffff, 0.8));

    const { STLLoader } = await import("jsm/loaders/STLLoader.js");
    const loader = new STLLoader();
    loader.load(
      "assets/dental/lower-teeth.stl",
      (geometry) => {
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);
        geometry.translate(-center.x, -center.y, -center.z);
        geometry.computeVertexNormals();

        const material = new THREE.MeshPhysicalMaterial({
          color: 0xe9eef1,
          roughness: 0.32,
          metalness: 0.04,
          clearcoat: 0.28,
          clearcoatRoughness: 0.24
        });
        dentalModel = new THREE.Mesh(geometry, material);
        const maxDimension = Math.max(size.x, size.y, size.z) || 1;
        dentalModel.scale.setScalar((isMobileMode ? 2.55 : 3.15) / maxDimension);
        dentalModel.rotation.set(-0.34, -0.4, 0.03);
        dentalScene.add(dentalModel);
        dentalLoaded = true;
        dentalLoading = false;
        document.getElementById("dental-model")?.classList.add("is-model-ready");
        renderDentalFrame();
      },
      undefined,
      () => {
        dentalLoading = false;
        dentalFailed = true;
        document.getElementById("dental-model")?.classList.add("is-model-missing");
        window.__missingAssets = [...new Set([...(window.__missingAssets || []), "assets/dental/lower-teeth.stl"] )];
      }
    );

    if (!dentalAnimationStarted) {
      dentalAnimationStarted = true;
      animateDentalModel();
    }
  } catch (error) {
    dentalLoading = false;
    dentalFailed = true;
    document.getElementById("dental-model")?.classList.add("is-model-missing");
    console.error("Unable to initialize the dental model", error);
  }
}

function resizeDentalRenderer() {
  if (!dentalRenderer || !dentalCamera) return;
  dentalCamera.aspect = window.innerWidth / window.innerHeight;
  dentalCamera.position.z = isMobileMode ? 5.2 : 4.2;
  dentalCamera.updateProjectionMatrix();
  dentalRenderer.setSize(window.innerWidth, window.innerHeight);
  renderDentalFrame();
}

function createDentalScanIntroductionController() {
  const base = createSparseQuoteController("dental-scan-introduction", "dental-scan-introduction-text");
  return {
    ...base,
    enter(args) {
      base.enter(args);
      prepareDentalModel();
    }
  };
}

function createDentalModelController() {
  const paragraphs = [1, 2].map((index) => document.getElementById(`dental-model-paragraph-${index}`));
  const words = [...document.querySelectorAll("#dental-model .dental-model-words span")];

  return {
    init() {
      paragraphs.forEach((paragraph) => setElementVisible(paragraph, 0, 34));
      words.forEach((word) => setElementVisible(word, 0, 22));
    },
    enter() {
      dentalActive = true;
      setHeroVisible(false);
      showOnlySection("dental-model");
      prepareDentalModel();
      renderDentalFrame();
    },
    update({ localProgress, revealProgress = localProgress }) {
      const progress = reducedMotionMode ? 1 : revealProgress;
      setElementVisible(paragraphs[0], rangeProgress(progress, 0.1, 0.32), 34);
      setElementVisible(paragraphs[1], rangeProgress(progress, 0.48, 0.7), 34);
      words.forEach((word, index) => {
        const start = 0.04 + index * 0.095;
        setElementVisible(word, rangeProgress(progress, start, start + 0.16), index % 2 ? -18 : 18);
      });
      if (reducedMotionMode) renderDentalFrame();
    },
    exit() {
      dentalActive = false;
      dentalVelocity = 0;
    },
    pointerMove(event) {
      if (reducedMotionMode) return;
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;
      dentalTiltX = -0.34 + ny * 0.22;
      dentalTiltZ = -nx * 0.14;
    },
    resize: resizeDentalRenderer
  };
}

function createHealthcareOwnershipController() {
  const main = document.getElementById("healthcare-ownership-main");
  const context = document.getElementById("healthcare-ownership-context");
  return {
    init() {
      [main, context].forEach((element) => setElementVisible(element, 0, 46));
    },
    enter() {
      setHeroVisible(false);
      showOnlySection("healthcare-ownership");
    },
    update({ localProgress, revealProgress = localProgress }) {
      const progress = reducedMotionMode ? 1 : revealProgress;
      setElementVisible(main, rangeProgress(progress, 0, 0.34), 44);
      setElementVisible(context, rangeProgress(progress, 0.46, 0.72), 32);
    }
  };
}

function createPracticeSystemController() {
  const main = document.getElementById("practice-system-main");
  const phrases = [...document.querySelectorAll("#practice-system .practice-system-phrases span")];
  return {
    init() {
      setElementVisible(main, 0, 44);
      phrases.forEach((phrase) => setElementVisible(phrase, 0, 24));
    },
    enter() {
      setHeroVisible(false);
      showOnlySection("practice-system");
    },
    update({ localProgress, revealProgress = localProgress }) {
      const progress = reducedMotionMode ? 1 : revealProgress;
      setElementVisible(main, rangeProgress(progress, 0, 0.24), 42);
      phrases.forEach((phrase, index) => {
        const start = 0.18 + index * 0.062;
        setElementVisible(phrase, rangeProgress(progress, start, start + 0.15), index % 2 ? -20 : 20);
      });
    }
  };
}

function createBuildingProjectController() {
  const section = document.getElementById("building-project");
  const images = section ? [...section.querySelectorAll(".building-image")] : [];
  const projectCopy = section?.querySelector('[data-building-copy="project"]');
  const expansionCopy = section?.querySelector('[data-building-copy="expansion"]');
  const headline = document.getElementById("building-project-headline");
  const context = document.getElementById("building-project-context");
  const reflection = document.getElementById("building-project-reflection");
  const expansionMain = document.getElementById("building-expansion-main");
  const expansionContext = document.getElementById("building-expansion-context");
  let phase = "project";

  function applyPhase(nextPhase) {
    phase = nextPhase;
    if (section) section.dataset.phase = phase;
    if (projectCopy) projectCopy.setAttribute("aria-hidden", phase === "project" ? "false" : "true");
    if (expansionCopy) expansionCopy.setAttribute("aria-hidden", phase === "expansion" ? "false" : "true");
  }

  function updateProject(progress) {
    setElementVisible(headline, rangeProgress(progress, 0, 0.16), 36);
    images.forEach((image, index) => {
      if (index > 1) {
        image.style.opacity = "0";
        image.style.zIndex = "";
        return;
      }
      const start = 0.04 + index * 0.17;
      const reveal = easeOut(rangeProgress(progress, start, start + 0.17));
      image.style.opacity = String(reveal);
      image.style.zIndex = String(index + 1);
      image.style.transform = `translate3d(${(1 - reveal) * (index ? 90 : -90)}px, ${(1 - reveal) * 60}px, 0) rotate(${index ? 2.4 : -2.4}deg)`;
    });
    setElementVisible(context, rangeProgress(progress, 0.46, 0.64), 28);
    setElementVisible(reflection, rangeProgress(progress, 0.68, 0.84), 28);
    if (projectCopy) projectCopy.style.opacity = "1";
    if (expansionCopy) expansionCopy.style.opacity = "0";
  }

  function updateExpansion(progress) {
    const expansionTransforms = [
      "translate3d(-54px, -46px, 0) rotate(-7deg) scale(0.52)",
      "translate3d(82px, 126px, 0) rotate(6deg) scale(0.58)",
      "translate3d(-8px, -10px, 0) rotate(-1deg) scale(0.92)"
    ];
    images.forEach((image, index) => {
      image.style.opacity = String([0.2, 0.38, 1][index] || 0.3);
      image.style.transform = expansionTransforms[index] || "";
      image.style.zIndex = String(index === 2 ? 4 : index + 1);
    });
    if (projectCopy) projectCopy.style.opacity = "0";
    if (expansionCopy) expansionCopy.style.opacity = "1";
    setElementVisible(expansionMain, rangeProgress(progress, 0.04, 0.28), 38);
    setElementVisible(expansionContext, rangeProgress(progress, 0.38, 0.66), 30);
  }

  return {
    init() {
      applyPhase("project");
      [headline, context, reflection, expansionMain, expansionContext].forEach((element) => setElementVisible(element, 0, 36));
      images.forEach((image) => { image.style.opacity = "0"; });
    },
    enter({ beat, localProgress }) {
      setHeroVisible(false);
      showOnlySection("building-project");
      loadLazyImages(section);
      applyPhase(beat.phase);
      if (phase === "project") updateProject(reducedMotionMode ? 1 : localProgress);
      else updateExpansion(reducedMotionMode ? 1 : localProgress);
    },
    changePhase({ phase: nextPhase, localProgress }) {
      applyPhase(nextPhase);
      if (phase === "project") updateProject(reducedMotionMode ? 1 : localProgress);
      else updateExpansion(reducedMotionMode ? 1 : localProgress);
    },
    update({ beat, localProgress, revealProgress = localProgress }) {
      if (phase !== beat.phase) applyPhase(beat.phase);
      const progress = reducedMotionMode ? 1 : revealProgress;
      if (phase === "project") updateProject(progress);
      else updateExpansion(progress);
    }
  };
}

function createAiToolsController() {
  const section = document.getElementById("ai-tools");
  const statement = document.getElementById("ai-tools-statement");
  const visual = section?.querySelector(".ai-tools-visual");
  const process = section?.querySelector(".ai-tools-process");
  const lines = process ? [...process.querySelectorAll("p")] : [];
  let phase = "statement";

  function applyPhase(nextPhase) {
    phase = nextPhase;
    if (section) section.dataset.phase = phase;
    if (process) process.setAttribute("aria-hidden", phase === "process" ? "false" : "true");
  }

  function updatePhase(localProgress) {
    const progress = reducedMotionMode ? 1 : localProgress;
    if (phase === "statement") {
      setElementVisible(statement, rangeProgress(progress, 0.02, 0.28), 44);
      if (visual) visual.style.opacity = "0";
      if (process) process.style.opacity = "0";
      return;
    }

    loadLazyImages(section);
    if (statement) statement.style.opacity = "0";
    setElementVisible(visual, rangeProgress(progress, 0, 0.22), 30);
    if (process) process.style.opacity = "1";
    lines.forEach((line, index) => {
      const start = 0.12 + index * 0.24;
      setElementVisible(line, rangeProgress(progress, start, start + 0.2), 34);
    });
  }

  return {
    init() {
      applyPhase("statement");
      [statement, visual, ...lines].forEach((element) => setElementVisible(element, 0, 38));
    },
    enter({ beat, localProgress }) {
      setHeroVisible(false);
      showOnlySection("ai-tools");
      applyPhase(beat.phase);
      updatePhase(localProgress);
    },
    changePhase({ phase: nextPhase, localProgress }) {
      applyPhase(nextPhase);
      updatePhase(localProgress);
    },
    update({ beat, localProgress, revealProgress = localProgress }) {
      if (beat.phase !== phase) applyPhase(beat.phase);
      updatePhase(revealProgress);
    }
  };
}

function createConnectionsController() {
  const section = document.getElementById("connections");
  const visual = document.getElementById("connections-visual");
  const quoteLines = [...document.querySelectorAll("#connections-quote p")];
  const context = document.getElementById("connections-context");
  return {
    init() {
      [visual, ...quoteLines, context].forEach((element) => setElementVisible(element, 0, 40));
    },
    enter() {
      setHeroVisible(false);
      showOnlySection("connections");
      loadLazyImages(section);
    },
    update({ localProgress, revealProgress = localProgress }) {
      const progress = reducedMotionMode ? 1 : revealProgress;
      setElementVisible(visual, rangeProgress(progress, 0, 0.22), 30);
      setElementVisible(quoteLines[0], rangeProgress(progress, 0.14, 0.34), 38);
      setElementVisible(quoteLines[1], rangeProgress(progress, 0.36, 0.56), 38);
      setElementVisible(context, rangeProgress(progress, 0.6, 0.8), 28);
    },
    pointerMove(event) {
      if (!visual || reducedMotionMode) return;
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;
      visual.style.transform = `translate3d(${nx * 8}px, ${ny * 6}px, 0) rotate(${nx * 0.8}deg)`;
    }
  };
}

function createContinuationStackController() {
  const section = document.getElementById("continuation-stack");
  const images = section ? [...section.querySelectorAll(".continuation-images figure")] : [];
  const main = document.getElementById("continuation-main");
  const context = document.getElementById("continuation-context");
  const rotations = [-5, 4, -3, 5];

  return {
    init() {
      images.forEach((image) => { image.style.opacity = "0"; });
      [main, context].forEach((element) => setElementVisible(element, 0, 40));
    },
    enter() {
      setHeroVisible(false);
      showOnlySection("continuation-stack");
      loadLazyImages(section);
    },
    update({ localProgress, revealProgress = localProgress }) {
      const progress = reducedMotionMode ? 1 : revealProgress;
      images.forEach((image, index) => {
        const start = 0.02 + index * 0.12;
        const reveal = easeOut(rangeProgress(progress, start, start + 0.18));
        image.style.opacity = String(reveal);
        image.style.transform = `translate3d(${(1 - reveal) * (index % 2 ? 90 : -90)}px, ${(1 - reveal) * 55}px, 0) rotate(${rotations[index]}deg)`;
      });
      setElementVisible(main, rangeProgress(progress, 0.42, 0.64), 40);
      setElementVisible(context, rangeProgress(progress, 0.68, 0.84), 28);
    }
  };
}

function createNextVersionController() {
  const section = document.getElementById("next-version");
  const visual = section?.querySelector(".next-version-visual");
  const path = document.getElementById("next-version-path");
  const copy = section?.querySelector(".next-version-copy");
  const lines = copy ? [...copy.querySelectorAll("p")] : [];
  let phase = "path";

  function applyPhase(nextPhase) {
    phase = nextPhase;
    if (section) section.dataset.phase = phase;
    if (copy) copy.setAttribute("aria-hidden", phase === "keep-going" ? "false" : "true");
  }

  function updatePhase(localProgress) {
    const progress = reducedMotionMode ? 1 : localProgress;
    setElementVisible(visual, rangeProgress(progress, 0, 0.2), 22);
    if (phase === "path") {
      setElementVisible(path, rangeProgress(progress, 0.08, 0.32), 46);
      if (copy) copy.style.opacity = "0";
      return;
    }

    if (path) path.style.opacity = "0";
    if (copy) copy.style.opacity = "1";
    lines.forEach((line, index) => {
      const start = index === 0 ? 0.02 : 0.16 + (index - 1) * 0.125;
      const end = index === lines.length - 1 ? start + 0.11 : start + 0.16;
      setElementVisible(line, rangeProgress(progress, start, end), 30);
    });
  }

  return {
    init() {
      applyPhase("path");
      [visual, path, ...lines].forEach((element) => setElementVisible(element, 0, 40));
    },
    enter({ beat, localProgress }) {
      setCursorHidden(false);
      setHeroVisible(false);
      showOnlySection("next-version");
      loadLazyImages(section);
      applyPhase(beat.phase);
      updatePhase(localProgress);
    },
    changePhase({ phase: nextPhase, localProgress }) {
      applyPhase(nextPhase);
      updatePhase(localProgress);
    },
    update({ beat, localProgress, revealProgress = localProgress }) {
      if (beat.phase !== phase) applyPhase(beat.phase);
      updatePhase(revealProgress);
    }
  };
}

function createEndingController() {
  const section = document.getElementById("ending");
  const sourcesWrap = section?.querySelector(".ending-sources");
  const sourceLines = sourcesWrap ? [...sourcesWrap.querySelectorAll("p")] : [];
  const finalWrap = section?.querySelector(".ending-final");
  const quote = document.getElementById("ending-quote");
  const credit = document.getElementById("ending-credit");
  let phase = "sources";

  function applyPhase(nextPhase) {
    phase = nextPhase;
    if (section) section.dataset.phase = phase;
    if (sourcesWrap) sourcesWrap.setAttribute("aria-hidden", phase === "sources" ? "false" : "true");
    if (finalWrap) finalWrap.setAttribute("aria-hidden", phase === "final" ? "false" : "true");
    if (phase === "sources") setCursorHidden(false);
  }

  function updatePhase(localProgress, revealProgress = localProgress) {
    if (phase === "sources") {
      const progress = reducedMotionMode ? 0.7 : revealProgress;
      const fade = reducedMotionMode ? 1 : 1 - rangeProgress(localProgress, 0.78, 0.98);
      if (sourcesWrap) sourcesWrap.style.opacity = "1";
      if (finalWrap) finalWrap.style.opacity = "0";
      sourceLines.forEach((line, index) => {
        const reveal = rangeProgress(progress, 0.05 + index * 0.15, 0.2 + index * 0.15);
        setElementVisible(line, reveal * fade, 30);
      });
      return;
    }

    const progress = reducedMotionMode ? 1 : revealProgress;
    sourceLines.forEach((line) => { line.style.opacity = "0"; });
    if (sourcesWrap) sourcesWrap.style.opacity = "0";
    if (finalWrap) finalWrap.style.opacity = "1";
    setElementVisible(quote, rangeProgress(progress, 0.1, 0.42), 50);
    setElementVisible(credit, rangeProgress(progress, 0.56, 0.74), 28);
    setCursorHidden(progress >= 0.74);
  }

  return {
    init() {
      applyPhase("sources");
      sourceLines.forEach((line) => setElementVisible(line, 0, 30));
      [quote, credit].forEach((element) => setElementVisible(element, 0, 46));
    },
    enter({ beat, localProgress }) {
      setHeroVisible(false);
      showOnlySection("ending");
      applyPhase(beat.phase);
      updatePhase(localProgress);
    },
    changePhase({ phase: nextPhase, localProgress }) {
      applyPhase(nextPhase);
      updatePhase(localProgress);
    },
    update({ beat, localProgress, revealProgress = localProgress }) {
      if (beat.phase !== phase) applyPhase(beat.phase);
      updatePhase(localProgress, revealProgress);
    },
    exit() {
      setCursorHidden(false);
    }
  };
}

function initObjectSection() {
  const canvas = document.getElementById("book-canvas");
  if (!canvas || objectRenderer) return;
  objectScene = new THREE.Scene();
  objectCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  objectCamera.position.set(0, 0, 5);
  objectRenderer = new THREE.WebGLRenderer({
    antialias: !isMobileMode,
    alpha: true,
    canvas,
    powerPreference: "high-performance"
  });
  objectRenderer.setSize(window.innerWidth, window.innerHeight);
  objectRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobileMode ? 1 : 2));
  objectRenderer.setClearColor(0x000000, 0);
  objectRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  objectRenderer.toneMappingExposure = 1.2;

  const light = new THREE.SpotLight(0xffffff, 100);
  light.position.set(0, 8, 5);
  light.angle = 0.4;
  light.penumbra = 0.8;
  objectScene.add(light);
  objectScene.add(new THREE.AmbientLight(0xffffff, 0.1));

  const material = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.9,
    metalness: 0.1
  });
  objectModel = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.0, 0.22), material);
  const spine = new THREE.Mesh(new THREE.BoxGeometry(0.16, 3.08, 0.3), material);
  spine.position.x = -1.18;
  objectModel.add(body, spine);
  objectModel.scale.setScalar(isMobileMode ? 1.1 : 1.6);
  objectScene.add(objectModel);
  animateObject();
}

function initObjectTexts() {
  if (objectTextInitialized) return;
  objectTextInitialized = true;
  const leftText = document.getElementById("s6-left-text");
  const rightText = document.getElementById("s6-right-text");
  if (leftText) leftText.innerHTML = leftText.innerHTML + leftText.innerHTML + leftText.innerHTML;
  if (rightText) rightText.innerHTML = rightText.innerHTML + rightText.innerHTML + rightText.innerHTML;
  requestAnimationFrame(() => {
    if (leftText) objectLeftLoopH = leftText.scrollHeight / 3;
    if (rightText) {
      objectRightLoopH = rightText.scrollHeight / 3;
      rightText.style.transform = `translateY(${-2 * objectRightLoopH}px)`;
    }
  });
}

function animateObjectTexts() {
  if (!objectActive) return;
  const speed = 1.2 + objectVelocity * 4;
  objectVelocity *= 0.9;
  objectLeftY += speed;
  if (objectLeftLoopH > 0 && objectLeftY >= objectLeftLoopH) objectLeftY -= objectLeftLoopH;
  objectRightY += speed * 0.6;
  if (objectRightLoopH > 0 && objectRightY >= objectRightLoopH) objectRightY -= objectRightLoopH;
  const blur = Math.min(objectVelocity * 1.8, 3.5);
  const leftText = document.getElementById("s6-left-text");
  const rightText = document.getElementById("s6-right-text");
  if (leftText) {
    leftText.style.filter = blur > 0.1 ? `blur(${blur}px)` : "";
    leftText.style.transform = `translateY(-${objectLeftY}px)`;
  }
  if (rightText && objectRightLoopH > 0) {
    rightText.style.filter = blur > 0.1 ? `blur(${blur}px)` : "";
    rightText.style.transform = `translateY(${-2 * objectRightLoopH + objectRightY}px)`;
  }
  requestAnimationFrame(animateObjectTexts);
}

function animateObject() {
  requestAnimationFrame(animateObject);
  if (!objectActive) return;
  if (objectModel) {
    objectModel.rotation.y += 0.005 + objectVelocity * 0.08;
    objectModel.rotation.x += (objectTiltX - objectModel.rotation.x) * 0.04;
    objectModel.rotation.z += (objectTiltZ - objectModel.rotation.z) * 0.04;
  }
  if (objectRenderer && objectScene && objectCamera) objectRenderer.render(objectScene, objectCamera);
}

function resizeHeroRenderer() {
  if (!heroRenderer || !heroCamera) return;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspect = width / height;
  heroCamera.aspect = aspect;
  heroCamera.position.z = aspect < 0.75 ? 12 : aspect < 1.1 ? 9 : 7;
  heroCamera.updateProjectionMatrix();
  heroRenderer.setSize(width, height);
}

function resizeObjectRenderer() {
  if (!objectRenderer || !objectCamera) return;
  objectCamera.aspect = window.innerWidth / window.innerHeight;
  objectCamera.updateProjectionMatrix();
  objectRenderer.setSize(window.innerWidth, window.innerHeight);
}

function activateObjectSection() {
  initObjectSection();
  objectActive = true;
  initObjectTexts();
  animateObjectTexts();
}

function deactivateObjectSection() {
  objectActive = false;
  objectLeftY = 0;
  objectRightY = 0;
  const leftText = document.getElementById("s6-left-text");
  const rightText = document.getElementById("s6-right-text");
  if (leftText) leftText.style.transform = "translateY(0)";
  if (rightText) rightText.style.transform = "translateY(0)";
}

function handleObjectPointer(event) {
  if (!objectActive) return;
  const nx = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
  const ny = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
  objectTiltX = ny * 0.45;
  objectTiltZ = -nx * 0.25;
}

function resetObjectPointer() {
  objectTiltX = 0;
  objectTiltZ = 0;
}

function computeStackStarts() {
  stackStarts = [
    { x: -window.innerWidth * 1.9, y: -window.innerHeight * 1.6 },
    { x: window.innerWidth * 1.9, y: window.innerHeight * 1.6 },
    { x: window.innerWidth * 1.9, y: -window.innerHeight * 1.6 },
    { x: -window.innerWidth * 1.9, y: window.innerHeight * 1.6 },
    { x: -window.innerWidth * 2.0, y: 0 },
    { x: window.innerWidth * 2.0, y: 0 },
    { x: 0, y: -window.innerHeight * 2.0 },
    { x: 0, y: window.innerHeight * 2.0 },
    { x: -window.innerWidth * 1.9, y: -window.innerHeight * 0.8 }
  ];
}

function resetStackSection() {
  computeStackStarts();
  stackTriggered = new Array(stackCount).fill(false);
  stackReady = false;
  stackClimaxDone = false;
  const wrapper = document.getElementById("s7-cards-wrapper");
  const math = document.getElementById("s7-math");
  if (wrapper) wrapper.classList.remove("s7-alive");
  if (math) {
    math.classList.remove("s7-alive");
    if (getGsap()) getGsap().set(math, { opacity: 0, scale: 3, x: 0, y: 0 });
    else math.style.opacity = "0";
  }
  for (let i = 0; i < stackCount; i++) {
    const card = document.getElementById(`s7-card-${i + 1}`);
    if (!card) continue;
    card.style.filter = "";
    if (getGsap()) {
      getGsap().set(card, {
        x: stackStarts[i].x,
        y: stackStarts[i].y,
        rotation: 0,
        rotateX: 0,
        rotateY: 0,
        zIndex: i + 1
      });
    } else {
      card.style.transform = `translate(${stackStarts[i].x}px, ${stackStarts[i].y}px)`;
    }
  }
}

function flyStackCard(index) {
  const card = document.getElementById(`s7-card-${index + 1}`);
  if (!card) return;
  if (getGsap()) {
    getGsap().to(card, {
      x: stackOffsets[index].x,
      y: stackOffsets[index].y,
      rotation: stackRotations[index],
      duration: 0.9,
      ease: "back.out(1.15)",
      onComplete: () => {
        if (index === stackCount - 1) {
          stackReady = true;
          stackClimax();
        }
      }
    });
  } else if (index === stackCount - 1) {
    stackReady = true;
    stackClimax();
  }
}

function stackClimax() {
  if (stackClimaxDone) return;
  stackClimaxDone = true;
  const section = document.getElementById("section-7");
  if (getGsap() && section) {
    getGsap().timeline()
      .to(section, { filter: "hue-rotate(180deg) saturate(4) brightness(2)", duration: 0.05 })
      .to(section, { filter: "hue-rotate(-90deg) saturate(5) brightness(0.2)", duration: 0.05 })
      .to(section, { filter: "hue-rotate(60deg) saturate(2) brightness(1.8)", duration: 0.05 })
      .to(section, { filter: "none", duration: 0.07 })
      .to("#s7-math", { opacity: 1, scale: 1, duration: 0.55, ease: "expo.out", delay: 0.05 })
      .add(() => {
        document.getElementById("s7-cards-wrapper")?.classList.add("s7-alive");
        document.getElementById("s7-math")?.classList.add("s7-alive");
      });
  } else {
    const math = document.getElementById("s7-math");
    if (math) math.style.opacity = "1";
  }
}

function updateStackSection(progress) {
  const section = document.getElementById("section-7");
  if (section) {
    const bgT = Math.min(1, progress / 0.3);
    const red = Math.round(204 * (1 - bgT));
    section.style.background = `rgb(${red},0,0)`;
  }
  for (let i = 0; i < stackCount; i++) {
    const threshold = i / (stackCount + 1);
    if (!stackTriggered[i] && progress > threshold) {
      stackTriggered[i] = true;
      flyStackCard(i);
    }
  }
}

function handleStackPointer(event) {
  if (!stackReady) return;
  const nx = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
  const ny = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
  const dist = Math.sqrt(nx * nx + ny * ny);
  const glow = Math.max(0, 1 - dist * 0.8);
  const spotlight = document.getElementById("s7-spotlight");
  if (spotlight) {
    spotlight.style.background = `radial-gradient(circle 190px at ${event.clientX}px ${event.clientY}px, rgba(255,252,220,0.30) 0%, rgba(255,240,200,0.09) 50%, transparent 72%)`;
  }
  [6, 7, 8].forEach((index, order) => {
    const card = document.getElementById(`s7-card-${index + 1}`);
    if (!card || !getGsap()) return;
    const depth = (order + 1) / 3;
    getGsap().to(card, {
      rotateX: -ny * 14 * depth,
      rotateY: nx * 14 * depth,
      x: stackOffsets[index].x - nx * 30 * depth,
      y: stackOffsets[index].y - ny * 30 * depth,
      duration: 0.9,
      ease: "power2.out",
      overwrite: "auto"
    });
    card.style.filter = `brightness(${0.78 + glow * 0.38 * depth}) contrast(1.25) saturate(0.82)`;
  });
}

function startEndingAnimation() {
  const quoteEl = document.getElementById("s8-quote");
  if (!quoteEl || !getGsap()) return;
  getGsap().set(["#s8-author", "#s8-holm", "#s8-url"], { opacity: 0 });
  getGsap().set("#s8-divider", { width: "0px" });
  quoteEl.style.opacity = "1";

  if (quoteEl._splitInstance) quoteEl._splitInstance.revert();
  let chars = [];
  if (splitTextMode && window.SplitText) {
    const split = new window.SplitText(quoteEl, { type: "chars,words,lines", linesClass: "s8-line" });
    quoteEl._splitInstance = split;
    chars = split.chars;
  } else {
    const text = quoteEl.textContent.trim();
    quoteEl.innerHTML = [...text].map((char) => `<span class="s8-char">${char}</span>`).join("");
    chars = [...quoteEl.querySelectorAll(".s8-char")];
  }

  getGsap().set(chars, { opacity: 0, y: 60, rotationX: -90, transformOrigin: "50% 50% -20px" });
  getGsap().timeline()
    .to({}, { duration: 0.4 })
    .to(chars, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 1.4,
      stagger: { amount: 2.2, from: "start" },
      ease: "power4.out"
    })
    .to("#s8-author", { opacity: 1, duration: 1.8, ease: "power2.out" }, "-=0.4")
    .to("#s8-divider", { width: "200px", duration: 1.6, ease: "expo.inOut" }, "+=0.6")
    .to("#s8-holm", { opacity: 1, duration: 1.2, ease: "power2.out" }, "+=0.2")
    .to("#s8-url", { opacity: 1, duration: 1, ease: "power2.out" }, "+=0.2");
}

function createReserveObjectController() {
  return {
    enter() {
      showOnlySection("section-6");
      activateObjectSection();
    },
    exit() {
      deactivateObjectSection();
      resetObjectPointer();
    },
    pointerMove: handleObjectPointer,
    resize: resizeObjectRenderer
  };
}

function createReserveStackController() {
  return {
    init: resetStackSection,
    enter() {
      showOnlySection("section-7");
      resetStackSection();
    },
    update({ localProgress }) {
      updateStackSection(localProgress);
    },
    pointerMove: handleStackPointer,
    resize: computeStackStarts
  };
}

function createReserveEndingController() {
  return {
    enter() {
      showOnlySection("section-8");
      startEndingAnimation();
    }
  };
}

export function createSectionControllers(options = {}) {
  isMobileMode = Boolean(options.isMobile);
  reducedMotionMode = Boolean(options.prefersReducedMotion);
  gsapMode = Boolean(options.gsapAvailable && window.gsap);
  splitTextMode = Boolean(options.splitTextAvailable && window.SplitText);
  collectSections();
  initHero({ isMobile: isMobileMode });

  const controllers = {
    opening: createOpeningController(),
    openingInterlude: createOpeningInterludeController(),
    projectLog: createProjectLogController(),
    projectsInterlude: createProjectsInterludeController(),
    musicIntroduction: createSparseQuoteController("music-introduction", "music-introduction-text"),
    musicProduction: createMusicProductionController(),
    musicProgress: createSparseQuoteController("music-progress", "music-progress-text"),
    musicOpportunity: createMusicOpportunityController(),
    photographyIntroduction: createSparseQuoteController("photography-introduction", "photography-introduction-text"),
    photographySequence: createPhotographySequenceController(),
    photographyEnding: createSparseQuoteController("photography-ending", "photography-ending-text"),
    originInterlude: createOriginInterludeController(),
    kindergartenArchive: createKindergartenArchiveController(),
    oralSurgeryReveal: createOralSurgeryRevealController(),
    whyItFits: createWhyItFitsController(),
    dentalScanIntroduction: createDentalScanIntroductionController(),
    dentalModel: createDentalModelController(),
    healthcareOwnership: createHealthcareOwnershipController(),
    practiceSystem: createPracticeSystemController(),
    buildingProject: createBuildingProjectController(),
    aiTools: createAiToolsController(),
    connections: createConnectionsController(),
    continuationStack: createContinuationStackController(),
    integration: createSparseQuoteController("integration", "integration-text"),
    nextVersion: createNextVersionController(),
    ending: createEndingController(),
    object: createReserveObjectController(),
    stack: createReserveStackController(),
    reserveEnding: createReserveEndingController()
  };

  [
    "opening",
    "openingInterlude",
    "projectLog",
    "projectsInterlude",
    "musicIntroduction",
    "musicProduction",
    "musicProgress",
    "musicOpportunity",
    "photographyIntroduction",
    "photographySequence",
    "photographyEnding",
    "originInterlude",
    "kindergartenArchive",
    "oralSurgeryReveal",
    "whyItFits",
    "dentalScanIntroduction",
    "dentalModel",
    "healthcareOwnership",
    "practiceSystem",
    "buildingProject",
    "aiTools",
    "connections",
    "continuationStack",
    "integration",
    "nextVersion",
    "ending"
  ].forEach((key) => {
    controllers[key]?.init?.();
  });

  showOnlySection(activeSectionId);
  return controllers;
}

export function resizeFoundation() {
  resizeHeroRenderer();
  resizeObjectRenderer();
  resizeDentalRenderer();
  computeStackStarts();
}
