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
.foot-left { font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-size: 24px; color: #c4dccb; line-height: 1.25; max-width: 700px; }
.foot-brand { font-family: Georgia, 'Times New Roman', serif; font-size: 22px; color: #2ec27e; white-space: nowrap; }
.kicker { font-size: 20px; font-weight: 800; letter-spacing: .15em; text-transform: uppercase; color: #2ec27e; }
.top { margin-bottom: 44px; }
.top h1 { font-family: Georgia, 'Times New Roman', serif; font-weight: 400; font-size: 48px; line-height: 1.15; margin-top: 18px; max-width: 880px; }
.top h1 em { color: #2ec27e; font-style: italic; }
.stat-row { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 10px; }
.stat-chip { flex: 1; min-width: 200px; background: #0d1a10; border: 1px solid rgba(46,194,126,.3); border-radius: 10px; padding: 28px 26px; }
.stat-chip .sv { font-family: Georgia, 'Times New Roman', serif; font-size: 52px; color: #2ec27e; line-height: 1; }
.stat-chip .sl { font-size: 17px; color: #c4dccb; margin-top: 10px; line-height: 1.35; }
.panels { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 10px; }
.panel { border-radius: 4px; padding: 40px 42px; display: flex; flex-direction: column; gap: 18px; }
.panel-bad { background: rgba(224,90,58,.08); border: 1px solid rgba(220,80,60,.3); }
.panel-good { background: #0a1a10; border: 1px solid rgba(46,194,126,.35); }
.panel-head { font-size: 20px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,.1); }
.panel-bad .panel-head { color: #e0785a; }
.panel-good .panel-head { color: #2ec27e; }
.panel-body { font-size: 24px; line-height: 1.45; color: #c4dccb; }
.quote-wrap { display: flex; flex-direction: column; gap: 26px; }
.stars { color: #2ec27e; font-size: 34px; letter-spacing: 4px; }
.quote-text { font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-size: 34px; line-height: 1.4; color: #fff; max-width: 880px; }
.quote-author { font-size: 18px; color: #8aab96; }
"""

def base(kicker, headline, foot_left, body_html):
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

posts = []

# 1. Urgency hook
posts.append(("post-01-urgency", base(
    "✦ Holiday Readiness",
    'Christmas is decided <em>before December.</em>',
    "If you wait until November, you're not planning a holiday campaign — you're reacting to one.",
    stat_chips([("332", "Completed Orders"), ("4.8★", "Average Rating"), ("Now", "Is The Window")])
)))

# 2. Village Acres funnel
posts.append(("post-02-village-acres", base(
    "✦ Proof — Village Acres",
    '421 views. <em>161 real leads.</em>',
    "The top-of-funnel spend isn't the cost of doing business — it's what makes this possible.",
    stat_chips([("421", "TOF Landing Views · $0.38 ea"), ("38%", "Converted to Lead"), ("161", "Real Leads · $1.90 ea")])
)))

# 3. Expat Healthcare 360
posts.append(("post-03-expat-healthcare", base(
    "✦ Proof — Expat Healthcare 360",
    '4 markets. <em>Within 2¢ of each other.</em>',
    "Same campaign, four unrelated markets, launched the same day — first 6 days of data.",
    stat_chips([("$0.36", "Malaysia"), ("$0.37", "Thailand & Philippines"), ("$0.35", "EU + Turkey"), ("$0.36", "Hong Kong & UAE")])
)))

# 4. Pinterest proof
posts.append(("post-04-pinterest-proof", base(
    "✦ Proof — Pinterest",
    '2.81M lifetime impressions. <em>Still climbing.</em>',
    "Pins don't expire the way a Reel or Feed post does — this is the compounding effect.",
    stat_chips([("2.81M", "Lifetime Impressions"), ("4.94M", "Automated Pin Pipeline")])
)))

# 5. Month 1 Foundation
posts.append(("post-05-month1-foundation", base(
    "✦ The 6-Month Path — Month 1",
    'Foundation: <em>is the account actually clean?</em>',
    "Meta setup, tracking, a proven offer, a working landing path — no creative rescues these.",
    stat_chips([("Step 1", "Meta Account & Ads Audit"), ("Aug", "When This Starts")])
)))

# 6. Month 2 Build
posts.append(("post-06-month2-build", base(
    "✦ The 6-Month Path — Month 2",
    'Build: <em>launch the audience everything needs.</em>',
    "You can't retarget an audience that doesn't exist yet.",
    stat_chips([("Step 2", "Top-of-Funnel Campaign Live"), ("Sep", "When This Starts")])
)))

# 7. Retention proof
posts.append(("post-07-retention", base(
    "✦ Track Record",
    '332 completed orders. <em>Most come back.</em>',
    '"This is our 3rd project with Jasmine and her work is quality every time." — bonnie_coberly',
    stat_chips([("3rd", "Order — bonnie_coberly"), ("7th+", "Order — chrisjevas"), ("332", "Total Completed Orders")])
)))

# 8. Cadence — two panel
posts.append(("post-08-cadence", base(
    "✦ How This Is Managed",
    'Weekly review. <em>Not daily panic.</em>',
    "More edits don't create better holiday results — Meta's own guidance backs this up.",
    """<div class="panels">
        <div class="panel panel-bad">
          <div class="panel-head">Not This</div>
          <div class="panel-body">Daily edits, a panicked mid-month rebuild, one red-and-snowflake ad standing in for a whole creative strategy.</div>
        </div>
        <div class="panel panel-good">
          <div class="panel-head">This Instead</div>
          <div class="panel-body">Weekly review, a new campaign left untouched for its first month, creative varied by hook, angle, and format.</div>
        </div>
      </div>"""
)))

# 9. Months 4-5 Scale into peak
posts.append(("post-09-scale-into-peak", base(
    "✦ The 6-Month Path — Months 4–5",
    'Scale into peak, <em>already built.</em>',
    "Ad costs rise industry-wide during BF/CM — the advantage is being ready, not avoiding it.",
    stat_chips([("Step 4-5", "Organic + Ads Through Peak"), ("Nov-Dec", "When This Runs")])
)))

# 10. Closing testimonial — quote style
posts.append(("post-10-closing-testimonial", f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><title>closing testimonial</title>
<style>{BASE_CSS}</style></head><body>
<article class="frame">
  <div class="top">
    <div class="kicker">✦ Client Proof</div>
  </div>
  <div class="quote-wrap">
    <div class="stars">★★★★★</div>
    <div class="quote-text">"A clear, data-driven strategy centered around building a strong top-of-funnel audience, improving creative direction, and creating a more effective customer journey."</div>
    <div class="quote-author">— babysonjay, Fiverr client, Canada</div>
  </div>
  <div class="foot">
    <div class="foot-left">The window to build this properly — not rush it in November — is open now.</div>
    <div class="foot-brand">✦ JDesigns Strategist</div>
  </div>
</article>
</body></html>"""))

os.makedirs(OUT_DIR, exist_ok=True)
for slug, html in posts:
    path = os.path.join(OUT_DIR, f"{slug}.html")
    with open(path, "w") as f:
        f.write(html)
    print("wrote", path)
