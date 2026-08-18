const fs = require('fs');
const c = fs.readFileSync('C:/Users/a1452/.gemini/antigravity/brain/d550361a-8698-4931-b75f-78bf084f2a76/.user_uploaded/media_1787030161379.html', 'utf8');

// Function to get clean innerHTML of a section
function getSection(id) {
    const regex = new RegExp(`<section id="${id}"[\\s\\S]*?<\\/section>`);
    const match = c.match(regex);
    return match ? match[0] : null;
}

['sec-overview', 'sec-market-tw', 'sec-critique', 'sec-mobile-vs-r1', 'sec-scope', 'sec-workflow', 'sec-rules-engine', 'sec-data-strategy', 'sec-privacy', 'sec-moat', 'sec-global-market', 'sec-multi-domains', 'sec-business-models', 'sec-poc-90days', 'sec-kpi', 'sec-decision-tree', 'sec-pitch', 'sec-actions'].forEach(id => {
    const sec = getSection(id);
    console.log(`\n============================ ${id} (Length: ${sec ? sec.length : 0}) ============================`);
    if (sec) {
        console.log(sec.substring(0, 400));
    }
});
