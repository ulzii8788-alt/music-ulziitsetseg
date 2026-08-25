// Жижиг локал вэб сервер — downloads.html дотор Харах/Засах ажиллуулахад хэрэгтэй.
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8123;
const ROOT = __dirname;

const MIME = {
  '.html':'text/html; charset=utf-8', '.htm':'text/html; charset=utf-8',
  '.js':'application/javascript; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.json':'application/json; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg',
  '.jpeg':'image/jpeg', '.gif':'image/gif', '.svg':'image/svg+xml',
  '.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.pdf':'application/pdf', '.txt':'text/plain; charset=utf-8'
};

http.createServer((req, res) => {
  try {
    let url = decodeURIComponent(req.url.split('?')[0]);
    if (url === '/') url = '/index.html';
    const fp = path.join(ROOT, url);
    if (!fp.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }
    if (!fs.existsSync(fp) || fs.statSync(fp).isDirectory()) {
      res.writeHead(404); return res.end('Not found: '+url);
    }
    const ext = path.extname(fp).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });
    fs.createReadStream(fp).pipe(res);
  } catch (e) {
    res.writeHead(500); res.end(String(e));
  }
}).listen(PORT, () => {
  const url = `http://localhost:${PORT}/downloads.html`;
  console.log(`\n  ✅ Сервер асав: ${url}\n  Зогсоохдоо: Ctrl+C эсвэл цонхыг хаах\n`);
  const cmd = process.platform === 'win32' ? `start "" "${url}"` : `xdg-open "${url}"`;
  exec(cmd);
});
