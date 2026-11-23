# PIKO Website V1.0 — 可操作功能原型

## 啟動方式

解壓縮 `piko.zip`，直接用瀏覽器開啟 `index.html`。建議使用 VS Code Live Server 或在 `piko/` 資料夾執行 `python -m http.server 8000`，然後瀏覽 `http://localhost:8000/`。

## 頁面

- `index.html`：首頁，含 Sticky Navigation、品牌視覺、認識 PIKO、六罐頭商品彈窗輪播、穿搭實驗室入口、材料前後對比、頁尾。
- `style-lab.html`：獨立互動頁，含一種洞洞鞋、八種鞋色、鞋扣選擇、點選孔位與桌面拖放、清除、下載 SVG 搭配示意圖。
- `main.css`：三層 Design Tokens、RWD、共用樣式與動態。
- `main.js`：共用互動及可編輯的系列、鞋色與鞋扣資料。
- `design.md`：設計系統與證據等級，供第二專案重用。
- `assets/`：使用者提供圖片轉存的 WebP；原始圖不在此壓縮檔內。

## 如何慢慢替換內容

1. **六罐頭**：修改 `main.js` 最上方的 `COLLECTIONS`，調整標題、說明、圖檔路徑與每系列內容。
2. **鞋色**：修改 `SHOE_COLORS`。
3. **鞋扣造型**：修改 `CHARMS`；目前用符號佔位，正式產品建議改成透明 WebP/SVG 商品圖並調整 `renderPalette` 與孔位呈現。
4. **品牌文字**：在 `index.html` 更新文案。
5. **圖片**：將優化後 WebP 放進 `assets/`，修改相對路徑。
6. **視覺規範**：先更新 `design.md` 的規格與證據標籤，再調整 `main.css` 的 Primitive → Semantic → Component tokens。

## 將 design.md / main.css 匯入「專案二」

將 `design.md` 與 `main.css` 複製到第二專案根目錄，在 HTML `<head>` 中引用 `main.css`；優先使用 CSS Semantic Tokens，不要在頁面硬寫色碼。依照新 Wireframe 自行組合元件，無需複製 PIKO 首頁 section 順序。`main.js` 只移植實際需要的互動函式。

## 注意

- 六張罐頭圖片目前按展示順序暫時配給四個系列及兩種 DIY 配件，**不代表已確認的正式系列對應**。
- 穿搭實驗室的鞋款和鞋扣是互動示意圖，非實際產品比例或材質。
- 這是純前端原型，不包含會員、購物車、資料庫或金流；`SAVE MY STYLE` 下載 SVG 示意檔。
- 請使用正式素材取代佔位內容後再公開上線；環境數據與材質聲明須經查證。
- 所有頁面宣告 UTF-8，並使用繁體中文備援字型堆疊。

## V1.1 進站載入動畫

首頁使用使用者提供的銀色罐頭圖片作為載入主體。重要資源（罐頭圖與首頁主視覺）的實際載入完成數量決定進度條百分比，並於完成後播放拉環與上蓋掀起的 CSS 視覺轉場；超過 2.4 秒可略過，12 秒設有安全離開機制。此開罐效果為 2D 影像的視覺模擬，非真實 3D 罐頭結構動畫。支援 prefers-reduced-motion。


## V1.2 商品貨架更新
首頁 COLLECTION 改為白底雙層金屬貨架（assets/shelf-white.png），每層三個可獨立點擊的罐頭。點擊後仍使用原本商品彈窗與左右切換功能。貨架圖與六個罐頭分層呈現，便於後續替換商品圖片。


## V1.5 修改
- 以 V1.4 為基礎，重新校準左右兩隻鞋的 26 個可點擊鞋孔中心；取消常駐的額外圓形覆蓋，滑鼠移入才提示。
- 將原有兩層金屬貨架圖層重新拉開，保留六個商品標籤；罐頭下緣對齊層板上緣，並保留陰影與彈窗互動。


## V1.7 更新
- 首頁右側改為魚身切割互動：滑鼠/觸控由上往下拖曳，呈現切開與垃圾散落的提供素材；可重新開始。
- THE SECOND LIFE 加入塑膠、玻璃、漁網切換與 BEFORE/AFTER 滑桿（尚待實際材料照片）。
- 依使用者截圖微調鞋孔座標；實際跨裝置位置仍需目視驗收。
- 保留 V1.6 貨架與其他網站功能。


V1.8: Enlarged and tilted hero fish (head upper-left, tail lower-right), adjusted responsive cut states; replaced three text material tabs with clearly selectable visual material cards. Material illustrations are CSS placeholders, not product photographs.


## V1.9 更新
- 穿搭實驗室七色鞋款各使用獨立 PNG，移除灰色與程式濾鏡；鞋扣座標沿用原白鞋 1334×1179 座標。
- THE SECOND LIFE 三款 BEFORE 使用使用者提供的塑膠瓶、玻璃瓶、漁網圖；AFTER 留白。
- 縮小材料選擇卡與首頁魚身提示文字，將提示定位於展示區內。


### V1.9.3 — SAVE MY STYLE 離線匯出修正
穿搭實驗室新增 `shoe-export-assets.js`，將七款鞋圖以內嵌資料形式提供給 Canvas 匯出，避免直接以 `file://` 開啟網頁時，瀏覽器將本機圖片視為不安全來源，導致 `Tainted canvases may not be exported`。請保留此檔案與網站其他檔案在同一資料夾。
