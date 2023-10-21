const http = require("http");
const port = 8000;

const server = http.createServer((req, res) => {
  var splitUrl = (req.url).split("/");
  if (splitUrl[1] === "html") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(`
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>
        <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
        <p> - Martin Fowler</p>

    </body>
    </html>
    `);
    res.end();
  } else if (splitUrl[1] === "json") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.write(`{
        "slideshow": {
          "author": "Yours Truly",
          "date": "date of publication",
          "slides": [
            {
              "title": "Wake up to WonderWidgets!",
              "type": "all"
            },
            {
              "items": [
                "Why <em>WonderWidgets</em> are great",
                "Who <em>buys</em> WonderWidgets"
              ],
              "title": "Overview",
              "type": "all"
            }
          ],
          "title": "Sample Slide Show"
        }
      }`);
    res.end();
  } else if (splitUrl[1] === "uuid") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.write(`
      {
        "uuid": "14d96bb1-5d53-472f-a96e-b3a1fa82addd"
      }
    `);
    res.end();
  } else if (splitUrl[1] === "status") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(`Return a response with ${splitUrl[2]} status code`);
    res.end();
  } else if (splitUrl[1] === "delay") {
    const delay_in_seconds = parseInt(splitUrl[2]);

    if (!isNaN(delay_in_seconds)) {
      setTimeout(() => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(`Delayed response after ${delay_in_seconds} seconds`);
      }, delay_in_seconds * 1000);
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(`Bad Request. Invalid delay time.`);
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
