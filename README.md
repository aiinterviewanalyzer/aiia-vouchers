# AI Interview Analyzer vouchers: GitHub Pages

Standalone HTML/CSS/JavaScript. No Azure, API, database, server credentials, framework build, package installation or company-hosting access is needed. The local prize wheel keeps its existing assignment and inventory system.

## Files to publish

Upload only this folder's contents to the root of a NEW voucher-page repository:

```text
index.html
styles.css
app.js
logo.svg
.nojekyll
README.md
```

Do not upload the parent prize wheel, its data directory, the original CSV/XLSX, voucher lists, passwords, token files, Azure code, or the earlier Azure review ZIP. These six files contain no real voucher codes.

## Create and publish, only after approval

1. Sign in to your own GitHub account. Create a new repository, for example `aiia-vouchers`, under an account where you can administer Pages. A public repository is the simplest option with GitHub Free. Follow company rules for who should own the repository.
2. Add a README so that the `main` branch exists. Do not create a new Azure resource, company website, or custom domain.
3. Unzip `github-pages-voucher.zip` and upload its CONTENTS with **Add file > Upload files**. Do not upload the ZIP itself or a parent folder. `index.html` must be at the repository root. Commit these static files to `main` after publication approval.
4. In the new repository open **Settings > Pages**. Under **Build and deployment**, set **Source: Deploy from a branch**, **Branch: main**, **Folder: /(root)**, then **Save**. This starts publication. The `.nojekyll` file disables unnecessary Jekyll processing; no custom Actions workflow is required.
5. Wait for the Pages deployment to succeed and use **Visit site** in Settings > Pages to copy the exact HTTPS URL. It will normally resemble the PLACEHOLDER below:

   `https://YOUR-GITHUB-USERNAME.github.io/aiia-vouchers/`

   This placeholder is not an active site. Use the actual URL from GitHub. Repository and account names determine the path. Keep its final slash.
6. Open the bare URL on your phone. A friendly missing-voucher message is expected; no voucher data is hardcoded into the page.
7. Test only a fictional voucher by appending this fragment to the actual URL:

   `#code=FICTIONAL-TEST-ONLY&value=99`

   Confirm EUR 99 and the exact fictional code, copy it, and reload. The fragment should disappear while the code remains visible. Test values 199 and 499 as well. A phone scanner must recognize the URL and open it in its browser.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Connect the existing wheel

The public page URL is the ONLY new configuration. It is not a secret. Do not edit the voucher workbook, ledger, probabilities or limits.

1. On the booth laptop create this file with Notepad:

   `%LOCALAPPDATA%\AIIA\SpinWithRudy\voucher-page-url.txt`

2. Put the actual bare HTTPS GitHub Pages URL on its only line. Do not include `#code`, a voucher code, quotes or query parameters. Save as `.txt`, not `.txt.txt`.
3. With permission, restart the existing local wheel from the repository root:

   ```powershell
   node apps/spin-with-rudy/server.mjs
   ```

   Restart the existing server rather than starting a second process on port 3003. It continues using its existing ledger and admin password. No publishing key or token file is read for this feature.
4. Alternatively, supply the public URL as a command-line override (replace the placeholder first):

   ```powershell
   node apps/spin-with-rudy/server.mjs --voucher-page-url "https://YOUR-GITHUB-USERNAME.github.io/aiia-vouchers/"
   ```

5. Refresh the wheel with Ctrl+F5. Its assigned code and value are URL-encoded into the QR only after **Correct answer**. The code is taken from the existing assignment; QR generation makes no network call and consumes no additional prize. Other prize screens are unchanged.

Until an actual page URL is configured, the wheel preserves its previous plain-text QR display. No placeholder URL is activated automatically. To disable the new display later, clear the URL configuration file and restart, without touching inventory.

## Data and privacy

The QR contains `https://…/#code=ENCODED-CODE&value=99`. URLSearchParams encodes the fragment; it is not an authenticated or encrypted token. **Anyone who has an individual voucher URL or its QR image can read that voucher.** The page only displays the supplied information; it does not prove that a voucher was won or perform redemption validation.

The browser does not send the `#` fragment to GitHub Pages in an HTTP request. JavaScript reads it, uses textContent to display the exact code safely and removes it from the address bar with history.replaceState. Current history-entry state preserves the same display on refresh, without an external database or a voucher list. It is not encryption: the QR, scanner application, clipboard and someone with access to that browser can still reveal that individual voucher. Browser back/forward may revisit that browser's previous scanned vouchers.

No analytics, external scripts, external fonts, fetch requests or code logging are used. All assets are local. An invalid/missing link shows a friendly error and clears any previous voucher display. Copy requires a supported HTTPS clipboard implementation; if copying is denied, the exact code is selected for manual copying.

## Rollout status

Prepared for review only. No repository was created, no files were uploaded and Pages was not enabled by this implementation. The prior Azure/Next.js source remains preserved and unused. The local server no longer loads the Azure publisher or its key/token configuration. Do not deploy the old Azure package for this approach.
