# Mono / Lieflat 设计系统规格

> 长期复用基准。整个网站的所有页面、图表、卡片、组件默认遵循本规格，除非明确说明要换风格。
> 核心：颜色不是装饰，是**灰阶渐层**；渐变不是特效，是**层级和质感**的唯一表达方式。

---

## 1. 色彩语法

**唯一强调通道 = 明度（灰阶插值），禁止使用彩色做数据编码或装饰。**

```css
:root{
  --paper:      #ECEAE3;  /* 极亮基准 · 页面底色 */
  --paper-2:    #F4F3EE;  /* 卡片亮面 */
  --paper-3:    #E2E0D8;  /* 卡片暗面 / 分区底色 */
  --ink:        #16161A;  /* 极暗基准 · 深色卡/强调 */
  --ink-soft:   #26262A;  /* 深色卡渐层次层 */
  --gray-1:     #45454A;
  --gray-2:     #6B6B6E;
  --gray-3:     #94938E;
  --gray-4:     #BCB9AF;
  --gray-5:     #D6D3C8;
  --line:       #CFCCC2;  /* 分隔线 / 边框 */
}
```

取色函数：数值 `t ∈ [0,1]` 通过非线性插值（`t^0.85`）映射到 paper→ink，保证中间值仍可读，不会一半以上数据都挤在死黑或死白：

```js
function lerpColor(t){
  const c0 = [236,234,227], c1 = [22,22,26];
  const k = Math.pow(t, 0.85);
  const r = Math.round(c0[0] + (c1[0]-c0[0]) * k);
  const g = Math.round(c0[1] + (c1[1]-c0[1]) * k);
  const b = Math.round(c0[2] + (c1[2]-c0[2]) * k);
  return `rgb(${r},${g},${b})`;
}
```

---

## 2. 全站渐变应用规则（重点）

渐变分三种场景，**不能混用**，每种有固定写法：

### 2.1 页面 / 大区块背景渐变
营造纸张的自然光感，极淡、无色相偏移：

```css
body{
  background:
    radial-gradient(1200px 800px at 15% -10%, rgba(255,255,255,.5), transparent 60%),
    linear-gradient(180deg, var(--paper-2), var(--paper) 40%, var(--paper-3));
}
```

### 2.2 卡片背面渐变
所有卡片统一用 165° 线性渐变模拟纸张厚度，深色卡与浅色卡用同一角度、只换起止色：

```css
/* 浅色卡 */
.card{
  background: linear-gradient(165deg, var(--paper-2), var(--paper) 80%);
}
/* 深色卡 */
.card.dark{
  background: linear-gradient(165deg, var(--ink-soft), var(--ink) 75%);
}
```

再叠一层高光（伪元素），模拟顶光源，所有卡片必须有这一层，深浅卡都一样：

```css
.card::after{
  content:"";
  position:absolute; inset:0; pointer-events:none;
  background: radial-gradient(600px 300px at 90% -20%, rgba(255,255,255,.6), transparent 60%);
}
.card.dark::after{
  background: radial-gradient(600px 300px at 90% -20%, rgba(255,255,255,.08), transparent 60%);
}
```

### 2.3 数据点 / 节点渐变（径向高光）
圆点、气泡、力图节点**禁止纯色平涂**，统一用径向渐变模拟球面反光，参数固定：

```css
/* 光源在左上 35%/30%，主色在 55%，边缘色在 100% */
background: radial-gradient(circle at 35% 30%,
  rgba(255,255,255,.9) 0%,
  var(--主色) 55%,
  var(--边缘色，比主色深一档) 100%);
```

SVG 版本（用于图表 circle/圆点矩阵/力图节点）：

```js
const grad = svgEl('radialGradient', { cx:'35%', cy:'30%', r:'75%' });
grad.appendChild(svgEl('stop', { offset:'0%',  'stop-color':'#fff', 'stop-opacity':.55 }));
grad.appendChild(svgEl('stop', { offset:'55%', 'stop-color': lerpColor(t) }));
grad.appendChild(svgEl('stop', { offset:'100%','stop-color': lerpColor(Math.min(1, t+0.25)) }));
```

### 2.4 柱状 / 色块渐变（数值映射，非装饰）
柱子、进度条、色块的颜色深浅**必须由数值算出**，不是随手挑好看的灰：

```js
rect.setAttribute('fill', lerpColor(value / maxValue));
```

数值越大越接近炭黑，越小越接近纸灰——这是这套系统里唯一允许"看图猜数据"的地方。

---

## 3. 数据编码原则

- 位置、长度、密度、结构 → 传递数值本身
- 颜色 / 明度渐变 → 只做层级、质感与呼吸感，**绝不重复编码数值**（例外：2.4 条的柱状渐变，明度本身就是编码）
- 不用装饰性噪声伪造密度；真实数据单位即视觉原子，一个点/一根线/一格就对应一条真实记录

---

## 4. 排版与叙事

- 标题必须是**陈述结论句**（例："Fifty markets, one wave"、"Where we gained, where we bled"），不是字段名或功能名
- 每张卡 / 每个区块只承担**一个**独立结论，不把所有字段塞进一张图
- 卡片下方固定一行元信息：小号 mono、大写、`·` 分隔
  - 格式：`<图型名> · <风格代号> · <数据域>`
  - 例：`STAGGER DELAY · MONO-FANCY2 · GROWTH`
- 字体分工：标题用带字重的 grotesque 体（如 Space Grotesk / Inter 700），正文用 Inter 常规体，元信息 / 数值标签用 mono（JetBrains Mono）

---

## 5. 动效系统

统一 easing，全站只用这一条曲线，不引入其他缓动：

```css
--ease-smooth: cubic-bezier(.16, 1, .3, 1);
```

三档时长，严格对应场景，不能随意取值：

| 时长 | 场景 |
|---|---|
| 320ms | 轻反馈（hover、点击态、tab 切换） |
| 650ms | 图形入场（柱高生长、条宽拉出、卡片浮现） |
| 900ms | 大幅重排（散点 morph、力图节点归位、跨状态切换） |

固定模式：

- **级联入场**：多元素时按 index 做 stagger，间隔 ~18ms，营造"一波成型"的节奏
- **Morph 过渡**：同一批元素在两套坐标间直接改 `cx/cy/r`，靠 CSS transition 出平滑动画，不用帧动画库
- **拖拽回弹**：拖拽中关闭 transition（`transition: none`），松手后重新加上 transition 再归位，产生弹性感
- **色彩过渡**：颜色变化统一用最短档 320ms、linear，不套 ease（避免颜色变化看起来"卡顿"）

---

## 6. 两种阅读速度（Glance / Lupi）

- **Glance**：静态截图 / 首屏加载完成后即可读懂结论，不依赖任何交互——所有动画的"结束状态"必须是完整可读的，初始空白帧不能超过一瞬间
- **Lupi**：支持点击重放、拖拽、morph 等交互，用于探索细节
- 两者必须共用同一套色彩 / 字体 / 动效语法，不能拆成两个视觉系统——深色卡和浅色卡、静态图和交互图，看起来必须像同一个人做的

---

## 7. 落地检查清单

- [ ] 是否只用了灰阶渐层，没有引入彩色编码？
- [ ] 页面背景、卡片背面、数据节点、数值色块，四种渐变场景是否分别按 2.1–2.4 的固定写法实现？
- [ ] 标题是否是陈述句结论，不是字段名？
- [ ] 是否有 mono 大写元信息行，用 `·` 分隔？
- [ ] 动效是否只用一条 easing 曲线、且时长落在 320 / 650 / 900ms 三档之一？
- [ ] 卡片 / 节点是否都有渐层高光，没有任何纯色平涂的圆点或卡片背景？
- [ ] 静态截图能否独立表达结论（Glance 测试）？
