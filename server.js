/**
 * This custom server is to address a problem on Heroku in which a request
 * loop was happening that would hang up and crash the app.  For some
 * reason, this Next.js server is receiving GraphQL queries, and that creates
 * a loop of about 300 identical requests.
 * 
 * Returning a status 405 response stops this loop.
 * 
 * I recognize it would be ideal to fix whatever is sending this app the
 * GraphQL queries, but I haven't solved that.
 */

const express = require('express');
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express();

  server.post("/", (req, res) => {
    res.status(405).end();
  })

  server.all("*", (req, res) => {
    return handle(req, res);
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
