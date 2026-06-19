let lenisInstance = null;
let mobileMode = false;
let gsapMode = false;
let reducedMotionMode = false;
let globalTransitionLock = false;

const preventTouch = (event) => event.preventDefault();
const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
const settle = (promise, onDone) => promise.then(onDone, onDone);

export function setTransitionContext({ lenis, isMobile, gsapAvailable, reducedMotion }) {
  lenisInstance = lenis || null;
  mobileMode = Boolean(isMobile);
  gsapMode = Boolean(gsapAvailable && window.gsap?.timeline);
  reducedMotionMode = Boolean(reducedMotion);
}

function getGsap() {
  return gsapMode ? window.gsap : null;
}

export function isTransitionLocked() {
  return globalTransitionLock;
}

export function lockScroll() {
  globalTransitionLock = true;
  if (lenisInstance) lenisInstance.stop();
  document.addEventListener("touchmove", preventTouch, { passive: false });
}

export function releaseLock() {
  globalTransitionLock = false;
  document.removeEventListener("touchmove", preventTouch);
  if (lenisInstance) lenisInstance.start();
  window.dispatchEvent(new Event("scroll"));
}

function callMidpoint(onMidpoint) {
  try {
    onMidpoint();
  } catch (error) {
    console.error(error);
  }
}

function uniqueElements(elements) {
  return [...new Set(elements.filter(Boolean))];
}

function applyFrame(element, frame) {
  ["opacity", "transform", "clipPath"].forEach((property) => {
    if (frame[property] !== undefined) element.style[property] = String(frame[property]);
  });
}

async function animateElement(element, keyframes, options) {
  if (!element || !keyframes.length) return;
  const finalFrame = keyframes[keyframes.length - 1];

  if (typeof element.animate === "function") {
    try {
      const animation = element.animate(keyframes, { fill: "forwards", ...options });
      await Promise.race([
        animation.finished?.catch(() => undefined) || Promise.resolve(),
        wait((Number(options.duration) || 0) + 80)
      ]);
      applyFrame(element, finalFrame);
      animation.cancel();
      return;
    } catch (error) {
      // Continue with the CSS transition fallback below.
    }
  }

  const duration = Number(options.duration) || 0;
  const previousTransition = element.style.transition;
  applyFrame(element, keyframes[0]);
  void element.offsetWidth;
  element.style.setProperty(
    "transition",
    `opacity ${duration}ms linear, transform ${duration}ms linear, clip-path ${duration}ms linear`,
    "important"
  );
  let finalApplied = false;
  const applyFinalFrame = () => {
    if (finalApplied) return;
    finalApplied = true;
    applyFrame(element, finalFrame);
  };
  requestAnimationFrame(applyFinalFrame);
  setTimeout(applyFinalFrame, 32);
  await wait(duration + 24);
  element.style.transition = previousTransition;
}

function animateElements(elements, keyframesFactory, options) {
  return Promise.all(uniqueElements(elements).map((element) => (
    animateElement(element, keyframesFactory(element), options)
  )));
}

function getOpacity(element, fallback = 1) {
  const value = Number.parseFloat(getComputedStyle(element).opacity);
  return Number.isFinite(value) ? value : fallback;
}

function getOpeningElements(section) {
  if (section?.id !== "opening") return [section].filter(Boolean);
  return uniqueElements([
    document.getElementById("hero-canvas"),
    section,
    ...document.querySelectorAll(".opening-corner")
  ]);
}

async function runWaapiGlitch({ outgoing, incoming, onMidpoint, direction = 1 }) {
  const sign = direction < 0 ? -1 : 1;
  await animateElements(outgoing, (element) => {
    const startOpacity = getOpacity(element);
    return [
      { opacity: startOpacity, transform: "translateX(0) skewX(0deg)" },
      { offset: 0.2, opacity: Math.max(0.72, startOpacity * 0.9), transform: `translateX(${12 * sign}px) skewX(${9 * sign}deg)` },
      { offset: 0.4, opacity: Math.max(0.92, startOpacity), transform: `translateX(${-9 * sign}px) skewX(${-7 * sign}deg)` },
      { offset: 0.6, opacity: Math.max(0.56, startOpacity * 0.7), transform: `translateX(${7 * sign}px) skewX(${5 * sign}deg)` },
      { offset: 0.8, opacity: Math.max(0.86, startOpacity * 0.9), transform: `translateX(${-4 * sign}px) skewX(${-3 * sign}deg)` },
      { opacity: 0, transform: `translateX(${18 * sign}px) skewX(0deg)` }
    ];
  }, { duration: 600, easing: "linear" });

  callMidpoint(onMidpoint);
  const incomingElements = uniqueElements(incoming);
  incomingElements.forEach((element) => {
    element.style.opacity = "0.12";
    element.style.transform = `translateX(${-16 * sign}px) skewX(${-5 * sign}deg)`;
  });

  await animateElements(incomingElements, () => [
    { opacity: 0.12, transform: `translateX(${-16 * sign}px) skewX(${-5 * sign}deg)` },
    { offset: 0.28, opacity: 0.82, transform: `translateX(${7 * sign}px) skewX(${4 * sign}deg)` },
    { offset: 0.48, opacity: 0.42, transform: `translateX(${-5 * sign}px) skewX(${-3 * sign}deg)` },
    { offset: 0.7, opacity: 0.9, transform: `translateX(${3 * sign}px) skewX(${2 * sign}deg)` },
    { opacity: 1, transform: "translateX(0) skewX(0deg)" }
  ], { duration: 600, easing: "linear" });
}

async function runWaapiElement({ outEl, inEl, onMidpoint, direction = 1 }) {
  const sign = direction < 0 ? -1 : 1;
  if (outEl) {
    const startOpacity = getOpacity(outEl);
    await animateElement(outEl, [
      { opacity: startOpacity, transform: "translateX(0) skewX(0deg) scale(1)" },
      { offset: 0.45, opacity: Math.max(0.78, startOpacity * 0.9), transform: `translateX(${12 * sign}px) skewX(${7 * sign}deg) scale(1.01)` },
      { offset: 0.72, opacity: Math.max(0.48, startOpacity * 0.62), transform: `translateX(${-8 * sign}px) skewX(${-5 * sign}deg) scale(0.995)` },
      { opacity: 0, transform: `translateX(${24 * sign}px) skewX(${3 * sign}deg) scale(0.985)` }
    ], { duration: 540, easing: "cubic-bezier(0.55, 0, 1, 0.45)" });
  }

  callMidpoint(onMidpoint);
  if (inEl) {
    inEl.style.opacity = "0.12";
    inEl.style.transform = `translateX(${-24 * sign}px) skewX(${-4 * sign}deg) scale(0.985)`;
    await animateElement(inEl, [
      { opacity: 0.12, transform: `translateX(${-24 * sign}px) skewX(${-4 * sign}deg) scale(0.985)` },
      { offset: 0.48, opacity: 0.76, transform: `translateX(${7 * sign}px) skewX(${3 * sign}deg) scale(1.008)` },
      { opacity: 1, transform: "translateX(0) skewX(0deg) scale(1)" }
    ], { duration: 500, easing: "cubic-bezier(0, 0.55, 0.45, 1)" });
  }
}

async function runReducedTransition({ fromEl, toEl, onMidpoint }) {
  lockScroll();
  const overlay = document.createElement("div");
  overlay.className = "transition-reduced";
  document.body.appendChild(overlay);
  const outgoing = getOpeningElements(fromEl);
  const incoming = getOpeningElements(toEl);
  try {
    await Promise.all([
      animateElements(outgoing, (element) => [
        { opacity: getOpacity(element) },
        { opacity: 0 }
      ], { duration: 180, easing: "ease-out" }),
      animateElement(overlay, [{ opacity: 0 }, { opacity: 0.2 }], { duration: 180, easing: "ease-out" })
    ]);

    callMidpoint(onMidpoint);
    incoming.forEach((element) => { element.style.opacity = "0.16"; });

    await Promise.all([
      animateElements(incoming, () => [{ opacity: 0.16 }, { opacity: 1 }], { duration: 180, easing: "ease-in" }),
      animateElement(overlay, [{ opacity: 0.2 }, { opacity: 0 }], { duration: 180, easing: "ease-in" })
    ]);
  } finally {
    overlay.remove();
    releaseLock();
  }
}

export function glitchTransition(onMidpoint, outEl = null, inEl = null, direction = 1) {
  lockScroll();
  const canvas = document.getElementById("hero-canvas");
  const corners = [...document.querySelectorAll(".opening-corner")];
  const outgoing = uniqueElements([canvas, outEl, ...corners]);
  const gsap = getGsap();

  if (!gsap || !canvas) {
    settle(runWaapiGlitch({ outgoing, incoming: [inEl], onMidpoint, direction }), releaseLock);
    return;
  }

  const sign = direction < 0 ? -1 : 1;
  const timeline = gsap.timeline({ onComplete: releaseLock });
  timeline.to(outgoing, { skewX: 10, duration: 0.09, ease: "none" })
    .to(outgoing, { skewX: -8, duration: 0.09, ease: "none" })
    .to(outgoing, { skewX: 5, duration: 0.09, ease: "none" })
    .to(outgoing, { skewX: 0, duration: 0.09, ease: "none" })
    .to(outgoing, { opacity: 0, duration: 0.2, ease: "none" })
    .add(() => callMidpoint(onMidpoint))
    .set(inEl, { opacity: 0, x: -18 * sign, skewX: -5 * sign })
    .to(inEl, { opacity: 0.82, x: 7 * sign, skewX: 3 * sign, duration: 0.25, ease: "none" })
    .to(inEl, { opacity: 0.44, x: -4 * sign, skewX: -2 * sign, duration: 0.15, ease: "none" })
    .to(inEl, { opacity: 1, x: 0, skewX: 0, duration: 0.25, ease: "none", clearProps: "x,skewX" });
}

export function staticTransition(onMidpoint) {
  lockScroll();
  const canvas = document.createElement("canvas");
  canvas.className = "transition-static";
  canvas.width = Math.max(1, Math.floor(window.innerWidth / 4));
  canvas.height = Math.max(1, Math.floor(window.innerHeight / 4));
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  let frame = 0;
  let midpointCalled = false;

  function drawStatic() {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    for (let index = 0; index < imageData.data.length; index += 4) {
      const value = Math.random() * 255;
      imageData.data[index] = value;
      imageData.data[index + 1] = value;
      imageData.data[index + 2] = value;
      imageData.data[index + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    frame++;
    if (frame === 24 && !midpointCalled) {
      midpointCalled = true;
      callMidpoint(onMidpoint);
    }
    if (frame < 48) {
      requestAnimationFrame(drawStatic);
    } else {
      if (!midpointCalled) callMidpoint(onMidpoint);
      canvas.remove();
      releaseLock();
    }
  }

  drawStatic();
}

export function curtainTransition(onMidpoint) {
  lockScroll();
  const overlay = document.createElement("div");
  overlay.className = "transition-curtain";
  document.body.appendChild(overlay);
  document.body.style.pointerEvents = "none";
  let midpointCalled = false;
  const cleanup = () => {
    overlay.remove();
    document.body.style.pointerEvents = "";
    releaseLock();
  };
  const midpoint = () => {
    if (midpointCalled) return;
    midpointCalled = true;
    callMidpoint(onMidpoint);
  };
  const gsap = getGsap();

  if (!gsap) {
    settle((async () => {
      await animateElement(overlay, [{ opacity: 0 }, { opacity: 1 }], { duration: 1050, easing: "ease-in-out" });
      midpoint();
      await animateElement(overlay, [{ opacity: 1 }, { opacity: 0 }], { duration: 1150, easing: "ease-in-out" });
    })(), cleanup);
    return;
  }

  gsap.timeline({ onComplete: cleanup })
    .to(overlay, {
      opacity: 1,
      duration: 1.05,
      ease: "power1.inOut",
      onComplete: midpoint
    })
    .to(overlay, { opacity: 0, duration: 1.1, ease: "power1.inOut" }, "+=0.15");
}

export function glitchTransitionEl(outEl, inEl, onMidpoint, direction = 1) {
  lockScroll();
  const gsap = getGsap();
  if (!gsap || !outEl || !inEl) {
    settle(runWaapiElement({ outEl, inEl, onMidpoint, direction }), releaseLock);
    return;
  }

  const sign = direction < 0 ? -1 : 1;
  const timeline = gsap.timeline({ onComplete: releaseLock });
  timeline.to(outEl, { skewX: 10, duration: 0.09, ease: "none" })
    .to(outEl, { skewX: -8, duration: 0.09, ease: "none" })
    .to(outEl, { skewX: 5, duration: 0.09, ease: "none" })
    .to(outEl, { skewX: 0, duration: 0.09, ease: "none" })
    .to(outEl, { opacity: 0, duration: 0.2, ease: "none" })
    .add(() => callMidpoint(onMidpoint))
    .set(inEl, { opacity: 0, x: -24 * sign, skewX: -5 * sign, scale: 0.985 })
    .to(inEl, { opacity: 0.78, x: 7 * sign, skewX: 3 * sign, scale: 1.008, duration: 0.25, ease: "none" })
    .to(inEl, { opacity: 1, x: 0, skewX: 0, scale: 1, duration: 0.25, ease: "power2.out", clearProps: "x,skewX,scale" });
}

export function glitchTransitionReverse(onMidpoint, outEl = null, direction = -1) {
  lockScroll();
  const canvas = document.getElementById("hero-canvas");
  const opening = document.getElementById("opening");
  const corners = [...document.querySelectorAll(".opening-corner")];
  const incoming = uniqueElements([canvas, opening, ...corners]);
  const outgoing = outEl || document.getElementById("opening-interlude") || document.getElementById("section-2");
  const gsap = getGsap();

  if (!gsap || !canvas || !outgoing) {
    if (canvas) canvas.style.visibility = "visible";
    settle(runWaapiGlitch({ outgoing: [outgoing], incoming, onMidpoint, direction }), releaseLock);
    return;
  }

  canvas.style.visibility = "visible";
  const timeline = gsap.timeline({ onComplete: releaseLock });
  timeline.to(outgoing, { skewX: 10, duration: 0.1, ease: "none" })
    .to(outgoing, { skewX: -8, duration: 0.1, ease: "none" })
    .to(outgoing, { skewX: 5, duration: 0.1, ease: "none" })
    .to(outgoing, { skewX: 0, duration: 0.1, ease: "none" })
    .to(outgoing, { opacity: 0, duration: 0.2, ease: "none" })
    .add(() => callMidpoint(onMidpoint))
    .set(incoming, { opacity: 0, skewX: 0 })
    .to(incoming, { skewX: -5, duration: 0.16, ease: "none" })
    .to(incoming, { skewX: 3, duration: 0.16, ease: "none" })
    .to(incoming, { skewX: 0, opacity: 1, duration: 0.28, ease: "none" });
}

export function mobileTransition(onMidpoint) {
  lockScroll();
  const overlay = document.createElement("div");
  overlay.className = "transition-mobile";
  document.body.appendChild(overlay);
  void overlay.offsetHeight;
  overlay.style.opacity = "1";
  setTimeout(() => {
    callMidpoint(onMidpoint);
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.remove();
      releaseLock();
    }, 270);
  }, 270);
}

export function transition(callback, outEl = null, inEl = null, direction = 1) {
  if (mobileMode) mobileTransition(callback);
  else glitchTransition(callback, outEl, inEl, direction);
}

export function transitionEl(outEl, inEl, callback, direction = 1) {
  if (mobileMode) {
    mobileTransition(() => {
      if (outEl) outEl.style.opacity = "0";
      if (inEl) inEl.style.opacity = "1";
      callback();
    });
  } else {
    glitchTransitionEl(outEl, inEl, callback, direction);
  }
}

export function transitionReverse(callback, outEl = null, direction = -1) {
  if (mobileMode) mobileTransition(callback);
  else glitchTransitionReverse(callback, outEl, direction);
}

function waitForTransitionRelease(resolve) {
  if (!isTransitionLocked()) {
    resolve();
    return;
  }
  requestAnimationFrame(() => waitForTransitionRelease(resolve));
}

function completeImmediately(onMidpoint) {
  callMidpoint(onMidpoint);
}

export const transitionRegistry = {
  none({ onMidpoint }) {
    completeImmediately(onMidpoint);
  },
  opening({ fromEl, toEl, direction, onMidpoint }) {
    if (direction < 0) transitionReverse(onMidpoint, fromEl, direction);
    else transition(onMidpoint, fromEl, toEl, direction);
  },
  element({ fromEl, toEl, direction, onMidpoint }) {
    transitionEl(fromEl, toEl, onMidpoint, direction);
  },
  signal({ onMidpoint }) {
    staticTransition(onMidpoint);
  },
  curtain({ onMidpoint }) {
    curtainTransition(onMidpoint);
  }
};

export function runRegisteredTransition(type, context) {
  const transitionType = transitionRegistry[type] ? type : "none";

  return new Promise((resolve) => {
    if (transitionType === "none") {
      transitionRegistry.none(context);
      resolve();
      return;
    }

    if (context.reducedMotion || reducedMotionMode) {
      runReducedTransition(context).then(resolve, resolve);
      return;
    }

    transitionRegistry[transitionType](context);
    requestAnimationFrame(() => waitForTransitionRelease(resolve));
  });
}
