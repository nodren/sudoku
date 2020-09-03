import axios from 'axios'
import { useEffect } from 'react'
import { Loader } from 'semantic-ui-react'
import { useRouter } from 'next/router'

import { Board } from '../../components/Board'
import { Controls } from '../../components/Controls'
import { useGameContext } from '../../hooks/useGame'

export default function Home() {
	const { board, setBoard, setSolution, gameOver } = useGameContext()

	const { query } = useRouter()

	useEffect(() => {
		;(async () => {
			// const uuid = await axios.get(`/api/uuid`)
			const puzzle = await axios.get(`/api/generate/${query.mode}`)
			setSolution(puzzle.data.solution)
			setBoard(puzzle.data.puzzle)
		})()
	}, [])

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
			<Loader active={!board} />
			{board && !gameOver ? (
				<>
					<Board />
					<Controls />
				</>
			) : null}
			{gameOver ? <div className="game-over">You won!</div> : null}
		</>
	)
}
