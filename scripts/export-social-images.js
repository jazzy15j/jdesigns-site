const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const socialRoot = path.join(root, "marketing", "social-posts");
const exportRoot = path.join(socialRoot, "exports", "png");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    if (entry.isFile() && /^post-\d+\.html$/.test(entry.name)) files.push(full);
  }
  return files;
}

async function main() {
  ensureDir(exportRoot);
  const files = walk(socialRoot).sort();

  for (const file of files) {
    const rel = path.relative(socialRoot, file);
    const [slug, htmlName] = rel.split(path.sep);
    const outDir = path.join(exportRoot, slug);
    const outFile = path.join(outDir, htmlName.replace(".html", ".png"));
    ensureDir(outDir);
    execFileSync(
      "npx",
      [
        "playwright",
        "screenshot",
        "--viewport-size=1080,1080",
        "--wait-for-selector=.frame",
        `file://${file}`,
        outFile,
      ],
      { stdio: "ignore" }
    );
  }
  console.log(`Exported ${files.length} PNGs to ${path.relative(root, exportRoot)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
