export interface Clue {
	number: number;
	row: number;
	col: number;
	answer: string;
	text: string;
}

export interface CrosswordCell {
	id: number;
	answer: string;
	number?: number;
	label?: string;
}

export const size = 5;

export const across: Clue[] = [
	{ number: 1, row: 0, col: 1, answer: 'SRC', text: 'Attribute that tells an `<img>` which file to load' },
	{ number: 4, row: 1, col: 0, answer: 'BOARD', text: 'Chess or checkers surface' },
	{ number: 6, row: 2, col: 0, answer: 'ALTER', text: 'Modify, as a tailor does a hem' },
	{ number: 7, row: 3, col: 0, answer: 'DAISY', text: 'Flower in a game of "loves me, loves me not"' },
	{ number: 8, row: 4, col: 1, answer: 'ROT', text: 'Bit ___ (slow decay of code nobody maintains)' }
];

export const down: Clue[] = [
	{ number: 1, row: 0, col: 1, answer: 'SOLAR', text: 'Kind of panel on a sunny rooftop' },
	{ number: 2, row: 0, col: 2, answer: 'RATIO', text: '`aspect-___`, the CSS property that keeps these squares square' },
	{ number: 3, row: 0, col: 3, answer: 'CREST', text: 'Peak of a wave' },
	{ number: 4, row: 1, col: 0, answer: 'BAD', text: 'HTTP 400: "___ Request"' },
	{ number: 5, row: 1, col: 4, answer: 'DRY', text: '"Don\'t Repeat Yourself," for short' }
];

function buildCell(id: number): CrosswordCell {
	const row = Math.floor(id / size);
	const col = id % size;

	const acrossClue = across.find(
		(clue) => clue.row === row && col >= clue.col && col < clue.col + clue.answer.length
	);
	const downClue = down.find(
		(clue) => clue.col === col && row >= clue.row && row < clue.row + clue.answer.length
	);
	if (!acrossClue || !downClue) return { id, answer: '' };

	const startsHere = [acrossClue, downClue].find((clue) => clue.row === row && clue.col === col);
	return {
		id,
		answer: acrossClue.answer[col - acrossClue.col],
		number: startsHere?.number,
		label: `Row ${row + 1}, column ${col + 1}, ${acrossClue.number} Across, ${downClue.number} Down`
	};
}

export const cells = Array.from({ length: size * size }, (_, id) => buildCell(id));
