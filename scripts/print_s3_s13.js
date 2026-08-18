const fs = require('fs');
const c = fs.readFileSync('C:/Users/a1452/.gemini/antigravity/brain/d550361a-8698-4931-b75f-78bf084f2a76/.user_uploaded/media_1787030161379.html', 'utf8');

const s3 = c.match(/<section id="sec-critique"[\s\S]*?<\/section>/);
console.log('--- SECTION 03 ---');
console.log(s3 ? s3[0] : 'not found');

const s13 = c.match(/<section id="sec-business-models"[\s\S]*?<\/section>/);
console.log('--- SECTION 13 ---');
console.log(s13 ? s13[0] : 'not found');
