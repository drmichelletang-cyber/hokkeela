---
name: hokkeela
description: 福氣學院 Hokkeela 設計原則與品牌規範。當在本專案建立或修改任何頁面、元件、樣式、文案時使用，確保品牌一致（醫療藍綠 + 福氣紅金配色、Figtree/Noto Sans 字體、圓角卡片、求籤/福氣調性、繁中醫學教育內容、無障礙與自含式建置）。Use when building or editing any page, component, copy, or style in this repo to keep the Hokkeela brand consistent.
---

# 福氣學院 Hokkeela — 設計原則 (Design Principles)

本專案的單一設計依據。建立或修改 **任何頁面、元件、樣式、文案** 前，先讀此檔並遵循。

## 1. 品牌核心

- **中文名**：福氣學院　**羅馬字 / 口號 / 網址**：Hokkeela（取自台語「福氣啦」的發音）
- **定位**：多作者醫學知識線上學習平台，以**文章 + 影片**呈現各專科課程。
- **個性**：專業可信（醫療）＋ 溫暖活潑（福氣）。既嚴謹又有人情味，不死板、不花俏。
- **標誌**：聽診器圖示（Lucide `stethoscope`）置於藍綠圓角方塊；字標「福氣學院」後接小字「Hokkeela」。

## 2. 配色 (Color Tokens)

主色系 — 醫療藍綠（信任），點綴橘（活力）：

| 角色 | Hex | 用途 |
|------|-----|------|
| primary | `#0D9488` | 主要按鈕、連結、強調 |
| primarydark | `#0F766E` | hover、深色文字標記 |
| secondary | `#2DD4BF` | 輔助、漸層、邊框點綴 |
| accent | `#EA580C` | CTA、活潑點綴（單一頁面主 CTA 用） |
| accent-soft | `#FFF1EA` | accent 的淡底（chip / 區塊背景） |
| ink | `#134E4A` | 主文字 / 深色頁尾 |
| muted | `#4F6D69` | 次要文字（**須 ≥4.5:1**，勿再調淺） |
| bg | `#F0FDFA` | 頁面底色 |
| border | `#D7ECE9` | 卡片 / 分隔線 |

**福氣紅金**（僅限求籤 / 節慶 / 喜氣元素，勿用於一般 UI）：
`#C0392B`／`#9E2A20`（紅）、`#D4af37`／`#BE9226`（金）、淡底 `#FFF7ED`～`#FFFBEB`。

> 用法：醫療場景以藍綠為主、橘為輔；只有「福氣 / 求籤 / 祝福」語境才動用紅金，維持專業與喜氣的分界。

## 3. 字體 (Typography)

- **標題**：`Figtree`（600–800）→ class `font-display`
- **內文**：`Noto Sans` + `Noto Sans TC`（繁中）
- 內文 ≥16px、行高 1.5–1.75；標題字重 700–800、`letter-spacing:-0.02em`。
- Google Fonts：`Figtree:wght@400..800` + `Noto Sans` + `Noto Sans TC`，`display=swap`，並保留系統字體 fallback。

## 4. 版面與間距 (Layout)

- 容器：`.container-wide`（max-width 1200px、左右 padding 1.25rem、置中）。
- 間距節奏：4 / 8px 系統；區塊垂直留白 `py-20`（手機可縮）。
- 圓角：卡片 22px、按鈕 14px、大型區塊 32px。
- Header：`.site-header` sticky + 毛玻璃；行動版以漢堡選單收合（`#mobile-menu`）。
- 響應式斷點：375 / 768 / 1024 / 1440；mobile-first，**不可橫向捲動**。

## 5. 元件 (Components — 已在 `assets/css/styles.css`)

- **按鈕** `.btn` + `.btn-primary` / `.btn-accent` / `.btn-ghost`：hover 上浮 `translateY(-2px)`、active `scale(.97)`。每頁**只有一個主 CTA**。
- **卡片** `.card`：hover `translateY(-6px)` + 陰影 + 邊框轉 secondary。
- **chip** `.chip`：圓角標籤，用 muted 底 / accent-soft 底。
- **縮圖** `.thumb` + `.thumb-1`~`.thumb-6`：漸層底（**不依賴外部圖片**）；影片加 `.play-badge` 與時長角標。
- **頭像** `.avatar`：作者姓氏首字 + 漸層底（多作者識別）。
- **求籤** `.fortune-cup`（紅金籤筒）/ `.fortune-slip`（籤詩卡）/ `.slip-level`（吉籤等級徽章）。

## 6. 動效 (Motion)

- 微互動 150–300ms；進場 reveal ≤450ms。用 `transform`/`opacity`，勿動 width/height。
- 捲動淡入：`.reveal` → IntersectionObserver 加 `.in`（見 `main.js`）。
- **務必**支援 `prefers-reduced-motion`（已在 CSS 關閉動畫）。

## 7. 招牌功能：每日求籤

- 首頁固定區塊 `#fortune`：搖籤筒 → 抽出**「本日醫學小知識」**。
- 籤詩 = 籤號 + 吉籤等級（上上籤/上吉籤/中吉籤/吉籤/中平籤）+ 知識標題 + 內文 + 「再求一支」。
- 知識內容陣列 `FORTUNES` 在 `assets/js/main.js`，新增知識即加物件 `{level, title, text}`。
- 語氣：吉祥、正向、口語化，但**醫學內容須正確**。

## 8. 文案 / 內容原則 (Voice)

- 語言：**繁體中文**（`lang="zh-Hant"`）；專有名詞中英並列（如「CME 學分」「BE-FAST」）。
- 調性：專業但親切，多用「你」、善用台味溫度（呼應「福氣啦」）。
- 醫療免責：頁尾固定「內容僅供醫學教育用途，不構成個別醫療建議。」

## 9. 無障礙 (Accessibility — 必達)

- 文字對比 ≥ 4.5:1（muted 已調至達標，勿調淺）。
- 互動元素有可見 focus ring（已全域設定，勿移除 outline 而無替代）。
- icon-only 按鈕加 `aria-label`；動態結果區用 `aria-live`。
- 圖示一律用 **Lucide SVG**，**禁用 emoji 當圖示**。
- 維持標題階層 h1→h2→h3，不跳級。

## 10. 建置 (Build — 自含式，不依賴 CDN)

- Tailwind **本地編譯**到 `assets/css/tailwind.css`（勿改用 `cdn.tailwindcss.com`）。
- Lucide 圖示用打包的 `assets/js/lucide.js`（勿改用 unpkg）。
- 改動 HTML/JS 後若用到新 class，重編譯：
  ```bash
  npx tailwindcss -c tailwind.config.js -i assets/css/tailwind-input.css -o assets/css/tailwind.css --minify
  ```
  > `tailwind.config.js` 的 `content` 已含 `./*.html` 與 `./assets/js/*.js`（JS 內字串的 class 也會被掃描）。

## 交付前檢查 (Checklist)

- [ ] 配色只用上述 token；紅金僅用於福氣語境
- [ ] 標題 Figtree、內文 Noto Sans；內文 ≥16px
- [ ] 每頁單一主 CTA；卡片 / 按鈕 hover 動效一致
- [ ] 對比 ≥4.5:1、focus 可見、icon 按鈕有 aria-label、無 emoji 圖示
- [ ] 響應式 375 / 768 / 1024 無破版、無橫向捲動
- [ ] reduced-motion 正常
- [ ] 重新編譯 `tailwind.css`，瀏覽器直開 `index.html` 顯示正常
- [ ] 頁尾醫療免責聲明在
