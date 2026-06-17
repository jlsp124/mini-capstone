const totalScenes = 22;

const liveImageAssets = new Set([]);
const loadDentalStlFiles = false;
const ambientVideoPath = "assets/video/future-blueprint-ambient.mp4";

const chapters = [
  { id: "origin", number: "Chapter 1", title: "Origin" },
  { id: "oral-surgery", number: "Chapter 2", title: "Oral Surgery" },
  { id: "ownership", number: "Chapter 3", title: "Ownership" },
  { id: "creativity", number: "Chapter 4", title: "Creativity + Building" },
  { id: "reflection", number: "Chapter 5", title: "Reflection + Next Version" },
];

const identityModules = [
  "Healthcare / Science",
  "Business / Money",
  "Music Production",
  "Technology / Systems",
  "Photography / Visual Creativity",
  "Long-Term Goals / Freedom",
];

const questionWords = ["Healthcare", "Business", "Creativity", "Freedom"];

const sourceCards = [
  {
    title: "Assignment",
    detail: "CLE 10 Mini Capstone instructions and project expectations.",
  },
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
  {
    title: "Personal experience",
    detail: "Early dentistry interest, family exposure to dental practice ownership, creative projects, music, photography, and technology projects.",
  },
];

const scenes = [
  {
    number: "01",
    chapter: "origin",
    type: "opening",
    title: "The Future I'm Building",
    kicker: "Opening File",
    lead: "Oral Surgery • Business • Creativity",
    support: "A personal future blueprint: healthcare, ownership, creativity, technology, and freedom.",
    reader: "This project is about the future I can actually see myself building toward. It is not just one career idea. It connects oral surgery, business, creativity, technology, and the kind of freedom I want later in life. I want a future where the things I care about do not compete with each other, but support each other.",
  },
  {
    number: "02",
    chapter: "origin",
    type: "identity",
    title: "Who I Am",
    kicker: "Connected System",
    lead: "I want a future where I don't have to give up one side of myself to build another.",
    support: "Healthcare, business, music, technology, visual creativity, and long-term freedom all connect to the same future.",
    reader: "I have a lot of interests, but they are not separate random things. Healthcare and science connect to oral surgery. Business connects to ownership and growth. Music, photography, and technology connect to creativity and building things. Long-term goals connect everything together because I care about freedom, options, and being able to keep improving my life.",
    modules: identityModules,
  },
  {
    number: "03",
    chapter: "origin",
    type: "archive",
    title: "This Started Early",
    kicker: "Archive / Kindergarten",
    lead: "This started earlier than this project.",
    support: "Kindergarten: I wanted to be a dentist. The idea stayed the same. The vision got bigger.",
    reader: "One of the biggest reasons this path feels real to me is that it started early. In kindergarten, I already said I wanted to be a dentist. At that time, I obviously did not understand the full career path, business side, or specialty options. But the basic idea stayed with me. Now the vision is bigger: oral surgery, ownership, technology, and building something long-term.",
    archiveLines: [
      "This started earlier than this project.",
      "Kindergarten: I wanted to be a dentist.",
      "The idea stayed the same. The vision got bigger.",
    ],
    asset: {
      title: "Kindergarten Career Video",
      detail: "Topic: Future career / Status: Original clue / Updated vision: Oral surgery + ownership",
      path: "assets/photos/kindergarten-dentist-video-still.jpg",
    },
  },
  {
    number: "04",
    chapter: "origin",
    type: "question",
    title: "Big Question",
    kicker: "Core Question",
    lead: "How can I build a future that combines healthcare, business, creativity, and freedom?",
    support: "Healthcare, business, creativity, and freedom are the parts I want to connect.",
    reader: "The big question for this project is how I can build a future that combines the major parts of what I care about. I do not want a career that only checks one box. I want something that uses science and skill, but also gives me the chance to build, own, create, and keep improving.",
    words: questionWords,
  },
  {
    number: "05",
    chapter: "oral-surgery",
    type: "clinical",
    title: "Oral and Maxillofacial Surgery",
    kicker: "Clinical Direction",
    lead: "Oral and maxillofacial surgery is the career I can actually see myself building toward.",
    support: "It is serious, skilled, and still connects to business and ownership.",
    reader: "Oral and maxillofacial surgery is the career path I am most interested in. It combines healthcare, science, precision, responsibility, and advanced training. It also connects to business because dental professionals can eventually work toward ownership, practice growth, and building a team. That combination makes it feel like a path that fits more than one side of who I am.",
  },
  {
    number: "06",
    chapter: "oral-surgery",
    type: "node",
    title: "Why It Fits Me",
    kicker: "Fit System",
    lead: "Oral Surgery",
    support: "It connects serious work with long-term options.",
    reader: "Oral surgery fits me because it is not only one thing. It requires skill and discipline, it is connected to healthcare, and it can lead to ownership and business opportunities. It also creates long-term options. For me, freedom does not just mean money. It means having choices, being able to build things, and having more control over the kind of life I work toward.",
    bullets: ["Skill", "Healthcare", "Business", "Lifestyle", "Freedom", "Helping People"],
  },
  {
    number: "07",
    chapter: "oral-surgery",
    type: "blueprint",
    title: "Healthcare, But With Ownership",
    kicker: "Practice Blueprint",
    lead: "I want a healthcare path where I can help people and still build something of my own.",
    support: "A practice can be care, skill, team, systems, ownership, and growth.",
    reader: "I like healthcare, but I also like the idea of building something. Dentistry and oral surgery are interesting because they can involve both. A practice is not just a place where treatment happens. It is also a team, a system, a patient experience, and a business. That makes the path feel more flexible than a career where I only do one kind of work forever.",
    bullets: ["Care", "Skill", "Team", "Systems", "Ownership", "Growth"],
  },
  {
    number: "08",
    chapter: "oral-surgery",
    type: "roadmap",
    title: "The Pathway",
    kicker: "Training Route",
    lead: "High School Science -> University Prerequisites -> Dental School -> Licensing -> Specialty Training -> Oral Surgery -> Practice / Ownership / Expansion.",
    support: "Side branches: general dentistry, other dental specialties, and business / practice ownership.",
    reader: "The path to oral surgery is long, but it can be broken into stages. First, I need to focus on high school science and strong grades. Then I need university prerequisites, dental school, licensing, and specialty training. The main path leads toward oral surgery, but there are also related dental paths and business options along the way.",
    bullets: ["High School Science", "University Prerequisites", "Dental School", "Licensing", "Specialty Training", "Oral Surgery", "Practice / Ownership / Expansion"],
  },
  {
    number: "09",
    chapter: "oral-surgery",
    type: "research",
    title: "Education and Training Options",
    kicker: "Research Map",
    lead: "UBC is my preferred path, but the smartest path is the one that helps me build the strongest grades, experience, and momentum.",
    support: "UBC, Toronto, Manitoba / OMFS Pathway, and a strategic first year are all worth comparing.",
    reader: "There are multiple education options that could lead toward dentistry and eventually oral surgery. UBC is my preferred option because it is closer to home and feels like the strongest fit. Toronto and Manitoba are also important to consider because they connect to dental education and specialty pathways. A strategic first year at a smaller or local school could also make sense if it helps me build stronger grades, confidence, and momentum before transferring or applying further. I also have family connections in Vancouver, Toronto, and Winnipeg, which makes those cities easier to imagine as real options.",
    bullets: ["UBC", "University of Toronto", "University of Manitoba / OMFS Pathway", "Strategic First Year"],
  },
  {
    number: "10",
    chapter: "ownership",
    type: "system",
    title: "The Business Side of Dentistry",
    kicker: "Ownership",
    lead: "I don't just like the career. I like the idea of building and scaling the business behind it.",
    support: "One practice -> stronger systems -> more rooms -> better team -> another location -> future expansion.",
    reader: "The business side of dentistry is interesting because a practice is more than one dentist working alone. It involves a team, systems, equipment, reputation, patient experience, and growth. If those pieces are managed well, a practice can become stronger over time. That connects to my interest in ownership because I like the idea of building something that can grow.",
    bullets: ["Team", "Systems", "Equipment", "Reputation", "Patient Experience", "Growth"],
  },
  {
    number: "11",
    chapter: "ownership",
    type: "floorplan",
    title: "What a Practice Actually Looks Like",
    kicker: "Operations",
    lead: "From the outside, a dental practice can look simple. Behind the scenes, it is a whole system.",
    support: "Front desk, scheduling, hygienists, assistants, patients, equipment, X-rays, decisions, and the dentist moving between rooms.",
    reader: "When people think of a dental office, they might only think of the dentist and the patient. But behind the scenes, there are many moving parts. There is front desk work, scheduling, hygienists, assistants, patients, equipment, x-rays, and constant decisions. Watching that system makes me realize that a practice is both healthcare and operations.",
    bullets: ["Front desk", "Scheduling", "Hygienists", "Assistants", "Patients", "Equipment", "X-rays", "Decisions"],
  },
  {
    number: "12",
    chapter: "ownership",
    type: "stl",
    title: "Technology in Dentistry",
    kicker: "Digital Scan",
    lead: "A physical scan can become a digital model.",
    support: "This made dentistry feel modern, technical, and connected to how I already think.",
    reader: "Technology is a big part of modern dentistry. A physical scan can become a digital model that can be viewed, rotated, and used for planning. Seeing dental scans made dentistry feel more connected to technology and systems, not just traditional healthcare. It connects to the way I already like working with digital tools.",
    detail: "I scanned my little brother's teeth, which made the technology feel more real instead of just something I read about.",
  },
  {
    number: "13",
    chapter: "ownership",
    type: "expansion",
    title: "Practice Expansion",
    kicker: "Growth",
    lead: "A practice can grow into something bigger than one office.",
    support: "A career can become a platform for building other things.",
    reader: "One thing that interests me is how a dental career can become a platform for bigger projects. A practice can grow through planning, investment, equipment, and team building. Over time, that can create opportunities beyond just one office. This connects to the kind of future I want because I like the idea of building something that can keep expanding.",
    bullets: ["Planning", "Investment", "Equipment", "Growth", "Opportunity"],
  },
  {
    number: "14",
    chapter: "creativity",
    type: "chain",
    title: "Business Is a Skill Too",
    kicker: "Transferable Skill",
    lead: "Even when a side project does not become huge, the skills still stay with you.",
    support: "The project might end, but the skill does not.",
    reader: "I have tried different projects and business ideas, and not every project needs to become huge to matter. Even if a project ends, I still learn how to build, test, organize, problem-solve, and use tools. Those skills can transfer into future businesses, school projects, websites, and even practice ownership later.",
    bullets: ["Build", "Test", "Learn", "Wrap Up", "Apply Later"],
  },
  {
    number: "15",
    chapter: "creativity",
    type: "waveform",
    title: "Music Production",
    kicker: "Creative System",
    lead: "Producing is creative, but it is also technical.",
    support: "You need to be good at a lot of things to be a producer.",
    reader: "Music production is one of the clearest examples of creativity and technical skill coming together. It is not just making something sound cool. It involves sound selection, arrangement, rhythm, mixing, collaboration, taste, and practice. Producing has taught me that creative work still requires systems and discipline.",
    detail: "My uncle helped get me into music production, and if I keep improving, that could lead to real sessions and opportunities later.",
    bullets: ["Sound selection", "Arrangement", "Rhythm", "Mixing", "Collaboration", "Taste", "Practice"],
  },
  {
    number: "16",
    chapter: "creativity",
    type: "photo",
    title: "Waiting for the Right Moment",
    kicker: "Photography",
    lead: "You can always delete a bad picture, but you can't go back and take one you never tried to get.",
    support: "That applies to more than photography.",
    reader: "Photography has taught me about timing. Sometimes the best photo comes from waiting, noticing, and taking the chance when it appears. You can delete a bad picture, but you cannot go back and take one you never tried to get. That idea applies to more than photography. It applies to school, opportunities, business, creativity, and the future.",
    detail: "The Japan photos, especially the Ueno / cherry blossom / empty busy-place idea, connect to this because they show how a real moment can disappear if I do not try to capture it.",
  },
  {
    number: "17",
    chapter: "creativity",
    type: "command",
    title: "Opportunity Is a Resource",
    kicker: "Tools",
    lead: "AI does not replace my thinking. It helps me move faster with ideas, research, organization, and building. I still make the decisions.",
    support: "Doing everything alone is not automatically better.",
    reader: "One thing I have realized is that opportunity is a resource. Tools, people, timing, and access can help ideas move faster. AI does not replace my thinking, but it can help with research, organizing ideas, building, and testing. I still make the decisions. To me, using tools well is not cheating the process. It is part of learning how to work smarter.",
    bullets: ["Ideas", "Research", "Organization", "Building", "Testing", "Decisions"],
  },
  {
    number: "18",
    chapter: "creativity",
    type: "network",
    title: "Skill Opens Doors, People Show You Where They Are",
    kicker: "Connections",
    lead: "Skill matters, but people matter too. Connections do not replace skill - they create opportunities for skill.",
    support: "Dentistry / oral surgery, business, music, and learning from people ahead.",
    reader: "Skill matters most, but people matter too. Connections do not replace skill. They create opportunities for skill to be seen and used. In dentistry and oral surgery, it would help to meet people already in the field. In business, it helps to learn from people who have built something. In music, connections can lead to sessions, but only if the skill is actually there.",
    bullets: ["Dentistry / Oral Surgery", "Business", "Music", "Learning from people ahead"],
  },
  {
    number: "19",
    chapter: "reflection",
    type: "wheel",
    title: "Skills I'm Building",
    kicker: "Skill Wheel",
    lead: "The Future I'm Building.",
    support: "Business thinking, creativity, technical skill, long-term planning, adaptability, and initiative.",
    reader: "The skills I am building are not only for one job. Business thinking helps with ownership and decision-making. Creativity helps with music, photography, and problem solving. Technical skill helps with tools and technology. Long-term planning helps me stay focused. Adaptability helps when plans change. Initiative matters because nothing really happens unless I actually start.",
    bullets: ["Business Thinking", "Creativity", "Technical Skill", "Long-Term Planning", "Adaptability", "Initiative"],
  },
  {
    number: "20",
    chapter: "reflection",
    type: "organize",
    title: "Making It Work Without Giving Things Up",
    kicker: "Integration",
    lead: "I do not want to give up one side of myself to build another.",
    support: "The goal is not to do everything randomly. It is to make everything support the future I'm building.",
    reader: "The main idea I keep coming back to is that I do not want to give up one side of myself to build another. I want career, business, creativity, and experience to support each other. The goal is not to do everything randomly. The goal is to build a future where the different parts connect and make each other stronger.",
    bullets: ["Oral Surgery", "Business", "Music", "Tech", "Photography", "Lifeguarding / Work", "School"],
  },
  {
    number: "21",
    chapter: "reflection",
    type: "future-roadmap",
    title: "The Next Version of the Plan",
    kicker: "Next Version",
    lead: "Now -> Post-secondary -> Dental path -> Oral surgery -> Practice / business -> Keep creating.",
    support: "Include science / grades, shadowing, projects, work experience, earning money / responsibility, and eventually building and scaling a practice.",
    reader: "The next version of the plan is to keep building in steps. Right now, that means focusing on school, science, grades, work experience, and projects. After high school, it means choosing a strong post-secondary path, building the prerequisites for dentistry, and learning more about oral surgery by meeting or shadowing people in the field. Long-term, the goal is oral surgery, practice ownership, business growth, and still keeping creativity in my life.",
    bullets: ["Science / grades", "Meet or shadow oral surgeons", "Business / tech side projects", "Music sessions in university", "Photography / creative work", "Lifeguarding / work experience", "Earning money / responsibility", "Build and scale a practice"],
  },
  {
    number: "22",
    chapter: "reflection",
    type: "sources",
    title: "Sources",
    kicker: "Source Archive",
    lead: "This is the direction I'm building toward, but I'm open to the plan getting better as I learn more.",
    support: "Website built by Jovan Pahal.",
    reader: "This project used a combination of assignment instructions, official dental education sources, career research, and personal experience. Personal experience includes my early interest in dentistry, family exposure to dental practice ownership, creative projects, music production, photography, and technology projects.",
  },
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

let activeSceneIndex = 0;
let sceneObserver;
let threeBundlePromise;
const initializedViewers = new WeakSet();

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function chapterFor(scene) {
  return chapters.find((chapter) => chapter.id === scene.chapter) || chapters[0];
}

function renderSceneHeader(scene) {
  const chapter = chapterFor(scene);
  return `
    <div class="scene-meta">
      <span>${scene.number} / ${String(totalScenes).padStart(2, "0")}</span>
      <span>${escapeHtml(chapter.title)}</span>
      <span>${escapeHtml(scene.kicker)}</span>
    </div>
  `;
}

function renderOpeningScene(scene) {
  return `
    <section class="story-scene scene-opening" id="scene-${scene.number}" data-scene="${scene.number}" data-type="${scene.type}">
      <div class="ambient-video-slot story-ambient" data-ambient-target aria-hidden="true"></div>
      ${renderSceneHeader(scene)}
      <div class="scene-content opening-content">
        <p class="eyebrow reveal-item">Future Blueprint / 01</p>
        <h2 class="reveal-item">${escapeHtml(scene.title)}</h2>
        <p class="scene-lead reveal-item">${escapeHtml(scene.support)}</p>
      </div>
      <div class="blueprint-object" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
      <p class="scroll-cue">Scroll</p>
    </section>
  `;
}

function renderIdentityScene(scene) {
  return `
    <section class="story-scene scene-identity" id="scene-${scene.number}" data-scene="${scene.number}" data-type="${scene.type}">
      ${renderSceneHeader(scene)}
      <div class="identity-system">
        <div class="identity-statement">
          <p class="eyebrow reveal-item">Connected System / 02</p>
          <h2 class="reveal-item">${escapeHtml(scene.lead)}</h2>
        </div>
        <div class="identity-map" aria-label="Connected interests">
          <span class="identity-line horizontal" aria-hidden="true"></span>
          <span class="identity-line vertical" aria-hidden="true"></span>
          ${scene.modules.map((module, index) => `
            <div class="identity-node identity-node-${index + 1} reveal-item" style="--reveal-delay: ${index * 110}ms">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <strong>${escapeHtml(module)}</strong>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderAssetSurface(asset, className = "") {
  const isLive = liveImageAssets.has(asset.path);
  const style = isLive ? ` style="--asset-image: url('${asset.path.replaceAll("'", "%27")}')"` : "";
  return `
    <div class="asset-surface ${className}" data-asset-state="${isLive ? "loaded" : "missing"}"${style}>
      <span>${escapeHtml(asset.title)}</span>
      <strong>${escapeHtml(asset.path)}</strong>
    </div>
  `;
}

function renderArchiveScene(scene) {
  return `
    <section class="story-scene scene-archive" id="scene-${scene.number}" data-scene="${scene.number}" data-type="${scene.type}">
      ${renderSceneHeader(scene)}
      <div class="archive-layout">
        <div class="archive-file reveal-item">
          <div class="archive-top">
            <span>REC 00:00:14</span>
            <span>ARCHIVE / DENTIST</span>
          </div>
          ${renderAssetSurface(scene.asset, "archive-still")}
          <div class="archive-bottom">
            <span>STATUS: ORIGINAL CLUE</span>
            <span>UPDATED: ORAL SURGERY + OWNERSHIP</span>
          </div>
        </div>
        <div class="archive-copy">
          ${scene.archiveLines.map((line, index) => `<p class="reveal-item" style="--reveal-delay: ${index * 180}ms">${escapeHtml(line)}</p>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderQuestionScene(scene) {
  return `
    <section class="story-scene scene-question" id="scene-${scene.number}" data-scene="${scene.number}" data-type="${scene.type}">
      ${renderSceneHeader(scene)}
      <div class="question-network">
        <svg class="question-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M15 22 L50 50 L85 24" />
          <path d="M16 78 L50 50 L84 78" />
        </svg>
        ${scene.words.map((word, index) => `<span class="question-word word-${index + 1} reveal-item" style="--reveal-delay: ${index * 160}ms">${escapeHtml(word)}</span>`).join("")}
        <div class="question-core reveal-item" style="--reveal-delay: 720ms">
          <p class="eyebrow">Core Question</p>
          <h2>${escapeHtml(scene.lead)}</h2>
        </div>
      </div>
    </section>
  `;
}

function renderClinicalScene(scene) {
  return `
    <section class="story-scene scene-clinical" id="scene-${scene.number}" data-scene="${scene.number}" data-type="${scene.type}">
      ${renderSceneHeader(scene)}
      <div class="clinical-scan" aria-hidden="true">
        <span class="scan-ring ring-a"></span>
        <span class="scan-ring ring-b"></span>
        <span class="scan-sweep"></span>
      </div>
      <div class="scene-content clinical-content">
        <p class="eyebrow reveal-item">Clinical Direction / 05</p>
        <h2 class="reveal-item">${escapeHtml(scene.title)}</h2>
        <p class="scene-lead reveal-item">${escapeHtml(scene.lead)}</p>
        <p class="scene-support reveal-item">${escapeHtml(scene.support)}</p>
      </div>
    </section>
  `;
}

function renderGenericScene(scene) {
  const bulletMarkup = scene.bullets ? `
    <div class="story-inline-list">
      ${scene.bullets.slice(0, 8).map((bullet, index) => `<span class="reveal-item" style="--reveal-delay: ${index * 80}ms">${escapeHtml(bullet)}</span>`).join("")}
    </div>
  ` : "";
  const featureMarkup = scene.type === "stl" ? renderDentalViewer("story") : `<div class="future-mark" aria-hidden="true"><span>${escapeHtml(scene.number)}</span></div>`;

  return `
    <section class="story-scene scene-generic scene-${scene.type}" id="scene-${scene.number}" data-scene="${scene.number}" data-type="${scene.type}">
      ${renderSceneHeader(scene)}
      <div class="generic-grid">
        <div class="generic-copy">
          <p class="eyebrow reveal-item">${escapeHtml(scene.kicker)}</p>
          <h2 class="reveal-item">${escapeHtml(scene.title)}</h2>
          <p class="scene-lead reveal-item">${escapeHtml(scene.lead)}</p>
          <p class="scene-support reveal-item">${escapeHtml(scene.support)}</p>
          ${bulletMarkup}
        </div>
        ${featureMarkup}
      </div>
    </section>
  `;
}

function renderStoryScene(scene) {
  if (scene.type === "opening") return renderOpeningScene(scene);
  if (scene.type === "identity") return renderIdentityScene(scene);
  if (scene.type === "archive") return renderArchiveScene(scene);
  if (scene.type === "question") return renderQuestionScene(scene);
  if (scene.type === "clinical") return renderClinicalScene(scene);
  return renderGenericScene(scene);
}

function renderStory() {
  $("#story-scenes").innerHTML = scenes.map(renderStoryScene).join("");
}

function renderReaderFeature(scene) {
  if (scene.type === "stl") return renderDentalViewer("reader");
  if (scene.type === "sources") {
    return `
      <div class="reader-source-list">
        ${sourceCards.map((source) => {
          const body = `<strong>${escapeHtml(source.title)}</strong><span>${escapeHtml(source.detail)}</span>`;
          return source.url
            ? `<a href="${source.url}" target="_blank" rel="noreferrer">${body}</a>`
            : `<div>${body}</div>`;
        }).join("")}
      </div>
    `;
  }
  if (scene.asset) return renderAssetSurface(scene.asset, "reader-asset");
  if (scene.bullets) {
    return `<div class="reader-token-list">${scene.bullets.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`;
  }
  return `<div class="reader-future-mark"><span>${escapeHtml(scene.number)}</span></div>`;
}

function renderReader() {
  $("#chapter-menu").innerHTML = chapters.map((chapter) => `
    <a href="#chapter-${chapter.id}" title="${chapter.number}: ${chapter.title}">${chapter.number} - ${chapter.title}</a>
  `).join("");

  $("#reader-slides").innerHTML = scenes.map((scene, index) => {
    const chapter = chapterFor(scene);
    const isFirstInChapter = scenes.findIndex((item) => item.chapter === scene.chapter) === index;
    return `
      <article class="reader-card" id="${isFirstInChapter ? `chapter-${chapter.id}` : `reader-scene-${scene.number}`}">
        <div class="reader-copy">
          <p class="eyebrow">${chapter.number} - ${chapter.title}</p>
          <h2>${scene.number} ${escapeHtml(scene.title)}</h2>
          <p><strong>${escapeHtml(scene.lead)}</strong></p>
          <p>${escapeHtml(scene.reader)}</p>
          ${scene.detail ? `<p>${escapeHtml(scene.detail)}</p>` : ""}
          <p>${escapeHtml(scene.support)}</p>
        </div>
        <div class="reader-feature">${renderReaderFeature(scene)}</div>
        <span class="reader-number">${String(index + 1).padStart(2, "0")} / ${totalScenes}</span>
      </article>
    `;
  }).join("");
}

function renderDentalViewer(mode) {
  const modeCopy = mode === "reader" ? "Drag to inspect the model." : "Auto-rotating dental scan fallback.";
  return `
    <div class="stl-wrap">
      <div class="stl-viewer" data-stl-viewer data-viewer-mode="${mode}" aria-label="Dental STL viewer">
        <div class="stl-overlay">
          assets/dental/Visualization_DigitalModelUnsectioned_18-28.stl<br>
          assets/dental/Visualization_DigitalModelUnsectioned_38-48.stl
        </div>
      </div>
      <p class="viewer-hint">${modeCopy}</p>
    </div>
  `;
}

async function assetExists(path) {
  try {
    const response = await fetch(path, { method: "HEAD", cache: "no-store" });
    return response.ok;
  } catch {
    return false;
  }
}

async function hydrateAmbientVideo() {
  const exists = await assetExists(ambientVideoPath);
  if (!exists) return;
  const videoMarkup = `
    <video class="ambient-video" autoplay muted loop playsinline preload="metadata">
      <source src="${ambientVideoPath}" type="video/mp4">
    </video>
  `;
  $$(".ambient-video-slot").forEach((slot) => {
    slot.innerHTML = videoMarkup;
    slot.classList.add("has-video");
  });
}

function showMode(mode, updateUrl = false) {
  const normalized = mode === "reader" ? "reader" : mode === "story" || mode === "present" ? "story" : "landing";
  $("#landing-screen").hidden = normalized !== "landing";
  $("#story-screen").hidden = normalized !== "story";
  $("#reader-screen").hidden = normalized !== "reader";

  document.body.classList.toggle("landing-mode", normalized === "landing");
  document.body.classList.toggle("story-mode", normalized === "story");
  document.body.classList.toggle("reader-mode", normalized === "reader");

  if (updateUrl) {
    const url = normalized === "landing" ? location.pathname : `${location.pathname}?mode=${normalized}`;
    history.pushState({ mode: normalized }, "", url);
  }

  if (normalized === "story") {
    requestAnimationFrame(() => {
      setupSceneObserver();
      initDentalViewers("story");
      const target = $(`#scene-${scenes[activeSceneIndex]?.number || "01"}`);
      if (target) target.scrollIntoView({ block: "start" });
    });
  }

  if (normalized === "reader") {
    requestAnimationFrame(() => initDentalViewers("reader"));
  }
}

function setupSceneObserver() {
  if (sceneObserver) sceneObserver.disconnect();

  sceneObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const sceneNumber = entry.target.dataset.scene;
      const index = scenes.findIndex((scene) => scene.number === sceneNumber);
      if (index < 0) return;
      setActiveScene(index, entry.target);
    });
  }, { threshold: 0.58 });

  $$(".story-scene").forEach((scene) => sceneObserver.observe(scene));
}

function setActiveScene(index, element) {
  if (activeSceneIndex !== index) flashSignal();
  activeSceneIndex = index;
  $$(".story-scene.is-active").forEach((scene) => scene.classList.remove("is-active"));
  element.classList.add("is-active");
  $("#scene-index-current").textContent = scenes[index].number;
  $("#story-progress-bar").style.transform = `scaleX(${(index + 1) / totalScenes})`;
  if (scenes[index].type === "stl") initDentalViewers("story");
}

function flashSignal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const signal = $("#signal-transition");
  signal.classList.remove("is-active");
  requestAnimationFrame(() => signal.classList.add("is-active"));
  window.setTimeout(() => signal.classList.remove("is-active"), 620);
}

function setupCursorLight() {
  const light = $("#cursor-light");
  if (!light) return;
  window.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
  }, { passive: true });
}

function setupKeyboardNavigation() {
  window.addEventListener("keydown", (event) => {
    if (!document.body.classList.contains("story-mode")) return;
    const tagName = document.activeElement?.tagName;
    if (tagName === "INPUT" || tagName === "TEXTAREA") return;

    const forward = event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ";
    const backward = event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "PageUp";
    if (!forward && !backward) return;
    event.preventDefault();

    const nextIndex = Math.max(0, Math.min(totalScenes - 1, activeSceneIndex + (forward ? 1 : -1)));
    const target = $(`#scene-${scenes[nextIndex].number}`);
    if (target) target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  });
}

function runIntroLoader(initialMode) {
  const loader = $("#intro-loader");
  if (!loader) return;
  if (initialMode === "reader" || initialMode === "story" || initialMode === "present" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    loader.hidden = true;
    return;
  }
  window.setTimeout(() => {
    loader.classList.add("is-done");
    window.setTimeout(() => {
      loader.hidden = true;
    }, 760);
  }, 980);
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
  scene.add(new THREE.AmbientLight(0xffffff, 0.82));

  const key = new THREE.DirectionalLight(0xffffff, 1.35);
  key.position.set(54, 76, 88);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xaeb8c3, 0.72);
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
  controls.autoRotate = true;
  controls.autoRotateSpeed = mode === "story" ? 0.8 : 1.2;
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
    if (mode !== "reader") group.rotation.y += 0.0025;
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
    "STL files not found yet. Fallback dental model active.",
    "assets/dental/Visualization_DigitalModelUnsectioned_18-28.stl",
    "assets/dental/Visualization_DigitalModelUnsectioned_38-48.stl",
  ].join("<br>");
}

async function stlAssetExists(path) {
  return assetExists(path);
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

function initModeButtons() {
  $$("[data-set-mode]").forEach((button) => {
    button.addEventListener("click", () => showMode(button.dataset.setMode, true));
  });
}

function init() {
  document.documentElement.dataset.sceneCount = String(scenes.length);
  renderStory();
  renderReader();
  initComments();
  initModeButtons();
  setupCursorLight();
  setupKeyboardNavigation();
  hydrateAmbientVideo();

  window.addEventListener("popstate", () => {
    const params = new URLSearchParams(location.search);
    showMode(params.get("mode"));
  });

  const params = new URLSearchParams(location.search);
  const initialMode = params.get("mode");
  showMode(initialMode);
  runIntroLoader(initialMode);
}

window.__CAPSTONE_SCENES__ = scenes;
init();
