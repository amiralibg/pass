import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createApp } from './server/app.mjs'
import { attachWebSocket } from './server/ws.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distRoot = path.resolve(__dirname, 'dist')
const port = Number(process.env.PORT || 3000)
const host = process.env.HOSTNAME || '0.0.0.0'

const app = createApp({
  distRoot,
  corsOrigin: process.env.CORS_ORIGIN,
})

const server = http.createServer(app)

attachWebSocket(server)
  .then(() => {
    server.listen(port, host, () => {
      console.log(`Pass listening on http://${host}:${port}`)
    })
  })
  .catch((err) => {
    console.error('Failed to start WebSocket server', err)
    process.exit(1)
  })
