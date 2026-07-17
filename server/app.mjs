import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  createRoom,
  getRoom,
  normalizeRoomCodeSafe,
  startRoomSweeper,
} from './rooms-api.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * @param {{ distRoot: string, corsOrigin?: string }} opts
 */
export function createApp(opts) {
  const app = express()
  const origins = (opts.corsOrigin || process.env.CORS_ORIGIN || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  app.use(
    cors({
      origin: origins.length ? origins : true,
    }),
  )
  app.use(express.json({ limit: '32kb' }))

  app.get('/health', (_req, res) => {
    res.type('text/plain').send('ok')
  })

  app.post('/api/rooms', (_req, res) => {
    const room = createRoom()
    res.status(201).json({ code: room.code })
  })

  app.get('/api/rooms/:code', (req, res) => {
    const code = normalizeRoomCodeSafe(req.params.code)
    const room = getRoom(code)
    if (!room) {
      res.status(404).json({ exists: false })
      return
    }
    res.json({
      exists: true,
      code: room.code,
      playerCount: room.players.length,
      phase: room.phase,
      gameId: room.gameId,
    })
  })

  const dist = opts.distRoot
  app.use(
    express.static(dist, {
      index: false,
      setHeaders(res, filePath) {
        if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        }
      },
    }),
  )

  app.get('/{*path}', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/ws')) {
      next()
      return
    }
    res.sendFile(path.join(dist, 'index.html'), (err) => {
      if (err) next(err)
    })
  })

  startRoomSweeper()
  return app
}

export { __dirname }
