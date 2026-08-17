// Regenerates the "Latest From the Blog" carousel on index.html.
//
// Why this exists: that carousel is hand-written HTML, not a live query, so
// it silently goes stale the moment someone forgets to touch it after
// publishing a post (it happened — see decisions.md, 2026-08-17). This script
// is the fix: run it after publishing any new blog/*.html file, then redeploy.
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
//   4. Sorts by date, keeps the newest 5, and writes their cards into
//      index.html between the LATEST-CARDS-START/END markers.
//
// This only touches the block between those two markers — nothing else in
// index.html is read or changed.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const blogDir = path.join(root, 'blog');
const indexPath = path.join(root, 'index.html');

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

function main() {
  const files = fs.readdirSync(blogDir)
    .filter(f => f.endsWith('.html') && f !== 'index.html')
    .map(f => path.join(blogDir, f));

  const posts = files.map(readPost).sort((a, b) => (a.date < b.date ? 1 : -1));
  const newest5 = posts.slice(0, 5);

  const cardsHtml = newest5.map(buildCard).join('\n\n');

  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  const startMarker = '<!-- LATEST-CARDS-START -->';
  const endMarker = '<!-- LATEST-CARDS-END -->';
  const startIdx = indexHtml.indexOf(startMarker);
  const endIdx = indexHtml.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    console.error('Could not find LATEST-CARDS-START/END markers in index.html — aborting, nothing written.');
    process.exit(1);
  }

  const before = indexHtml.slice(0, startIdx + startMarker.length);
  const after = indexHtml.slice(endIdx);
  const updated = `${before}\n${cardsHtml}\n${after}`;

  fs.writeFileSync(indexPath, updated);

  console.log(`Updated index.html with the newest ${newest5.length} posts:`);
  newest5.forEach(p => console.log(`  ${p.date}  ${p.title}`));
  console.log('\nNext: review the diff, commit, and run `npx netlify deploy --prod`.');
}

main();
