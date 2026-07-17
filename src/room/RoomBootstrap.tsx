import { useEffect } from 'react'
import { useRoom } from '../room/store'
import { readSessionIdentity } from '../room/types'
import { useSession } from '../store/session'

/** Deep-link /r/CODE and sessionStorage reconnect on boot. */
export function RoomBootstrap() {
  const openRoomJoin = useSession((s) => s.openRoomJoin)
  const openRoomLobby = useSession((s) => s.openRoomLobby)
  const openRoomPlay = useSession((s) => s.openRoomPlay)
  const bootstrapFromUrl = useRoom((s) => s.bootstrapFromUrl)
  const reconnectFromStorage = useRoom((s) => s.reconnectFromStorage)
  const status = useRoom((s) => s.status)
  const pub = useRoom((s) => s.public)

  useEffect(() => {
    const code = bootstrapFromUrl()
    const stored = readSessionIdentity()

    if (code && stored.code === code && stored.playerId && stored.name) {
      openRoomJoin()
      reconnectFromStorage()
      return
    }

    if (code) {
      openRoomJoin()
    }
  }, [bootstrapFromUrl, openRoomJoin, reconnectFromStorage])

  useEffect(() => {
    if (status !== 'joined' || !pub) return
    if (
      pub.phase === 'reveal' ||
      pub.phase === 'discuss' ||
      pub.phase === 'vote' ||
      pub.phase === 'result'
    ) {
      openRoomPlay()
    } else {
      openRoomLobby()
    }
  }, [status, pub, openRoomLobby, openRoomPlay])

  return null
}
