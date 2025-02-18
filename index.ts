import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

export const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('pdf'), (req, res) => {
  if (!req.file) {
    return res.send(`
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>アップロード失敗</title>
        <style>
          body {
            background-color: #2C2E3E;
            color: #ffffff;
            font-family: 'Inter', sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
          }
          .container {
            background: #3A3D4F;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }
          .btn {
            background-color: #5A5F73;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 8px;
            display: inline-block;
            margin-top: 10px;
          }
          .btn:hover {
            background-color: #73788E;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>アップロードに失敗しました</h1>
          <p>ファイルが選択されていません。</p>
          <a href="/" class="btn">戻る</a>
        </div>
      </body>
      </html>
    `);
  }

  res.send(`
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>アップロード成功</title>
      <style>
        body {
          background-color: #2C2E3E;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          text-align: center;
        }
        .container {
          background: #3A3D4F;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        .btn {
          background-color: #5A5F73;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 8px;
          display: inline-block;
          margin-top: 10px;
        }
        .btn:hover {
          background-color: #73788E;
        }
      </style>
      <script>
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      </script>
    </head>
    <body>
      <div class="container">
        <h1>アップロード完了</h1>
        <p>${req.file.originalname} をアップロードしました。</p>
        <p>3秒後にホームへ戻ります。</p>
        <a href="/" class="btn">戻る</a>
      </div>
    </body>
    </html>
  `);
});

app.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  const fileStream = fs.createReadStream(filePath);
  fileStream.on('error', () => {
    res.status(404).send('File not found');
  });
  fileStream.pipe(res);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.get('/files', (req, res) => {
  const directoryPath = path.join(__dirname, 'uploads');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('ディレクトリの読み込み中にエラーが発生しました。');
    }
    res.json(files);
  });
});

app.delete('/delete/:fileName', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.fileName);
  
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ error: '削除に失敗しました' });
    }
    res.json({ message: 'ファイル削除成功' });
  });
});