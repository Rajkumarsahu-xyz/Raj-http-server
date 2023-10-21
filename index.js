const express = require("express");
const app = express();
const port = 8001;

app.get("/html", (req, res) => {
  res.send(`
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
});

app.get("/json", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
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
  }));
});

app.get("/uuid", (req, res) => {
  res.json({
    "uuid": "14d96bb1-5d53-472f-a96e-b3a1fa82addd"
  });
});

app.get("/status/:code", (req, res) => {
  const status_code = parseInt(req.params.code);
  if(!isNaN(status_code)) {
    res.status(status_code).send(`Return a response with ${status_code} status code`);
  }else {
    res.status(400).send("Bad Request. Invalid delay time.");
  }
});

app.get("/delay/:seconds", (req, res) => {
  const delay_in_seconds = parseInt(req.params.seconds);

  if (!isNaN(delay_in_seconds)) {
    setTimeout(() => {
      res.send(`Delayed response after ${delay_in_seconds} seconds`);
    }, delay_in_seconds * 1000);
  } else {
    res.status(400).send("Bad Request. Invalid delay time.");
  }
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

