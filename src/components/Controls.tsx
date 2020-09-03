import React, { FC } from 'react'
import { Grid } from './Grid'
import { Button, Icon } from 'semantic-ui-react'
import { useGameContext } from '../hooks/useGame'
import { convertBoardToString } from '../utils'
import { NumberButton } from './NumberButton'

export const Controls: FC = () => {
	const {
		dark,
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
	} = useGameContext()

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
			board[activeBox[1]][activeBox[0]] = number.toString()
			setActiveNumber(number)
			setBoard(board)
			if (convertBoardToString(board) === convertBoardToString(solution)) {
				setGameOver(true)
			}
		}
		// refresh the board, react isn't handling a deep object update well
		const oldActive = [...activeBox]
		setActiveBox([0, 0])
		setActiveBox(oldActive as any)
	}
	const onHintClick = () => {
		const boardSquare = board[activeBox[1]][activeBox[0]]
		const solutionSquare = solution[activeBox[1]][activeBox[0]]
		if (boardSquare !== '0' && boardSquare === solutionSquare) {
			return
		}
		board[activeBox[1]][activeBox[0]] = solutionSquare
		setActiveNumber(parseInt(solutionSquare, 10))
		setBoard(board)
		if (convertBoardToString(board) === convertBoardToString(solution)) {
			setGameOver(true)
		}
		// refresh the board, react isn't handling a deep object update well
		const oldActive = [...activeBox]
		setActiveBox([0, 0])
		setActiveBox(oldActive as any)
	}
	const onEraseClick = () => {
		const boardSquare = board[activeBox[1]][activeBox[0]]
		const solutionSquare = solution[activeBox[1]][activeBox[0]]

		if (boardSquare === solutionSquare) {
			return
		}
		board[activeBox[1]][activeBox[0]] = '0'
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
