# Research Atlas — AI 新增內容規則

## 網站用途與結構
繁體中文學術知識整理網站，展示論文、理論與研究方法。只有 index.html 首頁與 paper.html?id=<id> 文章頁；沿用 assets/style.css 與既有 JavaScript，不重新設計。純靜態網站，不需 npm、建置、後端或 API。

## 開工先讀
讀本檔、README.md、content/catalog.json 及 content/articles/ 內一篇現有文章。新增前確認沒有相同 ID。不得覆蓋或刪除既有文章；編輯舊內容須有使用者明確要求。

## 如何新增文章
1. 讀取使用者提供的論文或研究筆記，確認來源與閱讀範圍。
2. 建立 content/articles/<id>.json；id 只能用小寫英文字母、數字、連字號，檔名必須一致。
3. 沿用現有 JSON 格式，欄位為 schemaVersion、id、type、title、summary、tags、isDemo、updatedAt、bibliography、sections、sources。
4. 在 content/catalog.json 的 articles 陣列加入新 ID，保留所有原項目。首頁會自動顯示卡片，不要修改首頁 HTML 或另寫文章網頁。
5. 以 HTTP 開啟網站驗收，回報新增檔案、實際檢查結果與缺漏，不得宣稱未執行的測試通過。

## 欄位與章節
- schemaVersion 固定 "1.0.0"；type 是 paper、theory 或 method；summary 為 1–2 句；tags 是少量主題文字陣列，優先沿用既有分類；updatedAt 使用 YYYY-MM-DD。
- bibliography 是 null（一般筆記），或包含 authors（文字陣列）、year（數字或 null）、venue、doi、url（文字或 null）、note（閱讀範圍與缺漏說明）的物件。
- sections 是陣列，每項有唯一 id、title、paragraphs（純文字段落陣列）。section id 不使用 bibliography 或 sources，避免與頁面定位衝突。不要插入 HTML 或腳本。
- sources 是陣列，每項包含 label、url（http/https 或 null）、locator（實際頁碼／章節或缺漏說明）。
- 論文內文依序包含：研究背景與問題、研究方法、主要研究發現、研究貢獻、研究限制與延伸思考。
- 理論可用核心概念、適用情境、限制與延伸思考；方法可用用途、操作步驟、適用條件與限制。不強制將所有內容套成論文。

## 誠信與隱私
不得虛構作者、DOI、來源、頁碼、研究結果或統計。缺漏用 null 並解釋；只讀摘要時在 note 註明。區分原文主張與個人思考。
Demo 必須 isDemo=true、id 以 demo- 開頭、標題以 Demo｜開頭，清楚標示合成；真實內容應 isDemo=false，不冒用 Demo 書目。
原始 PDF、私人筆記及未完成草稿不得放入這個公開資料夾。不要重新加入上傳、AI 模型、儀表板、圖譜或管理後台。未獲授權不推送或公開部署。

## 新增範例
建立 content/articles/demo-new-note.json：

```json
{
  "schemaVersion": "1.0.0",
  "id": "demo-new-note",
  "type": "theory",
  "title": "Demo｜一篇新的理論筆記",
  "summary": "合成示範，展示新增文章的格式。",
  "tags": ["研究筆記"],
  "isDemo": true,
  "updatedAt": "2026-11-05",
  "bibliography": null,
  "sections": [
    {"id": "concept", "title": "核心概念", "paragraphs": ["合成示範：在此填入依來源整理的概念。"]},
    {"id": "reflection", "title": "限制與延伸思考", "paragraphs": ["合成示範：在此區分限制與個人思考。"]}
  ],
  "sources": [{"label": "合成示範，非真實研究", "url": null, "locator": "沒有原始研究來源。"}]
}
```

再將 demo-new-note 加入 catalog 的 articles。這個範例未加入目前六篇展示內容；可在副本演練。

## 完成檢查
確認 JSON 可解析、ID 唯一、目錄及檔名一致、既有文章未改動。首頁出現新卡片，搜尋與標籤能找到，點選後有完整內文與來源，返回列表正常。檢查桌面與手機基本版面，保持相對路徑以支援 GitHub Pages 專案子目錄。沿用 el() 建立文字，不使用 innerHTML 插入文章內容。
