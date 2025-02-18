"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
exports.app = (0, express_1.default)();
var upload = (0, multer_1.default)({ dest: 'uploads/' });
exports.app.use(express_1.default.static('public'));
exports.app.post('/upload', upload.single('pdf'), function (req, res) {
    if (!req.file) {
        return res.send("\n      <html>\n      <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        <title>\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u5931\u6557</title>\n        <style>\n          body {\n            background-color: #2C2E3E;\n            color: #ffffff;\n            font-family: 'Inter', sans-serif;\n            display: flex;\n            flex-direction: column;\n            justify-content: center;\n            align-items: center;\n            height: 100vh;\n            text-align: center;\n          }\n          .container {\n            background: #3A3D4F;\n            padding: 20px;\n            border-radius: 12px;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);\n          }\n          .btn {\n            background-color: #5A5F73;\n            color: white;\n            text-decoration: none;\n            padding: 10px 20px;\n            border-radius: 8px;\n            display: inline-block;\n            margin-top: 10px;\n          }\n          .btn:hover {\n            background-color: #73788E;\n          }\n        </style>\n      </head>\n      <body>\n        <div class=\"container\">\n          <h1>\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u306B\u5931\u6557\u3057\u307E\u3057\u305F</h1>\n          <p>\u30D5\u30A1\u30A4\u30EB\u304C\u9078\u629E\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002</p>\n          <a href=\"/\" class=\"btn\">\u623B\u308B</a>\n        </div>\n      </body>\n      </html>\n    ");
    }
    res.send("\n    <html>\n    <head>\n      <meta charset=\"UTF-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n      <title>\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u6210\u529F</title>\n      <style>\n        body {\n          background-color: #2C2E3E;\n          color: #ffffff;\n          font-family: 'Inter', sans-serif;\n          display: flex;\n          flex-direction: column;\n          justify-content: center;\n          align-items: center;\n          height: 100vh;\n          text-align: center;\n        }\n        .container {\n          background: #3A3D4F;\n          padding: 20px;\n          border-radius: 12px;\n          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);\n        }\n        .btn {\n          background-color: #5A5F73;\n          color: white;\n          text-decoration: none;\n          padding: 10px 20px;\n          border-radius: 8px;\n          display: inline-block;\n          margin-top: 10px;\n        }\n        .btn:hover {\n          background-color: #73788E;\n        }\n      </style>\n      <script>\n        setTimeout(() => {\n          window.location.href = \"/\";\n        }, 3000);\n      </script>\n    </head>\n    <body>\n      <div class=\"container\">\n        <h1>\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u5B8C\u4E86</h1>\n        <p>".concat(req.file.originalname, " \u3092\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u3057\u307E\u3057\u305F\u3002</p>\n        <p>3\u79D2\u5F8C\u306B\u30DB\u30FC\u30E0\u3078\u623B\u308A\u307E\u3059\u3002</p>\n        <a href=\"/\" class=\"btn\">\u623B\u308B</a>\n      </div>\n    </body>\n    </html>\n  "));
});
exports.app.get('/download/:filename', function (req, res) {
    var filePath = path_1.default.join(__dirname, 'uploads', req.params.filename);
    var fileStream = fs_1.default.createReadStream(filePath);
    fileStream.on('error', function () {
        res.status(404).send('File not found');
    });
    fileStream.pipe(res);
});
exports.app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
exports.app.get('/files', function (req, res) {
    var directoryPath = path_1.default.join(__dirname, 'uploads');
    fs_1.default.readdir(directoryPath, function (err, files) {
        if (err) {
            return res.status(500).send('ディレクトリの読み込み中にエラーが発生しました。');
        }
        res.json(files);
    });
});
exports.app.delete('/delete/:fileName', function (req, res) {
    var filePath = path_1.default.join(__dirname, 'uploads', req.params.fileName);
    fs_1.default.unlink(filePath, function (err) {
        if (err) {
            return res.status(500).json({ error: '削除に失敗しました' });
        }
        res.json({ message: 'ファイル削除成功' });
    });
});
