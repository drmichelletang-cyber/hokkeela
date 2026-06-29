# 福氣學院 Hokkeela — 華人長壽醫學知識平台 (Demo)

> 福氣，不是求來的，是佈局來的。

以**實證醫學**教「活得久又活得好」的多作者**長壽醫學**學習平台 demo。對齊 Lovable 專案「Hokkeela」(`life-span-learn`) 的設計方向。

## ✨ 特色

- 🎴 **福氣籤詩**：首頁點「福」字圓牌求一支籤，得一則**「本日醫學小知識」**（把運氣化成可執行的長壽佈局，共 12 則）。
- 🎬 **文章 × 影片**：支援 YouTube 內嵌與上傳影片。
- 👩‍⚕️ **多作者編輯群**：醫師輪值編輯，含「本月編輯」與作者主頁。
- 🛒 **課程商城 + 會員制**：免費 / 付費課程、原價 vs 會員價、會員方案、作者申請。

## 🎨 設計

暖米色紙感 + 襯線大標 + 黑字 + 焦橘 + 硬偏移陰影（編輯雜誌風），並加入**克制的廟宇元素**（朱印、窗花分隔線、福氣籤詩、福氣啦貼紙），維持專業、不走宗教 / 迷信。

- **配色**：paper `#F4EEE1` / ink `#1C1814` / orange `#C2410C`·`#EA580C`，朱印 `#A8362B`
- **字體**：Noto Serif TC（標題）/ Noto Sans TC（內文）/ Figtree（拉丁小標）

完整規範見 **`.claude/skills/hokkeela/SKILL.md`**（hokkeela 設計原則 skill）。

## 📄 頁面

| 檔案 | 內容 |
|------|------|
| `index.html` | 首頁：Hero（佈局福氣）+ 本月編輯、旗艦課、六大知識軸、**福氣籤詩**、作者群、會員方案 |
| `courses.html` | 課程商城：分類篩選 + 搜尋、免費/付費、原價 vs 會員價 |
| `article.html` | 課程詳情：影片區 + 圖文 + 章節進度 + 價格/會員 + 作者簡介 + 相關課程 |

```
assets/css/styles.css     設計 tokens、編輯風元件、廟宇元素、福氣籤詩
assets/css/tailwind.css   本地編譯的 Tailwind（不依賴 CDN）
assets/js/main.js         行動選單、捲動淡入、分類篩選/搜尋、福氣籤詩
assets/js/lucide.js       內嵌的 Lucide SVG 圖示
.claude/skills/hokkeela/  hokkeela 設計原則 skill
```

## ▶️ 預覽 / 重新編譯

直接用瀏覽器開 `index.html`（不需連 CDN）。改動後若用到新 class：

```bash
npm install
npx tailwindcss -c tailwind.config.js -i assets/css/tailwind-input.css -o assets/css/tailwind.css --minify
```

## 📝 備註

- 純靜態前端，無後端；課程、價格與數據為示意。
- 影片區為播放器版位，可串接 YouTube / 上傳來源。
- 內容僅供醫學教育用途，不構成個別醫療建議。
