#!/usr/bin/env python3
"""Publish ONLY the named files to jdesigns.info. Every other live file stays
exactly as it is.

Why: the local folder usually has unfinished edits that are not live yet, so
`netlify deploy --prod` (which uploads the whole folder) would publish them.
This asks Netlify for the current live file list, swaps in the named files,
and uploads only those.

Usage (from JDesigns-Website/):
    python3 scripts/deploy-files.py blog/new-post.html blog/index.html index.html sitemap.xml

After a new post: run `node scripts/update-latest-carousel.js` first (the
pre-commit hook does it for you on commit), then deploy the post plus
index.html, blog/index.html, meta-checklist.html, meta-vault.html,
systemized.html, systemize-your-business.html and sitemap.xml.
Check `git diff` on those pages first: anything else changed in them goes live too.
"""
import hashlib
import json
import os
import sys
import time
import urllib.request

SITE_ID = "7c2384fe-4e19-4a51-a2e9-71345b424897"
API = "https://api.netlify.com/api/v1"


def token():
    cfg = json.load(open(os.path.expanduser("~/Library/Preferences/netlify/config.json")))
    return cfg["users"][cfg["userId"]]["auth"]["token"]


def call(method, url, tok, body=None, content_type="application/json"):
    req = urllib.request.Request(url, data=body, method=method,
                                 headers={"Authorization": f"Bearer {tok}", "Content-Type": content_type})
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read() or b"null")


def main(paths):
    if not paths:
        sys.exit(__doc__)
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(root)
    tok = token()

    files, page = {}, 1
    while True:
        batch = call("GET", f"{API}/sites/{SITE_ID}/files?page={page}&per_page=500", tok)
        before = len(files)
        files.update({f["id"]: f["sha"] for f in batch or []})
        if len(files) == before:
            break
        page += 1
    print(f"{len(files)} files live now.")

    for p in paths:
        p = p.lstrip("./")
        files["/" + p] = hashlib.sha1(open(p, "rb").read()).hexdigest()

    deploy = call("POST", f"{API}/sites/{SITE_ID}/deploys", tok, json.dumps({"files": files}).encode())
    required = set(deploy.get("required") or [])
    for p in paths:
        p = p.lstrip("./")
        data = open(p, "rb").read()
        if hashlib.sha1(data).hexdigest() in required:
            call("PUT", f"{API}/deploys/{deploy['id']}/files/{p}", tok, data, "application/octet-stream")
            print(f"uploaded {p}")
        else:
            print(f"unchanged {p}")

    for _ in range(30):
        state = call("GET", f"{API}/deploys/{deploy['id']}", tok)["state"]
        if state in ("ready", "error"):
            break
        time.sleep(2)
    print(f"Deploy {deploy['id']}: {state}")
    if state != "ready":
        sys.exit(1)


if __name__ == "__main__":
    main(sys.argv[1:])
