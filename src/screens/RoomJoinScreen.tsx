import { useEffect, useState } from 'react'
import { Link2, Plus, Users } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Screen } from '../components/ui/Screen'
import { TopBar } from '../components/ui/TopBar'
import { ONLINE_GAME_IDS } from '../games/registry'
import type { GameId } from '../games/types'
import { useT } from '../i18n/useT'
import type { MessageKey } from '../i18n/messages'
import { useRoom } from '../room/store'
import { readSessionIdentity, type OnlineGameId } from '../room/types'
import { useSession } from '../store/session'

type Step = 'name' | 'room'

const gameNameKey: Record<OnlineGameId, MessageKey> = {
  impostor: 'games.impostor.name',
  spy: 'games.spy.name',
  likely: 'games.likely.name',
}

function asOnlineGameId(id: GameId | null): OnlineGameId {
  if (id && (ONLINE_GAME_IDS as string[]).includes(id)) return id as OnlineGameId
  return 'impostor'
}

export function RoomJoinScreen() {
  const t = useT()
  const goHome = useSession((s) => s.goHome)
  const openRoomLobby = useSession((s) => s.openRoomLobby)
  const selectedGameId = useSession((s) => s.selectedGameId)
  const status = useRoom((s) => s.status)
  const error = useRoom((s) => s.error)
  const pub = useRoom((s) => s.public)
  const createAndJoin = useRoom((s) => s.createAndJoin)
  const join = useRoom((s) => s.join)
  const clearError = useRoom((s) => s.clearError)
  const bootstrapFromUrl = useRoom((s) => s.bootstrapFromUrl)
  const createGameId = asOnlineGameId(selectedGameId)

  const stored = readSessionIdentity()
  const urlCode = bootstrapFromUrl()
  /** Arrived via /r/CODE — join only, no create. */
  const isInvite = Boolean(urlCode)
  const initialName = stored.name || ''
  const [step, setStep] = useState<Step>(() =>
    urlCode && initialName.trim() ? 'room' : 'name',
  )
  const [name, setName] = useState(initialName)
  const [code, setCode] = useState(urlCode || '')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (status === 'joined' && pub) {
      openRoomLobby()
    }
  }, [status, pub, openRoomLobby])

  const onContinueName = () => {
    if (!name.trim()) return
    clearError()
    setStep('room')
  }

  const onCreate = async () => {
    clearError()
    setBusy(true)
    try {
      await createAndJoin(name, createGameId)
    } finally {
      setBusy(false)
    }
  }

  const onJoin = () => {
    clearError()
    join(isInvite ? urlCode! : code, name)
  }

  const onBack = () => {
    if (step === 'room') {
      clearError()
      setStep('name')
      return
    }
    goHome()
  }

  return (
    <Screen>
      <TopBar
        title={isInvite ? t('room.join.inviteTitle') : t('room.join.title')}
        onBack={onBack}
      />

      {step === 'name' ? (
        <>
          {!isInvite && (
            <p className="label-caps text-sm font-medium text-mint">
              {t('room.join.stepName')}
            </p>
          )}
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">
            {t('room.join.nameHeading')}
          </h2>
          <p className="mt-2 text-fog-dim">
            {isInvite
              ? t('room.join.inviteNameHint', { code: urlCode! })
              : t('room.join.nameHint')}
          </p>

          <label className="mt-8 block">
            <span className="label-caps text-sm font-medium text-fog-mute">
              {t('room.join.yourName')}
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={24}
              autoFocus
              placeholder={t('room.join.namePlaceholder')}
              className="mt-2 w-full rounded-2xl border border-fog/12 bg-ink/40 px-4 py-3.5 text-lg text-fog outline-none focus:border-mint/50"
              onKeyDown={(e) => {
                if (e.key === 'Enter') onContinueName()
              }}
            />
          </label>

          <div className="mt-auto pt-10">
            <Button
              className="w-full"
              size="xl"
              disabled={!name.trim()}
              onClick={onContinueName}
            >
              {isInvite ? t('room.join.continueToJoin') : t('room.join.continue')}
            </Button>
          </div>
        </>
      ) : isInvite ? (
        <>
          <p className="label-caps text-sm font-medium text-mint">
            {t('room.join.inviteEyebrow')}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">
            {t('room.join.inviteHeading')}
          </h2>
          <p className="mt-2 text-fog-dim">
            {t('room.join.inviteHint', { name: name.trim() })}
          </p>

          <div className="mt-8 rounded-[1.75rem] border border-mint/30 bg-mint/10 px-5 py-6 text-center">
            <p className="label-caps text-sm font-medium text-mint">
              {t('room.join.roomCode')}
            </p>
            <p className="mt-2 font-display text-5xl font-extrabold tracking-[0.2em] text-fog">
              {urlCode}
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-10">
            <Button
              className="w-full"
              size="xl"
              disabled={status === 'connecting'}
              onClick={onJoin}
            >
              <Link2 className="size-5" />
              {t('room.join.join')}
            </Button>
          </div>

          {status === 'connecting' && (
            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-fog-mute">
              <Users className="size-4 animate-pulse" />
              {t('room.join.connecting')}
            </p>
          )}

          {error && (
            <p className="mt-4 rounded-2xl border border-spark/30 bg-spark/10 px-4 py-3 text-sm text-spark">
              {error}
            </p>
          )}
        </>
      ) : (
        <>
          <p className="label-caps text-sm font-medium text-mint">
            {t('room.join.stepRoom')}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">
            {t('room.join.roomHeading')}
          </h2>
          <p className="mt-2 text-fog-dim">
            {t('room.join.roomHint', { name: name.trim() })}
          </p>
          <p className="mt-3 text-sm font-medium text-mint">
            {t(gameNameKey[createGameId])}
          </p>

          <div className="mt-8 space-y-3">
            <Button
              className="w-full"
              size="xl"
              disabled={busy || status === 'connecting'}
              onClick={onCreate}
            >
              <Plus className="size-5" />
              {t('room.join.create')}
            </Button>

            <div className="relative py-2 text-center text-sm text-fog-mute">
              <span className="relative z-10 bg-transparent px-3">{t('room.join.or')}</span>
            </div>

            <label className="block">
              <span className="label-caps text-sm font-medium text-fog-mute">
                {t('room.join.roomCode')}
              </span>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                maxLength={4}
                autoFocus
                placeholder="AB12"
                className="mt-2 w-full rounded-2xl border border-fog/12 bg-ink/40 px-4 py-3.5 font-display text-2xl tracking-[0.35em] text-fog uppercase outline-none focus:border-mint/50"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && code.trim().length >= 4) onJoin()
                }}
              />
            </label>

            <Button
              className="w-full"
              size="xl"
              variant="secondary"
              disabled={status === 'connecting' || code.trim().length < 4}
              onClick={onJoin}
            >
              <Link2 className="size-5" />
              {t('room.join.join')}
            </Button>
          </div>

          {status === 'connecting' && (
            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-fog-mute">
              <Users className="size-4 animate-pulse" />
              {t('room.join.connecting')}
            </p>
          )}

          {error && (
            <p className="mt-4 rounded-2xl border border-spark/30 bg-spark/10 px-4 py-3 text-sm text-spark">
              {error}
            </p>
          )}
        </>
      )}
    </Screen>
  )
}
