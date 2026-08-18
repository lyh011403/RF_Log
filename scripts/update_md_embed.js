const fs = require('fs');
const path = require('path');

const mdDir = path.join(__dirname, '../assets/docs/md_technical');
const mdFiles = [
    'PI4_手部追蹤與舵機控制.md',
    'PI4_語音喚醒.md',
    'PI4_雲端.md',
    'PI4_NFC.md',
    'STT_呼叫.md',
    '相機棋盤格標定教學流程.md',
    '戰略手冊撰寫規格標準書.md'
];

const mdData = {};
mdFiles.forEach(f => {
    const fullPath = path.join(mdDir, f);
    if (fs.existsSync(fullPath)) {
        mdData[f] = fs.readFileSync(fullPath, 'utf8');
    }
});

console.log('Read MD files count:', Object.keys(mdData).length);

// 1. Update PI4_嵌入式全模組技術與疑難排解整合手冊.html
const pi4HtmlPath = path.join(__dirname, '../routes/troubleshooting/PI4_嵌入式全模組技術與疑難排解整合手冊.html');
if (fs.existsSync(pi4HtmlPath)) {
    let html = fs.readFileSync(pi4HtmlPath, 'utf8');

    html = html.replace(/<a href="[^"]*assets\/docs\/md_technical\/([^"]+)" download class="md-btn primary">📥 下載 \.md<\/a>/g, (match, p1) => {
        return `<button onclick="downloadMd('${p1}')" class="md-btn primary">📥 下載 .md</button>`;
    });

    html = html.replace(/<a id="modalDownloadBtn" href="#" download class="md-btn primary">📥 下載此檔案<\/a>/,
        '<button id="modalDownloadBtn" onclick="downloadCurrentModalMd()" class="md-btn primary">📥 下載此檔案</button>');

    const scriptStart = html.indexOf('<script>');
    const scriptEnd = html.lastIndexOf('</script>');

    if (scriptStart !== -1 && scriptEnd !== -1) {
        const newScript = `<script>
        const MD_CONTENTS = ${JSON.stringify(mdData)};
        let currentActiveMd = '';

        document.addEventListener('DOMContentLoaded', () => {
            const searchInput = document.getElementById('sectionSearch');
            const filterChips = document.querySelectorAll('.filter-chip');
            const sections = document.querySelectorAll('.content-section');

            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const query = e.target.value.toLowerCase().trim();
                    sections.forEach(sec => {
                        const text = sec.innerText.toLowerCase();
                        const navMatch = document.querySelector(\`.nav-item a[href="#\${sec.id}"]\`);
                        if (text.includes(query) || query === '') {
                            sec.style.display = 'block';
                            if (navMatch) navMatch.parentElement.style.display = 'block';
                        } else {
                            sec.style.display = 'none';
                            if (navMatch) navMatch.parentElement.style.display = 'none';
                        }
                    });
                });
            }

            filterChips.forEach(chip => {
                chip.addEventListener('click', () => {
                    filterChips.forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                    const filter = chip.getAttribute('data-filter');

                    sections.forEach(sec => {
                        const cat = sec.getAttribute('data-cat');
                        const navMatch = document.querySelector(\`.nav-item a[href="#\${sec.id}"]\`);
                        if (filter === 'all' || cat === filter) {
                            sec.style.display = 'block';
                            if (navMatch) navMatch.parentElement.style.display = 'block';
                        } else {
                            sec.style.display = 'none';
                            if (navMatch) navMatch.parentElement.style.display = 'none';
                        }
                    });
                });
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        document.querySelectorAll('.nav-item a').forEach(a => {
                            a.classList.toggle('active', a.getAttribute('href') === \`#\${id}\`);
                        });
                    }
                });
            }, { rootMargin: '-15% 0px -70% 0px' });

            sections.forEach(sec => observer.observe(sec));
        });

        function downloadMd(fileName) {
            const text = MD_CONTENTS[fileName];
            if (!text) {
                alert('找不到此檔案內容：' + fileName);
                return;
            }
            const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 200);
        }

        function previewMd(fileName) {
            const modal = document.getElementById('mdModal');
            const title = document.getElementById('modalFileName');
            const content = document.getElementById('modalContent');

            title.innerText = fileName;
            currentActiveMd = fileName;
            modal.classList.add('active');

            const text = MD_CONTENTS[fileName];
            if (text) {
                content.innerText = text;
            } else {
                content.innerText = '無法載入此 Markdown 內容。';
            }
        }

        function closeModal() {
            document.getElementById('mdModal').classList.remove('active');
        }

        function copyModalContent() {
            const content = document.getElementById('modalContent').innerText;
            navigator.clipboard.writeText(content).then(() => alert('已成功複製 Markdown 內容至剪貼簿！'));
        }

        function downloadCurrentModalMd() {
            if (currentActiveMd) {
                downloadMd(currentActiveMd);
            }
        }

        function downloadAllZip() {
            if (typeof JSZip === 'undefined') {
                Object.keys(MD_CONTENTS).forEach(name => downloadMd(name));
                return;
            }

            const zip = new JSZip();
            const folder = zip.folder('RF_Pi4_MD技術資源庫');
            Object.entries(MD_CONTENTS).forEach(([name, content]) => {
                folder.file(name, content);
            });

            zip.generateAsync({ type: 'blob' }).then(content => {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(content);
                a.download = 'RF_Pi4_MD技術資源庫_全套打包.zip';
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                    document.body.removeChild(a);
                    URL.revokeObjectURL(a.href);
                }, 200);
            }).catch(err => {
                console.error('打包錯誤:', err);
                Object.keys(MD_CONTENTS).forEach(name => downloadMd(name));
            });
        }
    </script>`;

        html = html.substring(0, scriptStart) + newScript + html.substring(scriptEnd + 9);
        fs.writeFileSync(pi4HtmlPath, html, 'utf8');
        console.log('✅ Updated PI4_嵌入式全模組技術與疑難排解整合手冊.html with Blob downloads');
    }
}

// Map individual HTML files to their corresponding MD
const fileMap = [
    { html: 'routes/strategy_handbooks/戰略手冊撰寫規格標準書.html', md: '戰略手冊撰寫規格標準書.md' },
    { html: 'routes/troubleshooting/PI4_手部追蹤與舵機控制.html', md: 'PI4_手部追蹤與舵機控制.md' },
    { html: 'routes/troubleshooting/PI4_離線KWS語音喚醒與音訊驅動.html', md: 'PI4_語音喚醒.md' },
    { html: 'routes/troubleshooting/PI4_雲端AI對話與TTS快取.html', md: 'PI4_雲端.md' },
    { html: 'routes/troubleshooting/PI4_NFC身份感應與螢幕顯示.html', md: 'PI4_NFC.md' },
    { html: 'routes/troubleshooting/STT_語音轉文字呼叫與VAD架構.html', md: 'STT_呼叫.md' },
    { html: 'routes/troubleshooting/相機鏡頭去畸變標定教學流程.html', md: '相機棋盤格標定教學流程.md' }
];

fileMap.forEach(({ html, md }) => {
    const fullHtmlPath = path.join(__dirname, '..', html);
    if (fs.existsSync(fullHtmlPath)) {
        let content = fs.readFileSync(fullHtmlPath, 'utf8');
        const textData = mdData[md] || '';

        // Replace any anchor download tags with button
        content = content.replace(/<a href="[^"]*assets\/docs\/md_technical\/([^"]+)" download class="download-md-btn"([^>]*)>([\s\S]*?)<\/a>/g, (match, p1, extra, txt) => {
            return `<button onclick="downloadSingleMd()" class="download-md-btn"${extra}>${txt}</button>`;
        });

        // Add pure-JS download handler
        const snippet = `
    <script>
        const EMBEDDED_MD_CONTENT = ${JSON.stringify(textData)};
        const EMBEDDED_MD_FILENAME = ${JSON.stringify(md)};
        function downloadSingleMd() {
            const blob = new Blob([EMBEDDED_MD_CONTENT], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = EMBEDDED_MD_FILENAME;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 200);
        }
        // Also support any inline function call to downloadMd
        function downloadMd(fn) { downloadSingleMd(); }
    </script>
</body>`;

        if (content.includes('const EMBEDDED_MD_CONTENT =')) {
            content = content.replace(/<script>[\s\S]*?EMBEDDED_MD_CONTENT[\s\S]*?<\/script>\s*<\/body>/, snippet);
        } else {
            content = content.replace('</body>', snippet);
        }

        fs.writeFileSync(fullHtmlPath, content, 'utf8');
        console.log(`✅ Updated ${html} with robust Blob download!`);
    }
});
