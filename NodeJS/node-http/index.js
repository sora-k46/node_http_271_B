const http = require('http');
const hostname = 'localhost';
const port = 3000;

const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log('Requestfor' + req.url + 'bymethod' + req.method);
  if (req.method == 'GET') {
    var fileUrl;
    if (req.url == '/') fileUrl = '/index.html';
    else fileUrl = req.url;
    var filePath = path.resolve('./public' + fileUrl);
    const fileExt = path.extname(filePath);
    if (fileExt == '.html') {
      fs.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end('<html><body><h1>Error404:' + fileUrl + 'notfound</h1></body></html>');
          return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      res.statusCode = 404; 
      res.setHeader('Content-Type', 'text/html'); 
      res.end('<html><body><h1>Error404:' + req.method + 'notsupported</h1></body></html>');
    }
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});