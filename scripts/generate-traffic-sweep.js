const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const siteUrl = "https://jdesigns.info";
const today = "2026-06-29";

const blogSlugs = [
  "meta-ads-funnel-strategy",
  "advantage-plus-campaigns-2026",
  "meta-ad-creative-strategy",
  "meta-pixel-tracking-guide",
  "meta-ads-budget-scaling-safely",
  "meta-ai-disclosure-rules-2026",
  "meta-behavioral-restriction-triggers",
  "how-to-appeal-meta-ad-account-restriction",
  "meta-business-verification-required-2026",
  "meta-business-portfolio-setup-guide",
  "does-your-agency-own-your-meta-account",
  "meta-verified-tiers-small-business",
  "instagram-wont-connect-meta-business-suite-fix",
  "instagram-algorithm-2026-shares-first",
  "how-to-use-instagram-trial-reels",
  "instagram-carousel-strategy-2026",
  "content-pillars-for-small-business",
  "canva-grow-vs-meta-ads-strategist",
  "canva-ai-2-whats-new-2026",
];

const blogCategories = {
  "meta-ads-funnel-strategy": "Meta Ads",
  "advantage-plus-campaigns-2026": "Meta Ads",
  "meta-ad-creative-strategy": "Meta Creative",
  "meta-pixel-tracking-guide": "Meta Pixel",
  "meta-ads-budget-scaling-safely": "Meta Ads",
  "meta-ai-disclosure-rules-2026": "Meta Policy",
  "meta-behavioral-restriction-triggers": "Meta Access",
  "how-to-appeal-meta-ad-account-restriction": "Meta Appeals",
  "meta-business-verification-required-2026": "Meta Verification",
  "meta-business-portfolio-setup-guide": "Meta Setup",
  "does-your-agency-own-your-meta-account": "Meta Ownership",
  "meta-verified-tiers-small-business": "Meta Verified",
  "instagram-wont-connect-meta-business-suite-fix": "Instagram Setup",
  "instagram-algorithm-2026-shares-first": "Instagram Strategy",
  "how-to-use-instagram-trial-reels": "Instagram Reels",
  "instagram-carousel-strategy-2026": "Instagram Carousels",
  "content-pillars-for-small-business": "Content Strategy",
  "canva-grow-vs-meta-ads-strategist": "AI Tools",
  "canva-ai-2-whats-new-2026": "AI Tools",
};

const offers = {
  checklist: {
    label: "Free Meta Business Access Checklist",
    url: "/business-brain-command-pack/meta-checklist",
    cta: "Start with the free checklist",
  },
  vault: {
    label: "Meta Business Fix-It Vault",
    url: "/business-brain-command-pack/meta-vault",
    cta: "Use the Fix-It Vault",
  },
  fiverr: {
    label: "Work with Jasmine on Fiverr",
    url: "https://www.fiverr.com/jazz96designs",
    cta: "Get a written review",
  },
  blog: {
    label: "Free JDesigns Blog",
    url: "/blog/",
    cta: "Read the free guide",
  },
};

const problemPages = [
  {
    slug: "meta-appeal-rejected-in-minutes",
    title: "Meta Appeal Rejected in Minutes? What To Check Before You Appeal Again",
    description: "If Meta rejected your ad account or business appeal in minutes, slow down before submitting another review. Here's what to check first.",
    label: "Meta Appeals",
    searchIntent: "User already appealed and got denied fast.",
    symptoms: [
      "The appeal was denied within minutes",
      "The reply looks automated or generic",
      "Account Quality still shows the restriction",
      "You are tempted to submit the same appeal again",
    ],
    steps: [
      ["Do not submit another rushed appeal", "Multiple generic appeals can make the case look weaker. Pause, gather evidence, and make the next request specific."],
      ["Read the restriction notice in Account Quality", "Write down the exact policy or asset named. Do not appeal based on Ads Manager alone."],
      ["Check whether the issue is ad, ad account, user, Page, or business portfolio level", "Each one has a different path. Fixing the wrong layer wastes the remaining review opportunity."],
      ["Document the correction or the confusion", "If there is a fixable issue, correct it first. If you cannot identify one, say that clearly and professionally."],
    ],
    avoid: [
      "Do not use emotional language about lost revenue.",
      "Do not threaten Meta or mention disputes.",
      "Do not copy-paste the same appeal repeatedly.",
    ],
    primary: offers.checklist,
    secondary: offers.fiverr,
    related: ["/blog/how-to-appeal-meta-ad-account-restriction", "/help/meta-ad-account-restricted"],
  },
  {
    slug: "meta-pixel-not-working",
    title: "Meta Pixel Not Working? Check These Before You Spend More",
    description: "A broken Meta pixel can ruin conversion tracking and optimization. Use this checklist before launching or scaling ads.",
    label: "Meta Pixel",
    searchIntent: "User sees missing, duplicate, or inactive pixel events.",
    symptoms: [
      "Events Manager says no recent activity",
      "Meta Pixel Helper shows duplicate events",
      "Purchases or leads are not showing in Ads Manager",
      "A plugin and manual code may both be firing",
    ],
    steps: [
      ["Test the page with Meta Pixel Helper", "Open the exact landing page and conversion page. Confirm which pixel ID fires and which events appear."],
      ["Use Test Events in Events Manager", "Trigger a real form submit, checkout, or lead action and watch for the event to appear."],
      ["Check for duplicate installs", "Shopify, WordPress plugins, partner integrations, and manual code can stack on top of each other."],
      ["Match the campaign objective to the event volume", "If you do not get enough purchases, optimize toward a stronger upstream event until data improves."],
    ],
    avoid: [
      "Do not scale a campaign before verifying the event path.",
      "Do not judge performance if the tracking foundation is broken.",
      "Do not install a second pixel because the first one looks confusing.",
    ],
    primary: offers.blog,
    secondary: offers.fiverr,
    related: ["/blog/meta-pixel-tracking-guide", "/blog/meta-ads-funnel-strategy"],
  },
  {
    slug: "meta-business-portfolio-access-problems",
    title: "Meta Business Portfolio Access Problems: Who Needs Full Control?",
    description: "If Meta says another admin has to approve access, the issue is usually ownership, full control, or asset assignment.",
    label: "Meta Access",
    searchIntent: "User cannot add people, assign assets, or approve agency access.",
    symptoms: [
      "You can see the Page but cannot assign it",
      "Meta says another admin must approve the change",
      "The agency has asset access but not portfolio access",
      "People, Pages, ad accounts, and Instagram live in different places",
    ],
    steps: [
      ["Find the business portfolio that owns the assets", "Do not start with the Page view. Start inside Business Settings and confirm the portfolio name and ID."],
      ["Check who has full control", "Task access is not enough for ownership, admin changes, or some asset assignments."],
      ["Confirm the Page, Instagram, ad account, and pixel are in the same setup", "Fragmented assets are a common cause of looping access problems."],
      ["Send one clean access request", "Ask for the exact role and assets instead of asking the client to click around blindly."],
    ],
    avoid: [
      "Do not create a second portfolio until ownership is confirmed.",
      "Do not assume Page admin equals business portfolio control.",
      "Do not accept partial access if the job requires setup changes.",
    ],
    primary: offers.checklist,
    secondary: offers.fiverr,
    related: ["/help/who-gets-what-access-meta-business-suite", "/blog/meta-business-portfolio-setup-guide"],
  },
  {
    slug: "meta-ad-account-disabled-vs-restricted",
    title: "Meta Ad Account Disabled vs Restricted: What Is the Difference?",
    description: "Meta restrictions can happen at the ad, ad account, user, Page, or business level. This guide helps you name the problem before acting.",
    label: "Meta Restrictions",
    searchIntent: "User does not know what kind of restriction they have.",
    symptoms: [
      "Ads stopped delivering but the reason is unclear",
      "One account is restricted but other assets still appear active",
      "Business Support and Account Quality show different wording",
      "You are not sure whether to appeal or fix setup first",
    ],
    steps: [
      ["Identify the restricted layer", "Check whether the warning names an ad, ad account, user account, Page, or business portfolio."],
      ["Screenshot the notice before clicking anything", "You need the exact wording, policy, date, and affected asset for a useful review."],
      ["Check whether review is available", "Some cases have an appeal button, some require support, and some only show next-step instructions."],
      ["Match the response to the level", "A Page restriction and an ad account restriction should not get the same appeal language."],
    ],
    avoid: [
      "Do not appeal before reading the full notice.",
      "Do not assume every restriction is caused by creative.",
      "Do not promise yourself or a client that Meta will reverse it.",
    ],
    primary: offers.checklist,
    secondary: offers.vault,
    related: ["/help/meta-ad-account-restricted", "/blog/meta-behavioral-restriction-triggers"],
  },
  {
    slug: "facebook-page-access-lost",
    title: "Lost Access to a Facebook Page? Start With Ownership, Not Panic",
    description: "If your Facebook Page disappeared, is controlled by someone else, or cannot be assigned, start with the ownership trail.",
    label: "Page Access",
    searchIntent: "User lost access to a Facebook Page or cannot manage it.",
    symptoms: [
      "The Page is missing from your Business Suite",
      "A former employee or agency still controls it",
      "You can post but cannot manage business settings",
      "Meta says you do not have permission for an action",
    ],
    steps: [
      ["Check Page access in the Page settings", "Look for people with Facebook access and task access. Screenshot what you can see."],
      ["Check Business Settings for Page ownership", "The portfolio that owns the Page controls higher-level business actions."],
      ["Find the person with full control", "That person may need to approve, transfer, or assign access."],
      ["Prepare evidence before contacting support", "Collect business documents, Page URL, portfolio ID, and screenshots of the access issue."],
    ],
    avoid: [
      "Do not remove people before confirming who has full control.",
      "Do not create a duplicate Page unless there is no recovery path.",
      "Do not send Meta support a vague message with no screenshots.",
    ],
    primary: offers.checklist,
    secondary: offers.vault,
    related: ["/help/who-owns-my-meta-ad-account", "/help/meta-business-portfolio-access-problems"],
  },
  {
    slug: "meta-business-verification-required",
    title: "Meta Business Verification Required: What To Gather First",
    description: "If Meta is asking for business verification, gather the right business details before submitting documents.",
    label: "Business Verification",
    searchIntent: "User has a verification warning and needs a checklist.",
    symptoms: [
      "Meta says business verification is required",
      "Ads are paused or limited until verification is complete",
      "Business name, address, or documents do not match",
      "A previous submission was rejected",
    ],
    steps: [
      ["Confirm the legal business name", "Use the name shown on official documents, not a brand nickname or Page name."],
      ["Match address and phone details", "Small mismatches can create avoidable rejections."],
      ["Use current documents", "Upload documents that clearly show the legal name and address Meta is asking to verify."],
      ["Review the portfolio before resubmitting", "If the wrong portfolio is being verified, the documents may be correct but attached to the wrong setup."],
    ],
    avoid: [
      "Do not keep resubmitting different documents without identifying the mismatch.",
      "Do not verify a duplicate or inactive portfolio by mistake.",
      "Do not assume verification guarantees ad approval.",
    ],
    primary: offers.checklist,
    secondary: offers.fiverr,
    related: ["/help/meta-business-verification-rejected", "/blog/meta-business-verification-required-2026"],
  },
];

const researchRows = [
  ["Meta restriction and appeal problems", "Search results and Meta documentation show users need help identifying the restricted layer, writing appeals, and avoiding repeated generic review requests.", "Meta restricted ad account, request review, appeal rejected, Account Quality"],
  ["Instagram to Facebook connection failures", "Official Meta help and community posts repeatedly point to full control, Page connection, stuck connection states, and professional account linking issues.", "Instagram won't connect to Facebook Page, cannot add Instagram to Business Portfolio"],
  ["Pixel and event tracking errors", "Meta's own help names duplicate pixel events as a common warning; current guides focus on inactive events, duplicate installs, and CAPI deduplication.", "Meta pixel not working, duplicate events detected, Events Manager no activity"],
  ["Business portfolio access confusion", "People confuse asset access with portfolio full control; agency/client handoffs create high-intent troubleshooting searches.", "Meta Business Portfolio access, full control, assign assets, agency owns ad account"],
  ["Business verification friction", "Verification warnings and rejected submissions create checklist-style searches tied to legal names, addresses, documents, and the right portfolio.", "Meta business verification required, verification rejected"],
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function write(file, content) {
  const target = path.join(root, file);
  ensureDir(path.dirname(target));
  fs.writeFileSync(target, content);
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slugText(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractMeta(html, name) {
  const doubleQuoted = html.match(new RegExp(`<meta\\s+name=["']${name}["']\\s+content="([^"]*)"`, "i"));
  if (doubleQuoted) return doubleQuoted[1];
  const singleQuoted = html.match(new RegExp(`<meta\\s+name=["']${name}["']\\s+content='([^']*)'`, "i"));
  return singleQuoted ? singleQuoted[1] : "";
}

function extractTitle(html) {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return stripTags(h1[1]);
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return title ? stripTags(title[1]).replace(/\s+\|\s+JDesigns Strategist.*$/, "") : "";
}

function extractIntro(html) {
  const intro = html.match(/<p class=["']article-intro["'][^>]*>([\s\S]*?)<\/p>/i);
  if (intro) return stripTags(intro[1]);
  const desc = extractMeta(html, "description");
  return desc || "";
}

function getBlogs() {
  return blogSlugs.map((slug) => {
    const file = `blog/${slug}.html`;
    const html = read(file);
    return {
      slug,
      file,
      url: `${siteUrl}/blog/${slug}`,
      localUrl: `/blog/${slug}`,
      title: extractTitle(html),
      description: extractMeta(html, "description") || extractIntro(html),
      intro: extractIntro(html),
      category: blogCategories[slug] || "JDesigns",
    };
  });
}

function addSeoToHtmlFile(file, options = {}) {
  const target = path.join(root, file);
  if (!fs.existsSync(target)) return;
  let html = fs.readFileSync(target, "utf8");
  const isBlog = file.startsWith("blog/") && file !== "blog/index.html";
  const isHelp = file.startsWith("help/") && file !== "help/index.html";
  const title = options.title || extractTitle(html);
  const description = options.description || extractMeta(html, "description") || extractIntro(html);
  const canonical = `${siteUrl}/${file.replace(/index\.html$/, "").replace(/\.html$/, "")}`.replace(/\/$/, file.endsWith("index.html") ? "/" : "");
  const type = isBlog ? "article" : "website";
  const schemaType = isBlog || isHelp ? "Article" : "WebPage";
  const schema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    headline: title,
    description,
    url: canonical,
    dateModified: today,
    author: {
      "@type": "Person",
      name: "Jasmine Stock",
    },
    publisher: {
      "@type": "Organization",
      name: "JDesigns Strategist LLC",
      url: siteUrl,
    },
  };

  const tags = [
    `<link rel="canonical" href="${canonical}"/>`,
    `<meta property="og:type" content="${type}"/>`,
    `<meta property="og:title" content="${escapeHtml(title)}"/>`,
    `<meta property="og:description" content="${escapeHtml(description)}"/>`,
    `<meta property="og:url" content="${canonical}"/>`,
    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
  ].join("\n  ");

  html = html
    .replace(/\n\s*<link rel="canonical"[^>]*\/?>/gi, "")
    .replace(/\n\s*<meta property="og:(type|title|description|url)"[^>]*\/?>/gi, "")
    .replace(/\n\s*<meta name="twitter:card"[^>]*\/?>/gi, "")
    .replace(/\n\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, "");
  html = html.replace("</head>", `  ${tags}\n</head>`);
  fs.writeFileSync(target, html);
}

function makeProblemPage(page) {
  const relatedLinks = page.related
    .map((href) => `<a href="${href}" class="related-card"><span>${escapeHtml(href.replace(/^\/(blog|help)\//, "").replace(/-/g, " "))}</span><span>Read</span></a>`)
    .join("\n        ");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${escapeHtml(page.title)} | JDesigns Strategist</title>
  <meta name="description" content="${escapeHtml(page.description)}"/>
  <link rel="canonical" href="${siteUrl}/help/${page.slug}"/>
  <meta property="og:type" content="article"/>
  <meta property="og:title" content="${escapeHtml(page.title)}"/>
  <meta property="og:description" content="${escapeHtml(page.description)}"/>
  <meta property="og:url" content="${siteUrl}/help/${page.slug}"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    url: `${siteUrl}/help/${page.slug}`,
    dateModified: today,
    author: { "@type": "Person", name: "Jasmine Stock" },
    publisher: { "@type": "Organization", name: "JDesigns Strategist LLC", url: siteUrl },
  })}</script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --bg:#07100a; --surface:#0d1a10; --surface-2:#102516; --border:#1a7a4e; --border-muted:#102b18; --accent:#2ec27e; --accent-dim:#0d3320; --text:#fff; --sage:#c4dccb; --muted:#8aab96; --warn:#f0a090; --radius:14px; --font-sans:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif; --font-serif:Georgia,'Times New Roman',serif; }
    body { font-family:var(--font-sans); background:var(--bg); color:var(--text); min-height:100vh; line-height:1.6; }
    a { color:inherit; text-decoration:none; }
    .page { max-width:760px; margin:0 auto; padding:52px 24px 88px; }
    .wordmark { font-family:var(--font-serif); font-size:13px; letter-spacing:.12em; color:var(--accent); margin-bottom:40px; display:flex; gap:7px; flex-wrap:wrap; }
    .wordmark span { color:var(--muted); }
    .meta-tag { display:inline-flex; font-size:10px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; color:var(--accent); border:1px solid var(--border-muted); padding:4px 10px; border-radius:999px; margin-bottom:16px; }
    h1 { font-family:var(--font-serif); font-size:clamp(2rem,6vw,3.3rem); font-weight:400; line-height:1.08; margin-bottom:18px; letter-spacing:0; }
    .intro { color:var(--sage); font-size:17px; line-height:1.7; max-width:660px; margin-bottom:28px; }
    .intent { background:var(--surface); border:1px solid var(--border-muted); border-left:3px solid var(--accent); border-radius:var(--radius); padding:16px 18px; color:var(--sage); margin:28px 0 36px; }
    .section { margin:38px 0; }
    h2 { font-family:var(--font-serif); font-size:25px; font-weight:400; line-height:1.25; margin-bottom:16px; }
    .grid { display:grid; gap:12px; }
    .card { background:var(--surface); border:1px solid var(--border-muted); border-radius:var(--radius); padding:18px 20px; color:var(--sage); }
    .step { display:grid; grid-template-columns:34px 1fr; gap:14px; align-items:start; }
    .num { width:30px; height:30px; border-radius:50%; display:grid; place-items:center; background:var(--accent-dim); border:1px solid var(--border); color:var(--accent); font-weight:800; font-size:12px; }
    .step strong { display:block; color:var(--text); margin-bottom:4px; }
    ul { margin-left:18px; color:var(--sage); }
    li { margin:8px 0; }
    .warning { background:rgba(180,50,30,.08); border:1px solid rgba(220,80,60,.25); border-left:3px solid #e05a3a; border-radius:var(--radius); padding:18px 20px; color:var(--sage); }
    .cta { background:var(--surface-2); border:1px solid var(--border); border-radius:var(--radius); padding:28px; margin-top:44px; }
    .cta h2 { margin-bottom:8px; }
    .cta p { color:var(--muted); margin-bottom:20px; }
    .btns { display:flex; gap:10px; flex-wrap:wrap; }
    .btn { display:inline-flex; align-items:center; justify-content:center; min-height:42px; padding:10px 18px; border-radius:999px; font-weight:800; font-size:13px; }
    .btn.primary { background:var(--accent); color:#07100a; }
    .btn.secondary { border:1px solid var(--border); color:var(--sage); }
    .related { display:grid; gap:10px; margin-top:18px; }
    .related-card { display:flex; justify-content:space-between; gap:12px; border:1px solid var(--border-muted); border-radius:12px; padding:14px 16px; color:var(--sage); background:rgba(255,255,255,.02); }
    footer { color:var(--muted); font-size:12px; margin-top:54px; display:flex; justify-content:space-between; gap:16px; flex-wrap:wrap; }
  </style>
</head>
<body>
  <main class="page">
    <nav class="wordmark"><a href="/">JDesigns Strategist</a><span>/</span><a href="/help/">Meta Help</a><span>/ ${escapeHtml(page.label)}</span></nav>
    <span class="meta-tag">${escapeHtml(page.label)}</span>
    <h1>${escapeHtml(page.title)}</h1>
    <p class="intro">${escapeHtml(page.description)}</p>
    <div class="intent"><strong>Best for:</strong> ${escapeHtml(page.searchIntent)}</div>

    <section class="section">
      <h2>Signs this is your issue</h2>
      <div class="grid">
        ${page.symptoms.map((item) => `<div class="card">${escapeHtml(item)}</div>`).join("\n        ")}
      </div>
    </section>

    <section class="section">
      <h2>What to do first</h2>
      <div class="grid">
        ${page.steps.map((step, index) => `<div class="card step"><div class="num">${index + 1}</div><div><strong>${escapeHtml(step[0])}</strong>${escapeHtml(step[1])}</div></div>`).join("\n        ")}
      </div>
    </section>

    <section class="section warning">
      <h2>What not to do</h2>
      <ul>
        ${page.avoid.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n        ")}
      </ul>
    </section>

    <section class="cta">
      <h2>Need a cleaner next step?</h2>
      <p>Start with the free checklist if you are still identifying the problem. Use the paid Vault or a written review when there are restrictions, failed appeals, hacked assets, or multiple broken pieces.</p>
      <div class="btns">
        <a class="btn primary" href="${page.primary.url}">${escapeHtml(page.primary.cta)}</a>
        <a class="btn secondary" href="${page.secondary.url}">${escapeHtml(page.secondary.cta)}</a>
      </div>
    </section>

    <section class="section">
      <h2>Related guides</h2>
      <div class="related">
        ${relatedLinks}
      </div>
    </section>

    <footer><span>© 2026 JDesigns Strategist LLC</span><a href="/help/">All Meta help guides</a></footer>
  </main>
</body>
</html>
`;
}

function makeHelpIndex() {
  const existing = [
    ["meta-ad-account-restricted", "My Meta Ad Account Is Restricted", "Find the restricted layer, gather screenshots, and decide whether to appeal."],
    ["instagram-wont-connect-meta-business-suite", "Instagram Won't Connect to Meta Business Suite", "Check ownership, account type, Page connection, and stuck connection states."],
    ["who-owns-my-meta-ad-account", "Who Actually Owns Your Meta Ad Account?", "Confirm whether you or an old agency owns the ad account."],
    ["who-gets-what-access-meta-business-suite", "Who Gets What Access in Meta Business Suite?", "Understand full control, task access, and asset assignment."],
    ["meta-business-verification-rejected", "Meta Business Verification Rejected", "Check legal name, documents, address, and portfolio mismatch issues."],
    ["meta-business-suite-vs-business-manager-vs-business-portfolio", "Business Suite vs Business Manager vs Business Portfolio", "Understand the Meta naming mess before clicking around."],
  ];
  const all = [
    ...problemPages.map((p) => [p.slug, p.title, p.description]),
    ...existing,
  ];
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Meta Business Help - Free Guides & Answers | JDesigns Strategist</title>
  <meta name="description" content="Free answers to common Meta Business Suite, Business Portfolio, Instagram connection, ad account restriction, pixel, and verification questions."/>
  <link rel="canonical" href="${siteUrl}/help/"/>
  <meta property="og:title" content="Meta Business Help - Free Guides & Answers"/>
  <meta property="og:description" content="Free answers to the Meta account, access, pixel, verification, and restriction problems small businesses search for."/>
  <style>
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    :root { --bg:#07100a; --surface:#0d1a10; --border:#1a7a4e; --border-muted:#102b18; --accent:#2ec27e; --text:#fff; --sage:#c4dccb; --muted:#8aab96; --radius:14px; --font-sans:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif; --font-serif:Georgia,'Times New Roman',serif; }
    body { font-family:var(--font-sans); background:var(--bg); color:var(--text); line-height:1.6; min-height:100vh; }
    a { color:inherit; text-decoration:none; }
    .page { max-width:900px; margin:0 auto; padding:52px 24px 88px; }
    .wordmark { font-family:var(--font-serif); font-size:13px; letter-spacing:.12em; color:var(--accent); margin-bottom:42px; }
    h1 { font-family:var(--font-serif); font-size:clamp(2.2rem,7vw,4rem); font-weight:400; line-height:1.05; margin-bottom:18px; }
    .intro { color:var(--sage); max-width:620px; font-size:17px; line-height:1.7; margin-bottom:36px; }
    .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:12px; }
    .card { background:var(--surface); border:1px solid var(--border-muted); border-radius:var(--radius); padding:20px; min-height:152px; display:flex; flex-direction:column; justify-content:space-between; }
    .card:hover { border-color:var(--border); }
    .card h2 { font-family:var(--font-serif); font-size:20px; font-weight:400; line-height:1.25; margin-bottom:10px; }
    .card p { color:var(--muted); font-size:14px; line-height:1.55; }
    .arrow { color:var(--accent); font-size:13px; font-weight:800; margin-top:18px; }
    .cta { border:1px solid var(--border); border-radius:var(--radius); padding:28px; margin:46px 0 0; background:#102516; }
    .cta h2 { font-family:var(--font-serif); font-weight:400; margin-bottom:8px; }
    .cta p { color:var(--muted); margin-bottom:18px; }
    .btn { display:inline-flex; padding:11px 18px; border-radius:999px; background:var(--accent); color:#07100a; font-weight:800; font-size:13px; }
    footer { color:var(--muted); font-size:12px; margin-top:54px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:14px; }
  </style>
</head>
<body>
  <main class="page">
    <div class="wordmark"><a href="/">JDesigns Strategist</a> / Meta Help</div>
    <h1>Meta Business help for the problems people actually search.</h1>
    <p class="intro">Fast, plain-English guides for ad account restrictions, rejected appeals, Instagram connection issues, Business Portfolio access, pixel errors, Page ownership, and verification problems.</p>
    <section class="grid">
      ${all.map(([slug, title, desc]) => `<a class="card" href="/help/${slug}"><div><h2>${escapeHtml(title)}</h2><p>${escapeHtml(desc)}</p></div><span class="arrow">Read guide</span></a>`).join("\n      ")}
    </section>
    <section class="cta">
      <h2>Start with the free emergency checklist.</h2>
      <p>If you are locked out, restricted, or confused by Meta's setup, gather the right screenshots and facts before you appeal, rebuild, or hire help.</p>
      <a class="btn" href="/business-brain-command-pack/meta-checklist">Get the free checklist</a>
    </section>
    <footer><span>© 2026 JDesigns Strategist LLC</span><a href="/blog/">Free blog library</a></footer>
  </main>
</body>
</html>
`;
}

function socialCopy(article, index) {
  const baseUrl = `${siteUrl}/blog/${article.slug}`;
  const offersByCategory = {
    "Meta Appeals": "Grab the free Meta Business Access Checklist before you submit another appeal.",
    "Meta Access": "Start with the free Meta Business Access Checklist so you know what screenshots and access details to gather.",
    "Meta Ownership": "Start with the free Meta Business Access Checklist before you create another ad account.",
    "Instagram Setup": "Use the free Meta checklist to untangle the Page, Instagram, and Business Portfolio connection.",
    "Meta Pixel": "Read the guide before spending another dollar on a campaign with broken tracking.",
  };
  const cta = offersByCategory[article.category] || "Read the full free guide on jdesigns.info.";
  const variants = [
    {
      type: "Pain Point",
      hook: article.title.replace(/\.$/, ""),
      body: article.intro.split(". ").slice(0, 2).join(". ").replace(/\.$/, "."),
      caption: `${article.title}\n\n${article.description}\n\n${cta}\n\nRead it here: ${baseUrl}\n\n#MetaAds #FacebookAds #SmallBusinessMarketing #JDesignsStrategist`,
    },
    {
      type: "Mistake",
      hook: "The mistake is not the tool. It is the order of operations.",
      body: `Most small businesses try to fix ${article.category.toLowerCase()} problems by clicking around. Name the problem first, then choose the next step.`,
      caption: `Most Meta problems get worse when you start clicking before you know what layer is broken.\n\nThis guide breaks down the issue in plain English: ${article.title}\n\n${baseUrl}\n\n#MetaBusinessSuite #MetaAdsHelp #FacebookBusiness #SmallBusinessOwner`,
    },
    {
      type: "Checklist",
      hook: "Before you do anything else, check this.",
      body: `Save this guide if ${article.title.toLowerCase()} is the problem you are dealing with right now.`,
      caption: `Before you appeal, rebuild, reconnect, or scale, slow down and check the setup.\n\nI wrote this guide for small business owners who need a clear next step, not more Meta confusion.\n\n${baseUrl}\n\n#MetaTips #FacebookAdsManager #MarketingHelp #BusinessOwnerTips`,
    },
    {
      type: "Truth",
      hook: "Meta usually gives you symptoms, not a diagnosis.",
      body: `The real win is knowing whether this is access, policy, tracking, funnel, creative, or ownership before money gets wasted.`,
      caption: `Meta warnings are rarely written in normal human language.\n\nThat is why I built a free guide for this exact issue: ${article.title}\n\nRead it here: ${baseUrl}\n\n#MetaAdsStrategy #DigitalMarketingTips #InstagramForBusiness #FacebookAdsTips`,
    },
    {
      type: "CTA",
      hook: "Stop guessing inside Meta.",
      body: `${article.description} Free guide, no email required.`,
      caption: `If this is happening in your account, start here instead of guessing inside Business Suite.\n\n${article.title}\n\nFree guide: ${baseUrl}\n\n#MetaBusiness #FacebookAdsHelp #InstagramBusiness #SmallBusinessSupport`,
    },
  ];
  return variants[index];
}

function makeSocialCard(article, variant, index) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${escapeHtml(article.title)} - Social Post ${index + 1}</title>
  <style>
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    body { min-height:100vh; display:grid; place-items:center; background:#dfe8df; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif; }
    .frame { width:1080px; height:1080px; background:#07100a; color:#fff; position:relative; overflow:hidden; display:flex; flex-direction:column; padding:78px; }
    .frame::before { content:""; position:absolute; inset:38px; border:1px solid rgba(46,194,126,.24); pointer-events:none; }
    .kicker { color:#2ec27e; font-weight:800; font-size:26px; letter-spacing:.14em; text-transform:uppercase; margin-bottom:46px; }
    h1 { font-family:Georgia,'Times New Roman',serif; font-weight:400; font-size:${variant.hook.length > 72 ? "70px" : "82px"}; line-height:1.02; letter-spacing:0; max-width:900px; }
    .body { margin-top:42px; color:#c4dccb; font-size:34px; line-height:1.32; max-width:850px; }
    .footer { margin-top:auto; display:flex; align-items:center; justify-content:space-between; gap:26px; border-top:1px solid rgba(46,194,126,.24); padding-top:30px; color:#8aab96; font-size:25px; }
    .brand { color:#fff; font-family:Georgia,'Times New Roman',serif; }
    .tag { color:#2ec27e; font-weight:800; }
  </style>
</head>
<body>
  <article class="frame">
    <div class="kicker">${escapeHtml(article.category)} / ${escapeHtml(variant.type)}</div>
    <h1>${escapeHtml(variant.hook)}</h1>
    <p class="body">${escapeHtml(variant.body)}</p>
    <div class="footer"><span class="brand">JDesigns Strategist</span><span class="tag">jdesigns.info</span></div>
  </article>
</body>
</html>
`;
}

function makeSocialIndex(blogs) {
  const items = blogs.flatMap((article) =>
    Array.from({ length: 5 }, (_, index) => {
      const variant = socialCopy(article, index);
      return { article, variant, index };
    })
  );
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>JDesigns 30-Day Organic Traffic Content Kit</title>
  <meta name="robots" content="noindex"/>
  <style>
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    body { background:#07100a; color:#fff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif; line-height:1.6; }
    a { color:inherit; text-decoration:none; }
    .page { max-width:1100px; margin:0 auto; padding:48px 24px 88px; }
    h1 { font-family:Georgia,'Times New Roman',serif; font-weight:400; font-size:48px; line-height:1.05; margin-bottom:14px; }
    .intro { color:#c4dccb; max-width:720px; margin-bottom:28px; }
    .tools { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:36px; }
    .tool { border:1px solid #1a7a4e; color:#2ec27e; border-radius:999px; padding:9px 14px; font-weight:800; font-size:13px; }
    .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:14px; }
    .card { background:#0d1a10; border:1px solid #102b18; border-radius:14px; padding:18px; }
    .card h2 { font-family:Georgia,'Times New Roman',serif; font-weight:400; font-size:20px; line-height:1.25; margin-bottom:8px; }
    .meta { color:#8aab96; font-size:13px; margin-bottom:14px; }
    .links { display:flex; flex-wrap:wrap; gap:8px; }
    .links a { background:#102516; border:1px solid #1a7a4e; border-radius:999px; color:#c4dccb; padding:7px 10px; font-size:12px; font-weight:800; }
  </style>
</head>
<body>
  <main class="page">
    <h1>30-Day Organic Traffic Content Kit</h1>
    <p class="intro">95 screenshot-ready HTML posts made from the 19 JDesigns blog guides, plus captions, CTAs, hashtags, and URLs for scheduling in Meta Business Suite.</p>
    <div class="tools">
      <a class="tool" href="./captions.md">Captions Markdown</a>
      <a class="tool" href="./captions.csv">Captions CSV</a>
      <a class="tool" href="./traffic-research.md">Search Research</a>
    </div>
    <section class="grid">
      ${blogs.map((article) => `<div class="card"><h2>${escapeHtml(article.title)}</h2><div class="meta">${escapeHtml(article.category)} - 5 posts</div><div class="links">${[1,2,3,4,5].map((n) => `<a href="./${article.slug}/post-${String(n).padStart(2, "0")}.html">Post ${n}</a>`).join("")}</div></div>`).join("\n      ")}
    </section>
  </main>
</body>
</html>
`;
}

function makeCaptions(blogs) {
  let md = `# JDesigns 30-Day Organic Traffic Captions\n\nGenerated ${today}. Jasmine approves before posting.\n\n`;
  const csvRows = [["article_slug", "post_number", "type", "caption", "url"]];
  blogs.forEach((article) => {
    md += `## ${article.title}\n\n`;
    for (let index = 0; index < 5; index += 1) {
      const variant = socialCopy(article, index);
      const cardPath = `marketing/social-posts/${article.slug}/post-${String(index + 1).padStart(2, "0")}.html`;
      md += `### Post ${index + 1} - ${variant.type}\n\n`;
      md += `Screenshot HTML: ${cardPath}\n\n`;
      md += `${variant.caption}\n\n---\n\n`;
      csvRows.push([article.slug, String(index + 1), variant.type, variant.caption, `${siteUrl}/blog/${article.slug}`]);
    }
  });
  const csv = csvRows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n") + "\n";
  return { md, csv };
}

function makeResearchDoc() {
  return `# JDesigns Organic Traffic Research Map

Generated ${today}. This is the first search-backed traffic push for the current content library.

## Highest-intent problems to prioritize

${researchRows.map((row, index) => `### ${index + 1}. ${row[0]}\n\n${row[1]}\n\nSearch language to use: ${row[2]}\n`).join("\n")}

## 30-day posting structure

- Week 1: Meta access, restrictions, appeals, and ownership.
- Week 2: Instagram connection, Business Portfolio setup, and Page access.
- Week 3: Pixel, verification, campaign setup, funnel sequence, and scaling.
- Week 4: Instagram strategy, carousels, Trial Reels, Canva AI, and strategist-vs-tool education.

## CTA ladder

- Free first step: Meta Business Access Emergency Checklist.
- Paid self-serve: Meta Business Fix-It Vault.
- Direct help: Fiverr Meta Ecosystem Review or Meta Ads Strategy when the issue is complex or revenue-critical.

## Guardrails

- Do not promise reinstatement, ad approval, revenue, leads, or Meta outcomes.
- Use "review," "check," "guide," "next step," and "action plan."
- Avoid "I can fix this guaranteed" language.

## Sources checked

- Meta help: Instagram account cannot be added to a business portfolio.
- Meta help: request a review for a restricted advertising account.
- Meta help: Pixel duplicate event warnings in Events Manager.
- Meta advertising standards: review paths for rejected ads and restricted assets.
- Current search results and community discussions around Instagram connection failures, disabled ad accounts, duplicate pixel events, business portfolio access, and verification problems.
`;
}

function makeSitemap() {
  const htmlFiles = [];
  function walk(dir) {
    fs.readdirSync(path.join(root, dir), { withFileTypes: true }).forEach((entry) => {
      const rel = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === ".git" || entry.name === ".netlify" || entry.name === "marketing") return;
        walk(rel);
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        htmlFiles.push(rel);
      }
    });
  }
  walk(".");
  const urls = htmlFiles
    .map((file) => {
      const loc = `${siteUrl}/${file.replace(/^\.\//, "").replace(/index\.html$/, "").replace(/\.html$/, "")}`.replace(/\/$/, "/");
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
    })
    .sort()
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function main() {
  const blogs = getBlogs();

  problemPages.forEach((page) => write(`help/${page.slug}.html`, makeProblemPage(page)));
  write("help/index.html", makeHelpIndex());

  blogs.forEach((article) => {
    for (let index = 0; index < 5; index += 1) {
      const variant = socialCopy(article, index);
      write(`marketing/social-posts/${article.slug}/post-${String(index + 1).padStart(2, "0")}.html`, makeSocialCard(article, variant, index));
    }
  });

  const captions = makeCaptions(blogs);
  write("marketing/social-posts/index.html", makeSocialIndex(blogs));
  write("marketing/social-posts/captions.md", captions.md);
  write("marketing/social-posts/captions.csv", captions.csv);
  write("marketing/social-posts/traffic-research.md", makeResearchDoc());

  write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);

  const publicHtmlFiles = [];
  function collectPublicHtml(dir) {
    fs.readdirSync(path.join(root, dir), { withFileTypes: true }).forEach((entry) => {
      const rel = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === ".git" || entry.name === ".netlify" || entry.name === "marketing" || entry.name === "scripts") return;
        collectPublicHtml(rel);
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        publicHtmlFiles.push(rel.replace(/^\.\//, ""));
      }
    });
  }
  collectPublicHtml(".");
  publicHtmlFiles.forEach((file) => addSeoToHtmlFile(file));

  write("sitemap.xml", makeSitemap());
}

main();
