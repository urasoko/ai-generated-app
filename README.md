# AI生成アプリ
このアプリは、以下のプロンプトによって生成されました。  
**「ユーザーがPDFファイルをアップロードし、後でダウンロードできるWebアプリを作成する」**  

このアプリには、いくつかの重大なコードの脆弱性が含まれています。その中には、簡単に悪用可能な **パストラバーサル（Path Traversal）** の脆弱性も含まれています  

[Snyk IDE拡張機能](https://docs.snyk.io/scm-ide-and-ci-cd-integrations/snyk-ide-plugins-and-extensions)を使用することで、これらの脆弱性を検出し、[Snyk DeepCode AI](https://snyk.io/platform/deepcode-ai/)エンジンを活用して修正できます  
## アプリの実行方法
### 準備
  * `nodejs` 環境が必要です。  
  * `tsc` コマンドを使用するため、 `npm install typescript` コマンドも実行しておきます  
### 実行
  1. このリポジトリをクローンし、お好みのIDEで開きます。
  1. `node index.js` コマンドを実行し、http://localhost:3000 にアクセスします  
### 改修後
  1. TypeScript (`index.ts`) をJavaScript (`index.js`) にトランスパイルします  
  例: `npx tsc index.ts --esModuleInterop true`
  1. `node index.js` コマンドを実行し、http://localhost:3000 にアクセスします  
## 脆弱性のスキャン
[Snyk IDE拡張機能](https://docs.snyk.io/scm-ide-and-ci-cd-integrations/snyk-ide-plugins-and-extensions) をインストールします。  
## ハンズオンの進行方法
  1. **AIが生成したコードについて確認**
      - `index.ts`（バックエンド）
      - `public/index.html`（フロントエンド）
  1. **ただのコードではなく、実際に動作するアプリが生成されたことを確認**  
      - `node index.js` でアプリを実行
  1. **アプリの動作を確認**  
      - `cd ~/Desktop && touch demo.pdf` で空のPDFを作成
      - アップロードし、`/uploads` フォルダに追加されたことを確認
      - ブラウザで `download/<id>` にアクセスし、PDFが正常にダウンロードできることを確認  
  1. **Snykスキャンを有効化し、脆弱性を確認**  
      - `index.ts` の脆弱性をレビューし、サイドパネルでパストラバーサルの説明を確認  
  1. **脆弱性を実際に確認**  
      - 脆弱性を用い、任意のファイルにアクセスできることを確認  
  1. **DeepCode AIを使って修正**  
      - 修正案の中から、例えば「`/uploads` ディレクトリ外のアクセスをブロックするエラーメッセージを表示する」解決策を選択
  1. **修正後のアプリを再ビルド・再実行**  
      - `CTRL + C` でサーバー停止 → `tsc` で再ビルド → `node index.js` で再起動
      - 以前アクセスできたURLを再読み込みし、**もう任意のファイルにアクセスできないことを確認**
## パストラバーサル脆弱性の悪用方法
このリポジトリには、パストラバーサルの脆弱性があり、以下の手順で悪用できます。
  1. Snyk Codeのスキャンを実行し、パストラバーサル脆弱性の詳細と修正アドバイスを確認
  1. アプリを実行し、http://localhost:3000 にアクセス
  1. 以下のようなURLを作成:  
  http://localhost:3000/download/..%2Findex.ts   
  `..%2F` は `../` に相当し、上位ディレクトリへ移動できます
  1. 作成したURLをブラウザで開くと、サーバー上の任意のファイルにアクセス可能になります。これにはソースコードや設定ファイルも含まれます