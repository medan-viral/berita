// File: tools/generate-all.js

const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

async function runScript(scriptPath) {
  try {
    console.log(`\nMenjalankan ${scriptPath}...`);
    await exec(`node ${scriptPath}`);
    console.log(`✅ Selesai: ${scriptPath}`);
  } catch (error) {
    console.error(`❌ Gagal menjalankan ${scriptPath}:`, error.message);
    process.exit(1);
  }
}

(async () => {
  try {
    console.log('🚀 Memulai semua proses generate...\n');

    await runScript(path.join(__dirname, 'generate-articles.js'));
    await runScript(path.join(__dirname, 'generate-robots.js'));
    await runScript(path.join(__dirname, 'generate-rss.js'));
    await runScript(path.join(__dirname, 'generate-sitemap.js'));
    await runScript(path.join(__dirname, 'inject-og-tags.js'));
    await runScript(path.join(__dirname, 'inject-structured-data.js'));

    console.log('\n🎉 Semua script berhasil dijalankan!');
  } catch (error) {
    console.error('💥 Terjadi kesalahan besar:', error);
    process.exit(1);
  }
})();
