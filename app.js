import { scenes } from "./story.js";

const isMobile = window.innerWidth <= 768;
const stage = document.getElementById("story-stage");
const heroCanvas = document.getElementById("hero-canvas");
const heroCtx = heroCanvas.getContext("2d");
const cursorText = document.getElementById("cursor-text");
const cursorLight = document.getElementById("cursor-light");
const sceneCurrent = document.getElementById("scene-current");
const sceneTotal = document.getElementById("scene-total");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, nx: 0, ny: 0 };
const cursorWords = ["BLUEPRINT", "ARCHIVE", "PATHWAY", "SYSTEM"];
let cursorWordIndex = 0;
let activeIndex = 0;
let transitionLock = false;
let pendingIndex = null;
let typedTimer = null;
let heroFrame = 0;
let lenis = null;
let dentalStarted = false;
let dentalReady = false;

sceneTotal.textContent = String(scenes.length).padStart(2, "0");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function listMarkup(items = [], className = "scene-list") {
  return `<ul class="${className}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function metadataMarkup(items = []) {
  return `<div class="meta-row">${items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`;
}

function contextMarkup(scene) {
  return scene.context ? `<p class="context-line">${escapeHtml(scene.context)}</p>` : "";
}

function splitWords(text = "") {
  return escapeHtml(text)
    .split(" ")
    .map((word) => `<span class="word-shell"><span class="split-word">${word}</span></span>`)
    .join(" ");
}

function buildScene(scene) {
  const classes = ["story-scene", `template-${scene.template}`].join(" ");
  return `
    <section id="section-${scene.number}" class="${classes}" data-scene-number="${scene.number}" data-template="${scene.template}" aria-hidden="true">
      <div class="scene-noise" aria-hidden="true"></div>
      <div class="scene-inner">
        ${templateMarkup(scene)}
      </div>
    </section>
  `;
}

function templateMarkup(scene) {
  switch (scene.template) {
    case "opening":
      return `
        <div class="opening-lockup">
          ${metadataMarkup(scene.metadata)}
          <h1>${escapeHtml(scene.title)}</h1>
          <p class="opening-subtitle">${escapeHtml(scene.subtitle)}</p>
          <p class="opening-line">${escapeHtml(scene.line)}</p>
          ${contextMarkup(scene)}
        </div>
      `;
    case "text-reveal":
      return `
        <div class="quote-panel">
          <p class="kicker">${escapeHtml(scene.kicker)}</p>
          <h2>${splitWords(scene.line)}</h2>
          ${contextMarkup(scene)}
          ${listMarkup(scene.items, "orbit-list")}
        </div>
      `;
    case "archive":
      return `
        <div class="archive-layout">
          <div class="archive-copy">
            <p class="kicker">${escapeHtml(scene.kicker)}</p>
            <h2>${escapeHtml(scene.title)}</h2>
            <div class="typed-block">
              <span class="typed-target" data-text="${escapeHtml(scene.typed)}"></span><span class="caret">_</span>
            </div>
            ${contextMarkup(scene)}
            ${listMarkup(scene.lines, "archive-lines")}
          </div>
          <div class="archive-visual hover-reactive">
            <div class="archive-file">
              <span>${escapeHtml(scene.recordLabel || "Record")}</span>
              <strong>${escapeHtml(scene.fileTitle)}</strong>
              ${listMarkup(scene.metadata, "file-meta")}
            </div>
          </div>
        </div>
      `;
    case "quote":
      return `
        <div class="quote-panel">
          <p class="kicker">${escapeHtml(scene.kicker)}</p>
          <h2>${splitWords(scene.quote)}</h2>
          ${contextMarkup(scene)}
          ${listMarkup(scene.items, "module-row")}
        </div>
      `;
    case "dramatic-image":
      return `
        <div class="dramatic-grid">
          <div>
            <p class="kicker">${escapeHtml(scene.kicker)}</p>
            <h2>${escapeHtml(scene.title)}</h2>
            ${listMarkup(scene.lines, "large-lines")}
            ${contextMarkup(scene)}
          </div>
          <div class="poster-object hover-reactive">
            <span class="object-label">${escapeHtml(scene.objectLabel)}</span>
            <div class="jaw-symbol" aria-hidden="true"></div>
          </div>
        </div>
      `;
    case "system-object":
      return `
        <div class="system-layout">
          <p class="kicker">${escapeHtml(scene.kicker)}</p>
          <div class="system-core drift-object">${escapeHtml(scene.center)}</div>
          ${listMarkup(scene.items, "system-nodes")}
          <p class="support-line">${escapeHtml(scene.line)}</p>
          ${contextMarkup(scene)}
        </div>
      `;
    case "split":
      return `
        <div class="split-layout">
          <div>
            <p class="kicker">${escapeHtml(scene.kicker)}</p>
            <h2>${splitWords(scene.line)}</h2>
            ${contextMarkup(scene)}
          </div>
          ${listMarkup(scene.items, "split-keywords")}
        </div>
      `;
    case "pathway":
      return `
        <div class="pathway-layout">
          <div class="archive-copy">
            <p class="kicker">${escapeHtml(scene.kicker)}</p>
            <h2>${escapeHtml(scene.title)}</h2>
            <div class="typed-block">
              <span class="typed-target" data-text="${escapeHtml(scene.roadmap)}"></span><span class="caret">_</span>
            </div>
            ${contextMarkup(scene)}
            ${listMarkup(scene.branches, "branch-list")}
          </div>
          <div class="route-scroll">
            ${scene.stages.map((item, index) => `<span style="--i:${index}">${escapeHtml(item)}</span>`).join("")}
          </div>
        </div>
      `;
    case "file-stack":
      return `
        <div class="file-stack-layout">
          <div>
            <p class="kicker">${escapeHtml(scene.kicker)}</p>
            <h2>${escapeHtml(scene.title)}</h2>
            <p class="support-line">${escapeHtml(scene.note)}</p>
            ${contextMarkup(scene)}
          </div>
          <div class="file-stack hover-reactive">
            ${scene.items.map((item, index) => `<article class="stack-file" style="--i:${index}"><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(item)}</strong></article>`).join("")}
          </div>
        </div>
      `;
    case "sequence":
      return `
        <div class="sequence-layout">
          <p class="kicker">${escapeHtml(scene.kicker)}</p>
          <h2>${splitWords(scene.line)}</h2>
          ${contextMarkup(scene)}
          <div class="sequence-rail">
            ${scene.items.map((item, index) => `<span style="--i:${index}">${escapeHtml(item)}</span>`).join("")}
          </div>
          ${scene.final ? `<p class="support-line">${escapeHtml(scene.final)}</p>` : ""}
        </div>
      `;
    case "practice-system":
      return `
        <div class="practice-layout">
          <div>
            <p class="kicker">${escapeHtml(scene.kicker)}</p>
            <h2>${splitWords(scene.line)}</h2>
            ${contextMarkup(scene)}
          </div>
          <div class="practice-map drift-object">
            ${scene.items.map((item, index) => `<span style="--i:${index}">${escapeHtml(item)}</span>`).join("")}
          </div>
        </div>
      `;
    case "rotating":
      return `
        <div class="rotating-layout">
          <div>
            <p class="kicker">${escapeHtml(scene.kicker)}</p>
            <h2>${escapeHtml(scene.title)}</h2>
            ${listMarkup(scene.lines, "large-lines")}
            ${contextMarkup(scene)}
          </div>
          <div class="model-stage hover-reactive">
            <canvas id="dental-canvas" aria-label="Rotating dental scan model"></canvas>
            <div id="dental-fallback" class="dental-placeholder">
              <span>DIGITAL MODEL</span>
              <strong>STL SCAN PLACEHOLDER</strong>
            </div>
          </div>
        </div>
      `;
    case "network":
      return `
        <div class="network-layout">
          <p class="kicker">${escapeHtml(scene.kicker)}</p>
          <h2>${splitWords(scene.line)}</h2>
          ${contextMarkup(scene)}
          <div class="network-field">
            ${scene.items.map((item, index) => `<span style="--i:${index}">${escapeHtml(item)}</span>`).join("")}
          </div>
          ${scene.final ? `<p class="support-line">${escapeHtml(scene.final)}</p>` : ""}
        </div>
      `;
    case "marquee":
      return `
        <div class="marquee-layout">
          <div>
            <p class="kicker">${escapeHtml(scene.kicker)}</p>
            <h2>${escapeHtml(scene.title)}</h2>
            <p class="support-line">${escapeHtml(scene.line)}</p>
            ${contextMarkup(scene)}
          </div>
          <div class="motion-loop" aria-hidden="true">
            <div>${[...scene.items, ...scene.items].map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
          </div>
          <p class="bottom-line">${escapeHtml(scene.final)}</p>
        </div>
      `;
    case "hover-image":
      return `
        <div class="hover-image-layout">
          <div class="hover-photo hover-reactive">
            <img src="${escapeHtml(scene.asset)}" alt="">
          </div>
          <div>
            <p class="kicker">${escapeHtml(scene.kicker)}</p>
            <h2>${splitWords(scene.quote)}</h2>
            <p class="support-line">${escapeHtml(scene.final)}</p>
            ${contextMarkup(scene)}
          </div>
        </div>
      `;
    case "command":
      return `
        <div class="command-layout">
          <p class="kicker">${escapeHtml(scene.kicker)}</p>
          <h2>${escapeHtml(scene.title)}</h2>
          ${contextMarkup(scene)}
          <div class="typed-note">
            <span class="typed-target" data-text="${escapeHtml(scene.lines.join(" / "))}"></span><span class="caret">_</span>
          </div>
          <p class="support-line">${escapeHtml(scene.final)}</p>
          ${listMarkup(scene.items, "module-row")}
        </div>
      `;
    case "skill-wheel":
      return `
        <div class="system-layout">
          <p class="kicker">${escapeHtml(scene.kicker)}</p>
          <div class="system-core drift-object">${escapeHtml(scene.center)}</div>
          ${listMarkup(scene.items, "skill-wheel")}
          ${contextMarkup(scene)}
        </div>
      `;
    case "image-stack":
      return `
        <div class="image-stack-layout">
          <div>
            <p class="kicker">${escapeHtml(scene.kicker)}</p>
            <h2>${splitWords(scene.line)}</h2>
            <p class="support-line">${escapeHtml(scene.final)}</p>
            ${contextMarkup(scene)}
          </div>
          <div class="image-stack hover-reactive">
            ${scene.items.map((item, index) => `<span style="--i:${index}">${escapeHtml(item)}</span>`).join("")}
          </div>
        </div>
      `;
    case "roadmap":
      return `
        <div class="roadmap-layout">
          <p class="kicker">${escapeHtml(scene.kicker)}</p>
          <h2>${escapeHtml(scene.title)}</h2>
          ${contextMarkup(scene)}
          <div class="roadmap-line">
            ${scene.stages.map((item, index) => `<span style="--i:${index}">${escapeHtml(item)}</span>`).join("")}
          </div>
          ${listMarkup(scene.items, "roadmap-details")}
        </div>
      `;
    case "final":
      return `
        <div class="final-layout">
          <p class="kicker">${escapeHtml(scene.kicker)}</p>
          <div class="source-stack">
            ${scene.items.map((item, index) => `<span style="--i:${index}">${escapeHtml(item)}</span>`).join("")}
          </div>
          <h2 id="final-quote">${splitWords(scene.quote || scene.title)}</h2>
          ${contextMarkup(scene)}
          <div class="final-divider"></div>
          <p class="final-credit">${escapeHtml(scene.final)}</p>
        </div>
      `;
    default:
      return `<h2>${escapeHtml(scene.title)}</h2>`;
  }
}

stage.innerHTML = scenes.map(buildScene).join("");

const sceneEls = [...document.querySelectorAll(".story-scene")];

document.body.style.height = `${scenes.length * (isMobile ? 120 : 105)}vh`;
document.documentElement.style.scrollBehavior = "auto";
window.scrollTo(0, 0);

if (window.gsap && window.SplitText) {
  window.gsap.registerPlugin(window.SplitText);
}

if (window.Lenis && !prefersReducedMotion.matches) {
  lenis = new window.Lenis({
    lerp: 0.08,
    smoothWheel: true,
    touchMultiplier: 1.2,
  });
  lenis.stop();
}

function raf(time) {
  if (lenis) lenis.raf(time);
  drawHeroCanvas();
  moveActiveObjects();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
  heroCanvas.width = Math.round(window.innerWidth * dpr);
  heroCanvas.height = Math.round(window.innerHeight * dpr);
  heroCanvas.style.width = `${window.innerWidth}px`;
  heroCanvas.style.height = `${window.innerHeight}px`;
  heroCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawHeroCanvas() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  heroFrame += 0.008;
  heroCtx.clearRect(0, 0, w, h);
  heroCtx.fillStyle = "#050505";
  heroCtx.fillRect(0, 0, w, h);

  const grid = isMobile ? 72 : 96;
  heroCtx.strokeStyle = "rgba(255,255,255,0.045)";
  heroCtx.lineWidth = 1;
  for (let x = -grid; x < w + grid; x += grid) {
    const drift = Math.sin(heroFrame + x * 0.006) * 8;
    heroCtx.beginPath();
    heroCtx.moveTo(x + drift, 0);
    heroCtx.lineTo(x - drift, h);
    heroCtx.stroke();
  }
  for (let y = -grid; y < h + grid; y += grid) {
    const drift = Math.cos(heroFrame + y * 0.005) * 8;
    heroCtx.beginPath();
    heroCtx.moveTo(0, y + drift);
    heroCtx.lineTo(w, y - drift);
    heroCtx.stroke();
  }

  const cx = w / 2 + pointer.nx * 34;
  const cy = h / 2 + pointer.ny * 26;
  const radius = Math.min(w, h) * 0.22;
  heroCtx.strokeStyle = "rgba(255,255,255,0.22)";
  heroCtx.lineWidth = 1.4;
  for (let i = 0; i < 4; i++) {
    heroCtx.beginPath();
    heroCtx.ellipse(cx, cy, radius + i * 34, radius * 0.52 + i * 18, heroFrame + i * 0.3, 0, Math.PI * 2);
    heroCtx.stroke();
  }

  heroCtx.fillStyle = "rgba(255,255,255,0.72)";
  heroCtx.font = `${isMobile ? 12 : 16}px 'Bebas Neue', sans-serif`;
  heroCtx.letterSpacing = "0px";
  heroCtx.fillText("FUTURE BLUEPRINT / PERSONAL SYSTEM", 36, h - 36);
}

function activateScene(index, useTransition = true) {
  index = Math.max(0, Math.min(scenes.length - 1, index));
  if (index === activeIndex && sceneEls[index].classList.contains("is-active")) return;
  if (transitionLock) {
    pendingIndex = index;
    return;
  }

  const previous = sceneEls[activeIndex];
  const next = sceneEls[index];

  const switchScene = () => {
    if (previous) {
      previous.classList.remove("is-active");
      previous.setAttribute("aria-hidden", "true");
    }
    next.classList.add("is-active");
    next.setAttribute("aria-hidden", "false");
    activeIndex = index;
    sceneCurrent.textContent = String(index + 1).padStart(2, "0");
    runSceneAnimation(next, scenes[index]);
  };

  if (useTransition) {
    staticTransition(switchScene);
  } else {
    switchScene();
  }
}

function staticTransition(onMidpoint) {
  transitionLock = true;
  window.__staticTransitionCount = (window.__staticTransitionCount || 0) + 1;
  document.documentElement.dataset.transition = "static-signal";
  if (lenis) lenis.stop();
  const canvas = document.createElement("canvas");
  canvas.className = "static-canvas";
  canvas.width = Math.max(1, Math.floor(window.innerWidth / 4));
  canvas.height = Math.max(1, Math.floor(window.innerHeight / 4));
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  let frame = 0;
  let midpointCalled = false;

  function drawStatic() {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = Math.random() * 255;
      imageData.data[i] = v;
      imageData.data[i + 1] = v;
      imageData.data[i + 2] = v;
      imageData.data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    frame++;
    if (frame === 8 && !midpointCalled) {
      midpointCalled = true;
      onMidpoint();
    }
    if (frame < 16 && !prefersReducedMotion.matches) {
      requestAnimationFrame(drawStatic);
    } else {
      if (!midpointCalled) onMidpoint();
      canvas.remove();
      transitionLock = false;
      if (lenis) lenis.start();
      if (pendingIndex !== null && pendingIndex !== activeIndex) {
        const queued = pendingIndex;
        pendingIndex = null;
        activateScene(queued, true);
      } else {
        pendingIndex = null;
      }
    }
  }
  drawStatic();
}

function typeWriter(element, text, speed = 28) {
  if (!element) return;
  clearInterval(typedTimer);
  element.textContent = "";
  let i = 0;
  typedTimer = setInterval(() => {
    element.textContent += text[i] || "";
    i++;
    if (i >= text.length) clearInterval(typedTimer);
  }, prefersReducedMotion.matches ? 1 : speed);
}

function runSceneAnimation(sceneEl, scene) {
  if (window.gsap) {
    animateTargets(sceneEl.querySelectorAll(".split-word"), (targets) => {
      window.gsap.killTweensOf(targets);
      window.gsap.set(targets, { y: "110%" });
      window.gsap.to(targets, {
        y: "0%",
        duration: prefersReducedMotion.matches ? 0 : 0.7,
        stagger: 0.035,
        ease: "power3.out",
        delay: 0.12,
      });
    });
    animateTargets(sceneEl.querySelectorAll(".context-line, .archive-lines li, .system-nodes li, .split-keywords li, .module-row li, .branch-list li, .skill-wheel li, .roadmap-details li, .large-lines li"), (targets) => {
      window.gsap.killTweensOf(targets);
      window.gsap.fromTo(targets,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: prefersReducedMotion.matches ? 0 : 0.7, stagger: 0.055, ease: "power3.out", delay: 0.2 }
      );
    });
    animateTargets(sceneEl.querySelectorAll(".stack-file, .source-stack span, .roadmap-line span, .sequence-rail span, .route-scroll span"), (targets) => {
      window.gsap.killTweensOf(targets);
      window.gsap.fromTo(targets,
        { opacity: 0, y: 90, rotate: -4 },
        { opacity: 1, y: 0, rotate: 0, duration: prefersReducedMotion.matches ? 0 : 0.85, stagger: 0.06, ease: "back.out(1.15)", delay: 0.16 }
      );
    });
  }

  const typed = sceneEl.querySelector(".typed-target");
  if (typed) typeWriter(typed, typed.dataset.text || "", scene.template === "command" ? 22 : 30);

  if (scene.template === "rotating" && !dentalStarted) {
    initDentalModel();
  }
}

function animateTargets(targets, callback) {
  if (!targets || targets.length === 0) return;
  callback(targets);
}

function updateFromScroll() {
  const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
  const progress = Math.max(0, Math.min(0.9999, window.scrollY / maxScroll));
  const index = Math.min(scenes.length - 1, Math.floor(progress * scenes.length));
  if (index !== activeIndex) activateScene(index, true);
}

function moveActiveObjects() {
  const active = sceneEls[activeIndex];
  if (!active) return;
  active.style.setProperty("--mx", pointer.nx.toFixed(3));
  active.style.setProperty("--my", pointer.ny.toFixed(3));
  active.querySelectorAll(".drift-object").forEach((el) => {
    el.style.transform = `translate3d(${pointer.nx * 18}px, ${pointer.ny * 14}px, 0) rotateX(${-pointer.ny * 5}deg) rotateY(${pointer.nx * 8}deg)`;
  });
}

window.addEventListener("scroll", updateFromScroll, { passive: true });
window.addEventListener("resize", () => {
  resizeCanvas();
  if (dentalReady) resizeDentalModel();
}, { passive: true });

window.addEventListener("mousemove", (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  pointer.nx = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.ny = (event.clientY / window.innerHeight) * 2 - 1;
  document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
  document.documentElement.style.setProperty("--nx", pointer.nx.toFixed(3));
  document.documentElement.style.setProperty("--ny", pointer.ny.toFixed(3));
  if (cursorText) {
    cursorText.style.left = `${event.clientX}px`;
    cursorText.style.top = `${event.clientY}px`;
    cursorText.style.opacity = "1";
  }
}, { passive: true });

setInterval(() => {
  if (!cursorText || cursorText.style.opacity !== "1") return;
  cursorWordIndex = (cursorWordIndex + 1) % cursorWords.length;
  cursorText.textContent = cursorWords[cursorWordIndex];
}, 700);

stage.addEventListener("mousemove", (event) => {
  const target = event.target.closest(".hover-reactive");
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
  target.style.setProperty("--hx", x.toFixed(3));
  target.style.setProperty("--hy", y.toFixed(3));
}, { passive: true });

stage.addEventListener("mouseleave", () => {
  document.querySelectorAll(".hover-reactive").forEach((el) => {
    el.style.setProperty("--hx", "0");
    el.style.setProperty("--hy", "0");
  });
});

let dental = null;

async function initDentalModel() {
  dentalStarted = true;
  const canvas = document.getElementById("dental-canvas");
  const fallback = document.getElementById("dental-fallback");
  if (!canvas) return;

  try {
    const THREE = await import("three");
    const { STLLoader } = await import("three/addons/loaders/STLLoader.js");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.8));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0, 105);

    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const key = new THREE.PointLight(0xffffff, 180);
    key.position.set(36, 46, 72);
    scene.add(key);
    const rim = new THREE.PointLight(0x6ea8c7, 70);
    rim.position.set(-48, -18, 50);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    const loader = new STLLoader();
    const material = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      roughness: 0.42,
      metalness: 0.28,
    });

    const paths = [
      "assets/dental/Visualization_DigitalModelUnsectioned_18-28.stl",
      "assets/dental/Visualization_DigitalModelUnsectioned_38-48.stl",
    ];

    const meshes = await Promise.all(paths.map((path, index) => new Promise((resolve) => {
      loader.load(path, (geometry) => {
        geometry.computeVertexNormals();
        geometry.center();
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = index === 0 ? 10 : -10;
        group.add(mesh);
        resolve(mesh);
      }, undefined, () => resolve(null));
    })));

    if (!meshes.some(Boolean)) throw new Error("No STL geometry loaded");

    const box = new THREE.Box3().setFromObject(group);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    group.position.sub(center);
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    group.scale.setScalar(56 / maxAxis);

    dental = { THREE, renderer, scene, camera, group, canvas };
    dentalReady = true;
    if (fallback) fallback.style.display = "none";
    resizeDentalModel();
    animateDentalModel();
  } catch {
    if (fallback) fallback.classList.add("is-visible");
  }
}

function resizeDentalModel() {
  if (!dental) return;
  const rect = dental.canvas.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  dental.camera.aspect = width / height;
  dental.camera.updateProjectionMatrix();
  dental.renderer.setSize(width, height, false);
}

function animateDentalModel() {
  if (!dental) return;
  dental.group.rotation.y += 0.006 + Math.abs(pointer.nx) * 0.002;
  dental.group.rotation.x += ((pointer.ny * 0.2) - dental.group.rotation.x) * 0.04;
  dental.group.rotation.z += ((-pointer.nx * 0.12) - dental.group.rotation.z) * 0.04;
  dental.renderer.render(dental.scene, dental.camera);
  requestAnimationFrame(animateDentalModel);
}

resizeCanvas();
activateScene(0, false);

const readyPromise = new Promise((resolve) => requestAnimationFrame(resolve));
if (window._loaderSetReadyPromise) window._loaderSetReadyPromise(readyPromise);

window._onLoaderHidden = () => {
  document.body.style.overflow = "";
  if (lenis) lenis.start();
  if (window.gsap) {
    window.gsap.fromTo(".story-scene.is-active .opening-lockup", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.8, ease: "power4.out" });
  }
};
