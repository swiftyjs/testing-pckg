const fs = require('fs');
const http = require('http');
const path = require('path');

function createSwiftyTestServer() {
// Read the index.html file
const indexPath = 'src/pages/index.html'; // Adjusted path for the index.html file
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Regular expression to match HTML elements in the body
const elementRegex = /<([a-zA-Z0-9_-]+)><\/\1>/g;

// Find all matches in the indexContent
const matches = indexContent.match(elementRegex);

// Process each match
if (matches) {
  matches.forEach((match) => {
    // Extract the element name from the match
    const elementName = match.match(/[a-zA-Z0-9_-]+/)[0].toLowerCase(); // Ensure the element name is lowercase

    // Read the content of the corresponding HTML, CSS, JS, image, or other file
    let elementFilePath;
    switch (elementName) {
      case 'styles':
        elementFilePath = 'src/styles/mainstyle.css';
        break;
      case 'scripts':
        elementFilePath = 'src/scripts/mainscript.js';
        break;
      case 'images':
        elementFilePath = 'src/images/mainimage.jpg'; // Adjust the image file path as needed
        break;
      case 'fonts':
        elementFilePath = 'src/fonts/mainfont.woff'; // Adjust the font file path as needed
        break;
      case 'icons':
        elementFilePath = 'src/icons/mainicon.svg'; // Adjust the icon file path as needed
        break;
      case 'vendor':
        elementFilePath = 'src/vendor/vendorLibrary.js'; // Adjust the vendor library file path as needed
        break;
      case 'data':
        elementFilePath = 'src/data/data.json'; // Adjust the data file path as needed
        break;
      case 'config':
        elementFilePath = 'src/config/config.json'; // Adjust the config file path as needed
        break;
      case 'audio':
        elementFilePath = 'src/audio/mainaudio.mp3'; // Adjust the audio file path as needed
        break;
      case 'video':
        elementFilePath = 'src/video/mainvideo.mp4'; // Adjust the video file path as needed
        break;
      case 'documents':
        elementFilePath = 'src/documents/maindocument.pdf'; // Adjust the document file path as needed
        break;
      case 'tests':
        elementFilePath = 'src/tests/maintest.js'; // Adjust the test file path as needed
        break;
      default:
        elementFilePath = `src/library/${elementName}.html`;
    }

    try {
      const elementContent = fs.readFileSync(elementFilePath, 'utf8');

      // Replace the match in indexContent with the content of the file
      indexContent = indexContent.replace(match, elementContent);
    } catch (error) {
      console.error(`Error reading file for element ${elementName}:`, error.message);
    }
  });
}

// Create an HTTP server
const server = http.createServer((req, res) => {
  const requestedPath = path.join(__dirname, 'src', req.url); // Adjusted path for requested files

  // Check if the requested path is for common asset directories
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
        contentType = 'image/jpeg'; // Adjust content type based on your image format
      } else if (req.url.startsWith('/fonts')) {
        contentType = 'application/font-woff'; // Adjust content type based on your font format
      } else if (req.url.startsWith('/icons')) {
        contentType = 'image/svg+xml'; // Adjust content type based on your icon format
      } else if (req.url.startsWith('/vendor')) {
        contentType = 'application/javascript'; // Adjust content type based on your vendor library format
      } else if (req.url.startsWith('/data')) {
        contentType = 'application/json'; // Adjust content type based on your data format
      } else if (req.url.startsWith('/config')) {
        contentType = 'application/json'; // Adjust content type based on your config format
      } else if (req.url.startsWith('/audio')) {
        contentType = 'audio/mpeg'; // Adjust content type based on your audio format
      } else if (req.url.startsWith('/video')) {
        contentType = 'video/mp4'; // Adjust content type based on your video format
      } else if (req.url.startsWith('/documents')) {
        contentType = 'application/pdf'; // Adjust content type based on your document format
      } else if (req.url.startsWith('/tests')) {
        contentType = 'application/javascript'; // Adjust content type based on your test file format
      }
      res.setHeader('Content-Type', contentType);
      res.end(fileContent, 'binary');
      return;
    } catch (error) {
      // File not found
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    }
  } else {
    // Set the Content-Type header to HTML for other files
    res.setHeader('Content-Type', 'text/html');

    // Send the modified HTML as the response
    res.end(indexContent);
  }
});

// Listen on port 3000 (you can change this to any port you prefer)
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
}

module.exports = createSwiftyTestServer;