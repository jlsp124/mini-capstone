import { findActiveBeatIndex, getLocalProgress, getScrollDirection } from "./progress.js";

const clampIndex = (index, entries) => Math.max(0, Math.min(entries.length - 1, index));

export function createTimelineController({
  entries,
  controllers,
  transitionRunner,
  setCursorWord,
  showOnlySection,
  getSectionElement,
  setBeatLabel,
  prefersReducedMotion = false,
  getIsMobile = () => false
}) {
  let beatEntries = entries;
  let currentIndex = -1;
  let previousIndex = -1;
  let previousProgress = 0;
  let direction = 1;
  let transitioning = false;
  let pendingIndex = null;
  let activeAct = null;
  let initialRevealed = false;
  let revealStartedAt = null;
  let revealProgress = prefersReducedMotion ? 1 : 0;
  let revealComplete = prefersReducedMotion;

  function getAutoplayDuration(entry) {
    const isMobile = getIsMobile();
    const configuredDuration = isMobile ? entry?.mobileAutoplayMs : entry?.autoplayMs;
    const defaultDuration = isMobile ? 1450 : 2300;
    return Math.max(300, Number(configuredDuration) || defaultDuration);
  }

  function startReveal(entry) {
    revealStartedAt = prefersReducedMotion ? null : performance.now();
    revealProgress = prefersReducedMotion ? 1 : 0;
    revealComplete = prefersReducedMotion;
    setBeatLabel?.(entry);
  }

  function getRevealProgress(entry, localProgress) {
    if (prefersReducedMotion) {
      revealProgress = 1;
      revealComplete = true;
      return revealProgress;
    }
    if (revealStartedAt === null) {
      revealProgress = getIsMobile() ? localProgress : 0;
      revealComplete = revealProgress >= 1;
      return revealProgress;
    }
    const duration = getAutoplayDuration(entry);
    const autoplayProgress = Math.min(1, (performance.now() - revealStartedAt) / duration);
    revealProgress = getIsMobile()
      ? Math.max(localProgress, autoplayProgress)
      : autoplayProgress;
    revealComplete = revealProgress >= 1;
    return revealProgress;
  }

  function getInitialRevealProgress(entry, progress) {
    if (prefersReducedMotion) return 1;
    return getIsMobile() ? getLocalProgress(progress, entry) : 0;
  }

  function getProgressContext(entry, progress, updateDirection = direction) {
    const localProgress = getLocalProgress(progress, entry);
    return {
      beat: entry,
      localProgress,
      revealProgress: getRevealProgress(entry, localProgress),
      pageProgress: progress,
      direction: updateDirection
    };
  }

  function getController(entry) {
    return entry ? controllers[entry.controller] : null;
  }

  function setAct(entry) {
    if (!entry || entry.act === activeAct) return;
    activeAct = entry.act;
    if (setCursorWord) setCursorWord(entry.act);
  }

  function enterInitial(index, progress) {
    const entry = beatEntries[index];
    const controller = getController(entry);
    currentIndex = index;
    previousIndex = index;
    setAct(entry);
    showOnlySection(entry.sectionId);
    controller?.enter?.({ beat: entry, direction: 1, initial: true, localProgress: getLocalProgress(progress, entry) });
    controller?.update?.(getProgressContext(entry, progress, 1));
  }

  function runUpdate(progress) {
    if (currentIndex < 0) return;
    const entry = beatEntries[currentIndex];
    getController(entry)?.update?.(getProgressContext(entry, progress));
  }

  function changeWithinSection(targetIndex, progress) {
    const fromEntry = beatEntries[currentIndex];
    const toEntry = beatEntries[targetIndex];
    const controller = getController(toEntry);
    previousIndex = currentIndex;
    currentIndex = targetIndex;
    setAct(toEntry);
    startReveal(toEntry);
    controller?.changePhase?.({
      fromBeat: fromEntry,
      beat: toEntry,
      phase: toEntry.phase,
      direction,
      localProgress: getInitialRevealProgress(toEntry, progress)
    });
    runUpdate(progress);
  }

  function getTransitionType(fromEntry, toEntry, transitionDirection) {
    const transitionEntry = transitionDirection < 0 ? fromEntry : toEntry;
    return transitionEntry?.transitionIn || (toEntry?.index === 0 ? "opening" : "none");
  }

  async function transitionTo(targetIndex, progress) {
    const fromEntry = beatEntries[currentIndex];
    const toEntry = beatEntries[targetIndex];
    const fromController = getController(fromEntry);
    const toController = getController(toEntry);
    const fromEl = getSectionElement(fromEntry.sectionId);
    const toEl = getSectionElement(toEntry.sectionId);
    const transitionDirection = targetIndex > currentIndex ? 1 : -1;
    const transitionType = getTransitionType(fromEntry, toEntry, transitionDirection);

    transitioning = true;
    pendingIndex = null;
    direction = transitionDirection;
    fromController?.prepareExit?.({ beat: fromEntry, toBeat: toEntry, direction: transitionDirection });

    await transitionRunner(transitionType, {
      fromBeat: fromEntry,
      toBeat: toEntry,
      fromEl,
      toEl,
      direction: transitionDirection,
      reducedMotion: prefersReducedMotion,
      onMidpoint: () => {
        fromController?.exit?.({ beat: fromEntry, toBeat: toEntry, direction: transitionDirection });
        previousIndex = currentIndex;
        currentIndex = targetIndex;
        setAct(toEntry);
        startReveal(toEntry);
        showOnlySection(toEntry.sectionId);
        toController?.enter?.({
          beat: toEntry,
          fromBeat: fromEntry,
          direction: transitionDirection,
          localProgress: getInitialRevealProgress(toEntry, progress)
        });
        toController?.update?.(getProgressContext(toEntry, progress, transitionDirection));
      }
    });

    transitioning = false;

    if (pendingIndex !== null && pendingIndex !== currentIndex) {
      const queued = clampIndex(pendingIndex, beatEntries);
      pendingIndex = null;
      requestBeat(queued, previousProgress);
      return;
    }

    pendingIndex = null;
    runUpdate(previousProgress);
  }

  function requestBeat(index, progress) {
    if (!beatEntries.length) return;
    const targetIndex = clampIndex(index, beatEntries);
    if (targetIndex === currentIndex) {
      pendingIndex = null;
      runUpdate(progress);
      return;
    }

    if (transitioning) {
      pendingIndex = targetIndex;
      return;
    }

    const current = beatEntries[currentIndex];
    const target = beatEntries[targetIndex];
    getRevealProgress(current, getLocalProgress(progress, current));
    if (!getIsMobile() && !prefersReducedMotion && !revealComplete) {
      pendingIndex = targetIndex;
      runUpdate(progress);
      return;
    }

    pendingIndex = null;
    if (current && target && current.sectionId === target.sectionId) {
      changeWithinSection(targetIndex, progress);
      return;
    }

    transitionTo(targetIndex, progress);
  }

  function update(progress) {
    if (!beatEntries.length) return;
    direction = getScrollDirection(progress, previousProgress) || direction;
    previousProgress = progress;

    const index = findActiveBeatIndex(beatEntries, progress, direction, Math.max(0, currentIndex));
    if (currentIndex === -1) {
      enterInitial(index, progress);
      return;
    }

    if (index !== currentIndex) {
      requestBeat(index, progress);
      return;
    }

    runUpdate(progress);
  }

  return {
    update,
    revealInitial() {
      if (initialRevealed || currentIndex < 0) return;
      initialRevealed = true;
      const entry = beatEntries[currentIndex];
      startReveal(entry);
      getController(entry)?.reveal?.({ beat: entry, direction: 1 });
    },
    pointerMove(event) {
      if (currentIndex < 0) return;
      getController(beatEntries[currentIndex])?.pointerMove?.(event);
    },
    resize() {
      Object.values(controllers).forEach((controller) => controller.resize?.());
      runUpdate(previousProgress);
    },
    setEntries(nextEntries) {
      beatEntries = nextEntries;
      currentIndex = clampIndex(currentIndex, beatEntries);
      previousIndex = clampIndex(previousIndex, beatEntries);
      update(previousProgress);
    },
    getState() {
      return {
        currentIndex,
        previousIndex,
        direction,
        transitioning,
        pendingIndex,
        currentBeat: beatEntries[currentIndex] || null,
        revealProgress,
        revealComplete,
        queuedBeat: pendingIndex === null ? null : beatEntries[pendingIndex] || null
      };
    }
  };
}
