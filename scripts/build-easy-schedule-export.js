const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const captionsCsv = path.join(root, "marketing", "social-posts", "captions.csv");
const pngRoot = path.join(root, "marketing", "social-posts", "exports", "png");
const outRoot = path.join(root, "marketing", "social-posts", "exports", "easy-schedule");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function parseCsv(csv) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    const next = csv[i + 1];
    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

function csvEscape(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

function cleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  ensureDir(dir);
}

function main() {
  cleanDir(outRoot);
  const rows = parseCsv(fs.readFileSync(captionsCsv, "utf8"));
  const headers = rows.shift();
  const headerIndex = Object.fromEntries(headers.map((header, index) => [header, index]));
  const scheduleRows = [["number", "image_file", "caption_file", "article_slug", "post_number", "type", "caption", "url"]];

  rows.forEach((row, index) => {
    const number = String(index + 1).padStart(3, "0");
    const slug = row[headerIndex.article_slug];
    const postNumber = String(row[headerIndex.post_number]).padStart(2, "0");
    const type = row[headerIndex.type];
    const caption = row[headerIndex.caption];
    const url = row[headerIndex.url];
    const sourceImage = path.join(pngRoot, slug, `post-${postNumber}.png`);
    const imageFile = `${number}.png`;
    const captionFile = `${number}-caption.txt`;

    if (!fs.existsSync(sourceImage)) {
      throw new Error(`Missing PNG for ${slug} post ${postNumber}: ${sourceImage}`);
    }

    fs.copyFileSync(sourceImage, path.join(outRoot, imageFile));
    fs.writeFileSync(path.join(outRoot, captionFile), caption);
    scheduleRows.push([number, imageFile, captionFile, slug, postNumber, type, caption, url]);
  });

  fs.writeFileSync(
    path.join(outRoot, "MATCHING-SCHEDULE.csv"),
    scheduleRows.map((row) => row.map(csvEscape).join(",")).join("\n") + "\n"
  );

  fs.writeFileSync(
    path.join(outRoot, "START-HERE.md"),
    `# Easy Schedule Export\n\nUse this folder when scheduling manually.\n\nEach post has two matching files:\n\n- 001.png\n- 001-caption.txt\n\nStart with 001, then 002, then 003.\n\nRecommended easiest schedule: one post per day at 9:00 AM.\n\nIf you want to batch a week at a time, schedule 001-007 first.\n\n`
  );

  console.log(`Created ${rows.length} matched image/caption pairs in ${path.relative(root, outRoot)}`);
}

main();
