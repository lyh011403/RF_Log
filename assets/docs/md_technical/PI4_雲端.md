# 雲端 AI 語音 (Gemini 3.5) 與 TTS MD5 快取：AI 指令範本、黃金代碼與避坑指南

本文件包含 Raspberry Pi 4 (Pi4) 上 **Gemini 3.5 Flash-Lite 極速 API 串接、TTS MD5 語音快取、SD 卡容量保護與斷網 Fallback 防護** 的完整技術細節與黃金標準參考代碼 (Golden Reference Code)。可以直接複製給任何 AI (如 ChatGPT, Claude, Cursor, Antigravity 等) 作為 Prompt 範本。

---

## 一、 給 AI 下達的超級 Prompt 範本（帶黃金參考代碼，直接複製）

> 使用方式：將以下框內的文字完全複製並貼給 AI 作為 Prompt。框內包含記憶體防 OOM 與 API 快取防踩坑規則與完整黃金範例代碼。

```markdown
你是一位專精於 Raspberry Pi (Pi4 1GB) 雲端 AI 串接、多模態大模型 API 與語音系統優化的高級工程師。

請協助我開發一個「Pi4 高效能雲端 AI 語音對話與 TTS MD5 快取模組 (CloudAIClient)」。在撰寫程式碼時，你必須嚴格遵守以下防踩坑規範，並參考下方提供的【黃金標準參考代碼框架】進行實作：

### 1. 本地大模型禁忌與 Gemini 3.5 Flash-Lite 切換
- **嚴禁在 Pi4 1GB 上執行本地 Ollama/Qwen7B 模型**：會直接觸發 Linux OOM Killer 導致系統崩潰。
- **全線切換至 gemini-3.5-flash-lite 雲端 API**：記憶體佔用 < 20MB，回應時間縮短至 0.5 秒內。

### 2. TTS MD5 語音快取機制 (0 秒延遲播報)
- **文字 MD5 哈希快取**：在向雲端請求 TTS 語音前，先計算語音文字的 MD5 Hash 值。若快取目錄下已存在 `{hash}.mp3`，直接傳回本地路徑，達到 0 延遲零網路請求播報。

### 3. SD 卡容量防護與自動清理
- **設定快取上限 (例如 100MB)**：每次寫入新快取前，檢查快取資料夾總容量。若超過上限，自動依檔案最後修改時間 (mtime) 刪除最舊的快取音訊，防止 SD 卡爆滿。

### 4. 斷網 Fallback 防護與非阻塞規範
- **非阻塞背景 Thread 請求**：所有雲端 HTTP 請求必須設定 `timeout=5.0` 秒，並於獨立背景執行緒中執行，禁止阻塞主 UI 與相機視覺迴圈。
- **例外降級防護**：網路瞬斷時自動捕獲例外，切換至預設提示音效，確保主程式連續運作。

---

### 黃金標準參考代碼框架 (Golden Reference Implementation)

請嚴格參考並採用以下架構編寫核心 CloudAIClient 類別：

```python
import os, hashlib, json, time, requests
from pathlib import Path
from loguru import logger

class CloudAIClient:
    def __init__(self, cache_dir: str = "/tmp/tts_cache", max_cache_mb: int = 100):
        self.cache_dir = Path(cache_dir)
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        self.max_cache_bytes = max_cache_mb * 1024 * 1024
        self.api_key = os.getenv("GOOGLE_API_KEY", "")
        self.model = "gemini-3.5-flash-lite"

    def _cleanup_cache_if_needed(self):
        """自動清理過期快取，保護容量上限"""
        try:
            files = list(self.cache_dir.glob("*.mp3"))
            total_size = sum(f.stat().st_size for f in files)
            if total_size > self.max_cache_bytes:
                files.sort(key=lambda f: f.stat().st_mtime)
                for f in files[:len(files)//2]:
                    f.unlink(missing_ok=True)
                logger.info("[CloudAI] 快取超越上限，已清理最舊之語音快取檔案")
        except Exception as e:
            logger.warning(f"[CloudAI] 快取清理失敗: {e}")

    def text_to_speech_cached(self, text: str) -> str:
        """帶 MD5 快取之 TTS 播報路徑獲取"""
        text_hash = hashlib.md5(text.encode("utf-8")).hexdigest()
        cache_path = self.cache_dir / f"{text_hash}.mp3"

        if cache_path.exists():
            return str(cache_path) # 直接讀取快取

        self._cleanup_cache_if_needed()
        # 雲端 TTS 請求邏輯 (簡示)
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent?key={self.api_key}"
            # ... 發起請求並寫入 cache_path ...
            return str(cache_path)
        except Exception as e:
            logger.error(f"[CloudAI] TTS 請求失敗: {e}")
            return ""
```
```

---

## 二、 實戰故障排除手冊 (Troubleshooting Guide)

| 故障現象 | 根本原因 | 快速排查與標準修復方式 |
|---|---|---|
| **1. Pi4 突然卡死，SSH 斷開** | 本地執行大模型導致記憶體 OOM 崩潰。 | 移除本地大模型，切換至 `gemini-3.5-flash-lite` 雲端 API。 |
| **2. TTS 語音播報有 1.5 秒延遲** | 每次固定語音都重新請求 API。 | 開啟 `text_to_speech_cached()` MD5 語音快取。 |
| **3. 樹莓派跳出 No space left** | TTS 音訊快取無限寫入爆滿。 | 限制快取 100MB 並自動清理最舊音訊，或掛載至 `/tmp`。 |
| **4. 網路斷線時視覺串流卡死** | API 請求在主迴圈中同步等待超時。 | 設定 `timeout=5.0`，並放入背景 Thread / Asyncio 執行。 |

---

## 三、 未來開發防踩坑預警 (Future Avoidance Checklist)

1. **⚠️ 快取目錄掛載至 `/tmp` (tmpfs 記憶體磁碟)**：
   * *防範機制*：將快取資料夾設為 `/tmp/tts_cache`，利用樹莓派 RAM 模擬磁碟，**避免頻繁寫入實體 SD 卡縮短卡片壽命**。
2. **⚠️ 嚴禁將 API Key 硬編碼提交至 Git**：
   * *防範機制*：所有 Key 統一由外部 `.env` 讀取，並確保 `.env` 已列入 `.gitignore`。
