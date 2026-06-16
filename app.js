const totalSlides = 22;

const landingAssets = [
  {
    title: "Kindergarten Still",
    detail: "Early clue: wanting to be a dentist",
    path: "assets/photos/kindergarten-still.jpg",
  },
  {
    title: "Japan Photo",
    detail: "Photography, timing, and noticing moments",
    path: "assets/photos/japan-photo.jpg",
  },
  {
    title: "Ableton Screenshot",
    detail: "Music production and technical creativity",
    path: "assets/screenshots/ableton-session.jpg",
  },
  {
    title: "GitHub / Project Screenshot",
    detail: "Technology, systems, and building projects",
    path: "assets/screenshots/github-project.jpg",
  },
  {
    title: "Little Me + Dad",
    detail: "Family connection to dental practice ownership",
    path: "assets/photos/dad-opening-day-practice.jpg",
  },
];

const liveImageAssets = new Set([
  // Add image paths here after the real files exist, for example:
  // "assets/photos/japan-photo.jpg",
]);

const loadDentalStlFiles = false;

const originInterests = [
  ["Healthcare / Science", "oral surgery"],
  ["Business / Money", "ownership and growth"],
  ["Music Production", "creative technical work"],
  ["Technology / Systems", "tools for building"],
  ["Photography / Visual Creativity", "timing and visual taste"],
  ["Long-Term Goals / Freedom", "options and improvement"],
];

const bigQuestionParts = ["Healthcare", "Business", "Creativity", "Freedom"];

const futureServiceTiles = [
  ["Healthcare / Science", "Oral surgery", "Science, skill, and patient care."],
  ["Business / Money", "Ownership", "Building and growing something real."],
  ["Music Production", "Creativity", "Sound, taste, rhythm, and practice."],
  ["Technology / Systems", "Tools", "Research, organization, and building faster."],
  ["Photography / Visual Creativity", "Seeing", "Timing, detail, and creative choices."],
  ["Long-Term Goals / Freedom", "Options", "More control over the life I work toward."],
];

const originProofStats = [
  ["05", "personal evidence cards"],
  ["06", "connected interests"],
  ["01", "future question"],
  ["CLE 10", "Future Plan / Personal System"],
];

const chapters = [
  { id: "origin", number: "Chapter 1", title: "Origin" },
  { id: "oral-surgery", number: "Chapter 2", title: "Oral Surgery" },
  { id: "ownership", number: "Chapter 3", title: "Ownership" },
  { id: "creativity", number: "Chapter 4", title: "Creativity + Building" },
  { id: "reflection", number: "Chapter 5", title: "Reflection + Next Version" },
];

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
    detail: "Early dentistry interest, family exposure to practice ownership, creative projects, music, photography, and technology work.",
  },
];

const slides = [
  {
    number: "01",
    chapter: "origin",
    title: "The Future I’m Building",
    lead: "Oral Surgery • Business • Creativity",
    support: "A future built around healthcare, ownership, creativity, technology, and freedom.",
    reader: "This project is about the future I can actually see myself building toward. It is not just one career idea. It brings together oral surgery, business, creativity, technology, and the kind of freedom I want later in life. I want a future where the things I care about do not compete with each other, but support each other.",
    layout: "title-assets",
    feature: { type: "asset-grid", assets: landingAssets },
  },
  {
    number: "02",
    chapter: "origin",
    title: "Who I Am",
    lead: "I want a future where I don’t have to give up one side of myself to build another.",
    support: "Healthcare, business, music, technology, creativity, and freedom all connect.",
    reader: "I have a lot of interests, but they are not random separate things. Healthcare and science point toward oral surgery. Business connects to ownership and growth. Music, photography, and technology connect to creativity and making things. My long-term goals pull everything together because I care about freedom, options, and being able to keep improving my life.",
    layout: "identity-orbit",
    feature: { type: "identity-orbit" },
  },
  {
    number: "03",
    chapter: "origin",
    title: "This Started Early",
    lead: "This started earlier than this project.",
    support: "Kindergarten: I wanted to be a dentist. The idea stayed the same. The vision got bigger.",
    reader: "One of the biggest reasons this path feels real to me is that it started early. In kindergarten, I already said I wanted to be a dentist. At that time, I obviously did not understand the full career path, the business side, or specialty options. But the basic idea stayed with me. Now the vision is bigger: oral surgery, ownership, technology, and building something long-term.",
    layout: "archive",
    feature: {
      type: "archive",
      title: "Kindergarten Career Video",
      detail: "Topic: Future career • Status: Original clue • Updated vision: Oral surgery + ownership",
      path: "assets/photos/kindergarten-dentist-video-still.jpg",
    },
  },
  {
    number: "04",
    chapter: "origin",
    title: "Big Question",
    lead: "How can I build a future that combines healthcare, business, creativity, and freedom?",
    support: "Healthcare, business, creativity, and freedom are the parts I want to connect.",
    reader: "The big question for this project is how I can build a future that combines the main things I care about. I do not want a career that only checks one box. I want something that uses science and skill, but also gives me the chance to build, own, create, and keep improving.",
    layout: "question",
  },
  {
    number: "05",
    chapter: "oral-surgery",
    title: "Oral and Maxillofacial Surgery",
    lead: "Oral and maxillofacial surgery is the career I can actually see myself building toward.",
    support: "It is serious, skilled, and still connects to business and ownership.",
    reader: "Oral and maxillofacial surgery is the career path I am most interested in. It combines healthcare, science, precision, responsibility, and advanced training. It also connects to business because dental professionals can eventually work toward ownership, practice growth, and building a team. That combination makes it feel like a path that fits more than one side of me.",
  },
  {
    number: "06",
    chapter: "oral-surgery",
    title: "Why It Fits Me",
    lead: "Oral Surgery",
    support: "It connects serious work with long-term options.",
    reader: "Oral surgery fits me because it is not only one thing. It requires skill and discipline, it is connected to healthcare, and it can lead to ownership and business opportunities. It also creates long-term options. For me, freedom does not just mean money. It means having choices, being able to build things, and having more control over the life I work toward.",
    bullets: ["Skill", "Healthcare", "Business", "Lifestyle", "Freedom", "Helping People"],
  },
  {
    number: "07",
    chapter: "oral-surgery",
    title: "Healthcare, But With Ownership",
    lead: "I want a healthcare path where I can help people and still build something of my own.",
    support: "A practice can be care, skill, team, systems, ownership, and growth.",
    reader: "I like healthcare, but I also like the idea of building something. Dentistry and oral surgery are interesting because they can involve both. A practice is not just a place where treatment happens. It is also a team, a system, a patient experience, and a business. That makes the path feel more flexible than a career where I only do one kind of work.",
    bullets: ["Care", "Skill", "Team", "Systems", "Ownership", "Growth"],
  },
  {
    number: "08",
    chapter: "oral-surgery",
    title: "The Pathway",
    lead: "The path is long, but it can be broken into stages.",
    support: "Science, prerequisites, dental school, licensing, specialty training, oral surgery, ownership.",
    reader: "The path to oral surgery is long, but it can be broken into stages. First, I need to focus on high school science and strong grades. Then I need university prerequisites, dental school, licensing, and specialty training. The main path leads toward oral surgery, but there are also related dental paths and business options along the way.",
    layout: "roadmap",
    feature: { type: "roadmap" },
  },
  {
    number: "09",
    chapter: "oral-surgery",
    title: "Education and Training Options",
    lead: "UBC is my preferred path, but the smartest path is the one that builds the strongest momentum.",
    support: "UBC, Toronto, Manitoba / OMFS Pathway, and a strategic first year are all worth comparing.",
    reader: "There are multiple education options that could lead toward dentistry and eventually oral surgery. UBC is my preferred option because it is closer to home and feels like the strongest fit. Toronto and Manitoba are also important to consider because they connect to dental education and specialty pathways. A strategic first year at a smaller or local school could also make sense if it helps me build stronger grades, confidence, and momentum before transferring or applying later. I also have family connections in Vancouver, Toronto, and Winnipeg, which makes those cities easier to imagine as real options.",
    layout: "schools",
    feature: { type: "schools" },
  },
  {
    number: "10",
    chapter: "ownership",
    title: "The Business Side of Dentistry",
    lead: "I don’t just like the career. I like the idea of building and scaling the business behind it.",
    support: "One practice → stronger systems → more rooms → better team → another location → future expansion.",
    reader: "The business side of dentistry is interesting because a practice is more than one dentist working alone. It involves a team, systems, equipment, reputation, patient experience, and growth. If those pieces are managed well, a practice can become stronger over time. That connects to my interest in ownership because I like the idea of building something that can grow.",
    bullets: ["Team", "Systems", "Equipment", "Reputation", "Patient Experience", "Growth"],
  },
  {
    number: "11",
    chapter: "ownership",
    title: "What a Practice Actually Looks Like",
    lead: "From the outside, a dental practice can look simple. Behind the scenes, it is a whole system.",
    support: "Front desk, scheduling, hygienists, assistants, patients, equipment, X-rays, decisions.",
    reader: "When people think of a dental office, they might only think of the dentist and the patient. But behind the scenes, there are many moving parts. There is front desk work, scheduling, hygienists, assistants, patients, equipment, X-rays, and constant decisions. Watching that system makes me realize that a practice is both healthcare and operations.",
    layout: "practice",
    feature: { type: "practice" },
  },
  {
    number: "12",
    chapter: "ownership",
    title: "Technology in Dentistry",
    lead: "A physical scan can become a digital model.",
    support: "This made dentistry feel modern, technical, and connected to how I already think.",
    reader: "Technology is a big part of modern dentistry. A physical scan can become a digital model that can be viewed, rotated, and used for planning. Seeing dental scans made dentistry feel connected to technology and systems, not just traditional healthcare. It connects to the way I already like working with digital tools.",
    layout: "stl",
    feature: { type: "stl" },
  },
  {
    number: "13",
    chapter: "ownership",
    title: "Practice Expansion",
    lead: "A practice can grow into something bigger than one office.",
    support: "A career can become a starting point for building other things.",
    reader: "One thing that interests me is how a dental career can become a starting point for bigger projects. A practice can grow through planning, investment, equipment, and team building. Over time, that can create opportunities beyond one office. This connects to the kind of future I want because I like the idea of building something that can keep improving.",
    bullets: ["Planning", "Investment", "Equipment", "Growth", "Opportunity"],
  },
  {
    number: "14",
    chapter: "creativity",
    title: "Business Is a Skill Too",
    lead: "Even when a side project does not become huge, the skills still stay with you.",
    support: "The project might end, but the skill does not.",
    reader: "I have tried different projects and business ideas, and not every project needs to become huge to matter. Even if a project ends, I still learn how to build, test, organize, solve problems, and use tools. Those skills can transfer into future businesses, school projects, websites, and even practice ownership later.",
    bullets: ["Build", "Test", "Learn", "Wrap Up", "Apply Later"],
  },
  {
    number: "15",
    chapter: "creativity",
    title: "Music Production",
    lead: "Producing is creative, but it is also technical.",
    support: "You need to be good at a lot of things to be a producer.",
    reader: "Music production is one of the clearest examples of creativity and technical skill coming together. It is not just making something sound cool. It involves sound selection, arrangement, rhythm, mixing, collaboration, taste, and practice. Producing has taught me that creative work still requires systems and discipline.",
    bullets: ["Sound selection", "Arrangement", "Rhythm", "Mixing", "Collaboration", "Taste", "Practice"],
    feature: {
      type: "asset-grid",
      assets: [
        {
          title: "Ableton Screenshot",
          detail: "Music production workspace",
          path: "assets/screenshots/ableton-session.jpg",
        },
        {
          title: "Music Production Notes",
          detail: "Sound selection, arrangement, mixing, and practice",
          path: "assets/screenshots/music-production-notes.jpg",
        },
      ],
    },
  },
  {
    number: "16",
    chapter: "creativity",
    title: "Waiting for the Right Moment",
    lead: "You can always delete a bad picture, but you can’t go back and take one you never tried to get.",
    support: "That applies to more than photography.",
    reader: "Photography has taught me about timing. Sometimes the best photo comes from waiting, noticing, and taking the chance when it appears. You can delete a bad picture, but you cannot go back and take one you never tried to get. That idea applies to more than photography. It applies to school, opportunities, business, creativity, and the future.",
    layout: "photo-quote",
    feature: { type: "photo-quote" },
  },
  {
    number: "17",
    chapter: "creativity",
    title: "Opportunity Is a Resource",
    lead: "AI does not replace my thinking. It helps me move faster, and I still make the decisions.",
    support: "Doing everything alone is not automatically better.",
    reader: "One thing I have realized is that opportunity is a resource. Tools, people, timing, and access can help ideas move faster. AI does not replace my thinking, but it can help with research, organizing ideas, building, and testing. I still make the decisions. To me, using tools well is part of learning how to work smarter.",
    bullets: ["Ideas", "Research", "Organization", "Building", "Testing", "Decisions"],
  },
  {
    number: "18",
    chapter: "creativity",
    title: "Skill Opens Doors, People Show You Where They Are",
    lead: "Connections do not replace skill. They create opportunities to use it.",
    support: "Dentistry / oral surgery, business, music, and learning from people ahead.",
    reader: "Skill matters most, but people matter too. Connections do not replace skill. They create opportunities for skill to be seen and used. In dentistry and oral surgery, it would help to meet people already in the field. In business, it helps to learn from people who have built something. In music, connections can lead to sessions, but only if the skill is there.",
    bullets: ["Dentistry / Oral Surgery", "Business", "Music", "Learning from people ahead"],
  },
  {
    number: "19",
    chapter: "reflection",
    title: "Skills I’m Building",
    lead: "The Future I’m Building.",
    support: "Business thinking, creativity, technical skill, long-term planning, adaptability, and initiative.",
    reader: "The skills I am building are not only for one job. Business thinking helps with ownership and decision-making. Creativity helps with music, photography, and problem solving. Technical skill helps with tools and technology. Long-term planning helps me stay focused. Adaptability helps when plans change. Initiative matters because nothing happens unless I actually start.",
    layout: "skills",
    feature: { type: "skills" },
  },
  {
    number: "20",
    chapter: "reflection",
    title: "Making It Work Without Giving Things Up",
    lead: "I do not want to give up one side of myself to build another.",
    support: "The goal is to make each part support the future I’m building.",
    reader: "The main idea I keep coming back to is that I do not want to give up one side of myself to build another. I want career, business, creativity, and experience to support each other. The goal is not to do everything randomly. The goal is to build a future where the different parts connect and make each other stronger.",
    bullets: ["Oral Surgery", "Business", "Music", "Tech", "Photography", "Lifeguarding / Work", "School"],
  },
  {
    number: "21",
    chapter: "reflection",
    title: "The Next Version of the Plan",
    lead: "Now → Post-secondary → Dental path → Oral surgery → Practice / business → Keep creating.",
    support: "Next: school, shadowing, projects, work experience, and building toward a practice.",
    reader: "The next version of the plan is to keep building in steps. Right now, that means focusing on school, science, grades, work experience, and projects. After high school, it means choosing a strong post-secondary path, completing the prerequisites for dentistry, and learning more about oral surgery by meeting or shadowing people in the field. Long-term, the goal is oral surgery, practice ownership, business growth, and still keeping creativity in my life.",
    bullets: ["Science / grades", "Meet or shadow oral surgeons", "Business / tech side projects", "Music sessions in university", "Photography / creative work", "Lifeguarding / work experience", "Earning money / responsibility", "Build and scale a practice"],
  },
  {
    number: "22",
    chapter: "reflection",
    title: "Sources",
    lead: "This is the direction I’m building toward, but I’m open to the plan getting better as I learn more.",
    support: "Website built by Jovan Pahal.",
    reader: "This project used a combination of assignment instructions, official dental education sources, career research, and personal experience. Personal experience includes my early interest in dentistry, family exposure to dental practice ownership, creative projects, music production, photography, and technology projects.",
    layout: "sources",
    feature: { type: "sources" },
  },
];

const readerDetails = {
  "12": "I scanned my little brother’s teeth, which made the technology feel more real instead of just something I read about.",
  "15": "My uncle helped get me into music production, and if I keep improving, that could lead to real sessions and opportunities later.",
  "16": "The Japan photos, especially the Ueno / cherry blossom / empty busy-place idea, connect to this because they show how a real moment can disappear if I do not try to capture it.",
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

function renderMediaFragment(asset, className = "") {
  const isLiveAsset = liveImageAssets.has(asset.path);
  const assetState = isLiveAsset ? "loaded" : "missing";
  const assetStyle = isLiveAsset ? ` style="--asset-image: url('${asset.path.replaceAll("'", "%27")}')"` : "";
  return `
    <figure class="media-fragment ${className}" data-path="${escapeHtml(asset.path)}" data-asset-state="${assetState}"${assetStyle}>
      <div class="media-surface">
        <span class="asset-route">Replace with ${escapeHtml(asset.path)}</span>
        <strong>${escapeHtml(asset.title)}</strong>
      </div>
      <figcaption>
        <span>${escapeHtml(asset.detail)}</span>
      </figcaption>
    </figure>
  `;
}

function renderMediaConstellation(assets, scope = "") {
  return `
    <div class="media-constellation ${scope}">
      ${assets.map((asset, index) => renderMediaFragment(asset, `media-fragment-${index + 1}`)).join("")}
    </div>
  `;
}

function renderEvidenceOrb(asset, index) {
  const isLiveAsset = liveImageAssets.has(asset.path);
  const assetState = isLiveAsset ? "loaded" : "missing";
  const assetStyle = isLiveAsset ? ` style="--asset-image: url('${asset.path.replaceAll("'", "%27")}')"` : "";
  return `
    <figure class="evidence-orb evidence-orb-${index + 1}" data-path="${escapeHtml(asset.path)}" data-asset-state="${assetState}"${assetStyle}>
      <div class="orb-line" aria-hidden="true"></div>
      <div class="orb-planet">
        <span class="orb-shine" aria-hidden="true"></span>
        <strong>${String(index + 1).padStart(2, "0")}</strong>
      </div>
      <figcaption>
        <span>${escapeHtml(asset.title)}</span>
        <small>${escapeHtml(asset.detail)}</small>
        <em>Replace with ${escapeHtml(asset.path)}</em>
      </figcaption>
    </figure>
  `;
}

function renderEvidenceOrbit(assets, scope = "") {
  return `
    <div class="evidence-orbit ${scope}">
      <div class="orbit-crosshair" aria-hidden="true"></div>
      <div class="orbit-core">
        <span>Project proof</span>
        <strong>Personal evidence, not random interests.</strong>
      </div>
      ${assets.map(renderEvidenceOrb).join("")}
    </div>
  `;
}

function renderServiceSystem() {
  return `
    <div class="service-system">
      ${futureServiceTiles.map(([title, label, detail], index) => `
        <div class="service-tile service-tile-${index + 1}">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${title}</strong>
          <small>${label}</small>
          <p>${detail}</p>
        </div>
      `).join("")}
    </div>
  `;
}

function renderProofStats() {
  return `
    <div class="proof-stats">
      ${originProofStats.map(([value, label]) => `
        <div><strong>${value}</strong><span>${label}</span></div>
      `).join("")}
    </div>
  `;
}

function renderLandingAssets() {
  $("#landing-assets").innerHTML = `
    ${renderEvidenceOrbit(landingAssets, "landing-evidence-orbit")}
    ${renderProofStats()}
  `;
}

function chapterFor(slide) {
  return chapters.find((chapter) => chapter.id === slide.chapter);
}

function renderFeature(feature, mode) {
  if (!feature) {
    return "";
  }

  if (feature.type === "asset-grid") {
    const five = feature.assets.length === 5 ? " five" : "";
    return `<div class="asset-grid${five}">${feature.assets.map((asset) => renderAsset(asset)).join("")}</div>`;
  }

  if (feature.type === "identity-orbit") {
    return renderIdentityOrbit(mode);
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
      ["High School Science", "Focus on science and strong grades."],
      ["University Prerequisites", "Build the courses needed for dentistry."],
      ["Dental School", "Train for the dental path."],
      ["Licensing", "Meet the requirements to practice."],
      ["Specialty Training", "Move toward oral surgery."],
      ["Oral Surgery", "Build advanced skill and responsibility."],
      ["Practice / Ownership / Expansion", "Use the career as a platform for growth."],
      ["General Dentistry", "Related dental path."],
      ["Other Dental Specialties", "Other specialty options."],
      ["Business / Practice Ownership", "Ownership path connected to dentistry."],
    ];
    return `<div class="roadmap">${nodes.map(([title, detail], index) => `
      <div class="${index >= 7 ? "road-branch" : "road-node"}">
        <strong>${title}</strong><span>${detail}</span>
      </div>`).join("")}</div>`;
  }

  if (feature.type === "schools") {
    const schools = [
      ["UBC", "Preferred path because it is closer to home and feels like the strongest fit."],
      ["University of Toronto", "Important dental education option to compare."],
      ["University of Manitoba / OMFS Pathway", "Important dentistry and specialty pathway option to consider."],
      ["Strategic First Year", "A smaller or local school could help build grades, confidence, and momentum."],
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
      ["Front desk", "First contact and patient flow"],
      ["Scheduling", "Time, rooms, and team coordination"],
      ["Hygienists", "Preventive care and patient support"],
      ["Assistants", "Clinical support and room flow"],
      ["Patients", "Care, trust, and communication"],
      ["Equipment", "Tools that keep treatment moving"],
      ["X-rays", "Imaging and planning information"],
      ["Decisions", "Constant choices behind the scenes"],
      ["Dentist moving between rooms", "The practice works as one system"],
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
          detail: "Ueno / cherry blossom / empty busy-place moment",
          path: "assets/photos/japan-photo.jpg",
        })}
        <blockquote>“You can always delete a bad picture, but you can’t go back and take one you never tried to get.”</blockquote>
      </div>
    `;
  }

  if (feature.type === "skills") {
    const skills = ["Business Thinking", "Creativity", "Technical Skill", "Long-Term Planning", "Adaptability", "Initiative"];
    return `<div class="skills-grid">${skills.map((skill) => `<div class="skill-token">${skill}</div>`).join("")}</div>`;
  }

  if (feature.type === "sources") {
    return `
      <div class="source-grid">${sourceCards.map((source) => `
        ${source.url ? `<a class="source-card" href="${source.url}" target="_blank" rel="noreferrer">` : `<div class="source-card">`}
          <strong>${source.title}</strong>
          <span>${source.detail}</span>
        ${source.url ? `</a>` : `</div>`}
      `).join("")}</div>
      <p class="built-note">Website built by Jovan Pahal.</p>
    `;
  }

  return "";
}

function renderIdentityOrbit(mode = "present") {
  return `
    <div class="identity-orbit ${mode === "reader" ? "identity-orbit-reader" : ""}">
      <div class="orbit-statement">
        <span>Core reflection</span>
        <strong>I want a future where I don’t have to give up one side of myself to build another.</strong>
      </div>
      <div class="orbit-lines" aria-hidden="true"></div>
      ${originInterests.map(([title, detail], index) => `
        <div class="orbit-item orbit-item-${index + 1}">
          <span>${title}</span>
          <small>${detail}</small>
        </div>
      `).join("")}
    </div>
  `;
}

function renderBullets(slide) {
  if (!slide.bullets) return "";
  return `<div class="mini-list">${slide.bullets.map((item) => `<span class="fragment">${escapeHtml(item)}</span>`).join("")}</div>`;
}

function layoutClass(slide) {
  if (Number(slide.number) <= 4) return `chapter-one-layout chapter-one-${slide.number}`;
  if (slide.layout === "title-assets") return "title-layout";
  if (slide.layout === "question") return "compact-layout";
  return "";
}

function renderChapterOneSlide(slide, chapter, index) {
  if (slide.number === "01") {
    return `
      <section data-slide-number="${slide.number}" data-chapter="${slide.chapter}">
        <div class="chapter-scene up-scene up-hero-section">
          <div class="up-stars" aria-hidden="true"></div>
          <div class="up-section-nav">
            <span>futurebuild.</span>
            <span>${chapter.number} / ${String(index + 1).padStart(2, "0")}</span>
            <span>Reader Mode</span>
          </div>
          <div class="up-hero-copy">
            <p class="up-kicker"><span></span>CLE 10 — Future Plan / Personal System</p>
            <h2>
              <span class="outline">The Future</span>
              <span class="chrome">I’m Building</span>
            </h2>
            <p class="lead fragment">${slide.support}</p>
            <div class="up-cta-row fragment">
              <span>Oral Surgery</span>
              <span>Business</span>
              <span>Creativity</span>
            </div>
          </div>
          ${renderEvidenceOrbit(landingAssets, "scene-evidence-orbit")}
          <span class="slide-number-tag">${String(index + 1).padStart(2, "0")} / ${totalSlides}</span>
        </div>
      </section>
    `;
  }

  if (slide.number === "02") {
    return `
      <section data-slide-number="${slide.number}" data-chapter="${slide.chapter}">
        <div class="chapter-scene up-scene up-services-section">
          <div class="up-section-nav dark">
            <span>futurebuild.</span>
            <span>${chapter.number} / ${String(index + 1).padStart(2, "0")}</span>
            <span>Skill system</span>
          </div>
          <div class="services-copy">
            <p class="up-kicker dark"><span></span>Who I Am</p>
            <h2><span>Who I</span> <span class="outline-dark">Am</span></h2>
            <p class="support fragment">${slide.lead}</p>
          </div>
          ${renderServiceSystem()}
          <div class="services-bottom fragment">
            <span>Healthcare</span>
            <span>Ownership</span>
            <span>Tools</span>
            <span>Freedom</span>
          </div>
          <span class="slide-number-tag dark">${String(index + 1).padStart(2, "0")} / ${totalSlides}</span>
        </div>
      </section>
    `;
  }

  if (slide.number === "03") {
    return `
      <section data-slide-number="${slide.number}" data-chapter="${slide.chapter}">
        <div class="chapter-scene up-scene up-archive-section">
          <div class="up-section-nav dark">
            <span>futurebuild.</span>
            <span>${chapter.number} / ${String(index + 1).padStart(2, "0")}</span>
            <span>Origin proof</span>
          </div>
          <div class="archive-head">
            <p class="up-kicker dark"><span></span>Archive / Kindergarten</p>
            <h2><span>This Started</span> <span class="outline-dark">Early</span></h2>
            <p class="support fragment">Kindergarten: I wanted to be a dentist.</p>
          </div>
          <div class="archive-proof">
            <div class="memory-file-top">
              <span>REC 00:00:14</span>
              <span>ARCHIVE / DENTIST</span>
            </div>
            ${renderMediaFragment({
              title: "Kindergarten Career Video",
              detail: "File: Kindergarten Career Video • Topic: Future career",
              path: "assets/photos/kindergarten-dentist-video-still.jpg",
            }, "archive-media-fragment")}
            <div class="memory-file-bottom">
              <span>STATUS: ORIGINAL CLUE</span>
              <span>UPDATED VISION: ORAL SURGERY + OWNERSHIP</span>
            </div>
          </div>
          <p class="archive-close fragment">The idea stayed the same. The vision got bigger.</p>
          <span class="slide-number-tag">${String(index + 1).padStart(2, "0")} / ${totalSlides}</span>
        </div>
      </section>
    `;
  }

  return `
    <section data-slide-number="${slide.number}" data-chapter="${slide.chapter}">
      <div class="chapter-scene up-scene up-reveal-section">
        <div class="up-stars" aria-hidden="true"></div>
        <div class="up-section-nav">
          <span>futurebuild.</span>
          <span>${chapter.number} / ${String(index + 1).padStart(2, "0")}</span>
          <span>Future reveal</span>
        </div>
        <div class="future-nodes">
          ${bigQuestionParts.map((part, partIndex) => `<span class="future-node future-node-${partIndex + 1} fragment">${part}</span>`).join(" ")}
        </div>
        <div class="future-question">
          <p class="up-kicker"><span></span>Big Question</p>
          <h2>${slide.lead}</h2>
          <p class="support fragment">${slide.support}</p>
          <div class="future-launch fragment">Healthcare • Business • Creativity • Freedom</div>
        </div>
        <span class="slide-number-tag">${String(index + 1).padStart(2, "0")} / ${totalSlides}</span>
      </div>
    </section>
  `;
}

function renderPresentationSlides() {
  $("#presentation-slides").innerHTML = slides.map((slide, index) => {
    const chapter = chapterFor(slide);
    const feature = slide.feature || (slide.layout === "question" ? null : undefined);
    if (Number(slide.number) <= 4) return renderChapterOneSlide(slide, chapter, index);
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
      <article class="reader-card ${Number(slide.number) <= 4 ? `reader-origin-card reader-origin-${slide.number}` : ""}" id="${isFirstInChapter ? `chapter-${chapter.id}` : `reader-slide-${slide.number}`}">
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
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.gsap.killTweensOf(".evidence-orb");
  window.gsap.fromTo(".landing-nav, .landing-copy > *", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.72, stagger: 0.06, ease: "power3.out" });
  window.gsap.fromTo(".landing-screen .evidence-orb, .landing-screen .orbit-core", { y: 34, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.07, ease: "power3.out" });
  window.gsap.to(".landing-screen .evidence-orb", { y: -10, duration: 4.8, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.24 });
}

function animateActiveSlide() {
  if (!window.gsap || !window.Reveal) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const current = window.Reveal.getCurrentSlide();
  if (!current) return;
  if ($(".chapter-scene", current)) {
    window.gsap.fromTo($$(".chapter-scene .up-section-nav, .chapter-scene .up-kicker, .chapter-scene h2:not(.fragment), .chapter-scene .evidence-orb, .chapter-scene .orbit-core, .chapter-scene .service-tile, .chapter-scene .archive-proof", current), { y: 24, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.62, stagger: 0.045, ease: "power2.out" });
    return;
  }
  window.gsap.fromTo($$(".slide-copy > *:not(.fragment), .feature-panel", current), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.05, ease: "power2.out" });
}

function animateFragment(event) {
  if (!window.gsap || !event?.fragment) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.gsap.fromTo(event.fragment, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
}

function animateReaderCards() {
  if (!window.gsap) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.gsap.fromTo(".reader-card", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.03, ease: "power2.out" });
}

function runIntroLoader(initialMode) {
  const loader = $("#intro-loader");
  if (!loader) return;
  const shouldSkip = initialMode === "reader" || initialMode === "present" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (shouldSkip || !window.gsap) {
    loader.hidden = true;
    return;
  }

  window.gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: () => {
      loader.hidden = true;
    },
  })
    .fromTo(".loader-word span", { yPercent: 115 }, { yPercent: 0, duration: 0.55 })
    .fromTo(".loader-kicker", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35 }, 0)
    .to(".loader-meter span", { scaleX: 1, duration: 0.72 }, 0.08)
    .to(loader, { yPercent: -101, duration: 0.58 }, 0.92);
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
  runIntroLoader(params.get("mode"));
}

init();

