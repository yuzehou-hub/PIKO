# PIKO Design System — V1.0

> 本文件是可跨頁面使用的視覺與動態規格，不規定任何頁面的 section 順序。資料依使用者提供的兩張主視覺與六張罐頭包裝圖建立。圖片直接可見的事實標示 [Observed]；視覺比例推算標示 [Inferred]；為實作新增的參數標示 [Proposed]。

## 1. Overview & Archetype

- Archetype：實驗性編輯視覺 × 互動式品牌商品展示（Experimental Editorial / Interactive Brand Commerce）。[Inferred]
- 視覺指紋：高彩度海洋藍與橘色、黑白高反差、超現實海洋廢棄物拼貼、粗糙印刷顆粒、巨大斜體無襯線字與小型等寬字、海鮮罐頭／檢驗標籤語彙。[Observed]
- 罐頭包裝有銀色金屬表面、白色腰封、黑色英文排版、彩色拼貼圖像。[Observed]
- 主視覺顏色取樣為近似值；非原始 AI/PSD 色票。[Inferred]
- 所有互動動畫、網站斷點、字級與數值均屬工程建議，並非由靜態海報直接觀察。[Proposed]

## 2. Design System & Token Architecture

### 3-tier token mapping

| Tier | Token | Value / Mapping | Evidence |
|---|---|---|---|
| Primitive | `--brand-500` | `#1558D6` | [Inferred] |
| Primitive | `--brand-600` | `#1046AE` | [Proposed] |
| Primitive | `--orange-500` | `#F4772D` | [Inferred] |
| Primitive | `--neutral-950` | `#151515` | [Inferred] |
| Primitive | `--neutral-100` | `#F4F1E9` | [Proposed] |
| Primitive | `--space-1/2/3/4/6/8/12/16/24/3xl` | 4/8/12/16/24/32/48/64/96/128px | [Proposed] |
| Semantic | `--bg-canvas` | `var(--neutral-100)` | [Proposed] |
| Semantic | `--bg-surface` | `var(--neutral-0)` | [Proposed] |
| Semantic | `--bg-surface-hover` | `#ECE7DC` | [Proposed] |
| Semantic | `--text-primary` | `var(--neutral-950)` | [Proposed] |
| Semantic | `--text-secondary` | `#454545` | [Proposed] |
| Semantic | `--text-muted` | `#626262` | [Proposed] |
| Semantic | `--border-subtle` | `#C9C5BE` | [Proposed] |
| Semantic | `--border-strong` | `var(--neutral-950)` | [Proposed] |
| Semantic | `--accent-primary` | `var(--orange-500)` | [Proposed] |
| Component | `--nav-height` | 76px desktop / 64px mobile | [Proposed] |
| Component | `--btn-radius` | 0px | [Proposed] |
| Component | `--card-padding` | 24px | [Proposed] |
| Component | `--elevation-1/2/3` | 0 3px 0 / 0 10px 30px / 0 22px 60px | [Proposed] |

### Typography

英文字體優先，繁體中文字體備援。Display: `Arial, Helvetica, Noto Sans TC, Microsoft JhengHei, sans-serif`；Body/Monospace: `Courier New, Consolas, Noto Sans TC, Microsoft JhengHei, monospace`。[Proposed]

| Role | Font-size | Weight | Line-height | Letter-spacing | Transform | Evidence |
|---|---|---:|---:|---:|---|---|
| Display/Hero | `clamp(3.7rem,10vw,10rem)` | 900 | .9 | -.055em | uppercase | [Proposed] |
| H1 | `clamp(3.7rem,10vw,10rem)` | 900 | .9 | -.055em | uppercase | [Proposed] |
| H2 | `clamp(3rem,7vw,7.5rem)` | 900 | .9 | -.055em | uppercase | [Proposed] |
| H3 | `1rem` | 900 | 1.2 | 0 | uppercase | [Proposed] |
| Body Large | `clamp(1.5rem,3vw,2.6rem)` | 700 | 1.4 | 0 | none | [Proposed] |
| Body Base | `1rem` | 400 | 1.5–1.9 | 0 | none | [Proposed] |
| Caption/Label | `.72–.82rem` | 700 | 1.5 | .04–.14em | uppercase | [Proposed] |

形狀：主要按鈕直角；商品卡片以 1px 線框分隔；主題罐頭保留真實金屬反光；陰影僅用於懸停與視覺拼貼物件。[Proposed]

## 3. Layout Grid & Spatial Rhythm

- 最大內容寬度建議 1440px；容器左右安全距 desktop 6vw（上限 96px）、tablet 32px、mobile 20px。[Proposed]
- 12-column desktop grid，column gap 24px；tablet 8 columns / 20px；mobile 4 columns / 12px。[Proposed]
- 常用組合：1fr 1fr、5fr 7fr、3 equal columns；Bento 可跨 2–6 欄，不強制任何頁面順序。[Proposed]
- Section padding-block 64/96/128/144px 階梯，mobile 64–80px；標題至內容約 24–48px。[Proposed]
- 元件內距以 4px 基準尺規組合；常用 12/16/24/32px。[Proposed]

## 4. Component Library & Content Rules

| Component | Anatomy | States | Density / Limits | Evidence |
|---|---|---|---|---|
| Sticky header | logo + anchor nav + mobile toggle | default, scrolled, expanded | desktop 76px; mobile 64px | [Proposed] |
| Primary button | label + optional arrow | default, hover (-3px), active (+1px), focus 3px outline, disabled opacity .45 | min-height 48px; padding 13×20px; label <= 22 chars | [Proposed] |
| Secondary button | outlined label | same | min-height 48px | [Proposed] |
| Ghost link | label + underline | default/hover/focus/disabled | <= 28 chars | [Proposed] |
| Icon-only | accessible name + icon | default/hover/active/focus/disabled | 44×44px min target | [Proposed] |
| Can card | image + title + series caption | default/hover/focus | image aspect-ratio 1.35; title 2 lines; caption 2 lines | [Proposed] |
| Modal | image + title + copy + item chips + arrows | closed/open, keyboard, touch swipe | 1080px max; mobile <=93dvh; body copy <= 5 lines recommended | [Proposed] |
| Badge/tag | short label | default/selected/focus | 1–3 words; 8×12px padding | [Proposed] |
| Form input | label + input + helper | default/hover/focus/invalid/disabled | min-height 44px; focus 3px outline | [Proposed] |

長文需使用 CSS `line-clamp`（商品卡片標題 2 行、說明 3 行），完整內容放在詳細彈窗；圖片 `object-fit: contain` 用於罐頭，`cover` 用於攝影主視覺。[Proposed]

## 5. Motion & Interaction

- `--duration-fast:160ms`、`--duration-base:280ms`、`--duration-slow:650ms`。[Proposed]
- `--ease-out-expo:cubic-bezier(.16,1,.3,1)`。[Proposed]
- Reveal：初始 `translateY(28px)` + opacity 0，IntersectionObserver threshold .12，進場 650ms；可用 70ms stagger，但本版未強制。[Proposed]
- Card hover：translateY(-7px)、image scale 1.045；button hover -3px。[Proposed]
- Modal：native `<dialog>`；Escape、close button、背景點擊關閉、左右箭頭及觸控橫滑切換。[Proposed]
- Preloader：僅在必要時出現，載入完成或 1.8 秒後保底移除；不顯示虛假百分比。[Proposed]
- `prefers-reduced-motion: reduce` 關閉非必要動畫。[Proposed]

## 6. Responsive Rules

- Desktop >=1024px：12 欄，完整 sticky navigation，多欄商品與左右分欄實驗室。[Proposed]
- Tablet 768–1023px：8 欄，商品 2 欄，實驗室改單欄。[Proposed]
- Mobile <768px：4 欄，收合導覽列，商品 2 欄，Modal 上圖下文，鞋扣支援先選後點孔位。[Proposed]
- 觸控目標至少 44×44px；需可水平滑動的元件不能阻斷垂直捲動。[Proposed]

## 7. Design Guardrails

1. 禁止繞過 Semantic Tokens 硬寫新色碼；特定品牌主題區塊須以主題 token 或受控變體管理。[Proposed]
2. 禁止新增未定義陰影、破壞 4px 間距尺規、使用大量膠囊型按鈕。[Proposed]
3. 一般文字對比以 WCAG AA 4.5:1、較大文字 3:1 為檢核目標；保留清楚的 `:focus-visible`。[Proposed]
4. 不得直接複製第三方商標、受保護照片或商業文案；本版只使用使用者提供的 PIKO 圖片及中性示意內容。[Observed / Proposed]
5. 使用者提供的罐頭包裝圖未明確逐一對應六種分類；目前配對是示意，需待確認。[Proposed]
6. 不得將海洋生物造型系列宣稱為特定回收材質，亦不得捏造環境效益數據。[Proposed]
7. Design system 與頁面 wireframe 分離，避免跨頁面重用時綁定固定 section 順序。[Proposed]

## 8. Token Reference Summary

核心品牌藍 `#1558D6`、橘 `#F4772D`、黑 `#151515`、暖白 `#F4F1E9`；4px spacing base；sticky header 76/64px；button 48px min；fast/base/slow 160/280/650ms；RWD 768/1024px；12/8/4 columns。[Inferred / Proposed]

## Content / Asset Status

- 已有：兩張使用者提供的 PIKO 主視覺、六張使用者提供的罐頭包裝提案。[Observed]
- 待補：正式 Logo 向量、實際鞋扣產品去背圖、各罐頭與系列的正式對應、實際洞洞鞋示意素材、材料來源與製程、品牌聯絡資訊。[Proposed]
- `style-lab.html` 使用 SVG 鞋款與符號化鞋扣，僅為可操作原型；不是正式商品照片。[Proposed]
