# 樹莓派語音互動系統 (KWS / STT / LLM / TTS) 開發歷程與技術總結

本文件記錄了在 **Raspberry Pi 4 (1GB RAM)** 邊緣硬體環境下，建構「阿萬語音助理」從**離線喚醒 (KWS)**、**動態語音辨識 (STT)**、**大語言模型思考 (LLM)** 到 **語音合成 (TTS)** 過程中遇到的核心困境與最終解決方案。

---

## 📌 一、 核心架構目標

1. **邊緣低延遲喚醒**：在樹莓派 1GB RAM 資源受限環境下，使用極輕量離線引擎常駐監聽關鍵字「嘿 阿萬」。
2. **動態智慧收音 (VAD)**：告別固定秒數錄音，實現開口自動錄、說完自動停（靜音超時截止）。
3. **雲端高精準度辨識與對話**：對接 Google Gemini 3.0+ Flash 系列模型，完成多模態語音轉文字與語音助理角色扮演。
4. **高容錯降級保護**：避免網路或音訊裝置異常時產生無窮報錯或誤觸動硬體（如相機/舵機）。

---

## 🚨 二、 開發過程中遇到的 5 大核心困境

### 1. 本地離線模型缺失與雲端虛擬端點斷線
* **現象**：
  * 原程式碼嘗試呼叫預設虛擬端點 `http://your-cloud-ai-server.com/api/v1/stt/transcribe`，拋出 `[Errno -2] Name or service not known`。
  * 降級嘗試本地離線 `sherpa-onnx` Paraformer STT 時，發現樹莓派端僅安裝了 KWS 模型，**缺少 STT 模型檔案**（`model.int8.onnx`、`silero_vad.onnx`），導致辨識報錯。
  * STT 失敗時，系統誤將 `（雲端 STT 連線中斷）` 當成使用者自訂指令，引發瘋狂播放音效並誤開啟相機辨識。

### 2. ALSA 硬體獨占衝突 (`Device or resource busy`)
* **現象**：
  * Linux ALSA 的 `plughw:1,0` 為硬體獨佔模式。
  * 喚醒成功後啟動前台錄音，背景的 KWS 進程若未即時徹底釋放裝置，或錄音結束後 KWS 搶著重啟，會導致聲卡被鎖死，拋出 `Unable to open: plughw:1,0. Device or resource busy` 並產生 Exit Code 255 的無窮死循環。

### 3. 固定秒數錄音導致體驗不佳與語音截斷
* **現象**：
  * 早期採用 `arecord -d 3.5` 固定錄製 3.5 秒。使用者講話短時需被迫等待；講話稍長或思考停頓時語音後半段直接被截斷。
  * 喚醒問候音長達 2.5 秒，造成喚醒與開口說話之間的時間差嚴重脫節。

### 4. 背景 Thread 與 Asyncio Event Loop 衝突
* **現象**：
  * KWS 離線喚醒是在獨立背景執行緒中運行，當觸發 `on_wake_callback` 時直接呼叫 `asyncio.run()`，導致與 FastAPI/Uvicorn 主執行緒的 Event Loop 發生衝突，丟出 `asyncio is not defined` 或參數不匹配等異常。

### 5. Gemini API 版本演進與 403 / 404 報錯
* **現象**：
  * 舊版模型名稱（如 1.5 系列）在部分新端點中引發 `404 Not Found`。
  * 舊的預設金鑰配額被封鎖，拋出 `403 Forbidden: Your project has been denied access`。

---

## 💡 三、 最終架構與技術解決方案

| 核心維度 | 解決方案與實作細節 | 關鍵檔案 |
| :--- | :--- | :--- |
| **STT 架構選型** | **放棄本地笨重模型，改採 Gemini 多模態 Base64 直傳**<br>直接將錄音音訊轉換為 Base64 透過 REST API 送給 Gemini 3.0+ 模型辨識，大幅節省 Pi4 記憶體開銷與維護成本。 | [`modules/cloud_ai_client.py`](file:///d:/Desktop/Company%20Project/pi4_1g/modules/cloud_ai_client.py) |
| **ALSA 衝突修復** | **1. 強制釋放與冷卻等待（0.3s）**：確保切換前裝置控制權完全釋放。<br>**2. 裝置自動備援**：支援自動輪詢 `default` 與 `dsnoop:1,0`（共享混音模式），避免死鎖。 | [`modules/wake_word_module.py`](file:///d:/Desktop/Company%20Project/pi4_1g/modules/wake_word_module.py) |
| **動態 VAD 收音** | **實作動態能量感測錄音（`record_with_vad`）**：<br>• 使用 `pyaudio` + `audioop.rms` 即時監測說話能量（閾值 350）。<br>• 偵測到說話開始寫入，靜音超過 1.5 秒自動截止（上限 12 秒）。<br>• 換用極短提示音 `Call.mp3`（0.3s），隨點隨錄。 | [`modules/audio_module.py`](file:///d:/Desktop/Company%20Project/pi4_1g/modules/audio_module.py)<br>[`main.py`](file:///d:/Desktop/Company%20Project/pi4_1g/main.py) |
| **執行緒與事件安全** | **專屬 Event Loop 隔離**：<br>在喚醒回調中透過 `asyncio.new_event_loop()` 建立獨立 loop 執行非同步對話流程，徹底解決與 Uvicorn 的事件衝突。 | [`main.py`](file:///d:/Desktop/Company%20Project/pi4_1g/main.py) |
| **金鑰與模型管理** | **1. 支援最新 Gemini 3.0+ 模型清單**（`gemini-3.7-flash`, `gemini-3.5-flash-lite`）。<br>**2. 建立 `.env` 檔案管理**，透過 `python-dotenv` 模組安全載入獨立金鑰。 | [`.env`](file:///d:/Desktop/Company%20Project/pi4_1g/.env)<br>[`.gitignore`](file:///d:/Desktop/Company%20Project/pi4_1g/.gitignore) |

---

## 🔄 四、 最終穩定運作流程圖

```mermaid
flowchart TD
    A[使用者口述: 嘿 阿萬] --> B[本地離線 KWS 喚醒]
    B --> C[暫停 KWS 並釋放 ALSA 聲卡 0.3s]
    C --> D[播放短促提示音 Call.mp3]
    D --> E[VAD 動態能量錄音]
    E -- 說完靜音 1.5s / 最長 12s -- --> F[音訊 Base64 編碼]
    F --> G[Gemini 3.0+ 語音轉文字 STT]
    G --> H[Gemini 3.0+ 阿萬大腦思考 LLM]
    H --> I[TTS 雲端語音合成與本地快取]
    I --> J[喇叭播放阿萬語音回答]
    J --> K[無縫恢復常駐 KWS 離線監聽]
```

---

## 🛠️ 五、 維護與部署指令指引

### 1. 核心檔案同步至樹莓派
```powershell
scp "main.py" rf@<Pi_IP>:~/RF_project/pi4_1g/
scp "modules/audio_module.py" rf@<Pi_IP>:~/RF_project/pi4_1g/modules/
scp "modules/cloud_ai_client.py" rf@<Pi_IP>:~/RF_project/pi4_1g/modules/
scp "modules/wake_word_module.py" rf@<Pi_IP>:~/RF_project/pi4_1g/modules/
scp ".env" rf@<Pi_IP>:~/RF_project/pi4_1g/
```

### 2. 樹莓派端依賴安裝與啟動
```bash
# 確保系統庫與 Python 套件完整
sudo apt-get update && sudo apt-get install -y portaudio19-dev
cd ~/RF_project/pi4_1g
./venv/bin/pip install pyaudio python-dotenv

# 啟動邊緣控制系統服務
./venv/bin/python main.py
```
