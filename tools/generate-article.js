const fs = require("fs");
const path = require("path");
const fg = require("fast-glob");
const cheerio = require("cheerio");

const baseUrl = "https://dailyindonesianews.github.io/berita-terupdate"; // Ganti kalau custom domain

(async () => {
  const htmlFiles = await fg(["**/*.html", "!node_modules/**", "!**/404.html", "!google*.html"]);

  const articles = [];

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf-8");
    const $ = cheerio.load(html);

    const title = $("title").text().trim() || "Tanpa Judul";
    const dateMeta = $('meta[name="date"], meta[property="article:published_time"]').attr("content");
    const date = dateMeta || fs.statSync(file).mtime.toISOString().split("T")[0];

    const urlPath = file.replace(/index\.html$|\.html$/g, "").replace(/\\/g, "/");
    const fullUrl = `${baseUrl}/${urlPath}`;

    articles.push({ title, link: fullUrl, date });
  }

  fs.writeFileSync("artikel.json", JSON.stringify(articles, null, 2));
  console.log("✅ artikel.json berhasil dibuat!");
})();
