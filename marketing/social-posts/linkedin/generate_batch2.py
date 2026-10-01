import os
OUT_DIR = "/Users/jasminestock/Documents/JDesigns/JDesigns-Website/marketing/social-posts/linkedin"

BASE_CSS = """
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #07100a; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; }
.frame {
  width: 1080px; height: 1080px; background: #07100a; color: #fff;
  position: relative; overflow: hidden; display: flex; flex-direction: column;
  justify-content: center; gap: 36px;
  padding: 68px 70px 140px;
}
.frame::before {
  content: ""; position: absolute; inset: 36px;
  border: 1px solid rgba(46,194,126,.2); pointer-events: none; z-index: 10;
}
.foot {
  position: absolute; bottom: 0; left: 0; right: 0; background: #0d1a10;
  padding: 28px 70px; display: flex; align-items: center; justify-content: space-between;
  border-top: 1px solid rgba(46,194,126,.18);
}
.foot-left { font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-size: 22px; color: #c4dccb; line-height: 1.25; max-width: 700px; }
.foot-brand { font-family: Georgia, 'Times New Roman', serif; font-size: 22px; color: #2ec27e; white-space: nowrap; }
.kicker { font-size: 20px; font-weight: 800; letter-spacing: .15em; text-transform: uppercase; color: #2ec27e; }
.top h1 { font-family: Georgia, 'Times New Roman', serif; font-weight: 400; font-size: 46px; line-height: 1.15; margin-top: 18px; max-width: 900px; }
.top h1 em { color: #2ec27e; font-style: italic; }
.stat-row { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 10px; }
.stat-chip { flex: 1; min-width: 200px; background: #0d1a10; border: 1px solid rgba(46,194,126,.3); border-radius: 10px; padding: 26px 24px; }
.stat-chip .sv { font-family: Georgia, 'Times New Roman', serif; font-size: 44px; color: #2ec27e; line-height: 1; }
.stat-chip .sl { font-size: 15px; color: #c4dccb; margin-top: 8px; line-height: 1.35; }
.tag-row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
.tag { font-size: 14px; font-weight: 700; color: #2ec27e; border: 1px solid rgba(46,194,126,.35); background: rgba(46,194,126,.07); padding: 8px 16px; border-radius: 999px; }
"""

def base(kicker, headline, foot_left, body_html=""):
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><title>{kicker}</title>
<style>{BASE_CSS}</style></head><body>
<article class="frame">
  <div class="top">
    <div class="kicker">{kicker}</div>
    <h1>{headline}</h1>
  </div>
  {body_html}
  <div class="foot">
    <div class="foot-left">{foot_left}</div>
    <div class="foot-brand">✦ JDesigns Strategist</div>
  </div>
</article>
</body></html>"""

def stat_chips(items):
    chips = "".join(f'<div class="stat-chip"><div class="sv">{v}</div><div class="sl">{l}</div></div>' for v, l in items)
    return f'<div class="stat-row">{chips}</div>'

def tags(items):
    t = "".join(f'<div class="tag">{i}</div>' for i in items)
    return f'<div class="tag-row">{t}</div>'

posts = []

posts.append(("cur-01-placement-exclusions", base(
    "✦ Meta Update — This Month",
    'You can no longer tell Meta <em>"never show my ad here."</em>',
    "That decision is now made once, account-wide — not per campaign, per ad set.",
    tags(["Placement exclusions removed", "Value rules only bid down, don't block", "Staged rollout since Aug 21, 2026"])
)))

posts.append(("cur-02-advantage-creative", base(
    "✦ Meta Update — This Month",
    'Meta\'s AI touched your ad creative. <em>Did you notice?</em>',
    "One advertiser's product photo came back with two handlebars. Meta didn't ask first.",
    tags(["Advantage+ Creative can auto-alter images", "Disabled settings can silently re-enable", "Advertiser is responsible for reviewing output"])
)))

posts.append(("cur-03-fiverr-20-dollar-gigs", base(
    "✦ What $20 Actually Buys",
    'Most Meta recovery gigs are $10–30. <em>Here\'s what that can\'t do.</em>',
    "Meta reportedly gates live-support escalation behind real ad spend — not a $20 gig.",
    stat_chips([("$10–30", "Typical Fiverr recovery gig"), ("$1,000+/mo", "Reported spend to reach a Policy Specialist")])
)))

posts.append(("cur-04-ai-ads-banned-myth", base(
    "✦ Myth vs. Meta's Own Rules",
    'Can AI managing your ads get you banned? <em>Meta just answered that itself.</em>',
    "The real trigger was never \"AI\" — it's unauthorized automation.",
    tags(["Meta Ads AI Connectors launched April 2026", "Sanctioned: Claude, ChatGPT, similar tools", "Real risk: headless scripts, burst API calls"])
)))

posts.append(("cur-05-andromeda-creative", base(
    "✦ The Real Lever",
    'One thing decides more than budget, <em>targeting, and timing combined.</em>',
    "Check Quality Ranking before you touch your budget.",
    stat_chips([("~56%", "Of performance, reported to be creative quality"), ("3", "Ranking diagnostics in Ads Manager")])
)))

posts.append(("cur-06-facebook-link-limit", base(
    "✦ Meta Update — Testing Now",
    'Facebook is testing a <em>2-link-a-month limit.</em>',
    "If your strategy depends on caption links, that's about to stop working.",
    tags(["Standard Pages capped at 2 link posts/mo (testing)", "Workaround: post link in comments", "Or lean on bio-link distribution"])
)))

posts.append(("cur-07-meta-official-ai-numbers", base(
    "✦ Meta's Own Numbers",
    'What Meta\'s AI is actually doing <em>inside ad accounts right now.</em>',
    "As AI does more of the matching, clean tracking matters more — not less.",
    stat_chips([("+3.5%", "Facebook click lift (GEM model)"), ("+24%", "Incremental-conversion lift, attribution"), ("$10B", "AI video gen revenue run-rate, Q4 2025")])
)))

posts.append(("cur-08-meta-verified-tiers", base(
    "✦ What You're Actually Paying For",
    '$14/mo or $500/mo — <em>what\'s the real difference?</em>',
    "Most small businesses don't need the top tier. Here's who does.",
    stat_chips([("Standard", "$11.99–14.99/mo"), ("Premium", "$119.99–149.99/mo · 24/7 chat"), ("Max", "$349.99–499.99/mo · monitored")])
)))

posts.append(("cur-09-instagram-your-algorithm", base(
    "✦ Instagram Update",
    'You can now tell Instagram <em>what you don\'t want to see.</em>',
    "Followers can now actively prune content types — not just scroll past them.",
    tags(["\"Your Algorithm\" tool live on main Feed", "Rolled out June 2026", "A real reason reach can shift with no posting change"])
)))

posts.append(("cur-10-agency-owns-your-account", base(
    "✦ Worth Checking Today",
    'Does your agency actually <em>own your Meta ad account?</em>',
    "If the relationship ends, what you keep depends on this one setting.",
    tags(["Check: who owns the Business Portfolio", "Common: agency builds assets under their own name", "Client loses data when the relationship ends"])
)))

os.makedirs(OUT_DIR, exist_ok=True)
for slug, html in posts:
    with open(os.path.join(OUT_DIR, f"{slug}.html"), "w") as f:
        f.write(html)
    print("wrote", slug)
