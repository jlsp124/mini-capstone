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
