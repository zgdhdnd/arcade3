# Project 2 writeup: 2048 and a published package

> **Draft.** The technical answers describe what is in the code. Answers marked _TODO_ are about your own experience; write those yourself. The AI-use answer must stay accurate.

## Links

- Live application: _TODO_
- Arcade repository: _TODO_
- arcade-core repository: _TODO_
- npm package: https://www.npmjs.com/package/@jakechen/arcade-core
- Demo video: _TODO_
- Lighthouse screenshot: _TODO_ (a local run of the production build scored 100 for accessibility on every route)

## Extra credit attempted

- **Save state**: the board, score, best score and seed are saved to `localStorage` after every move and restored on load.
- **Tile moving animation**: tiles keep their DOM element through a keyed each block and slide with a CSS transform transition. Merged and new tiles pop in with Svelte's `scale` transition.
- **Seed generator**: every game has a seed, and typing one in replays exactly the same spawns. This uses `seededRng` from the package.
- **Mobile swipe**: swiping the board moves the tiles. The on-screen arrows are still there for anyone who prefers buttons.
- **TypeScript**: the package and the app are written entirely in TypeScript (including `vite.config.ts`), with no `.js` source files.

## What went into the package and what stayed in the app? Describe one thing you were unsure about, and how you decided.

The package holds only the rules of 2048: sliding and merging (`move`/`slide`), adding a tile (`spawn`), and checking for legal moves (`canMove`, `hasMoves`), plus a seeded random number generator. Everything it does is a pure function on a plain array of numbers, so it has no idea Svelte, the DOM or `localStorage` exist, and its tests run in plain Node. The app keeps everything about presentation and a single session: tile ids for the keyed each block, the running score and best score, which seed is in use, saving to `localStorage`, and the screen reader announcements. The thing I was unsure about was scoring. The brief replaced `score` with `canMove`, but the game still needs to know how many points a move earned, and recomputing that in the app would mean re-implementing the merge rules there. I decided to add `slide()`, which returns the new board along with the points earned and where each tile went. That way the rules stay in one place, `move()` is just a thin wrapper around it, and the app gets what it needs for scoring and animation without the package knowing about either.

## Pros and cons of moving Project 1 to Svelte versus keeping it as plain HTML/CSS

The main gain was removing repetition: the header and footer were copied into all four HTML files, and now they are one component each. The nav also highlights the current page by itself instead of needing a hand-written `aria-current` on every page. The crossword grid used to be 25 hand-written inputs with hand-written aria-labels. Now it is generated from five answer strings, so the numbering and labels can't drift out of sync with the answers. Moving the "Solved!" check from a CSS `:has()` trick to a `$derived` value also lets it live in a real status region that screen readers announce, and adds a squares-filled counter. On the downside, the site now needs Node, a build step and a static adapter to deploy, where before any folder of files worked. Pages that are mostly text, like About and Contact, gained very little and are arguably harder to edit as components.

## Juggling a library and an app: how do you keep them in sync?

The package follows semantic versioning. Its CHANGELOG records each release, and the app depends on `^1.1.0`, so it picks up fixes and new features but never a breaking 2.0. `npm publish` runs `prepublishOnly`, which compiles the TypeScript and runs the test suite against the compiled `dist/` files, so a broken build can't be published. The package ships its own type definitions, so if an API change would break the app, `npm run check` in the app catches it at compile time. Before publishing a change, I can run `npm pack` and install the tarball into the app to try it there, then switch back to the registry version once it is published. I never use `npm link`, which would break deploys.

## What issues did you have learning Svelte? Do you feel you've mastered it? Did it make the work easier?

_TODO: your own answer (at least three sentences)._

## Given more time, what would you add?

I would add an undo button, which is easy because every board is an immutable value from the package. I'd also like a choice of board size (`createBoard` already takes a size, so most of the work would be in the page) and a short tutorial for first-time players. A dark theme that reuses the colour ramp would be a nice addition, along with a shared high-score table, which would need a small backend.

## How many hours did you spend?

_TODO_

## (Optional) Assumptions

- Reaching 2048 shows a win screen once. After "Keep playing", the game continues until no moves are left.
- The on-screen arrows are shown on touch screens (`pointer: coarse`) and on windows narrower than 40rem, which covers phones in both orientations.
- Pages use trailing-slash URLs (`/2048/`) so the prerendered `index.html` files work on any static host.
- The old `/game/` URL from Project 1 is now `/crossword/`.

## Code, design or packages taken from elsewhere, including AI use

- **AI:** _TODO: describe accurately how you used AI._ This project was scaffolded and largely written with Claude Code (Anthropic's AI coding assistant), including the package, the Svelte port and the 2048 page.
- **Packages:** SvelteKit, Svelte 5, Vite, `@sveltejs/adapter-static`, TypeScript and svelte-check.
- **Algorithms:** the seeded random generator is mulberry32 (public domain, Tommy Ettinger).
- **Design:** 2048 is Gabriele Cirulli's game. The rules come from the assignment brief, and no code was taken from the original. The colour ramp, layout and illustrations were made for this site.
