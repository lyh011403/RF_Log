const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../routes/strategy_handbooks/R1_AI實體互動助手_公司決策與多領域拓展指南.html');
const html = fs.readFileSync(targetPath, 'utf8');

const navLinks = [...html.matchAll(/class="nav-item"[^>]*><a href="#([^"]+)"/g)].map(m => m[1]);
const sectionIds = [...html.matchAll(/<section id="([^"]+)"/g)].map(m => m[1]);

console.log('Nav Links Count:', navLinks.length);
console.log('Section IDs Count:', sectionIds.length);

let mismatch = false;
navLinks.forEach((id, idx) => {
    const exists = sectionIds.includes(id);
    console.log((exists ? '✅' : '❌') + ' [' + (idx + 1) + '] #' + id);
    if (!exists) mismatch = true;
});

if (!mismatch && navLinks.length === 20 && sectionIds.length === 20) {
    console.log('\n🎉 ALL 20 NAV LINKS 100% MATCH SECTION IDS PERFECTLY!');
} else {
    console.log('\n⚠️ Found mismatch or count difference!');
}
