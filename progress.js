export const bodyHeights = {
  desktop: "1200vh",
  mobile: "900vh"
};

export const progressRanges = {
  desktop: {
    openingToDrawing: 0.11,
    drawingToEditorial: 0.27,
    editorialToObject: 0.44,
    objectToStack: 0.70,
    stackToEnding: 0.96
  },
  mobile: {
    openingToDrawing: 0.11,
    drawingToEditorial: 0.19,
    editorialToObject: 0.40,
    objectToStack: 0.80,
    stackToEnding: 0.96
  }
};

export function getScrollConfig(isMobile) {
  return {
    bodyHeight: isMobile ? bodyHeights.mobile : bodyHeights.desktop,
    ranges: isMobile ? progressRanges.mobile : progressRanges.desktop
  };
}

export function getPageProgress() {
  const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
  return Math.max(0, Math.min(1, window.scrollY / maxScroll));
}

export function localProgress(progress, start, end) {
  return Math.max(0, Math.min(1, (progress - start) / Math.max(0.0001, end - start)));
}
