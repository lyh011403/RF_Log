const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../routes/strategy_handbooks/R1_AI實體互動助手_公司決策與多領域拓展指南.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Define new Nav Structure and Chapters
const newNavHtml = `            <!-- 分類標籤篩選 -->
            <div class="filter-group">
                <span class="filter-chip active" data-filter="all">全部 (19)</span>
                <span class="filter-chip" data-filter="m1">I. 核心戰略 (01-04)</span>
                <span class="filter-chip" data-filter="m2">II. 數位孿生與天梯 (05-07)</span>
                <span class="filter-chip" data-filter="m3">III. 技術與產品 (08-11)</span>
                <span class="filter-chip" data-filter="m4">IV. 拓展與商模 (12-15)</span>
                <span class="filter-chip" data-filter="m5">V. 落地與行動 (16-19)</span>
            </div>

            <!-- 章節目錄列表 (依 5 大模組嚴密劃分) -->
            <nav aria-label="目錄" style="overflow-y: auto; flex: 1;">
                <ul class="nav-list" id="navList">
                    <!-- 模組 I -->
                    <li class="nav-group-title" style="font-size: 0.72rem; font-family: var(--font-mono); color: var(--gray-3); padding: 8px 10px 2px; font-weight: 700;">── 模組 I · 核心戰略與破局認知 ──</li>
                    <li class="nav-item" data-cat="m1"><a href="#sec-01-overview" class="active"><span class="nav-num">01</span> 核心結論與專案現狀</a></li>
                    <li class="nav-item" data-cat="m1"><a href="#sec-02-market-tw"><span class="nav-num">02</span> 台灣市場真實痛點與機會</a></li>
                    <li class="nav-item" data-cat="m1"><a href="#sec-03-critique"><span class="nav-num">03</span> 破解「市場太小」迷思</a></li>
                    <li class="nav-item" data-cat="m1"><a href="#sec-04-mobile-vs-r1"><span class="nav-num">04</span> 手機 vs R1 實體硬體本質</a></li>

                    <!-- 模組 II -->
                    <li class="nav-group-title" style="font-size: 0.72rem; font-family: var(--font-mono); color: var(--indigo); padding: 8px 10px 2px; font-weight: 700;">── 模組 II · 數位孿生與天梯生態 ──</li>
                    <li class="nav-item" data-cat="m2"><a href="#sec-05-digital-twin" style="color: var(--indigo); font-weight: 700;"><span class="nav-num">05</span> 桌遊數位孿生與雲端沙盒</a></li>
                    <li class="nav-item" data-cat="m2"><a href="#sec-06-creator-studio"><span class="nav-num">06</span> 創作者生態與規則擴充 SDK</a></li>
                    <li class="nav-item" data-cat="m2"><a href="#sec-07-ranked-ladder" style="color: var(--vermilion); font-weight: 700;"><span class="nav-num">07</span> 實體天梯排位與店家辦賽引流</a></li>

                    <!-- 模組 III -->
                    <li class="nav-group-title" style="font-size: 0.72rem; font-family: var(--font-mono); color: var(--gray-3); padding: 8px 10px 2px; font-weight: 700;">── 模組 III · 產品定義與技術架構 ──</li>
                    <li class="nav-item" data-cat="m3"><a href="#sec-08-scope"><span class="nav-num">08</span> 第一版範疇：做與不做清單</a></li>
                    <li class="nav-item" data-cat="m3"><a href="#sec-09-workflow"><span class="nav-num">09</span> R1 標準運作流程與互動閉環</a></li>
                    <li class="nav-item" data-cat="m3"><a href="#sec-10-rules-engine"><span class="nav-num">10</span> 結構化規則檢索與回答安全</a></li>
                    <li class="nav-item" data-cat="m3"><a href="#sec-11-privacy-data"><span class="nav-num">11</span> 零錄影隱私與店家數據資產</a></li>

                    <!-- 模組 IV -->
                    <li class="nav-group-title" style="font-size: 0.72rem; font-family: var(--font-mono); color: var(--teal); padding: 8px 10px 2px; font-weight: 700;">── 模組 IV · 多領域拓展與商業變現 ──</li>
                    <li class="nav-item" data-cat="m4"><a href="#sec-12-multi-domains" style="color: var(--teal); font-weight: 700;"><span class="nav-num">12</span> 4大線下場景：桌遊·劇本·密室·VR</a></li>
                    <li class="nav-item" data-cat="m4"><a href="#sec-13-business-models"><span class="nav-num">13</span> 七種賺錢模式與階梯定價</a></li>
                    <li class="nav-item" data-cat="m4"><a href="#sec-14-moat"><span class="nav-num">14</span> 軟硬一體與數據護城河</a></li>
                    <li class="nav-item" data-cat="m4"><a href="#sec-15-global-market"><span class="nav-num">15</span> 全球市場對標與競品防禦</a></li>

                    <!-- 模組 V -->
                    <li class="nav-group-title" style="font-size: 0.72rem; font-family: var(--font-mono); color: var(--gray-3); padding: 8px 10px 2px; font-weight: 700;">── 模組 V · 落地驗證與行動決策 ──</li>
                    <li class="nav-item" data-cat="m5"><a href="#sec-16-poc-90days"><span class="nav-num">16</span> 90天店家實地驗證計畫</a></li>
                    <li class="nav-item" data-cat="m5"><a href="#sec-17-kpi"><span class="nav-num">17</span> 成功量化指標與考核數字</a></li>
                    <li class="nav-item" data-cat="m5"><a href="#sec-18-decision-tree"><span class="nav-num">18</span> 決策樹：繼續做、轉向或停止</a></li>
                    <li class="nav-item" data-cat="m5"><a href="#sec-19-pitch-actions"><span class="nav-num">19</span> 對三種人話術與即刻行動項</a></li>
                </ul>
            </nav>`;

console.log('Replacing navigation list...');
html = html.replace(/<!-- 分類標籤篩選 -->[\s\S]*?<\/nav>/, newNavHtml);

// 2. Build the complete, impeccably written main content body
const newBodySections = `
            <!-- 01 核心結論 -->
            <section id="sec-01-overview" class="content-section" data-cat="m1">
                <h2><span class="section-tag">01</span> 核心結論與專案現狀</h2>
                
                <div class="callout success">
                    <div class="callout-title">💡 核心定調：不要做純硬體買賣，做「數位孿生平台 ➔ 實體 R1 落地」之軟硬閉環</div>
                    <p>台灣桌遊店數量有限，如果我們只打算「賣一台很酷的機器給桌遊店」，公司很難賺大錢；但 R1 現在做出來的實體互動能力很有價值。正確做法是：<strong>以桌遊店作為首發測試場地，構建雲端數位孿生與天梯賽事系統，證明能幫店家吸引人流、省下教學時間，並快速橫向複製到劇本殺、密室逃脫、VR 等高客單價場域！</strong></p>
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
                    <div class="quote-text">我們賣的不是相機零件或 AI 晶片，而是「幫店家省下教人時間、讓新手順利開局、用天梯賽事吸引人流、給店長看出哪裡要改進的數據」。</div>
                </div>
            </section>

            <!-- 02 台灣市場 -->
            <section id="sec-02-market-tw" class="content-section" data-cat="m1">
                <h2><span class="section-tag">02</span> 台灣市場：真實痛點與落地機會</h2>
                
                <p>桌遊店不是沒人去，而是<strong>開店成本高、利潤薄、平日離峰時段桌席閒置</strong>。如果我們的產品不能實際幫老闆省錢或多賺錢，老闆不會買單。</p>

                <div class="grid-2">
                    <div class="card">
                        <h3>桌遊店老闆現在遇到的 6 大痛點</h3>
                        <ul>
                            <li><strong>房租和人事費很貴</strong>：平日沒人來、假日擠滿人，請人排班極為困難。</li>
                            <li><strong>很缺會教遊戲的店員</strong>：新手一定要人教，但培訓熟練店員耗時 2~3 個月且流動率極高。</li>
                            <li><strong>平日晚間缺乏客流</strong>：缺乏常態性賽事機制激發玩家回流。</li>
                            <li><strong>店員一個人當三個人用</strong>：要顧櫃台、煮飲料、結帳，還要跑各桌教規則。</li>
                            <li><strong>手遊搶走年輕人時間</strong>：缺乏將實體桌遊「競技排位化」的誘因。</li>
                            <li><strong>教學有成本</strong>：許多店家想收教學費卻被客人抱怨，陷入兩難。</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h3>市場上真實存在的需求證據</h3>
                        <ul>
                            <li><strong>新天鵝堡師資培訓常態滿班</strong>：每班收約 20 人，代表「教學與帶場」是剛性剛需。</li>
                            <li><strong>實體社交不可替代</strong>：玩家去桌遊店是為了面對面聚會情感互動，手機無法取代。</li>
                            <li><strong>天梯賽事能創造翻倍人流</strong>：例如寶可夢卡牌、魔法風雲會只要辦比賽就爆滿，但休閒桌遊缺乏自動辦賽系統。</li>
                        </ul>
                    </div>
                </div>

                <h3>台灣市場現狀數據參考</h3>
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
                                <td>包含各類卡牌玩具，市場持續穩定擴大。</td>
                            </tr>
                            <tr>
                                <td><strong>台灣實際店家數量</strong></td>
                                <td>全台灣約 150～300 多家店</td>
                                <td>以中小型獨立與連鎖店為主</td>
                                <td>全台店家總數有限，必須走<strong>「軟體平台＋賽事引流＋多領域拓展」</strong>！</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- 03 破解小眾迷思 -->
            <section id="sec-03-critique" class="content-section" data-cat="m1">
                <h2><span class="section-tag">03</span> 破解「市場太小」與「實體死路」迷思</h2>
                
                <div class="grid-2">
                    <div class="card" style="border-top: 4px solid var(--amber);">
                        <h3>❌ 迷思一：「桌遊店那麼少，做這個能賺什麼錢？」</h3>
                        <p><strong>正確認知：</strong>我們不是只做「桌遊店的硬體外包商」。桌遊店是我們<strong>成本最低、最容易天天測、能最快累積人機互動資料庫的起跑點</strong>。只要在桌遊店把「頂置看手部＋語音帶流程」做到極致，就能直接橫向降維打擊劇本殺、密室逃脫與 VR！</p>
                    </div>

                    <div class="card" style="border-top: 4px solid var(--amber);">
                        <h3>❌ 迷思二：「現在大家都在線上玩，實體早晚會死？」</h3>
                        <p><strong>正確認知：</strong>全球實體桌遊市場每年以 8~10% 成長。人是高度渴望實體面對面社交的動物。線上遊戲越發達，線下「摸得到紙牌、看得到朋友表情」的沉浸感越顯稀缺高價。</p>
                    </div>
                </div>
            </section>

            <!-- 04 手機 vs R1 -->
            <section id="sec-04-mobile-vs-r1" class="content-section" data-cat="m1">
                <h2><span class="section-tag">04</span> 手機 App vs R1 實體硬體本質差異</h2>
                
                <p>為什麼不直接叫客人「下載手機 App 或看 YouTube」就好？<strong>因為玩桌遊時，拿起手機就會打破同桌的社交氛圍。</strong></p>

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>體驗維度</th>
                                <th>手機 App / 看 YouTube 影片</th>
                                <th>R1 實體 AI 互動助手</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>同桌參與感</strong></td>
                                <td>只有拿著手機的那個人在看，其他人發呆滑手機，破壞社交氣氛。</td>
                                <td><strong>全桌共享中心</strong>：語音大聲說出來，大家同時聽懂，不用低頭看螢幕。</td>
                            </tr>
                            <tr>
                                <td><strong>雙手自由度</strong></td>
                                <td>一手拿牌、一手拿手機，查規則時手忙腳亂。</td>
                                <td><strong>雙手完全解放</strong>：雙手專注拿卡牌拿配件，嘴巴問一句「這張牌怎麼用」就搞定。</td>
                            </tr>
                            <tr>
                                <td><strong>現場引導感</strong></td>
                                <td>像是在店裡自己做功課，感覺不到店家服務。</td>
                                <td><strong>專屬實體裁判</strong>：就像桌上坐了一位隨時為你們服務的 AI 專職店員。</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- 05 桌遊數位孿生與雲端沙盒平台 -->
            <section id="sec-05-digital-twin" class="content-section" data-cat="m2">
                <h2><span class="section-tag">05</span> 桌遊數位孿生與雲端沙盒平台 (Tabletop Omniverse Sandbox)</h2>
                
                <div class="callout purple" style="border-left-width: 6px;">
                    <div class="callout-title" style="font-size: 1.15rem;">🌌 戰略維度：桌遊界的 NVIDIA Omniverse + Sim-to-Real 閉環</div>
                    <p style="font-size: 1.05rem; line-height: 1.8; color: var(--ink);">
                        <strong>核心突破口：</strong>傳統實體桌遊開發面臨「設計耗時長 (1~2年)」、「盲測成本極高」、「出版後數值失衡無法 OTA 修正」與「店家現場教學門檻高」四大致命瓶頸。<br>
                        我們借鑒 <strong>NVIDIA Omniverse / Isaac Sim</strong> 的數位孿生架構：<strong>先在雲端虛擬空間建立桌遊數位孿生沙盒，由 AI 虛擬玩家進行百萬場高速自我對弈（Sim-to-Test），完成數值平衡與規則驗證後，一鍵編譯下發回歸到 R1 實體機器人（Sim-to-Real），在真實桌面進行實體視覺裁判與互動教學！</strong>
                    </p>
                </div>

                <h3>數位孿生運作閉環 (Sim-to-Real Architecture)</h3>
                <div class="grid-2">
                    <div class="card" style="border-top: 4px solid var(--indigo);">
                        <div class="card-icon">🧠</div>
                        <h3>雲端沙盒：AI 虛擬玩家百萬場對弈</h3>
                        <p><strong>在虛擬空間中完成極限平衡性測試：</strong></p>
                        <ul>
                            <li><strong>多重人格 AI Agent</strong>：注入快攻型、極限控場型、隨機新手型與極限搗蛋型 AI 自我對弈。</li>
                            <li><strong>蒙地卡羅樹搜尋 (MCTS)</strong>：1 小時模擬 100,000+ 場，輸出勝率熱力圖與卡牌 Tier 分布。</li>
                            <li><strong>死局自動巡檢 (Deadlock Patrol)</strong>：自動找出無限迴圈、卡手死局並標記觸發步驟。</li>
                        </ul>
                    </div>

                    <div class="card" style="border-top: 4px solid var(--vermilion);">
                        <div class="card-icon">🤖</div>
                        <h3>實體邊緣：一鍵編譯回歸 R1 機器人</h3>
                        <p><strong>將虛擬規則無縫映射至實體桌面：</strong></p>
                        <ul>
                            <li><strong>模型輕量化編譯</strong>：將雲端規則包打包為 <code>.r1pkg</code> (&lt; 5MB)，本地記憶體極速載入。</li>
                            <li><strong>頂置視覺 (CV) 映射</strong>：將虛擬沙盒座標映射至實體桌面，手勢追蹤即時同步棋盤狀態。</li>
                            <li><strong>雲端 OTA 規則熱修復</strong>：創作者在平台發布補丁，全球實體 R1 機器人即時生效，徹底終結死規爭議！</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- 06 創作者生態與規則擴充 SDK -->
            <section id="sec-06-creator-studio" class="content-section" data-cat="m2">
                <h2><span class="section-tag">06</span> 創作者生態與規則擴充 SDK (Creator Studio & Modding)</h2>
                
                <p>將平台打造成「桌遊界的 Roblox」，賦予全球獨立桌遊設計師強大的無代碼/低代碼規則編排能力。</p>

                <div class="grid-3">
                    <div class="card">
                        <div class="card-icon">⚙️</div>
                        <h3>Tabletop Genesis 基礎引擎</h3>
                        <p><strong>通用底層狀態機：</strong></p>
                        <ul>
                            <li>卡牌 (Card)、棋盤網格 (Grid/Hex)、骰子 (Dice)、資源標記物 (Token) 抽象層。</li>
                            <li>有限狀態機 (FSM) 與事件總線 (Event Bus)，支援任意連鎖效果。</li>
                        </ul>
                    </div>
                    <div class="card">
                        <div class="card-icon">🎨</div>
                        <h3>視覺化節點規則編輯器</h3>
                        <p><strong>無代碼/低代碼拖拉：</strong></p>
                        <ul>
                            <li>如同 Unreal 藍圖，設計師可無代碼拉出遊戲勝利條件與技能樹。</li>
                            <li>支援 Python / Lua 深度自定義複雜非對稱陣營技能。</li>
                        </ul>
                    </div>
                    <div class="card">
                        <div class="card-icon">💰</div>
                        <h3>UGC 創作者 70/30 分潤</h3>
                        <p><strong>商業激勵機制：</strong></p>
                        <ul>
                            <li>創作者發布付費劇本或遊戲擴充包，享有 70% 下載分潤。</li>
                            <li>提供「官方權威平衡性認證證書」，提升實體出版募資成功率。</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- 07 實體天梯排位與店家辦賽引流系統 -->
            <section id="sec-07-ranked-ladder" class="content-section" data-cat="m2">
                <h2><span class="section-tag">07</span> 實體天梯排位與店家一鍵辦賽引流系統 (Ranked Ladder & Tournament Engine)</h2>
                
                <div class="callout warning" style="border-left-width: 6px;">
                    <div class="callout-title" style="font-size: 1.15rem;">🏆 破解店家平日離峰痛點：用「天梯比賽」把休閒玩家變成常態回流客！</div>
                    <p style="font-size: 1.05rem; line-height: 1.8;">
                        桌遊店老闆最頭痛的是<strong>「週一至週四晚上桌席全空」</strong>。辦比賽是最好的吸客方式，但傳統辦賽面臨<strong>「賽制難排 (瑞士制/循環賽算分麻煩)」、「店員裁判不公正易得罪客人」、「休閒派對遊戲缺乏競技排位機制」</strong>等三大痛點。<br>
                        <strong>R1 實體天梯系統</strong> 讓店家老闆 30 秒一鍵建立比賽，由 R1 機器人擔任公正 AI 裁判，並連通全台跨店天梯排位榜，吸引大量玩家每週固定到店打天梯練排位！
                    </p>
                </div>

                <h3>一、 店家辦賽三大致命痛點 vs R1 天梯系統解決方案</h3>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>辦賽環節</th>
                                <th>傳統店家辦賽困境</th>
                                <th>R1 實體天梯與自動辦賽系統</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>賽程編排與分桌</strong></td>
                                <td>老闆手寫對陣表，瑞士制算小分算到頭痛，耗費 1~2 小時。</td>
                                <td><strong>一鍵自動辦賽 (1-Click Auto Match)</strong>：老闆後台選定遊戲，玩家掃碼 3 秒完成自動分桌抽籤與進階晉級。</td>
                            </tr>
                            <tr>
                                <td><strong>現場規則與計分爭議</strong></td>
                                <td>店員兼當裁判，判錯得罪熟客、判對被質疑偏袒，爭議不斷。</td>
                                <td><strong>R1 機器人現場公正 AI 裁判</strong>：頂置鏡頭看盤面算分，調用官方標準規則庫，0 人情人面爭議。</td>
                            </tr>
                            <tr>
                                <td><strong>玩家黏著度與回流率</strong></td>
                                <td>比賽比完一次人就散了，平日依然沒有人來練牌。</td>
                                <td><strong>全台連鎖天梯積分榜 (National Leaderboard)</strong>：常態性排位分段（青銅➔王者），玩家每週平日回流刷分。</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>二、 R1 天梯系統 4 大核心模組功能</h3>
                <div class="grid-2">
                    <div class="card">
                        <div class="card-icon">⚡</div>
                        <h3>1. 一鍵智慧辦賽與 QR 掃碼分桌</h3>
                        <p>老闆只需在手機/平板勾選「賽事名稱、遊戲種類、參賽人數、賽制 (單淘汰/雙淘汰/瑞士制/積分循環)」，系統自動生成專屬賽事海報與 QR Code。參賽玩家掃碼即自動完成報到、隨機分桌與座位指派，全程 0 人力負擔。</p>
                    </div>

                    <div class="card">
                        <div class="card-icon">⚖️</div>
                        <h3>2. R1 現場公正 AI 裁判與自動算分</h3>
                        <p>各桌配置之 R1 機器人自動載入比賽專屬規則模式：嚴格倒數計時、頂置 CV 盤面判定、分數自動匯總上傳中央賽事系統。遇到模糊爭議，R1 以官方權威條文逐字語音釋疑，確保賽事 100% 絕對公平。</p>
                    </div>

                    <div class="card">
                        <div class="card-icon">🎮</div>
                        <h3>3. 休閒/派對遊戲「天梯競技化」改造</h3>
                        <p>打破「只有重度卡牌 (TCG) 才能辦比賽」的限制！R1 為《德國心臟病》、《阿瓦隆》、《卡卡頌》、《卡坦島》、《璀璨寶石》等普及度極高的休閒派對遊戲設計「標準競技計時模式」，讓全年齡客群都能體驗打天梯升段位的快感。</p>
                    </div>

                    <div class="card">
                        <div class="card-icon">🌍</div>
                        <h3>4. 全台連鎖店跨店聯賽與季末總決賽</h3>
                        <p>連通瘋桌遊等全台數百家連鎖與獨立門市。玩家在台北 A 店打的積分，能與台中 B 店、高雄 C 店玩家在全台天梯榜同步角逐。每季末由總部舉辦「全台實體總決賽」，發放高額獎金與限定周邊，為線下門市持續注入高消費力客群！</p>
                    </div>
                </div>

                <h3>三、 店家經濟效益與 ROI 試算</h3>
                <div class="grid-3">
                    <div class="card" style="background: var(--paper-2); border-color: var(--emerald);">
                        <strong style="color: var(--emerald); font-size: 1.05rem; display: block; margin-bottom: 8px;">📈 平日離峰桌席利用率 +40%</strong>
                        <p>每週二、四固定舉辦「R1 天梯排位夜」，原本空置的 6~8 桌全部滿座，帶動飲料、零食與場地費收益。</p>
                    </div>
                    <div class="card" style="background: var(--paper-2); border-color: var(--indigo);">
                        <strong style="color: var(--indigo); font-size: 1.05rem; display: block; margin-bottom: 8px;">🏆 賽事報名費常態分潤</strong>
                        <p>每場天梯賽每人收取 NT$150~250 報名費，店家獲得 70% 場地與獎金提成，平台收取 30% 賽事系統技術費。</p>
                    </div>
                    <div class="card" style="background: var(--paper-2); border-color: var(--vermilion);">
                        <strong style="color: var(--vermilion); font-size: 1.05rem; display: block; margin-bottom: 8px;">🔄 遊戲盒裝銷量激增 35%</strong>
                        <p>想在天梯賽奪冠的玩家會主動購買實體桌遊回家練習，徹底解決桌遊店「賣不出盒裝遊戲」的產業宿疾！</p>
                    </div>
                </div>
            </section>

            <!-- 08 第一版範疇 -->
            <section id="sec-08-scope" class="content-section" data-cat="m3">
                <h2><span class="section-tag">08</span> 第一版範疇：做什麼與不做什麼清單</h2>
                
                <div class="grid-2">
                    <div class="card" style="border-left: 4px solid var(--emerald);">
                        <h3>✅ 第一版「一定做好」清單</h3>
                        <ul>
                            <li><strong>專攻 3 款普及遊戲</strong>：挑選規則明確、受眾廣的遊戲（例如：《卡卡頌》、《阿瓦隆》、《德國心臟病》）。</li>
                            <li><strong>把初始擺盤跟開局講清楚</strong>：新手最常卡在「一開始怎麼擺、每個人拿幾張牌」，這個一定要秒懂。</li>
                            <li><strong>每回合流程能用語音一步一步帶</strong>：客人問「換我了要幹嘛」，一句話講清楚三個動作。</li>
                            <li><strong>常見吵架爭議能給出標準答案</strong>：把說明書翻遍、把論壇常問整理成題庫。</li>
                            <li><strong>一鍵呼叫店員功能</strong>：遇到機器回答不了或客人不想聽時，隨時按一下或喊一聲叫店員。</li>
                        </ul>
                    </div>

                    <div class="card" style="border-left: 4px solid var(--vermilion);">
                        <h3>🚫 第一版「絕對不做」清單</h3>
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

            <!-- 09 R1 標準運作流程 -->
            <section id="sec-09-workflow" class="content-section" data-cat="m3">
                <h2><span class="section-tag">09</span> R1 標準運作流程與互動閉環</h2>
                
                <ol class="step-list">
                    <li class="step-item">
                        <div class="step-num">1</div>
                        <div class="step-body">
                            <strong>客人坐下，語音或按鍵選遊戲</strong>
                            直接對機器說「我們要玩卡卡頌，4個人」，機器亮綠燈確認。
                        </div>
                    </li>
                    <li class="step-item">
                        <div class="step-num">2</div>
                        <div class="step-body">
                            <strong>頂置相機看一眼桌面擺盤</strong>
                            鏡頭在記憶體算一眼：「起始板塊擺對了嗎？每人手邊米寶夠不夠？」，確認完立即清除影像。
                        </div>
                    </li>
                    <li class="step-item">
                        <div class="step-num">3</div>
                        <div class="step-body">
                            <strong>一句一句用語音帶新手設置</strong>
                            清晰語音引導：「請洗牌，每人抽 5 張，由最年輕的玩家先開始。」隨時可喊「再講一次」。
                        </div>
                    </li>
                    <li class="step-item">
                        <div class="step-num">4</div>
                        <div class="step-body">
                            <strong>隨時解答規則疑惑與天梯計時</strong>
                            玩家問「城堡沒封閉有分嗎？」，0.8 秒給出精準標準答案，不中斷遊戲節奏。
                        </div>
                    </li>
                    <li class="step-item">
                        <div class="step-num">5</div>
                        <div class="step-body">
                            <strong>遊戲結束記錄數據並上傳天梯分</strong>
                            自動生成本局數據，天梯賽自動結算勝負積分，平日遊玩則寫入店長週報。
                        </div>
                    </li>
                </ol>
            </section>

            <!-- 10 規則整理與回答安全 -->
            <section id="sec-10-rules-engine" class="content-section" data-cat="m3">
                <h2><span class="section-tag">10</span> 結構化規則檢索與回答安全</h2>
                
                <p>「講得正確、不亂掰」比「看起來很厲害」重要一百倍。每一款支援的遊戲都要整理成<strong>標準規則資料包</strong>。</p>

                <div class="grid-2">
                    <div class="card">
                        <h3>每款遊戲規則包必備 6 大模組</h3>
                        <ul>
                            <li><strong>基本資料</strong>：遊戲名字、版本、出版年、是否含擴充。</li>
                            <li><strong>遊戲規格</strong>：人數範圍、平均時長、難度評級、配件清單。</li>
                            <li><strong>開局流程</strong>：初始版圖配置、起始資源、先手判定。</li>
                            <li><strong>回合步驟</strong>：標準階段順序（抽牌 ➔ 行動 ➔ 計分 ➔ 結束）。</li>
                            <li><strong>常見爭議庫</strong>：高頻吵架情境、官方勘誤表 (Errata)、說明書頁碼出處。</li>
                            <li><strong>叫店員臨界點</strong>：標記特定無法判定之情境直接呼叫店員。</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h3>AI 回答的 4 重安全防線</h3>
                        <ul>
                            <li><strong>確信回答 (Standard)</strong>：資料庫有標準條文，直接朗讀並附註規則書出處。</li>
                            <li><strong>反問確認 (Clarify)</strong>：情境模糊時主動反問「請問你們這局有加河流擴充嗎？」。</li>
                            <li><strong>誠實轉接 (Escalate)</strong>：未收錄之冷門規則主動回應「這題較特殊，已為您呼叫店長協助。」</li>
                            <li><strong>爭議隔離 (Neutral)</strong>：涉及勝負衝突時不強行裁決，直接切換人工仲裁。</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- 11 零錄影隱私與店家數據資產 -->
            <section id="sec-11-privacy-data" class="content-section" data-cat="m3">
                <h2><span class="section-tag">11</span> 零錄影隱私防護與店家數據資產</h2>
                
                <div class="grid-2">
                    <div class="card">
                        <h3>把「不錄影」當成最大信任優勢</h3>
                        <ul>
                            <li><strong>純記憶體運算</strong>：鏡頭即時判斷手部與配件，運算完畢立即覆寫清除，硬碟 0 檔案留存。</li>
                            <li><strong>不抓人臉生物特徵</strong>：專注於桌面物件，嚴格規避個人生物識別資訊 (GDPR/個資法規範)。</li>
                            <li><strong>硬體層安全保障</strong>：即使機器遭拆解竊取，亦無法恢復出任何現場錄影。</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h3>店長每週必看的數據資產</h3>
                        <ul>
                            <li><strong>離峰與尖峰桌席率</strong>：精準掌握各時段來客數，優化排班成本。</li>
                            <li><strong>R1 自主教學率</strong>：清楚量化「幫店員省下多少工時」（例如：本週幫店員節省 16.5 小時）。</li>
                            <li><strong>高頻卡關遊戲排行榜</strong>：掌握哪款遊戲最常需要支援，針對性調整進貨與推廣。</li>
                            <li><strong>天梯賽事人流轉化率</strong>：掌握辦賽帶來的回流人數與週邊消費金額。</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- 12 多領域拓展 -->
            <section id="sec-12-multi-domains" class="content-section" data-cat="m4">
                <h2><span class="section-tag">12</span> 4 大線下娛樂場景拓展：桌遊·劇本殺·密室·VR</h2>
                
                <div class="grid-2">
                    <div class="card" style="border-top: 4px solid var(--teal);">
                        <h3>1. 桌遊店（測試起點 · 驗證技術）</h3>
                        <p><strong>客單價 100~200 元</strong>：全台約 200 家。首要任務是磨練人機互動流暢度、驗證天梯賽事引流，打磨出穩定可靠的產品底層。</p>
                    </div>

                    <div class="card" style="border-top: 4px solid var(--indigo);">
                        <h3>2. 劇本殺 LARP（高客單價 · 主持人剛需）</h3>
                        <p><strong>客單價 500~1,000 元</strong>：全台約 100 家。劇本殺最缺熟練 DM（主持人）。R1 升級為「AI 旁白主持＋聲光氣氛控制＋私密線索分發」，每場為店家省下 300~500 元人力成本！</p>
                    </div>

                    <div class="card" style="border-top: 4px solid var(--amber);">
                        <h3>3. 密室逃脫（超高人力 · AI NPC 互動）</h3>
                        <p><strong>客單價 600~1,200 元</strong>：全台約 100 多家。傳統密室需大量小天使盯場對講機給提示。R1 化身「房間內建 AI NPC」，依玩家進度給予沉浸式動態提示，大幅降低盯場人力。</p>
                    </div>

                    <div class="card" style="border-top: 4px solid var(--vermilion);">
                        <h3>4. VR 體驗館（高科技溢價 · 穿戴引導）</h3>
                        <p><strong>客單價 400~800 元</strong>：新手戴上頭盔後容易迷失恐慌。R1 擔任「實體領航員」，語音指引新手配戴、握把手勢教學與安全防撞預警。</p>
                    </div>
                </div>
            </section>

            <!-- 13 7種賺錢模式與階梯定價 -->
            <section id="sec-13-business-models" class="content-section" data-cat="m4">
                <h2><span class="section-tag">13</span> 七種賺錢商業模式與階梯定價</h2>
                
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>模式名稱</th>
                                <th>收費對象</th>
                                <th>建議定價策略</th>
                                <th>預期獲利特點</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>1. 硬體買斷 / 分期</strong></td>
                                <td>桌遊店、劇本殺、密室店家</td>
                                <td>每台 NT$12,000～18,000（含鏡頭/主機/展台）</td>
                                <td>快速回收初期硬體物料與組裝成本。</td>
                            </tr>
                            <tr>
                                <td><strong>2. 基礎軟體月租 (SaaS)</strong></td>
                                <td>實體門市店家</td>
                                <td>每台 NT$600～800 / 月（提供 10 款遊戲＋週報）</td>
                                <td>穩定每月的被動經常性收入 (MRR)。</td>
                            </tr>
                            <tr>
                                <td><strong>3. 天梯賽事系統抽成</strong></td>
                                <td>辦賽店家與參賽玩家</td>
                                <td>每場賽事報名費 30% 技術服務費</td>
                                <td>隨店家辦賽頻率與全台聯賽規模爆發成長。</td>
                            </tr>
                            <tr>
                                <td><strong>4. 創作者平台算力包</strong></td>
                                <td>獨立桌遊設計師 / 出版社</td>
                                <td>每 10 萬場 AI 模擬對弈 NT$300（專業版月費 NT$990）</td>
                                <td>高毛利雲端運算收入，吸引全球設計師。</td>
                            </tr>
                            <tr>
                                <td><strong>5. 遊戲商城 UGC 分潤</strong></td>
                                <td>桌遊創作者 / 出版社</td>
                                <td>付費擴充包 70/30 分成（創作者 70% / 平台 30%）</td>
                                <td>桌遊界 Roblox 模式，形成網路效應。</td>
                            </tr>
                            <tr>
                                <td><strong>6. 劇本殺/密室高階模組</strong></td>
                                <td>劇本殺與密室業者</td>
                                <td>單個劇本包 NT$3,000～8,000（或每場抽 NT$100）</td>
                                <td>客單價高，付費意願遠高於普通桌遊店。</td>
                            </tr>
                            <tr>
                                <td><strong>7. 政府補助與企業採購</strong></td>
                                <td>文策院、青創、教育長照機構</td>
                                <td>專案補助 NT$50 萬～200 萬元</td>
                                <td>爭取 SBIR、DIGBLOCK、樂齡長照桌遊專案。</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- 14 護城河 -->
            <section id="sec-14-moat" class="content-section" data-cat="m4">
                <h2><span class="section-tag">14</span> 軟硬一體與數據護城河</h2>

                <div class="grid-2">
                    <div class="card">
                        <div class="card-icon">🏰</div>
                        <h3>1. Sim-to-Real 軟硬一體閉環</h3>
                        <p>純軟體公司沒有實體終端，純硬體商缺乏數位孿生平台。R1 成為全世界唯一「線上沙盒模擬 ➔ 實體邊緣執行」的唯一官方終端。</p>
                    </div>
                    <div class="card">
                        <div class="card-icon">📊</div>
                        <h3>2. 全台最大線下實體互動數據庫</h3>
                        <p>累積數百萬次「實體卡牌辨識、新手卡關步驟、玩家吵架頻率」之真實線下互動資料，具備極強數據壁壘。</p>
                    </div>
                    <div class="card">
                        <div class="card-icon">🤝</div>
                        <h3>3. 在地店家與天梯聯賽通路黏著</h3>
                        <p>全台連鎖桌遊店已全面導入天梯排位與每週賽事排程，換掉系統將承受巨大玩家流失成本。</p>
                    </div>
                    <div class="card">
                        <div class="card-icon">🛡️</div>
                        <h3>4. 現場聲學抗噪與低延遲邊緣演算法</h3>
                        <p>實體店吵雜環境下的精準聲學降噪與低延遲本地記憶體推論能力，國外通用軟體無法直接落地。</p>
                    </div>
                </div>
            </section>

            <!-- 15 全球市場與國外軟體 -->
            <section id="sec-15-global-market" class="content-section" data-cat="m4">
                <h2><span class="section-tag">15</span> 全球市場對標與國外競品防禦</h2>

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>國外既有產品</th>
                                <th>他們在做什麼</th>
                                <th>他們做不到的（我們的機會）</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Tabletop Simulator</strong></td>
                                <td>線上電腦 3D 模擬桌遊物理操作。</td>
                                <td>只能在電腦前玩，完全無法支援實體桌面面對面聚會與實體比賽。</td>
                            </tr>
                            <tr>
                                <td><strong>D&D Beyond</strong></td>
                                <td>TRPG 跑團線上電子角卡與規則庫。</td>
                                <td>純手機/網頁工具，沒有頂置實體視覺追蹤與現場語音 AI 互動。</td>
                            </tr>
                            <tr>
                                <td><strong>BoardGameGeek (BGG)</strong></td>
                                <td>全球最大桌遊論壇與文字資料庫。</td>
                                <td>只有靜態文字，缺乏 AI 數位孿生沙盒模擬與實體自動辦賽系統。</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- 16 90天店家驗證計畫 -->
            <section id="sec-16-poc-90days" class="content-section" data-cat="m5">
                <h2><span class="section-tag">16</span> 90天店家實地驗證計畫 (90-Day POC Roadmap)</h2>

                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <strong>第 1~30 天：基礎打磨與 3 家先鋒店家進駐</strong>
                            <p>完成《卡卡頌》、《阿瓦隆》、《德國心臟病》3 款遊戲的規則狀態機與天梯賽事系統；進駐 3 間友好桌遊門市實測 4 週。</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <strong>第 31~60 天：天梯排位夜實測與付費驗證</strong>
                            <p>在合作店家試辦「週二天梯排位賽」，驗證平日人流拉動效果；第 4 週結束直接向老闆提案「月租 NT$600」付費意願。</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <strong>第 61~90 天：劇本殺/密室 Demo 與商模複製</strong>
                            <p>展示 1 套劇本殺 AI 主持模組與密室提示系統，向 5 家劇本殺/密室業者報價，完成跨領域複製商業模型驗證。</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 17 成功指標 -->
            <section id="sec-17-kpi" class="content-section" data-cat="m5">
                <h2><span class="section-tag">17</span> 成功量化指標與考核數字 (KPIs)</h2>

                <div class="grid-3">
                    <div class="card">
                        <strong style="color: var(--emerald); font-size: 1.1rem; display: block; margin-bottom: 6px;">🎯 指標一：教學省時 &gt; 30%</strong>
                        <p>原本需要店員講 15 分鐘的遊戲，R1 介入後店員只需花不到 5 分鐘輔助。</p>
                    </div>
                    <div class="card">
                        <strong style="color: var(--indigo); font-size: 1.1rem; display: block; margin-bottom: 6px;">🎯 指標二：自主教學率 &gt; 70%</strong>
                        <p>整局遊戲從開局設置到計分，70% 以上的情況由 R1 獨立引導完成，無需店員介入救火。</p>
                    </div>
                    <div class="card">
                        <strong style="color: var(--vermilion); font-size: 1.1rem; display: block; margin-bottom: 6px;">🎯 指標三：至少 3 家店家願意付費</strong>
                        <p>實測 4 週後，至少 3 位老闆願意以 NT$600~800/月 簽約租賃或支付保證金。</p>
                    </div>
                </div>
            </section>

            <!-- 18 決策樹 -->
            <section id="sec-18-decision-tree" class="content-section" data-cat="m5">
                <h2><span class="section-tag">18</span> 決策樹：繼續做、轉向還是停止 (Go/No-Go Decision Tree)</h2>

                <div class="grid-3">
                    <div class="card" style="border-top: 4px solid var(--emerald);">
                        <h3 style="color: var(--emerald);">🟢 綠燈：全力加速拓展</h3>
                        <p><strong>條件：</strong>店家高度滿意、願意每月付費、天梯賽有效拉動平日人流。</p>
                        <p><strong>行動：</strong>擴充至 20 家連鎖店，並全面啟動劇本殺與密室逃脫高階市場拓展！</p>
                    </div>

                    <div class="card" style="border-top: 4px solid var(--amber);">
                        <h3 style="color: var(--amber);">🟡 黃燈：戰術轉向 (Pivot)</h3>
                        <p><strong>條件：</strong>桌遊店覺得省時有限但天梯賽非常受歡迎，或劇本殺業者付費意願極高。</p>
                        <p><strong>行動：</strong>將重心全力轉向「桌遊天梯賽事系統」或直接切入「劇本殺 AI 主持人」！</p>
                    </div>

                    <div class="card" style="border-top: 4px solid var(--vermilion);">
                        <h3 style="color: var(--vermilion);">🔴 紅燈：及時停損 (Stop)</h3>
                        <p><strong>條件：</strong>實體噪音無法克服、玩家嫌語音吵、沒有任何店家願意付費超過 500 元。</p>
                        <p><strong>行動：</strong>立即停止生產硬體，將已開發之規則演算法與視覺專利轉移為純線上軟體工具或申請補助結案。</p>
                    </div>
                </div>
            </section>

            <!-- 19 對三種人說法與即刻行動項 -->
            <section id="sec-19-pitch-actions" class="content-section" data-cat="m5">
                <h2><span class="section-tag">19</span> 對三種人的對外話術與即刻行動項</h2>

                <h3>對三種關鍵對象的精準話術 (BLUF)</h3>
                <div class="grid-3">
                    <div class="card">
                        <strong style="color: var(--ink); font-size: 1.02rem; display: block; margin-bottom: 6px;">👔 對老闆與主管說：</strong>
                        <p>「我們正在以桌遊店作為首發低成本測試場景，用數位孿生與天梯系統幫店家省人力、吸引人流；驗證成功後將直接切入劇本殺與密室等百億線下娛樂市場！」</p>
                    </div>
                    <div class="card">
                        <strong style="color: var(--indigo); font-size: 1.02rem; display: block; margin-bottom: 6px;">💼 對投資人與補助評委說：</strong>
                        <p>「我們是線下實體娛樂的 NVIDIA Omniverse + Roblox。透過雲端 AI 沙盒模擬解決創作瓶頸，並以 R1 實體機器人打通 Sim-to-Real 的唯一線下執行終端！」</p>
                    </div>
                    <div class="card">
                        <strong style="color: var(--emerald); font-size: 1.02rem; display: block; margin-bottom: 6px;">🏪 對桌遊店老闆說：</strong>
                        <p>「這台機器能幫你自動教新手開局、平日自動辦天梯賽吸引人流，還能每週產出營運排班報表，一台只要每個月幾百塊，幫你省下大筆請人成本！」</p>
                    </div>
                </div>

                <h3 style="margin-top: 28px;">明天馬上要做的 10 件事</h3>
                <ol class="step-list">
                    <li class="step-item"><div class="step-num">1</div><div class="step-body"><strong>收斂第一版支援清單</strong>：鎖定《卡卡頌》、《阿瓦隆》、《德國心臟病》3 款遊戲。</div></li>
                    <li class="step-item"><div class="step-num">2</div><div class="step-body"><strong>撰寫 3 款遊戲標準規則包</strong>：整理開局步驟、語音引導詞與高頻爭議答辯庫。</div></li>
                    <li class="step-item"><div class="step-num">3</div><div class="step-body"><strong>實裝一鍵天梯辦賽功能</strong>：完成手機掃碼分桌抽籤與天梯積分後台。</div></li>
                    <li class="step-item"><div class="step-num">4</div><div class="step-body"><strong>調校現場降噪與記憶體推論</strong>：確保環境吵雜下依然能精準喚醒，且 0 影像存檔。</div></li>
                    <li class="step-item"><div class="step-num">5</div><div class="step-body"><strong>製作一頁式店長週報模板</strong>：將開桌數、自主教學率、省時數據做成自動報表。</div></li>
                    <li class="step-item"><div class="step-num">6</div><div class="step-body"><strong>製作實機展示外殼</strong>：採用極簡耐磨材質，固定頂置鏡頭與醒目呼叫按鈕。</div></li>
                    <li class="step-item"><div class="step-num">7</div><div class="step-body"><strong>接洽 3 家先鋒桌遊門市</strong>：簽訂 4 週測試合作協議，承諾不錄影並約定付費驗收條件。</div></li>
                    <li class="step-item"><div class="step-num">8</div><div class="step-body"><strong>準備劇本殺與密室 Demo 架構</strong>：預備 1 款短劇本殺搜證與 1 間密室提示展示包。</div></li>
                    <li class="step-item"><div class="step-num">9</div><div class="step-body"><strong>設定驗收硬指標</strong>：教學省時 30%、自主搞定 70%、至少 3 家願意簽約付費。</div></li>
                    <li class="step-item"><div class="step-num">10</div><div class="step-body"><strong>測試完成立即啟動商業報價</strong>：以真實訂金或合約作為驗收標準，快速複製擴張！</div></li>
                </ol>

                <div class="callout success" style="margin-top: 24px;">
                    <div class="callout-title">🌟 最終決策方針</div>
                    <p style="font-size: 1.02rem; line-height: 1.75;">
                        <strong>我們不需要證明 R1 什麼都能做，只要在實體桌面上證明它比客人看手機更順暢、能幫店家辦天梯比賽吸引人流、還能輸出店長決策數據，我們就能從桌遊店穩健邁向劇本殺、密室與 VR 的廣闊藍海！</strong>
                    </p>
                </div>
            </section>
`;

console.log('Replacing main content sections...');
const mainStart = html.indexOf('<!-- 01 核心結論 -->');
const footerStart = html.indexOf('<!-- 頁尾宣告 -->');

if (mainStart !== -1 && footerStart !== -1) {
    html = html.substring(0, mainStart) + newBodySections + '\n            ' + html.substring(footerStart);
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('✅ Successfully updated and reordered R1 Strategy Guide into 19 sequentially organized chapters across 5 distinct modules!');
} else {
    console.error('Could not find markers:', { mainStart, footerStart });
}
