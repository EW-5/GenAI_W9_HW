# Research Atlas

繁體中文學術知識整理網站：首頁卡片、分類、搜尋與一致的文章閱讀頁。目前六篇文章均為明示合成的 Demo，不代表真實研究成果。

## GitHub Pages 上傳

1. 將這個資料夾「裡面的所有檔案」上傳到 GitHub Repository 根目錄，讓 index.html 直接位於根目錄。包含 .nojekyll，不要只上傳 ZIP。
2. Settings → Pages → Source 選 Deploy from a branch，Branch 選 main、資料夾選 /(root)，儲存。
3. 等待部署完成，以 GitHub 提供的公開網址檢查首頁與文章。

本包不需要 npm、安裝套件、建置或 Actions workflow。

## AI 如何繼續新增內容

先讀 AGENTS.md，依既有格式新增 content/articles/<id>.json，再把 ID 加入 content/catalog.json。首頁自動新增卡片，不需要重做網頁。規則包含命名、章節、學術誠信、不得刪改舊文與完成檢查，內附一篇可複製的合成範例。

## 本機預覽（選用）

在此資料夾執行 python -m http.server 4173，再開啟 http://localhost:4173/ 。需安裝 Python；不要直接雙擊 HTML。

## 作業繳交資訊

- 專案簡介：見本文件首段。
- GitHub Repository：【上傳後填入】
- 公開網站：【部署後填入】
- AI 規則：根目錄 AGENTS.md，可直接附檔並提供 GitHub 檔案連結。
- 延伸說明：新增一份 JSON 與目錄 ID，AI 即可依相同規則持續擴充內容。
