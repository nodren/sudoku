import express from 'express'
import http from 'http'
import next from 'next'
import socketio from 'socket.io'

const app = express()
const server = new http.Server(app)
const io = socketio(server)
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
	app.get('*', (req, res) => {
		return nextHandler(req, res)
	})

	server.listen(port, () => {
		console.log(`> Ready on http://localhost:${port}`)
	})
})
