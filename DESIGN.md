---
name: Refine Text
description: A quiet dark instrument for polishing messy text, where the only chromatic voice belongs to the machine at work.
colors:
  bg: "#08090c"
  panel: "#111318"
  panel-2: "#181c24"
  panel-3: "#1f242e"
  border: "#252a35"
  border-strong: "#5b6782"
  border-subtle: "#1d212b"
  text: "#eceef2"
  text-secondary: "#b4b9c4"
  text-tertiary: "#8b91a1"
  accent: "#5b7cfa"
  accent-hover: "#7b96ff"
  accent-bg: "rgba(91, 124, 250, 0.10)"
  accent-2: "#34d399"
  danger: "#f87171"
  danger-bg: "rgba(248, 113, 113, 0.10)"
  warning: "#fbbf24"
  warning-bg: "rgba(251, 191, 36, 0.10)"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
    letterSpacing: "0.025em"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  numeral:
    fontFamily: "ui-monospace, SF Mono, Fira Code, Fira Mono, Menlo, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: "normal"
rounded:
  panel: "16px"
  control: "12px"
  badge: "6px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "24px"
  "6": "32px"
  "7": "48px"
  "8": "64px"
  "9": "96px"
components:
  panel:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.panel}"
    padding: "24px"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
    typography: "{typography.title}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  button-stop:
    backgroundColor: "{colors.danger-bg}"
    textColor: "{colors.danger}"
    typography: "{typography.title}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  button-ghost:
    backgroundColor: "{colors.panel-2}"
    textColor: "{colors.text}"
    typography: "{typography.title}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  input-textarea:
    backgroundColor: "{colors.panel-2}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px"
  output-well:
    backgroundColor: "{colors.panel-2}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px"
  badge-numeral:
    backgroundColor: "{colors.panel-2}"
    textColor: "{colors.text}"
    typography: "{typography.numeral}"
    rounded: "{rounded.badge}"
    padding: "4px 8px"
  note-status:
    backgroundColor: "{colors.accent-bg}"
    textColor: "{colors.accent}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px"
  note-error:
    backgroundColor: "{colors.danger-bg}"
    textColor: "{colors.danger}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px"
---

# Design System: Refine Text

## Overview

**Creative North Star: "The Quiet Instrument"**

Refine Text looks like a precise tool that has decided not to talk about itself. The field is a near-black neutral that runs almost the entire surface, broken only by hairline borders and two flat trays sitting side by side. Nothing is styled to attract attention. There is exactly one chromatic voice in the whole system — a periwinkle blue — and it never appears as decoration. It appears where the machine is doing something: the caret advancing through the streamed result, the border of the field you are typing into, the fill of the button that commits the work, the tint behind a status line explaining a model switch. When nothing is happening, the interface is monochrome. That contrast is the entire personality.

The density is calm rather than sparse. Panels carry generous 24px interiors and a 24px gutter between them, and the page is capped at 880px so both trays stay readable side by side rather than stretching. Type is deliberately flat in scale: one 30px name at the top, then everything else at 14px or smaller. There is no secondary heading tier, because there is nothing to navigate — the whole product is one screen with two halves. Hierarchy is carried by tonal steps and label weight instead of size, which is why the system can be this quiet and still be legible.

Depth is achieved without a single shadow. Three surface tones stack in a fixed ladder — page, panel, well — each about four percent lighter than the last, with a 1px border drawn at every boundary. Corners soften as you move outward and tighten as you move inward, so a control never looks like it is floating on top of its container; it looks recessed into it. Confirmed rejections: no light mode and no theme toggle (the dark field is a binding product constraint), no shadow at rest, and no decorative use of the accent.

**Key Characteristics:**

- One accent, used only as a signal of system activity — never as ornament.
- Flat at rest: depth from a three-step tonal ladder plus hairline borders, not elevation — with contrast spent on operable edges, not on mood.
- A compressed type scale — a single 30px display, then 14px and below.
- Monospace reserved strictly for numerals; prose is never monospace.
- Radius shrinks inward (16 → 12 → 6px), so controls read as recessed, not stacked.
- Two equal trays: input and output are siblings of identical weight, never primary and secondary.
- Failure and degradation are shown in their own color, in the user's own words.

## Colors

A near-monochrome dark field of six neutral steps, carrying exactly one chromatic accent and one failure color; everything expressive is achieved by lightness, not hue.

### Primary

- **Signal Periwinkle** (`#5b7cfa`): The system's only chromatic voice, and it is strictly functional. It fills the primary commit button, draws the focused field's border, tints the status note behind a model switch, colors the live streaming caret, drives the tone slider's thumb and track, and marks the active tone description under each slider. If periwinkle is on screen, the system is doing something or is ready for you to do something. It is never used for emphasis, never for a heading, and never as a background wash beyond its 10% tint.
- **Signal Periwinkle Bright** (`#7b96ff`): Reserved as the explicit hover fill for the primary button. The shipped implementation currently achieves hover with `filter: brightness(1.1)` instead; this token exists so that hover can be stated as a color rather than a filter. Prefer it in new work.
- **Signal Wash** (`rgba(91, 124, 250, 0.10)`): The 10%-opacity tint that backs status notes. Its transparency matters — it sits over whatever surface it lands on and keeps the note attached to the panel rather than floating above it.

### Secondary

- **Alert Coral** (`#f87171`): The failure and interruption voice. It carries the Stop button's label and border, and the text of any terminal error. Paired always with **Alert Wash** (`rgba(248, 113, 113, 0.10)`) as its 10% background tint, never as a solid fill — a failure is reported, not shouted.

### Tertiary

Two tokens are declared and currently unexercised. They are **reserved with assigned roles**, so future work claims them rather than inventing new colors:

- **Confirm Green** (`#34d399`): reserved for successful completion — a finished stream, a confirmed copy. Pairs with a 10% wash on the same pattern as the other semantic colors.
- **Quota Amber** (`#fbbf24`): reserved for degradation that is not failure — free-tier quota pressure, a fallback in progress. Paired with **Quota Wash** (`rgba(251, 191, 36, 0.10)`). This is the honest middle state between "working" and "broken," and the product has a permanent need for it.

### Neutral

- **Instrument Black** (`#08090c`): The page ground. Nearly black with a faint blue cast, not pure `#000` — it lets the panels above it read as lighter rather than as holes. Also serves as the *text* color on a filled periwinkle button, which is why button labels are dark-on-blue rather than white-on-blue.
- **Tray** (`#111318`): The panel surface. The second rung of the tonal ladder and the color of both the input and output containers.
- **Well** (`#181c24`): The recessed surface inside a panel — the textarea, the output area, the numeral badge, the ghost button. Anything you type into or read out of sits at this tone.
- **Well Raised** (`#1f242e`): Reserved as a fourth tonal step for a surface nested inside a well (a hovered row, a selected item, an inline control within the output). Currently unexercised; use it before introducing a shadow.
- **Hairline** (`#252a35`): The decorative 1px border, drawn at panel and badge boundaries. This border is doing the work a shadow would do in another system. It measures 1.29:1 against the panel, which is deliberate — it separates without asserting, and it is used only where the boundary is not the sole cue.
- **Hairline Interactive** (`#5b6782`): The 1px border on anything the user can operate — the textarea, the Copy button. Measured at **3.01:1** against the well and **3.27:1** against the panel, so a control's edge is perceptible rather than merely implied. This is the one place the system spends contrast rather than saving it, because a form control that cannot be located is not quiet, it is broken.
- **Hairline Recessed** (`#1d212b`): A quieter border for surfaces already inside a panel, where the standard hairline would over-articulate. Used on the output well.
- **Primary Text** (`#eceef2`): Body and result text. Slightly warm off-white, never pure white.
- **Secondary Text** (`#b4b9c4`): Panel labels and the subtitle — present, clearly subordinate.
- **Tertiary Text** (`#8b91a1`): Placeholders, slider end labels, the character count. The lowest legible rung; nothing quieter than this exists. Measured at 5.41:1 on the well and 5.90:1 on the panel — it reads as the quietest tier while still clearing AA for body text, which the earlier value (`#6e7382`, 3.61:1) did not.

### Named Rules

**The One Signal Rule.** Signal Periwinkle marks system activity and nothing else. If you cannot name the machine behavior a periwinkle element represents — focus, streaming, in-progress, commit — it should be neutral.

**The Two-Voice Rule.** Chromatic color carries exactly two live meanings: periwinkle means the system is working or ready, coral means it stopped or failed. Green and amber are reserved for success and degradation respectively. There is no fifth meaning, and no color is introduced for aesthetic variety.

**The Wash Rule.** Semantic backgrounds are always the 10%-opacity wash of their own color, never a solid fill. Solid semantic fills are reserved for the single primary button.

**The Off-Black Rule.** No surface is `#000` and no text is `#fff`. Both ends of the range are pulled inward so the tonal ladder has room to breathe.

**The Operable-Edge Rule.** Anything the user can operate carries the interactive hairline (`#5b6782`, ≥3:1 against its neighbours). Anything decorative carries the quiet hairline (`#252a35`). Quietness is a choice the system makes about ornament, never about whether a control can be found.

## Typography

**Display Font:** system UI stack (`ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`)
**Body Font:** the same system UI stack
**Label/Mono Font:** system monospace stack (`ui-monospace, "SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas`)

**Character:** There is no webfont, and that is a decision consistent with the North Star — the type renders in whatever the operating system considers native, so the interface reads as equipment rather than as a designed artifact. The monospace stack appears only on numbers, which gives the interface its one note of engineered precision without turning the whole thing into a terminal.

### Hierarchy

- **Display** (700, `1.875rem` / 30px, line-height 1.2, letter-spacing `-0.025em`): The product name, once, at the top of the page. The tight tracking is what keeps it from reading as generic bold sans. Nothing else in the system uses this size.
- **Title** (500, `0.875rem` / 14px, line-height 1.43, letter-spacing `0.025em`): Panel labels ("Your message", "Refined output"), slider names, and button labels. The positive tracking at a small size is the signature of this tier — it reads as a machined label rather than as body copy, and it is what distinguishes a label from prose at identical size.
- **Body** (400, `0.875rem` / 14px, line-height 1.625): The user's draft, the refined result, the subtitle, and status and error text. The generous 1.625 line-height is deliberate: this is text a person reads carefully before sending it to someone.
- **Label** (400, `0.6875rem` / 11px, token `--text-label`): Slider end labels ("Casual", "Formal"), the character count, and the model attribution line. The smallest tier; used only for text that orients rather than informs.
- **Numeral** (400 monospace, `0.75rem` / 12px, tabular figures): Tone scores and the character count. Tabular figures are required, not optional — a score badge that reflows as you drag the slider breaks the sense of a precise instrument.

### Named Rules

**The Mono-for-Numerals Rule.** Monospace is reserved for numbers and nothing else. Prose is never monospace, and any number that can change while the user watches carries `tabular-nums`.

**The One Display Rule.** Exactly one element per screen uses the display tier. Everything else is 14px or smaller. If a new section seems to need a heading, it more likely needs a Title-tier label.

**The Tracked-Label Rule.** Small text that names a thing gets positive letter-spacing (`0.025em`); small text that *is* the thing gets none. This is the only cue separating a 14px label from 14px content, so it is load-bearing.

## Layout

A single centered column capped at **880px** (`max-w-[880px]`), with 24px horizontal padding and 48px of vertical padding that opens to 64px at the `sm` breakpoint and above. There is no navigation, no footer, and no scroll region — the entire product is intended to fit one viewport.

Inside it, a two-column grid with a **24px gutter** holds the input tray and the output tray as equal siblings. Below the `md` breakpoint (768px) the grid collapses to a single column and the trays stack, input above output, following the natural order of the task. The header sits above the grid with 32px of clearance and is marked by a **2px periwinkle rule on its left edge** with 12px of padding — the one piece of pure identity in the layout, and the only place a border is used expressively rather than structurally.

Both trays carry 24px interior padding and both reserve a **160px minimum body height**, matched deliberately: the output well is as tall as the input textarea before any text arrives, so the page does not shift when the stream begins. The textarea is user-resizable vertically; the output well grows with its content.

Spacing follows a nine-step scale (4, 8, 12, 16, 24, 32, 48, 64, 96px) declared as custom properties in `globals.css`. The scale is not referenced directly in markup — the implementation uses Tailwind utilities — but every spacing value in the shipped UI lands on a step of it, so the scale is descriptive of real practice rather than aspirational. In practice the system leans almost entirely on steps 2, 3, 5, and 6 (8, 12, 24, 32px).

### Named Rules

**The Two-Tray Rule.** Input and output are equal-weight siblings. Neither gets more space, a heavier border, a brighter surface, or a larger label than the other. The moment one tray dominates, the product stops reading as a two-step instrument.

**The No-Jump Rule.** Reserve the destination before content arrives. Matched 160px minimums exist so that streaming text never reflows the page around it.

**The Single-Viewport Rule.** The whole task fits one screen at desktop width. New elements earn their place by displacing something, not by extending the page.

## Elevation & Depth

The system ships **zero shadows**. Depth is entirely tonal: three fixed surface tones stack from dark to light as you move from the page toward the content, and every boundary between them is drawn with a 1px border. A control inside a panel is *lighter* than the panel and outlined, which makes it read as recessed into the surface rather than raised above it — the opposite of a card-and-shadow system, and the reason the interface feels like a fascia panel with insets cut into it.

Be honest about the limits of this: the tonal steps measure roughly **1.07–1.10:1** against each other. They establish mood and grouping, not legibility. Depth here is a *compositional* device, and any boundary that a user must actually find — the edge of a control, the focus state — is carried by the border, not by the tonal step. That division is what lets the ladder stay this quiet.

Flatness is strongly preferred but not absolute. A shadow may be introduced only as a **response to state** — a hover lift, a focused surface, a transient overlay that must detach from the page. It may never be used to establish resting hierarchy, and it may never appear on a panel, tray, or well at rest.

### Shadow Vocabulary

None defined. The system has no shadow tokens, and new work should exhaust the tonal ladder and the two border weights before proposing one. If a state genuinely requires a shadow, add it as a named token with a stated state trigger rather than reaching for an arbitrary value.

### The Tonal Ladder

- **Page** (`#08090c`): the ground everything sits on.
- **Panel** (`#111318`) + 1px `#252a35` hairline: the trays.
- **Well** (`#181c24`) + 1px `#1d212b` recessed hairline for display surfaces, or 1px `#5b6782` interactive hairline when the surface is operable: anything you type into or read out of.
- **Well Raised** (`#1f242e`): reserved fourth step for a surface nested inside a well.

### Named Rules

**The Flat-At-Rest Rule.** Every surface is flat at rest. A shadow is permitted only as a response to a state change (hover, focus, overlay), never to establish resting hierarchy.

**The Lighter-Is-Nearer Rule.** Surfaces get lighter as they get closer to the content, and every step up the ladder is accompanied by a border. Depth is read from lightness and outline, not from cast light.

**The Border-Instead-Of-Shadow Rule.** When a surface needs separating, reach for the hairline (`#252a35`) or the recessed hairline (`#1d212b`) first. The border is this system's shadow.

## Shapes

Uniformly rounded rectangles, with a radius that **shrinks as you nest inward**: a 16px radius on panels and trays, 12px on controls and content surfaces (buttons, textarea, output well, status and error notes), and 6px on the smallest inline element (the tone score badge). Nothing in the system is square-cornered, nothing is a pill, and nothing is circular except the browser-native slider thumb.

Every shape is outlined. Borders are always exactly 1px and always one of two neutrals, with a single expressive exception: the 2px periwinkle rule on the left edge of the page header. Semantic notes and the Stop button use a 40%-opacity version of their own semantic color as their border (`border-accent/40`, `border-danger/40`), which keeps them visibly related to the neutral hairlines instead of reading as a different material.

### Named Rules

**The Concentric Softening Rule.** A child element never has a larger radius than its parent. 16px containers hold 12px controls hold 6px badges. When adding a new nesting level, continue the sequence inward rather than repeating a radius.

**The Hairline Rule.** Borders are 1px, always. The only 2px stroke in the system is the header's periwinkle rule, and it is identity, not structure.

## Components

### Buttons

Understated until touched, then answering with exactly one crisp change. Every button shares the 12px control radius, a 14px medium-weight tracked label, and a 150ms `cubic-bezier(0.16, 1, 0.3, 1)` transition.

- **Shape:** Gently rounded rectangle (12px). Full-width on mobile, auto-width from the `sm` breakpoint up.
- **Primary ("Refine"):** Solid Signal Periwinkle fill with **Instrument Black text** — dark-on-blue, not white-on-blue, which is what makes the fill read as an indicator lamp rather than a generic CTA. Padding 12px vertical, 16px horizontal.
- **Hover / Active:** Hover brightens the fill by 10%; active presses to 98% scale. That is the complete vocabulary — no lift, no glow, no color rotation.
- **Disabled:** 50% opacity with hover suppressed and a `not-allowed` cursor. The button is disabled whenever the textarea is empty or a stream is running.
- **Destructive ("Stop"):** Replaces the primary button in place during streaming, rather than appearing beside it. Alert Coral text on a 10% coral wash with a **60%-opacity** coral border (3.01:1 against the panel — an operable edge, per the rule). Hover deepens the wash to 20%. Same geometry and press behavior as primary.
- **Ghost ("Copy"):** Well-toned fill (`#181c24`) with the interactive hairline and primary text, at the same 12px/16px padding as the other actions — it is the last step of the core flow and gets the same 44px target. Hover shifts both border and text to periwinkle — the border-and-text shift *is* the hover state; the background does not change.

### Cards / Containers

- **Corner Style:** 16px radius.
- **Background:** Tray (`#111318`).
- **Shadow Strategy:** None. See Elevation & Depth — depth comes from the tonal step above the page and its hairline border.
- **Border:** 1px Hairline (`#252a35`).
- **Internal Padding:** 24px on all sides.

### Inputs / Fields

- **Style:** Well-toned surface (`#181c24`) inside a 12px radius with a standard hairline, 12px padding, Body-tier type at 1.625 line-height. Placeholder text is Tertiary Text. Vertically resizable; 160px minimum height.
- **Focus:** The border becomes Signal Periwinkle and a 2px halo of periwinkle at 30% opacity surrounds it. The native outline is suppressed and replaced by this treatment.
- **Caret:** the text caret is Signal Periwinkle, not the UA default. The caret is where the user is, and that is system activity.
- **Disabled:** 60% opacity, applied while a stream is running.

### The Focus Standard

Focus has two forms, chosen by whether the control has a border to spend:

- **Bordered surfaces** (textarea): the border shifts to Signal Periwinkle and a 2px 30%-opacity halo surrounds it. The periwinkle border measures **4.64:1** against the well and **5.05:1** against the panel, so the border is the indicator and the halo is reinforcement.
- **Unbordered or filled controls** (all buttons, the tone sliders): a 2px solid Signal Periwinkle ring at a 2px offset from the panel. Solid, not 30% — at 30% opacity a ring measures 1.52:1 and is not an indicator at all.

Both forms are `:focus-visible`, so pointer users never see them. The native outline is suppressed only where one of these replaces it.

### Sliders (Tone Controls)

The product's most characteristic control, and the one place the system accepts a native platform element. A native `range` input tinted with the accent, wrapped in a three-part label frame:

- **Header row:** the axis name in Title tier on the left, the current score in a Numeral-tier badge on the right (well-toned, 6px radius, hairline border, tabular figures, 34px minimum width so the badge does not resize between single and double digits).
- **Track:** full-width native range, accent-tinted, pointer cursor, `not-allowed` and unresponsive while streaming.
- **Footer row:** three 11px Label-tier markers — the low anchor at the left, the high anchor at the right, and **the currently active description centered between them in periwinkle at medium weight**. The center label is not a third anchor; it is live output that changes as you drag, and its periwinkle color is a correct application of The One Signal Rule.
- **Accessibility:** the input carries an `aria-label` combining the axis name with the active description, so the semantic meaning travels even though the visible number is decoupled from the word.

### Status & Error Notes

Two variants of one form, appearing below the output well: 12px radius, 12px padding, Body-tier text, a 10% wash of the semantic color as background, and a 40%-opacity border in the same color. Status is periwinkle and reports what the machine is doing ("Refining…", a model switch, "Cancelled."); error is coral and reports a terminal failure. They are the same shape on purpose — degradation and failure are the same *kind* of message, differing only in severity.

### Attribution Line

After a successful stream, a single Label-tier monospace line reports which model produced the result, preceded by a 6px Confirm Green dot. It is the quietest possible completion signal — no wash, no border, no panel — because a success needs acknowledging, not announcing. It is the system's only use of Confirm Green, and it is deliberately *not* a status note: status is transient and periwinkle, attribution is terminal and green.

### The Streaming Caret (Signature Component)

An 8px-wide, `1.1em`-tall solid periwinkle block appended inline to the end of the streamed text, blinking on a 1-second `steps(2, start)` cycle and aligned to the text baseline's bottom. It exists only while a stream is active and disappears the instant it completes.

This is the single most important element in the system. It is the visible proof that the result is arriving live rather than being revealed after the fact, and it is the reason the interface can be this quiet everywhere else — one small blinking block carries the entire sense of a machine at work. Its hard-edged rectangular form and stepped, non-eased blink are deliberate: it should read as a terminal cursor, not as a soft pulsing UI animation.

Under `prefers-reduced-motion: reduce` the caret **holds solid** rather than disappearing. The mark is the signal; only the movement is negotiable. A blanket animation kill would remove the one cue that the stream is live, which is the opposite of an accessible alternative.

### Named Rules

**The Single Response Rule.** A control answers a state change with exactly one crisp change — a border shift, a 10% brightness lift, a 2% press. Never two changes at once, never a bounce, never a glow.

**The Replace-Don't-Add Rule.** A control that changes function changes in place. "Stop" replaces "Refine" in the same slot; a second button never appears beside it. The action count stays constant so the eye never has to re-find the primary control.

**The 150ms Rule.** State transitions run at 150ms on `cubic-bezier(0.16, 1, 0.3, 1)`. The 200ms and 300ms steps and the spring and in-out easings are declared and reserved for entrances and larger movements; they are not alternatives for state feedback.

## Do's and Don'ts

### Do:

- **Do** keep Signal Periwinkle (`#5b7cfa`) tied to system activity. Audit test: for every periwinkle element on screen, name the machine behavior it represents. If you cannot, make it neutral.
- **Do** build depth from the tonal ladder — `#08090c` page, `#111318` panel, `#181c24` well, `#1f242e` reserved — with a 1px border at each boundary.
- **Do** shrink radius as you nest: 16px container, 12px control, 6px badge. A child never rounds more than its parent.
- **Do** give every new interactive control the focus standard — border-shift-plus-halo where there is a border, a 2px solid periwinkle ring at 2px offset where there is not — as `:focus-visible`, with the native outline suppressed only because it is being replaced.
- **Do** put the interactive hairline (`#5b6782`) on anything operable and the quiet hairline (`#252a35`) on anything decorative. Audit test: if a user has to find the edge, it needs 3:1.
- **Do** give any looping animation a reduced-motion alternative that *keeps the signal* and drops only the movement.
- **Do** announce anything that arrives without a click: streamed output as a polite live region, errors as `role="alert"`.
- **Do** set `tabular-nums` on any number that changes while the user is watching.
- **Do** add positive letter-spacing (`0.025em`) to 14px text that labels something, and none to 14px text that is content.
- **Do** reserve the destination before content arrives — matched minimum heights, so streaming never reflows the page.
- **Do** claim the reserved tokens before inventing new ones: `panel-3` for a fourth tonal step, `warning` for quota degradation, `accent-hover` for the primary button's hover fill. (`accent-2` is now spent — it belongs to the attribution dot.)
- **Do** report degradation in the user's own words in a status note, in its own semantic color. Honest degradation is part of this interface's character.

### Don't:

- **Don't** add a shadow to any surface at rest. Exhaust the tonal ladder and the two border weights first; a shadow is permitted only as a state response, and only as a named token with a stated trigger.
- **Don't** introduce a light mode or a theme toggle. The dark field is a binding product constraint, not a default.
- **Don't** add a fifth semantic color. Periwinkle, coral, green, and amber cover working, failed, succeeded, and degraded. There is no meaning left to assign.
- **Don't** use a solid fill of a semantic color for anything but the primary button. Semantic backgrounds are 10% washes.
- **Don't** put white (`#fff`) text on the periwinkle button. The label is Instrument Black (`#08090c`); the dark-on-blue inversion is deliberate.
- **Don't** use monospace for prose. It belongs to numerals only.
- **Don't** add a second display-tier heading. If a section seems to need one, it needs a Title-tier label instead.
- **Don't** let either tray outweigh the other in space, border, surface tone, or label treatment.
- **Don't** ship a new control that relies on the browser's default focus ring.
- **Don't** use a 30%-opacity ring as a control's only focus indicator; at that opacity it measures 1.52:1 and is decoration.
- **Don't** lean on a tonal step to make a boundary findable. The steps measure ~1.09:1 — they group, they do not delineate.
- **Don't** kill animation wholesale under `prefers-reduced-motion`. Replace the motion, keep the meaning.
- **Don't** stack two state changes on one interaction, and don't replace the caret's stepped blink with a smooth pulse.
- **Don't** use `#000` or `#fff` anywhere. Both ends of the range stay pulled inward.
- **Don't** let a declared token sit unreferenced in `globals.css`. Tokens that generate no utility (the former `--space-*` block) are a second source of truth that will drift; either wire them up or delete them.
