import * as THREE from "three";
import { placeholderWords, getSectionById } from "./story.js";

const sectionEls = new Map();
let heroRenderer = null;
let heroScene = null;
let heroCamera = null;
let heroTitle = null;
let pointer = { x: 0, y: 0, nx: 0, ny: 0 };
let activeSectionId = "opening";
let textSplit = false;

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

export function collectSections() {
  document.querySelectorAll(".story-section").forEach((section) => {
    sectionEls.set(section.id, section);
  });
}

export function setActiveSection(id) {
  activeSectionId = id;
  sectionEls.forEach((section, sectionId) => {
    const active = sectionId === id;
    section.classList.toggle("is-active", active);
    section.setAttribute("aria-hidden", active ? "false" : "true");
    section.style.pointerEvents = active ? "auto" : "none";
  });
  const metadata = getSectionById(id);
  setCursorWord(metadata ? metadata.cursor : placeholderWords.section);
  window.__foundationActiveSection = id;
}

export function showSection(id) {
  const section = sectionEls.get(id);
  if (!section) return;
  section.style.opacity = "1";
  section.style.pointerEvents = "auto";
  section.setAttribute("aria-hidden", "false");
  setActiveSection(id);
}

export function hideSection(id) {
  const section = sectionEls.get(id);
  if (!section) return;
  section.style.opacity = "0";
  section.style.pointerEvents = "none";
  section.setAttribute("aria-hidden", "true");
  section.classList.remove("is-active");
}

export function initHero({ isMobile }) {
  const canvas = document.getElementById("hero-canvas");
  heroTitle = document.getElementById("opening-title");
  if (!canvas) return;

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

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
  heroScene.add(ambientLight);
  const mainSpot = new THREE.SpotLight(0xffffff, 400);
  mainSpot.position.set(0, 12, 2);
  mainSpot.angle = 0.3;
  mainSpot.penumbra = 0.8;
  mainSpot.decay = 1.5;
  heroScene.add(mainSpot);

  animateHero();
}

function animateHero() {
  requestAnimationFrame(animateHero);
  if (heroCamera) {
    heroCamera.rotation.x += (-pointer.ny * 0.015 - heroCamera.rotation.x) * 0.04;
    heroCamera.rotation.y += (pointer.nx * 0.02 - heroCamera.rotation.y) * 0.04;
  }
  if (heroRenderer && heroScene && heroCamera) {
    heroRenderer.render(heroScene, heroCamera);
  }
}

export function animateOpeningIn() {
  if (!heroTitle || !window.gsap) return;
  window.gsap.fromTo(heroTitle, {
    y: 120,
    opacity: 0,
    letterSpacing: "0px"
  }, {
    y: 0,
    opacity: 1,
    duration: 1.8,
    ease: "power4.out"
  });
}

export function resizeFoundation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (heroRenderer && heroCamera) {
    heroCamera.aspect = width / height;
    heroCamera.position.z = width / height < 0.75 ? 12 : width / height < 1.1 ? 9 : 7;
    heroCamera.updateProjectionMatrix();
    heroRenderer.setSize(width, height);
  }
  resizeObjectRenderer();
  computeStackStarts();
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
    cursorText.style.opacity = "1";
  }
}

export function setCursorWord(word) {
  const cursorText = document.getElementById("cursor-text");
  if (!cursorText) return;
  cursorText.textContent = word;
}

export function initDrawingSection() {
  prepareDrawingPaths();
  initSplitText();
}

export function prepareDrawingPaths() {
  document.querySelectorAll("#s2-prisoners path").forEach((path) => {
    try {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    } catch (error) {
      path.style.strokeDasharray = "0";
      path.style.strokeDashoffset = "0";
    }
  });
}

export function resetDrawingPaths() {
  document.querySelectorAll("#s2-prisoners path").forEach((path) => {
    try {
      path.style.strokeDashoffset = path.getTotalLength();
    } catch (error) {
      path.style.strokeDashoffset = "0";
    }
  });
}

function initSplitText() {
  if (textSplit) return;
  textSplit = true;
  const targets = [
    document.querySelector("#s2-quote p"),
    ...document.querySelectorAll(".s2-corner-text")
  ];
  targets.forEach((element) => {
    if (!element) return;
    const words = element.textContent.trim().split(" ");
    element.innerHTML = words.map((word) =>
      `<span class="word-mask"><span class="s2-sw">${word}</span></span>`
    ).join(" ");
  });
}

export function animateDrawingTextIn() {
  initSplitText();
  if (window.gsap) {
    window.gsap.to(".s2-sw", { y: 0, duration: 0.7, stagger: 0.04, ease: "power3.out", delay: 0.2 });
    window.gsap.to("#s2-prisoners path", { strokeDashoffset: 0, duration: 0.25, stagger: 0.02, ease: "power2.inOut" });
  } else {
    document.querySelectorAll(".s2-sw").forEach((word) => { word.style.transform = "translateY(0)"; });
    document.querySelectorAll("#s2-prisoners path").forEach((path) => { path.style.strokeDashoffset = "0"; });
  }
}

export function animateDrawingTextOut() {
  if (window.gsap) window.gsap.set(".s2-sw", { y: "110%" });
  else document.querySelectorAll(".s2-sw").forEach((word) => { word.style.transform = "translateY(110%)"; });
}

export function initEditorialSection() {
  const headline = document.getElementById("s3-headline");
  if (headline) headline.textContent = "";
}

export function showEditorialSection() {
  const inner = document.getElementById("section-3-inner");
  const headline = document.getElementById("s3-headline");
  if (window.gsap && inner) {
    window.gsap.fromTo(inner,
      { scale: 0.1, rotation: 720, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.8, ease: "power4.out" }
    );
  }
  if (headline) {
    typeWriter(headline, headline.dataset.typeText || placeholderWords.section, 80);
  }
}

export function resetEditorialSection() {
  const headline = document.getElementById("s3-headline");
  if (headline) headline.textContent = "";
}

function typeWriter(element, text, speed, callback) {
  let index = 0;
  element.textContent = "";
  const timer = setInterval(() => {
    element.textContent += text[index] || "";
    index++;
    if (index >= text.length) {
      clearInterval(timer);
      if (callback) callback();
    }
  }, speed);
}

export function initObjectSection({ isMobile }) {
  const canvas = document.getElementById("book-canvas");
  if (!canvas) return;
  objectScene = new THREE.Scene();
  objectCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  objectCamera.position.set(0, 0, 5);
  objectRenderer = new THREE.WebGLRenderer({
    antialias: !isMobile,
    alpha: true,
    canvas,
    powerPreference: "high-performance"
  });
  objectRenderer.setSize(window.innerWidth, window.innerHeight);
  objectRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2));
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
  objectModel.scale.setScalar(isMobile ? 1.1 : 1.6);
  objectScene.add(objectModel);

  initObjectTexts();
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
  if (objectRenderer && objectScene && objectCamera) {
    objectRenderer.render(objectScene, objectCamera);
  }
}

export function activateObjectSection() {
  objectActive = true;
  initObjectTexts();
  animateObjectTexts();
  showObjectOverlay();
}

export function deactivateObjectSection() {
  objectActive = false;
  objectLeftY = 0;
  objectRightY = 0;
  const leftText = document.getElementById("s6-left-text");
  const rightText = document.getElementById("s6-right-text");
  if (leftText) leftText.style.transform = "translateY(0)";
  if (rightText) rightText.style.transform = "translateY(0)";
}

export function updateObjectVelocity(deltaY) {
  if (objectActive) objectVelocity = Math.min(Math.abs(deltaY) / 20, 3);
}

export function handleObjectPointer(event) {
  if (!objectActive) return;
  const nx = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
  const ny = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
  objectTiltX = ny * 0.45;
  objectTiltZ = -nx * 0.25;
}

export function resetObjectPointer() {
  objectTiltX = 0;
  objectTiltZ = 0;
}

function showObjectOverlay() {
  const overlay = document.getElementById("s6-thoughtcrime");
  if (!overlay || !window.gsap) return;
  window.gsap.killTweensOf(overlay);
  window.gsap.set(overlay, { opacity: 0 });
  setTimeout(() => {
    if (!objectActive) return;
    window.gsap.to(overlay, {
      opacity: 1,
      duration: 0.5,
      onComplete: () => {
        setTimeout(() => {
          window.gsap.to(overlay, { opacity: 0, duration: 0.5 });
        }, 1200);
      }
    });
  }, 900);
}

function resizeObjectRenderer() {
  if (!objectRenderer || !objectCamera) return;
  objectCamera.aspect = window.innerWidth / window.innerHeight;
  objectCamera.updateProjectionMatrix();
  objectRenderer.setSize(window.innerWidth, window.innerHeight);
}

export function initStackSection() {
  computeStackStarts();
  resetStackSection();
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

export function resetStackSection() {
  stackTriggered = new Array(stackCount).fill(false);
  stackReady = false;
  stackClimaxDone = false;
  const wrapper = document.getElementById("s7-cards-wrapper");
  const math = document.getElementById("s7-math");
  if (wrapper) wrapper.classList.remove("s7-alive");
  if (math) {
    math.classList.remove("s7-alive");
    if (window.gsap) window.gsap.set(math, { opacity: 0, scale: 3, x: 0, y: 0 });
    else math.style.opacity = "0";
  }
  for (let i = 0; i < stackCount; i++) {
    const card = document.getElementById(`s7-card-${i + 1}`);
    if (!card) continue;
    card.style.filter = "";
    if (window.gsap) {
      window.gsap.set(card, {
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

export function updateStackSection(progress) {
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

function flyStackCard(index) {
  const card = document.getElementById(`s7-card-${index + 1}`);
  if (!card) return;
  if (window.gsap) {
    window.gsap.to(card, {
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
  if (window.gsap && section) {
    window.gsap.timeline()
      .to(section, { filter: "hue-rotate(180deg) saturate(4) brightness(2)", duration: 0.05 })
      .to(section, { filter: "hue-rotate(-90deg) saturate(5) brightness(0.2)", duration: 0.05 })
      .to(section, { filter: "hue-rotate(60deg) saturate(2) brightness(1.8)", duration: 0.05 })
      .to(section, { filter: "none", duration: 0.07 })
      .to("#s7-math", { opacity: 1, scale: 1, duration: 0.55, ease: "expo.out", delay: 0.05 })
      .add(() => {
        document.getElementById("s7-cards-wrapper").classList.add("s7-alive");
        document.getElementById("s7-math").classList.add("s7-alive");
      });
  } else {
    const math = document.getElementById("s7-math");
    if (math) math.style.opacity = "1";
  }
}

export function handleStackPointer(event) {
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
    if (!card || !window.gsap) return;
    const depth = (order + 1) / 3;
    window.gsap.to(card, {
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
  [0, 1, 2, 3, 4, 5].forEach((index) => {
    const card = document.getElementById(`s7-card-${index + 1}`);
    if (!card || !window.gsap) return;
    window.gsap.to(card, {
      x: stackOffsets[index].x + nx * 6,
      y: stackOffsets[index].y + ny * 6,
      duration: 1.9,
      ease: "power1.out",
      overwrite: "auto"
    });
    card.style.filter = "brightness(0.70) contrast(1.22) saturate(0.65)";
  });
  const math = document.getElementById("s7-math");
  if (math && window.gsap) {
    window.gsap.to(math, {
      x: nx * 13,
      y: ny * 13,
      duration: 1.0,
      ease: "power1.out",
      overwrite: "auto"
    });
    math.style.textShadow =
      `0 0 ${6 + glow * 16}px rgba(255,255,255,${0.5 + glow * 0.5}),` +
      `0 0 ${38 + glow * 75}px rgba(204,0,0,${0.55 + glow * 0.45}),` +
      `0 0 ${110 + glow * 130}px rgba(204,0,0,${0.08 + glow * 0.22})`;
  }
}

export function startEndingAnimation() {
  const quoteEl = document.getElementById("s8-quote");
  if (!quoteEl || !window.gsap) return;
  window.gsap.set(["#s8-author", "#s8-holm", "#s8-url"], { opacity: 0 });
  window.gsap.set("#s8-divider", { width: "0px" });
  quoteEl.style.opacity = "1";

  if (quoteEl._splitInstance) quoteEl._splitInstance.revert();
  let chars = [];
  if (window.SplitText) {
    const split = new window.SplitText(quoteEl, { type: "chars,words,lines", linesClass: "s8-line" });
    quoteEl._splitInstance = split;
    chars = split.chars;
  } else {
    const text = quoteEl.textContent.trim();
    quoteEl.innerHTML = [...text].map((char) => `<span class="s8-char">${char}</span>`).join("");
    chars = [...quoteEl.querySelectorAll(".s8-char")];
  }

  window.gsap.set(chars, { opacity: 0, y: 60, rotationX: -90, transformOrigin: "50% 50% -20px" });
  window.gsap.timeline()
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
