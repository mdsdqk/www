# s3q.io

The personal website of Mohammed Sadiq K — a digital home that doubles as a
demonstration of engineering and creative work. This glossary fixes the language
used across its design and build.

## Language

**Beachhead**:
The minimal first version of the live site — simple, beautiful, presentable,
static, SVG + CSS only. The thing that goes up first, that every later layer
builds on.
_Avoid_: MVP, V1, prototype

**Easter egg**:
An optional, discoverable interactive experience that emerges from the interface
rather than appearing as a conventional application. Never required to use the
site.
_Avoid_: game, mini-game, demo

**Island**:
A React component that hydrates on an otherwise static Astro page. The only place
client-side JavaScript runs. Static content is never an island.
_Avoid_: widget, component (when the point is that it hydrates)

**Motif**:
A recurring visual element drawn from personal interests — mountains, stars,
vastness — used to give the site atmosphere and depth.
_Avoid_: theme, decoration, flourish

**Layer**:
One tier of the progressive-enhancement stack: Layer 0 HTML, Layer 1 CSS,
Layer 2 JavaScript / islands, Layer 3 Canvas / WebGL. Each layer enhances the one
below and never blocks it.
_Avoid_: tier, level, stage

**Description**:
The single short summary line carried by every content entry (a writing piece, a
project). One field, reused as the HTML meta description, the RSS item summary,
and the text on list cards.
_Avoid_: summary, excerpt, blurb, tagline

**Reveal**:
The site's load experience: it emerges from a blank field in deliberate, staged
order (content, then style, then behaviour, then immersive elements), usable from
first paint, with no loader or progress gate. The assembly itself is the
aesthetic. Contrast the conventional pattern that withholds the page behind a
0–100% loader and then presents it whole.
_Avoid_: loading screen, splash, preloader, intro animation

**Extension model**:
The stated idea for how a later addition — a new section, a new content
collection, a new easter egg — attaches to the built site without re-architecting
it. The high-level version is in scope for this effort; the detailed per-egg
interface is not.
_Avoid_: plugin API, hook system
