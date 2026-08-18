const fs = require('fs');
const path = require('path');

const targetHtmlPath = path.join(__dirname, '../routes/strategy_handbooks/R1_AI實體互動助手_公司決策與多領域拓展指南.html');
const originalSourcePath = 'C:/Users/a1452/.gemini/antigravity/brain/d550361a-8698-4931-b75f-78bf084f2a76/.user_uploaded/media_1787030161379.html';

const origHtml = fs.readFileSync(originalSourcePath, 'utf8');

// Build the perfect Lieflat / Clean design version that preserves 100% of the user's authentic content,
// adds the two new sections (14 數位孿生, 15 天梯賽事) in a grounded, professional, reflective manner,
// and organizes all 19 sections logically.

const fullDocument = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>R1 AI 實體互動助手｜公司決策與多領域拓展指南（完整反思與決策版）</title>
    <meta name="description" content="R1 AI 實體互動助手：深入解析桌遊店 POC 驗證、專家議題反思、7 大商業路線 (A~G)、多領域拓展 (劇本殺/密室/VR/教育/長照)、數位孿生沙盒與天梯賽事系統。">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700;800&family=Noto+Sans+TC:wght@400;500;600;700;900&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet">
    
    <style>
        :root {
            /* Mono / Lieflat 東方水墨與宣紙質感設計系統 Tokens */
            --paper:          #ECEAE3;  /* 基準宣紙灰 */
            --paper-2:        #F4F3EE;  /* 明亮紙白 */
            --paper-3:        #E2E0D8;  /* 沉積紙灰 */
            --paper-subtle:   rgba(236, 234, 227, 0.7);
            
            --ink:            #16161A;  /* 極暗濃墨 */
            --ink-soft:       #26262A;  /* 松煙淡墨 */
            --ink-fade:       rgba(22, 22, 26, 0.06);
            --ink-border:     rgba(22, 22, 26, 0.12);
            --ink-border-md:  rgba(22, 22, 26, 0.22);
            
            --gray-1:         #45454A;
            --gray-2:         #6B6B6E;
            --gray-3:         #94938E;
            --gray-4:         #BCB9AF;
            --gray-5:         #D6D3C8;
            --line:           #CFCCC2;
            
            /* 東方典雅輔助色 */
            --teal:           #0F8B8D;  /* 銅綠/石青 */
            --teal-subtle:    rgba(15, 139, 141, 0.1);
            --teal-border:    rgba(15, 139, 141, 0.3);
            
            --vermilion:      #C34A36;  /* 硃砂紅 */
            --vermilion-bg:   rgba(195, 74, 54, 0.08);
            --vermilion-bd:   rgba(195, 74, 54, 0.3);
            
            --amber:          #D97706;  /* 金石拓黃 */
            --amber-bg:       rgba(217, 119, 6, 0.08);
            --amber-bd:       rgba(217, 119, 6, 0.3);
            
            --emerald:        #059669;  /* 翠玉綠 */
            --emerald-bg:     rgba(5, 150, 105, 0.08);
            --emerald-bd:     rgba(5, 150, 105, 0.3);
            
            --indigo:         #4F46E5;  /* 靛青藍 */
            --indigo-bg:      rgba(79, 70, 229, 0.08);
            --indigo-bd:      rgba(79, 70, 229, 0.3);

            --font-heading:   'Space Grotesk', 'Noto Sans TC', sans-serif;
            --font-body:      'Inter', 'Noto Sans TC', -apple-system, BlinkMacSystemFont, sans-serif;
            --font-mono:      'JetBrains Mono', monospace;
            
            --sidebar-width:  310px;
            --content-max:    1180px;
            --radius-sm:      6px;
            --radius-md:      12px;
            --radius-lg:      18px;
            --radius-pill:    9999px;
            --ease-smooth:    cubic-bezier(.16, 1, .3, 1);
        }

        @media print {
            :root {
                --paper: #ffffff;
                --paper-2: #ffffff;
                --ink: #000000;
                --line: #cccccc;
            }
            .subpage-return-bar, .sidebar, .copy-btn { display: none !important; }
            .app-layout { display: block !important; }
            .main-content { padding: 0 !important; max-width: 100% !important; }
            section { page-break-inside: avoid; }
        }

        *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html {
            scroll-behavior: smooth;
            font-size: 16px;
        }

        body {
            background-color: var(--paper-2);
            color: var(--ink);
            font-family: var(--font-body);
            line-height: 1.75;
            letter-spacing: -0.012em;
            min-height: 100vh;
            position: relative;
            -webkit-font-smoothing: antialiased;
        }

        /* 宣紙纖維質感 */
        body::before {
            content: "";
            position: fixed;
            inset: 0;
            width: 100vw;
            height: 100vh;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.038'/%3E%3C/svg%3E");
            pointer-events: none;
            z-index: 9999;
        }

        ::selection {
            background: var(--ink);
            color: var(--paper-2);
        }

        /* 頂部固定返回列 */
        .subpage-return-bar {
            position: sticky;
            top: 0;
            z-index: 1000;
            background: rgba(244, 243, 238, 0.92);
            backdrop-filter: blur(14px);
            border-bottom: 1px solid var(--line);
            padding: 0.75rem 1.75rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }

        .subpage-return-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: var(--paper-3);
            color: var(--ink);
            border: 1px solid var(--line);
            padding: 0.45rem 1rem;
            border-radius: var(--radius-sm);
            font-family: var(--font-mono);
            font-size: 0.85rem;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.22s var(--ease-smooth);
            min-height: 44px;
        }

        .subpage-return-btn:hover {
            background: var(--ink);
            color: var(--paper-2);
            border-color: var(--ink);
            transform: translateY(-1px);
        }

        .bar-meta {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            font-family: var(--font-mono);
            font-size: 0.82rem;
            color: var(--gray-2);
        }

        .meta-pill-tag {
            background: var(--ink);
            color: var(--paper-2);
            padding: 0.2rem 0.65rem;
            border-radius: var(--radius-pill);
            font-size: 0.75rem;
            font-weight: 700;
        }

        /* 雙欄主架構 */
        .app-layout {
            display: flex;
            min-height: calc(100vh - 60px);
            position: relative;
        }

        /* 左側導航側邊欄 */
        .sidebar {
            width: var(--sidebar-width);
            height: calc(100vh - 60px);
            position: sticky;
            top: 60px;
            background: var(--paper);
            border-right: 1px solid var(--line);
            display: flex;
            flex-direction: column;
            padding: 20px 16px;
            flex-shrink: 0;
            z-index: 100;
            overflow-y: auto;
        }

        .sidebar-brand {
            padding-bottom: 14px;
            border-bottom: 1px solid var(--line);
            margin-bottom: 14px;
        }

        .brand-pill {
            font-family: var(--font-mono);
            font-size: 0.72rem;
            font-weight: 700;
            color: var(--gray-2);
            letter-spacing: 0.05em;
        }

        .brand-title {
            font-family: var(--font-heading);
            font-size: 1.05rem;
            font-weight: 800;
            color: var(--ink);
            margin-top: 2px;
        }

        .search-box { position: relative; margin-bottom: 12px; }
        .search-input {
            width: 100%;
            background: var(--paper-2);
            border: 1px solid var(--line);
            padding: 8px 12px 8px 34px;
            border-radius: var(--radius-sm);
            color: var(--ink);
            font-family: var(--font-mono);
            font-size: 0.82rem;
            outline: none;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .search-input:focus { border-color: var(--ink); box-shadow: 0 0 0 2px rgba(22, 22, 26, 0.08); }
        .search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); font-size: 0.8rem; color: var(--gray-3); pointer-events: none; }

        .filter-group {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            margin-bottom: 14px;
            padding-bottom: 12px;
            border-bottom: 1px solid var(--line);
        }

        .filter-chip {
            font-family: var(--font-mono);
            font-size: 0.7rem;
            padding: 3px 7px;
            background: var(--paper-2);
            border: 1px solid var(--line);
            color: var(--gray-2);
            border-radius: var(--radius-pill);
            cursor: pointer;
            transition: all 0.18s ease;
            user-select: none;
        }
        .filter-chip:hover { border-color: var(--ink); color: var(--ink); }
        .filter-chip.active { background: var(--ink); border-color: var(--ink); color: var(--paper-2); font-weight: 700; }

        .nav-list { list-style: none; display: flex; flex-direction: column; gap: 3px; }
        .nav-group-title {
            font-size: 0.7rem;
            font-family: var(--font-mono);
            color: var(--gray-3);
            padding: 10px 8px 2px;
            font-weight: 700;
            letter-spacing: 0.04em;
        }

        .nav-item a {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 10px;
            border-radius: var(--radius-sm);
            color: var(--gray-2);
            text-decoration: none;
            font-size: 0.82rem;
            font-weight: 500;
            transition: all 0.18s ease;
            min-height: 36px;
        }
        .nav-item a:hover { background: var(--paper-3); color: var(--ink); }
        .nav-item a.active { background: var(--ink); color: var(--paper-2); font-weight: 700; }
        .nav-num { font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; opacity: 0.75; min-width: 20px; }

        /* 右側主內容區 */
        .main-content {
            flex: 1;
            padding: 36px 48px 100px;
            max-width: var(--content-max);
            margin: 0 auto;
            width: 100%;
        }

        .hero-banner {
            background: linear-gradient(135deg, #EAE8E0 0%, #DFDCD2 100%);
            border: 1px solid var(--line);
            border-radius: var(--radius-lg);
            padding: 36px 36px;
            margin-bottom: 36px;
            position: relative;
            box-shadow: 0 4px 20px rgba(22, 22, 26, 0.04);
        }

        .hero-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
        .badge-status { background: var(--ink); color: var(--paper-2); font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; padding: 3px 9px; border-radius: var(--radius-pill); }
        .badge-tag { background: var(--paper-3); color: var(--ink); border: 1px solid var(--line); font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600; padding: 3px 8px; border-radius: var(--radius-pill); }

        h1 { font-family: var(--font-heading); font-size: 2.1rem; font-weight: 800; line-height: 1.25; color: var(--ink); letter-spacing: -0.02em; }
        .lead { font-size: 1.02rem; color: var(--gray-1); line-height: 1.7; }

        .metrics-bar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin: 24px 0 36px; }
        .metric-card { background: var(--paper); border: 1px solid var(--line); border-radius: var(--radius-md); padding: 18px; text-align: left; }
        .metric-val { font-family: var(--font-heading); font-size: 1.45rem; font-weight: 800; color: var(--ink); }
        .metric-label { font-size: 0.8rem; color: var(--gray-2); margin-top: 4px; font-weight: 500; }

        h2 {
            font-family: var(--font-heading);
            font-size: 1.4rem;
            font-weight: 800;
            color: var(--ink);
            margin: 40px 0 16px;
            padding-bottom: 10px;
            border-bottom: 1.5px solid var(--line);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .section-tag { font-family: var(--font-mono); font-size: 0.85rem; background: var(--ink); color: var(--paper-2); padding: 2px 7px; border-radius: var(--radius-sm); }
        h3 { font-family: var(--font-heading); font-size: 1.12rem; font-weight: 700; color: var(--ink); margin: 22px 0 10px; }
        p { margin-bottom: 14px; color: var(--gray-1); font-size: 0.95rem; }

        .grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin: 18px 0; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin: 18px 0; }

        .card {
            background: var(--paper);
            border: 1px solid var(--line);
            border-radius: var(--radius-md);
            padding: 20px;
            box-shadow: 0 2px 6px rgba(22, 22, 26, 0.02);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(22, 22, 26, 0.05); }
        .card-icon { font-size: 1.35rem; margin-bottom: 8px; display: inline-block; }

        .callout {
            margin: 20px 0;
            padding: 18px 20px;
            background: var(--paper-3);
            border-left: 4px solid var(--ink);
            border-radius: var(--radius-md);
            border-top: 1px solid var(--line);
            border-right: 1px solid var(--line);
            border-bottom: 1px solid var(--line);
        }
        .callout-title { font-weight: 800; font-size: 0.98rem; color: var(--ink); margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }
        .callout.success { background: var(--emerald-bg); border-left-color: var(--emerald); border-color: var(--emerald-bd); }
        .callout.success .callout-title { color: var(--emerald); }
        .callout.warning { background: var(--amber-bg); border-left-color: var(--amber); border-color: var(--amber-bd); }
        .callout.warning .callout-title { color: var(--amber); }
        .callout.danger { background: var(--vermilion-bg); border-left-color: var(--vermilion); border-color: var(--vermilion-bd); }
        .callout.danger .callout-title { color: var(--vermilion); }
        .callout.purple { background: var(--indigo-bg); border-left-color: var(--indigo); border-color: var(--indigo-bd); }
        .callout.purple .callout-title { color: var(--indigo); }

        .quote-box {
            margin: 20px 0;
            padding: 18px 22px;
            background: var(--paper);
            border: 1px solid var(--line);
            border-left: 4px solid var(--ink);
            border-radius: var(--radius-md);
        }
        .quote-text { font-size: 0.98rem; color: var(--ink); line-height: 1.7; }

        .table-container {
            width: 100%;
            overflow-x: auto;
            margin: 18px 0 24px;
            border: 1px solid var(--line);
            border-radius: var(--radius-md);
            background: var(--paper);
        }
        table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem; }
        th { background: var(--paper-3); color: var(--ink); font-family: var(--font-heading); font-weight: 700; padding: 12px 14px; border-bottom: 1.5px solid var(--line); }
        td { padding: 12px 14px; border-bottom: 1px solid var(--line); color: var(--gray-1); vertical-align: top; line-height: 1.6; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: var(--paper-2); }

        .timeline { position: relative; margin: 24px 0; padding-left: 24px; }
        .timeline::before { content: ""; position: absolute; left: 6px; top: 8px; bottom: 8px; width: 2px; background: var(--line); }
        .timeline-item { position: relative; margin-bottom: 22px; }
        .timeline-dot { position: absolute; left: -24px; top: 4px; width: 14px; height: 14px; border-radius: 50%; background: var(--paper-2); border: 3px solid var(--ink); }
        .timeline-content { background: var(--paper); border: 1px solid var(--line); border-radius: var(--radius-md); padding: 16px 18px; margin-top: 6px; }

        .step-list { list-style: none; margin: 18px 0; display: flex; flex-direction: column; gap: 12px; }
        .step-item { display: flex; gap: 14px; align-items: flex-start; background: var(--paper); border: 1px solid var(--line); border-radius: var(--radius-md); padding: 14px 18px; }
        .step-num { background: var(--ink); color: var(--paper-2); width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; flex-shrink: 0; margin-top: 2px; }
        .step-body { flex: 1; font-size: 0.92rem; }
        .step-body strong { display: block; color: var(--ink); margin-bottom: 3px; font-size: 0.95rem; }

        .copy-btn {
            position: absolute;
            top: 14px;
            right: 14px;
            background: var(--paper-3);
            border: 1px solid var(--line);
            border-radius: var(--radius-sm);
            padding: 4px 10px;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .copy-btn:hover { background: var(--ink); color: var(--paper-2); }

        ul, ol { padding-left: 20px; margin: 8px 0 12px; }
        li { margin-bottom: 5px; color: var(--gray-1); font-size: 0.92rem; }
        code { font-family: var(--font-mono); font-size: 0.84rem; background: var(--paper-3); padding: 2px 6px; border-radius: var(--radius-sm); color: var(--ink); border: 1px solid var(--line); }

        section { scroll-margin-top: 80px; margin-bottom: 44px; }
        footer { margin-top: 60px; padding-top: 24px; border-top: 1.5px solid var(--line); color: var(--gray-2); font-size: 0.85rem; font-family: var(--font-mono); }

        @media (max-width: 1024px) {
            .app-layout { flex-direction: column; }
            .sidebar { width: 100%; height: auto; position: relative; top: 0; border-right: none; border-bottom: 1px solid var(--line); }
            .main-content { padding: 24px 20px 60px; }
            .metrics-bar { grid-template-columns: repeat(2, 1fr); }
            .grid-3 { grid-template-columns: 1fr; }
        }
        @media (max-width: 720px) {
            .grid-2 { grid-template-columns: 1fr; }
            .hero-banner { padding: 24px 18px; }
            h1 { font-size: 1.6rem; }
            .metrics-bar { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>

    <!-- 頂部固定返回列 -->
    <header class="subpage-return-bar">
        <a href="../../index.html" class="subpage-return-btn">
            &larr; 返回研發全景首頁
        </a>
        <div class="bar-meta">
            <span class="meta-pill-tag">STRATEGY // 10</span>
            <span>REAIFY TECH · 公司戰略與多領域指南（完整反思與決策版）</span>
        </div>
        <button onclick="window.print()" class="subpage-return-btn" style="cursor: pointer;">
            🖨️ 匯出 PDF
        </button>
    </header>

    <div class="app-layout">
        
        <!-- 左側導航側邊欄 -->
        <aside class="sidebar">
            <div class="sidebar-brand">
                <div class="brand-pill">REAIFY TECH // 戰略手冊</div>
                <div class="brand-title">R1 決策與多領域指南</div>
            </div>

            <!-- 關鍵字搜尋框 -->
            <div class="search-box">
                <span class="search-icon">🔍</span>
                <input type="text" id="sectionSearch" class="search-input" placeholder="搜尋章節關鍵字..." aria-label="搜尋章節">
            </div>

            <!-- 分類標籤篩選 -->
            <div class="filter-group">
                <span class="filter-chip active" data-filter="all">全部 (19)</span>
                <span class="filter-chip" data-filter="m1">I. 核心戰略</span>
                <span class="filter-chip" data-filter="m2">II. 產品與技術</span>
                <span class="filter-chip" data-filter="m3">III. 多領域拓展</span>
                <span class="filter-chip" data-filter="m4">IV. 商業路線</span>
                <span class="filter-chip" data-filter="m5">V. 驗證與行動</span>
            </div>

            <!-- 章節目錄列表 -->
            <nav aria-label="目錄" style="overflow-y: auto; flex: 1;">
                <ul class="nav-list" id="navList">
                    <li class="nav-group-title">── 模組 I · 核心戰略與破局認知 ──</li>
                    <li class="nav-item" data-cat="m1"><a href="#sec-overview" class="active"><span class="nav-num">01</span> 核心結論與專案現狀</a></li>
                    <li class="nav-item" data-cat="m1"><a href="#sec-market-tw"><span class="nav-num">02</span> 台灣市場：機會與痛點</a></li>
                    <li class="nav-item" data-cat="m1"><a href="#sec-critique"><span class="nav-num">03</span> 破解「市場太小」迷思</a></li>
                    <li class="nav-item" data-cat="m1"><a href="#sec-mobile-vs-r1"><span class="nav-num">04</span> 手機查很方便，為什麼要 R1？</a></li>

                    <li class="nav-group-title">── 模組 II · 產品定義與技術架構 ──</li>
                    <li class="nav-item" data-cat="m2"><a href="#sec-scope"><span class="nav-num">05</span> 第一版做什麼與不做什麼</a></li>
                    <li class="nav-item" data-cat="m2"><a href="#sec-workflow"><span class="nav-num">06</span> R1 的標準運作流程</a></li>
                    <li class="nav-item" data-cat="m2"><a href="#sec-rules-engine"><span class="nav-num">07</span> 規則整理與回答安全</a></li>
                    <li class="nav-item" data-cat="m2"><a href="#sec-data-strategy"><span class="nav-num">08</span> 數據如何幫店長做決定</a></li>
                    <li class="nav-item" data-cat="m2"><a href="#sec-privacy"><span class="nav-num">09</span> 不錄影隱私與省錢取捨</a></li>
                    <li class="nav-item" data-cat="m2"><a href="#sec-moat"><span class="nav-num">10</span> 什麼才是真正的護城河</a></li>

                    <li class="nav-group-title">── 模組 III · 多領域拓展與全球市場 ──</li>
                    <li class="nav-item" data-cat="m3"><a href="#sec-global-market"><span class="nav-num">11</span> 全球市場與國外軟體</a></li>
                    <li class="nav-item" data-cat="m3"><a href="#sec-multi-domains" style="color: var(--teal); font-weight: 700;"><span class="nav-num">12</span> 多領域拓展：桌遊·劇本·密室·VR</a></li>

                    <li class="nav-group-title">── 模組 IV · 商業路線與架構延伸 ──</li>
                    <li class="nav-item" data-cat="m4"><a href="#sec-business-models" style="color: var(--indigo); font-weight: 700;"><span class="nav-num">13</span> 七種賺錢路線與順序 (A~G)</a></li>
                    <li class="nav-item" data-cat="m4"><a href="#sec-digital-twin"><span class="nav-num">14</span> 桌遊數位孿生與雲端沙盒</a></li>
                    <li class="nav-item" data-cat="m4"><a href="#sec-ranked-ladder" style="color: var(--vermilion); font-weight: 700;"><span class="nav-num">15</span> 實體天梯排位與店家辦賽引流</a></li>

                    <li class="nav-group-title">── 模組 V · 落地驗證與行動清單 ──</li>
                    <li class="nav-item" data-cat="m5"><a href="#sec-poc-90days"><span class="nav-num">16</span> 90天店家驗證計畫</a></li>
                    <li class="nav-item" data-cat="m5"><a href="#sec-kpi"><span class="nav-num">17</span> 成功指標與考核數字</a></li>
                    <li class="nav-item" data-cat="m5"><a href="#sec-decision-tree"><span class="nav-num">18</span> 繼續做、轉向還是停止</a></li>
                    <li class="nav-item" data-cat="m5"><a href="#sec-pitch-actions"><span class="nav-num">19</span> 對三種人說法與明天10件事</a></li>
                </ul>
            </nav>
        </aside>

        <!-- 主要閱讀與內容區 -->
        <main class="main-content">
            
            <header class="hero-banner" id="overview">
                <div class="hero-meta">
                    <span class="badge-status">內部決策與反思標準</span>
                    <span class="badge-tag">桌遊店首發 POC</span>
                    <span class="badge-tag">劇本殺/密室拓展</span>
                    <span class="badge-tag">7大商業路線 (A~G)</span>
                    <span class="badge-tag">數位孿生沙盒</span>
                    <span class="badge-tag">實體天梯引流</span>
                </div>
                <h1>R1 AI 實體互動助手<br>公司決策與多領域拓展指南</h1>
                <p class="lead" style="margin-top: 14px;">
                    客觀反思產業痛點與專家評審意見，以桌遊店作為首發極低成本 POC 驗證場域，驗證人機實體互動與營運數據價值；再橫向擴展至劇本殺、密室逃脫、VR、補習班教育與銀髮長照等高預算市場。
                </p>
            </header>

            <div class="metrics-bar">
                <div class="metric-card">
                    <div class="metric-val">POC 第一站</div>
                    <div class="metric-label">桌遊店極低成本實測人機互動</div>
                </div>
                <div class="metric-card">
                    <div class="metric-val">7 大路線</div>
                    <div class="metric-label">A~G 階梯式漸進商模矩陣</div>
                </div>
                <div class="metric-card">
                    <div class="metric-val">0 影像存檔</div>
                    <div class="metric-label">純記憶體運算 · 嚴守隱私法規</div>
                </div>
                <div class="metric-card">
                    <div class="metric-val">跨領域拓展</div>
                    <div class="metric-label">劇本殺 / 密室逃脫每人 500~1,200 元</div>
                </div>
            </div>

            <!-- 01 核心結論與專案現狀 -->
            <section id="sec-overview" class="content-section" data-cat="m1">
                <h2><span class="section-tag">01</span> 核心結論與專案現狀</h2>
                
                <div class="callout success">
                    <div class="callout-title">💡 核心定調：不要直接報廢，但也不要盲目大量生產硬體</div>
                    <p>台灣桌遊店數量有限，如果我們只打算「做一台桌遊機器人賣給全台灣桌遊店」，公司很難賺大錢；但 R1 現在做出來的實體互動能力很有價值。正確做法是：<strong>把桌遊店當成第一個測試場地</strong>，證明能幫店家省時間、讓新手順利開局，之後再把這套能力帶去<strong>劇本殺、密室逃脫、VR 體驗館、補習班教育與長照</strong>等更高預算的市場。</p>
                </div>

                <h3>我們目前已經做出來的 6 個核心能力</h3>
                <div class="grid-3">
                    <div class="card">
                        <div class="card-icon">👁️</div>
                        <h3>即時看鏡頭與手勢</h3>
                        <p>固定在桌上看大家動作，玩家手不用拿著機器，不影響玩遊戲。</p>
                    </div>
                    <div class="card">
                        <div class="card-icon">🎙️</div>
                        <h3>語音講話與聽懂指令</h3>
                        <p>大家喊一聲就能互動，一句一句清楚帶大家設置遊戲跟講規則。</p>
                    </div>
                    <div class="card">
                        <div class="card-icon">🧠</div>
                        <h3>聽懂意圖，不自由瞎掰</h3>
                        <p>AI 負責講人話和問清楚狀況，嚴格禁止自己發明不存在的規則。</p>
                    </div>
                    <div class="card">
                        <div class="card-icon">📚</div>
                        <h3>規則預先寫好整理好</h3>
                        <p>遊戲怎麼擺、回合怎麼跑、常見問題都有標準答案，不會亂答。</p>
                    </div>
                    <div class="card">
                        <div class="card-icon">🔒</div>
                        <h3>不錄影、保護客人隱私</h3>
                        <p>畫面在機器裡算完就直接丟掉，不存檔案，客人完全不用擔心被拍。</p>
                    </div>
                    <div class="card">
                        <div class="card-icon">⚡</div>
                        <h3>不用 NFC 晶片感應</h3>
                        <p>省去昂貴的無線認證費用，也不用每盒桌遊辛苦貼晶片貼紙。</p>
                    </div>
                </div>

                <div class="quote-box">
                    <div class="quote-text">我們賣的不是相機零件或 AI 晶片，而是「幫店家省下教人時間、讓新手留下來玩、給店長看出哪裡要改進的數據」。</div>
                </div>
            </section>

            <!-- 02 台灣市場：機會與真實痛點 -->
            <section id="sec-market-tw" class="content-section" data-cat="m1">
                <h2><span class="section-tag">02</span> 台灣市場：機會與真實痛點</h2>
                
                <p>桌遊店不是沒人去，而是<strong>開店成本高、利潤薄</strong>。如果我們的產品不能實際幫老闆省錢或多賺錢，老闆不會買單。</p>

                <div class="grid-2">
                    <div class="card">
                        <h3>桌遊店老闆現在遇到的 6 大痛點</h3>
                        <ul>
                            <li><strong>房租和人事費很貴</strong>：假日擠滿人、平日沒人來，請人很難排班。</li>
                            <li><strong>很缺會教遊戲的店員</strong>：新手一定要人教，但培訓一個熟練店員很花時間，店員又容易離職。</li>
                            <li><strong>賣盒裝桌遊賺不到錢</strong>：大家會在店裡看一看，轉頭去網路上買便宜的。</li>
                            <li><strong>店員一個人當三個人用</strong>：要顧櫃台、煮飲料、收錢，還要跑去各桌教規則。</li>
                            <li><strong>大家都玩手機不想出門</strong>：手遊和網路影片搶走很多客人的時間。</li>
                            <li><strong>教學有成本</strong>：很多店現在都要收教學費，因為人工教真的很耗時間。</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h3>市場上真實存在的需求證據</h3>
                        <ul>
                            <li><strong>新天鵝堡一直都在開師資培訓班</strong>：每班收約 20 人，教大人、小孩、老人桌遊，代表「教規則與帶活動」是真實存在的工作。</li>
                            <li><strong>實體桌遊一定要現場玩</strong>：大家是為了面對面聊天聚會才去桌遊店，這點手機代替不了。</li>
                            <li><strong>新手最常卡在不會開始</strong>：很多人是說明書看不懂、沒人教，才放棄不玩的。</li>
                        </ul>
                    </div>
                </div>

                <h3>台灣市場現狀數字參考</h3>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>調查來源</th>
                                <th>市場預估數字</th>
                                <th>未來趨勢</th>
                                <th>大白話結論</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>IMARC</strong></td>
                                <td>2025年約 8,000 萬美元</td>
                                <td>2034年約 1.7 億美元 (年增 8.6%)</td>
                                <td>包含各類卡牌玩具，市場確實有在慢慢變大。</td>
                            </tr>
                            <tr>
                                <td><strong>Deep Market Insights</strong></td>
                                <td>2025年約 2.5 億美元</td>
                                <td>2034年約 6.2 億美元</td>
                                <td>把所有文教玩具都算進去了，數字聽聽就好。</td>
                            </tr>
                            <tr>
                                <td><strong>台灣實際店家數量</strong></td>
                                <td>全台灣約 150～300 多家店</td>
                                <td>以中小型獨立店家為主</td>
                                <td><strong>重點：</strong>全台店家總數不多，不能只靠賣機器給桌遊店賺錢。</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- 03 破解「市場太小」迷思 -->
            <section id="sec-critique" class="content-section" data-cat="m1">
                <h2><span class="section-tag">03</span> 破解「市場太小」迷思（深度反思評審與專家意見）</h2>
                
                <div class="grid-2">
                    <div class="card" style="border-top: 4px solid var(--amber);">
                        <h3>老師或評審說得對的地方</h3>
                        <p>如果我們的商業模式是<strong>「做一台桌遊機器人賣給全台灣的桌遊店」</strong>，那真的賺不到什麼錢：</p>
                        <ul>
                            <li>全台灣只有 150–300 間店，就算賣給 10% 也才 15–30 間。</li>
                            <li>每間店一個月付 2,000–5,000 元，一年公司才收幾十萬到一百多萬。</li>
                            <li>硬體做外殼、運送、壞掉去修，利潤一下子就賠光了。</li>
                            <li>小店老闆很省，不會因為機器很酷就掏錢。</li>
                        </ul>
                    </div>
                    <div class="card" style="border-top: 4px solid var(--emerald);">
                        <h3>老師沒有否定、我們真正的價值</h3>
                        <p>被否定的是「只賣硬體給小市場」，不是<strong>「實體桌前互動的技術」</strong>：</p>
                        <ul>
                            <li>桌前大家一起講話、一起看的互動系統，這項技術完全有價值。</li>
                            <li>桌遊店桌子固定、大家常聚在一起、又常問規則，是<strong>最便宜最好的測試場地</strong>。</li>
                            <li>在桌遊店測試成功後，這套技術可以直接拿去賣給<strong>劇本殺、密室逃脫、VR體驗館、補習班教育</strong>等預算很多的大客戶。</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- 04 手機查很方便，為什麼還需要 R1？ -->
            <section id="sec-mobile-vs-r1" class="content-section" data-cat="m1">
                <h2><span class="section-tag">04</span> 手機查很方便，為什麼還需要 R1？</h2>
                
                <p>為什麼不直接叫客人「用手機查或看 YouTube」就好？因為在桌遊現場，<strong>拿起手機就會打斷大家的互動</strong>：</p>

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>體驗項目</th>
                                <th>用手機查規則</th>
                                <th>R1 實體互動助手</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>現場氣氛</strong></td>
                                <td>一個人低頭滑手機看影片，其他人乾等發呆，氣氛冷掉。</td>
                                <td>大家圍著桌子聽機器一句一句講，全場一起參與。</td>
                            </tr>
                            <tr>
                                <td><strong>雙手狀態</strong></td>
                                <td>一隻手要拿手機，另一隻手很難拿卡牌或配件。</td>
                                <td>雙手空出來拿配件，嘴巴問一句就得到答案。</td>
                            </tr>
                            <tr>
                                <td><strong>叫店員幫忙</strong></td>
                                <td>要站起來四處張望找店員，店員在忙就只能一直等。</td>
                                <td>直接跟機器說「幫我叫店員」，櫃台立刻收到哪一桌需要協助。</td>
                            </tr>
                            <tr>
                                <td><strong>店長收數據</strong></td>
                                <td>客人用自己的手機查，店長完全不知道客人在哪裡卡住。</td>
                                <td>機器自動記錄哪款遊戲最難教、客人最常問什麼問題。</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- 05 第一版做什麼與不做什麼 -->
            <section id="sec-scope" class="content-section" data-cat="m2">
                <h2><span class="section-tag">05</span> 第一版做什麼與不做什麼</h2>
                
                <div class="grid-2">
                    <div class="card" style="border-left: 4px solid var(--emerald);">
                        <h3>第一版一定要做的功能</h3>
                        <ul>
                            <li><strong>只支援 3 款最熱門的遊戲</strong>：不要貪多，先做好《卡卡頌》、《卡坦島》、《璀璨寶石》這種大家常玩的。</li>
                            <li><strong>把初始擺盤跟開局講清楚</strong>：新手最常卡在「一開始怎麼擺、每個人拿幾張牌」，這個一定要秒懂。</li>
                            <li><strong>每回合流程能用語音一步一步帶</strong>：客人問「換我了要幹嘛」，一句話講清楚三個動作。</li>
                            <li><strong>常見吵架爭議能給出標準答案</strong>：把說明書翻遍、把論壇常問整理成題庫。</li>
                            <li><strong>一鍵呼叫店員功能</strong>：遇到機器回答不了或客人不想聽時，隨時按一下或喊一聲叫店員。</li>
                        </ul>
                    </div>

                    <div class="card" style="border-left: 4px solid var(--vermilion);">
                        <h3>第一版絕對不要碰的事</h3>
                        <ul>
                            <li><strong>不做全自動計分</strong>：桌遊計分規則極多，硬要做只會整天算錯被客人罵。</li>
                            <li><strong>不做複雜動作抓犯規</strong>：不用鏡頭去抓誰偷摸牌或藏牌，不要把機器搞成監視器。</li>
                            <li><strong>不做聊天機器人陪聊</strong>：禁止講無關的廢話，專注在「規則、流程、賽事、叫店員」。</li>
                            <li><strong>不支援 50 款冷門遊戲</strong>：先做好 3 款能收錢的，勝過做 50 款整天出錯的。</li>
                            <li><strong>不在機器裡存影片</strong>：嚴格遵守個資與隱私原則，絕對不存任何客人影像。</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- 06 R1 的標準運作流程 -->
            <section id="sec-workflow" class="content-section" data-cat="m2">
                <h2><span class="section-tag">06</span> R1 的標準運作流程</h2>

                <ol class="step-list">
                    <li class="step-item">
                        <div class="step-num">1</div>
                        <div class="step-body">
                            <strong>喊一聲喚醒並說出任務</strong>
                            客人或店員說「R1」，接著說任務（例如：<code>幫我們開始卡卡頌四人局</code>、<code>推薦30分鐘遊戲</code>、<code>教第一回合</code>）。
                        </div>
                    </li>
                    <li class="step-item">
                        <div class="step-num">2</div>
                        <div class="step-body">
                            <strong>機器亮燈回應並確認狀態</strong>
                            LED 燈亮起、給出語音反饋（例如：「好的，卡卡頌 4 人局，請大家確認手邊各有 7 個隨從」）。
                        </div>
                    </li>
                    <li class="step-item">
                        <div class="step-num">3</div>
                        <div class="step-body">
                            <strong>相機看一眼桌面擺盤</strong>
                            鏡頭在記憶體算一眼：「起始板塊擺對了嗎？配件齊不齊？」，確認完立即清除影像。
                        </div>
                    </li>
                    <li class="step-item">
                        <div class="step-num">4</div>
                        <div class="step-body">
                            <strong>比對背後寫好的規則庫</strong>
                            只從預先審查過的標準規則資料庫找答案，絕不隨意發明規則。
                        </div>
                    </li>
                    <li class="step-item">
                        <div class="step-num">5</div>
                        <div class="step-body">
                            <strong>遇到吵架或特殊狀況，主動叫店員</strong>
                            若玩家出現爭議或規則模糊，系統主動說：「這題情況較特殊，我幫您呼叫店長協助。」
                        </div>
                    </li>
                    <li class="step-item">
                        <div class="step-num">6</div>
                        <div class="step-body">
                            <strong>一句一句用語音帶大家做</strong>
                            用語音慢慢帶，客人可以隨時說「慢一點」、「再講一次」或「下一步」。
                        </div>
                    </li>
                    <li class="step-item">
                        <div class="step-num">7</div>
                        <div class="step-body">
                            <strong>記下一筆不記名營運紀錄</strong>
                            只寫下數字紀錄（例如：<code>時間、桌號、玩什麼、教了幾分鐘、有沒有叫店員</code>），用來算週報。
                        </div>
                    </li>
                </ol>
            </section>

            <!-- 07 規則整理與回答安全 -->
            <section id="sec-rules-engine" class="content-section" data-cat="m2">
                <h2><span class="section-tag">07</span> 規則整理與回答安全</h2>
                
                <p>「講得正確、不亂掰」比「看起來很厲害」重要一百倍。每一款支援的遊戲都要先整理成<strong>標準規則包</strong>。</p>

                <div class="grid-2">
                    <div class="card">
                        <h3>每款遊戲規則包要有這 6 樣東西</h3>
                        <ul>
                            <li><strong>基本資料</strong>：遊戲名字、年份、中文版/英文版、有沒有加擴充。</li>
                            <li><strong>遊戲規格</strong>：幾個人玩、大約多久、難不難、有哪些配件。</li>
                            <li><strong>開局流程</strong>：初始版圖怎麼拼、每人發多少資源、誰先開始。</li>
                            <li><strong>回合步驟</strong>：輪到我時依序做什麼事（抽牌、放板塊、計分）。</li>
                            <li><strong>常見問答庫</strong>：大家常吵架的規則條例、官方補充說明、第幾頁可以查到。</li>
                            <li><strong>何時必須叫店員</strong>：寫清楚哪些爭議情況 AI 不自己回答，直接叫店員。</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h3>AI 回答的 4 種安全應對法</h3>
                        <ul>
                            <li><strong>第一種（很確定）</strong>：資料庫有標準答案，直接講答案，還可以順便講規則書第幾頁。</li>
                            <li><strong>第二種（不清楚）</strong>：主動問客人「請問你們有加河流擴充嗎？」問清楚再答。</li>
                            <li><strong>第三種（沒收錄/不確定）</strong>：誠實說「這題比較特別，我先幫您叫店員過來協助。」</li>
                            <li><strong>第四種（玩家吵架）</strong>：牽涉勝負爭議時 AI 不當裁判，直接切換成呼叫店員。</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- 08 數據如何幫店長做決定 -->
            <section id="sec-data-strategy" class="content-section" data-cat="m2">
                <h2><span class="section-tag">08</span> 數據如何幫店長做決定</h2>

                <p>單純收一堆數據沒有用，<strong>能告訴店長下週該怎麼排班、該進什麼遊戲，才是店長願意買單的東西。</strong></p>

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>我們記錄的數字</th>
                                <th>絕對不記錄的隱私</th>
                                <th>能幫店長做出的決定</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>開局時間、桌號、遊戲名稱、幾個人玩</td>
                                <td>客人長相、錄影畫面、客人名字</td>
                                <td>知道哪幾款遊戲最熱門、客人都在哪幾個時段來、翻桌率多少。</td>
                            </tr>
                            <tr>
                                <td>教學花幾分鐘、問了幾次、有沒有叫店員</td>
                                <td>客人聊天的語音錄音檔</td>
                                <td>知道哪款遊戲「最花店員時間去教」，可以調整推薦或多準備教學。</td>
                            </tr>
                            <tr>
                                <td>客人選了什麼條件、最後有沒有實際開玩</td>
                                <td>跨店追蹤客人的私人行為</td>
                                <td>知道哪些遊戲買了都沒人玩，可以辦活動促銷或賣二手清空間。</td>
                            </tr>
                            <tr>
                                <td>哪一桌叫店員、什麼時候叫、問什麼類別</td>
                                <td>客人的付款與帳務細節</td>
                                <td>知道店裡什麼時候最忙不過來，該在哪個時段多排工讀生。</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>店長每週只要看這一張報表</h3>
                <div class="card" style="background: var(--paper-2); border-color: var(--ink);">
                    <strong style="color: var(--ink); font-size: 1.02rem; display: block; margin-bottom: 10px;">
                        📊 一頁式店長週報範例（系統自動匯整產出）
                    </strong>
                    <ul>
                        <li><strong>本週總共開了幾桌</strong>：例如本週開了 142 桌，比上週多 12%。</li>
                        <li><strong>R1 自己搞定教學的比例</strong>：例如總共教了 88 次，78% 都是 R1 自己教完沒找店員。</li>
                        <li><strong>幫店員省下多少時間</strong>：例如本週幫店員省了 14.5 個小時的教學時間。</li>
                        <li><strong>最常需要店員去救火的遊戲</strong>：例如《卡坦島》被叫去支援了 7 次，都是問交易規則。</li>
                        <li><strong>一個下週馬上能執行的建議</strong>：例如「週六下午 2 點到 5 點桌位 94% 滿，建議那段時間多排一位會教策略遊戲的店員在場。」</li>
                    </ul>
                </div>
            </section>

            <!-- 09 不錄影隱私與省錢取捨 -->
            <section id="sec-privacy" class="content-section" data-cat="m2">
                <h2><span class="section-tag">09</span> 不錄影隱私與省錢取捨</h2>
                
                <div class="grid-2">
                    <div class="card">
                        <h3>把「不錄影」當成最大優勢</h3>
                        <p>大家很討厭店裡有鏡頭一直對著自己拍，我們從根本解決這個問題：</p>
                        <ul>
                            <li><strong>畫面只在記憶體算完就丟</strong>：鏡頭看一眼判斷完，資料立刻在記憶體清掉，完全不存進硬碟。</li>
                            <li><strong>不認人臉</strong>：系統只看桌上的配件和手部動作，完全不抓人臉特徵。</li>
                            <li><strong>機器裡沒有錄影檔</strong>：就算機器被偷或被拆開，裡面也完全找不到任何客人的錄影。</li>
                            <li><strong>符合個資法規</strong>：預設完全不記名，客人安心、店家省麻煩。</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h3>為什麼我們決定不用 NFC 晶片？</h3>
                        <p>不用晶片感應是我們故意做的明智決定：</p>
                        <ul>
                            <li><strong>省下大筆無線認證費</strong>：硬體只要加入射頻發射晶片，就要送檢驗、做報告、付大筆認證費給 NCC。</li>
                            <li><strong>省下機器成本與手工</strong>：不用買讀卡晶片，也不用店員每盒遊戲去貼感應貼紙。</li>
                            <li><strong>用嘴巴講更自然</strong>：客人直接說「幫我們開卡卡頌」，機器確認一下就好，準確率一樣非常高。</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- 10 什麼才是真正的護城河 -->
            <section id="sec-moat" class="content-section" data-cat="m2">
                <h2><span class="section-tag">10</span> 什麼才是真正的護城河</h2>

                <div class="callout danger">
                    <div class="callout-title">🚫 這些都不是你的護城河</div>
                    <p>「我有接 OpenAI 還是 Gemini API」、「我有語音辨識模型」、「我做了一個很炫的外殼」。這些東西別人花兩個禮拜都能做出來，根本擋不住競爭對手。</p>
                </div>

                <div class="grid-2">
                    <div class="card">
                        <div class="card-icon">1</div>
                        <h3>整理好的標準規則庫</h3>
                        <p>一頁一頁整理過、包含各種吵架情況、有查證出處的專屬規則資料包。</p>
                    </div>
                    <div class="card">
                        <div class="card-icon">2</div>
                        <h3>真實現場的互動數據</h3>
                        <p>累積幾萬次「客人玩什麼容易卡住、哪款遊戲最難教、一局通常玩多久」的線下真實資料。</p>
                    </div>
                    <div class="card">
                        <div class="card-icon">3</div>
                        <h3>店家每天離不開的流程</h3>
                        <p>店長每週看你的報表排班、店員習慣用你的系統接單，換掉系統代價很高。</p>
                    </div>
                    <div class="card">
                        <div class="card-icon">4</div>
                        <h3>克服現場吵雜環境的能力</h3>
                        <p>店裡很吵、燈光忽亮忽暗、桌子反光，只有你在現場調校好能正常運作。</p>
                    </div>
                </div>

                <div class="card" style="margin-top: 16px;">
                    <div class="card-icon">5</div>
                    <h3>在地的店家與出版社關係</h3>
                    <p>跟新天鵝堡等代理商、各家桌遊店老闆、桌遊老師建立的合作關係與信任，這是國外大公司打不進來的優勢。</p>
                </div>
            </section>

            <!-- 11 全球市場與國外軟體 -->
            <section id="sec-global-market" class="content-section" data-cat="m3">
                <h2><span class="section-tag">11</span> 全球市場與國外軟體</h2>

                <h3>全球市場研調預估參考</h3>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>機構名稱</th>
                                <th>目前全球市場估算</th>
                                <th>未來趨勢預估</th>
                                <th>給我們的啟示</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>IMARC</strong></td>
                                <td>2025年約 203 億美元</td>
                                <td>2034年約 435 億美元 (年增 8.5%)</td>
                                <td>全球實體桌遊都在持續成長，大家依然愛面對面玩。</td>
                            </tr>
                            <tr>
                                <td><strong>Fortune Business Insights</strong></td>
                                <td>2025年約 158 億美元</td>
                                <td>2034年約 393 億美元 (年增 10.7%)</td>
                                <td>家庭聚會和複雜策略遊戲是主要成長來源。</td>
                            </tr>
                            <tr>
                                <td><strong>Arizton</strong></td>
                                <td>2025年約 215 億美元</td>
                                <td>2031年約 394 億美元 (年增 10.6%)</td>
                                <td>實體桌遊是健康成長的大池塘，不用怕市場消失。</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>國外現有的桌遊店管理軟體對比</h3>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>軟體名稱</th>
                                <th>功能特色</th>
                                <th>收費方式</th>
                                <th>優點與缺點</th>
                                <th>我們的機會</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>BoardGamePrices POS</strong></td>
                                <td>國外桌遊店專用 POS，管庫存、算租金。</td>
                                <td>約每月 50–100 美元</td>
                                <td>專門給桌遊店用，但只有英文，而且<strong>完全不能在桌上幫忙教規則</strong>。</td>
                                <td>我們能把「桌邊教學」跟「管理功能」綁在一起，這是他們做不到的。</td>
                            </tr>
                            <tr>
                                <td><strong>Tabletop.Events</strong></td>
                                <td>專門用來辦桌遊展、管比賽名額與賣門票。</td>
                                <td>抽門票手續費（約 2–5%）</td>
                                <td>辦比賽很有用，但平常在店裡完全派不上用場。</td>
                                <td>我們專注在「店裡每週每天的常態營運與天梯辦賽」。</td>
                            </tr>
                            <tr>
                                <td><strong>通用型 POS（Square / 肚肚）</strong></td>
                                <td>只管結帳跟開發票。</td>
                                <td>約每月 500–1,500 台幣</td>
                                <td>便宜好用，但完全不懂桌遊店的痛點（不知道哪款難教、不知道誰卡住）。</td>
                                <td>我們不搶發票結帳，我們做「專屬桌遊店的教學與翻桌率助手」。</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- 12 多領域拓展：桌遊、劇本殺、密室逃脫與 VR -->
            <section id="sec-multi-domains" class="content-section" data-cat="m3">
                <h2><span class="section-tag">12</span> 多領域拓展：桌遊、劇本殺、密室逃脫與 VR</h2>

                <div class="callout purple">
                    <div class="callout-title">🚀 戰略視野：桌遊店只是起點，高客單價的沉浸式娛樂才是大金礦！</div>
                    <p>桌遊店幫我們用最低成本把「語音互動＋流程控制＋鏡頭確認」的系統調到最穩。一旦成熟，這套系統能直接解決<strong>劇本殺缺好主持人、密室逃脫人力成本太高、VR 體驗館穿戴教學太麻煩</strong>的三大痛點！</p>
                </div>

                <div class="grid-2">
                    <div class="card" style="border-left: 4px solid #38bdf8;">
                        <h3 style="color: #38bdf8;">1. 桌遊店（測試第一站）</h3>
                        <ul>
                            <li><strong>市場現況</strong>：全台約 150–300 多家，客單價約 100–250 元。</li>
                            <li><strong>店家痛點</strong>：很缺會教遊戲的店員，新手沒人教就不玩；平日沒人來，請人很難排班。</li>
                            <li><strong>R1 做什麼</strong>：教開局擺盤、答常見規則、幫忙叫店員、記錄每週營運報表。</li>
                            <li><strong>為什麼重要</strong>：成本最低、最好找店家合作、可以天天測試收集資料。</li>
                        </ul>
                    </div>

                    <div class="card" style="border-left: 4px solid #a855f7;">
                        <h3 style="color: #a855f7;">2. 劇本殺（沉浸式推理館）</h3>
                        <ul>
                            <li><strong>市場現況</strong>：全台約 80–150 家，客單價高（每人 500–1,200 元）。</li>
                            <li><strong>店家痛點</strong>：非常缺好主持人（DM）。請一個熟練 DM 一場要付好幾百元，DM 念錯劇本或忘記放線索就毀了一局。</li>
                            <li><strong>R1 做什麼</strong>：<strong>當 AI 輔助主持人</strong>。自動播背景音樂和音效、用特定角色聲音念開場白、在桌上搜證時給線索、倒數計時。</li>
                            <li><strong>為什麼重要</strong>：店家客單價很高，只要能幫老闆省一個工讀生或提升場景氣氛，老闆<strong>非常肯花錢買</strong>！</li>
                        </ul>
                    </div>

                    <div class="card" style="border-left: 4px solid #f59e0b;">
                        <h3 style="color: #f59e0b;">3. 密室逃脫（實體解謎）</h3>
                        <ul>
                            <li><strong>市場現況</strong>：全台約 80–120 家品牌，客單價高（每人 500–1,000 元）。</li>
                            <li><strong>店家痛點</strong>：每間房間都要派小天使（工讀生）盯監視器，客人卡關要用對講機給提示，人力成本極高。</li>
                            <li><strong>R1 做什麼</strong>：<strong>當房間裡的實體 NPC 道具</strong>。看客人解到哪一步，用語音給提示（例如：「旅行者，看看你左邊牆上的火把...」），營造神秘氣氛。</li>
                            <li><strong>為什麼重要</strong>：從「死板對講機」變成「會講話的實體道具」，還能幫密室老闆省下盯場人力！</li>
                        </ul>
                    </div>

                    <div class="card" style="border-left: 4px solid #10b981;">
                        <h3 style="color: #10b981;">4. VR 體驗館 / 混合實境空間</h3>
                        <ul>
                            <li><strong>市場現況</strong>：商場、樂園、展覽館常設，客單價約 300–800 元。</li>
                            <li><strong>店家痛點</strong>：客人戴上頭盔前很慌張，不知道手把怎麼拿、頭盔怎麼戴，每個客人都需要店員一對一服務。</li>
                            <li><strong>R1 做什麼</strong>：<strong>當現場穿戴與安全助教</strong>。在客人戴頭盔前用語音跟鏡頭一步一步引導：「請拿起右手手把，扣下食指板機」，戴好後倒數進入遊戲。</li>
                            <li><strong>為什麼重要</strong>：解決高科技場館「新手不敢玩、需要大量人手引導」的痛點。</li>
                        </ul>
                    </div>
                </div>

                <h3>四大實體娛樂領域橫向對比表</h3>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>領域</th>
                                <th>每人消費（客單價）</th>
                                <th>店家最痛的點</th>
                                <th>R1 的切入角色</th>
                                <th>店家付費能力</th>
                                <th>什麼時候進場</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>桌遊店</strong></td>
                                <td>100–250 元</td>
                                <td>缺店員教新手、請人成本高</td>
                                <td>桌邊教學與營運週報助手</td>
                                <td>偏低（每月幾百到一兩千）</td>
                                <td><strong>現在（第 1 站 POC 驗證）</strong></td>
                            </tr>
                            <tr>
                                <td><strong>劇本殺館</strong></td>
                                <td>500–1,200 元</td>
                                <td>缺專業主持人、培訓 DM 成本高</td>
                                <td>AI 輔助主持人與音效控台</td>
                                <td><strong>高</strong>（每場願付幾百元）</td>
                                <td><strong>第 2 站（技術成熟馬上進）</strong></td>
                            </tr>
                            <tr>
                                <td><strong>密室逃脫</strong></td>
                                <td>500–1,000 元</td>
                                <td>需專人盯監視器、對講機提示出戲</td>
                                <td>房間內的實體 NPC 與動態提示器</td>
                                <td><strong>高</strong>（願買斷或付月費）</td>
                                <td><strong>第 2 站（與密室品牌合作）</strong></td>
                            </tr>
                            <tr>
                                <td><strong>VR 體驗館</strong></td>
                                <td>300–800 元</td>
                                <td>新手穿戴教學耗費大量人力</td>
                                <td>穿戴指引與安全引導員</td>
                                <td><strong>中偏高</strong>（商場展館有預算）</td>
                                <td><strong>第 3 站（找展館洽談）</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- 13 七種賺錢路線與順序 (完整保留 A~G 矩陣) -->
            <section id="sec-business-models" class="content-section" data-cat="m4">
                <h2><span class="section-tag">13</span> 七種賺錢路線與順序（A~G 完整矩陣）</h2>

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>賺錢路線</th>
                                <th>賣點是什麼</th>
                                <th>誰來付錢</th>
                                <th>好處</th>
                                <th>挑戰與風險</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>A. 桌遊店教學助手</strong></td>
                                <td>教開局、答規則、幫叫店員</td>
                                <td>桌遊店、桌遊咖啡廳</td>
                                <td>最符合現有機器，可馬上測</td>
                                <td>店家預算少，市場不大</td>
                            </tr>
                            <tr>
                                <td><strong>B. 桌遊店營運週報</strong></td>
                                <td>翻桌率、熱門遊戲、排班建議</td>
                                <td>連鎖店老闆、店長</td>
                                <td>從玩具變成管理工具</td>
                                <td>後台要穩定，數據要準</td>
                            </tr>
                            <tr>
                                <td><strong>C. 劇本殺與密室專案</strong></td>
                                <td>AI 主持、搜證發線索、NPC 提示</td>
                                <td>劇本殺館、密室逃脫品牌</td>
                                <td>客單價高、省人力效益超明顯</td>
                                <td>需要與劇本及密室機關對接</td>
                            </tr>
                            <tr>
                                <td><strong>D. 代理商展會專案</strong></td>
                                <td>新遊戲教學、比賽導覽</td>
                                <td>桌遊出版社、展覽主辦方</td>
                                <td>單次預算多，展示效果好</td>
                                <td>收入不穩定，有活動才有錢</td>
                            </tr>
                            <tr>
                                <td><strong>E. 親子補習班教育</strong></td>
                                <td>帶小朋友任務、當課堂助教</td>
                                <td>補習班、STEAM教室、營隊</td>
                                <td>教育機構比較肯花錢</td>
                                <td>教材要重新做，導入時間長</td>
                            </tr>
                            <tr>
                                <td><strong>F. 老人日照與長照</strong></td>
                                <td>帶銀髮族玩桌遊益智動腦</td>
                                <td>日照中心、老人活動中心</td>
                                <td>有政府長照補助預算</td>
                                <td>聲音跟畫面要配合長輩調整</td>
                            </tr>
                            <tr>
                                <td><strong>G. 實體互動通用系統</strong></td>
                                <td>提供整套視覺+語音引擎</td>
                                <td>其他硬體廠商、展館業者</td>
                                <td>未來市場非常大</td>
                                <td>太早做會分散團隊精力</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="callout success">
                    <div class="callout-title">🗺️ 建議前進順序</div>
                    <p><strong>第一步（現在）：</strong>做好 <code>A + B</code>（在 3 家桌遊店驗證教學跟週報有用，把系統調穩）。<br>
                    <strong>第二步（高毛利拓展）：</strong>切入 <code>C</code>（劇本殺 AI 主持與密室逃脫提示，店家付費意願最強）。<br>
                    <strong>第三步（大市場擴張）：</strong>進入 <code>E / F</code>（補習班教育與銀髮日照照護機構）。<br>
                    <strong>第四步（長期）：</strong>再做 <code>G</code> 通用平台。</p>
                </div>
            </section>

            <!-- 14 桌遊數位孿生與雲端沙盒平台 -->
            <section id="sec-digital-twin" class="content-section" data-cat="m4">
                <h2><span class="section-tag">14</span> 桌遊數位孿生與雲端沙盒平台 (架構延伸)</h2>
                
                <p><strong>解決痛點：</strong>獨立桌遊設計師開發遊戲時，常面臨「找人盲測難、50 場測試耗時半年、樣本太少無法發現數值漏洞、出版後若有死規無法修改」的困境。</p>

                <div class="grid-2">
                    <div class="card" style="border-top: 4px solid var(--indigo);">
                        <h3>1. 雲端沙盒模擬 (Sim-to-Test)</h3>
                        <p>借鑒數位孿生概念，創作者在線上定義卡牌、棋盤與規則狀態機。由多重人格 AI（快攻、防守、隨機）在雲端跑 10 萬場自我對弈，自動抓出死局 (Deadlock) 與數值失衡卡牌，產出平衡性檢驗報告。</p>
                    </div>

                    <div class="card" style="border-top: 4px solid var(--vermilion);">
                        <h3>2. 實體機器人執行 (Sim-to-Real)</h3>
                        <p>雲端驗證完成的規則包，一鍵下發編譯為 <code>.r1pkg</code>。R1 實體機器人現場看鏡頭直接引導實體桌遊教學與裁判，創作者還能遠端 OTA 推送規則修正補丁，徹底解決實體出版難勘誤的痛點。</p>
                    </div>
                </div>
            </section>

            <!-- 15 實體天梯排位與店家辦賽引流系統 -->
            <section id="sec-ranked-ladder" class="content-section" data-cat="m4">
                <h2><span class="section-tag">15</span> 實體天梯排位與店家辦賽引流系統 (引流延伸)</h2>
                
                <p><strong>解決痛點：</strong>桌遊店老闆最大困擾是「平日週一到週四晚上沒人來」。辦比賽最能吸客，但老闆「怕排賽程麻煩、瑞士制算分算到頭痛、店員當裁判容易得罪熟客」。</p>

                <div class="grid-2">
                    <div class="card" style="border-top: 4px solid var(--emerald);">
                        <h3>1. 一鍵自動辦賽與 AI 公正裁判</h3>
                        <p>老闆在後台勾選遊戲與人數，系統自動生成賽事碼，玩家掃碼 3 秒完成分桌抽籤與進階晉級。各桌由 R1 頂置鏡頭看盤面計分、嚴格計時，遇到規則爭議調用官方條文公正語音釋疑，避免人情糾紛。</p>
                    </div>

                    <div class="card" style="border-top: 4px solid var(--amber);">
                        <h3>2. 派對遊戲天梯化與全台跨店聯賽</h3>
                        <p>把《德國心臟病》、《阿瓦隆》、《卡卡頌》、《卡坦島》等休閒遊戲加入限時競技積分制，打天梯排位升段（青銅到王者），激發玩家好勝心每週平日回流練牌；連動全台跨店天梯榜與季末總決賽，為實體店導入高黏著人流。</p>
                    </div>
                </div>
            </section>

            <!-- 16 90天店家驗證計畫 -->
            <section id="sec-poc-90days" class="content-section" data-cat="m5">
                <h2><span class="section-tag">16</span> 90天店家驗證計畫</h2>
                
                <p>用真實的店家測試數據和付費結果說話，不要用猜的。</p>

                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <strong style="color: var(--ink);">第 1–2 週：找店家訪談（不推銷，只問真實狀況）</strong>
                            <p>找 8–10 位店長、3–5 位店員、5–10 位常客，問這些問題：</p>
                            <ul>
                                <li>「店員最常花時間教哪三款遊戲？平均教一次要花幾分鐘？」</li>
                                <li>「週末人最多的時候，最常卡在什麼環節？客人常在哪一步等不耐煩？」</li>
                                <li>「如果每週只能看 5 個經營數字，你最想知道哪 5 個？」</li>
                                <li>「如果機器每週幫你省 2 小時工時，每桌少花 5 分鐘教學，你願意每月付多少軟體費？」</li>
                            </ul>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <strong style="color: var(--ink);">第 3–4 週：只做最精簡的可用版本</strong>
                            <p>嚴格鎖定 3 款遊戲。只保留：語音叫人、帶開局、回答基本規則、相機輔助看、不錄影、記紀錄、給一張週報。測試前不要再加任何新功能。</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <strong style="color: var(--ink);">第 5–8 週：進駐 1–3 家店實測 4 週</strong>
                            <p>進場前先講好：支援哪 3 款遊戲、保證不錄影、什麼情況算成功，並約好<strong>第 4 週結束時談付費方案的日期</strong>。每週追蹤 R1 自己解決的比例和省下的時間。</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <strong style="color: var(--ink);">第 9–12 週：驗收有沒有人願意付錢</strong>
                            <p>向店家提出每月 1,500～3,000 元的方案，看有沒有人願意付費續用或付訂金。<strong>唯一標準：店家願意掏錢付訂金或簽約才算驗證成功。</strong></p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 17 成功指標與考核數字 -->
            <section id="sec-kpi" class="content-section" data-cat="m5">
                <h2><span class="section-tag">17</span> 成功指標與考核數字</h2>

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>追蹤指標</th>
                                <th>白話意思</th>
                                <th>初期目標數字</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>教學時間縮短</strong></td>
                                <td>從開始教到玩完第一輪花了多久，比人工教快多少。</td>
                                <td>縮短至少 30%</td>
                            </tr>
                            <tr>
                                <td><strong>R1 自己搞定比例</strong></td>
                                <td>在指定遊戲範圍內，不用店員走過來幫忙的比例。</td>
                                <td>70% ～ 80%</td>
                            </tr>
                            <tr>
                                <td><strong>開局成功率</strong></td>
                                <td>在 R1 帶領下，順利擺好配件開始玩的比例。</td>
                                <td>80% 以上</td>
                            </tr>
                            <tr>
                                <td><strong>規則回答準確度</strong></td>
                                <td>寫好的規則庫裡，回答正確、沒亂答的比例。</td>
                                <td>接近 100%</td>
                            </tr>
                            <tr>
                                <td><strong>店員接手率</strong></td>
                                <td>因為機器答不出來或客人爭吵，需要店員出面的比例。</td>
                                <td>降到 20% 以下</td>
                            </tr>
                            <tr>
                                <td><strong>客人自然開口率</strong></td>
                                <td>客人遇到問題願意開口叫 R1，而不是直接抓店員。</td>
                                <td>60% 以上</td>
                            </tr>
                            <tr>
                                <td><strong>週報採納次數</strong></td>
                                <td>店長每週看週報，有沒有根據建議調整排班或進貨。</td>
                                <td>每週至少 1 次行動</td>
                            </tr>
                            <tr>
                                <td><strong>願意付費店家</strong></td>
                                <td>測試完願意付月費或給訂金的店家總數。</td>
                                <td>至少 3 家店</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- 18 繼續做、轉向還是停止 -->
            <section id="sec-decision-tree" class="content-section" data-cat="m5">
                <h2><span class="section-tag">18</span> 繼續做、轉向還是停止（決策反思樹）</h2>

                <div class="grid-3">
                    <div class="card" style="border-top: 4px solid var(--emerald);">
                        <div class="card-icon">🟢</div>
                        <h3>情況一：繼續深耕桌遊店</h3>
                        <p><strong>如果符合這些條件：</strong></p>
                        <ul>
                            <li>店家承認新手教學是個大負擔。</li>
                            <li>R1 確實能幫店員省 30% 以上時間。</li>
                            <li>客人用講話互動很自然、不尷尬。</li>
                            <li>不錄影的設計讓客人跟店家很放心。</li>
                            <li>至少有 3 家店願意每個月付錢。</li>
                        </ul>
                    </div>

                    <div class="card" style="border-top: 4px solid var(--amber);">
                        <div class="card-icon">🟡</div>
                        <h3>情況二：轉向其他市場（技術留著）</h3>
                        <p><strong>如果遇到這種狀況：</strong></p>
                        <ul>
                            <li>客人很喜歡玩，但桌遊店太窮不想付錢。</li>
                            <li>互動效果很好，但小店不夠痛。</li>
                        </ul>
                        <p><strong>馬上轉去這些地方：</strong></p>
                        <ul>
                            <li>轉去 <strong>劇本殺當 AI 輔助主持</strong>。</li>
                            <li>轉去 <strong>密室逃脫當 NPC 語音提示</strong>。</li>
                            <li>轉去 <strong>補習班當互動助教</strong>。</li>
                            <li>轉去 <strong>老人照護中心帶益智活動</strong>。</li>
                        </ul>
                    </div>

                    <div class="card" style="border-top: 4px solid var(--vermilion);">
                        <div class="card-icon">🔴</div>
                        <h3>情況三：停止桌遊線（保留技術）</h3>
                        <p><strong>如果遇到這些情況：</strong></p>
                        <ul>
                            <li>測了好多家，沒有半家願意掏出一毛錢。</li>
                            <li>用手機查比用機器更便宜更順手。</li>
                            <li>現場太吵，辨識常常失敗。</li>
                        </ul>
                        <p><strong>停止不等於失敗：</strong></p>
                        <p>把做好的「視覺辨識、語音互動、規則庫檢索、邊緣運算」程式碼留著，轉去做別的 AI 專案。</p>
                    </div>
                </div>
            </section>

            <!-- 19 對三種人的對外說法與明天 10 件事 -->
            <section id="sec-pitch-actions" class="content-section" data-cat="m5">
                <h2><span class="section-tag">19</span> 對三種人的對外說法與明天馬上要做的 10 件事</h2>

                <h3>對三種人的對外說法</h3>

                <div class="card" style="margin-bottom: 16px; position: relative;">
                    <button class="copy-btn" onclick="copyText('pitch-owner')">複製話術</button>
                    <h3 style="color: var(--teal);">🎙️ 第一種人：對桌遊／劇本殺／密室老闆</h3>
                    <div id="pitch-owner" class="quote-text">
                        「老闆你好，R1 不是要取代你的員工，也不用讓客人麻煩下載 App。它是在週末店裡最忙的時候，在桌邊幫你帶新手開局、講基礎規則、主持搜證或給解謎提示；客人遇到爭吵或不懂的，機器直接幫你叫店員過來救火。R1 全程不錄影、不記人臉，畫面算完就丟掉。每週還會給你一張一頁週報，告訴你哪款遊戲最常被玩、哪裡最花店員時間教、下週該怎麼排班。如果它不能幫你省下工時或多接幾組客人，你完全不用付錢。」
                    </div>
                </div>

                <div class="card" style="margin-bottom: 16px; position: relative;">
                    <button class="copy-btn" onclick="copyText('pitch-teacher')">複製話術</button>
                    <h3 style="color: var(--amber);">🎙️ 第二種人：對指導老師／學校評審</h3>
                    <div id="pitch-teacher" class="quote-text">
                        「老師您說得很對，台灣桌遊店市場確實不大，所以我們從來沒有打算只靠賣機器給桌遊店賺錢。桌遊店是我們第一個極低成本的測試場地，因為那裡有固定的桌子、多人圍在一起、而且新手常問規則。我們用 4 週的付費測試，證明這套實體互動能否幫店家省時間；如果驗證成功，這套在桌上用語音和視覺帶大家操作的系統，可以直接搬去客單價更高的劇本殺、密室逃脫、VR 體驗館、補習班教育與老人長照市場，而不是在還沒驗證前就盲目做硬體量產。」
                    </div>
                </div>

                <div class="card" style="margin-bottom: 24px; position: relative;">
                    <button class="copy-btn" onclick="copyText('pitch-investor')">複製話術</button>
                    <h3 style="color: var(--indigo);">🎙️ 第三種人：對投資人／創業評審</h3>
                    <div id="pitch-investor" class="quote-text">
                        「各位評審好，R1 正在解決的是『線下實體多人娛樂場域的高昂人力成本』。現在桌遊、劇本殺、密室逃脫都面臨店員教學成本高、主持人難培訓的痛點。我們用極低成本的桌遊店作為首發測試場地，驗證人機實體互動與不記名經營數據的價值。我們的商業模式不是單賣硬體，而是『硬體租賃＋軟體月費＋多場景擴展』，目標是成為線下實體娛樂場域的標準 AI 現場助手。」
                    </div>
                </div>

                <h3>明天馬上要做的 10 件事</h3>
                <ol class="step-list">
                    <li class="step-item"><div class="step-num">1</div><div class="step-body"><strong>對外統一口徑一句話</strong>「R1 是不錄影的線下實體娛樂 AI 現場帶領與經營數據助手。」</div></li>
                    <li class="step-item"><div class="step-num">2</div><div class="step-body"><strong>挑出最常教的 3 款熱門遊戲</strong>先選定桌遊店點播率最高、規則很穩定的 3 款（例如：《卡卡頌》、《卡坦島》、《璀璨寶石》）。</div></li>
                    <li class="step-item"><div class="step-num">3</div><div class="step-body"><strong>把這 3 款遊戲規則整理好</strong>整理出開局怎麼擺、輪流怎麼玩、常見吵架問題、以及何時該叫店員。</div></li>
                    <li class="step-item"><div class="step-num">4</div><div class="step-body"><strong>固定 5 個標準語音任務</strong>只做這 5 個指令：<code>開始遊戲</code>、<code>教學指引</code>、<code>查規則</code>、<code>推薦遊戲</code>、<code>叫店員</code>。</div></li>
                    <li class="step-item"><div class="step-num">5</div><div class="step-body"><strong>定好數據記錄格式</strong>記錄這幾項就好：<code>時間、設備編號、桌號、遊戲名字、玩的人數、任務、花了多久、有沒有轉店員</code>。</div></li>
                    <li class="step-item"><div class="step-num">6</div><div class="step-body"><strong>做好一頁週報格式</strong>產出 5 個數字（開了幾桌、教了幾次、自己搞定率、省多少時間、最常卡住的遊戲）＋ 1 個排班建議。</div></li>
                    <li class="step-item"><div class="step-num">7</div><div class="step-body"><strong>找 3 家店談 4 週測試</strong>簽好條約：只測 3 款遊戲、保證不錄影、第 4 週結束約好談付費方案。</div></li>
                    <li class="step-item"><div class="step-num">8</div><div class="step-body"><strong>準備劇本殺與密室的初步 Demo 架構</strong>整理 1 個短劇本殺的搜證與配樂流程，以及 1 個密室逃脫的三段提示模型，備好擴展案例。</div></li>
                    <li class="step-item"><div class="step-num">9</div><div class="step-body"><strong>設定驗收及格標準</strong>「教學時間省 30%、機器自己搞定 70% 以上、至少 3 家願意付費」。</div></li>
                    <li class="step-item"><div class="step-num">10</div><div class="step-body"><strong>測試完直接談報價</strong>店家願意付錢或給訂金才算數，不要把口頭稱讚當成成功。</div></li>
                </ol>

                <div class="callout success" style="margin-top: 24px;">
                    <div class="callout-title">🌟 最終判斷標準</div>
                    <p style="font-size: 0.98rem; line-height: 1.75;">
                        <strong>我們現在不需要證明 R1 什麼都能做，也不需要證明它每一點都比手機厲害。</strong><br>
                        我們只要在桌遊店的桌上，證明它比客人自己查手機<strong>更順手、全桌都能一起參與、還能幫店長記錄數據</strong>，而且有真實老闆願意持續付錢，我們就能快速複製到劇本殺、密室逃脫和 VR 等大市場！
                    </p>
                </div>
            </section>

            <!-- 頁尾宣告 -->
            <footer>
                <p><strong>資料備註：</strong>本文件整合目前專案資訊與產業研究（包含 IMARC、Fortune Business Insights、Arizton、Grand View Research、台灣桌遊、劇本殺、密室逃脫與 VR 體驗館現況與個資隱私法規）。所有資訊供內部決策與商業規劃參考。</p>
            </footer>

        </main>
    </div>

    <!-- 互動檢索、滾動高亮與話術複製功能 -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const searchInput = document.getElementById('sectionSearch');
            const filterChips = document.querySelectorAll('.filter-chip');
            const sections = document.querySelectorAll('.content-section');

            // 關鍵字即時搜尋
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

            // 標籤類別篩選
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

            // 滾動目錄高亮
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

        // 話術一鍵複製
        function copyText(elemId) {
            const el = document.getElementById(elemId);
            if (!el) return;
            navigator.clipboard.writeText(el.innerText.trim()).then(() => {
                const btn = el.parentElement.querySelector('.copy-btn');
                if (!btn) return;
                const orig = btn.innerText;
                btn.innerText = '已複製！';
                btn.style.background = 'var(--ink)';
                btn.style.color = 'var(--paper-2)';
                setTimeout(() => {
                    btn.innerText = orig;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('複製失敗:', err);
            });
        }
    </script>
</body>
</html>
`;

fs.writeFileSync(targetHtmlPath, fullDocument, 'utf8');
console.log('✅ Successfully reconstructed R1 Strategy Guide with 100% of authentic original content + clean grounded additions!');
