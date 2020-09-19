import React, { FC } from 'react'
import classnames from 'classnames'

import { useGameContext } from '../hooks/useGame'
import { Grid } from './Grid'

export const Board: FC = () => {
	const { dark, board } = useGameContext()

	return (
		<>
			<style jsx global>{`
				.board {
					border: 2px solid ${dark ? '#fff' : '#000'};
				}
			`}</style>
			<Grid columns={1} rows={9} className="board">
				{board.map((row, idx) => (
					<Row border={idx !== 0 && idx % 3 === 0} key={`row${idx}`} rowNum={idx} />
				))}
			</Grid>
		</>
	)
}

interface RowProps {
	border: boolean
	rowNum: number
}

const Row: FC<RowProps> = ({ border, rowNum }) => {
	const { board, dark } = useGameContext()
	const row = board[rowNum]

	return (
		<>
			<style global jsx>{`
				.row-border {
					border-top: 2px solid ${dark ? '#aaa' : '#333'};
				}
			`}</style>
			<Grid className={border ? 'row-border' : ''} columns={9} rows={1}>
				{board[rowNum].map((square, idx) => (
					<Box rowNum={rowNum} columnNum={idx} key={`box${rowNum}${idx}`} />
				))}
			</Grid>
		</>
	)
}

interface BoxProps {
	rowNum: number
	columnNum: number
}

const Box: FC<BoxProps> = ({ rowNum, columnNum }) => {
	const {
		board,
		solution,
		dark,
		activeBox,
		setActiveBox,
		setActiveNumber,
		activeNumber,
		answers,
	} = useGameContext()
	const square = board[rowNum][columnNum]
	const solutionSquare = solution[rowNum][columnNum]

	if (answers[`${columnNum}:${rowNum}`] === 'you') {
		console.log(rowNum, columnNum, square)
	}
	const classNames = classnames({
		active: activeBox[0] === columnNum && activeBox[1] === rowNum,
		['semi-active']:
			(activeBox[0] === columnNum && activeBox[1] !== rowNum) ||
			(activeBox[0] !== columnNum && activeBox[1] === rowNum),
		border: columnNum !== 0 && columnNum % 3 === 0,
		['active-number']: square !== '0' && parseInt(square, 10) === activeNumber,
		error: square !== '0' && square !== solutionSquare,
		['your-guess']: answers[`${columnNum}:${rowNum}`] === 'you',
		['opponent-guess']: answers[`${columnNum}:${rowNum}`] === 'opponent',
		box: true,
	})
	const onClick = () => {
		setActiveBox([columnNum, rowNum])
		setActiveNumber(parseInt(square, 10))
	}

	return (
		<>
			<style jsx>{`
				.box {
					border: 1px solid ${dark ? '#666' : '#aaa'};
					text-align: center;
					line-height: 3rem;
				}
				.border {
					border-left: 2px solid ${dark ? '#aaa' : '#333'};
				}
				.active {
					color: white !important;
					background-color: ${dark ? 'dodgerblue' : 'lightblue'} !important;
				}
				.semi-active {
					background-color: ${dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
				}
				.active-number {
					background-color: ${dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
					font-weight: bolder;
					font-size: 16px;
				}
				.your-guess {
					color: ${dark ? 'dodgerblue' : 'deepskyblue'};
				}
				.opponent-guess {
					color: orange;
				}
				.error {
					color: ${dark ? 'darkred' : 'red'};
				}
			`}</style>
			<div className={classNames} onClick={onClick}>
				{square === '0' ? <BoxNotes rowNum={rowNum} columnNum={columnNum} /> : square}
			</div>
		</>
	)
}

const BoxNotes: FC<BoxProps> = ({ rowNum, columnNum }) => {
	const { notes } = useGameContext()
	const note = notes[rowNum]?.[columnNum] || {}

	return (
		<>
			<style jsx>{`
				.note {
					font-size: 8px;
					line-height: 1rem;
				}
			`}</style>
			<Grid columns={3} rows={3}>
				<div className="note">{note?.[1] ? '1' : ''}</div>
				<div className="note">{note?.[2] ? '2' : ''}</div>
				<div className="note">{note?.[3] ? '3' : ''}</div>
				<div className="note">{note?.[4] ? '4' : ''}</div>
				<div className="note">{note?.[5] ? '5' : ''}</div>
				<div className="note">{note?.[6] ? '6' : ''}</div>
				<div className="note">{note?.[7] ? '7' : ''}</div>
				<div className="note">{note?.[8] ? '8' : ''}</div>
				<div className="note">{note?.[9] ? '9' : ''}</div>
			</Grid>
		</>
	)
}
