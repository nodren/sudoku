import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Loader } from 'semantic-ui-react'

import { Board } from '../../../components/Board'
import { Controls } from '../../../components/Controls'
import { useGameContext } from '../../../hooks/useGame'
import { getSocket } from '../../../socket'

const socket = getSocket()

export default function Home() {
	const { board, setBoard, setSolution, gameOver, setUuid } = useGameContext()
	const [loading, setLoading] = useState(true)

	const { query } = useRouter()

	useEffect(() => {
		;(async () => {
			if (!query.uuid) {
				return
			}
			const puzzle = await axios.get(`/api/generate/${query.mode}`)
			setUuid(query.uuid as string)
			console.log('START 2', query.uuid)
			socket.emit('start', query.uuid)
			setTimeout(() => {
				socket.emit('ready', query.uuid as string, {
					mode: query.mode,
					board: puzzle.data.puzzle,
					solution: puzzle.data.solution,
				})
				setSolution(puzzle.data.solution)
				setBoard(puzzle.data.puzzle)
				setLoading(false)
			}, 250)
		})()
	}, [query.uuid])

	return (
		<>
			<style jsx>{`
				.game-over {
					text-align: center;
					height: 20rem;
					line-height: 20rem;
					font-size: 36px;
				}
			`}</style>
			<Loader active={loading} />
			{!loading && board && !gameOver ? (
				<>
					<Board />
					<Controls />
				</>
			) : null}
			{gameOver ? <div className="game-over">Game over!</div> : null}
		</>
	)
}
