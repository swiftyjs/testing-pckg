const fs = require('fs');
const http = require('http');
const path = require('path');

function createSwiftyTestServer() {
  const PORT = 3000;

  try {
    console.log(`Initializing Swifty.js server at port ${PORT} ...`);

    setInterval(() => {
      const indexPath = 'src/pages/index.html';
      let indexContent = fs.readFileSync(indexPath, 'utf8');

      const elementRegex = /<([a-zA-Z0-9_-]+)><\/\1>/g;

      const matches = indexContent.match(elementRegex);

      if (matches) {
        matches.forEach((match) => {
          const elementName = match.match(/[a-zA-Z0-9_-]+/)[0].toLowerCase();

          let elementFilePath;
          switch (elementName) {
            case 'styles':
              elementFilePath = 'src/styles/mainstyle.css';
              break;
            case 'scripts':
              elementFilePath = 'src/scripts/mainscript.js';
              break;
            case 'images':
              elementFilePath = 'src/images/mainimage.jpg';
              break;
            case 'fonts':
              elementFilePath = 'src/fonts/mainfont.woff';
              break;
            case 'icons':
              elementFilePath = 'src/icons/mainicon.svg';
              break;
            case 'vendor':
              elementFilePath = 'src/vendor/vendorLibrary.js';
              break;
            case 'data':
              elementFilePath = 'src/data/data.json';
              break;
            case 'config':
              elementFilePath = 'src/config/config.json';
              break;
            case 'audio':
              elementFilePath = 'src/audio/mainaudio.mp3';
              break;
            case 'video':
              elementFilePath = 'src/video/mainvideo.mp4';
              break;
            case 'documents':
              elementFilePath = 'src/documents/maindocument.pdf';
              break;
            case 'tests':
              elementFilePath = 'src/tests/maintest.js';
              break;
            default:
              elementFilePath = `src/library/${elementName}.html`;
          }

          try {
            const elementContent = fs.readFileSync(elementFilePath, 'utf8');

            indexContent = indexContent.replace(match, elementContent);
          } catch (error) {
            console.error(`Error reading file for element ${elementName}:`, error.message);
          }
        });
      }

      const server = http.createServer((req, res) => {
        const requestedPath = path.join(__dirname, 'src', req.url);

        if (
          req.url.startsWith('/styles') ||
          req.url.startsWith('/scripts') ||
          req.url.startsWith('/images') ||
          req.url.startsWith('/fonts') ||
          req.url.startsWith('/icons') ||
          req.url.startsWith('/vendor') ||
          req.url.startsWith('/data') ||
          req.url.startsWith('/config') ||
          req.url.startsWith('/audio') ||
          req.url.startsWith('/video') ||
          req.url.startsWith('/documents') ||
          req.url.startsWith('/tests')
        ) {
          try {
            const fileContent = fs.readFileSync(requestedPath);
            let contentType;
            if (req.url.startsWith('/styles')) {
              contentType = 'text/css';
            } else if (req.url.startsWith('/scripts')) {
              contentType = 'application/javascript';
            } else if (req.url.startsWith('/images')) {
              contentType = 'image/jpeg';
            } else if (req.url.startsWith('/fonts')) {
              contentType = 'application/font-woff';
            } else if (req.url.startsWith('/icons')) {
              contentType = 'image/svg+xml';
            } else if (req.url.startsWith('/vendor')) {
              contentType = 'application/javascript';
            } else if (req.url.startsWith('/data')) {
              contentType = 'application/json';
            } else if (req.url.startsWith('/config')) {
              contentType = 'application/json';
            } else if (req.url.startsWith('/audio')) {
              contentType = 'audio/mpeg';
            } else if (req.url.startsWith('/video')) {
              contentType = 'video/mp4';
            } else if (req.url.startsWith('/documents')) {
              contentType = 'application/pdf';
            } else if (req.url.startsWith('/tests')) {
              contentType = 'application/javascript';
            }
            res.setHeader('Content-Type', contentType);
            res.end(fileContent, 'binary');
            return;
          } catch (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
          }
        } else {
          res.setHeader('Content-Type', 'text/html');

          res.end(indexContent);
        }
      });

      server.listen(PORT);

      setTimeout(() => {
        server.close();
      }, 1500);
    }, 1500);
  } catch (error) {
    console.log('Swifty.js server could not be initialized')
  } finally {
    console.log(`
Swifty.js server is currently running at port ${PORT}.

Press Ctrl + C to stop running the server.`)
  }
}

module.exports = createSwiftyTestServer;
