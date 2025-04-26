// File: tools/generate-all.js

const path = require('path');

(async () => {
  try {
    console.log('Menjalankan semua script generate...');

    // Import dan jalankan masing-masing script
    require('./generate-articles.js');
    require('./generate-robots.js');
    require('./generate-rss.js');
    require('./generate-sitemap.js');
    require('./inject-og-tags.js');
    require('./inject-structured-data.js');

    console.log('Semua script generate berhasil dijalankan!');
  } catch (error) {
    console.error('Gagal menjalankan generate-all.js:', error);
    process.exit(1);
  }
})();
