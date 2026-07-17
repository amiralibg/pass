# Pass — roadmap

## Now — new table games

- [x] **Story** — each player adds a line (sees only the previous one); reveal the full story at the end
- [x] **Know You** — couple / friend quiz: one person answers privately, others guess
- [x] **Likely** — Never Have I Ever + Most Likely modes, one phone around the table
- [x] Large bilingual dictionaries + `freshPick` anti-repeat for Story / Know You / Likely
- [x] Likely: Normal vs Spicy heat packs

## Next — Room multiplayer (beside table mode)

Keep **Table** as the core (one shared device). Add **Room** as a second path: create a room, share a link, everyone plays on their own phone.

### Product

- [x] Home entry: **Play at the table** vs **Play online (room)**
- [x] Create room → short code + shareable link (`/r/AB12`)
- [x] Join by code or link with display name (no accounts v1)
- [x] Host picks game + settings; host starts / advances rounds
- [x] Same games, different transport + UI (no “pass the phone”; private cards stay private) — Impostor online

### Backend

- [x] Small realtime server (Express + WebSockets / `ws`)
- [x] Authoritative room state on the server (secrets must not live only on clients)
- [x] Room TTL / cleanup for abandoned rooms
- [x] Reconnect: room code + player id in `sessionStorage`
- [x] Deploy API beside the Vite app (Dokploy)

### Client architecture

- [x] Split game **rules** from **where state lives**
- [x] Table mode: keep local Zustand (offline, no server)
- [x] Room mode: sync patches over WebSocket
- [x] Host-only actions vs private actions (see my role / my answer)

### Port games online (order)

- [x] Impostor first (private reveal + shared vote)
- [ ] Spy
- [ ] Hot Seat, Know You, Likely
- [ ] Story, Fuse (shared timer / turn assignment)

### Later polish

- [ ] Host migrate if host disconnects
- [ ] Optional accounts / saved nicknames
- [ ] Spectate / late join rules per game
