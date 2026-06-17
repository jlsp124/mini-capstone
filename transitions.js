let lenisInstance = null;
let mobileMode = false;
let globalTransitionLock = false;

const preventTouch = (event) => event.preventDefault();

export function setTransitionContext({ lenis, isMobile }) {
  lenisInstance = lenis || null;
  mobileMode = Boolean(isMobile);
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

function completeWithoutGsap(onMidpoint) {
  try {
    onMidpoint();
  } catch (error) {
    console.error(error);
  }
  releaseLock();
}

export function glitchTransition(onMidpoint, outEl = null) {
  lockScroll();
  const canvas = document.getElementById("hero-canvas");
  const corners = [...document.querySelectorAll(".opening-corner")];
  const outgoing = [canvas, outEl, ...corners].filter(Boolean);
  if (!window.gsap || !canvas) {
    completeWithoutGsap(onMidpoint);
    return;
  }
  const timeline = window.gsap.timeline({ onComplete: releaseLock });
  timeline.to(outgoing, { skewX: 10, duration: 0.05, ease: "none" })
    .to(outgoing, { skewX: -8, duration: 0.05, ease: "none" })
    .to(outgoing, { skewX: 5, duration: 0.05, ease: "none" })
    .to(outgoing, { skewX: 0, duration: 0.05, ease: "none" })
    .to(outgoing, { opacity: 0, duration: 0.1, ease: "none" })
    .add(() => {
      try { onMidpoint(); } catch (error) { console.error(error); }
    })
    .to(canvas, { skewX: -5, duration: 0.05, ease: "none" })
    .to(canvas, { skewX: 3, duration: 0.05, ease: "none" })
    .to(canvas, { skewX: 0, opacity: 1, duration: 0.1, ease: "none" });
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
    for (let i = 0; i < imageData.data.length; i += 4) {
      const value = Math.random() * 255;
      imageData.data[i] = value;
      imageData.data[i + 1] = value;
      imageData.data[i + 2] = value;
      imageData.data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    frame++;
    if (frame === 8 && !midpointCalled) {
      midpointCalled = true;
      try { onMidpoint(); } catch (error) { console.error(error); }
    }
    if (frame < 16) {
      requestAnimationFrame(drawStatic);
    } else {
      if (!midpointCalled) {
        try { onMidpoint(); } catch (error) { console.error(error); }
      }
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      releaseLock();
    }
  }

  drawStatic();
}

export function curtainTransition(onMidpoint) {
  if (lenisInstance) lenisInstance.stop();
  document.addEventListener("touchmove", preventTouch, { passive: false });
  globalTransitionLock = true;
  const overlay = document.createElement("div");
  overlay.className = "transition-curtain";
  document.body.appendChild(overlay);
  document.body.style.pointerEvents = "none";
  let midpointCalled = false;

  if (!window.gsap) {
    overlay.style.opacity = "1";
    setTimeout(() => {
      try { onMidpoint(); } catch (error) { console.error(error); }
      overlay.remove();
      document.body.style.pointerEvents = "";
      releaseLock();
    }, 300);
    return;
  }

  const timeline = window.gsap.timeline({
    onComplete: () => {
      if (document.body.contains(overlay)) document.body.removeChild(overlay);
      document.body.style.pointerEvents = "";
      releaseLock();
    }
  });

  timeline.to(overlay, {
    opacity: 1,
    duration: 2.5,
    ease: "power1.inOut",
    onComplete: () => {
      if (!midpointCalled) {
        midpointCalled = true;
        try { onMidpoint(); } catch (error) { console.error(error); }
      }
    }
  }).to(overlay, {
    opacity: 0,
    duration: 3,
    ease: "power1.inOut"
  }, "+=0.5");
}

export function glitchTransitionEl(outEl, inEl, onMidpoint) {
  lockScroll();
  if (!window.gsap || !outEl || !inEl) {
    if (outEl) outEl.style.opacity = "0";
    if (inEl) inEl.style.opacity = "1";
    completeWithoutGsap(onMidpoint);
    return;
  }
  window.gsap.set(inEl, { opacity: 0 });
  const timeline = window.gsap.timeline({ onComplete: releaseLock });
  timeline.to(outEl, { skewX: 10, duration: 0.05, ease: "none" })
    .to(outEl, { skewX: -8, duration: 0.05, ease: "none" })
    .to(outEl, { skewX: 5, duration: 0.05, ease: "none" })
    .to(outEl, { skewX: 0, duration: 0.05, ease: "none" })
    .to(outEl, { opacity: 0, duration: 0.1, ease: "none" })
    .add(() => {
      try { onMidpoint(); } catch (error) { console.error(error); }
    })
    .to(inEl, { skewX: -5, duration: 0.05, ease: "none" })
    .to(inEl, { skewX: 3, duration: 0.05, ease: "none" })
    .to(inEl, { skewX: 0, opacity: 1, duration: 0.1, ease: "none" });
}

export function glitchTransitionReverse(onMidpoint, outEl = null) {
  lockScroll();
  const canvas = document.getElementById("hero-canvas");
  const opening = document.getElementById("opening");
  const corners = [...document.querySelectorAll(".opening-corner")];
  const incoming = [canvas, opening, ...corners].filter(Boolean);
  const outgoing = outEl || document.getElementById("opening-interlude") || document.getElementById("section-2");
  if (!window.gsap || !canvas || !outgoing) {
    completeWithoutGsap(onMidpoint);
    return;
  }
  canvas.style.visibility = "visible";
  window.gsap.set(incoming, { opacity: 0, skewX: 0 });
  const timeline = window.gsap.timeline({ onComplete: releaseLock });
  timeline.to(outgoing, { skewX: 10, duration: 0.05, ease: "none" })
    .to(outgoing, { skewX: -8, duration: 0.05, ease: "none" })
    .to(outgoing, { skewX: 5, duration: 0.05, ease: "none" })
    .to(outgoing, { skewX: 0, duration: 0.05, ease: "none" })
    .to(outgoing, { opacity: 0, duration: 0.1, ease: "none" })
    .add(() => {
      try { onMidpoint(); } catch (error) { console.error(error); }
    })
    .to(incoming, { skewX: -5, duration: 0.05, ease: "none" })
    .to(incoming, { skewX: 3, duration: 0.05, ease: "none" })
    .to(incoming, { skewX: 0, opacity: 1, duration: 0.1, ease: "none" });
}

export function mobileTransition(onMidpoint) {
  globalTransitionLock = true;
  const overlay = document.createElement("div");
  overlay.className = "transition-mobile";
  document.body.appendChild(overlay);
  void overlay.offsetHeight;
  overlay.style.opacity = "1";
  setTimeout(() => {
    try { onMidpoint(); } catch (error) { console.error(error); }
    overlay.style.opacity = "0";
    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      globalTransitionLock = false;
      window.dispatchEvent(new Event("scroll"));
    }, 270);
  }, 270);
}

export function transition(callback, outEl = null) {
  if (mobileMode) mobileTransition(callback);
  else glitchTransition(callback, outEl);
}

export function transitionEl(outEl, inEl, callback) {
  if (mobileMode) {
    mobileTransition(() => {
      if (outEl) outEl.style.opacity = "0";
      if (inEl) inEl.style.opacity = "1";
      callback();
    });
  } else {
    glitchTransitionEl(outEl, inEl, callback);
  }
}

export function transitionReverse(callback, outEl = null) {
  if (mobileMode) mobileTransition(callback);
  else glitchTransitionReverse(callback, outEl);
}

function waitForTransitionRelease(resolve) {
  if (!isTransitionLocked()) {
    resolve();
    return;
  }
  requestAnimationFrame(() => waitForTransitionRelease(resolve));
}

function completeImmediately(onMidpoint) {
  try {
    onMidpoint();
  } catch (error) {
    console.error(error);
  }
}

export const transitionRegistry = {
  none({ onMidpoint }) {
    completeImmediately(onMidpoint);
  },
  opening({ fromEl, direction, onMidpoint }) {
    if (direction < 0) transitionReverse(onMidpoint, fromEl);
    else transition(onMidpoint, fromEl);
  },
  element({ fromEl, toEl, onMidpoint }) {
    transitionEl(fromEl, toEl, onMidpoint);
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
    if (context.reducedMotion || transitionType === "none") {
      transitionRegistry.none(context);
      resolve();
      return;
    }

    transitionRegistry[transitionType](context);
    requestAnimationFrame(() => waitForTransitionRelease(resolve));
  });
}
