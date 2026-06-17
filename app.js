const totalScenes = 22;
const ambientVideoPath = "assets/video/future-blueprint-ambient.mp4";
const loadDentalStlFiles = true;
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

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
    duration: 1.05,
    title: "The Future I'm Building",
    kicker: "Opening File",
    lead: "Oral Surgery - Business - Creativity",
    support: "A personal blueprint for building a future that combines healthcare, ownership, creativity, and freedom.",
    reader: "This project is about the future I can actually see myself building toward. It is not just one career idea. It connects oral surgery, business, creativity, technology, and the kind of freedom I want later in life. I want a future where the things I care about do not compete with each other, but support each other.",
  },
  {
    number: "02",
    chapter: "origin",
    type: "identity",
    duration: 1.25,
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
    duration: 1.15,
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
      title: "Kindergarten Career Memory",
      detail: "Topic: future career / Status: original clue / Updated vision: oral surgery + ownership",
      path: "assets/generated/archive-memory-frame.svg",
    },
  },
  {
    number: "04",
    chapter: "origin",
    type: "question",
    duration: 1.15,
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
    duration: 1.05,
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
    duration: 1.15,
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
    type: "ownership",
    duration: 1,
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
    duration: 2.05,
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
    duration: 1,
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
    type: "growth",
    duration: 1.25,
    title: "The Business Side of Dentistry",
    kicker: "Ownership",
    lead: "I don't just like the career. I like the idea of building and scaling the business behind it.",
    support: "One practice -> stronger systems -> more rooms -> better team -> another location -> future expansion.",
    reader: "The business side of dentistry is interesting because a practice is more than one dentist working alone. It involves a team, systems, equipment, reputation, patient experience, and growth. If those pieces are managed well, a practice can become stronger over time. That connects to my interest in ownership because I like the idea of building something that can grow.",
    bullets: ["Team", "Systems", "Rooms", "Better Team", "Another Location", "Expansion"],
  },
  {
    number: "11",
    chapter: "ownership",
    type: "floorplan",
    duration: 1.25,
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
    duration: 2.15,
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
    duration: 1.05,
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
    duration: 1,
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
    duration: 1.35,
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
    duration: 1.15,
    title: "Waiting for the Right Moment",
    kicker: "Photography",
    lead: "You can always delete a bad picture, but you can't go back and take one you never tried to get.",
    support: "That applies to more than photography.",
    reader: "Photography has taught me about timing. Sometimes the best photo comes from waiting, noticing, and taking the chance when it appears. You can delete a bad picture, but you cannot go back and take one you never tried to get. That idea applies to more than photography. It applies to school, opportunities, business, creativity, and the future.",
    detail: "The Japan photos, especially the Ueno / cherry blossom / empty busy-place idea, connect to this because they show how a real moment can disappear if I do not try to capture it.",
    asset: {
      title: "Japan Photo Moment",
      detail: "Slow pan / hover scan treatment",
      path: "assets/generated/photo-placeholder.svg",
    },
  },
  {
    number: "17",
    chapter: "creativity",
    type: "command",
    duration: 1.1,
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
    duration: 1.05,
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
    duration: 1.15,
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
    duration: 1.25,
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
    duration: 1.55,
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
    duration: 1.1,
    title: "Sources",
    kicker: "Source Archive",
    lead: "This is the direction I'm building toward, but I'm open to the plan getting better as I learn more.",
    support: "Website built by Jovan Pahal.",
    reader: "This project used a combination of assignment instructions, official dental education sources, career research, and personal experience. Personal experience includes my early interest in dentistry, family exposure to dental practice ownership, creative projects, music production, photography, and technology projects.",
  },
];

window.__CAPSTONE_SCENES__ = scenes;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

let activeSceneIndex = 0;
let storyController;
let threeBundlePromise;
const initializedViewers = new WeakSet();
const pointerState = { x: 0, y: 0, clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 };

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

function reveal(text, delay = 0, className = "") {
  return `<span class="reveal-line ${className}" style="--delay:${delay}ms">${escapeHtml(text)}</span>`;
}

function sceneLabel(scene) {
  return `
    <div class="scene-label" aria-hidden="true">
      <span>${scene.number}</span>
      <span>${escapeHtml(scene.kicker)}</span>
    </div>
  `;
}

function storyLayer(scene, className, body) {
  const index = Number(scene.number) - 1;
  return `
    <section class="story-layer ${className}" id="scene-${scene.number}" data-scene="${scene.number}" data-scene-index="${index}" data-type="${scene.type}" aria-label="${escapeHtml(scene.title)}">
      ${sceneLabel(scene)}
      ${body}
    </section>
  `;
}

function renderOpeningScene(scene) {
  return storyLayer(scene, "scene-opening", `
    <div class="story-ambient" data-ambient-target aria-hidden="true"></div>
    <div class="opening-chrome" aria-hidden="true">
      <span></span><span></span><span></span><span></span>
    </div>
    <div class="opening-lockup">
      <p class="eyebrow reveal-line">Personal Future Blueprint</p>
      <h2 class="reveal-title">${escapeHtml(scene.title)}</h2>
      <p class="opening-subtitle reveal-line" style="--delay:180ms">Oral Surgery &bull; Business &bull; Creativity</p>
      <p class="scene-copy reveal-line" style="--delay:320ms">${escapeHtml(scene.support)}</p>
    </div>
    <div class="opening-instrument" aria-hidden="true">
      <i></i><i></i><i></i>
    </div>
    <p class="scroll-cue">Scroll to begin</p>
  `);
}

function renderIdentityScene(scene) {
  const nodes = scene.modules.map((module, index) => `
    <div class="system-node node-${index + 1} reveal-node" style="--delay:${index * 120}ms">
      <span>0${index + 1}</span>
      <strong>${escapeHtml(module)}</strong>
    </div>
  `).join("");

  return storyLayer(scene, "scene-identity", `
    <div class="identity-copy">
      <p class="eyebrow reveal-line">Connected System</p>
      <h2 class="compact-title reveal-title">${escapeHtml(scene.lead)}</h2>
    </div>
    <div class="system-map reactive-tilt" aria-label="Connected interests">
      <svg class="system-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M50 50L18 19M50 50L82 18M50 50L17 51M50 50L84 51M50 50L19 82M50 50L82 82"/>
      </svg>
      <div class="system-core">Future<br>System</div>
      ${nodes}
    </div>
  `);
}

function renderArchiveScene(scene) {
  return storyLayer(scene, "scene-archive", `
    <div class="archive-scanner" aria-hidden="true"></div>
    <div class="archive-file reactive-tilt">
      <div class="archive-meta">
        <span>FILE 03</span>
        <span>REC 00:00:14</span>
        <span>STATUS: MEMORY LOAD</span>
      </div>
      <figure class="archive-media">
        <img src="${scene.asset.path}" alt="">
      </figure>
      <div class="archive-footer">
        <span>TOPIC: FUTURE CAREER</span>
        <span>UPDATED VISION: ORAL SURGERY + OWNERSHIP</span>
      </div>
    </div>
    <div class="archive-text">
      <p class="eyebrow reveal-line">This Started Early</p>
      ${scene.archiveLines.map((line, index) => `<p class="typed-line" data-type-text="${escapeHtml(line)}" data-type-delay="${index * 640}"></p>`).join("")}
    </div>
  `);
}

function renderQuestionScene(scene) {
  const words = scene.words.map((word, index) => `
    <span class="question-word q-${index + 1}" style="--delay:${index * 180}ms" data-step="${0.12 + index * 0.12}">${escapeHtml(word)}</span>
  `).join("");

  return storyLayer(scene, "scene-question", `
    <div class="question-field">
      <svg class="question-linework" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M18 22L50 50L82 22"/>
        <path d="M16 80L50 50L84 80"/>
        <circle cx="50" cy="50" r="16"/>
      </svg>
      ${words}
      <div class="question-core">
        <p class="eyebrow reveal-line">Core Question</p>
        <h2 class="question-typed" data-type-text="${escapeHtml(scene.lead)}"></h2>
      </div>
    </div>
  `);
}

function renderClinicalScene(scene) {
  return storyLayer(scene, "scene-clinical", `
    <div class="clinical-device reactive-tilt" aria-hidden="true">
      <span class="clinical-ring ring-one"></span>
      <span class="clinical-ring ring-two"></span>
      <span class="clinical-crosshair"></span>
      <span class="clinical-beam"></span>
    </div>
    <div class="clinical-copy">
      <p class="eyebrow reveal-line">Clinical Direction</p>
      <h2 class="scan-title reveal-title">${escapeHtml(scene.title)}</h2>
      <p class="scene-copy reveal-line" style="--delay:240ms">${escapeHtml(scene.lead)}</p>
      <p class="scene-copy muted reveal-line" style="--delay:420ms">${escapeHtml(scene.support)}</p>
    </div>
  `);
}

function renderNodeScene(scene) {
  const nodes = scene.bullets.map((item, index) => `
    <div class="fit-node fit-${index + 1}" data-step="${0.15 + index * 0.1}">
      <span>${escapeHtml(item)}</span>
    </div>
  `).join("");

  return storyLayer(scene, "scene-node", `
    <div class="node-copy">
      <p class="eyebrow reveal-line">Why It Fits</p>
      <p class="scene-copy reveal-line">${escapeHtml(scene.support)}</p>
    </div>
    <div class="fit-map reactive-tilt">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M50 50L50 13M50 50L82 29M50 50L82 72M50 50L50 88M50 50L18 72M50 50L18 29"/>
      </svg>
      <div class="fit-core">${escapeHtml(scene.lead)}</div>
      ${nodes}
    </div>
  `);
}

function renderOwnershipScene(scene) {
  return storyLayer(scene, "scene-ownership", `
    <div class="ownership-line" aria-hidden="true"></div>
    <div class="ownership-half care-side">
      <p class="eyebrow reveal-line">Healthcare / Care</p>
      <h2 class="half-title reveal-title">Help People</h2>
      <p class="scene-copy reveal-line" style="--delay:220ms">Skill, trust, treatment, patient experience.</p>
    </div>
    <div class="ownership-half build-side">
      <p class="eyebrow reveal-line">Ownership / Systems</p>
      <h2 class="half-title reveal-title">Build Something</h2>
      <p class="scene-copy reveal-line" style="--delay:300ms">${escapeHtml(scene.lead)}</p>
    </div>
  `);
}

function renderRoadmapScene(scene) {
  const steps = scene.bullets.map((item, index) => `
    <div class="road-step step-${index + 1}" data-step="${index / (scene.bullets.length - 1)}">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${escapeHtml(item)}</strong>
    </div>
  `).join("");

  return storyLayer(scene, "scene-roadmap", `
    <div class="roadmap-copy">
      <p class="eyebrow reveal-line">The Pathway</p>
      <h2 class="compact-title reveal-title">A long path becomes easier when it is traceable.</h2>
    </div>
    <div class="roadmap-rail">
      <img src="assets/generated/pathway-roadmap.svg" alt="">
      <span class="roadmap-trace"></span>
      ${steps}
      <div class="road-branches" data-step="0.62">
        <span>General Dentistry</span>
        <span>Other Dental Specialties</span>
        <span>Business / Practice Ownership</span>
      </div>
    </div>
  `);
}

function renderResearchScene(scene) {
  const slips = scene.bullets.map((item, index) => `
    <article class="research-slip ${index === 0 ? "preferred" : ""}" data-step="${0.12 + index * 0.14}">
      <span>RESEARCH ${String(index + 1).padStart(2, "0")}</span>
      <strong>${escapeHtml(item)}</strong>
      <em>${index === 0 ? "Preferred path" : "Compare pathway"}</em>
    </article>
  `).join("");

  return storyLayer(scene, "scene-research", `
    <div class="research-copy">
      <p class="eyebrow reveal-line">Education Options</p>
      <h2 class="compact-title reveal-title">${escapeHtml(scene.title)}</h2>
      <p class="scene-copy reveal-line" style="--delay:220ms">${escapeHtml(scene.lead)}</p>
    </div>
    <div class="research-board reactive-tilt">${slips}</div>
  `);
}

function renderGrowthScene(scene) {
  const nodes = scene.bullets.map((item, index) => `
    <div class="growth-node growth-${index + 1}" data-step="${0.12 + index * 0.13}">
      <span>${escapeHtml(item)}</span>
    </div>
  `).join("");

  return storyLayer(scene, "scene-growth", `
    <div class="growth-system">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M12 52C26 28 42 28 52 50S77 74 89 47"/>
        <path d="M18 73C34 58 48 64 58 78S78 88 91 69"/>
      </svg>
      <div class="practice-core">Practice</div>
      ${nodes}
    </div>
    <div class="growth-copy">
      <p class="eyebrow reveal-line">Business System</p>
      <h2 class="compact-title reveal-title">${escapeHtml(scene.lead)}</h2>
      <p class="scene-copy reveal-line" style="--delay:220ms">${escapeHtml(scene.support)}</p>
    </div>
  `);
}

function renderFloorplanScene(scene) {
  const zones = scene.bullets.map((item, index) => `
    <button class="floor-zone floor-${index + 1}" type="button" data-step="${0.1 + index * 0.08}">
      ${escapeHtml(item)}
    </button>
  `).join("");

  return storyLayer(scene, "scene-floorplan", `
    <div class="floorplan-shell">
      <img src="assets/generated/clinic-floorplan.svg" alt="">
      ${zones}
    </div>
    <div class="floorplan-copy">
      <p class="eyebrow reveal-line">Operations Map</p>
      <h2 class="compact-title reveal-title">${escapeHtml(scene.title)}</h2>
      <p class="scene-copy reveal-line" style="--delay:220ms">${escapeHtml(scene.lead)}</p>
    </div>
  `);
}

function renderStlScene(scene) {
  return storyLayer(scene, "scene-stl", `
    <div class="model-copy">
      <p class="eyebrow reveal-line">Digital Dentistry</p>
      <h2 class="compact-title reveal-title">${escapeHtml(scene.title)}</h2>
      <p class="scene-copy reveal-line" style="--delay:220ms">${escapeHtml(scene.lead)}</p>
      <p class="scene-copy muted reveal-line" style="--delay:420ms">${escapeHtml(scene.support)}</p>
    </div>
    <div class="model-stage reactive-tilt">
      ${renderDentalViewer("story")}
      <div class="model-readout" aria-hidden="true">
        <span>SCAN ACTIVE</span>
        <span>ROTATION: SCROLL + CURSOR</span>
        <span>STL / REAL MODEL PATH</span>
      </div>
    </div>
  `);
}

function renderExpansionScene(scene) {
  const nodes = scene.bullets.map((item, index) => `
    <span class="network-chip exp-${index + 1}" data-step="${0.15 + index * 0.12}">${escapeHtml(item)}</span>
  `).join("");

  return storyLayer(scene, "scene-expansion", `
    <div class="expansion-net">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M50 50L25 28M50 50L75 26M50 50L22 72M50 50L78 74M50 50L50 14"/>
      </svg>
      <strong>Clinic Node</strong>
      ${nodes}
    </div>
    <div class="expansion-copy">
      <p class="eyebrow reveal-line">Expansion</p>
      <h2 class="compact-title reveal-title">${escapeHtml(scene.lead)}</h2>
      <p class="scene-copy reveal-line" style="--delay:240ms">${escapeHtml(scene.support)}</p>
    </div>
  `);
}

function renderChainScene(scene) {
  const links = scene.bullets.map((item, index) => `
    <div class="chain-link" data-step="${0.08 + index * 0.17}">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${escapeHtml(item)}</strong>
    </div>
  `).join("");

  return storyLayer(scene, "scene-chain", `
    <div class="chain-copy">
      <p class="eyebrow reveal-line">Business Is A Skill</p>
      <h2 class="compact-title reveal-title">${escapeHtml(scene.lead)}</h2>
      <p class="scene-copy reveal-line" style="--delay:240ms">${escapeHtml(scene.support)}</p>
    </div>
    <div class="chain-track">${links}</div>
  `);
}

function renderWaveformScene(scene) {
  const lanes = scene.bullets.slice(0, 6).map((item, index) => `
    <span class="mix-lane lane-${index + 1}" data-step="${0.12 + index * 0.1}">
      <i></i><strong>${escapeHtml(item)}</strong>
    </span>
  `).join("");

  return storyLayer(scene, "scene-waveform", `
    <div class="waveform-stage">
      <img src="assets/generated/waveform-system.svg" alt="">
      <span class="waveform-scrub"></span>
      ${lanes}
    </div>
    <div class="waveform-copy">
      <p class="eyebrow reveal-line">Music Production</p>
      <h2 class="compact-title reveal-title">${escapeHtml(scene.lead)}</h2>
      <p class="scene-copy reveal-line" style="--delay:240ms">${escapeHtml(scene.support)}</p>
    </div>
  `);
}

function renderPhotoScene(scene) {
  return storyLayer(scene, "scene-photo", `
    <figure class="photo-frame">
      <img src="${scene.asset.path}" alt="">
      <figcaption>
        <span>WAIT FOR THE RIGHT MOMENT</span>
        <strong>${escapeHtml(scene.asset.detail)}</strong>
      </figcaption>
    </figure>
    <div class="photo-copy">
      <p class="eyebrow reveal-line">Photography</p>
      <h2 class="compact-title reveal-title">${escapeHtml(scene.lead)}</h2>
      <p class="scene-copy reveal-line" style="--delay:260ms">${escapeHtml(scene.support)}</p>
    </div>
  `);
}

function renderCommandScene(scene) {
  const commands = scene.bullets.map((item, index) => `
    <p class="command-line" data-type-text="> ${escapeHtml(item.toLowerCase())}.assemble()" data-type-delay="${index * 460}"></p>
  `).join("");

  return storyLayer(scene, "scene-command", `
    <div class="command-shell">
      <div class="command-top"><span>TOOLS / OPPORTUNITY</span><span>DECISION REQUIRED</span></div>
      ${commands}
    </div>
    <div class="command-copy">
      <p class="eyebrow reveal-line">Opportunity Is A Resource</p>
      <h2 class="compact-title reveal-title">${escapeHtml(scene.title)}</h2>
      <p class="scene-copy reveal-line" style="--delay:280ms">${escapeHtml(scene.support)}</p>
    </div>
  `);
}

function renderNetworkScene(scene) {
  const chips = scene.bullets.map((item, index) => `
    <span class="door-node door-${index + 1}" data-step="${0.18 + index * 0.14}">${escapeHtml(item)}</span>
  `).join("");

  return storyLayer(scene, "scene-network", `
    <div class="door-map reactive-tilt">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M50 50L17 24M50 50L84 24M50 50L18 78M50 50L84 78"/>
      </svg>
      <strong>Skill</strong>
      ${chips}
    </div>
    <div class="network-copy">
      <p class="eyebrow reveal-line">Skill Opens Doors</p>
      <h2 class="compact-title reveal-title">${escapeHtml(scene.lead)}</h2>
    </div>
  `);
}

function renderWheelScene(scene) {
  const spokes = scene.bullets.map((item, index) => `
    <span class="wheel-item wheel-${index + 1}" data-step="${0.12 + index * 0.12}">${escapeHtml(item)}</span>
  `).join("");

  return storyLayer(scene, "scene-wheel", `
    <div class="skill-wheel reactive-tilt">
      <div class="wheel-core">The Future<br>I'm Building</div>
      ${spokes}
    </div>
    <div class="wheel-copy">
      <p class="eyebrow reveal-line">Skills In Progress</p>
      <h2 class="compact-title reveal-title">${escapeHtml(scene.title)}</h2>
      <p class="scene-copy reveal-line" style="--delay:240ms">${escapeHtml(scene.support)}</p>
    </div>
  `);
}

function renderOrganizeScene(scene) {
  const groups = ["Career", "Business", "Creativity", "Experience"];
  const bins = groups.map((item, index) => `<div class="organize-bin bin-${index + 1}" data-step="${0.12 + index * 0.12}">${item}</div>`).join("");
  const items = scene.bullets.map((item, index) => `<span class="floating-item item-${index + 1}" data-step="${0.36 + index * 0.07}">${escapeHtml(item)}</span>`).join("");

  return storyLayer(scene, "scene-organize", `
    <div class="organize-stage">
      ${bins}
      ${items}
    </div>
    <div class="organize-copy">
      <p class="eyebrow reveal-line">Integration</p>
      <h2 class="compact-title reveal-title">${escapeHtml(scene.lead)}</h2>
      <p class="scene-copy reveal-line" style="--delay:240ms">${escapeHtml(scene.support)}</p>
    </div>
  `);
}

function renderFutureRoadmapScene(scene) {
  const stages = ["Now", "Post-secondary", "Dental path", "Oral surgery", "Practice / business", "Keep creating"];
  const markup = stages.map((item, index) => `
    <span class="future-step future-${index + 1}" data-step="${index / (stages.length - 1)}">${escapeHtml(item)}</span>
  `).join("");

  return storyLayer(scene, "scene-future-roadmap", `
    <div class="future-map">
      <span class="future-trace"></span>
      ${markup}
    </div>
    <div class="future-copy">
      <p class="eyebrow reveal-line">Next Version</p>
      <h2 class="compact-title reveal-title">${escapeHtml(scene.title)}</h2>
      <p class="scene-copy reveal-line" style="--delay:240ms">${escapeHtml(scene.support)}</p>
      <p class="ending-line" data-type-text="${escapeHtml(scene.lead)}"></p>
    </div>
  `);
}

function renderSourcesScene(scene) {
  const records = sourceCards.map((source, index) => `
    <article class="source-record" data-step="${0.08 + index * 0.09}">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${escapeHtml(source.title)}</strong>
    </article>
  `).join("");

  return storyLayer(scene, "scene-sources", `
    <div class="source-archive">
      ${records}
    </div>
    <div class="source-ending">
      <p class="eyebrow reveal-line">Source Archive</p>
      <h2 class="compact-title reveal-title">${escapeHtml(scene.lead)}</h2>
      <p class="final-credit reveal-line" style="--delay:520ms">${escapeHtml(scene.support)}</p>
    </div>
  `);
}

function renderStoryScene(scene) {
  switch (scene.type) {
    case "opening": return renderOpeningScene(scene);
    case "identity": return renderIdentityScene(scene);
    case "archive": return renderArchiveScene(scene);
    case "question": return renderQuestionScene(scene);
    case "clinical": return renderClinicalScene(scene);
    case "node": return renderNodeScene(scene);
    case "ownership": return renderOwnershipScene(scene);
    case "roadmap": return renderRoadmapScene(scene);
    case "research": return renderResearchScene(scene);
    case "growth": return renderGrowthScene(scene);
    case "floorplan": return renderFloorplanScene(scene);
    case "stl": return renderStlScene(scene);
    case "expansion": return renderExpansionScene(scene);
    case "chain": return renderChainScene(scene);
    case "waveform": return renderWaveformScene(scene);
    case "photo": return renderPhotoScene(scene);
    case "command": return renderCommandScene(scene);
    case "network": return renderNetworkScene(scene);
    case "wheel": return renderWheelScene(scene);
    case "organize": return renderOrganizeScene(scene);
    case "future-roadmap": return renderFutureRoadmapScene(scene);
    case "sources": return renderSourcesScene(scene);
    default: return renderOpeningScene(scene);
  }
}

function renderStory() {
  $("#story-scenes").innerHTML = scenes.map(renderStoryScene).join("");
}

function renderAssetSurface(asset, className = "") {
  return `
    <div class="asset-surface ${className}">
      <img src="${asset.path}" alt="">
      <span>${escapeHtml(asset.title)}</span>
      <strong>${escapeHtml(asset.detail || asset.path)}</strong>
    </div>
  `;
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
  const modeCopy = mode === "reader" ? "Drag to inspect the model." : "Rotates with scroll and cursor movement.";
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

class SignalLayer {
  constructor(element) {
    this.element = element;
    this.locked = false;
  }

  play(onMidpoint, onComplete) {
    if (!this.element || reduceMotionQuery.matches) {
      onMidpoint?.();
      onComplete?.();
      return;
    }

    this.locked = true;
    const canvas = document.createElement("canvas");
    const scale = window.innerWidth < 720 ? 5 : 3;
    canvas.width = Math.max(1, Math.floor(window.innerWidth / scale));
    canvas.height = Math.max(1, Math.floor(window.innerHeight / scale));
    this.element.innerHTML = "";
    this.element.append(canvas);
    this.element.classList.add("is-active");

    const ctx = canvas.getContext("2d");
    let frame = 0;
    let midpointDone = false;
    const maxFrames = 18;

    const draw = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const v = Math.random() * 255;
        imageData.data[i] = v;
        imageData.data[i + 1] = v;
        imageData.data[i + 2] = v;
        imageData.data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);

      if (frame === 7 && !midpointDone) {
        midpointDone = true;
        onMidpoint?.();
      }

      frame += 1;
      if (frame < maxFrames) {
        requestAnimationFrame(draw);
      } else {
        if (!midpointDone) onMidpoint?.();
        this.element.classList.remove("is-active");
        window.setTimeout(() => {
          this.element.innerHTML = "";
          this.locked = false;
          onComplete?.();
        }, 80);
      }
    };

    draw();
  }
}

class Typewriter {
  static run(element) {
    if (!element || element.dataset.typed === "true") return;
    const text = element.dataset.typeText || "";
    const delay = Number(element.dataset.typeDelay || 0);
    element.dataset.typed = "true";

    if (reduceMotionQuery.matches) {
      element.textContent = text;
      return;
    }

    window.setTimeout(() => {
      let i = 0;
      element.textContent = "";
      const speed = text.length > 70 ? 18 : 34;
      const timer = window.setInterval(() => {
        element.textContent += text[i] || "";
        i += 1;
        if (i >= text.length) window.clearInterval(timer);
      }, speed);
    }, delay);
  }
}

class MotionController {
  constructor(stage, signalLayer) {
    this.stage = stage;
    this.signalLayer = signalLayer;
    this.layers = [];
    this.starts = [];
    this.activeIndex = 0;
    this.enabled = false;
    this.locked = false;
    this.lastScrollY = 0;
    this.scrollVelocity = 0;
    this.preventScroll = this.preventScroll.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  mount() {
    this.layers = $$(".story-layer", this.stage);
    this.computeStarts();
    this.activate(0, true);
  }

  computeStarts() {
    this.starts = [];
    let cursor = 0;
    scenes.forEach((scene) => {
      this.starts.push(cursor);
      cursor += scene.duration || 1;
    });
    this.totalUnits = cursor;
  }

  enable() {
    if (!this.stage) return;
    if (this.enabled) {
      this.computeStarts();
      this.setArtificialHeight();
      this.onScroll(true);
      return;
    }

    this.enabled = true;
    this.computeStarts();
    this.setArtificialHeight();
    window.addEventListener("scroll", this.onScroll, { passive: true });
    window.addEventListener("resize", this.onResize);
    this.onScroll(true);
  }

  disable() {
    this.enabled = false;
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onResize);
    this.unlockScroll();
    document.body.style.height = "";
  }

  setArtificialHeight() {
    document.body.style.height = `${Math.ceil((this.totalUnits + 1) * window.innerHeight)}px`;
  }

  onResize() {
    if (!this.enabled) return;
    this.setArtificialHeight();
    this.onScroll(true);
  }

  onScroll(instant = false) {
    if (!this.enabled || this.locked) return;
    const currentY = window.scrollY;
    this.scrollVelocity = Math.min(Math.abs(currentY - this.lastScrollY) / Math.max(window.innerHeight * 0.04, 1), 4);
    this.lastScrollY = currentY;

    const unit = currentY / Math.max(window.innerHeight, 1);
    let nextIndex = 0;
    for (let i = 0; i < this.starts.length; i += 1) {
      if (unit >= this.starts[i]) nextIndex = i;
    }

    const scene = scenes[nextIndex];
    const start = this.starts[nextIndex];
    const duration = scene.duration || 1;
    const localProgress = Math.max(0, Math.min(1, (unit - start) / duration));
    this.updateProgress(nextIndex, localProgress);

    if (nextIndex !== this.activeIndex) {
      this.changeScene(nextIndex, instant === true);
    }
  }

  changeScene(index, instant = false) {
    if (instant || reduceMotionQuery.matches) {
      this.activate(index, true);
      return;
    }

    this.lockScroll();
    this.signalLayer.play(
      () => this.activate(index, false),
      () => {
        this.unlockScroll();
        this.onScroll(true);
      },
    );
  }

  activate(index, instant = false) {
    this.activeIndex = index;
    activeSceneIndex = index;
    this.layers.forEach((layer, layerIndex) => {
      layer.classList.toggle("is-active", layerIndex === index);
      layer.classList.toggle("is-past", layerIndex < index);
      layer.setAttribute("aria-hidden", layerIndex === index ? "false" : "true");
    });

    $("#scene-index-current").textContent = scenes[index].number;
    $("#story-progress-bar").style.transform = `scaleX(${(index + 1) / totalScenes})`;
    this.initScene(index);

    if (instant) {
      this.layers[index]?.classList.add("has-entered");
    } else {
      window.setTimeout(() => this.layers[index]?.classList.add("has-entered"), 80);
    }
  }

  initScene(index) {
    const layer = this.layers[index];
    if (!layer) return;
    layer.querySelectorAll("[data-type-text]").forEach((item) => Typewriter.run(item));
    if (scenes[index].type === "stl") initDentalViewers("story");
  }

  updateProgress(index, progress) {
    const layer = this.layers[index];
    if (!layer) return;
    layer.style.setProperty("--p", progress.toFixed(3));
    layer.style.setProperty("--scroll-v", this.scrollVelocity.toFixed(3));
    layer.querySelectorAll("[data-step]").forEach((item) => {
      const step = Number(item.dataset.step || 0);
      item.classList.toggle("is-lit", progress >= step);
    });
  }

  lockScroll() {
    this.locked = true;
    window.addEventListener("wheel", this.preventScroll, { passive: false });
    window.addEventListener("touchmove", this.preventScroll, { passive: false });
  }

  unlockScroll() {
    this.locked = false;
    window.removeEventListener("wheel", this.preventScroll);
    window.removeEventListener("touchmove", this.preventScroll);
  }

  preventScroll(event) {
    event.preventDefault();
  }

  scrollToScene(index) {
    const safeIndex = Math.max(0, Math.min(scenes.length - 1, index));
    const top = this.starts[safeIndex] * window.innerHeight + 4;
    window.scrollTo({
      top,
      behavior: reduceMotionQuery.matches ? "auto" : "smooth",
    });
  }
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
  $$("[data-ambient-target], .ambient-video-slot").forEach((slot) => {
    slot.innerHTML = videoMarkup;
    slot.classList.add("has-video");
  });
}

function setupCursorLight() {
  window.addEventListener("pointermove", (event) => {
    pointerState.clientX = event.clientX;
    pointerState.clientY = event.clientY;
    pointerState.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointerState.y = (event.clientY / window.innerHeight) * 2 - 1;
    document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    document.documentElement.style.setProperty("--nx", pointerState.x.toFixed(3));
    document.documentElement.style.setProperty("--ny", pointerState.y.toFixed(3));
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
    storyController?.scrollToScene(activeSceneIndex + (forward ? 1 : -1));
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
    storyController?.enable();
    requestAnimationFrame(() => {
      storyController?.scrollToScene(activeSceneIndex);
      initDentalViewers("story");
    });
    return;
  }

  storyController?.disable();
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));

  if (normalized === "reader") {
    requestAnimationFrame(() => initDentalViewers("reader"));
  }
}

function runIntroLoader(initialMode) {
  const loader = $("#intro-loader");
  if (!loader) return;
  if (initialMode === "reader" || initialMode === "story" || initialMode === "present" || reduceMotionQuery.matches) {
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
      if (overlay) overlay.innerHTML = "Three.js could not load. Premium fallback remains active.";
    });
  });
}

async function setupDentalViewer(container, mode) {
  const { THREE, STLLoader, OrbitControls } = await loadThreeBundle();
  const scene = new THREE.Scene();
  const width = Math.max(container.clientWidth, 320);
  const height = Math.max(container.clientHeight, 320);
  const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 1200);
  camera.position.set(0, 38, 118);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.prepend(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);
  scene.add(new THREE.AmbientLight(0xffffff, 0.78));

  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(54, 86, 92);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x9fd7ff, 0.86);
  rim.position.set(-82, 42, -58);
  scene.add(rim);

  const scanGrid = new THREE.GridHelper(150, 24, 0xc8d1dc, 0x252a31);
  scanGrid.position.y = -26;
  scene.add(scanGrid);

  const material = new THREE.MeshStandardMaterial({
    color: 0xe2e7ec,
    metalness: 0.18,
    roughness: 0.3,
  });

  let localPointer = { x: 0, y: 0 };
  container.addEventListener("pointermove", (event) => {
    const rect = container.getBoundingClientRect();
    localPointer = {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((event.clientY - rect.top) / rect.height) * 2 - 1,
    };
  }, { passive: true });

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
            mesh.scale.setScalar(0.38);
            mesh.position.x = index === 0 ? -17 : 17;
            mesh.rotation.x = -0.08;
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
  controls.autoRotate = mode === "reader";
  controls.autoRotateSpeed = 1.0;
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
    const velocity = mode === "story" ? Math.min(storyController?.scrollVelocity || 0, 3) : 0;
    if (mode === "story") {
      group.rotation.y += 0.0035 + velocity * 0.014;
      group.rotation.x += (localPointer.y * 0.18 - group.rotation.x) * 0.035;
      group.rotation.z += (-localPointer.x * 0.12 - group.rotation.z) * 0.035;
    }
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
    const scale = 66 / maxAxis;
    group.scale.setScalar(Math.min(scale, 2));
  }
}

function createFallbackDentalModel(THREE, group, material) {
  const toothMaterial = material.clone();
  toothMaterial.color.set(0xe8edf3);
  const gumMaterial = new THREE.MeshStandardMaterial({
    color: 0x77808c,
    metalness: 0.18,
    roughness: 0.44,
    wireframe: true,
  });

  const arch = new THREE.Mesh(new THREE.TorusGeometry(28, 2.2, 12, 96, Math.PI), gumMaterial);
  arch.rotation.x = Math.PI / 2;
  arch.position.y = -8;
  group.add(arch);

  for (let i = 0; i < 14; i += 1) {
    const angle = Math.PI * (i / 13);
    const radius = 28;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius - 12;
    const tooth = new THREE.Mesh(new THREE.SphereGeometry(i === 0 || i === 13 ? 3.2 : 3.9, 24, 18), toothMaterial);
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
    overlay.innerHTML = mode === "reader" ? "Loaded dental STL files. Drag to inspect." : "Loaded dental STL files. Scroll and cursor drive rotation.";
    return;
  }
  overlay.innerHTML = [
    "Premium fallback dental scan active.",
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

  const signalLayer = new SignalLayer($("#signal-transition"));
  storyController = new MotionController($("#story-scenes"), signalLayer);
  storyController.mount();

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
