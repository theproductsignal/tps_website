# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static HTML website for **The Product Signal** podcast, deployed to [theproductsignal.com](https://theproductsignal.com) via GitHub Pages (CNAME file controls the domain).

No build tools, no package manager, no dependencies — just three HTML files served directly.

## Pages

- `index.html` — Home page: hero, stats bar, latest episodes (YouTube embeds), about teaser, subscribe CTA, footer
- `about.html` — Hosts bio page with Brad and Debashish's profiles
- `contact.html` — Contact/reach-out page

## Architecture

All CSS and JavaScript live inline inside `<style>` and `<script>` tags within each HTML file. There are no external `.css` or `.js` files. The `imgs/` directory holds host headshots.

**Design tokens** are defined as CSS custom properties in `:root` and are duplicated across all three pages — keep them in sync when modifying:

```
--primary:    #005090   (logo bg, dominant)
--primary-dk: #003a6e   (darker depth)
--primary-lt: #006bb3   (mid highlight)
--accent:     #4d9ecf   (lighter accent)
--ice:        #d6eaf8   (very light tint)
--off-white:  #f4f8fc   (page background)
--slate:      #1c2f40   (dark text)
--slate-mid:  #4a6070
--slate-lt:   #8aa0b0
--card-bg:    #eaf3fb
```

**Fonts** (loaded from Google Fonts in each page's `<head>`): `Nunito` (logo/brand), `Inter` (body), `Space Grotesk` (headings/accents).

**Shared UI patterns** repeated across all pages:
- Custom CSS cursor (`.cursor` div + JS tracking)
- Dot-grid `body::after` background texture
- Fixed nav with blur backdrop
- `.reveal` class elements animated in via `IntersectionObserver`
- Consistent nav and footer HTML

## Deployment

Push to the `develop` branch — GitHub Pages serves directly from it. No build step required.

## Editing guidance

When making visual changes, open the affected HTML file in a browser to verify — there is no dev server needed, just open the file locally. When adding a new section or component, follow the existing `.section` / `.section-header` / `.section-label` / `.section-title` pattern. Any new interactive elements should add `cursor-hover` class behavior consistent with the existing custom cursor JS.
