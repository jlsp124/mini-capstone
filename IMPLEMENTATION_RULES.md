Locked Implementation Rules

Reference priority

The local Orwell reference is the implementation and motion benchmark:

* reference/orwell/mirror/orwell.byholm.co/index.html
* reference/orwell/source/
* assets/screenshots/orwell-motion-reference.mp4
* reference/orwell/notes/orwell-reference.md

Never edit anything inside reference/orwell/.

The current root implementation is not the desired foundation. It is a homemade generic recreation that reuses similar templates.

The rebuild must restore the actual local Orwell clone structure and edit that structure.

Prototype restriction

This rebuild branch is an internal prototype.

Do not deploy or publish the rebuild while it still contains original Orwell branding, copyrighted image assets, or copied textual content.

Visual structure

* fixed full-screen viewport
* artificial scroll height
* scroll drives progress
* no normal stacked sections
* no visible slide/scene counter
* no presentation mode
* no reader mode
* no comments
* no buttons required during the story
* no sound
* no generic cards/grids unless directly adapted from an Orwell composition
* large amounts of intentional blank space
* sparse quote/interlude beats
* informational beats may unfold over multiple scroll ranges
* no requirement that each beat equals one hard scene switch

Orwell fidelity during this phase

Temporarily preserve the Orwell reference’s:

* fonts
* typography scale
* spacing
* page geometry
* fixed corner-label structure
* scroll behaviour
* scene timing
* image motion
* quote movement
* newspaper/editorial structure
* rotating-object behaviour
* image-stack behaviour
* transitions between sections
* final text-reveal structure

Do not invent replacement typography or a new design system yet.

Opening

Copy the structure, typography, placement, spacing, pointer movement, and corner-label treatment of the Orwell opening as closely as possible.

Remove:

* hand
* eyes
* central 3D object
* description
* button
* counter

Use only the locked opening words.

Cursor

The cursor word changes by act.

Do not cycle through generic words on a timer.

The cursor word must derive from the currently active act.

Assets

Every non-text focal visual must be one of:

1. a user-owned photograph, screenshot, video, scan, or model;
2. an image generated with OpenAI Images 2.0;
3. a temporary asset inherited directly from the local Orwell reference during the internal prototype.

Do not invent generic CSS planets, circles, glowing orbs, fake jaw diagrams, placeholder dashboards, or generic system maps.

Placeholder PNG files with final filenames are allowed until the real files are swapped in.

Do not bake the main website wording into generated assets unless the visual specifically requires it.

Content

STORY_LOCK.md is authoritative.

Do not rewrite, summarize, add, remove, or reorder the locked text unless a later prompt explicitly changes it.

Do not restore detailed university, schooling, licensing, or education-pathway content.

Do not add the NL certification.

Responsive priorities

Desktop 16:9 is the primary composition.

Still prevent:

* clipped text
* overlapping text
* horizontal overflow
* unreadable mobile layouts
* focal assets covering copy

Do not solve composition problems by globally shrinking all type.

Git discipline

* one focused commit per prompt
* do not combine later acts into an earlier prompt
* do not continue past the requested scope
* report every changed file
* run validation before committing
* include screenshot paths in the final response
