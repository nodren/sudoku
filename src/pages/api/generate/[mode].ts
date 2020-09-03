import axios from 'axios'
import { Request, Response } from 'express'

export default async (req: Request, res: Response) => {
	// const sudoku = await axios.get(`https://sudoku.com/api/getLevel/${req.query.mode}`)
	const sudoku = {
		data: {
			desc: [
				// '020078500400052000001003020000001000734805260209067005068700309342010700190086002',
				'926178543473652198851943627685231974734895261219467835568724319342519786197386450',
				'926178543473652198851943627685231974734895261219467835568724319342519786197386452',
			],
		},
	}
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
