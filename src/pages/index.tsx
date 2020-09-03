import axios from 'axios'
import Link from 'next/link'
import { useEffect } from 'react'
import { Button, Header } from 'semantic-ui-react'

import { useGameContext } from '../hooks/useGame'

export default function Home() {
	const { dark, setBoard, setSolution } = useGameContext()

	useEffect(() => {
		;(async () => {
			// const uuid = await axios.get(`/api/uuid`)
			const puzzle = await axios.get(`/api/generate`)
			setSolution(puzzle.data.solution)
			setBoard(puzzle.data.puzzle)
		})()
	}, [])

	return (
		<>
			<Header as="h4" inverted={dark} textAlign="center">
				Start your game
			</Header>
			<Button.Group vertical>
				<Link href="/play/easy">
					<Button>Easy</Button>
				</Link>
				<Link href="/play/medium">
					<Button>Medium</Button>
				</Link>
				<Link href="/play/hard">
					<Button>Hard</Button>
				</Link>
				<Link href="/play/expert">
					<Button>Expert</Button>
				</Link>
			</Button.Group>
		</>
	)
}
