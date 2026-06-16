# Scene Content Audit

Audit date: 2026-06-16

Scope:

- Compared the current site content in `app.js` against `SCENE_PLAN.md`.
- Did not redesign visuals.
- Did not implement scene wording into the site.
- Kept the current 22-scene structure, presentation mode, reader mode, comments, and STL logic untouched.

## Overall Findings

- The site already has 22 scenes, matching the requested scene count.
- Presentation mode and reader mode already exist.
- Comments panel exists in reader mode and was not changed.
- STL viewer logic exists for scene 12 and was not changed.
- Most scene titles already match the final plan, but many presentation leads, support lines, card labels, bullets, roadmap labels, and reader paragraphs are still from an older draft.
- Several strings in `app.js` show encoding artifacts, such as `Iâ€™m`, `â€¢`, `â€œ`, and `â€`. These should become proper characters before final presentation.

## Missing Or Mismatched Content By Scene

### 1. The Future I’m Building

- Current title and subtitle match the intended meaning, but the site has encoding artifacts.
- Current small label does not match `CLE 10 — Future Plan / Personal System`.
- Current short presentation paragraph is different and should become the final line from `SCENE_PLAN.md`.
- Current reader text is an older draft and should be replaced.
- Evidence cards match the requested five cards.

### 2. Who I Am

- Current title matches.
- Current main line matches the idea, but has encoding artifacts.
- Current module names mostly match, but some small supporting labels are more stylized than the final plan.
- Current reader text is an older draft and should be replaced with the more personal Grade 10 wording.

### 3. This Started Early

- Current title matches.
- Current presentation lines mostly match, but the app combines them into one support paragraph.
- Metadata labels do not match the final plan. Current archive card says `Kindergarten Dentist Video` and `Nostalgic archive placeholder`; final plan needs File, Topic, Status, and Updated vision labels.
- Current reader text is shorter and should be replaced.

### 4. Big Question

- Current title and question match.
- Current support line is different from the final module structure.
- Current reader text is an older draft and should be replaced.
- Modules should be exactly Healthcare, Business, Creativity, Freedom.

### 5. Oral and Maxillofacial Surgery

- Current presentation text explains what OMFS is, but the final plan wants a more personal statement about the career being something Jovan can see himself building toward.
- Current bullets are diagnosis/surgery/anatomy/patient care; final plan does not request those exact bullets.
- Current reader text is an older draft and should be replaced.

### 6. Why It Fits Me

- Current presentation text focuses on focus, calm execution, pressure, and purpose.
- Final plan needs center text `Oral Surgery`, cards for Skill, Healthcare, Business, Lifestyle, Freedom, Helping People, and the line `It connects serious work with long-term options.`
- Current reader text is an older draft and should be replaced.

### 7. Healthcare, But With Ownership

- Current presentation line is close in topic but not exact.
- Final main line should be `I want a healthcare path where I can help people and still build something of my own.`
- Current bullets should change to Care, Skill, Team, Systems, Ownership, Growth.
- Current reader text is an older draft and should be replaced.

### 8. The Pathway

- Current roadmap includes a strategic first year and OMFS residency, but it does not exactly match the locked roadmap.
- Final roadmap should be: High School Science → University Prerequisites → Dental School → Licensing → Specialty Training → Oral Surgery → Practice / Ownership / Expansion.
- Side branches for General Dentistry, Other Dental Specialties, and Business / Practice Ownership are not clearly represented.
- Current reader text is an older draft and should be replaced.

### 9. Education and Training Options

- Current cards include UBC, University of Toronto, University of Manitoba, and Strategic First Year, but the Manitoba label does not include `/ OMFS Pathway`.
- Current main note does not match the final wording about UBC being preferred and choosing the smartest path.
- Current reader text is an older draft and should be replaced, including the family connections in Vancouver, Toronto, and Winnipeg.

### 10. The Business Side of Dentistry

- Current presentation text says a practice is an operating system; final plan wants the more personal business-scaling line.
- Current cards differ from the final card list.
- Growth path is not included in the exact final sequence.
- Current reader text is an older draft and should be replaced.

### 11. What a Practice Actually Looks Like

- Current main line is close but not exact.
- Current practice pieces include consult, imaging, treatment, sterilization, front desk, and software; final plan needs Front desk, Scheduling, Hygienists, Assistants, Patients, Equipment, X-rays, Decisions, Dentist moving between rooms.
- Current reader text is an older draft and should be replaced.

### 12. Technology in Dentistry

- Current presentation text is more general and says the STL viewer is a placeholder.
- Final presentation text should focus on a physical scan becoming a digital model and making dentistry feel modern/technical.
- Current reader text is an older draft and should be replaced.
- Optional personal note about scanning his little brother’s teeth is not currently included.
- STL paths match the final plan and should be kept.

### 13. Practice Expansion

- Current presentation text focuses on stronger systems.
- Final plan needs `A practice can grow into something bigger than one office.`
- Cards should be Planning, Investment, Equipment, Growth, Opportunity.
- Final line `A career can become a platform for building other things.` is missing.
- Current reader text is an older draft and should be replaced.

### 14. Business Is a Skill Too

- Current main line is more abstract than the final version.
- Final plan needs side-project wording: `Even when a side project does not become huge, the skills still stay with you.`
- Cards should be Build, Test, Learn, Wrap Up, Apply Later.
- Final line `The project might end, but the skill does not.` is missing.
- Current reader text is an older draft and should be replaced.

### 15. Music Production

- Current presentation text is close in theme but not exact.
- Final plan needs `Producing is creative, but it is also technical.`
- Skill list should be Sound selection, Arrangement, Rhythm, Mixing, Collaboration, Taste, Practice.
- Extra line `You need to be good at a lot of things to be a producer.` is missing.
- Optional personal note about his uncle is not currently included.
- Current reader text is an older draft and should be replaced.

### 16. Waiting for the Right Moment

- Current quote has encoding artifacts.
- Final line `That applies to more than photography.` is missing.
- Current reader text is an older draft and should be replaced.
- Personal detail about Japan photos, Ueno, cherry blossoms, and the empty busy-place idea is not currently included.

### 17. Opportunity Is a Resource

- Current presentation text combines the AI idea into one sentence and adds a black/silver design detail that is not in the final plan.
- Final plan needs three separate presentation lines and the final line `Doing everything alone is not automatically better.`
- Modules should be Ideas, Research, Organization, Building, Testing, Decisions.
- Current reader text is an older draft and should be replaced.

### 18. Skill Opens Doors, People Show You Where They Are

- Current title matches.
- Current quote/support text is different.
- Final quote should be exactly: `Skill matters, but people matter too. Connections do not replace skill — they create opportunities for skill.`
- Areas should be Dentistry / Oral Surgery, Business, Music, Learning from people ahead.
- Current reader text is an older draft and should be replaced.

### 19. Skills I’m Building

- Current title has encoding artifacts.
- Current lead/support focus on grades, discipline, and financial literacy.
- Final plan needs center text `The Future I’m Building` and skill wheel items: Business Thinking, Creativity, Technical Skill, Long-Term Planning, Adaptability, Initiative.
- Current reader text is an older draft and should be replaced.

### 20. Making It Work Without Giving Things Up

- Current main line is close, but it uses a contraction in the app and final plan uses `do not`.
- Current bullets are Healthcare, Business, Creativity, Freedom; final plan needs categories Career, Business, Creativity, Experience and cards Oral Surgery, Business, Music, Tech, Photography, Lifeguarding / Work, School.
- Final line about not doing everything randomly is missing from presentation mode.
- Current reader text is an older draft and should be replaced.

### 21. The Next Version of the Plan

- Current presentation text is shorter and more general.
- Final roadmap should be Now → Post-secondary → Dental path → Oral surgery → Practice / business → Keep creating.
- Required details about science/grades, shadowing oral surgeons, side projects, music sessions, photography, lifeguarding/work experience, earning money/responsibility, and eventually scaling a practice are not fully included.
- Current reader text is an older draft and should be replaced.

### 22. Sources

- Current ending line is used as the lead, and `Website built by Jovan Pahal.` appears as support/built note.
- Final source cards are missing `Assignment` and `Personal experience`.
- Current reader text is an older draft focused on checking official pages; final plan wants a source summary including assignment instructions, official dental education sources, career research, and personal experience.

## Implementation Notes For Later

- Most updates will happen inside the `slides`, `readerDetails`, `sourceCards`, and feature-rendering data in `app.js`.
- Some visual layouts already exist but do not expose all final content fields, so implementing the locked plan later may require small content-structure updates, not a redesign.
- Before frontend redesign, fix the encoding artifacts so the presentation reads cleanly.
