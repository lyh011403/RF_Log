# 離線 KWS 喚醒詞 (「阿萬」) 與 ALSA 音訊驅動：AI 指令範本、黃金代碼與避坑指南

本文件包含 Raspberry Pi 4 (Pi4) 上 **Sherpa-onnx Zipformer 離線喚醒詞引擎 (「阿萬」)、ALSA 聲卡軟體混音器 (dmix/dsnoop)、麥克風音量增益與迴音防自激機制** 的完整技術細節與黃金標準參考代碼 (Golden Reference Code)。可以直接複製給任何 AI (如 ChatGPT, Claude, Cursor, Antigravity 等) 作為 Prompt 範本。

---

## 一、 給 AI 下達的超級 Prompt 範本（帶黃金參考代碼，直接複製）

> 使用方式：將以下框內的文字完全複製並貼給 AI 作為 Prompt。框內包含音訊獨佔與聲學迴音防踩坑規則與完整黃金範例代碼。

```markdown
你是一位專精於 Raspberry Pi (Pi4) 離線語音喚醒 (KWS)、PyAudio 與 ALSA 音訊驅動的高級嵌入式工程師。

請協助我開發一個「Pi4 離線 KWS 喚醒詞監聽與 ALSA 音訊防死鎖模組 (WakeWordModule)」。在撰寫程式碼時，你必須嚴格遵守以下防踩坑規範，並參考下方提供的【黃金標準參考代碼框架】進行實作：

### 1. ALSA 聲卡進程獨佔避坑 (Device or resource busy)
- **必須配置 /etc/asound.conf 軟體混音器**：Linux ALSA 預設會被第一個開啟聲卡的進程獨佔。必須配置 dmix (喇叭輸出混音) 與 dsnoop (麥克風輸入混音)，允許多進程/線程同時共享麥克風與喇叭。

### 2. 聲學迴音防自激機制 (防止「自言自語」自激迴圈)
- **TTS 播報期間鎖定/掛起 KWS 監聽**：當系統播報 TTS 語音或播放 BGM 時，必須呼叫 pause_kws() 暫停喚醒詞監聽，待 TTS 播放完畢並延遲 300ms 後再呼叫 resume_kws()，徹底防止喇叭發出的「阿萬」觸發自我喚醒。

### 3. USB 麥克風音量增益與診斷
- **自動化音量增益**：使用 amixer 命令行自動將 USB 麥克風的 Capture 音量設定至 90%，並設置動態降噪門檻，確保遠距離語音喚醒率 > 95%。

---

### 黃金標準參考代碼框架 (Golden Reference Implementation)

請嚴格參考並採用以下架構編寫核心 WakeWordModule 類別：

```python
import os, time, threading
from pathlib import Path
from loguru import logger

class WakeWordModule:
    def __init__(self, model_dir: str, keywords_file: str):
        self.model_dir = Path(model_dir)
        self.keywords_file = Path(keywords_file)
        self._is_paused = False
        self._is_running = False
        self._lock = threading.Lock()

    def pause_kws(self):
        """TTS 播報前掛起喚醒監聽，防止迴音觸發"""
        with self._lock:
            self._is_paused = True
            logger.info("[KWS] ⏸️ 系統播報中，KWS 喚醒詞監聽已暫停")

    def resume_kws(self, delay_sec: float = 0.3):
        """TTS 播報結束後延遲恢復喚醒監聽"""
        def _resume():
            time.sleep(delay_sec)
            with self._lock:
                self._is_paused = False
                logger.info("[KWS] ▶️ 播報結束，KWS 喚醒詞監聽已恢復")
        threading.Thread(target=_resume, daemon=True).start()

    def set_mic_gain(self, card_index: int = 1, volume_percent: int = 90):
        """使用 amixer 設定 USB 麥克風音量增益"""
        try:
            os.system(f"amixer -c {card_index} sset 'Mic' {volume_percent}% > /dev/null 2>&1")
            os.system(f"amixer -c {card_index} sset 'Capture' {volume_percent}% > /dev/null 2>&1")
            logger.info(f"[KWS] 🎤 麥克風 Capture 增益已自動設定至 {volume_percent}%")
        except Exception as e:
            logger.warning(f"[KWS] 設定麥克風增益失敗: {e}")
```
```

---

## 二、 實戰故障排除手冊 (Troubleshooting Guide)

| 故障現象 | 根本原因 | 快速排查與標準修復方式 |
|---|---|---|
| **1. 提示 Device or resource busy** | ALSA 聲卡被另一個語音進程獨佔。 | 配置 `/etc/asound.conf` 使用 `dmix` 與 `dsnoop` 軟體混音。 |
| **2. 系統播報語音時自己喚醒自己** | 喇叭出來的 TTS 聲音被麥克風收走。 | TTS 播報前呼叫 `pause_kws()`，播報完延遲 300ms 呼叫 `resume_kws()`。 |
| **3. 喚醒成功率極低，需對著喊** | USB 麥克風 ALSA Capture 預設音量僅 30%。 | 執行 `amixer` 自動設定麥克風 Capture 音量至 90%。 |

---

## 三、 未來開發防踩坑預警 (Future Avoidance Checklist)

1. **⚠️ 配置 `/etc/asound.conf` 多進程混音模板**：
   * *防範機制*：在樹莓派環境安裝腳本中加入以下混音配置，確保 PyAudio / Sherpa / aplay 不衝突：
     ```text
     pcm.!default { type asym playback.pcm "dmixer" capture.pcm "dsnooper" }
     ```
