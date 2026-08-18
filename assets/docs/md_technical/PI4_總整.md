# 🍓 Pi4 樹莓派全模組深度開發故障排除與未來防踩坑指南
> **Pi4 1GB System Ultra-Detailed Troubleshooting & Preventive Engineering Guide**

本文件旨在提供 **Raspberry Pi 4 (Pi4 1GB RAM / Broadcom BCM2711)** 嵌入式環境下，從**底層硬體驅動、電腦視覺、AI 語音推理到雲端 API 對接**的完整深度開發故障排除記錄與**未來開發避坑指南**。

可以直接作為團隊知識庫或 AI Prompt 的深度架構指南，確保後續擴充功能時能 100% 規避已知與潛在的坑點。

---

## 📘 目錄
1. [硬體限制與系統環境邊界說明](#1-硬體限制與系統環境邊界說明)
2. [⚙️ 項目一：伺服馬達與舵機控制 (servo_module.py)](#2-項目一伺服馬達與舵機控制-servo_modulepy)
3. [🖐️ 項目二：電腦視覺與手勢動態追蹤 (hand_tracking_module.py & one_euro_filter.py)](#3-項目二電腦視覺與手勢動態追蹤-hand_tracking_modulepy--one_euro_filterpy)
4. [☁️ 項目三：雲端 AI 語音與對話快取 (cloud_ai_client.py & assistant.py)](#4-項目三雲端-ai-語音與對話快取-cloud_ai_clientpy--assistantpy)
5. [🎙️ 項目四：離線 KWS 喚醒詞與音訊驅動 (wake_word_module.py & audio_module.py)](#5-項目四離線-kws-喚醒詞與音訊驅動-wake_word_modulepy--audio_modulepy)
6. [💳 項目五：NFC 身份感應與 ST7789 螢幕顯示 (nfc_module.py & display_module.py)](#6-項目五nfc-身份感應與-st7789-螢幕顯示-nfc_modulepy--display_modulepy)
7. [🛡️ 未來開發防踩坑黃金法則 (Preventative Engineering Checklist)](#7-未來開發防踩坑黃金法則-preventative-engineering-checklist)

---

## 1. 硬體限制與系統環境邊界說明

在 Raspberry Pi 4 (1GB) 上開發複雜的 AI + 視覺 + 語音 + 硬體控制系統時，必須嚴格注意以下硬體邊界：
* **CPU 與熱散熱**：BCM2711 4 核心 Cortex-A72，長時間高負載易觸發 80°C 降頻保護 (Thermal Throttling)。
* **RAM 記憶體瓶頸**：總 RAM 僅 1GB，可用 RAM 約 650MB，禁止在本地載入超過 300MB 的深度學習模型（如 Ollama / Qwen 等大語言模型必導致 OOM 崩潰）。
* **Linux 時脈誤差**：標準 Raspbian Linux 非即時作業系統 (Non-RT OS)，軟體計時器與 CPU 任務排程會有 10μs ~ 100μs 的抖動。

---

## 2. ⚙️ 項目一：伺服馬達與舵機控制 (servo_module.py)

### ❌ 已發生的困難現象與底層根因剖析

#### 痛點 1-1：使用軟體 PWM 時馬達劇烈抽搐與喀喀異音
* **現象重現**：使用 `RPi.GPIO.PWM` 驅動舵機時，馬達就算在靜止狀態也會不定期發生劇烈抽搐與喀喀異音。
* **底層根因**：Linux 是多工作業系統，`RPi.GPIO` 採用 CPU 軟體定時器發送 PWM 方波。當系統處理影像辨識或網路請求時，CPU 被搶占導致 PWM 方波脈寬產生 ±100μs 誤差，使馬達伺服電路誤判角度。
* **技術修復方案**：全面切換為 `pigpio` 庫，調用樹莓派底層 DMA (Direct Memory Access) 硬體 PWM，脈衝精度提升至 `< 1μs`。

#### 痛點 1-2：通電靜止時發出高頻哼聲與馬達燙手
* **現象重現**：舵機轉到目標位置後停止，但馬達持續發出嗡嗡高頻聲，且運作 10 分鐘後馬達外殼顯著發燙。
* **底層根因**：數位伺服馬達即便在角度對齊後，若持續收到 1470μs 控制脈衝，內部控制板仍會微幅修正，造成電流持續通過內部馬達線圈。
* **技術修復方案**：實作 `0μs` 脈衝訊號切斷機制 (`set_pw(0)`)。當馬達進入死區煞停或未開啟追蹤時，執行 `pi.set_servo_pulsewidth(pin, 0)` 切斷方波，徹底放鬆馬達。

#### 痛點 1-3：馬達順時針能轉、逆時針卡死（物理阻力不對稱）
* **現象重現**：相機向右追蹤順暢，但向左追蹤時馬達頻繁卡死，需大幅甩手才能帶動。
* **底層根因**：連續旋轉馬達內部齒輪組與偏心軸的物理摩擦阻力不對稱，固定相同的動態脈衝偏移無法同時滿足 CW 與 CCW 的最小啟動扭矩。
* **技術修復方案**：設計獨立啟動脈衝門檻：
  ```python
  MIN_MOVE_PW_CW  = 40  # 順時針起步最小脈衝 (us)
  MIN_MOVE_PW_CCW = 55  # 逆時針起步最小脈衝 (us)
  ```

#### 痛點 1-4：目標停在中心邊界時馬達急啟急煞顫抖
* **現象重現**：手停在鏡頭中心附近時，馬達在「動」與「不動」之間快速切換，導致影像畫面震盪。
* **底層根因**：單死區邊界臨界點沒有容差緩衝，視覺座標一晃動就頻繁觸發啟動。
* **技術修復方案**：引進雙門檻死區遲滯 (Hysteresis Deadband)：
  * `CENTER_TOLERANCE_ENTER = 0.14`（進入 ±14% 區域時煞停）
  * `CENTER_TOLERANCE_EXIT  = 0.18`（離開 ±18% 區域時才允許重新啟動）

---

### 🔮 未來開發防踩坑預警 (Future Avoidance Checklist)

1. **⚠️ 避免 pigpiod 服務未啟動引發系統死鎖**：
   * *防範機制*：在代碼初始化時必須先進行 `pi.connected` 檢查，若未連線需自動拋出明確錯誤指引，並在 `systemd` 服務中將 `pigpiod.service` 列為前置依賴 (`Requires=pigpiod.service`)。
2. **⚠️ 避免電源波谷引發樹莓派重啟 (Undervoltage)**：
   * *防範機制*：舵機瞬間啟動電流可高達 1.5A~2A，**絕對禁止直接使用樹莓派 5V 引腳供電**！必須使用獨立 5V/3A 變壓器供電，並與樹莓派共地 (GND)。
3. **⚠️ 避免 PWM 腳位與音訊 (ALSA / Jack) 硬體衝突**：
   * *防範機制*：樹莓派 GPIO 18 (PWM0) 與 3.5mm 音訊輸出共用時脈發生器。若使用 3.5mm 耳機孔，PWM 必須改用 GPIO 12 或 GPIO 13。

---

## 3. 🖐️ 項目二：電腦視覺與手勢動態追蹤 (hand_tracking_module.py & one_euro_filter.py)

### ❌ 已發生的困難現象與底層根因剖析

#### 痛點 2-1：MediaPipe 追蹤推論 FPS 低於 8 影格，鏡頭跟隨極度鈍重
* **現象重現**：開啟 MediaPipe Hands 辨識後，畫面嚴重lag，追蹤 delay 長達 1 秒以上。
* **底層根因**：使用了預設的 `model_complexity=1` 複雜模型，且相機輸入解析度高達 1080P，超出 Pi4 CPU 計算能力。
* **技術修復方案**：強制指定 `model_complexity=0`（Lite 模型），並在 OpenCV 中設定相機解析度為 `320x240`，推論速度提升至 25+ FPS。

#### 痛點 2-2：追蹤單一手腕點 (Node 0) 導致相機晃動
* **現象重現**：使用者手停在空中，但只要手腕稍微旋轉，相機就會猛烈轉動。
* **底層根因**：MediaPipe 節點 0 (Wrist) 容易受到手掌翻轉視角變化的物理位移影響。
* **技術修復方案**：採用 5 點算術平均手掌質心演算法：
  ```python
  # 取手腕(0)與四指指根 MCP (5, 9, 13, 17) 計算平均質心
  PALM_INDEXES = [0, 5, 9, 13, 17]
  hx = sum(lm.landmark[i].x for i in PALM_INDEXES) / len(PALM_INDEXES)
  ```

#### 痛點 2-3：視訊座標噪聲導致相機微幅震盪
* **現象重現**：手部完全靜止時，相機馬達仍會每隔幾秒微幅晃動一次。
* **底層根因**：相機感光元件噪聲導致辨識出來的座標小數點後三位隨機跳動。
* **技術修復方案**：導入一歐元低通濾波器 `OneEuroFilter` (`min_cutoff=0.8, beta=0.4`)，在低速時進行重度低通濾波消除抖動，高速揮手時自動調高截止頻率消除延遲。

---

### 🔮 未來開發防踩坑預警 (Future Avoidance Checklist)

1. **⚠️ 避免多手競爭對焦導致相機擺頭發瘋**：
   * *防範機制*：當畫面出現多隻手時，移動追蹤階段**必須固定鎖定第一隻檢測到的手 (Hand 0) 或面積最大的手掌**。只有在馬達完全煞停後，才允許開啟多手數字 (1~99) 組合辨識。
2. **⚠️ 避免逆光與背景雜亂導致手部丟失**：
   * *防範機制*：當手部追蹤連續丟失 5 影格時，必須自動進入「緩慢歸位」或「維持最後已知位置」，禁止座標瞬移回 0.5 (畫面中央)。

---

## 4. ☁️ 項目三：雲端 AI 語音與對話快取 (cloud_ai_client.py & assistant.py)

### ❌ 已發生的困難現象與底層根因剖析

#### 痛點 3-1：本地離線大模型 (Qwen2.5:7b) 導致 1GB 記憶體 OOM 崩潰
* **現象重現**：執行 Ollama 載入 Qwen 模型時，樹莓派瞬間卡死，SSH 斷開，最後被 Linux Kernel OOM Killer 強制殺死。
* **底層根因**：Qwen 7B 模型即使量化後仍需 3GB+ 記憶體，Pi4 1GB 實體記憶體完全無法承載。
* **技術修復方案**：架構重構，全面切換至極速雲端 API **`gemini-3.5-flash-lite`**，記憶體佔用降至 < 20MB，回應時間縮短至 0.5 秒。

#### 痛點 3-2：TTS 語音播報秒級延遲與重複流量浪費
* **現象重現**：系統每次播報固定語音（如「進入卡牌訓練模式」），都需要等待 1.5 秒網路請求時間。
* **底層根因**：沒有音訊快取機制，相同文字每次都重複向 Google TTS 發起 HTTP 請求。
* **技術修復方案**：實作 TTS MD5 檔案快取架構：
  ```python
  text_hash = hashlib.md5(text.encode('utf-8')).hexdigest()
  cache_file = os.path.join(CACHE_DIR, f"{text_hash}.mp3")
  if os.path.exists(cache_file):
      return cache_file # 直接讀取本地快取，0 秒延遲！
  ```

#### 痛點 3-3：無限語音快取導致 SD 卡空間爆滿
* **現象重現**：系統連續運行數天後，樹莓派提示 `No space left on device`，導致資料庫與日誌崩潰。
* **底層根因**：TTS 快取資料夾只寫不刪。
* **技術修復方案**：在 `cloud_ai_client.py` 中實作自動容量維護機制，限制快取總容量為 100MB，超過時自動按修改時間刪除最舊音訊。

---

### 🔮 未來開發防踩坑預警 (Future Avoidance Checklist)

1. **⚠️ 避免 API Key 硬編碼與曝光**：
   * *防範機制*：所有 API Key 必須從外部 `.env` 檔案載入，並將 `.env` 加入 `.gitignore`。
2. **⚠️ 避免 SD 卡頻繁小檔案寫入損壞快閃記憶體**：
   * *防範機制*：快取資料夾可掛載至 Linux 記憶體暫存區 `/tmp` (tmpfs)，防止頻繁讀寫縮短 SD 卡壽命。
3. **⚠️ 避免 API 逾時導致主 UI 畫面卡死**：
   * *防範機制*：所有 API 請求（Gemini API、TTS API）必須設定 `timeout=5.0` 秒超時，且必須在獨立背景 Thread/Asyncio 中執行，禁止阻塞視覺主迴圈。

---

## 5. 🎙️ 項目四：離線 KWS 喚醒詞與音訊驅動 (wake_word_module.py & audio_module.py)

### ❌ 已發生的困難現象與底層根因剖析

#### 痛點 4-1：缺乏離線喚醒能力，斷網時全系統失靈
* **現象重現**：在無網際網路環境下，使用者喊叫無法觸發系統。
* **底層根因**：原本依賴雲端 STT 進行語音監聽。
* **技術修復方案**：部署 Sherpa-onnx 輕量化離線 KWS 模型 (`install_kws.py`)，開發 `wake_word_module.py` 常駐監聽 **「阿萬」**。

#### 痛點 4-2：USB 麥克風收音音量極小、喚醒成功率低
* **現象重現**：使用者必須對著麥克風大聲喊叫才能觸發喚醒。
* **底層根因**：Linux ALSA 驅動預設將 USB 麥克風 Capture 增益設定為 30%。
* **技術修復方案**：撰寫 `diagnose_audio.py` 音訊診斷腳本，透過 `amixer` 自動設定軟體麥克風增益至 90%，並加入靈敏度動態門檻。

---

### 🔮 未來開發防踩坑預警 (Future Avoidance Checklist)

1. **⚠️ 避免 ALSA 聲卡被 PyAudio / Sherpa 獨佔卡死 (`Device or resource busy`)**：
   * *防範機制*：Linux 上多個進程同時開啟聲卡會引發獨佔衝突。必須配置 `/etc/asound.conf` 使用 `dmix` 與 `dsnoop` 軟體混音器，允許多進程共享麥克風與喇叭。
2. **⚠️ 避免 TTS 播報音效觸發自家麥克風自激喚醒（自言自語迴圈）**：
   * *防範機制*：當系統播放 TTS 語音時，**必須暫停離線 KWS 喚醒詞監聽**，待 TTS 播放結束後延遲 300ms 再重新啟動監聽。

---

## 6. 💳 項目五：NFC 身份感應與 ST7789 螢幕顯示 (nfc_module.py & display_module.py)

### ❌ 已發生的困難現象與底層根因剖析

#### 痛點 5-1：PN532 NFC 讀取時 I2C 匯流排鎖死卡死
* **現象重現**：當玩家卡片放在感應區太久，`nfc_module` 會阻塞整個主程式。
* **底層根因**：PN532 底層 I2C 驅動在未讀取到結束訊號時會進行無限等待。
* **技術修復方案**：改為非阻塞輪詢，設定 `timeout=0.1` 秒超時保護，若失敗自動釋放匯流排控制權。

#### 痛點 5-2：ST7789 SPI 小螢幕顯示中文缺字與亂碼
* **現象重現**：畫面繪製玩家姓名時顯示為方塊 `□□□` 或問號。
* **底層根因**：ST7789 驅動僅支援 ASCII 字元集。
* **技術修復方案**：使用 PIL (Pillow) 載入中文字庫 TrueType Font (`.ttf`)，先在記憶體中將文字繪製為 RGBA Bitmap 影像，再以 SPI 傳送至螢幕。

---

### 🔮 未來開發防踩坑預警 (Future Avoidance Checklist)

1. **⚠️ 避免 SPI / I2C 匯流排速度過高引發雜訊干擾**：
   * *防範機制*：樹莓派杜邦線過長時，SPI 頻率設定超過 32MHz 會產生嚴重影格畫線與雜訊，建議設定為 `24MHz` 最佳。

---

## 7. 🛡️ 未來開發防踩坑黃金法則 (Preventative Engineering Checklist)

在後續拓展 Pi4 系統功能時，請務必遵照以下 5 大黃金法則：

| 避坑法則 | 規範細節 | 違規風險 |
| :--- | :--- | :--- |
| **1. 硬體 PWM 獨佔** | 凡涉及伺服馬達控制，**嚴禁使用軟體 PWM**，統一使用 `pigpio` DMA 控制。 | 馬達劇烈抽搐、齒輪崩角損壞 |
| **2. 音訊廣播迴音屏蔽** | 系統發聲 (TTS/BGM) 時，**必須鎖定/掛起 KWS 喚醒詞監聽**。 | 喇叭聲音觸發自我喚醒陷入無限循環 |
| **3. 雲端 API 防禦** | 任何網路 API 呼叫必須設定 `timeout` 並於背景執行，搭配 **MD5 本地快取**。 | 網路瞬斷導致視訊流/遊戲邏輯卡死 |
| **4. 視訊畫質控制** | 影像推論解析度控制在 `320x240`，模型選擇 `Lite (Complexity=0)`。 | CPU 100% 爆滿、過熱降頻 |
| **5. 快取容量控管** | 音訊與影像 Log 快取區必須設定上限管理 (Max Capacity) 與自動清理。 | SD 卡空間爆滿、系統崩潰 |

---
*文件更新時間：2026 年 8 月 14 日*
