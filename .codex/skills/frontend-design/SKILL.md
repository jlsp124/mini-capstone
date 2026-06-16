---
name: frontend-design
description: Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Use for /frontenddesign requests, frontend design direction, UI visual identity, aesthetic planning, typography, palette selection, layout critique, or making interfaces feel less templated.
---

# Frontend Design

Approach this as the design lead at a small studio known for giving every client a visual identity that could not be mistaken for anyone else's. The client has already rejected proposals that felt templated, and is paying for a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take one real aesthetic risk you can justify.

## Ground It In The Subject

If the brief does not pin down what the product or subject is, pin it yourself before designing: name one concrete subject, its audience, and the page's single job, and state your choice. If there is any memory about the user's preferences, context about what they are building, or designs made before, use that as a hint.

The subject's own world, its materials, instruments, artifacts, and vernacular, is where distinctive choices come from. Build with the brief's real content and subject matter throughout.

## Design Principles

For web designs, the hero is a thesis. Open with the most characteristic thing in the subject's world, in whatever form makes sense for it: a headline, an image, an animation, a live demo, or an interactive moment. Be deliberate with the choice. A big number with a small label, supporting stats, and a gradient accent is the template answer; use it only if that is truly the best option.

Typography carries the personality of the page. Pair the display and body faces deliberately, not the same families you would reach for on any other project, and set a clear type scale with intentional weights, widths, and spacing. Make the type treatment itself a memorable part of the design, not a neutral delivery vehicle for the content.

Structure is information. Structural devices, numbering, eyebrows, dividers, and labels should encode something true about the content, not decorate it. Numbered markers are only appropriate if the content actually is a sequence, like a real process or timeline where order carries information the reader needs.

Leverage motion deliberately. Think about where animation can serve the subject: a page-load sequence, a scroll-triggered reveal, hover micro-interactions, or ambient atmosphere. An orchestrated moment usually lands harder than scattered effects. Sometimes less is more, and extra animation can make the design feel AI-generated.

Match complexity to the vision. Maximalist directions need elaborate execution; minimal directions need precision in spacing, type, and detail. Elegance is executing the chosen vision well.

Consider written content carefully. If a design brief does not contain real content, create copy with the same care as the visual system. Copy can make a design feel as templated as the design itself.

## Process

Work in two passes.

First, brainstorm a short design plan based on the user's design brief:

- Color: create a compact palette of 4-6 named hex values.
- Type: choose typefaces for at least two roles, such as a characterful display face used with restraint, a complementary body face, and a utility face for captions or data if needed.
- Layout: define the layout concept with concise prose and ASCII wireframes to compare directions.
- Signature: choose the single unique element the page will be remembered by, tied directly to the brief.

Then review the plan against the brief before building. If any part reads like the generic default you would produce for any similar page rather than a choice made for this specific brief, revise it. State what changed and why. Only after confirming the relative uniqueness of the plan should you write code, following the revised plan and deriving every color and type decision from it.

For calibration, AI-generated design often clusters around these default looks:

- Warm cream background near `#F4F1EA`, high-contrast serif display type, and terracotta accents.
- Near-black background with a single bright acid-green or vermilion accent.
- Broadsheet-style layout with hairline rules, zero border radius, and dense newspaper-like columns.

All three are legitimate for some briefs, but they are defaults rather than choices. Where the brief pins down a visual direction, follow it exactly, including when it asks for one of these looks. Where it leaves an axis free, do not spend that freedom on one of these defaults.

When writing code, keep CSS selector specificity clean. Avoid classes that cancel each other out, especially broad type-based selectors like `.section` fighting element-based selectors like `.cta`. Watch spacing between sections carefully.

Do most planning and iteration internally. Show ideas to the user only when sharing them will help confidence or delight.

## Restraint And Self-Critique

Spend boldness in one place. Let the signature element be the one memorable thing, keep everything around it quiet and disciplined, and cut any decoration that does not serve the brief.

Build to a quality floor without announcing it: responsive down to mobile, visible keyboard focus, and reduced motion respected. Critique the work as you build. Take screenshots when the environment supports it, because visual inspection catches issues that prose misses.

Before finishing, remove one unnecessary accessory. Human creators build memory by trying something new; if there is a quick place to jot notes about visual directions tried before, use it for future passes.

## Writing In Design

Words appear in a design for one reason: to make it easier to understand and use. They are design material, not decoration. Before writing anything, ask what the design needs to say and how it can best be said to help the person navigate the experience.

Write from the end user's side of the screen. Name things by what people control and recognize, never by how the system is built. A person manages notifications, not webhook config. Describe what something does in plain terms rather than selling it. Specific is better than clever.

Use active voice by default. A control should say exactly what happens when it is used: "Save changes," not "Submit." An action keeps the same name through the whole flow, so the button that says "Publish" produces a toast that says "Published." Interface vocabulary is signposting; cohesion and consistency are how people learn their way around.

Treat failure and emptiness as moments for direction, not mood. Explain what went wrong and how to fix it in the interface's voice. Errors do not apologize, and they are never vague about what happened. An empty screen is an invitation to act.

Keep the register conversational and tuned: plain verbs, sentence case, no filler, with tone matched to the brand and audience. Let each element do exactly one job. A label labels, an example demonstrates, and nothing quietly does double duty.
