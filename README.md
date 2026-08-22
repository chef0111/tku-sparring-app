<div align="center">
  <img width="100%" alt="banner" src="https://res.cloudinary.com/chef0111/image/upload/v1787220441/kyorbit/platform-banner.webp" />
</div>

<div align="center">

[![TanStack Start](https://shieldcn.dev/badge/TanStack_Start-0092B8.svg?logo=tanstack&logoColor=white&variant=branded)](https://tanstack.com/start)
[![Tailwind CSS](https://shieldcn.dev/badge/Tailwind_CSS-38BDF8.svg?logo=tailwindcss&logoColor=white&variant=branded)](https://tailwindcss.com)
[![shadcn/ui](https://shieldcn.dev/badge/shadcn%2Fui-000000.svg?logo=shadcnui&logoColor=white&variant=branded)](https://ui.shadcn.com#gh-light-mode-only)
[![shadcn/ui](https://shieldcn.dev/badge/shadcn%2Fui-ffffff.svg?logo=shadcnui&logoColor=black&variant=branded)](https://ui.shadcn.com#gh-dark-mode-only)
[![PostgreSQL](https://shieldcn.dev/badge/PostgreSQL-316192.svg?logo=postgresql&logoColor=white&variant=branded)](https://www.postgresql.org)
[![AGPL-3.0 License](https://shieldcn.dev/github/license/kyorbit/platform.svg?variant=secondary)](./LICENSE)

</div>

<p align="center">
  <a href="https://kyorbit.tku.io.vn"><strong>Get started</strong></a>
  &nbsp;•&nbsp;
  <a href="./DEVELOPMENT.md"><strong>Local setup</strong></a>
  &nbsp;•&nbsp;
  <a href="./LICENSE"><strong>License</strong></a>
</p>

---

## Overview

Kyorbit is a tournament operations platform for Taekwondo UIT. It combines an admin CRM for managing tournaments, athletes, divisions, and brackets with an arena client for live match scoring on the floor.

---

## Getting started

### Option 1: Direct access (limited)

Open [Kyorbit](https://kyorbit.tku.io.vn) in a browser. Production account creation is disabled for now — apologies for the inconvenience.

### Option 2: Run locally (recommended)

See [DEVELOPMENT.md](./DEVELOPMENT.md) for full setup. Local installs support account creation and the full feature set.

---

## Features

### Admin CRM

| Feature                        | Description                                                                                                                  |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Operations hub                 | Cross-tournament KPIs, status pipeline, and recent tournaments at `/dashboard`                                               |
| Command center                 | Per-tournament monitoring, setup checklist, and lifecycle actions; editing stays in the builder                              |
| Global athlete registry        | CRUD for **AthleteProfile** records, de-dup validation, filters, and bulk add to tournaments                                 |
| Tournament builder — Divisions | Constraint-based auto-assign, manual drag-and-drop, out-of-range warnings, per-division third-place toggle, arena assignment |
| Tournament builder — Brackets  | Single-elimination bracket canvas, shuffle, seed locks, custom matches, corner swap, match detail panel                      |
| Bracket export & fullscreen    | Fit-to-content PNG screenshot and immersive fullscreen view of the bracket canvas                                            |
| Match results & lifecycle      | Best-of-three round wins, Draft → Active → Completed transitions, manual winner overrides with audit trail                   |
| Audit log                      | Per-tournament activity for score edits, reseeds, division changes, and manual overrides                                     |

### Arena client

| Feature             | Description                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| Advance Settings    | Select tournament, division, and match before a bout; per-device restore of last selection                  |
| Arena match claim   | One device per match at a time (30-minute claim TTL); other devices see matches as in use                   |
| Tournament realtime | Socket.io invalidation keeps Advance Settings and bracket views in sync across devices                      |
| Live scoring        | Full-screen scoreboard with round timer, technique scoring, health and mana, and gam-jeom penalties         |
| Round & match flow  | Automatic round-end submission, Finish Match to finalize, then return to Advance Settings (no auto-advance) |
| Offline tolerance   | Scoring continues locally when connectivity drops; syncs on reconnect                                       |

---

## Restrictions

| Restriction       | Details                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| Scoring disabled  | Match not started, timer paused, break time active, player health = 0, time expired, max rounds reached |
| Penalty rules     | Max 5 penalties per player, penalties reduce mana, match ends if mana = 0                               |
| Winner determined | Health depletion (KO) → Mana depletion → Remaining health → Fewer penalties → Technique points          |

> [!NOTE]
>
> - You can still operate a match without configuration
> - The timer must be started before using scoring features
> - You cannot reset the previous round's stats during break time
> - The system is web-based and **only supports PC resolution**

---

## Community

Kyorbit is built around the people who train, compete, officiate, and organize Taekwondo UIT events.

- Join us on [Facebook](https://www.facebook.com/uittaekwondo) to explore our daily activities.
- Follow us on [GitHub](https://github.com/kyorbit) to get updated, share feedback, and help improve the tools that support the sport.

---

## License

Licensed under the [AGPL-3.0 License](./LICENSE).
