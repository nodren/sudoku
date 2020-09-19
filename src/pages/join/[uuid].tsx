import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Header, Loader } from 'semantic-ui-react'

import { Board } from '../../components/Board'
import { Controls } from '../../components/Controls'
import { useGameContext } from '../../hooks/useGame'
import useSocket from '../../hooks/useSocket'
import { Scores } from '../../components/Scores'
import { Grid } from '../../components/Grid'
import Link from 'next/link'

export default function Home() {
	const { dark, board, setBoard, setSolution, gameOver, setUuid } = useGameContext()
	const [loading, setLoading] = useState(true)

	const router = useRouter()

	const socket = useSocket('ready', (data) => {
		setBoard(data.board)
		setSolution(data.solution)
		setLoading(false)
	})

	useEffect(() => {
		;(async () => {
			if (router.query.uuid) {
				setUuid(router.query.uuid as string)
				console.log('START', router.query.uuid)
				socket.emit('start', router.query.uuid)
			}
		})()
	}, [router.query.uuid])

	return (
		<>
			<style jsx>{`
				.start {
					text-align: center;
				}
				.game-over {
					text-align: center;
					height: 20rem;
					line-height: 20rem;
					font-size: 36px;
				}
			`}</style>
			<div className="start">
				{loading && (
					<>
						<Header as="h2" inverted={dark}>
							Waiting room
						</Header>
						<p>Waiting for opponent</p>
					</>
				)}
				<Loader active={loading} />
				{!loading && board && !gameOver ? (
					<>
						<Board />
						<Controls />
					</>
				) : null}
				{gameOver ? (
					<Grid rows="auto auto auto">
						<div className="game-over">Game over!</div>
						<Scores />
						<Link href="/">
							<a>
								<Button primary>Play Again</Button>
							</a>
						</Link>
					</Grid>
				) : null}
			</div>
		</>
	)
}
