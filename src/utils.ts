import { Board, Score } from './types'

export function convertBoardToString(board: Board) {
	const boardRows = []
	for (const row of board) {
		boardRows.push(row.join(''))
	}
	return boardRows.join('')
}

export function countNumberOnBoard(board: Board, number: number) {
	const boardStr = convertBoardToString(board)
	return boardStr.split(number.toString()).length - 1
}

export function calculateScore(
	board: Board,
	solution: Board,
	activeBox: [number, number],
	guess: number,
) {
	const boardSquare = board[activeBox[1]][activeBox[0]]
	const solutionSquare = solution[activeBox[1]][activeBox[0]]
	let bonus = 0
	if (boardSquare !== solutionSquare) {
		return -20
	}
	//check the row
	const row = board[activeBox[1]]
	if (!row.includes('0')) {
		bonus += 50
	}
	//check the column
	const zeroColumn = board.find((row) => {
		return row[activeBox[0]] === '0'
	})
	if (!zeroColumn) {
		bonus += 50
	}
	//TODO: check the box
	//check the number
	const boardStr = convertBoardToString(board)
	if (boardStr.match(new RegExp(guess.toString(), 'g')).length === 9) {
		bonus += 50
	}
	//check if the game is over
	if (convertBoardToString(board) === convertBoardToString(solution)) {
		bonus += 100
	}
	return bonus + 10
}

export function processScores(scores: Record<string, number>): [Score, Score] {
	const ret: any = Object.entries(scores).map(([id, score]) => {
		return {
			id,
			score,
		}
	})
	ret.sort((scoreA: Score, scoreB: Score) => {
		return scoreB.score - scoreA.score
	})
	return ret
}
