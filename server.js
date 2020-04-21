// server.js
const express = require('express');
const bodyParser = require('body-parser');
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  server.all("*", (req, res) => {
    // if (req) {
      // console.log(req.headers);
      // console.log(res);
    // }
    console.log(req.headers);
    console.log(req.body);
    console.log(res.body)
    return handle(req, res);
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
