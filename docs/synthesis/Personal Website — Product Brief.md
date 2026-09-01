# Personal Website — Product Brief

## Product Vision

Build a personal website that serves as both **my digital home and a demonstration of my engineering and creative work**.

The site should bring together my professional identity, technology work, finance interests, photography, writing, and other interests into one coherent experience.

The website itself should be a portfolio piece: technically ambitious, highly interactive, fast, accessible, and deliberately engineered.

> **Make the experience extraordinary without making the user wait for it.**

---

## Primary Goals

### 1. Establish a strong personal identity

The site should quickly communicate:

- Who I am
- What I do
- What I build
- What I care about
- What I explore outside of work

### 2. Showcase work

Provide dedicated experiences for:

- Technology / engineering
- Finance
- Photography
- Other projects and experiments

Projects should emphasize **what was built, why it matters, and the engineering behind it**, rather than simply listing technologies.

### 3. Create a first-class writing platform

Create a **Writing** section for:

- Technical articles
- AI / engineering
- Finance
- Photography
- Essays and ideas
- Future topics that don't fit neatly into existing categories

The personal website is the canonical source of articles.

Content should be authored in Markdown/MDX and optionally cross-published to platforms such as Medium and dev.to.

### 4. Make the website itself a technical showcase

The landing page should demonstrate:

- Excellent performance
- Accessibility
- Progressive enhancement
- Responsive design
- Modern browser capabilities
- Advanced interaction
- Graphics / animation
- Dynamic code loading
- Thoughtful architecture

---

# Landing Page Concept

The homepage should feel like an **explorable personal universe** rather than a conventional portfolio.

A broad visual concept is:

```text
┌─────────────────────────────────────────────┐
│                                             │
│   TECHNOLOGY             PHOTOGRAPHY        │
│                                             │
│   Introduction           Image grid         │
│                                             │
│   Work                   Interactive        │
│                          photography         │
│                                             │
│          mountains · stars · space          │
│                                             │
└─────────────────────────────────────────────┘
```

The visual language should evoke:

- Vastness
- Mountains
- Stars
- Exploration
- Technology
- Photography
- Curiosity

The experience should be immersive without relying on gratuitous effects.

---

# Signature Interaction: Easter Eggs

The homepage should contain optional, discoverable interactive experiences.

Examples:

- Falling blocks → Tetris
- Bouncing ball → Breakout
- Interactive stars → Star shooter
- Small car/bike → racing game

These should:

- emerge naturally from the interface
- never be required to navigate the site
- avoid blocking initial page load
- be dynamically loaded only when activated
- support keyboard interaction
- support reduced motion
- have clear exit/pause mechanisms

The goal is not simply to embed games, but to demonstrate **how a visual system can progressively transform into an interactive application**.

---

# Technical Architecture

## Recommended stack

**Astro + React**

### Astro

Responsible for:

- Site structure
- Routing
- Static rendering
- SEO
- Markdown/MDX
- Content collections
- RSS
- Image handling
- Progressive delivery

### React

Used selectively for:

- Complex interactions
- Photography exploration
- Interactive experiments
- Easter eggs
- Games
- Data visualizations

React should not be used simply for static content.

### Canvas / WebGL

Used where technically justified for:

- Starfields
- Particle systems
- Physics
- Games
- Advanced visual effects

---

# Performance Principles

Performance is a product requirement, not a post-launch optimization task.

### Initial experience

The site should:

- render meaningful HTML immediately
- avoid an artificial loading screen
- minimize critical JavaScript
- avoid blocking on non-essential assets
- prioritize fast first paint and interaction

### Progressive enhancement

```text
HTML
 ↓
CSS
 ↓
Basic interaction
 ↓
Advanced React
 ↓
Canvas/WebGL
 ↓
Games
```

Expensive features should be loaded only when needed.

For example:

```text
User discovers Tetris
        ↓
dynamic import()
        ↓
Tetris code loads
```

A visitor who never discovers the game should never pay its download/execution cost.

---

# Accessibility Principles

Accessibility must be built into the interaction model.

The site should support:

- Semantic HTML
- Full keyboard navigation
- Visible focus states
- Screen readers
- Reduced motion
- Touch interaction
- Mouse interaction
- Keyboard-accessible games
- Appropriate image descriptions
- Accessible alternatives to canvas-only interactions

Visual sophistication must never depend on excluding users.

---

# Content Architecture

Content should remain portable and independent from the rendering system.

Example:

```text
content/
  writing/
    article-one.md
    article-two.mdx
    photo-essay.mdx
```

Articles should contain structured metadata such as:

```text
title
date
description
topics
type
cover image
```

The website remains the canonical source.

Distribution can extend outward:

```text
                 Personal Website
                  /      |       \
                 /       |        \
            Medium     dev.to    RSS/etc.
```

---

# Information Architecture

Initial structure:

```text
/
├── About
├── Work
│   ├── Technology
│   ├── Finance
│   └── Experiments
├── Photography
├── Writing
└── Contact
```

Potential future section:

```text
/now
```

for current projects, interests, learning, reading, photography, and ideas.

---

# Design Principles

1. **Immediate, not loading**
2. **Interactive, not distracting**
3. **Complex underneath, simple on the surface**
4. **Accessible by default**
5. **Progressively enhanced**
6. **Content-first**
7. **Technology with purpose**
8. **Personal rather than corporate**
9. **Exploratory rather than card-grid-driven**
10. **Built to evolve**

---

# Success Criteria

The project succeeds if:

### For a normal visitor

They can quickly understand:

> Who is this person, what do they do, and what have they created?

### For a technical visitor

They notice:

> This site is unusually well engineered.

### For a curious visitor

They discover:

> Wait, there's more here than I expected.

### For an accessibility-conscious visitor

They find:

> The site is genuinely usable without relying on visual tricks.

### For future me

The site remains:

- easy to extend
- easy to write for
- performant
- maintainable
- portable
- capable of evolving with my interests

---

# Product Thesis

The website should not merely **tell people that I care about engineering**.

It should let them experience the engineering.

It should not merely **tell people that I love photography, mountains, stars, and motorsports**.

Those interests should subtly exist within the experience.

And it should not merely **host a portfolio**.

The website itself should become the first and most memorable portfolio project.