const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const captionsCsv = path.join(root, "marketing", "social-posts", "captions.csv");
const pngRoot = path.join(root, "marketing", "social-posts", "exports", "png");
const captionsMd = path.join(root, "marketing", "social-posts", "captions.md");

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

function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((word) => {
      if (word === "ai") return "AI";
      if (word === "meta") return "Meta";
      if (word === "instagram") return "Instagram";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function main() {
  const rows = parseCsv(fs.readFileSync(captionsCsv, "utf8"));
  const headers = rows.shift();
  const headerIndex = Object.fromEntries(headers.map((header, index) => [header, index]));
  const bySlug = new Map();

  rows.forEach((row) => {
    const slug = row[headerIndex.article_slug];
    const postNumber = row[headerIndex.post_number];
    if (!bySlug.has(slug) || postNumber === "1") {
      bySlug.set(slug, {
        caption: row[headerIndex.caption],
        url: row[headerIndex.url],
      });
    }
  });

  const folders = fs
    .readdirSync(pngRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  let md = "# JDesigns Carousel Captions\n\n";
  md += "Use this file with the PNG carousel folders.\n\n";
  md += "Each folder is ONE carousel post. Upload the five PNGs inside that folder in order, then paste the matching caption below.\n\n";
  md += "Recommended easiest schedule: one carousel per day at 9:00 AM.\n\n---\n\n";

  folders.forEach((slug, index) => {
    const folderPath = `marketing/social-posts/exports/png/${slug}`;
    const slides = fs
      .readdirSync(path.join(pngRoot, slug))
      .filter((file) => file.endsWith(".png"))
      .sort();
    const item = bySlug.get(slug);

    md += `## ${index + 1}. ${titleFromSlug(slug)}\n\n`;
    md += `Folder: \`${folderPath}\`\n\n`;
    md += "Slides to upload in this order:\n\n";
    slides.forEach((slide) => {
      md += `- \`${slide}\`\n`;
    });
    md += "\nCaption:\n\n";
    md += "```text\n";
    md += item ? item.caption.trim() : `${titleFromSlug(slug)}\n\nRead more: https://jdesigns.info/blog/${slug}`;
    md += "\n```\n\n";
    md += "---\n\n";
  });

  fs.writeFileSync(captionsMd, md);
  console.log(`Updated ${path.relative(root, captionsMd)} for ${folders.length} carousel captions.`);
}

main();
