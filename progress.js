const clamp01 = (value) => Math.max(0, Math.min(1, value));

export function getPageProgress() {
  const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
  return clamp01(window.scrollY / maxScroll);
}

export function buildProgressTimeline(beats, options = {}) {
  const isMobile = Boolean(options.isMobile);
  const unitVh = Number.isFinite(options.unitVh) ? options.unitVh : 100;
  let cursor = 0;

  const weightedBeats = beats.map((beat, index) => {
    const units = isMobile ? beat.mobileUnits : beat.desktopUnits;
    return {
      ...beat,
      index,
      units: Math.max(0.001, Number(units) || 0.001),
      unitStart: cursor,
      unitEnd: cursor += Math.max(0.001, Number(units) || 0.001)
    };
  });

  const totalUnits = Math.max(0.001, cursor);
  const entries = weightedBeats.map((beat) => ({
    ...beat,
    start: beat.unitStart / totalUnits,
    end: beat.unitEnd / totalUnits
  }));

  return {
    entries,
    totalUnits,
    totalVh: totalUnits * unitVh,
    bodyHeight: `${totalUnits * unitVh}vh`
  };
}

export function findActiveBeatIndex(entries, progress, direction = 1, previousIndex = 0) {
  if (!entries.length) return -1;
  const clamped = clamp01(progress);
  if (clamped <= 0) return 0;
  if (clamped >= 1) return entries.length - 1;

  const current = entries[previousIndex];
  if (current && clamped >= current.start && clamped < current.end) {
    return previousIndex;
  }

  const index = entries.findIndex((entry, entryIndex) => {
    const isLast = entryIndex === entries.length - 1;
    return clamped >= entry.start && (clamped < entry.end || isLast);
  });

  if (index !== -1) return index;
  return direction < 0 ? Math.max(0, previousIndex - 1) : Math.min(entries.length - 1, previousIndex + 1);
}

export function getLocalProgress(progress, entry) {
  if (!entry) return 0;
  const span = Math.max(0.0001, entry.end - entry.start);
  return clamp01((clamp01(progress) - entry.start) / span);
}

export function getScrollDirection(progress, previousProgress) {
  if (progress === previousProgress) return 0;
  return progress > previousProgress ? 1 : -1;
}
