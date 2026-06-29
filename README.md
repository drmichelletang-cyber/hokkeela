# 福氣學院 Hokkeela — 醫學線上學習平台 (Demo)

多作者醫學知識線上教學平台。以**文章 + 影片**呈現各專科課程，風格專業又活潑。
品牌名「Hokkeela」取自台語「福氣啦」的發音。

## ✨ 特色功能

- 🎋 **每日求籤**：首頁的求籤小遊戲，搖一搖籤筒，抽出你的**「本日醫學小知識」**（共 12 則健康知識，含吉籤等級）。
- 📺 **文章 × 影片雙模式**：每個主題同時提供圖文與影片。
- 👩‍⚕️ **多作者平台**：各專科醫師與學者共同產出內容。

## 🎨 設計

由 `ui-ux-pro-max` skill 產生的設計系統：

- **配色**：醫療藍綠 `#0D9488` + 活潑橘 `#EA580C`（信任感 + 活力）；求籤區用喜氣紅金點綴。
- **字體**：Figtree（標題）/ Noto Sans（內文，醫療無障礙首選）
- **風格**：乾淨現代、柔和圓角卡片、捲動淡入動效

## 📄 頁面

| 檔案 | 內容 |
|------|------|
| `index.html` | 首頁：Hero 搜尋、**求籤遊戲**、平台特色、熱門內容、專科分類、講師團隊、CTA |
| `courses.html` | 課程／文章列表：分類篩選 + 即時搜尋 |
| `article.html` | 內容詳情：影片播放區 + 圖文內文 + 章節進度 + 作者簡介 + 相關內容 |

```
assets/css/styles.css     設計 tokens、元件、求籤遊戲樣式
assets/css/tailwind.css   本地編譯的 Tailwind（不依賴 CDN）
assets/js/main.js         行動選單、捲動淡入、分類篩選、搜尋、求籤遊戲
assets/js/lucide.js       內嵌的 Lucide SVG 圖示
```

## ▶️ 預覽

直接用瀏覽器打開 `index.html` 即可，**不需安裝或連 CDN**（字體會嘗試連 Google Fonts，離線則自動退回系統字體）。

## 🛠️ 重新編譯樣式（選用）

修改 HTML/JS 後若用到新的 Tailwind class，重新產生 `tailwind.css`：

```bash
npm install
npx tailwindcss -c tailwind.config.js -i assets/css/tailwind-input.css -o assets/css/tailwind.css --minify
```

## 📝 備註

- 純靜態前端，無後端／資料庫；課程內容與數據為示意資料。
- 影片區為播放器版位（placeholder），可串接實際影片來源。
- 內容僅供醫學教育示意，不構成個別醫療建議。
