// Regenerates every "Latest" widget across the site — the "Latest From the
// Blog" carousel + hero rail + mobile strip on index.html, AND the same hero
// rail + mobile strip on every other landing page that has one
// (see TARGET_PAGES below).
//
// Why this exists: these widgets are hand-written HTML, not a live query, so
// they silently go stale the moment someone forgets to touch them after
// publishing a post (it happened — see decisions.md, 2026-08-17, and again
// 2026-09-28 when a new post went live but only blog/index.html was updated
// by hand, leaving index.html and 4 other landing pages showing Sep 18 as
// "latest"). This script is the fix: run it after publishing any new
// blog/*.html file, then redeploy. One command updates every page at once —
// nothing here is truly "live" (this is a static site with a manual deploy
// step, not a database-backed one), but there is no longer a second place
// to remember to hand-edit.
//
// Usage:  node scripts/update-latest-carousel.js
//
// What it does:
//   1. Reads every blog/*.html file (except index.html).
//   2. Gets its real publish date from git history (`git log --diff-filter=A`)
//      — not file mtime, which every file shares after any bulk edit, and not
//      each post's own "meta-date" span, which is only month-level and not
//      every post has one.
//   3. Pulls title + description from the standard <title>/<meta description>
//      tags every post already has, and a category tag from the post's own
//      <span class="meta-tag"> if present (falls back to a keyword guess).
//   4. Sorts by date, keeps the newest 5 (6 for the index.html card grid).
//   5. Writes the hero rail + mobile strip into every page in TARGET_PAGES
//      between their HERO-RAIL-START/END and HERO-MOBILE-START/END markers,
//      and additionally writes the full card grid into index.html between
//      the LATEST-CARDS-START/END markers (index.html only — it's the only
//      page with that grid).
//
// This only touches the marked blocks — nothing else in any target page is
// read or changed.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const blogDir = path.join(root, 'blog');
const indexPath = path.join(root, 'index.html');

// Every landing page with its own "Latest" hero rail + mobile strip.
// index.html additionally gets the LATEST-CARDS grid (see main()).
const TARGET_PAGES = [
  'index.html',
  'meta-checklist.html',
  'meta-vault.html',
  'systemized.html',
  'systemize-your-business.html',
];

const CATEGORY_GUESSES = [
  [/pixel|pinterest/i, 'Meta Ads'],
  [/pinterest/i, 'Pinterest Strategy'],
  [/ai |ai-|artificial|folder|claude|files/i, 'Business Systems'],
  [/instagram|carousel|algorithm|content pillar/i, 'Social Media'],
  [/roas|budget|ads|retarget|funnel|campaign/i, 'Meta Ads'],
  [/restrict|appeal|verification|portfolio|disabled|hacked/i, 'Meta Access & Repair'],
];

function guessCategory(title) {
  for (const [pattern, label] of CATEGORY_GUESSES) {
    if (pattern.test(title)) return label;
  }
  return 'Meta Ads';
}

function getPublishDate(filePath) {
  try {
    const relPath = path.relative(root, filePath);
    const out = execSync(
      `git log --diff-filter=A -1 --format=%ad --date=short -- "${relPath}"`,
      { cwd: root, encoding: 'utf8' }
    ).trim();
    if (out) return out;
  } catch (e) { /* fall through */ }
  // No git history (brand new, uncommitted file) — use today.
  return new Date().toISOString().slice(0, 10);
}

function formatDate(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Title/description/tag text is pulled from inside HTML attributes and tags,
// where it's already entity-encoded (e.g. "H&amp;M") — decode first so
// escapeHtml() above doesn't double-encode it into "H&amp;amp;M".
function unescapeHtml(s) {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function readPost(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const descMatch = html.match(/<meta name="description" content="([^"]*)"/);
  const tagMatch = html.match(/<span class="meta-tag">([^<]*)<\/span>/);

  let title = titleMatch ? titleMatch[1] : path.basename(filePath, '.html');
  title = unescapeHtml(title.replace(/\s*\|\s*JDesigns Strategist\s*$/, '').trim());

  const desc = descMatch ? unescapeHtml(descMatch[1].trim()) : '';
  const category = tagMatch ? unescapeHtml(tagMatch[1].trim()) : guessCategory(title);
  const slug = path.basename(filePath, '.html');
  const date = getPublishDate(filePath);

  return { slug, title, desc, category, date };
}

function buildRailItem(post) {
  // Short month + day (no year) to fit the narrow hero sidebar rail.
  const [y, m, d] = post.date.split('-').map(Number);
  const short = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
  return [
    `    <a href="/blog/${post.slug}.html" class="hero-rail-item">`,
    `      <span class="hero-rail-date">${short}</span>`,
    `      <span class="hero-rail-title">${escapeHtml(post.title)}</span>`,
    `    </a>`,
  ].join('\n');
}

function buildCard(post) {
  return [
    `    <a href="/blog/${post.slug}.html" class="blog-card">`,
    `      <div class="blog-card-tag-row"><span class="blog-card-tag">${escapeHtml(post.category)}</span><span class="blog-card-date">${formatDate(post.date)}</span></div>`,
    `      <div class="blog-card-title">${escapeHtml(post.title)}</div>`,
    `      <div class="blog-card-desc">${escapeHtml(post.desc)}</div>`,
    `      <div class="blog-card-arrow">Read →</div>`,
    `    </a>`,
  ].join('\n');
}

function buildMobileCard(post) {
  const [y, m, d] = post.date.split('-').map(Number);
  const short = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
  return [
    `      <a href="/blog/${post.slug}.html" class="hero-mobile-card">`,
    `        <span class="hero-rail-date">${short}</span>`,
    `        <span class="hero-rail-title">${escapeHtml(post.title)}</span>`,
    `      </a>`,
  ].join('\n');
}

function main() {
  const files = fs.readdirSync(blogDir)
    .filter(f => f.endsWith('.html') && f !== 'index.html')
    .map(f => path.join(blogDir, f));

  const posts = files.map(readPost).sort((a, b) => (a.date < b.date ? 1 : -1));
  const newest6 = posts.slice(0, 6);
  const newest5 = posts.slice(0, 5);

  // Carousel gets 6 (fills its 3-column grid evenly). Sidebar rail and mobile
  // strip get 5 (their own layouts, list/scroller, don't need a multiple of 3).
  // Same source list either way — never separate things to keep in sync.
  // (The right-rail preview is a static "About" link, not blog-post data —
  // it's hand-authored in index.html and this script doesn't touch it.)
  const cardsHtml = newest6.map(buildCard).join('\n\n');
  const railHtml = newest5.map(buildRailItem).join('\n');
  const mobileHtml = newest5.map(buildMobileCard).join('\n');

  function replaceBetween(html, startMarker, endMarker, body, pageName) {
    const startIdx = html.indexOf(startMarker);
    const endIdx = html.indexOf(endMarker);
    if (startIdx === -1 || endIdx === -1) {
      console.error(`Could not find ${startMarker}/${endMarker} markers in ${pageName} — aborting, nothing written.`);
      process.exit(1);
    }
    const before = html.slice(0, startIdx + startMarker.length);
    const after = html.slice(endIdx);
    return `${before}\n${body}\n${after}`;
  }

  let updatedCount = 0;
  for (const pageName of TARGET_PAGES) {
    const pagePath = path.join(root, pageName);
    let html = fs.readFileSync(pagePath, 'utf8');

    html = replaceBetween(html, '<!-- HERO-RAIL-START -->', '<!-- HERO-RAIL-END -->', railHtml, pageName);
    html = replaceBetween(html, '<!-- HERO-MOBILE-START -->', '<!-- HERO-MOBILE-END -->', mobileHtml, pageName);

    // Only index.html has the full "Latest From the Blog" card grid.
    if (pageName === 'index.html') {
      html = replaceBetween(html, '<!-- LATEST-CARDS-START -->', '<!-- LATEST-CARDS-END -->', cardsHtml, pageName);
    }

    fs.writeFileSync(pagePath, html);
    updatedCount++;
    console.log(`Updated ${pageName}`);
  }

  console.log(`\n${updatedCount} page(s) updated — hero rail + mobile strip (newest ${newest5.length}), index.html card grid (newest ${newest6.length}):`);
  newest6.forEach(p => console.log(`  ${p.date}  ${p.title}`));
  console.log('\nNext: review the diff, commit, and run `npx netlify deploy --prod`.');
}

main();
