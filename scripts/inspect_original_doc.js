const fs = require('fs');
const artDir = 'C:/Users/a1452/.gemini/antigravity/brain/d550361a-8698-4931-b75f-78bf084f2a76/.user_uploaded';
const c = fs.readFileSync(artDir + '/media_1787030161379.html', 'utf8');

console.log('=== FULL ORIGINAL TEXT EXTRACT ===');
// print out key sections
const sections = c.split(/<div class="section-title">/);
sections.forEach((sec, idx) => {
    if (idx === 0) return;
    const title = sec.substring(0, sec.indexOf('</div>')).trim();
    console.log(`\n================== [${idx}] ${title} ==================`);
    const body = sec.substring(sec.indexOf('</div>') + 6).replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '\n').replace(/\n\s*\n/g, '\n').trim();
    console.log(body.substring(0, 800));
});
