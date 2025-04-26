const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const fg = require("fast-glob");

const baseUrl = "https://dailyindonesianews.github.io/berita-terupdate/";
const defaultImage = "https://medan-viral.github.io/images/thumb.jpg"; // Ganti sesuai thumbnail utama kamu

(async () => {
  const htmlFiles = await fg(["**/*.html", "!node_modules/**", "!**/404.html", "!google*.html"]);

  htmlFiles.forEach(file => {
    const html = fs.readFileSync(file, "utf-8");
    const $ = cheerio.load(html);

    const title = $("title").text().trim() || "Judul Artikel";
    const description = $('meta[name="description"]').attr("content") || "Deskripsi belum tersedia.";
    const fullUrl = baseUrl + file.replace(/\\/g, "/");

    const ogTags = `
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${description}">
      <meta property="og:image" content="${defaultImage}">
      <meta property="og:url" content="${fullUrl}">
      <meta property="og:type" content="article">
    `.trim();

    $("head").append(ogTags);

    fs.writeFileSync(file, $.html());
    console.log(`✅ OG tag disisipkan ke: ${file}`);
  });

  console.log("🎉 Semua file berhasil diupdate dengan OG tags!");
})();
