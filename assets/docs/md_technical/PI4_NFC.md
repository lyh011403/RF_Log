# NFC 身份感應與 ST7789 中文繪製螢幕：AI 指令範本、黃金代碼與避坑指南

本文件包含 Raspberry Pi 4 (Pi4) 上 **PN532 NFC 晶片感應非阻塞讀取、I2C 超時保護、ST7789 邊緣螢幕 PIL (Pillow) 動態 TrueType 中文字型渲染** 的完整技術細節與黃金標準參考代碼 (Golden Reference Code)。可以直接複製給任何 AI (如 ChatGPT, Claude, Cursor, Antigravity 等) 作為 Prompt 範本。

---

## 一、 給 AI 下達的超級 Prompt 範本（帶黃金參考代碼，直接複製）

> 使用方式：將以下框內的文字完全複製並貼給 AI 作為 Prompt。框內包含 I2C 鎖死與 SPI 中文字型繪製防踩坑規則與完整黃金範例代碼。

```markdown
你是一位專精於 Raspberry Pi (Pi4) 邊緣硬體介面 (I2C/SPI)、PN532 NFC 感應與 LCD 螢幕顯示驅動的高級嵌入式工程師。

請協助我開發一個「Pi4 PN532 NFC 讀卡與 ST7789 中文繪製顯示模組 (NFCDisplayModule)」。在撰寫程式碼時，你必須嚴格遵守以下防踩坑規範，並參考下方提供的【黃金標準參考代碼框架】進行實作：

### 1. PN532 I2C 匯流排非阻塞讀取與超時保護
- **嚴禁使用無限阻塞讀取 (read_passive_target)**：當玩家卡片長置於感應區時，PN532 會鎖死 I2C 匯流排，導致主程式卡死崩潰。
- **必須設定 timeout=0.1 秒超時保護**：每次讀取若未在 100ms 內響應，自動拋出或回傳 None，釋放 I2C 控制權。

### 2. ST7789 小螢幕 PIL 中文繪製驅動
- **禁止直接向 LCD 驅動發送原始 ASCII 中文字串**：邊緣 LCD 原生驅動缺字，會顯示為方塊 □□□ 或問號。
- **使用 PIL (Pillow) 動態 TrueType 圖片繪製**：引入 `.ttf` 中文字型檔，先在記憶體中繪製 240x240 RGB 圖片，再將 Complete Image 陣列傳送給 ST7789 驅動繪製，徹底解決中文字型缺字問題。

---

### 黃金標準參考代碼框架 (Golden Reference Implementation)

請嚴格參考並採用以下架構編寫核心 DisplayModule 類別：

```python
import os
from PIL import Image, ImageDraw, ImageFont
from loguru import logger

class DisplayModule:
    def __init__(self, font_path: str = "NotoSansTC-Regular.ttf", width: int = 240, height: int = 240):
        self.width = width
        self.height = height
        self.font_path = font_path

        # 載入 TrueType 中文字型
        try:
            self.font_title = ImageFont.truetype(font_path, 20)
            self.font_text  = ImageFont.truetype(font_path, 16)
        except Exception:
            self.font_title = ImageFont.load_default()
            self.font_text  = ImageFont.load_default()
            logger.warning("[Display] 未找到中文字型檔，退回預設字型")

    def render_player_ui(self, player_name: str, status_text: str) -> Image.Image:
        """在記憶體中繪製包含中文字型之 RGBA Bitmap"""
        img = Image.new("RGB", (self.width, self.height), color=(15, 23, 42)) # 暗藍色背景
        draw = ImageDraw.Draw(img)

        # 繪製 UI 框架與中文
        draw.rectangle([10, 10, self.width - 10, 50], outline=(59, 130, 246), width=2)
        draw.text((20, 20), f"玩家: {player_name}", font=self.font_title, fill=(255, 255, 255))
        draw.text((20, 70), f"狀態: {status_text}", font=self.font_text, fill=(6, 182, 212))

        return img # 直接傳送給 st7789.display(img)
```
```

---

## 二、 實戰故障排除手冊 (Troubleshooting Guide)

| 故障現象 | 根本原因 | 快速排查與標準修復方式 |
|---|---|---|
| **1. NFC 讀卡時主程式突然卡死** | PN532 底層 I2C 進行無限超時等待。 | 呼叫 `read_passive_target(timeout=0.1)` 設定非阻塞。 |
| **2. 螢幕顯示中文字顯示為 □□□** | 液晶螢幕原生驅動缺少中文字庫。 | 使用 PIL `ImageDraw` 搭配中文字型檔案 (.ttf) 先繪圖再輸出。 |
| **3. 螢幕畫面出現雜訊斜線或閃爍** | SPI 傳輸頻率設定過高 (超出杜邦線承載)。 | 將 SPI 頻率限制在 `24MHz` 以內。 |

---

## 三、 未來開發防踩坑預警 (Future Avoidance Checklist)

1. **⚠️ SPI 頻率穩定控制 (24MHz)**：
   * *防範機制*：樹莓派外接杜邦線訊號易受干擾，SPI 頻率設定超過 32MHz 易產生畫面線條雜訊，設定為 `24MHz` 能確保 100% 穩定輸出。
