"""One 1280x769 thumbnail per gig. Each has its own layout + mock visual so the services read as different. Headshot slot auto-fills from headshots/<slug>.png."""
import subprocess, os
T = open('template.html').read()
def glow(x,y,c): return f"radial-gradient(ellipse 70% 60% at {x}% {y}%,{c} 0%,transparent 58%),radial-gradient(ellipse 55% 45% at 50% 105%,rgba(10,55,35,.28) 0%,transparent 55%)"
G='rgba(30,120,70,.34)'
V={}
# 1 access: status panel
V['meta-access']=('''<div class="panel" style="display:flex;flex-direction:column;gap:12px">
 <div class="row" style="justify-content:space-between"><span class="t" style="font-size:19px;color:var(--muted)">Business Suite &middot; Access check</span><span class="pill bad">Needs review</span></div>
 <div class="row"><span class="chk">&#10003;</span><span class="t">Admin access</span><span class="pill ok" style="margin-left:auto">Confirmed</span></div>
 <div class="row"><span class="chk" style="color:#e6c35a;border-color:#6b5a1c;background:#2a2410">!</span><span class="t">Business verification</span><span class="pill warn" style="margin-left:auto">Pending</span></div>
 <div class="row"><span class="chk" style="color:#f08a8a;border-color:#6b2a2a;background:#2a1212">&times;</span><span class="t">Ad account</span><span class="pill bad" style="margin-left:auto">Restricted</span></div></div>''','','row')
# 2 ads: 3-step funnel + ad card
V['meta-ads']=('''<div class="row" style="gap:16px;align-items:stretch">
 <div class="panel" style="width:210px;padding:12px"><div style="height:92px;border-radius:10px;background:linear-gradient(135deg,#17402b,#0d1a10);margin-bottom:10px"></div><div style="height:9px;width:80%;background:#2a4735;border-radius:5px;margin-bottom:7px"></div><div style="height:9px;width:55%;background:#1b2e22;border-radius:5px;margin-bottom:12px"></div><div class="pill ok" style="text-align:center;font-size:12px">Learn more</div></div>
 <div style="display:flex;flex-direction:column;gap:10px;flex:1;justify-content:center">
  <div class="panel row" style="padding:12px 18px"><span class="chk">1</span><span class="t">Strategy</span></div>
  <div class="panel row" style="padding:12px 18px"><span class="chk">2</span><span class="t">Setup</span></div>
  <div class="panel row" style="padding:12px 18px"><span class="chk">3</span><span class="t">Optimize</span></div></div></div>''','','row-reverse')
# 3 audit: review bars
V['brand-audit']=('''<div class="panel" style="display:flex;flex-direction:column;gap:14px">
 <div class="row"><span class="t" style="width:120px">Brand</span><div class="bar"><b style="width:78%"></b></div></div>
 <div class="row"><span class="t" style="width:120px">Offer</span><div class="bar"><b style="width:55%"></b></div></div>
 <div class="row"><span class="t" style="width:120px">Website</span><div class="bar"><b style="width:68%"></b></div></div>
 <div class="row"><span class="t" style="width:120px">Social</span><div class="bar"><b style="width:42%"></b></div></div></div>''','','row')
# 4 page setup: profile mock
V['page-setup']=('''<div class="panel" style="padding:0;overflow:hidden">
 <div style="height:70px;background:linear-gradient(135deg,#17402b,#0d2418)"></div>
 <div class="row" style="padding:0 20px 16px;margin-top:-26px;gap:16px"><div style="width:68px;height:68px;border-radius:50%;background:var(--card2);border:3px solid var(--card);flex-shrink:0"></div>
 <div style="flex:1;padding-top:26px"><div style="height:12px;width:55%;background:#2a4735;border-radius:6px"></div></div>
 <div style="padding-top:26px;display:flex;gap:8px"><span class="pill ok">Facebook &#10003;</span><span class="pill ok">Instagram &#10003;</span></div></div></div>''','','row-reverse')
# 5 content: calendar grid
cells=''.join(f'<i style="width:44px;height:36px;border-radius:9px;background:{"var(--green)" if i%3 else "#17402b"};opacity:{1 if i%3 else .9}"></i>' for i in range(21))
V['content-30day']=(f'''<div class="panel" style="padding:18px 22px"><div class="row" style="justify-content:space-between;margin-bottom:12px"><span class="t" style="font-size:19px;color:var(--muted)">30-day content calendar</span><span class="pill ok">Scheduled</span></div><div style="display:flex;flex-wrap:wrap;gap:8px">{cells}</div></div>''','','row')
# 6 strategy: roadmap
V['social-strategy']=('''<div style="display:flex;gap:12px">'''+''.join(f'<div class="panel" style="flex:1;padding:14px 16px"><div style="font-size:14px;font-weight:800;letter-spacing:.1em;color:var(--green)">WEEK {i}</div><div style="height:9px;width:85%;background:#2a4735;border-radius:5px;margin:12px 0 7px"></div><div style="height:9px;width:60%;background:#1b2e22;border-radius:5px"></div></div>' for i in range(1,5))+'</div>','','row-reverse')
# 7 pinterest: masonry pins
V['pinterest']=('''<div style="display:flex;gap:12px;align-items:flex-start">
 <div class="panel" style="width:120px;height:150px;padding:0;background:linear-gradient(160deg,#17402b,#0d1a10)"></div>
 <div class="panel" style="width:120px;height:190px;padding:0;background:linear-gradient(160deg,#122016,#1a7a4e)"></div>
 <div class="panel" style="width:120px;height:130px;padding:0;background:linear-gradient(160deg,#0d2418,#2a4735)"></div>
 <div class="panel row" style="flex:1;height:70px;align-self:center"><span class="chk">&#9719;</span><span class="t" style="font-size:19px">Posts on schedule</span></div></div>''','','row')
# 8 claude brain: file tree
V['claude-brain']=('''<div class="panel" style="font-family:var(--mono);font-size:20px;line-height:1.7;color:var(--label)">
 <div style="color:var(--green)">&#9656; business-brain/</div>
 <div>&nbsp;&nbsp;identity.md &nbsp;<span style="color:var(--muted)">who you are</span></div>
 <div>&nbsp;&nbsp;voice.md &nbsp;<span style="color:var(--muted)">how you sound</span></div>
 <div>&nbsp;&nbsp;workflows/ &nbsp;<span style="color:var(--muted)">repeatable tasks</span></div></div>''','','row-reverse')
GIGS=[
 ("meta-access","Meta Business Access","Business Suite <em>not working?</em>","Access, verification and restriction help.",glow(10,0,G)),
 ("meta-ads","Facebook &amp; Instagram Ads","Ads set up <em>the right way.</em>","Strategy, setup and optimization.",glow(90,10,'rgba(18,90,110,.26)')),
 ("brand-audit","Brand &amp; Business Audit","Is your brand <em>actually working?</em>","Offer, website and social, reviewed.",glow(15,100,'rgba(60,110,40,.30)')),
 ("page-setup","Page Setup","Pages set up <em>right the first time.</em>","Facebook and Instagram, connected.",glow(85,0,G)),
 ("content-30day","30-Day Content","30 days of content, <em>done for you.</em>","Posts and captions, scheduled.",glow(0,50,'rgba(30,120,70,.30)')),
 ("social-strategy","Social Strategy","Know what to post, <em>where and why.</em>","A 30-day plan built for your business.",glow(100,60,'rgba(18,72,110,.26)')),
 ("pinterest","Pinterest Automation","Pins that post <em>on schedule.</em>","A Claude-powered posting workflow.",glow(20,0,'rgba(60,120,60,.30)')),
 ("claude-brain","Claude AI Brain","Your business, <em>organized in Claude.</em>","A working business brain, same day.",glow(80,100,'rgba(30,120,70,.34)')),
]
os.makedirs('png',exist_ok=True)
for slug,eb,h,sub,gl in GIGS:
    vis,css,dr=V[slug]
    photo=f'<img src="headshots/{slug}.png" alt="Jasmine">' if os.path.exists(f'headshots/{slug}.png') else '<span>Headshot here</span>'
    out=(T.replace('{{GLOW}}',gl).replace('{{DIR}}',dr).replace('{{CSS}}',css).replace('{{EYEBROW}}',eb).replace('{{HEADLINE}}',h).replace('{{SUB}}',sub).replace('{{VISUAL}}',vis).replace('{{PHOTO}}',photo))
    open(f'{slug}.html','w').write(out)
    subprocess.run(['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome','--headless=new','--disable-gpu','--hide-scrollbars','--window-size=1280,769',f'--screenshot={os.getcwd()}/png/{slug}.png',f'file://{os.getcwd()}/{slug}.html'],capture_output=True)
    print(slug)
