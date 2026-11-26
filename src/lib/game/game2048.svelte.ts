import {
	createBoard,
	hasMoves,
	seededRng,
	slide,
	spawn,
	type Board,
	type Direction
} from '@jakechen/arcade-core';

const STORAGE_KEY = 'arcade-2048';

export interface Tile {
	id: number;
	value: number;
	row: number;
	col: number;
}

interface SavedGame {
	board: Board;
	score: number;
	best: number;
	seed: number;
	spawns: number;
	keepPlaying: boolean;
}

function boardFrom(tiles: Tile[]): Board {
	const board = createBoard();
	for (const tile of tiles) {
		board[tile.row][tile.col] = tile.value;
	}
	return board;
}

function loadGame(): SavedGame | null {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
	} catch {
		return null;
	}
}

class Game2048 {
	tiles = $state<Tile[]>([]);
	score = $state(0);
	best = $state(0);
	seed = $state(0);
	keepPlaying = $state(false);

	board = $derived(boardFrom(this.tiles));
	won = $derived(this.board.flat().some((value) => value >= 2048));
	over = $derived(this.tiles.length > 0 && !hasMoves(this.board));
	showWin = $derived(this.won && !this.keepPlaying);
	status = $derived.by(() => {
		if (this.showWin) return `You made 2048! Score ${this.score}.`;
		if (this.over) return `Game over. Final score ${this.score}.`;
		return `Score ${this.score}.`;
	});

	#nextId = 1;
	#spawns = 0;

	start() {
		if (this.tiles.length > 0) return;

		const saved = loadGame();
		if (!saved) {
			this.newGame();
			return;
		}
		this.score = saved.score;
		this.best = saved.best;
		this.seed = saved.seed;
		this.#spawns = saved.spawns;
		this.keepPlaying = saved.keepPlaying;
		this.#addTiles(saved.board);
	}

	newGame(seed = Math.floor(Math.random() * 1_000_000)) {
		this.tiles = [];
		this.score = 0;
		this.seed = seed;
		this.keepPlaying = false;
		this.#spawns = 0;
		this.#spawnTile();
		this.#spawnTile();
		this.#save();
	}

	continueAfterWin() {
		this.keepPlaying = true;
		this.#save();
	}

	move(direction: Direction) {
		if (this.over || this.showWin) return;

		const result = slide(this.board, direction);
		if (!result.changed) return;

		this.tiles = result.moves
			.filter((move) => !move.merged)
			.map(({ from, to }) => {
				const tile = this.tiles.find((t) => t.row === from[0] && t.col === from[1])!;
				return { ...tile, row: to[0], col: to[1], value: result.board[to[0]][to[1]] };
			});

		this.score += result.score;
		this.best = Math.max(this.best, this.score);
		this.#spawnTile();
		this.#save();
	}

	#spawnTile() {
		this.#addTiles(spawn(this.board, seededRng(this.seed + this.#spawns)));
		this.#spawns += 1;
	}

	#addTiles(board: Board) {
		const current = this.board;
		board.forEach((row, r) => {
			row.forEach((value, c) => {
				if (value !== current[r][c]) {
					this.tiles.push({ id: this.#nextId, value, row: r, col: c });
					this.#nextId += 1;
				}
			});
		});
	}

	#save() {
		const saved: SavedGame = {
			board: this.board,
			score: this.score,
			best: this.best,
			seed: this.seed,
			spawns: this.#spawns,
			keepPlaying: this.keepPlaying
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
	}
}

export const game = new Game2048();
