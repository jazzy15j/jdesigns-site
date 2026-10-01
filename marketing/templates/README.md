# JDesigns Graphic Card Templates — Source of Truth

> Read this before building ANY branded graphic (LinkedIn, Facebook, Instagram, Pinterest, anything).
> Do not guess which template to use, and do not freehand new CSS. Pick one of the systems below,
> copy its file, and only change the text content.

There are **three** legitimate card systems in this repo. They are not interchangeable — pick by content type, not by whichever file you find first.

## 1. FAQ / Pattern card — **the default for most content**
**File:** `marketing/templates/faq-pattern-card-TEMPLATE.html`
**Use for:** answering a real question, explaining a pattern/mistake, "what to actually do" content — the majority of blog-post promo graphics, FAQ content, educational posts.
**Look:** left-aligned wordmark (top), plain uppercase eyebrow label (no pill/border), left-aligned serif headline (white + green italic clause), one intro paragraph, a rounded panel with a dot-prefixed label ("WHAT TO ACTUALLY DO") + numbered outline-circle items, a divider, then a bottom bar with a small outlined pill tag (left) and a plain monospace muted-gray domain (right, `jdesigns.info`) — **no big white CTA button**.
**Canvas:** 1080×1000. Headline 56px, intro 24px, item text 25px. The panel has **no `flex:1`/centering** — it sizes to its own content so it never stretches and leaves dead space top/bottom, regardless of whether there are 2 items or 4.
**Confirmed correct:** 2026-09-28, verified directly against Jasmine's own reference screenshot (`~/Desktop/Screenshot 2026-09-28 at 10.40.32 AM.png`), then re-verified after a sizing correction (bigger text, panel no longer stretch-centered) same day.

## 2. Proof / client-case card — centered, has a CTA button
**File:** `reports/content-engine/2026-09-24/orphaned-pixel-post.html`
**Use for:** a real client outcome/proof story — the "Her account was 'connected.' It had been broken for months." style post. This is what actually went live as the first real `meta-publisher` Facebook post.
**Look:** centered wordmark, centered pill eyebrow badge (with a dot), centered serif headline, a panel with numbered items or a closing italic quote, then a **white pill CTA button** + a bold green domain line underneath it.
**Canvas:** 1080×1350.
**Do not** use this system for FAQ/explainer content, and do not use system #1 for a client-proof story — the CTA button vs. no-CTA-button distinction is deliberate to each content type.

## 3. Old LinkedIn stat-chip card — superseded, avoid for new work
**Files:** `marketing/social-posts/linkedin/cur-*.html`
**Status:** an earlier lineage (left kicker, stat-chip comparison boxes, small wordmark bottom-right). Still real, historical LinkedIn posts use it, but it is **not** the current standard for new graphics. Don't copy from these for new work — if a stat-comparison format is genuinely needed, adapt system #1 or #2 first and ask before inventing a variant of this old one.

---

## Before building anything new
1. Identify the content type (FAQ/explainer vs. client-proof vs. something neither covers).
2. Copy the matching file above exactly — same CSS classes, same brand color tokens (`--bg #07100a`, `--card #0d1a10`, `--green #2ec27e`, etc. — see `JDesigns-Brain-System/brand/jdesigns-brand-identity-board.html` for the full palette), same wordmark markup.
3. Only change the text content (headline, eyebrow, item text, tag, domain). Don't change font sizes, spacing, colors, or structure without a specific reason — and if changing any of those, treat it as a template update (edit the canonical file itself), not a one-off.
4. Render at the exact canvas size listed above (`chrome --headless --screenshot=... --window-size=W,H`), then look at the actual PNG before sending it — check for dead space, cut-off text, or wrong template family before it goes to Jasmine.
5. If the content genuinely doesn't fit either system, say so and ask which one to adapt — don't silently invent a fourth system.

Full history/reasoning: `feedback_approved_templates_are_default_branding.md` in Claude's memory.
