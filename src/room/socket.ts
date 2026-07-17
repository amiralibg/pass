import type { ClientMessage, ServerMessage } from './types'

type Handler = (msg: ServerMessage) => void

function wsUrl() {
  const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  return `${proto}//${window.location.host}/ws`
}

export class RoomSocket {
  private ws: WebSocket | null = null
  private handlers = new Set<Handler>()
  private queue: ClientMessage[] = []
  private intentionalClose = false

  connect() {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return
    }
    this.intentionalClose = false
    const ws = new WebSocket(wsUrl())
    this.ws = ws

    ws.onopen = () => {
      const pending = this.queue
      this.queue = []
      for (const msg of pending) this.send(msg)
    }

    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(String(ev.data)) as ServerMessage
        for (const h of this.handlers) h(msg)
      } catch {
        /* ignore */
      }
    }

    ws.onclose = () => {
      this.ws = null
      if (!this.intentionalClose) {
        window.setTimeout(() => this.connect(), 1200)
      }
    }
  }

  onMessage(handler: Handler) {
    this.handlers.add(handler)
    return () => this.handlers.delete(handler)
  }

  send(msg: ClientMessage) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      this.queue.push(msg)
      this.connect()
      return
    }
    this.ws.send(JSON.stringify(msg))
  }

  close() {
    this.intentionalClose = true
    this.queue = []
    this.ws?.close()
    this.ws = null
  }
}

export const roomSocket = new RoomSocket()
