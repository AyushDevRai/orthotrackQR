const fs = require('fs');

const landing = fs.readFileSync('src/components/landing-page.tsx', 'utf8');
const scroll = fs.readFileSync('src/components/scroll-experience.tsx', 'utf8');
const expCss = fs.readFileSync('src/app/experience.css', 'utf8');

console.log('--- Sections in landing-page.tsx ---');
const secRegex = /<section[^>]*>/g;
let match;
while ((match = secRegex.exec(landing)) !== null) {
  console.log('landing:', match[0]);
}

console.log('--- Sections in scroll-experience.tsx ---');
while ((match = secRegex.exec(scroll)) !== null) {
  console.log('scroll:', match[0]);
}
