import axios from 'axios'
import { Request, Response } from 'express'

export default async (req: Request, res: Response) => {
	const sudoku = await axios.get(`https://sudoku.com/api/getLevel/${req.query.mode}`)
	// const sudoku = {
	// 	data: {
	// 		desc: [
	// 			'865479213374162859129538476917254368432687591658913742581726934743891625296345180',
	// 			'865479213374162859129538476917254368432687591658913742581726934743891625296345187',
	// 		],
	// 	},
	// }
	console.log(sudoku.data.desc)
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
