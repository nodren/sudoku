import React, { FC } from 'react'
import { Button, Icon } from 'semantic-ui-react'

import { useGameContext } from '../hooks/useGame'
import { getSocket } from '../socket'
import { Board } from '../types'
import { Grid } from './Grid'
import { NumberButton } from './NumberButton'

const socket = getSocket()

export const Controls: FC = () => {
	const {
		notesMode,
		setNotesMode,
		solution,
		board,
		notes,
		setNotes,
		setBoard,
		activeBox,
		setActiveBox,
		setActiveNumber,
		setGameOver,
		uuid,
	} = useGameContext()

	socket.on('update', ({ board, number }: { board: Board; number?: number }) => {
		console.log('update', board)
		setBoard(board)
		if (number) {
			setActiveNumber(number)
		}
		// refresh the board, react isn't handling a deep object update well
		const oldActive = [...activeBox]
		setActiveBox([0, 0])
		setActiveBox(oldActive as any)
	})
	socket.on('gameover', (board: Board) => {
		setGameOver(true)
	})

	const onNumberClick = (number: number) => () => {
		const boardSquare = board[activeBox[1]][activeBox[0]]
		const solutionSquare = solution[activeBox[1]][activeBox[0]]
		if (boardSquare !== '0' && boardSquare === solutionSquare) {
			//there's an answer and it's correct
			return
		}
		if (notesMode) {
			if (!notes[activeBox[1]]) {
				notes[activeBox[1]] = [] as any
			}
			if (!notes[activeBox[1]][activeBox[0]]) {
				notes[activeBox[1]][activeBox[0]] = {}
			}
			notes[activeBox[1]][activeBox[0]][number] = !notes[activeBox[1]][activeBox[0]][number]
			setNotes(notes)
		} else {
			socket.emit('guess', uuid, { activeBox, number })
		}
	}

	const onHintClick = () => {
		const boardSquare = board[activeBox[1]][activeBox[0]]
		const solutionSquare = solution[activeBox[1]][activeBox[0]]
		if (boardSquare !== '0' && boardSquare === solutionSquare) {
			return
		}
		socket.emit('hint', { activeBox })
	}
	const onEraseClick = () => {
		const boardSquare = board[activeBox[1]][activeBox[0]]
		const solutionSquare = solution[activeBox[1]][activeBox[0]]

		if (boardSquare === solutionSquare) {
			return
		}
		if (boardSquare !== '0') {
			socket.emit('erase', { activeBox })
			return
		}
		if (!notes[activeBox[1]]) {
			notes[activeBox[1]] = [] as any
		}
		if (!notes[activeBox[1]][activeBox[0]]) {
			notes[activeBox[1]][activeBox[0]] = {}
		}
		notes[activeBox[1]][activeBox[0]] = {}
		// refresh the board, react isn't handling a deep object update well
		const oldActive = [...activeBox]
		setActiveBox([0, 0])
		setActiveBox(oldActive as any)
	}

	return (
		<Grid rows="auto auto">
			<Grid columns="1fr auto 1fr" padding="1rem">
				<div />
				<Button.Group>
					<Button onClick={onEraseClick}>
						<Icon name="eraser" />
						Erase
					</Button>
					<Button toggle active={notesMode} onClick={() => setNotesMode(!notesMode)}>
						<Icon name="sticky note outline" />
						Notes {notesMode ? 'On' : 'Off'}
					</Button>
					<Button onClick={onHintClick}>
						<Icon name="lightbulb outline" />
						Hint
					</Button>
				</Button.Group>
				<div />
			</Grid>
			<Grid columns={9} rows="auto auto">
				<NumberButton number={1} onClick={onNumberClick(1)} />
				<NumberButton number={2} onClick={onNumberClick(2)} />
				<NumberButton number={3} onClick={onNumberClick(3)} />
				<NumberButton number={4} onClick={onNumberClick(4)} />
				<NumberButton number={5} onClick={onNumberClick(5)} />
				<NumberButton number={6} onClick={onNumberClick(6)} />
				<NumberButton number={7} onClick={onNumberClick(7)} />
				<NumberButton number={8} onClick={onNumberClick(8)} />
				<NumberButton number={9} onClick={onNumberClick(9)} />
			</Grid>
		</Grid>
	)
}
