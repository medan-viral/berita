// tools/generate-robots.js
const fs = require('fs');

const content = `
User-agent: *
Disallow:

Sitemap: https://medan-viral.github.io/new/sitemap.xml
`.trim();

fs.writeFileSync('robots.txt', content);
console.log('robots.txt generated.');
