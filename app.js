const totalSlides = 22;

const landingAssets = [
  {
    title: "Kindergarten Still",
    detail: "Early dentist clue",
    path: "assets/photos/kindergarten-still.jpg",
  },
  {
    title: "Japan Photo",
    detail: "Creative timing and curiosity",
    path: "assets/photos/japan-photo.jpg",
  },
  {
    title: "Ableton Screenshot",
    detail: "Music production workspace",
    path: "assets/screenshots/ableton-session.jpg",
  },
  {
    title: "GitHub / Project Screenshot",
    detail: "Building things with tools",
    path: "assets/screenshots/github-project.jpg",
  },
  {
    title: "Little Me + Dad",
    detail: "Opening-day dental practice photo",
    path: "assets/photos/dad-opening-day-practice.jpg",
  },
];

const liveImageAssets = new Set([
  // Add image paths here after the real files exist, for example:
  // "assets/photos/japan-photo.jpg",
]);

const loadDentalStlFiles = false;

const chapters = [
  { id: "origin", number: "Chapter 1", title: "Origin" },
  { id: "oral-surgery", number: "Chapter 2", title: "Oral Surgery" },
  { id: "ownership", number: "Chapter 3", title: "Ownership" },
  { id: "creativity", number: "Chapter 4", title: "Creativity + Building" },
  { id: "reflection", number: "Chapter 5", title: "Reflection + Next Version" },
];

const sourceCards = [
  {
    title: "Canadian Dental Association",
    detail: "Dental specialties and career pathways.",
    url: "https://www.cda-adc.ca/en/oral_health/specialties/",
  },
  {
    title: "Canadian Association of Oral and Maxillofacial Surgeons",
    detail: "OMFS pathway notes for Canada.",
    url: "https://www.caoms.com/professionals/",
  },
  {
    title: "UBC Dentistry",
    detail: "DMD admissions procedures and prerequisites.",
    url: "https://www.dentistry.ubc.ca/education/dmd/dmd-admission-procedures/",
  },
  {
    title: "University of Toronto Dentistry",
    detail: "DDS application and program information.",
    url: "https://www.dentistry.utoronto.ca/prospective-students/undergraduate/DDS",
  },
  {
    title: "University of Manitoba Dentistry",
    detail: "DMD program and admissions requirements.",
    url: "https://umanitoba.ca/explore/programs-of-study/dentistry-dmd",
  },
];

const slides = [
  {
    number: "01",
    chapter: "origin",
    title: "The Future I’m Building",
    lead: "Oral Surgery • Business • Creativity",
    support: "A future built around precision, ownership, creative work, and freedom.",
    reader: "This project is not just a career report. It is a first version of a plan. I am trying to understand how healthcare, business, creativity, and technology can fit into one future instead of becoming separate lives.",
    layout: "title-assets",
    feature: { type: "asset-grid", assets: landingAssets },
  },
  {
    number: "02",
    chapter: "origin",
    title: "Who I Am",
    lead: "I am drawn to work that mixes skill, pressure, people, and independence.",
    support: "Dentistry, business, music, and building projects all point toward the same pattern.",
    reader: "The careers and interests I keep coming back to have a common thread: they reward discipline, taste, problem solving, and the ability to make decisions. I want my future to include science and service, but also ownership and creative output.",
    bullets: ["Precision", "People", "Ownership", "Creative systems"],
  },
  {
    number: "03",
    chapter: "origin",
    title: "This Started Early",
    lead: "The dental direction was already showing up when I was little.",
    support: "The kindergarten dentist video is a small archive piece that makes the plan feel less random.",
    reader: "Looking back matters because it shows that this interest did not appear out of nowhere. The kindergarten dentist video becomes evidence of an early curiosity around dentistry and helping people.",
    layout: "archive",
    feature: {
      type: "archive",
      title: "Kindergarten Dentist Video",
      detail: "Nostalgic archive placeholder",
      path: "assets/photos/kindergarten-dentist-video-still.jpg",
    },
  },
  {
    number: "04",
    chapter: "origin",
    title: "Big Question",
    lead: "How can I build a future that combines healthcare, business, creativity, and freedom?",
    support: "The goal is not to choose one side of myself and delete the rest.",
    reader: "This question is the center of the whole capstone. I am not only asking what job I might want. I am asking what kind of life, work rhythm, responsibility, and freedom I want to build toward.",
    layout: "question",
  },
  {
    number: "05",
    chapter: "oral-surgery",
    title: "Oral and Maxillofacial Surgery",
    lead: "A surgical dental specialty focused on the mouth, jaws, face, and related structures.",
    support: "It sits between medicine, dentistry, anatomy, diagnosis, and hands-on surgical skill.",
    reader: "Oral and maxillofacial surgery interests me because it is highly technical, patient-facing, and serious. It connects dental knowledge with surgery and complex decision making, which makes it feel challenging in the right way.",
    bullets: ["Diagnosis", "Surgery", "Anatomy", "Patient care"],
  },
  {
    number: "06",
    chapter: "oral-surgery",
    title: "Why It Fits Me",
    lead: "It rewards focus, calm execution, and long-term discipline.",
    support: "The work has pressure, but also purpose and a clear standard of excellence.",
    reader: "This pathway fits because I like the idea of becoming extremely good at something difficult. It also has real-world impact: helping people with pain, function, confidence, injuries, and serious oral health problems.",
    bullets: ["High skill ceiling", "Hands-on work", "Real patient impact", "Pressure with purpose"],
  },
  {
    number: "07",
    chapter: "oral-surgery",
    title: "Healthcare, But With Ownership",
    lead: "Dentistry can be clinical work and a business at the same time.",
    support: "That makes the career feel more flexible than a single job title.",
    reader: "The ownership side matters because I do not only want to work inside someone else's system forever. A dental practice can become a place where healthcare, leadership, technology, and business decisions all meet.",
    bullets: ["Clinical service", "Team leadership", "Practice systems", "Long-term independence"],
  },
  {
    number: "08",
    chapter: "oral-surgery",
    title: "The Pathway",
    lead: "The route is long, but it becomes clearer when it is mapped as decisions.",
    support: "Each stage builds the next stage: grades, prerequisites, DAT, dental school, licensure, residency, practice.",
    reader: "The pathway is not one jump. It is a chain of steps. I need strong science foundations, competitive grades, school research, dental admissions requirements, and later specialty training if oral surgery remains the direction.",
    layout: "roadmap",
    feature: { type: "roadmap" },
  },
  {
    number: "09",
    chapter: "oral-surgery",
    title: "Education and Training Options",
    lead: "I need to compare schools, prerequisites, timelines, and strategy.",
    support: "UBC, Toronto, Manitoba, and a strategic first year are starting points for research.",
    reader: "This slide is not a final admissions plan. It is a research board. Requirements can change, so the real work is to check each official admissions page, plan prerequisites early, and keep the first year strategic instead of random.",
    layout: "schools",
    feature: { type: "schools" },
  },
  {
    number: "10",
    chapter: "ownership",
    title: "The Business Side of Dentistry",
    lead: "A practice is a healthcare space, but it is also an operating system.",
    support: "People, scheduling, equipment, finance, patient experience, and reputation all matter.",
    reader: "The business side is interesting because it is practical. A good practice needs great clinical work, but also good systems: how patients enter, how the team communicates, how money is managed, and how the clinic improves over time.",
    bullets: ["Operations", "Finance", "Patient experience", "Reputation"],
  },
  {
    number: "11",
    chapter: "ownership",
    title: "What a Practice Actually Looks Like",
    lead: "Behind the chair is a whole system of rooms, tools, people, and decisions.",
    support: "A clinic runs on flow: consultation, imaging, treatment, sterilization, admin, follow-up.",
    reader: "Owning a practice means understanding the whole environment, not just the clinical procedure. Every room and role affects patient trust, team speed, safety, and quality.",
    layout: "practice",
    feature: { type: "practice" },
  },
  {
    number: "12",
    chapter: "ownership",
    title: "Technology in Dentistry",
    lead: "Digital models, scans, imaging, and planning tools are changing how dentistry gets built.",
    support: "The STL viewer is a placeholder for real dental model files.",
    reader: "Technology matters because it turns dentistry into something more visual and buildable. Digital models can help with planning, communication, and precision. Drag to inspect the model.",
    layout: "stl",
    feature: { type: "stl" },
  },
  {
    number: "13",
    chapter: "ownership",
    title: "Practice Expansion",
    lead: "Expansion should mean stronger systems, not just getting bigger.",
    support: "A better practice can grow through team training, technology, patient trust, and careful leadership.",
    reader: "Practice expansion is not only opening more locations. It can mean improving the first clinic, adding services, hiring well, building better workflows, or eventually creating a larger business with the same standards.",
    bullets: ["Better systems", "Trusted team", "Useful technology", "Careful growth"],
  },
  {
    number: "14",
    chapter: "creativity",
    title: "Business Is a Skill Too",
    lead: "Business is not just money. It is learning how value moves.",
    support: "Marketing, finance, leadership, communication, and decision-making can be trained.",
    reader: "Seeing business as a skill makes it less mysterious. Like biology or music production, it improves through practice, feedback, research, and better taste in decisions.",
    bullets: ["Finance", "Marketing", "Leadership", "Communication", "Decision quality"],
  },
  {
    number: "15",
    chapter: "creativity",
    title: "Music Production",
    lead: "Music trains patience, taste, layering, and iteration.",
    support: "It is creative, but it also has structure: timing, mixing, detail, and revision.",
    reader: "Music production connects to the rest of the plan because it teaches me to keep refining. A track, a business system, a website, and a clinical skill all improve by noticing what is not working and making it better.",
    feature: {
      type: "asset-grid",
      assets: [
        {
          title: "Ableton Project",
          detail: "Replace with a real production screenshot",
          path: "assets/screenshots/ableton-session.jpg",
        },
        {
          title: "Sound Design Notes",
          detail: "Optional notes or session image",
          path: "assets/screenshots/music-production-notes.jpg",
        },
      ],
    },
  },
  {
    number: "16",
    chapter: "creativity",
    title: "Waiting for the Right Moment",
    lead: "“You can always delete a bad picture, but you can’t go back and take one you never tried to get.”",
    support: "Trying matters because opportunities can pass before the perfect plan arrives.",
    reader: "This quote connects to creativity and opportunity. Sometimes the important part is taking the shot, starting the project, asking the question, or trying the idea before the moment disappears.",
    layout: "photo-quote",
    feature: { type: "photo-quote" },
  },
  {
    number: "17",
    chapter: "creativity",
    title: "Opportunity Is a Resource",
    lead: "AI does not replace my thinking; it helps me move faster with ideas, research, organization, and building.",
    support: "I still make the decisions, including choosing black and silver because silver is my favourite accent colour.",
    reader: "Tools are part of opportunity. AI, code, design software, research tools, and creative software can all speed up the process, but they do not remove responsibility. I still choose the direction, judge the quality, and decide what fits.",
    bullets: ["Research faster", "Organize better", "Build prototypes", "Keep decision-making human"],
  },
  {
    number: "18",
    chapter: "creativity",
    title: "Skill Opens Doors, People Show You Where They Are",
    lead: "Skill creates options, but people often reveal the real opportunities.",
    support: "Mentors, family, patients, teachers, friends, and collaborators all shape the map.",
    reader: "This is why I do not want to build the future alone in my head. Skill matters, but conversations and relationships show what careers actually feel like from the inside.",
    bullets: ["Ask better questions", "Find mentors", "Build trust", "Notice real pathways"],
  },
  {
    number: "19",
    chapter: "reflection",
    title: "Skills I’m Building",
    lead: "The plan needs more than grades.",
    support: "Science, communication, discipline, financial literacy, building tools, creativity, and leadership all matter.",
    reader: "Grades are important, but they are not the whole plan. I also need skills that make me useful, adaptable, and ready to lead: speaking clearly, managing time, understanding money, using technology, and working with people.",
    layout: "skills",
    feature: { type: "skills" },
  },
  {
    number: "20",
    chapter: "reflection",
    title: "Making It Work Without Giving Things Up",
    lead: "I do not want to give up one side of myself to build another.",
    support: "The challenge is designing a life where serious work and creative work can both exist.",
    reader: "This is the core reflection. I do not want a future where choosing healthcare means deleting creativity, or choosing business means losing the reason I cared about helping people. The better goal is integration.",
    bullets: ["Healthcare", "Business", "Creativity", "Freedom"],
  },
  {
    number: "21",
    chapter: "reflection",
    title: "The Next Version of the Plan",
    lead: "This plan is a direction, not a locked script.",
    support: "The next version needs more research, conversations, shadowing, school planning, and real experience.",
    reader: "As I learn more, parts of this plan should change. That does not make the plan weaker. It makes it more realistic. A serious plan should improve when better information shows up.",
    bullets: ["Research schools", "Talk to people in the field", "Build stronger study habits", "Keep making projects"],
  },
  {
    number: "22",
    chapter: "reflection",
    title: "Sources",
    lead: "This is the direction I’m building toward, but I’m open to the plan getting better as I learn more.",
    support: "Website built by Jovan Pahal.",
    reader: "These source cards are starting points for checking official information. Admissions requirements and training pathways can change, so the official pages should be checked again before making real course or application decisions.",
    layout: "sources",
    feature: { type: "sources" },
  },
];

const readerDetails = {
  "01": "The floating cards are placeholders for real memories and work: childhood dentistry, travel, music, code, and family connection to a dental practice. They make the presentation personal instead of only theoretical.",
  "02": "That matters because a future plan should fit the person building it. If the plan only covers school and ignores creativity or independence, it would not be the full picture.",
  "03": "This does not mean my exact future was decided when I was young. It means there were early signs, and now I can connect those signs to a more mature plan.",
  "04": "A good answer has to include more than a career title. It has to explain the kind of work I want, the skills I need, and how different parts of my life can support each other.",
  "05": "The official specialty descriptions helped me understand that this field is not only about teeth. It can include the jaws, face, injuries, function, aesthetics, and surgical treatment planning.",
  "06": "It also fits my personality because I respect work where preparation matters. In surgery, small details can change outcomes, so discipline and calm decision-making are not optional.",
  "07": "Ownership does not mean ignoring patient care. It means building a better environment for care: better systems, a strong team, thoughtful technology, and a clinic that patients can trust.",
  "08": "Mapping it this way makes the goal feel more practical. Instead of only thinking about the final career, I can focus on the next decision that makes the later options possible.",
  "09": "A strategic first year means choosing courses carefully, protecting grades, learning how admissions work, and asking for advising early instead of waiting until applications are close.",
  "10": "This is why business belongs in the project. If I ever own or help lead a practice, the patient experience will depend on both clinical quality and operational decisions.",
  "11": "The practice map shows that a clinic is not one room. It is a connected system where front desk, imaging, treatment, sterilization, software, and follow-up all need to work together.",
  "12": "If the STL files are missing, the site shows a clean fallback instead of breaking. That matches the point of the slide: technology should support the explanation, not become a problem during the presentation.",
  "13": "The important part is that growth should not lower quality. Expansion only makes sense if the systems, team, and patient experience can keep up.",
  "14": "This connects to dentistry because a clinical career still needs communication, planning, and leadership. Business knowledge can help protect the practice and improve how it serves people.",
  "15": "I do not see music as the opposite of a serious career. It is another way to practice taste, patience, and iteration, which are useful in many parts of life.",
  "16": "The Japan photo placeholder is meant to become a real example of that idea. It represents noticing a moment and acting before overthinking ruins the chance.",
  "17": "That is the mature way I want to use tools: not as a replacement for thinking, but as leverage for research, organization, design, and building. The black and silver style is one example of a human choice behind the tool use.",
  "18": "People can reveal opportunities that are not obvious from a website or course list. That is why shadowing, asking questions, and learning from adults in the field are part of the next version.",
  "19": "This slide turns the future into a skill list. If I know which skills matter, I can start practicing them before the career officially begins.",
  "20": "That does not mean doing everything at once with no focus. It means building a plan where each side has a place, and where one part of my life does not erase another.",
  "21": "The next step is to turn the plan into evidence: check admissions pages again, talk to people in dentistry, keep building projects, and learn what the daily life of this career actually looks like.",
  "22": "The ending line matters because this is a direction, not a promise that every detail will stay the same. I want the plan to get sharper as I learn more.",
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

let revealInitialized = false;
let threeBundlePromise;
const initializedViewers = new WeakSet();

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderAsset(asset, className = "asset-placeholder") {
  const isLiveAsset = liveImageAssets.has(asset.path);
  const assetState = isLiveAsset ? "loaded" : "missing";
  const assetStyle = isLiveAsset ? ` style="--asset-image: url('${asset.path.replaceAll("'", "%27")}')"` : "";
  return `
    <div class="${className}" data-path="${escapeHtml(asset.path)}" data-asset-state="${assetState}" data-hover="${escapeHtml(asset.title)}"${assetStyle}>
      <strong>${escapeHtml(asset.title)}</strong>
      <span>${escapeHtml(asset.detail)}</span>
    </div>
  `;
}

function renderLandingAssets() {
  $("#landing-assets").innerHTML = landingAssets.map((asset) => renderAsset(asset, "asset-card")).join("");
}

function chapterFor(slide) {
  return chapters.find((chapter) => chapter.id === slide.chapter);
}

function renderFeature(feature, mode) {
  if (!feature) {
    return `<div class="mini-list">${["Research", "Discipline", "Direction"].map((item) => `<span>${item}</span>`).join("")}</div>`;
  }

  if (feature.type === "asset-grid") {
    const five = feature.assets.length === 5 ? " five" : "";
    return `<div class="asset-grid${five}">${feature.assets.map((asset) => renderAsset(asset)).join("")}</div>`;
  }

  if (feature.type === "archive") {
    return `
      <div class="archive-frame">
        ${renderAsset({ title: feature.title, detail: feature.detail, path: feature.path })}
      </div>
    `;
  }

  if (feature.type === "roadmap") {
    const nodes = [
      ["High School", "Build discipline, science foundations, communication, and projects."],
      ["Strategic First Year", "Choose courses carefully and protect grades early."],
      ["Dental School", "Research prerequisites, DAT, applications, interviews, and fit."],
      ["Licensure", "Meet national and provincial requirements before practice."],
      ["OMFS Residency", "Specialty training if oral surgery remains the target."],
      ["Ownership", "Use clinical skill, systems, and leadership to build a practice."],
    ];
    return `<div class="roadmap">${nodes.map(([title, detail], index) => `
      <div class="${index === 1 || index === 5 ? "road-branch" : "road-node"}">
        <strong>${title}</strong><span>${detail}</span>
      </div>`).join("")}</div>`;
  }

  if (feature.type === "schools") {
    const schools = [
      ["UBC", "DMD research target; check official prerequisites and admissions procedures."],
      ["University of Toronto", "DDS research target; compare application timing and requirements."],
      ["University of Manitoba", "DMD research target; compare DAT, residency, and admission rules."],
      ["Strategic First Year", "Course planning, grades, habits, volunteering, and early advising."],
    ];
    return `
      <div class="school-map">
        <div class="canada-line"></div>
        <div class="school-grid">${schools.map(([title, detail]) => `
          <div class="school-card"><strong>${title}</strong><span>${detail}</span></div>
        `).join("")}</div>
      </div>`;
  }

  if (feature.type === "practice") {
    const cells = [
      ["Consult", "Trust, diagnosis, options"],
      ["Imaging", "Scans, X-rays, planning"],
      ["Treatment", "Clinical skill and safety"],
      ["Sterilization", "Systems and standards"],
      ["Front Desk", "Scheduling and patient flow"],
      ["Software", "Records, payments, follow-up"],
    ];
    return `<div class="practice-grid">${cells.map(([title, detail]) => `
      <div class="practice-cell"><strong>${title}</strong><span>${detail}</span></div>
    `).join("")}</div>`;
  }

  if (feature.type === "stl") {
    const modeCopy = mode === "reader" ? "Drag to inspect the model." : "Auto-rotating STL viewer.";
    return `
      <div class="stl-wrap">
        <div class="stl-viewer" data-stl-viewer data-viewer-mode="${mode}" aria-label="Dental STL viewer">
          <div class="stl-overlay">
            assets/dental/Visualization_DigitalModelUnsectioned_18-28.stl<br>
            assets/dental/Visualization_DigitalModelUnsectioned_38-48.stl
          </div>
        </div>
        <p class="viewer-hint">${modeCopy} If the files are missing, this polished fallback shows the intended model space.</p>
      </div>
    `;
  }

  if (feature.type === "photo-quote") {
    return `
      <div class="photo-quote">
        ${renderAsset({
          title: "Japan Photo",
          detail: "Replace this slow-zoom image placeholder",
          path: "assets/photos/japan-photo.jpg",
        })}
        <blockquote>“You can always delete a bad picture, but you can’t go back and take one you never tried to get.”</blockquote>
      </div>
    `;
  }

  if (feature.type === "skills") {
    const skills = ["Biology", "Communication", "Discipline", "Financial literacy", "Coding and tools", "Research", "Design taste", "Music production", "Leadership"];
    return `<div class="skills-grid">${skills.map((skill) => `<div class="skill-token">${skill}</div>`).join("")}</div>`;
  }

  if (feature.type === "sources") {
    return `
      <div class="source-grid">${sourceCards.map((source) => `
        <a class="source-card" href="${source.url}" target="_blank" rel="noreferrer">
          <strong>${source.title}</strong>
          <span>${source.detail}</span>
        </a>
      `).join("")}</div>
      <p class="built-note">Website built by Jovan Pahal.</p>
    `;
  }

  return "";
}

function renderBullets(slide) {
  if (!slide.bullets) return "";
  return `<div class="mini-list">${slide.bullets.map((item) => `<span class="fragment">${escapeHtml(item)}</span>`).join("")}</div>`;
}

function layoutClass(slide) {
  if (slide.layout === "title-assets") return "title-layout";
  if (slide.layout === "question") return "compact-layout";
  return "";
}

function renderPresentationSlides() {
  $("#presentation-slides").innerHTML = slides.map((slide, index) => {
    const chapter = chapterFor(slide);
    const feature = slide.feature || (slide.layout === "question" ? null : undefined);
    return `
      <section data-slide-number="${slide.number}" data-chapter="${slide.chapter}">
        <div class="slide-shell ${layoutClass(slide)}">
          ${slide.layout === "question" ? `<div class="question-mark" aria-hidden="true">?</div>` : ""}
          <div class="slide-copy">
            <p class="eyebrow">${chapter.number} — ${chapter.title}</p>
            <h2>${slide.title}</h2>
            <p class="lead fragment">${slide.lead}</p>
            <p class="support fragment">${slide.support}</p>
            ${renderBullets(slide)}
          </div>
          ${slide.layout === "question" ? "" : `<div class="feature-panel">${renderFeature(feature, "present")}</div>`}
          <span class="slide-number-tag">${String(index + 1).padStart(2, "0")} / ${totalSlides}</span>
        </div>
      </section>
    `;
  }).join("");
}

function renderReader() {
  $("#chapter-menu").innerHTML = chapters.map((chapter) => `
    <a href="#chapter-${chapter.id}" title="${chapter.number}: ${chapter.title}">${chapter.number} — ${chapter.title}</a>
  `).join("");

  $("#reader-slides").innerHTML = slides.map((slide, index) => {
    const chapter = chapterFor(slide);
    const isFirstInChapter = slides.findIndex((item) => item.chapter === slide.chapter) === index;
    const feature = slide.feature || (slide.layout === "question" ? null : undefined);
    return `
      <article class="reader-card" id="${isFirstInChapter ? `chapter-${chapter.id}` : `reader-slide-${slide.number}`}">
        <div class="reader-copy">
          <p class="eyebrow">${chapter.number} — ${chapter.title}</p>
          <h2>${slide.number} ${slide.title}</h2>
          <p><strong>${slide.lead}</strong></p>
          <p>${slide.reader}</p>
          ${readerDetails[slide.number] ? `<p>${readerDetails[slide.number]}</p>` : ""}
          <p>${slide.support}</p>
        </div>
        <div class="feature-panel">${slide.layout === "question" ? `<div class="question-mark" aria-hidden="true">?</div>` : renderFeature(feature, "reader")}</div>
        <span class="reader-number">${String(index + 1).padStart(2, "0")} / ${totalSlides}</span>
      </article>
    `;
  }).join("");
}

function showMode(mode, updateUrl = false) {
  const normalized = mode === "reader" || mode === "present" ? mode : "landing";
  $("#landing-screen").hidden = normalized !== "landing";
  $("#presentation-screen").hidden = normalized !== "present";
  $("#reader-screen").hidden = normalized !== "reader";

  document.body.classList.toggle("presentation-mode", normalized === "present");
  document.body.classList.toggle("reader-mode", normalized === "reader");

  if (updateUrl) {
    const url = normalized === "landing" ? location.pathname : `${location.pathname}?mode=${normalized}`;
    history.pushState({ mode: normalized }, "", url);
  }

  if (normalized === "present") {
    requestAnimationFrame(() => {
      initReveal();
      initDentalViewers("present");
      animateActiveSlide();
    });
  }

  if (normalized === "reader") {
    requestAnimationFrame(() => {
      initDentalViewers("reader");
      animateReaderCards();
    });
  }

  if (normalized === "landing") {
    animateLanding();
  }
}

function initReveal() {
  if (!window.Reveal) return;

  if (!revealInitialized) {
    window.Reveal.initialize({
      controls: false,
      progress: true,
      center: false,
      hash: false,
      transition: "fade",
      backgroundTransition: "fade",
      width: 1366,
      height: 768,
      margin: 0,
      minScale: 0.2,
      maxScale: 1.6,
      keyboard: true,
    });
    window.Reveal.on("slidechanged", animateActiveSlide);
    window.Reveal.on("fragmentshown", animateFragment);
    revealInitialized = true;
  } else {
    window.Reveal.layout();
  }
}

function animateLanding() {
  if (!window.gsap) return;
  window.gsap.killTweensOf(".asset-card");
  window.gsap.fromTo(".landing-copy > *", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" });
  window.gsap.fromTo(".asset-card", { y: 26, opacity: 0, rotate: -1 }, { y: 0, opacity: 1, rotate: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" });
  window.gsap.to(".asset-card", { y: -10, duration: 3.8, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.25 });
}

function animateActiveSlide() {
  if (!window.gsap || !window.Reveal) return;
  const current = window.Reveal.getCurrentSlide();
  if (!current) return;
  window.gsap.fromTo($$(".slide-copy > *:not(.fragment), .feature-panel", current), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.05, ease: "power2.out" });
}

function animateFragment(event) {
  if (!window.gsap || !event?.fragment) return;
  window.gsap.fromTo(event.fragment, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
}

function animateReaderCards() {
  if (!window.gsap) return;
  window.gsap.fromTo(".reader-card", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.03, ease: "power2.out" });
}

async function loadThreeBundle() {
  if (!threeBundlePromise) {
    threeBundlePromise = Promise.all([
      import("three"),
      import("three/addons/loaders/STLLoader.js"),
      import("three/addons/controls/OrbitControls.js"),
    ]).then(([THREE, STL, Controls]) => ({ THREE, STLLoader: STL.STLLoader, OrbitControls: Controls.OrbitControls }));
  }
  return threeBundlePromise;
}

function initDentalViewers(mode) {
  $$(`[data-stl-viewer][data-viewer-mode="${mode}"]`).forEach((container) => {
    if (initializedViewers.has(container)) return;
    initializedViewers.add(container);
    setupDentalViewer(container, mode).catch(() => {
      container.classList.add("viewer-fallback");
      const overlay = $(".stl-overlay", container);
      if (overlay) overlay.innerHTML = "Three.js could not load. STL placeholder remains active.";
    });
  });
}

async function setupDentalViewer(container, mode) {
  const { THREE, STLLoader, OrbitControls } = await loadThreeBundle();
  const scene = new THREE.Scene();
  const width = Math.max(container.clientWidth, 320);
  const height = Math.max(container.clientHeight, 320);
  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
  camera.position.set(0, 42, 105);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.prepend(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const key = new THREE.DirectionalLight(0xffffff, 1.25);
  key.position.set(54, 76, 88);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xaeb8c3, 0.7);
  rim.position.set(-70, 30, -40);
  scene.add(rim);

  const grid = new THREE.GridHelper(140, 22, 0xbfc7cf, 0x30343a);
  grid.position.y = -22;
  scene.add(grid);

  const material = new THREE.MeshStandardMaterial({
    color: 0xd8dde3,
    metalness: 0.16,
    roughness: 0.34,
    wireframe: false,
  });

  const files = [
    "assets/dental/Visualization_DigitalModelUnsectioned_18-28.stl",
    "assets/dental/Visualization_DigitalModelUnsectioned_38-48.stl",
  ];

  const loader = new STLLoader();
  let loaded = 0;
  let completed = 0;

  if (!loadDentalStlFiles) {
    createFallbackDentalModel(THREE, group, material);
    updateOverlay(container, mode, loaded);
  } else {
    files.forEach((file, index) => {
      stlAssetExists(file).then((exists) => {
        if (!exists) {
          completed += 1;
          if (completed === files.length && loaded === 0) {
            createFallbackDentalModel(THREE, group, material);
            updateOverlay(container, mode, loaded);
          }
          return;
        }

        loader.load(
          file,
          (geometry) => {
            geometry.center();
            geometry.computeVertexNormals();
            const mesh = new THREE.Mesh(geometry, material);
            mesh.scale.setScalar(0.42);
            mesh.position.x = index === 0 ? -18 : 18;
            group.add(mesh);
            loaded += 1;
            completed += 1;
            normalizeModel(THREE, group);
            updateOverlay(container, mode, loaded);
          },
          undefined,
          () => {
            completed += 1;
            if (completed === files.length && loaded === 0) {
              createFallbackDentalModel(THREE, group, material);
              updateOverlay(container, mode, loaded);
            }
          },
        );
      });
    });
  }

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = mode === "reader";
  controls.enablePan = false;
  controls.autoRotate = mode === "present";
  controls.autoRotateSpeed = 1.4;
  controls.enabled = mode === "reader";

  const resizeObserver = new ResizeObserver(() => {
    const nextWidth = Math.max(container.clientWidth, 320);
    const nextHeight = Math.max(container.clientHeight, 320);
    camera.aspect = nextWidth / nextHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(nextWidth, nextHeight);
  });
  resizeObserver.observe(container);

  function render() {
    if (mode === "present") group.rotation.y += 0.004;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  render();
}

function normalizeModel(THREE, group) {
  const box = new THREE.Box3().setFromObject(group);
  const size = box.getSize(new THREE.Vector3());
  const maxAxis = Math.max(size.x, size.y, size.z);
  if (maxAxis > 0) {
    const scale = 62 / maxAxis;
    group.scale.setScalar(Math.min(scale, 1.8));
  }
}

function createFallbackDentalModel(THREE, group, material) {
  const toothMaterial = material.clone();
  toothMaterial.color.set(0xe2e7ec);
  const gumMaterial = new THREE.MeshStandardMaterial({
    color: 0x7b828b,
    metalness: 0.12,
    roughness: 0.46,
    wireframe: true,
  });

  const arch = new THREE.Mesh(new THREE.TorusGeometry(28, 2.2, 12, 80, Math.PI), gumMaterial);
  arch.rotation.x = Math.PI / 2;
  arch.position.y = -8;
  group.add(arch);

  for (let i = 0; i < 14; i += 1) {
    const angle = Math.PI * (i / 13);
    const radius = 28;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius - 12;
    const tooth = new THREE.Mesh(new THREE.SphereGeometry(i === 0 || i === 13 ? 3.2 : 3.8, 24, 18), toothMaterial);
    tooth.scale.set(0.82, 1.28, 0.72);
    tooth.position.set(x, 0, z);
    tooth.rotation.y = -angle + Math.PI / 2;
    group.add(tooth);
  }
}

function updateOverlay(container, mode, loaded) {
  const overlay = $(".stl-overlay", container);
  if (!overlay) return;
  if (loaded > 0) {
    overlay.innerHTML = mode === "reader" ? "Loaded dental STL files. Drag to inspect the model." : "Loaded dental STL files. Auto-rotating model.";
    return;
  }
  overlay.innerHTML = [
    "STL files not found yet. Replace with:",
    "assets/dental/Visualization_DigitalModelUnsectioned_18-28.stl",
    "assets/dental/Visualization_DigitalModelUnsectioned_38-48.stl",
  ].join("<br>");
}

async function stlAssetExists(path) {
  try {
    const response = await fetch(path, { method: "HEAD", cache: "no-store" });
    return response.ok;
  } catch {
    return false;
  }
}

function initComments() {
  const form = $("#comment-form");
  const message = $("#comment-message");
  const count = $("#comment-count");
  const status = $("#comment-status");
  const endpoint = window.CAPSTONE_COMMENTS_ENDPOINT;

  message.addEventListener("input", () => {
    count.textContent = `${message.value.length} / 2000`;
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = ($("#comment-name").value || "Anonymous").trim() || "Anonymous";
    const body = message.value.trim();
    if (!body) {
      status.textContent = "Write a message before submitting.";
      return;
    }

    if (!endpoint) {
      status.textContent = "Comments are not connected yet.";
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message: body }),
      });
      if (!response.ok) throw new Error("Comment backend rejected the message.");
      status.textContent = "Comment submitted.";
      form.reset();
      count.textContent = "0 / 2000";
    } catch {
      status.textContent = "Comments are not connected yet.";
    }
  });
}

function init() {
  renderLandingAssets();
  renderPresentationSlides();
  renderReader();
  initComments();

  $$("[data-set-mode]").forEach((button) => {
    button.addEventListener("click", () => showMode(button.dataset.setMode, true));
  });

  window.addEventListener("popstate", () => {
    const params = new URLSearchParams(location.search);
    showMode(params.get("mode"));
  });

  const params = new URLSearchParams(location.search);
  showMode(params.get("mode"));
}

init();
