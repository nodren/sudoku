import { Board } from './types'

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
