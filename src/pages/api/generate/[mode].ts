import axios from 'axios'
import { Request, Response } from 'express'

export default async (req: Request, res: Response) => {
	const sudoku = await axios.get(`https://sudoku.com/api/getLevel/${req.query.mode}`)
	res.statusCode = 200
	res.json({
		puzzle: convertToPuzzle(sudoku.data.desc[0]),
		solution: convertToPuzzle(sudoku.data.desc[1]),
	})
}

function convertToPuzzle(puzzleStr: string): any {
	const puzzleArr = puzzleStr.split('')
	const puzzle = []
	let i = 0
	let puzzleRow = []
	for (const square of puzzleArr) {
		puzzleRow.push(square)
		i++
		if (i > 8) {
			i = 0
			puzzle.push(puzzleRow)
			puzzleRow = []
		}
	}
	return puzzle
}
