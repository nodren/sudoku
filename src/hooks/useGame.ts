import constate from 'constate'
import { useState } from 'react'
import { Board, Notes, Answers } from '../types'

function useTheme() {
	const [dark, setDark] = useState(false)
	const [board, setBoard] = useState<Board | undefined>(undefined)
	const [solution, setSolution] = useState<Board | undefined>(undefined)
	const [notesMode, setNotesMode] = useState<boolean>(false)
	const [notes, setNotes] = useState<Notes>([] as any)
	const [showSettings, setShowSettings] = useState(false)
	const [activeBox, setActiveBox] = useState<[number, number]>([0, 0])
	const [activeNumber, setActiveNumber] = useState<number>(0)
	const [gameOver, setGameOver] = useState(false)
	const [uuid, setUuid] = useState<string | undefined>()
	const [scores, setScores] = useState<Record<string, number>>({})
	const [answers, setAnswers] = useState<Answers>({})

	return {
		dark,
		setDark(mode: boolean) {
			setDark(mode)
			localStorage.setItem('dark', `${mode}`)
		},
		checkDarkMode() {
			setDark(localStorage.getItem('dark') === 'true')
		},
		board,
		setBoard,
		solution,
		setSolution,
		notesMode,
		setNotesMode,
		notes,
		setNotes,
		showSettings,
		setShowSettings,
		activeBox,
		setActiveBox,
		activeNumber,
		setActiveNumber,
		gameOver,
		setGameOver,
		uuid,
		setUuid,
		scores,
		setScores,
		answers,
		setAnswers,
	}
}

export const [GameProvider, useGameContext] = constate(useTheme)
