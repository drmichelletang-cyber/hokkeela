---
name: hokkeela
description: 福氣學院 Hokkeela 設計原則與品牌規範（華人長壽醫學知識平台）。當在本專案建立或修改任何頁面、元件、樣式、文案時使用，確保品牌一致：暖米紙感 + 襯線大標 + 黑字 + 焦橘、硬陰影編輯風卡片、克制的廟宇元素（朱印/窗花/福氣籤詩）、長壽醫學內容、課程商城與會員制、繁中文案、無障礙與自含式建置。Use when building or editing any page, component, copy, or style in this repo to keep the Hokkeela brand consistent.
---

# 福氣學院 Hokkeela — 設計原則 (Design Principles)

本專案的單一設計依據。建立或修改 **任何頁面、元件、樣式、文案** 前，先讀此檔並遵循。
參考來源：Lovable 專案「Hokkeela」(`life-span-learn`)。

## 1. 品牌核心

- **中文名**：福氣學院　**羅馬字 / 口號 / 網址**：Hokkeela（台語「福氣啦」）
- **副標**：華人長壽醫學知識平台 · Longevity Science
- **主張（Slogan）**：**「福氣，不是求來的，是佈局來的。」**
- **定位**：以**實證醫學**教「活得久又活得好」的**長壽 / 老年醫學**知識平台；多作者、文章 + 影片、課程**商城**（免費/付費 + 會員制）。
- **個性**：專業、克制、有態度的編輯風（不賣抗老幻想）＋ 一點台味溫度與廟宇文化的雅趣。**不是**宗教 / 迷信網站。
- **標誌**：橘底圓角方塊內「福」字 + 「福氣學院 Hokkeela」+ 副標。

## 2. 視覺風格 (Aesthetic)

**暖米色紙感 + 襯線大標 + 黑字 + 焦橘 + 硬陰影**（編輯雜誌風 / 輕量 brutalism）。
- 背景：暖米色 + 極淡方格紙紋理。
- 卡片：1.5px 黑邊 + **硬偏移陰影**（`6px 6px 0` 純黑），hover 位移加深，**非**柔和陰影。
- 大標用襯線（Noto Serif TC），關鍵詞用焦橘 + 手繪底線。

## 3. 配色 (Color Tokens)

| 角色 | Hex | 用途 |
|------|-----|------|
| paper | `#F4EEE1` | 主背景（含方格紋理） |
| paper2 | `#EAE0CB` | 交錯區塊底 |
| card | `#FBF7EE` | 卡片表面 |
| ink | `#1C1814` | 主文字 / 邊框 / 深色按鈕 / 頁尾 |
| inksoft | `#574E42` | 次要文字（≥4.5:1，勿調淺） |
| line | `#D8C9AE` | 分隔線 / 次要邊框 |
| orange | `#C2410C` | 重點文字 / 連結 / 價格 |
| orangebright | `#EA580C` | 主按鈕 / 貼紙 / logo / 強調 |
| orange-soft | `#F6E3D1` | 焦橘淡底 |
| seal | `#A8362B` | **僅**用於朱印（印章）元素 |

> 規則：主色是暖米 + 黑 + 焦橘。朱紅（seal）**只**出現在印章；勿大面積使用紅色，以免變成宗教感。

## 4. 字體 (Typography)

- **標題**：`Noto Serif TC`（700/900）→ class `font-display`（厚重襯線，編輯感）
- **內文**：`Noto Sans TC`
- **拉丁小標 (eyebrow)**：`Figtree` 大寫 + `letter-spacing:.22em`，焦橘色 → class `eyebrow`
- 內文 ≥16px、行高 1.7；大標 `font-black`。

## 5. 克制的廟宇元素 (Restrained temple cues) — 重要

加入廟宇文化的雅趣，但**克制**，維持專業，不走宗教/迷信：
- **朱印 `.seal`**：朱紅印章（福/壽/籤/願/記），小面積點綴，略微旋轉。每區最多一兩個。
- **窗花 `.lattice`**：極淡的斜格分隔線，當區塊之間的過場。
- **福氣籤詩**（見 §7）：以「福」字圓牌 + 籤詩卡呈現，雅致而非廟口。
- **福氣啦 `.sticker`**：旋轉的橘色貼紙標籤，俏皮點題。
- ❌ 避免：龍鳳、香爐、神像、滿版紅金、發光特效、過多吉凶用語。

## 6. 元件 (Components — 在 `assets/css/styles.css`)

- **按鈕** `.btn` + `.btn-dark`（黑底）/ `.btn-orange`（焦橘）/ `.btn-outline`（描邊）：hover `translate(-2px,-2px)` + 硬陰影變橘/黑。每頁單一主 CTA。
- **卡片** `.card`（硬陰影）+ `.card-hover`（hover 位移加深）；`.card-flat`（淡邊、無重陰影，用於次要如方案）。
- **chip** `.chip` / `.chip-orange`（描邊標籤）。
- **縮圖** `.thumb` + `.thumb-1`~`6`：暖色平塗區塊（**不依賴外部圖**）；影片加 `.play-badge`（焦橘圓鈕）與時長角標。
- **頭像** `.avatar`：方形、橘底、姓氏首字（編輯感，非圓形）。
- **價格** `.price-old`（刪除線原價）/ `.price-new`（焦橘會員價）。
- **福氣籤詩** `.wish-well`（福字圓牌 + 漣漪動畫）/ `.wish-slip`（籤詩卡）/ `.slip-level`。

## 7. 招牌功能：福氣籤詩 (Fortune)

- 首頁固定區塊 `#fortune`：點「福」字圓牌 → 求一支籤 → 得**「本日醫學小知識」**。
- 籤卡 = 第 X 籤 + 佈局類別徽章（如「佈局・睡眠」）+ 知識標題 + 內文 + 「再抽一支籤」。
- 知識陣列 `TIPS` 在 `assets/js/main.js`，新增即加 `{level, title, text}`。
- 語氣呼應主張：把運氣化成**可執行的長壽佈局**（不用吉凶占卜口吻）。
- **分享籤詩卡片**：抽完可「分享籤詩」，以 Canvas 產生 1080×1350 品牌卡片圖（暖紙、硬陰影、福/籤朱印、主張標語），優先用 `navigator.share`，不支援則下載 PNG。

## 8. 內容主題與商業模式 (Content & Commerce)

- **主題**：長壽 / 老年醫學 — 六大知識軸：長壽飲食、運動與肌力、睡眠修復、大腦與認知、慢病管理、身心平衡。
- **格式**：文章 + 影片（支援 YouTube 內嵌與上傳）。
- **多作者**：醫師輪值編輯，各有個人主頁、作品集、外部連結；首頁設「本月編輯」。
- **商城**：免費 / 付費課程、購物車、**原價 vs 會員價**清楚標示。
- **會員制**：免費註冊看旗艦課；年度會員全站暢學 + 會員價。
- **作者申請**：旗艦影片審核 + 專業證照 + 個人簡介。

## 9. 文案 / 語氣 (Voice)

- 語言：**繁體中文**（`lang="zh-Hant"`）；專有名詞中英並列（MRCP、CME、BE-FAST）。
- 調性：專業、誠實、有主張（「我不賣抗老幻想，只幫你把日子佈局好」）；善用「佈局福氣」「活得久又活得好」等品牌語彙與台味溫度。
- 醫療免責：頁尾固定「內容僅供醫學教育用途，不構成個別醫療建議。」

## 10. 無障礙 (Accessibility — 必達)

- 對比 ≥4.5:1（inksoft 已達標，勿調淺）；互動元素有可見 focus ring（橘色）。
- icon-only 按鈕加 `aria-label`（如購物車、選單、籤牌）；動態結果區 `aria-live`。
- 圖示一律 **Lucide SVG**，**禁用 emoji 當圖示**（「福/壽」等漢字印章屬刻意設計，非 emoji）。
- 標題階層 h1→h2→h3 不跳級；響應式 375/768/1024 無破版、無橫向捲動；支援 reduced-motion。

## 11. 建置 (Build — 自含式，不依賴 CDN)

- Tailwind **本地編譯**到 `assets/css/tailwind.css`（勿用 `cdn.tailwindcss.com`）。
- Lucide 用打包的 `assets/js/lucide.js`（勿用 unpkg）。
- 改動 HTML/JS 後重編譯：
  ```bash
  npx tailwindcss -c tailwind.config.js -i assets/css/tailwind-input.css -o assets/css/tailwind.css --minify
  ```
  `content` 已含 `./*.html` 與 `./assets/js/*.js`。

## 交付前檢查 (Checklist)

- [ ] 暖米底 + 黑 + 焦橘；朱紅僅用於印章；無大面積紅金/宗教感
- [ ] 大標 Noto Serif TC、內文 Noto Sans TC、eyebrow 大寫橘色
- [ ] 卡片用硬偏移陰影 + 1.5px 黑邊；每頁單一主 CTA
- [ ] 廟宇元素克制（印章/窗花/籤詩/福氣啦貼紙各點到為止）
- [ ] 長壽醫學主題；課程標原價 vs 會員價；會員/免費標示清楚
- [ ] 對比 ≥4.5:1、focus 可見、icon 按鈕有 aria-label、無 emoji 圖示
- [ ] 響應式 375/768/1024 無破版；reduced-motion 正常
- [ ] 重新編譯 tailwind.css；瀏覽器直開 index.html 正常
- [ ] 頁尾醫療免責聲明在
