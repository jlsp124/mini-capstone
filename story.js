export const storyBeats = [
  {
    key: "beat-1-opening",
    act: "PROJECTS",
    sectionId: "opening",
    phase: "default",
    desktopUnits: 2.8,
    mobileUnits: 2.0,
    transitionIn: null,
    controller: "opening"
  },
  {
    key: "beat-2-opening-interlude",
    act: "PROJECTS",
    sectionId: "opening-interlude",
    phase: "default",
    desktopUnits: 2.4,
    mobileUnits: 1.8,
    transitionIn: "opening",
    controller: "openingInterlude"
  },
  {
    key: "beat-3-project-log",
    act: "PROJECTS",
    sectionId: "project-log",
    phase: "default",
    desktopUnits: 5.5,
    mobileUnits: 4.5,
    transitionIn: "element",
    controller: "projectLog"
  },
  {
    key: "beat-4-projects-interlude",
    act: "PROJECTS",
    sectionId: "projects-interlude",
    phase: "default",
    desktopUnits: 3.2,
    mobileUnits: 2.3,
    transitionIn: "signal",
    controller: "projectsInterlude"
  }
];

export const scrollUnitVh = 100;
