import io from 'socket.io-client'

const socket = io({ path: '/socketio' })

export function getSocket() {
	return socket
}
