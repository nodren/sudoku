import express from 'express'
import http from 'http'
import next from 'next'
import socketio from 'socket.io'
import { Board } from './types'
import { convertBoardToString, calculateScore } from './utils'

const app = express()
const server = new http.Server(app)
const io = socketio(server, { path: '/socketio' })
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

const boards: Record<string, Board> = {}
const answers: Record<string, Record<string, string>> = {}
const solutions: Record<string, Board> = {}
const scores: Record<string, Record<string, number>> = {}

io.on('connection', (socket) => {
	socket.on('start', (data) => {
		scores[data] = scores[data] || {}
		socket.join(data, (err) => {
			console.log('JOINED CHANNEL', data, socket.rooms, err)
			socket.to(data).emit('joined')
		})
	})

	socket.on(
		'ready',
		(id, { mode, board, solution }: { mode: string; board: Board; solution: Board }) => {
			console.log('ready', id, socket.rooms)
			boards[id] = board
			solutions[id] = solution
			answers[id] = {}
			io.to(id).emit('ready', { mode, board, solution })
		},
	)

	socket.on(
		'guess',
		(id, { activeBox, number }: { activeBox: [number, number]; number: number }) => {
			console.log('guess', id, socket.rooms)
			const boardSquare = boards[id][activeBox[1]][activeBox[0]]
			const solutionSquare = solutions[id][activeBox[1]][activeBox[0]]
			if (boardSquare !== '0' && boardSquare === solutionSquare) {
				//there's an answer and it's correct
				return
			}
			boards[id][activeBox[1]][activeBox[0]] = number.toString()
			answers[id][`${activeBox[0]}:${activeBox[1]}`] = socket.id
			scores[id][socket.id] =
				(scores[id][socket.id] || 0) +
				calculateScore(boards[id], solutions[id], activeBox, number)
			io.to(id).emit('update', {
				board: boards[id],
				answers: answers[id],
				scores: scores[id],
			})

			if (convertBoardToString(boards[id]) === convertBoardToString(solutions[id])) {
				io.to(id).emit('gameover')
				return
			}
		},
	)

	socket.on('hint', (id, { activeBox }: { activeBox: [number, number] }) => {
		const boardSquare = boards[id][activeBox[1]][activeBox[0]]
		const solutionSquare = solutions[id][activeBox[1]][activeBox[0]]
		if (boardSquare !== '0' && boardSquare === solutionSquare) {
			//there's an answer and it's correct
			return
		}
		boards[id][activeBox[1]][activeBox[0]] = solutionSquare
		scores[id][socket.id] = (scores[id][socket.id] || 0) - 50
		//TODO: score logic goes here
		io.to(id).emit('update', {
			board: boards[id],
			scores: scores[id],
		})

		if (convertBoardToString(boards[id]) === convertBoardToString(solutions[id])) {
			io.to(id).emit('gameover')
			return
		}
	})

	socket.on('erase', (id, { activeBox }: { activeBox: [number, number] }) => {
		const boardSquare = boards[id][activeBox[1]][activeBox[0]]
		const solutionSquare = solutions[id][activeBox[1]][activeBox[0]]

		if (boardSquare === solutionSquare) {
			return
		}
		boards[id][activeBox[1]][activeBox[0]] = '0'

		io.to(id).emit('update', { board: boards[id], scores: scores[id] })
	})
})

nextApp.prepare().then(() => {
	app.get('*', (req, res) => {
		return nextHandler(req, res)
	})

	server.listen(port, () => {
		console.log(`> Ready on http://localhost:${port}`)
	})
})
