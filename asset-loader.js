const missingAssets = new Set();

function recordMissing(path) {
  if (!path) return;
  missingAssets.add(path);
  window.__missingAssets = [...missingAssets];
}

function recordImageOrientation(image, width, height) {
  if (!image || !width || !height) return;
  const orientation = width > height ? "landscape" : height > width ? "portrait" : "square";
  image.dataset.orientation = orientation;
  image.style.setProperty("--media-aspect", `${width} / ${height}`);
  const photoPhase = image.closest(".photography-phase");
  if (photoPhase) {
    photoPhase.dataset.orientation = orientation;
    photoPhase.style.setProperty("--photo-aspect", `${width} / ${height}`);
  }
}

export function loadLazyImage(image) {
  if (!image || image.dataset.loadState === "loading" || image.dataset.loadState === "loaded") {
    return Promise.resolve(image?.dataset.loadState === "loaded");
  }

  const candidates = [image.dataset.src, image.dataset.fallbackSrc].filter(Boolean);
  image.dataset.loadState = "loading";

  return new Promise((resolve) => {
    const tryCandidate = (index) => {
      const path = candidates[index];
      if (!path) {
        image.dataset.loadState = "missing";
        image.classList.add("is-missing");
        resolve(false);
        return;
      }

      const probe = new Image();
      probe.onload = () => {
        image.src = path;
        recordImageOrientation(image, probe.naturalWidth, probe.naturalHeight);
        image.dataset.loadedSrc = path;
        image.dataset.loadState = "loaded";
        image.classList.remove("is-missing");
        resolve(true);
      };
      probe.onerror = () => {
        recordMissing(path);
        tryCandidate(index + 1);
      };
      probe.src = path;
    };

    tryCandidate(0);
  });
}

export function loadLazyImages(root = document) {
  if (!root) return Promise.resolve([]);
  const images = root.matches?.("img[data-src]")
    ? [root]
    : [...root.querySelectorAll("img[data-src]")];
  return Promise.all(images.map(loadLazyImage));
}

export function activateLazyVideo(video, posterImage = null) {
  if (!video) return;
  if (video.dataset.loadState !== "loaded" && video.dataset.src) {
    video.dataset.loadState = "loaded";
    video.src = video.dataset.src;
    if (posterImage?.dataset.loadedSrc) video.poster = posterImage.dataset.loadedSrc;
    video.addEventListener("error", () => {
      recordMissing(video.dataset.src);
      video.classList.add("is-missing");
    }, { once: true });
    video.load();
  }
  const playback = video.play();
  if (playback?.catch) playback.catch(() => undefined);
}

export function pauseLazyVideo(video) {
  if (!video) return;
  video.pause();
}

export function getMissingAssetPaths() {
  return [...missingAssets];
}

export function createFoundationReadyPromise() {
  const fontReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  const imageReady = Promise.all(
    [...document.images].map((image) => {
      if (image.complete) return Promise.resolve();
      return new Promise((resolve) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      });
    })
  );
  const frameReady = new Promise((resolve) => requestAnimationFrame(() => resolve()));
  return Promise.all([fontReady, imageReady, frameReady]);
}
