# Raspberry Pi 4 手部辨識、手勢追蹤與 pigpio 舵機控制：全功能終極總整理指南

硬體電源規畫、pigpio DMA PWM 驅動、零微動切斷保護、CW/CCW 獨立阻力補償、雙門檻遲滯、One Euro Filter 視覺防抖、MediaPipe 21點手勢判斷以及定點雙手 1~99 數字辨識的所有黃金代碼與硬體防踩坑指南。

---

## 🤖 一、 給 AI 下達的超級 Prompt 範本（帶全功能黃金參考代碼，直接複製）

> 💡 **使用方式**：將以下框內的文字完全複製並貼給 AI（如 ChatGPT、Claude、Cursor、Antigravity 等）作為 Prompt。框內包含完整硬體避坑規範與黃金範例代碼，能確保 AI 100% 寫出完全一致且無瑕疵的高品質程式碼。

```markdown
你是一位專精於 Raspberry Pi (Pi4)、電腦視覺 (OpenCV + MediaPipe Hands) 與嵌入式硬體控制 (pigpio) 的高級系統架構師。

請協助我開發一個「MediaPipe 手辨識追蹤與 pigpio 零抽搐舵機控制系統」。在撰寫程式碼時，你必須嚴格遵守以下防踩坑規範，並參考提供的【黃金標準參考代碼框架】進行實作：

### 1. 硬體 PWM 與零通電微震規範
- **嚴禁使用 RPi.GPIO 的軟體 PWM**：Linux 排程會產生 ±100μs 誤差導致馬達劇烈抽搐。
- **必須使用 pigpio 硬體 DMA PWM**：時脈誤差 < 1μs。靜止脈衝為 STOP_PW (1470μs)，控制脈衝範圍 1000μs ~ 2000μs。
- **支援 0μs 訊號切斷保護 (Pulse Cutoff)**：在 set_pw(pw) 中，傳入 0 或未開啟追蹤時執行 pi.set_servo_pulsewidth(pin, 0) 切斷方波，馬達 100% 放鬆，徹底消除高頻哼聲與發熱。

### 2. CW/CCW 獨立起步阻力與雙門檻遲滯
- **獨立起步脈衝門檻**：針對連續旋轉馬達兩側物理阻力不對稱，必須設定 CW 40μs 與 CCW 55μs 獨立啟動脈衝（MIN_MOVE_PW_CW=40, MIN_MOVE_PW_CCW=55），避免單邊卡死。
- **雙門檻死區遲滯 (Hysteresis Deadband)**：設定進入死區 ENTER=0.14 與離開死區 EXIT=0.18。當目標位於中心邊界時，防止馬達在「動與不動」之間劇烈顫抖急啟急煞。

### 3. 視覺推論、OneEuroFilter 防抖與模式切換
- **Lite 模型優化 (Pi4)**：設定 model_complexity=0、max_num_hands=2、static_image_mode=False。
- **手掌質心算術平均**：使用手腕(0) + 四指指根 MCP(5, 9, 13, 17) 共 5 個節點算術平均作為手掌質心 PALM_INDEXES。
- **One Euro Filter 動態低通濾波**：對質心 hand_x 套用 OneEuroFilter (min_cutoff=0.8, beta=0.4)，靜止防抖、甩手無延遲。
- **移動時單手對齊 vs 定點煞停雙手辨識**：
  - 馬達旋轉追蹤時：僅取主要手 (Hand 0) 計算質心與 offset 對齊。
  - 馬達煞停靜止時 (target_pw == STOP_PW)：開啟雙手 1~99 數字與 OK 手勢 (99) 辨識。雙手按 X 座標由左至右排序（左邊十位數、右邊個位數）。
- **單執行緒 PWM 直出**：禁止使用背景馬達執行緒（避免 GIL / Lock 爭奪導致微跳），將 PWM 輸出放於視覺迴圈 process_frame 尾端直出。

---

### 🏆【黃金標準參考代碼框架 (Golden Reference Implementation)】

```python
import time, math, threading
import numpy as np, cv2, mediapipe as mp, pigpio
from loguru import logger

# --- 硬體與演算法參數定義 ---
SERVO_PIN       = 18
STOP_PW         = 1470
MIN_MOVE_PW_CW  = 40
MIN_MOVE_PW_CCW = 55
MAX_MOVE_PW     = 120
TRACK_SIGN      = -1

CENTER_TOLERANCE_ENTER = 0.14
CENTER_TOLERANCE_EXIT  = 0.18
PALM_INDEXES           = [0, 5, 9, 13, 17]

# --- ServoModule 馬達驅動類別 ---
class ServoModule:
    def __init__(self, pin: int = SERVO_PIN, stop_pw: int = STOP_PW):
        self.pin = pin
        self.stop_pw = stop_pw
        self._lock = threading.Lock()
        self._last_pw = stop_pw
        self._is_motor_stopped = True

        self.pi = pigpio.pi()
        if not self.pi.connected:
            raise RuntimeError("pigpiod 未啟動，請執行: sudo systemctl start pigpiod")
        
        # 初始化切斷脈衝，馬達完全放鬆
        self.pi.set_servo_pulsewidth(self.pin, 0)
        self._last_pw = 0

    def set_pw(self, pw: int):
        with self._lock:
            if pw == 0:
                if self._last_pw != 0:
                    self.pi.set_servo_pulsewidth(self.pin, 0)
                    self._last_pw = 0
                return
            pw_clamped = max(1000, min(2000, pw))
            if abs(pw_clamped - self._last_pw) >= 2:
                self.pi.set_servo_pulsewidth(self.pin, pw_clamped)
                self._last_pw = pw_clamped

    def compute_target_pw(self, offset: float) -> int:
        abs_off = abs(offset)
        if self._is_motor_stopped:
            if abs_off <= CENTER_TOLERANCE_EXIT:
                return self.stop_pw
            self._is_motor_stopped = False
        else:
            if abs_off <= CENTER_TOLERANCE_ENTER:
                self._is_motor_stopped = True
                return self.stop_pw

        eff_offset = abs_off - CENTER_TOLERANCE_ENTER
        ratio = min(1.0, eff_offset / (0.5 - CENTER_TOLERANCE_ENTER))
        direction = TRACK_SIGN * (1 if offset > 0 else -1)
        min_pw = MIN_MOVE_PW_CW if direction > 0 else MIN_MOVE_PW_CCW
        add_pw = min_pw + ratio * (MAX_MOVE_PW - min_pw)
        return int(self.stop_pw + direction * add_pw)

    def cleanup(self):
        self.set_pw(0)
        self.pi.stop()

# --- OneEuroFilter 低通濾波器 ---
class OneEuroFilter:
    def __init__(self, freq=30.0, min_cutoff=0.8, beta=0.4, d_cutoff=1.0):
        self.freq, self.min_cutoff, self.beta, self.d_cutoff = freq, min_cutoff, beta, d_cutoff
        self._x_prev, self._dx_prev, self._t_prev = None, 0.0, None

    def filter(self, x, t):
        if self._t_prev is None:
            self._x_prev, self._dx_prev, self._t_prev = x, 0.0, t
            return x
        dt = max(t - self._t_prev, 1e-3)
        self._t_prev = t
        dx = (x - self._x_prev) / dt
        alpha_d = 1.0 - math.exp(-2 * math.pi * self.d_cutoff * dt)
        self._dx_prev = alpha_d * dx + (1 - alpha_d) * self._dx_prev
        cutoff = self.min_cutoff + self.beta * abs(self._dx_prev)
        alpha = 1.0 - math.exp(-2 * math.pi * cutoff * dt)
        self._x_prev = alpha * x + (1 - alpha) * self._x_prev
        return self._x_prev

    def reset(self):
        self._x_prev, self._dx_prev, self._t_prev = None, 0.0, None

# --- 手勢辨識 logic (單手 1~10/OK + 雙手 1~99) ---
def detect_single_hand_number(lm):
    pts = [(p.x, p.y) for p in lm.landmark]
    wrist = pts[0]
    def dist(p1, p2): return math.sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2)
    fingers = [False] * 5
    fingers[0] = (dist(pts[4], pts[17]) > dist(pts[3], pts[17])*1.05) and (dist(pts[4], pts[5]) > dist(pts[3], pts[5])*1.05)
    for i, (tip_i, pip_i) in enumerate([(8, 7), (12, 11), (16, 15), (20, 19)]):
        fingers[i + 1] = dist(pts[tip_i], wrist) > dist(pts[pip_i], wrist) * 1.02
    
    if dist(pts[4], pts[8]) < dist(pts[0], pts[9]) * 0.5 and fingers[2] and fingers[3] and fingers[4]:
        return 99, "OK 手勢 (99)"
    g_map = {
        (False, True, False, False, False): (1, "數字 1"),
        (False, True, True, False, False): (2, "數字 2"),
        (False, True, True, True, False): (3, "數字 3"),
        (False, True, True, True, True): (4, "數字 4"),
        (True, True, True, True, True): (5, "數字 5"),
        (True, False, False, False, False): (6, "數字 6"),
        (True, True, False, False, False): (7, "數字 7"),
        (True, True, True, False, False): (8, "數字 8"),
        (True, True, True, True, False): (9, "數字 9"),
        (False, False, False, False, False): (10, "數字 10 / 石頭"),
    }
    return g_map.get(tuple(fingers), (0, f"手勢 ({sum(fingers)}指)"))

def combine_multi_hand_gestures(multi_hand_landmarks):
    if not multi_hand_landmarks: return "None"
    detected_hands = []
    for lm in multi_hand_landmarks:
        hx = sum(lm.landmark[i].x for i in PALM_INDEXES) / len(PALM_INDEXES)
        num, label = detect_single_hand_number(lm)
        detected_hands.append({"x": hx, "num": num, "label": label})
    if any(h["num"] == 99 for h in detected_hands): return "OK 手勢 (99)"
    if len(detected_hands) == 1: return detected_hands[0]["label"]
    
    detected_hands.sort(key=lambda h: h["x"])
    tens = detected_hands[0]["num"] if detected_hands[0]["num"] <= 9 else 1
    ones = detected_hands[1]["num"] if detected_hands[1]["num"] <= 9 else 0
    return f"雙手數字: {tens * 10 + ones} (左{detected_hands[0]['num']}/右{detected_hands[1]['num']})"

# --- 主視覺與馬達控制迴圈 ---
servo = ServoModule()
hand_x_filter = OneEuroFilter(freq=30, min_cutoff=0.8, beta=0.4)
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=2, model_complexity=0, min_detection_confidence=0.5)

_smooth_pw = float(STOP_PW)

def process_frame(frame, tracking_enabled=True):
    global _smooth_pw
    now = time.time()
    frame = cv2.flip(frame, 1)
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb)

    target_pw = STOP_PW
    gesture_result = "None"

    if results.multi_hand_landmarks:
        # 取第 0 隻手做中心對齊追蹤
        lm0 = results.multi_hand_landmarks[0]
        hand_x_raw = sum(lm0.landmark[i].x for i in PALM_INDEXES) / 5.0
        hand_x = hand_x_filter.filter(hand_x_raw, now)
        offset = hand_x - 0.5
        
        if tracking_enabled:
            target_pw = servo.compute_target_pw(offset)

        # 煞停後才進行完整雙手數字手勢辨識
        if target_pw == STOP_PW:
            gesture_result = combine_multi_hand_gestures(results.multi_hand_landmarks)
        else:
            gesture_result = "鏡頭對齊移動中..."
    else:
        hand_x_filter.reset()
        target_pw = STOP_PW

    # PWM 直出控制
    if tracking_enabled:
        if target_pw != STOP_PW:
            _smooth_pw = 0.15 * float(target_pw) + 0.85 * _smooth_pw
            servo.set_pw(int(round(_smooth_pw)))
        else:
            _smooth_pw = float(STOP_PW)
            servo.set_pw(STOP_PW)
    else:
        _smooth_pw = float(STOP_PW)
        servo.set_pw(0) # 未開啟追蹤時 0us 切斷訊號

    return frame, gesture_result
```
```

---

## ⚡ 二、 硬體架構與防踩坑規範 (Pi4 Hardware Standards)

1. **獨立 5V/3A 變壓器供電（必須與樹莓派共地 GND）**：
   - 舵機馬達啟動瞬間峰值電流可達 2A。**嚴禁直接連接樹莓派 5V 引腳**供電，否則將導致樹莓派瞬間電壓下降重啟或燒毀板載電源 IC。
   - 馬達電源 Gnd 必須與樹莓派 Gnd 相連（共地），否則 PWM 訊號無法形成參考迴路。
2. **避開 GPIO 18 (PWM0) 與 3.5mm 音訊衝突**：
   - 樹莓派 3.5mm 音訊孔也是使用 PWM0/PWM1 時脈。若專案中需要播放聲音，PWM 控制腳位必須切換至 **GPIO 12** 或 **GPIO 13**，防止硬體 DMA 時脈搶佔衝突。
3. ** pigpio 服務啟動說明**：
   - 執行本程式前，必須在樹莓派系統啟動 pigpio daemon：`sudo systemctl start pigpiod`。

---

## 🖐️ 三、 MediaPipe 21 個手部關鍵點與手勢辨識邏輯

```text
       [12] 中指尖          [16] 無名指尖
        |                    |
       [11]                 [15]          [20] 小指尖
        |                    |             |
  [8] 食指尖 [10]           [14]          [19]
   |     |                   |             |
  [7]   [9]                 [13]          [18]
   |     |                   |             |
  [6]───[5] (食指根)────────[17] (小指根)───[17]
   |     │                    │
  [4] 拇指尖                  │
   │                          │
  [3]                        [0] 手腕 (Wrist)
```

### 基礎手勢伸直/彎曲判斷函式 (`get_finger_states`)
```python
def get_finger_states(landmarks, handedness="Right"):
    fingers = []
    # 拇指 X 軸判定
    if handedness == "Right":
        fingers.append(landmarks[4].x < landmarks[3].x)
    else:
        fingers.append(landmarks[4].x > landmarks[3].x)
    # 四指 Y 軸與 PIP 關節高度判定
    for tip, pip in zip([8, 12, 16, 20], [6, 10, 14, 18]):
        fingers.append(landmarks[tip].y < landmarks[pip].y)
    return fingers  # [Thumb, Index, Middle, Ring, Pinky]
```

---

## 🛠️ 四、 終極實戰故障排除手冊 (Troubleshooting Guide)

| 故障現象 | 根本原因 | 快速排查與標準修復方式 |
|---|---|---|
| **1. Pi4 上 MediaPipe 辨識 FPS 極低 (< 10 FPS)** | 使用了預設的 `model_complexity=1` 或 `2` 重型模型。 | 設定 `model_complexity=0` (Lite 模型)，相機擷取解析度設為 320x240。 |
| **2. 馬達持續劇烈抽搐與喀喀聲** | 使用了 `RPi.GPIO` 的軟體 PWM (受 CPU 負載排程影響產生 ±100μs 脈衝誤差)。 | 改用 `pigpio.pi().set_servo_pulsewidth()` 硬體 DMA 控制。 |
| **3. 馬達順時針旋轉正常，逆時針卡死推不動** | 連續旋轉馬達內部齒輪組左右物理摩擦阻力不對稱。 | 設定 CW/CCW 獨立起步脈衝門檻：`MIN_MOVE_PW_CW = 40`, `MIN_MOVE_PW_CCW = 55`。 |
| **4. 手停在鏡頭中央附近時，馬達急踩油門再急煞** | 死區 (Deadband) 只有單一硬性邊界 (如 ±15%)。 | 導入<b>雙門檻死區遲滯 (Hysteresis)</b>：進入死區 `ENTER = 0.14` / 離開死區 `EXIT = 0.18`。 |
| **5. 未啟用追蹤時馬達發出高頻哼聲與發燙** | 1470μs 與馬達實體零點有 ±1~2μs 微小偏差，馬達持續施力維持位移。 | 未啟用追蹤或傳入 0 時，呼叫 `set_pw(0)` <b>徹底切斷 0μs PWM 脈衝訊號</b>讓馬達完全放鬆。 |
| **6. LOG 顯示正常，但馬達每隔幾秒偶發微跳一下** | 背景 50Hz 馬達 Thread 與 OpenCV/Web API 爭奪 Python GIL 鎖與資源。 | 移除背景馬達 Thread，將 `set_pw()` 放在視覺 `process_frame()` <b>單執行緒尾端直出</b>。 |
| **7. 雙手數字辨識時十位數與個位數顛倒** | 未對多手 Landmark 進行畫面實體 X 座標排序。 | 將識別出的手部按 `landmark X` 座標由小到大 (左至右) 排序，最左邊為十位數，右邊為個位數。 |
