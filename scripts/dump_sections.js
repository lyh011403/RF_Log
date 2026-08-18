const fs = require('fs');
const c = fs.readFileSync('C:/Users/a1452/.gemini/antigravity/brain/d550361a-8698-4931-b75f-78bf084f2a76/.user_uploaded/media_1787030161379.html', 'utf8');

// Find all <section id="...">
const sectionRegex = /<section id="([^"]+)"[\s\S]*?<\/section>/g;
let match;
while ((match = sectionRegex.exec(c)) !== null) {
    const rawSec = match[0];
    const id = match[1];
    const titleMatch = rawSec.match(/<div class="section-title">([\s\S]*?)<\/div>/) || rawSec.match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : id;
    console.log(`\n=================== [SECTION: ${id}] ${title} ===================`);
    const cleanText = rawSec
        .replace(/<style[\s\S]*?<\/style>/g, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    console.log(cleanText.substring(0, 500) + '...\n');
}
