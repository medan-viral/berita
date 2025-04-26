const fs = require("fs");

try {
  const articles = JSON.parse(fs.readFileSync("artikel.json", "utf-8"));

  const rssItems = articles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${article.link}</link>
      <description><![CDATA[${article.title}]]></description>
      <pubDate>${article.date}</pubDate>
    </item>
  `).join("");

  const rssContent = `
  <rss version="2.0">
    <channel>
      <title>Daily Indonesia News</title>
      <link>https://https://medan-viral.github.io/berita/</link>
      <description>Berita Terupdate Hari Ini</description>
      ${rssItems}
    </channel>
  </rss>
  `.trim();

  fs.writeFileSync("rss.xml", rssContent);
  console.log("✅ rss.xml berhasil dibuat dari artikel.json!");
} catch (error) {
  console.error("❌ Gagal membuat rss.xml:", error.message);
}
