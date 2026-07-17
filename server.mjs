import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, 'dist')
const port = Number(process.env.PORT || 3000)
const host = process.env.HOSTNAME || '0.0.0.0'

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
}

function sendFile(res, filePath, reqPath) {
  const ext = path.extname(filePath)
  const headers = {
    'Content-Type': types[ext] || 'application/octet-stream',
  }
  if (reqPath.startsWith('/assets/')) {
    headers['Cache-Control'] = 'public, max-age=31536000, immutable'
  }
  res.writeHead(200, headers)
  fs.createReadStream(filePath).on('error', () => {
    if (!res.headersSent) res.writeHead(404)
    res.end('Not found')
  }).pipe(res)
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
  const pathname = decodeURIComponent(url.pathname)

  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('ok')
    return
  }

  const candidate = path.resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`)
  if (!candidate.startsWith(root + path.sep) && candidate !== root) {
    res.writeHead(403)
    res.end('Forbidden')
    return
  }

  fs.stat(candidate, (err, st) => {
    if (!err && st.isFile()) {
      sendFile(res, candidate, pathname)
      return
    }
    // SPA fallback for client routes
    sendFile(res, path.join(root, 'index.html'), pathname)
  })
})

server.listen(port, host, () => {
  console.log(`Pass listening on http://${host}:${port}`)
})
