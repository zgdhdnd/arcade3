# The Arcade

My personal site and the home for this semester's browser games, rebuilt in **SvelteKit** (Svelte 5) for Project 2. It has a landing page, the Dev Mini crossword from Project 1, a new **2048** game, an about page and a contact page.

The 2048 rules come from my own npm package, [`@jakechen/arcade-core`](https://www.npmjs.com/package/@jakechen/arcade-core) (repo: _add your arcade-core GitHub URL_), installed from the registry like any other dependency.

- Live site: _add your deployed URL here_
- Package: https://www.npmjs.com/package/@jakechen/arcade-core

## Pages

| Route         | What's there                                         |
| ------------- | ---------------------------------------------------- |
| `/`           | Landing page and the arcade's game cabinets          |
| `/crossword/` | Dev Mini, a 5×5 crossword (Project 1, now in Svelte) |
| `/2048/`      | 2048                                                 |
| `/about/`     | Experience, education, skills                        |
| `/contact/`   | Email, GitHub, LinkedIn                              |

## Structure

```
src/
  app.css                         design tokens (colour ramp, type scale, spacing) and shared base styles
  routes/                         one folder per page; +layout.svelte adds the header and footer
  lib/
    game/game2048.svelte.ts       shared 2048 state: tiles, score, best, seed, saving to localStorage
    crossword/puzzle.ts           crossword clues, answers and grid
    components/
      layout/                     SiteHeader, SiteFooter
      home/                       GameCard
      crossword/                  CrosswordGrid, ClueList, RevealSolution
      game2048/                   Board, ScoreBox, ArrowPad, GameOverlay, SeedForm
      about/, contact/            TagList, ContactCard
static/images/                    pictures and the favicon
```

## How 2048 works

- `@jakechen/arcade-core` holds the rules: `slide`/`move` for sliding and merging, `spawn` for new tiles, `canMove` and `hasMoves` for legal moves and game over. It knows nothing about Svelte or the page.
- `game2048.svelte.ts` wraps the board in a `Game2048` class with `$state` fields. The board, win and game-over flags and the screen reader status are `$derived` from the tiles, never synced by hand.
- Each tile has a stable id and is drawn in a keyed `{#each}` block, so a tile that changes cells keeps its element. A CSS transform transition slides it into place, and a Svelte `scale` transition pops new and merged tiles.
- Arrow keys play on desktop. On touch screens and narrow windows, on-screen arrow buttons appear, and you can also swipe the board.
- Score changes and game over are read out through an `aria-live` region. When the win or game-over panel appears, focus moves to its first button.
- Every game has a seed (shown under the board). Typing a seed replays the exact same spawns.
- The game in progress and the best score are saved to `localStorage`, so closing the tab doesn't lose them.

## Develop

Requires Node 20 or newer.

```bash
npm install
npm run dev       # http://localhost:5173
npm run check     # svelte-check / TypeScript
npm run build     # static site in build/
npm run preview   # serve the build locally
```

## Deploy

The site uses `@sveltejs/adapter-static` and prerenders every page, so `build/` can go on any static host. On Vercel or Netlify, import the GitHub repo and keep the defaults (build command `npm run build`, output directory `build`).

## Credits

- Built with SvelteKit, Svelte 5 and Vite.
- 2048 is Gabriele Cirulli's game. This version is written from the rules, with no code taken from the original.
- Fonts: system UI fonts and Georgia. Everything else, including the puzzle and illustrations, was made for this site.
