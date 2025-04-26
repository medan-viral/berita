// tools/generate-robots.js
const fs = require('fs');

const content = `
User-agent: *
Disallow:

Sitemap: https://dailyindonesianews.github.io/sitemap.xml
`.trim();

fs.writeFileSync('robots.txt', content);
console.log('robots.txt generated.');
