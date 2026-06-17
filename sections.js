import * as THREE from "three";

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
    cursorText.style.opacity = currentCursorWord ? "1" : "0";
  }
}

export function updateObjectVelocity(deltaY) {
  if (objectActive) objectVelocity = Math.min(Math.abs(deltaY) / 20, 3);
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
    update({ localProgress }) {
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
    update({ localProgress }) {
      if (reducedMotionMode) {
        setSplitProgress(sentence, 1);
        if (sentence) sentence.style.opacity = "1";
        return;
      }
      setSplitProgress(sentence, rangeProgress(localProgress, 0, 0.2));
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

  function updateMissingImage() {
    if (!image) return;
    const finalSrc = image.dataset.src;
    if (!finalSrc) {
      image.classList.add("is-missing");
      return;
    }
    image.classList.add("is-missing");
  }

  return {
    init() {
      if (headline) headline.textContent = "";
      if (image) {
        image.addEventListener("error", () => image.classList.add("is-missing"), { once: true });
        updateMissingImage();
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
      updateMissingImage();
    },
    update({ localProgress }) {
      const entrance = reducedMotionMode ? 1 : easeOut(rangeProgress(localProgress, 0, 0.15));
      if (inner) {
        inner.style.opacity = String(entrance);
        inner.style.transform = `scale(${0.2 + 0.8 * entrance}) rotate(${18 * (1 - entrance)}deg)`;
      }
      if (masthead) masthead.style.opacity = String(entrance);

      const reveal = reducedMotionMode ? 1 : rangeProgress(localProgress, 0.1, 0.38);
      if (headline) {
        const count = Math.ceil(headlineText.length * reveal);
        headline.textContent = headlineText.slice(0, count);
      }

      setElementVisible(body, reducedMotionMode ? 1 : rangeProgress(localProgress, 0.25, 0.5), 24);
      const imageProgress = reducedMotionMode ? 1 : rangeProgress(localProgress, 0.0, 0.62);
      if (imageWrap) {
        imageWrap.style.opacity = String(easeOut(imageProgress));
        imageWrap.style.transform = `translate3d(${(1 - easeOut(imageProgress)) * 42}px, 0, 0) scale(${1.06 - 0.06 * easeOut(imageProgress)})`;
      }
      setElementVisible(caption, reducedMotionMode ? 1 : rangeProgress(localProgress, 0.42, 0.62), 20);

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
    update({ localProgress }) {
      if (reducedMotionMode) {
        setSplitProgress(line1, 1);
        setSplitProgress(line2, 1);
        return;
      }
      setSplitProgress(line1, rangeProgress(localProgress, 0, 0.2));
      setSplitProgress(line2, rangeProgress(localProgress, 0.44, 0.62));
    },
    exit() {
      setSplitProgress(line1, 1);
      setSplitProgress(line2, 1);
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
    object: createReserveObjectController(),
    stack: createReserveStackController(),
    ending: createReserveEndingController()
  };

  ["opening", "openingInterlude", "projectLog", "projectsInterlude"].forEach((key) => {
    controllers[key]?.init?.();
  });

  showOnlySection(activeSectionId);
  return controllers;
}

export function resizeFoundation() {
  resizeHeroRenderer();
  resizeObjectRenderer();
  computeStackStarts();
}
