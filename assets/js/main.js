// Reaify Tech Ink Wash Tech Tree Engine (物理彈簧拉扯 + 水墨漩渦 + 專案規格速覽連動)

const NS = "http://www.w3.org/2000/svg";
const svgEl = (tag, attrs={}) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
};

const CATEGORIES = [
    { id: "All", name: "全部專案 (ALL)" },
    { id: "FutureRoute", name: "未來發想 (FUTURE)" },
    { id: "Troubleshooting", name: "疑難排解 (TROUBLESHOOTING)" },
    { id: "LegacyRoute", name: "舊方案規格 (LEGACY)" },
    { id: "LearningActivity", name: "學習與營運 (LEARNING)" }
];

const TREE_BRANCHES = [
    {
        id: "FutureRoute",
        name: "未來發想路線",
        code: "FUTURE",
        children: [
            { name: "TRPG 主打影像", path: "routes/future_routes/TRPG_主打影像.html", routeId: "trpg-vision" },
            { name: "TRPG 主打語音輔助影像", path: "routes/future_routes/TRPG_主打語音輔助影像.html", routeId: "trpg-voice-vision" },
            { name: "PI4 & PI5 開發路線對照", path: "routes/future_routes/PI4&PI5開發路線.html", routeId: "pi4-pi5-spec" }
        ]
    },
    {
        id: "Troubleshooting",
        name: "疑難排解手冊",
        code: "TROUBLE",
        children: [
            { name: "PI4 手勢辨識排解", path: "routes/troubleshooting/PI4手不辨識遇到難題.html", routeId: "pi4-hand-troubleshooting" },
            { name: "馬達 (MG90S) 追蹤整理", path: "routes/troubleshooting/馬達(MG90S)手部追蹤整理.html", routeId: "mg90s-motor-tracking" }
        ]
    },
    {
        id: "LegacyRoute",
        name: "舊方案規格",
        code: "LEGACY",
        children: [
            { name: "MAIXCAM AI BOX 舊方案", path: "routes/legacy_routes/MAIXCAM_AIBOX舊方案整合.html", routeId: "maixcam-aibox-legacy" }
        ]
    },
    {
        id: "LearningActivity",
        name: "學習與營運指南",
        code: "LEARNING",
        children: [
            { name: "顧問銷售整合指南", path: "routes/learning_activities/顧問銷售整合指南.html", routeId: "consultative-selling" },
            { name: "Edge AI 企業安全部署", path: "routes/learning_activities/Edge AI 企業安全與部署手冊.html", routeId: "edge-ai-security" },
            { name: "DIGBLOCK 青創與 SBIR", path: "routes/learning_activities/digblock青創活動.html", routeId: "digblock-startup" }
        ]
    }
];

const ALL_PROJECTS_MAP = {
    "trpg-vision": { id: "trpg-vision", category: "FutureRoute", typeLabel: "FUTURE", code: "01", title: "TRPG 主打影像輔助系統", subtitle: "電腦視覺 (CV) 戰術追蹤與工程落地指南", description: "將頂置 CV (ArUco / YOLOv11) 引入實體桌遊。自動算數、測距與戰略迷霧判定。", path: "routes/future_routes/TRPG_主打影像.html" },
    "trpg-voice-vision": { id: "trpg-voice-vision", category: "FutureRoute", typeLabel: "FUTURE", code: "02", title: "TRPG 主打語音輔助影像", subtitle: "AI 上帝版 Co-DM 語音演繹與 NFC 藍圖", description: "Voice-First 架構。AI 多角色變聲、動態 BGM 混合器與雙軌實體 NFC 角色卡。", path: "routes/future_routes/TRPG_主打語音輔助影像.html" },
    "pi4-pi5-spec": { id: "pi4-pi5-spec", category: "FutureRoute", typeLabel: "FUTURE", code: "03", title: "PI4 & PI5 開發路線對照", subtitle: "樹莓派 4B/5 雙平台硬體對照與雲端 AI 規格", description: "Pi 4 1GB 量產可行性、第二代 3D 模型展台與 Faster-Whisper + Qwen3.5 串流模型。", path: "routes/future_routes/PI4&PI5開發路線.html" },
    "pi4-hand-troubleshooting": { id: "pi4-hand-troubleshooting", category: "Troubleshooting", typeLabel: "TROUBLE", code: "04", title: "Pi 4 MediaPipe 手勢辨識 排解手冊", subtitle: "Python 3.13 踩坑、SSD Anchors 解碼與 AES 誤判", description: "實戰記錄 Pi 4 手勢辨識卡關根因排查。包含 6 步診斷流程圖與 Tasks API 替代方案。", path: "routes/troubleshooting/PI4手不辨識遇到難題.html" },
    "mg90s-motor-tracking": { id: "mg90s-motor-tracking", category: "Troubleshooting", typeLabel: "TROUBLE", code: "05", title: "Pi 4B 手部置中與 MG90S 馬達除錯", subtitle: "pigpio DMA PWM、連續旋轉馬達校準與 4 大 Bug 處方", description: "完整剖析 Pi 4B + pigpio DMA PWM + MG90S 360° 馬達手部追蹤系統與零點校準 SOP。", path: "routes/troubleshooting/馬達(MG90S)手部追蹤整理.html" },
    "maixcam-aibox-legacy": { id: "maixcam-aibox-legacy", category: "LegacyRoute", typeLabel: "LEGACY", code: "06", title: "MAIXCAM AI BOX 舊方案手冊", subtitle: "第一代外觀實體圖展、雙核架構與 PCB EDA 原理圖", description: "完整收錄《Aldrich Fief 獵巫鎮》AI BOX 舊版架構、NFC 7-byte 硬體防盜與 PCB 規範。", path: "routes/legacy_routes/MAIXCAM_AIBOX舊方案整合.html" },
    "consultative-selling": { id: "consultative-selling", category: "LearningActivity", typeLabel: "LEARNING", code: "07", title: "顧問式銷售與攻心影響力指南", subtitle: "SPARK 需求診斷、SPIN 痛點開挖與高價值成交", description: "將產品導向轉化為客戶價值的終極實戰架構。涵蓋需求洞察與成交閉環。", path: "routes/learning_activities/顧問銷售整合指南.html" },
    "edge-ai-security": { id: "edge-ai-security", category: "LearningActivity", typeLabel: "LEARNING", code: "08", title: "Edge AI 企業安全與部署手冊", subtitle: "企業級 Edge AI 自主智慧體與縱深安全防線 v3", description: "整合 NemoClaw、OpenShell、NeMo Guardrails、AI Gateway 與 Palo Alto AIRS 架構。", path: "routes/learning_activities/Edge AI 企業安全與部署手冊.html" },
    "digblock-startup": { id: "digblock-startup", category: "LearningActivity", typeLabel: "LEARNING", code: "09", title: "DIGBLOCK 青創與 SBIR 計畫", subtitle: "創業機會、115 年 SBIR 補助懶人包與雙軸轉型", description: "深入解析創業四大商機、2026 雙軸轉型綠色溢價與 SBIR 150 萬~3000 萬補助攻略。", path: "routes/learning_activities/digblock青創活動.html" }
};

const ROUTES_DATA = Object.values(ALL_PROJECTS_MAP);

document.addEventListener("DOMContentLoaded", () => {
    const categoryTabsContainer = document.getElementById("category-tabs");
    const searchInput = document.getElementById("search-input");

    const mouseGlow = document.getElementById("mouse-glow");
    const stage = document.getElementById("stage");

    const rippleLayer = document.getElementById("ripple-layer");
    const brushLayer = document.getElementById("brush-layer");
    const brushHitLayer = document.getElementById("brush-hit-layer");
    const clusterRoot = document.getElementById("cluster-root");
    const coreHaloLayer = document.getElementById("core-halo-layer");
    const coreLayer = document.getElementById("core-layer");
    const coreSwirlLayer = document.getElementById("core-swirl-layer");
    const dropletLayer = document.getElementById("droplet-layer");
    const labelLayer = document.getElementById("label-layer");

    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
    const closeMobileMenu = document.getElementById("close-mobile-menu");

    const drawer = document.getElementById("drawer");
    const drawerOverlay = document.getElementById("drawer-overlay");
    const closeDrawerBtn = document.getElementById("close-drawer");
    const drawerTitle = document.getElementById("drawer-title");
    const drawerCode = document.getElementById("drawer-code");
    const drawerIframe = document.getElementById("drawer-iframe");
    const drawerExternalLink = document.getElementById("drawer-external-link");

    const W = 1200, H = 800, CX = 600, CY = 400;

    let activeCategory = "All";
    let searchQuery = "";
    let clockT = 0;

    // 1. GPU Mouse Glow Cursor
    setupOptimizedMouseGlow();

    // 2. Sticky Nav Scroll Active Highlight
    setupAnchorScrollHighlight();

    // 3. Mobile RWD Menu
    setupMobileMenu();

    // 4. Category Tabs
    renderCategories();

    // 6. Build Tech Tree Nodes
    const { nodes, nodeEls } = initInkWashTechTree();

    // 7. Start Ink Engine Loop
    startInkWashEngineLoop(nodes, nodeEls);

    // 8. Render Grid Cards
    renderAllRouteGrids();

    function renderCategories() {
        categoryTabsContainer.innerHTML = "";
        CATEGORIES.forEach(cat => {
            const btn = document.createElement("button");
            btn.className = `tab-btn ${activeCategory === cat.id ? "active" : ""}`;
            btn.textContent = cat.name;
            btn.addEventListener("click", () => {
                activeCategory = cat.id;
                renderCategories();
                renderAllRouteGrids();
            });
            categoryTabsContainer.appendChild(btn);
        });
    }

    function getFilteredRoutes() {
        return ROUTES_DATA.filter(route => {
            const matchCat = activeCategory === "All" || route.category === activeCategory;
            const matchSearch = !searchQuery || (
                route.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                route.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                route.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return matchCat && matchSearch;
        });
    }

    function setupOptimizedMouseGlow() {
        if (!mouseGlow) return;
        let mouseX = -500, mouseY = -500;
        let ticking = false;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!ticking) {
                requestAnimationFrame(() => {
                    mouseGlow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    function setupAnchorScrollHighlight() {
        const sections = document.querySelectorAll("section[id], header[id]");
        const navLinks = document.querySelectorAll(".nav-link");

        window.addEventListener("scroll", () => {
            let current = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${current}`) {
                    link.classList.add("active");
                }
            });
        });
    }

    function setupMobileMenu() {
        if (!mobileMenuBtn) return;
        const toggleMobileMenu = (open) => {
            if (open) {
                mobileMenu.classList.add("active");
                mobileMenuOverlay.classList.add("active");
            } else {
                mobileMenu.classList.remove("active");
                mobileMenuOverlay.classList.remove("active");
            }
        };

        mobileMenuBtn.addEventListener("click", () => toggleMobileMenu(true));
        closeMobileMenu.addEventListener("click", () => toggleMobileMenu(false));
        mobileMenuOverlay.addEventListener("click", () => toggleMobileMenu(false));

        document.querySelectorAll(".mobile-nav-link").forEach(link => {
            link.addEventListener("click", () => toggleMobileMenu(false));
        });
    }



    let ripples = [], droplets = [];

    function spawnWaterRipples(x, y, count = 3, maxRadius = 90) {
        for (let i = 0; i < count; i++) {
            const circle = svgEl("circle", {
                cx: x, cy: y, r: 4,
                fill: "none",
                stroke: "#16161A",
                "stroke-width": (1.8 - i * 0.4).toFixed(1),
                opacity: 0.6,
                filter: "url(#ink-edge-soft)"
            });
            rippleLayer.appendChild(circle);
            ripples.push({ el: circle, x, y, maxR: maxRadius + i * 25, age: 0, delay: i * 0.12 });
        }
    }

    function spawnDroplets(cx, cy, baseVX, baseVY) {
        const count = 4 + Math.floor(Math.random() * 4);
        for (let i = 0; i < count; i++) {
            const r = 2 + Math.random() * 3.5;
            const drop = svgEl("circle", { cx, cy, r, fill: "#16161A", opacity: 0.85, filter: "url(#ink-edge)" });
            dropletLayer.appendChild(drop);
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 5;
            droplets.push({
                el: drop, x: cx, y: cy,
                vx: baseVX * 0.3 + Math.cos(angle) * speed,
                vy: baseVY * 0.3 + Math.sin(angle) * speed,
                life: 1.0, decay: 0.03 + Math.random() * 0.03
            });
        }
    }

    function getShortKeyword(fullName) {
        if (!fullName) return "";
        const trimmed = fullName.trim();
        if (trimmed.includes("PI4") && trimmed.includes("PI5")) return "PI4/5";
        if (trimmed.includes("Edge AI")) return "EdgeAI";
        if (trimmed.includes("DIGBLOCK")) return "SBIR";
        if (trimmed.includes("TRPG") && (trimmed.includes("語音") || trimmed.includes("輔助"))) return "TRPG語";
        if (trimmed.includes("TRPG")) return "TRPG影";
        if (trimmed.includes("電腦視覺") || trimmed.includes("戰術")) return "CV戰術";

        const matchEng = trimmed.match(/^([A-Za-z0-9\s&\/\+\-]+?)([\u4e00-\u9fa5]|$)/);
        if (matchEng && matchEng[1].trim().length > 0) {
            let eng = matchEng[1].trim().replace(/\s+&\s+/g, "/").replace(/\s+/g, "");
            if (eng.length > 7) eng = eng.substring(0, 6);
            return eng;
        }
        return trimmed.substring(0, 3);
    }

    function blotPoints(cx, cy, baseR, N, phase, t, wobbleAmt) {
        const pts = [];
        for (let i = 0; i < N; i++) {
            const a = (i / N) * Math.PI * 2;
            const r = baseR
                + Math.sin(a * 5 + t * 1.0 + phase) * baseR * wobbleAmt * 0.7
                + Math.sin(a * 3 - t * 0.75 + phase * 1.6) * baseR * wobbleAmt * 0.5;
            pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
        }
        return pts;
    }

    function smoothBlotPath(pts) {
        const n = pts.length;
        const mid = (a, b) => [(a.x + b.x) / 2, (a.y + b.y) / 2];
        const m0 = mid(pts[n - 1], pts[0]);
        let d = `M ${m0[0]} ${m0[1]} `;
        for (let i = 0; i < n; i++) {
            const next = pts[(i + 1) % n];
            const m = mid(pts[i], next);
            d += `Q ${pts[i].x} ${pts[i].y} ${m[0]} ${m[1]} `;
        }
        return d + "Z";
    }

    function buildBrush(layer) {
        return [5.2, 3, 1.3].map((w, li) => svgEl("path", {
            d: "", fill: "none", stroke: "#16161A", "stroke-width": w,
            "stroke-linecap": "round", "stroke-dasharray": li === 2 ? "3 2.5" : "none", opacity: 0, filter: "url(#brush-wobble)"
        }));
    }

    // 🎯 SVG coordinate converter (pointer event → SVG viewBox space)
    function svgPoint(e) {
        const rect = stage.getBoundingClientRect();
        const scaleX = W / rect.width;
        const scaleY = H / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    // 🌿 Initialize Ink Wash Tech Tree Nodes (宣紙濃墨韻味系統)
    function initInkWashTechTree() {
        const core = { x: CX, y: CY, r: 45, phase: Math.random() * 10 };
        const coreHalo = svgEl("circle", { cx: CX, cy: CY, r: core.r * 1.7, fill: "url(#rg-halo)", filter: "url(#ink-edge-soft)", opacity: 0.85 });
        coreHaloLayer.appendChild(coreHalo);

        // 典雅純粹的水墨圓形濃墨團
        const coreOutline = svgEl("circle", { cx: CX, cy: CY, r: core.r, fill: "#16161A", filter: "url(#ink-edge)" });
        coreLayer.appendChild(coreOutline);

        // 🤍 宣紙白墨洗鍊標誌 "R" (光學幾何絕對置中，帶有輕微水墨質感)
        const coreText = svgEl("text", {
            x: CX + 0.3, y: CY - 0.5,
            fill: "url(#r-text-gradient)",
            filter: "url(#ink-r-filter)",
            opacity: "0.98",
            "font-family": "'Cinzel', 'Noto Serif TC', serif",
            "font-weight": "800",
            "font-size": "24",
            "text-anchor": "middle",
            "dominant-baseline": "central",
            style: "pointer-events:none; user-select:none; letter-spacing:0.02em;"
        });
        coreText.textContent = "R";
        coreLayer.appendChild(coreText);

        const coreHit = svgEl("circle", { cx: CX, cy: CY, r: core.r + 18, fill: "transparent", style: "cursor:grab" });
        coreLayer.appendChild(coreHit);

        window.coreState = {
            core, coreOutline, coreText, coreHalo, coreHit,
            hoverCore: false, clickBurstT: -10, swirlEnergy: 0.15, treeOpen: false, openProgress: 0,
            isDragging: false, springActive: false, springVX: 0, springVY: 0,
            x: CX, y: CY, baseX: CX, baseY: CY, lastPX: 0, lastPY: 0, vx: 0, vy: 0
        };
        coreHit.addEventListener("pointerenter", () => { window.coreState.hoverCore = true; });
        coreHit.addEventListener("pointerleave", () => { window.coreState.hoverCore = false; });

        let coreDragDistance = 0;
        coreHit.addEventListener("pointerdown", (e) => {
            e.stopPropagation();
            const cs = window.coreState;
            cs.isDragging = true; cs.springActive = false; cs.isPressed = true;
            coreHit.style.cursor = "grabbing";
            coreHit.setPointerCapture(e.pointerId);
            const p = svgPoint(e);
            cs.lastPX = p.x; cs.lastPY = p.y; cs.vx = 0; cs.vy = 0;
            coreDragDistance = 0;
            spawnWaterRipples(p.x, p.y, 4, 110);
        });

        coreHit.addEventListener("pointermove", (e) => {
            const cs = window.coreState;
            if (!cs.isDragging) return;
            const p = svgPoint(e);
            const dx = p.x - cs.lastPX;
            const dy = p.y - cs.lastPY;
            coreDragDistance += Math.hypot(dx, dy);
            cs.vx = dx; cs.vy = dy;
            cs.lastPX = p.x; cs.lastPY = p.y;
            cs.x = p.x; cs.y = p.y;
        });

        function endCoreDrag(e) {
            const cs = window.coreState;
            if (!cs.isDragging) return;
            cs.isDragging = false; cs.isPressed = false;
            coreHit.style.cursor = "grab";
            cs.springActive = true;
            cs.springVX = cs.vx * 5; cs.springVY = cs.vy * 5;
            cs.releaseBounceAmt = Math.min(0.8, Math.hypot(cs.vx, cs.vy) * 0.08 + 0.3);
            spawnDroplets(cs.x, cs.y, cs.vx * 8, cs.vy * 8);

            // If it was a clean click without major drag, toggle collapse/expand
            if (coreDragDistance < 8) {
                cs.treeOpen = !cs.treeOpen;
                cs.clickBurstT = clockT;
                cs.clickImpact = 1.0; // 啟動極致有感 Q 彈衝擊波
                spawnWaterRipples(cs.x, cs.y, 6, 160);
                spawnDroplets(cs.x, cs.y, 0, -4);
            }
        }

        coreHit.addEventListener("pointerup", endCoreDrag);
        coreHit.addEventListener("pointercancel", endCoreDrag);



        const nodes = TREE_BRANCHES.map((branch, i) => {
            const angle = (i / TREE_BRANCHES.length) * Math.PI * 2 - Math.PI / 4;
            const radius = 240;
            return {
                id: branch.id,
                name: branch.name,
                code: branch.code,
                angle,
                baseX: CX + radius * Math.cos(angle),
                baseY: CY + radius * Math.sin(angle),
                x: CX, y: CY, phase: Math.random() * Math.PI * 2, r: 32,
                hoverAmt: 0, expanded: false, collapseTimer: null, expandP: 0,
                isDragging: false, springActive: false, springVX: 0, springVY: 0,
                pluckT: -10, pluckAmp: 0,
                lastPX: 0, lastPY: 0, vx: 0, vy: 0,
                children: branch.children.map((child, ci) => ({
                    name: child.name,
                    path: child.path,
                    routeId: child.routeId,
                    angle: angle + (ci - (branch.children.length - 1) / 2) * 0.45,
                    dist: 95, hoverAmt: 0
                }))
            };
        });

        const GRACE_MS = 480; // 延長緩衝確保滑鼠移往子標籤內不會太早收合
        function scheduleCollapse(n) { if (n.collapseTimer) clearTimeout(n.collapseTimer); n.collapseTimer = setTimeout(() => { if (!n.isDragging) n.expanded = false; }, GRACE_MS); }
        function cancelCollapse(n) { if (n.collapseTimer) { clearTimeout(n.collapseTimer); n.collapseTimer = null; } n.expanded = true; }

        const nodeEls = nodes.map((n) => {
            const brush = buildBrush(brushLayer);
            brush.forEach(l => brushLayer.appendChild(l));

            const brushHit = svgEl("path", { d: "", fill: "none", stroke: "transparent", "stroke-width": 22, "pointer-events": "stroke", style: "cursor:pointer" });
            brushHitLayer.appendChild(brushHit);
            brushHit.addEventListener("pointerenter", () => { n.pluckT = clockT; n.pluckAmp = 7; });
            brushHit.addEventListener("pointerdown", (e) => { e.stopPropagation(); n.pluckT = clockT; n.pluckAmp = 15; });

            const group = svgEl("g");
            clusterRoot.appendChild(group);

            const halo = svgEl("circle", { cx: n.x, cy: n.y, r: n.r * 1.7, fill: "url(#rg-halo)", filter: "url(#ink-edge-soft)" });
            group.appendChild(halo);

            const childBrushEls = n.children.map(() => {
                const cb = buildBrush(group); cb.forEach(l => group.appendChild(l)); return cb;
            });

            const body = svgEl("circle", { cx: n.x, cy: n.y, r: n.r, fill: "url(#rg-ink-node)", filter: "url(#ink-edge)" });
            group.appendChild(body);

            const childEls = n.children.map((c) => {
                const chalo = svgEl("circle", { cx: n.x, cy: n.y, r: 25, fill: "url(#rg-halo)", filter: "url(#ink-edge-soft)", opacity: 0 });
                const cbody = svgEl("circle", { cx: n.x, cy: n.y, r: 16, fill: "url(#rg-ink-child)", filter: "url(#ink-edge)", opacity: 0 });
                const shortText = getShortKeyword(c.name);
                const fontSize = shortText.length >= 7 ? "8px" : shortText.length >= 5 ? "9px" : "10.5px";

                const ctext = svgEl("text", {
                    x: n.x, y: n.y,
                    fill: "#E5E3DD",
                    "font-size": fontSize,
                    "font-weight": "700",
                    "font-family": "var(--font-mono)",
                    "letter-spacing": "-0.02em",
                    "text-anchor": "middle",
                    "dominant-baseline": "central",
                    "pointer-events": "none",
                    opacity: 0
                });
                ctext.textContent = shortText;
                group.appendChild(chalo);
                group.appendChild(cbody);
                group.appendChild(ctext);
                return { halo: chalo, body: cbody, text: ctext };
            });

            const hit = svgEl("circle", { cx: n.x, cy: n.y, r: n.r + 16, fill: "transparent", style: "cursor:grab" });
            group.appendChild(hit);

            hit.addEventListener("pointerenter", () => cancelCollapse(n));
            hit.addEventListener("pointerleave", () => { if (!n.isDragging) scheduleCollapse(n); });
            hit.addEventListener("pointerdown", (e) => {
                e.stopPropagation();
                n.isDragging = true; n.springActive = false; n.isPressed = true;
                cancelCollapse(n);
                hit.style.cursor = "grabbing";
                hit.setPointerCapture(e.pointerId);
                const p = svgPoint(e);
                n.lastPX = p.x; n.lastPY = p.y; n.vx = 0; n.vy = 0;
                spawnWaterRipples(n.x, n.y, 3, 85);
            });
            hit.addEventListener("pointermove", (e) => {
                if (!n.isDragging) return;
                const p = svgPoint(e);
                n.vx = p.x - n.lastPX; n.vy = p.y - n.lastPY;
                n.lastPX = p.x; n.lastPY = p.y;
                n.x = p.x; n.y = p.y;
            });
            function endDrag(e) {
                if (!n.isDragging) return;
                n.isDragging = false; n.isPressed = false;
                hit.style.cursor = "grab";
                n.springActive = true;
                n.springVX = n.vx * 6; n.springVY = n.vy * 6;
                spawnDroplets(n.x, n.y, n.vx * 8, n.vy * 8);
                scheduleCollapse(n);
            }
            hit.addEventListener("pointerup", endDrag);
            hit.addEventListener("pointercancel", endDrag);

            const childHits = n.children.map((child) => {
                const chit = svgEl("circle", { cx: n.x, cy: n.y, r: 24, fill: "transparent", opacity: 0, style: "cursor:pointer;pointer-events:none" });
                group.appendChild(chit);
                chit.addEventListener("pointerenter", () => {
                    cancelCollapse(n);
                    child.isHovered = true;
                });
                chit.addEventListener("pointerleave", () => {
                    if (!n.isDragging) scheduleCollapse(n);
                    child.isHovered = false;
                });
                chit.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const cs = window.coreState;
                    if (!cs || !cs.treeOpen || n.expandP < 0.5) return;
                    const targetRoute = ALL_PROJECTS_MAP[child.routeId];
                    if (targetRoute) openDrawer(targetRoute);
                });
                return chit;
            });

            const label = document.createElement("div");
            label.className = "node-label";
            label.innerHTML = `<b style="font-size:12px">${n.name}</b>`;
            // 主標籤惸入時也取消收合
            label.addEventListener("pointerenter", () => cancelCollapse(n));
            label.addEventListener("pointerleave", () => { if (!n.isDragging) scheduleCollapse(n); });
            labelLayer.appendChild(label);
            // 物理狀態：皮筋引回 home + 碰撞反射
            const labelP = { el: label, lx: CX, ly: CY, lvx: 0, lvy: 0, homeX: CX, homeY: CY, w: 92, h: 28, visP: 0 };

            const childLabels = n.children.map((c) => {
                const clabel = document.createElement("div");
                clabel.className = "node-label child"; clabel.textContent = c.name; clabel.style.opacity = 0;
                clabel.style.pointerEvents = "auto";
                clabel.style.cursor = "pointer";
                // 踏入子標籤即取消收合計時（修復滑鼠移進標籤內就消失的問題）
                clabel.addEventListener("pointerenter", () => cancelCollapse(n));
                clabel.addEventListener("pointerleave", () => { if (!n.isDragging) scheduleCollapse(n); });
                clabel.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const cs = window.coreState;
                    if (!cs || !cs.treeOpen || n.expandP < 0.5) return;
                    const targetRoute = ALL_PROJECTS_MAP[c.routeId];
                    if (targetRoute) openDrawer(targetRoute);
                });
                labelLayer.appendChild(clabel);
                return clabel;
            });
            const childLabelPs = n.children.map((c, ci) => ({
                el: childLabels[ci], lx: CX, ly: CY, lvx: 0, lvy: 0, homeX: CX, homeY: CY, w: 136, h: 26, visP: 0
            }));

            return { group, brush, brushHit, halo, body, hit, labelP, childBrushEls, childEls, childHits, childLabels, childLabelPs };
        });

        return { nodes, nodeEls };
    }


    let spawnT = 0;
    const SPAWN_DUR = 1.6;

    // 🌊 Main Ink Wash Tech Tree Physics Loop
    function startInkWashEngineLoop(nodes, nodeEls) {
        function frame() {
            clockT += 0.016;
            const t = clockT;
            spawnT = Math.min(1, spawnT + 0.016 / SPAWN_DUR);
            const ease = 1 - Math.pow(1 - spawnT, 3);

            const cs = window.coreState;
            if (cs.isDragging) {
            } else if (cs.springActive) {
                // 超流暢果凍臨彈簧平滑器 (Smoothed Fluid Spring Inertia)
                const k = 65, damping = 10.0, dt = 0.016;
                const ax = k * (cs.baseX - cs.x) - damping * cs.springVX;
                const ay = k * (cs.baseY - cs.y) - damping * cs.springVY;
                cs.springVX += ax * dt; cs.springVY += ay * dt;
                cs.x += cs.springVX * dt; cs.y += cs.springVY * dt;
                if (Math.hypot(cs.baseX - cs.x, cs.baseY - cs.y) < 0.5 && Math.hypot(cs.springVX, cs.springVY) < 2) {
                    cs.springActive = false;
                    cs.x = cs.baseX; cs.y = cs.baseY;
                }
            }

            // 🫧 Core blob: 收合時巨幅放大至紅框範疇 (r=115px)，展開時平滑濃縮至標準尺寸 (r=45px)
            // 🖤 宣紙濃墨韻味與慣性滯後拉伸系統 (Inertial Fluid Stretch & Lag System)
            cs.openProgress = (cs.openProgress !== undefined ? cs.openProgress : (cs.treeOpen ? 1 : 0));
            cs.openProgress += ((cs.treeOpen ? 1 : 0) - cs.openProgress) * 0.08;

            const unexpandedR = 115; // 全收合大尺寸 (r=115px)
            const expandedR = 45;    // 展開精緻尺寸 (r=45px)
            const targetBaseR = unexpandedR - cs.openProgress * (unexpandedR - expandedR);

            const pressedT = cs.isPressed ? 1 : 0;
            cs.pressedAmt = (cs.pressedAmt || 0) + (pressedT - (cs.pressedAmt || 0)) * 0.18;
            cs.releaseBounceAmt = (cs.releaseBounceAmt || 0) * 0.90;
            const releaseWave = Math.sin(t * 14) * 0.08 * cs.releaseBounceAmt;
            cs.clickImpact = (cs.clickImpact || 0) * 0.91; // 自然平滑衰減

            // 1. 動態物理速度與方向角度計算 (僅在拖拽時動態計算角度，放手時平滑鎖定防止迴轉卡頓)
            const curVx = cs.isDragging ? cs.vx : (cs.x - (cs.prevX || cs.x));
            const curVy = cs.isDragging ? cs.vy : (cs.y - (cs.prevY || cs.y));
            cs.prevX = cs.x; cs.prevY = cs.y;

            cs.smoothVx = (cs.smoothVx || 0) + (curVx - (cs.smoothVx || 0)) * 0.18;
            cs.smoothVy = (cs.smoothVy || 0) + (curVy - (cs.smoothVy || 0)) * 0.18;
            const moveSpeed = Math.hypot(cs.smoothVx, cs.smoothVy);

            if (cs.isDragging && moveSpeed > 0.8) {
                cs.lastMoveAngle = Math.atan2(cs.smoothVy, cs.smoothVx) * 180 / Math.PI;
            }
            const moveAngleDeg = cs.lastMoveAngle || 0;

            // 拖拽時產生拉伸量，放手時以 0.82 的優雅比率自然漸變收縮歸零，絕對無卡頓
            if (cs.isDragging) {
                const targetStretch = Math.min(0.32, moveSpeed * 0.015);
                cs.stretchAmt = (cs.stretchAmt || 0) + (targetStretch - (cs.stretchAmt || 0)) * 0.2;
            } else {
                cs.stretchAmt = (cs.stretchAmt || 0) * 0.82;
            }

            const stretchFactor = cs.stretchAmt || 0;
            const stretchX = (1.0 + stretchFactor).toFixed(3);
            const stretchY = (1.0 / (1.0 + stretchFactor * 0.5)).toFixed(3);

            // 2. 質感質心滯後跟隨 (Inertial Mass Lag for Halo & Text)
            cs.lagX = (cs.lagX !== undefined ? cs.lagX : cs.x) + (cs.x - (cs.lagX !== undefined ? cs.lagX : cs.x)) * 0.15;
            cs.lagY = (cs.lagY !== undefined ? cs.lagY : cs.y) + (cs.y - (cs.lagY !== undefined ? cs.lagY : cs.y)) * 0.15;

            // 沉靜呼吸與點擊微反彈
            const pulseScale = targetBaseR / 45;
            const pulseR = (Math.sin(t * 1.2) * 4.5 + Math.cos(t * 2.0) * 2.2) * pulseScale;
            const totalPress = Math.max(cs.pressedAmt, cs.clickImpact * 0.7);
            const coreRadius = Math.max(12, (targetBaseR + pulseR) * (1.0 - totalPress * 0.08));

            // 更新黑球圓形幾何
            cs.coreOutline.setAttribute("cx", cs.x);
            cs.coreOutline.setAttribute("cy", cs.y);
            cs.coreOutline.setAttribute("r", coreRadius);

            // 沿運動方向產生的方向性液體拉伸與受壓微縮放 (Combined Stretch & Press & Bounce)
            const scaleRatio = (1.0 - totalPress * 0.06) * (1.0 + releaseWave);
            cs.coreOutline.setAttribute("transform", `translate(${cs.x} ${cs.y}) rotate(${moveAngleDeg.toFixed(1)}) scale(${stretchX} ${stretchY}) rotate(${-moveAngleDeg.toFixed(1)}) scale(${scaleRatio.toFixed(3)}) translate(${-cs.x} ${-cs.y})`);

            // 🤍 宣紙白墨標誌 "R" 光學幾何絕對 100% 死死置中 (x - 0.2, y - 0.5)
            if (cs.coreText) {
                cs.coreText.setAttribute("x", cs.x - 0.2);
                cs.coreText.setAttribute("y", cs.y - 0.5);

                const realCoreScale = (coreRadius / 24.0) * scaleRatio;
                const textStretchX = (realCoreScale * stretchX).toFixed(4);
                const textStretchY = (realCoreScale * stretchY).toFixed(4);
                cs.coreText.setAttribute("transform", `translate(${cs.x} ${cs.y}) rotate(${moveAngleDeg.toFixed(1)}) scale(${textStretchX} ${textStretchY}) rotate(${-moveAngleDeg.toFixed(1)}) translate(${-cs.x} ${-cs.y})`);
            }

            // 宣紙濃淡暈染水墨光圍（同心對齊氣場）
            cs.coreHalo.setAttribute("cx", cs.x);
            cs.coreHalo.setAttribute("cy", cs.y);
            cs.coreHalo.setAttribute("r", coreRadius * 1.68 + Math.sin(t * 1.2) * 6.5);
            if (cs.coreHit) {
                cs.coreHit.setAttribute("cx", cs.x);
                cs.coreHit.setAttribute("cy", cs.y);
                cs.coreHit.setAttribute("r", coreRadius + 18);
            }

            const burst = Math.max(0, 1 - (t - cs.clickBurstT) / 1.0) * 1.3;
            const targetEnergy = (cs.hoverCore ? 0.65 : 0.15) + burst;
            cs.swirlEnergy += (targetEnergy - cs.swirlEnergy) * 0.07;

            nodes.forEach((n, i) => {
                const treeOpenFactor = cs.openProgress; // 使用平滑過渡因子

                if (!cs.treeOpen && cs.openProgress < 0.05) {
                    // 全收合狀態：分支座標硬性鎖定於核心正中心，絕不產生滯後拉伸
                    n.x = cs.x;
                    n.y = cs.y;
                    n.springActive = false;
                    n.springVX = 0; n.springVY = 0;
                } else if (n.isDragging) {
                } else if (n.springActive) {
                    const k = 95, damping = 8.5, dt = 0.016;
                    const targetX = cs.x + (n.baseX - CX) * treeOpenFactor;
                    const targetY = cs.y + (n.baseY - CY) * treeOpenFactor;
                    const ax = k * (targetX - n.x) - damping * n.springVX;
                    const ay = k * (targetY - n.y) - damping * n.springVY;
                    n.springVX += ax * dt; n.springVY += ay * dt;
                    n.x += n.springVX * dt; n.y += n.springVY * dt;
                    const dist = Math.hypot(targetX - n.x, targetY - n.y);
                    const speed = Math.hypot(n.springVX, n.springVY);
                    if (dist < 0.6 && speed < 3) n.springActive = false;
                } else {
                    const driftX = Math.sin(t * 0.4 + n.phase) * 4 * treeOpenFactor;
                    const driftY = Math.cos(t * 0.35 + n.phase * 1.3) * 4 * treeOpenFactor;
                    const targetX = cs.x + (n.baseX - CX) * treeOpenFactor;
                    const targetY = cs.y + (n.baseY - CY) * treeOpenFactor;
                    n.x += (targetX + driftX - n.x) * 0.1;
                    n.y += (targetY + driftY - n.y) * 0.1;
                }

                n.expandP += ((n.expanded ? 1 : 0) - n.expandP) * 0.09;
                n.hoverAmt += ((n.expanded ? 1 : 0) - n.hoverAmt) * 0.1;

                // 🫧 Branch node: pressed 時液態 XY 不對稱形變 (X 壓扁 / Y 膨脹)
                n.pressedAmt = (n.pressedAmt || 0) + ((n.isPressed ? 1 : 0) - (n.pressedAmt || 0)) * 0.18;
                const baseCluster = 1 + n.hoverAmt * 0.5 + (n.isDragging ? 0.12 : 0);
                const clusterScale = baseCluster; // 子標籤定位用
                const squishX = baseCluster * (1 - n.pressedAmt * 0.22);
                const squishY = baseCluster * (1 + n.pressedAmt * 0.18);
                const breathR = n.r + Math.sin(t * 0.8 + n.phase) * 1.2;

                const els = nodeEls[i];
                // XY 不對稱 scale 讓球體如液體被按壓般橫向壓扁
                els.group.setAttribute("transform", `translate(${n.x} ${n.y}) scale(${squishX} ${squishY}) translate(${-n.x} ${-n.y})`);

                els.body.setAttribute("cx", n.x); els.body.setAttribute("cy", n.y); els.body.setAttribute("r", breathR);
                els.halo.setAttribute("cx", n.x); els.halo.setAttribute("cy", n.y); els.halo.setAttribute("r", breathR * 1.7);
                els.hit.setAttribute("cx", n.x); els.hit.setAttribute("cy", n.y);

                const taut = n.isDragging ? 1 : 0;
                const plw = Math.max(0, 1 - (t - n.pluckT) / 0.8);
                const pluck = Math.sin((t - n.pluckT) * 20) * plw * n.pluckAmp;
                const wobble = (1 - taut) * (Math.sin(t * 0.6 + n.phase) * 10) + pluck;
                const mx = (cs.x + n.x) / 2, my = (cs.y + n.y) / 2;
                const dx = n.x - cs.x, dy = n.y - cs.y, len = Math.hypot(dx, dy) || 1;
                const px = -dy / len, py = dx / len;
                const bowX = mx + px * wobble, bowY = my + py * wobble;
                const d = `M ${cs.x} ${cs.y} Q ${bowX} ${bowY} ${n.x} ${n.y}`;
                const branchDistance = Math.hypot(n.x - cs.x, n.y - cs.y);
                const rawVis = Math.min(1, branchDistance / 40);
                // 嚴格規範：當未展開 (!cs.treeOpen) 時，分支與標籤能見度強制歸零 (0)，絕不露顯跑出
                const nodeVisibilityP = cs.treeOpen ? Math.min(rawVis, cs.openProgress * 1.5) : Math.max(0, (cs.openProgress - 0.2) * 1.25);

                els.body.setAttribute("opacity", nodeVisibilityP);
                els.halo.setAttribute("opacity", nodeVisibilityP * 0.7);
                els.hit.style.pointerEvents = nodeVisibilityP > 0.4 ? "auto" : "none";

                els.brush.forEach((l, li) => {
                    l.setAttribute("d", d);
                    l.setAttribute("opacity", nodeVisibilityP * ease * (0.5 + n.hoverAmt * 0.2 + taut * 0.25) * (li === 2 ? 0.6 : 1));
                    l.setAttribute("stroke-width", (li === 0 ? 5.2 : li === 1 ? 3 : 1.3) * (1 + taut * 0.25));
                });
                els.brushHit.setAttribute("d", d);

                // 🏷️ 主標題 home 座標：球心向下 n.r*2.6 確保完全在光暈外
                els.labelP.homeX = n.x;
                els.labelP.homeY = n.y + n.r * 2.6 + els.labelP.h * 0.5 + 5;
                els.labelP.visP = nodeVisibilityP * ease;

                n.children.forEach((c, ci) => {
                    const dist = c.dist * n.expandP;
                    c.cx = n.x + Math.cos(c.angle) * dist;
                    c.cy = n.y + Math.sin(c.angle) * dist;
                    const cr = 16 + Math.sin(t * 1.2 + ci) * 0.8;

                    els.childEls[ci].body.setAttribute("cx", c.cx); els.childEls[ci].body.setAttribute("cy", c.cy);
                    els.childEls[ci].body.setAttribute("r", cr); els.childEls[ci].body.setAttribute("opacity", n.expandP);
                    els.childEls[ci].halo.setAttribute("cx", c.cx); els.childEls[ci].halo.setAttribute("cy", c.cy);
                    els.childEls[ci].halo.setAttribute("r", cr * 1.6); els.childEls[ci].halo.setAttribute("opacity", n.expandP * 0.7);
                    els.childEls[ci].text.setAttribute("x", c.cx); els.childEls[ci].text.setAttribute("y", c.cy + 0.5);
                    els.childEls[ci].text.setAttribute("opacity", n.expandP);

                    els.childHits[ci].setAttribute("cx", c.cx); els.childHits[ci].setAttribute("cy", c.cy);
                    els.childHits[ci].style.pointerEvents = n.expandP > 0.55 ? "auto" : "none";

                    const cbow = (n.x + c.cx) / 2 + Math.sin(t * 1 + ci) * 6, cbowY = (n.y + c.cy) / 2 + Math.cos(t * 0.9 + ci) * 6;
                    els.childBrushEls[ci].forEach((l, li) => { l.setAttribute("d", `M ${n.x} ${n.y} Q ${cbow} ${cbowY} ${c.cx} ${c.cy}`); l.setAttribute("opacity", n.expandP * (li === 2 ? 0.4 : 0.65)); });

                    // 🏷️ 放射狀直連對齊：沿子分支伸展角度 c.angle 自然延伸，置於外側上方
                    const dx = Math.cos(c.angle);
                    const dy = Math.sin(c.angle);
                    const offset = 26; // 留出放大子節點的外圍間距
                    const labelX = c.cx + dx * offset;
                    const labelY = c.cy + dy * offset - 12;
                    const childLabelOpacity = nodeVisibilityP * Math.max(0, n.expandP - 0.3) / 0.7;

                    const clp = els.childLabelPs[ci];
                    clp.lx = labelX;
                    clp.ly = labelY;
                    clp.visP = childLabelOpacity;
                    clp.dx = dx;
                    clp.dy = dy;
                    clp.isHovered = !!c.isHovered;
                });
            });

            // 🔮 Label Physics System — 主標題物理 + 子標題放射鎖定直連
            const labelBodies = [
                { x: cs.x, y: cs.y, r: cs.core.r + 10 },
                ...nodes.map(n2 => ({ x: n2.x, y: n2.y, r: n2.r + 8 }))
            ];
            nodeEls.forEach((els2, ni2) => {
                const n2 = nodes[ni2];
                // 主標題物理
                const lp = els2.labelP;
                const ownBodyIdx = ni2 + 1;
                lp.lvx += (lp.homeX - lp.lx) * 0.08;
                lp.lvy += (lp.homeY - lp.ly) * 0.08;
                labelBodies.forEach((b, bi) => {
                    if (bi === ownBodyIdx) return;
                    if (b.r < 2) return;
                    const d = Math.hypot(lp.lx - b.x, lp.ly - b.y);
                    const minD = b.r + lp.w * 0.5;
                    if (d < minD && d > 0.5) {
                        const f = (minD - d) / minD * 4.5;
                        lp.lvx += (lp.lx - b.x) / d * f;
                        lp.lvy += (lp.ly - b.y) / d * f;
                    }
                });
                lp.lvx *= 0.72; lp.lvy *= 0.72;
                lp.lx += lp.lvx; lp.ly += lp.lvy;
                // ✨ 水墨暈染進出場微動畫 (Ink Bleed / Dissolve Effect)
                const fadeFactor = Math.max(0, 1 - n2.expandP * 1.8);
                const dissolveOpacity = lp.visP * fadeFactor;
                const dissolveBlur = (1 - fadeFactor) * 12;
                const dissolveScale = (1 + n2.hoverAmt * 0.12) * (1 + (1 - fadeFactor) * 0.18);
                const dissolveSpacing = (0.04 + (1 - fadeFactor) * 0.25) + "em";

                lp.el.style.left = lp.lx / W * 100 + "%";
                lp.el.style.top = lp.ly / H * 100 + "%";
                lp.el.style.transform = `translate(-50%, -50%) scale(${dissolveScale})`;
                lp.el.style.opacity = dissolveOpacity;
                lp.el.style.filter = dissolveBlur > 0.1 ? `blur(${dissolveBlur.toFixed(1)}px)` : "none";
                lp.el.style.letterSpacing = dissolveSpacing;
                lp.el.style.pointerEvents = dissolveOpacity > 0.3 ? "auto" : "none";

                // 🏷️ 全名標籤 Tooltip 懸停 Hover 智慧外側浮現 (精確置於使用者紅框區域)
                n2.children.forEach((c2, ci2) => {
                    const clp = els2.childLabelPs[ci2];
                    clp.el.style.left = (clp.lx / W * 100).toFixed(2) + "%";
                    clp.el.style.top = (clp.ly / H * 100).toFixed(2) + "%";
                    const alignLeft = clp.dx < 0;
                    const alignTop = clp.dy <= 0;

                    // 當懸停 hover 到該子節點時，顯示完整全名 Tooltip
                    const isHovered = !!clp.isHovered;
                    const finalOpacity = isHovered ? clp.visP : 0;
                    const finalScale = isHovered ? 1 : 0.85;

                    clp.el.style.transform = `translate(${alignLeft ? "-100%" : "0%"}, ${alignTop ? "-100%" : "0%"}) scale(${finalScale})`;
                    clp.el.style.opacity = finalOpacity;
                    clp.el.style.pointerEvents = finalOpacity > 0.4 ? "auto" : "none";
                });
            });

            droplets = droplets.filter(p => {

                p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.life -= p.decay;
                if (p.life <= 0) { p.el.remove(); return false; }
                p.el.setAttribute("cx", p.x); p.el.setAttribute("cy", p.y);
                p.el.setAttribute("opacity", p.life * 0.85);
                return true;
            });

            ripples = ripples.filter(r => {
                r.age += 0.016;
                if (r.age < r.delay) { r.el.setAttribute("opacity", 0); return true; }
                const p = Math.min(1, (r.age - r.delay) / 0.9);
                r.el.setAttribute("r", 2 + p * r.maxR);
                r.el.setAttribute("opacity", (1 - p) * 0.5);
                if (p >= 1) { r.el.remove(); return false; }
                return true;
            });

            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    // 🎯 8. Render All Anchor Grids with 3D Magnetic Tilt
    function renderAllRouteGrids() {
        const routes = getFilteredRoutes();

        renderSingleGrid("grid-future", routes.filter(r => r.category === "FutureRoute"));
        renderSingleGrid("grid-trouble", routes.filter(r => r.category === "Troubleshooting"));
        renderSingleGrid("grid-legacy", routes.filter(r => r.category === "LegacyRoute"));
        renderSingleGrid("grid-learning", routes.filter(r => r.category === "LearningActivity"));
    }

    function renderSingleGrid(containerId, routeList) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = "";

        if (routeList.length === 0) {
            container.innerHTML = `<div style="color:var(--gray-3); font-family:var(--font-mono); padding:1rem 0;">該分類下無匹配專案</div>`;
            return;
        }

        routeList.forEach((route, i) => {
            const card = document.createElement("div");
            card.className = "mono-subcard";
            card.setAttribute("data-id", route.id);
            card.style.transitionDelay = `${i * 18}ms`;
            card.innerHTML = `
                <div class="code">SPEC // ${route.code} · ${route.typeLabel}</div>
                <div class="title">${route.title}</div>
                <div class="desc">${route.description}</div>
                <div style="display:flex; gap:0.5rem; margin-top:auto;">
                    <button class="mono-btn primary open-drawer-btn" data-id="${route.id}">
                        📖 規格速覽
                    </button>
                    <a href="${route.path}" target="_blank" class="mono-btn">
                        完整頁面 &rarr;
                    </a>
                </div>
            `;

            setupOptimized3DMagneticTilt(card);

            card.querySelector(".open-drawer-btn").addEventListener("click", (e) => {
                e.stopPropagation();
                openDrawer(route);
            });

            container.appendChild(card);
        });
    }

    function setupOptimized3DMagneticTilt(card) {
        let ticking = false;
        let mouseX = 0, mouseY = 0;

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;

            if (!ticking) {
                requestAnimationFrame(() => {
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = ((centerY - mouseY) / centerY) * 7.5;
                    const rotateY = ((mouseX - centerX) / centerX) * 7.5;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            renderAllRouteGrids();
        });
    }

    function openDrawer(route) {
        drawerTitle.textContent = route.title;
        drawerCode.textContent = `SPEC // ${route.code}`;
        drawerIframe.src = route.path;
        drawerExternalLink.href = route.path;
        drawer.classList.add("active");
        drawerOverlay.classList.add("active");
    }

    function closeDrawer() {
        drawer.classList.remove("active");
        drawerOverlay.classList.remove("active");
    }

    if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeDrawer();
    });
});
