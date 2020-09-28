import { Request, Response } from 'express'

import { SudokuGenerator } from '../../../sudoku/generator'

//this definitely needs tweaking
const MODES = {
	easy: 1,
	medium: 3,
	hard: 5,
	expert: 10,
}

export default async (req: Request, res: Response) => {
	const generator = new SudokuGenerator()
	const [puzzle, solution] = generator.generatePuzzle(MODES[req.query.mode as string])
	// const times: any[] = []
	// const startAt: any = new Date()

	// while (times.length < 100) {
	// 	const begin: any = new Date()
	// 	// generateSolution()
	// 	const generator = new SudokuGenerator()
	// 	times.push((new Date() as any) - begin)
	// }
	// const endAt: any = new Date()
	// console.log(`Min benchmark: ${times.sort((a, b) => a - b)[0]}ms`)
	// console.log(`Max benchmark: ${times.sort((a, b) => b - a)[0]}ms`)

	// console.log(`Avg benchmark: ${times.reduce((a, b) => a + b, 0) / times.length}ms`)
	// const sudoku = {
	// 	data: {
	// 		desc: [
	// 			'865479213374162859129538476917254368432687591658913742581726934743891625296345180',
	// 			'865479213374162859129538476917254368432687591658913742581726934743891625296345187',
	// 		],
	// 	},
	// }
	res.statusCode = 200
	res.json({
		puzzle,
		solution,
	})
}
