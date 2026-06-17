export const placeholderWords = {
  opening: "OPENING",
  section: "SECTION",
  image: "IMAGE",
  ending: "ENDING"
};

export const storySections = [
  {
    key: "opening",
    id: "opening",
    cursor: placeholderWords.opening
  },
  {
    key: "drawing",
    id: "section-2",
    cursor: placeholderWords.section
  },
  {
    key: "editorial",
    id: "section-3",
    cursor: placeholderWords.section
  },
  {
    key: "object",
    id: "section-6",
    cursor: placeholderWords.image
  },
  {
    key: "stack",
    id: "section-7",
    cursor: placeholderWords.image
  },
  {
    key: "ending",
    id: "section-8",
    cursor: placeholderWords.ending
  }
];

export function getSectionById(id) {
  return storySections.find((section) => section.id === id);
}
