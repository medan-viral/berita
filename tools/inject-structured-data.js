const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const glob = require("fast-glob");

// === Konfigurasi dasar ===
const publisher = "Daily Indonesia News";
const logoUrl = "https://medan-viral.github.io/logo.png";
const baseUrl = "https://medan-viral.github.io/new";
const today = new Date().toISOString().split("T")[0];

// === Proses file HTML ===
(async () => {
  const files = await glob(["**/*.html", "!node_modules/**", "!**/404.html", "!google*.html"]);

  files.forEach(file => {
    const html = fs.readFileSync(file, "utf-8");
    const $ = cheerio.load(html);

    const title = $("title").text().trim() || "Judul Artikel";
    const fullUrl = baseUrl + file.replace(/\\/g, "/");

    const schema = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": title,
      "datePublished": today,
      "dateModified": today,
      "author": {
        "@type": "Organization",
        "name": publisher
      },
      "publisher": {
        "@type": "Organization",
        "name": publisher,
        "logo": {
          "@type": "ImageObject",
          "url": logoUrl
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": fullUrl
      }
    };

    const script = `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;

    // Sisipkan di akhir <head>
    $("head").append(script);

    // Tulis ulang file HTML
    fs.writeFileSync(file, $.html());
    console.log(`✅ Structured Data ditambahkan ke: ${file}`);
  });

  console.log("🚀 Semua file berhasil diupdate dengan structured data!");
})();
