import { useEffect, useState } from 'react'
import { Copy, Share2 } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Screen } from '../components/ui/Screen'
import { Stepper } from '../components/ui/Stepper'
import { TopBar } from '../components/ui/TopBar'
import { useT } from '../i18n/useT'
import type { MessageKey } from '../i18n/messages'
import { cn } from '../lib/cn'
import { useRoom } from '../room/store'
import { roomPath } from '../room/types'
import { usePrefs } from '../store/prefs'
import { useSession } from '../store/session'
import { WORD_PACKS, getPackWords, suggestedImpostorCount } from '../games/impostor/words'

const packNameKey: Record<string, MessageKey> = {
  everyday: 'packs.everyday',
  food: 'packs.food',
  places: 'packs.places',
  wild: 'packs.wild',
}

export function RoomLobbyScreen() {
  const t = useT()
  const goHome = useSession((s) => s.goHome)
  const openRoomPlay = useSession((s) => s.openRoomPlay)
  const openRoomJoin = useSession((s) => s.openRoomJoin)
  const locale = usePrefs((s) => s.locale)

  const pub = useRoom((s) => s.public)
  const status = useRoom((s) => s.status)
  const error = useRoom((s) => s.error)
  const name = useRoom((s) => s.name)
  const rename = useRoom((s) => s.rename)
  const updateSettings = useRoom((s) => s.updateSettings)
  const startRound = useRoom((s) => s.startRound)
  const leave = useRoom((s) => s.leave)

  const [copied, setCopied] = useState(false)
  const [nameDraft, setNameDraft] = useState(name)

  useEffect(() => {
    setNameDraft(name)
  }, [name])

  useEffect(() => {
    if (status === 'idle') {
      openRoomJoin()
      return
    }
    if (!pub) return
    if (pub.phase === 'reveal' || pub.phase === 'discuss' || pub.phase === 'vote' || pub.phase === 'result') {
      openRoomPlay()
    }
  }, [status, pub, openRoomPlay, openRoomJoin])

  if (!pub) {
    return (
      <Screen>
        <TopBar title={t('room.lobby.title')} onBack={goHome} />
        <p className="text-fog-dim">{t('room.join.connecting')}</p>
      </Screen>
    )
  }

  const settings = pub.game?.settings
  const players = pub.players
  const canStart = pub.youAreHost && players.length >= 3
  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${roomPath(pub.code)}`
      : roomPath(pub.code)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pass',
          text: t('room.lobby.shareText', { code: pub.code }),
          url: shareUrl,
        })
        return
      } catch {
        /* fall through */
      }
    }
    await copyLink()
  }

  const onLeave = () => {
    leave()
    goHome()
  }

  return (
    <Screen>
      <TopBar title={t('room.lobby.title')} onBack={onLeave} />

      <div className="rounded-[1.75rem] border border-mint/30 bg-mint/10 px-5 py-5 text-center">
        <p className="label-caps text-sm font-medium text-mint">{t('room.lobby.roomCode')}</p>
        <p className="mt-2 font-display text-5xl font-extrabold tracking-[0.2em] text-fog">
          {pub.code}
        </p>
        <p className="mt-3 text-sm text-fog-dim">{t('room.lobby.shareHint')}</p>
        <div className="mt-4 flex gap-2">
          <Button className="flex-1" variant="secondary" size="md" onClick={copyLink}>
            <Copy className="size-4" />
            {copied ? t('room.lobby.copied') : t('room.lobby.copyLink')}
          </Button>
          <Button className="flex-1" variant="secondary" size="md" onClick={share}>
            <Share2 className="size-4" />
            {t('room.lobby.share')}
          </Button>
        </div>
      </div>

      <label className="mt-6 block">
        <span className="label-caps text-sm font-medium text-fog-mute">
          {t('room.join.yourName')}
        </span>
        <div className="mt-2 flex gap-2">
          <input
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            maxLength={24}
            className="min-w-0 flex-1 rounded-2xl border border-fog/12 bg-ink/40 px-4 py-3 text-fog outline-none focus:border-mint/50"
          />
          <Button
            variant="secondary"
            size="md"
            disabled={!nameDraft.trim() || nameDraft.trim() === name}
            onClick={() => rename(nameDraft)}
          >
            {t('room.lobby.saveName')}
          </Button>
        </div>
      </label>

      <div className="mt-8">
        <p className="label-caps text-sm font-medium text-fog-mute">
          {t('room.lobby.players', { count: players.length })}
        </p>
        <ul className="mt-3 space-y-2">
          {players.map((p) => (
            <li
              key={p.id}
              className={cn(
                'flex items-center justify-between rounded-2xl border px-4 py-3',
                p.connected ? 'border-fog/10 bg-ink/30' : 'border-fog/5 bg-ink/15 opacity-60',
              )}
            >
              <span className="font-semibold text-fog">
                {p.name}
                {p.id === pub.hostId ? (
                  <span className="ms-2 text-xs font-medium text-mint">
                    {t('room.lobby.host')}
                  </span>
                ) : null}
              </span>
              <span className="text-xs text-fog-mute">
                {p.connected ? t('room.lobby.online') : t('room.lobby.away')}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {pub.youAreHost && settings && (
        <div className="mt-8 space-y-5">
          <div>
            <p className="label-caps text-sm font-medium text-fog-mute">
              {t('impostor.setup.wordPack')}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {WORD_PACKS.map((pack) => {
                const wordCount = getPackWords(pack.id, locale).length
                return (
                  <button
                    key={pack.id}
                    type="button"
                    onClick={() => updateSettings({ packId: pack.id, locale })}
                    className={cn(
                      'rounded-2xl border px-4 py-3 text-start transition-colors',
                      settings.packId === pack.id
                        ? 'border-gold/50 bg-gold/15 text-fog'
                        : 'border-fog/10 bg-ink/25 text-fog-dim hover:border-fog/20',
                    )}
                  >
                    <span className="block font-semibold text-fog">
                      {t(packNameKey[pack.id] ?? 'packs.everyday')}
                    </span>
                    <span className="mt-0.5 block text-xs text-fog-mute">
                      {t('impostor.setup.wordsCount', { count: wordCount })}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <p className="label-caps text-sm font-medium text-fog-mute">
              {t('impostor.setup.impostors')}
            </p>
            <p className="mt-1 text-sm text-fog-dim">
              {t('impostor.setup.summary', {
                count: players.length,
                suggested: suggestedImpostorCount(Math.max(players.length, 3)),
                plural: suggestedImpostorCount(Math.max(players.length, 3)) === 1 ? '' : 's',
              })}
            </p>
            <div className="mt-2 space-y-2">
              <Stepper
                label={t('impostor.setup.impostors')}
                hint={t('impostor.setup.impostorsHint')}
                value={settings.impostorCount}
                min={1}
                max={Math.max(1, players.length - 1)}
                onChange={(n) => updateSettings({ impostorCount: n })}
              />
              <Stepper
                label={t('impostor.setup.discussion')}
                hint={t('impostor.setup.discussionHint')}
                value={Math.round(settings.discussSeconds / 60)}
                min={1}
                max={5}
                suffix="m"
                onChange={(m) => updateSettings({ discussSeconds: m * 60 })}
              />
            </div>
          </div>
        </div>
      )}

      {!pub.youAreHost && (
        <p className="mt-8 text-center text-fog-dim">{t('room.lobby.waitingHost')}</p>
      )}

      {error && (
        <p className="mt-4 rounded-2xl border border-spark/30 bg-spark/10 px-4 py-3 text-sm text-spark">
          {error}
        </p>
      )}

      <div className="mt-auto flex flex-col gap-3 pt-8">
        {pub.youAreHost && (
          <Button className="w-full" size="xl" disabled={!canStart} onClick={startRound}>
            {t('room.lobby.start')}
          </Button>
        )}
        <Button className="w-full" variant="ghost" onClick={onLeave}>
          {t('room.lobby.leave')}
        </Button>
      </div>
    </Screen>
  )
}
